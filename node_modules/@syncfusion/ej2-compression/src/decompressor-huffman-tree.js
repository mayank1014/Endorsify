/* eslint-disable */
import { Utils } from './index';
var DecompressorHuffmanTree = /** @class */ (function () {
    function DecompressorHuffmanTree(lengths) {
        this.buildTree(lengths);
    }
    DecompressorHuffmanTree.init = function () {
        var lengths;
        var index;
        // Generate huffman tree for lengths.
        lengths = new Uint8Array(288);
        index = 0;
        while (index < 144) {
            lengths[index++] = 8;
        }
        while (index < 256) {
            lengths[index++] = 9;
        }
        while (index < 280) {
            lengths[index++] = 7;
        }
        while (index < 288) {
            lengths[index++] = 8;
        }
        DecompressorHuffmanTree.m_LengthTree = new DecompressorHuffmanTree(lengths);
        // Generate huffman tree for distances.
        lengths = new Uint8Array(32);
        index = 0;
        while (index < 32) {
            lengths[index++] = 5;
        }
        DecompressorHuffmanTree.m_DistanceTree = new DecompressorHuffmanTree(lengths);
    };
    /// <summary>
    /// Prepares data for generating huffman tree.
    /// </summary>
    /// <param name="blCount">Array of counts of each code length.</param>
    /// <param name="nextCode">Numerical values of the smallest code for each code length.</param>
    /// <param name="lengths">Array of code lengths.</param>
    /// <param name="treeSize">Calculated tree size.</param>
    /// <returns>Code.</returns>
    DecompressorHuffmanTree.prototype.prepareData = function (blCount, nextCode, lengths) {
        var code = 0;
        var treeSize = 512;
        // Count number of codes for each code length.
        for (var i = 0; i < lengths.length; i++) {
            var length_1 = lengths[i];
            if (length_1 > 0) {
                blCount[length_1]++;
            }
        }
        for (var bits = 1; bits <= DecompressorHuffmanTree.MAX_BITLEN; bits++) {
            nextCode[bits] = code;
            code += blCount[bits] << (16 - bits);
            if (bits >= 10) {
                var start = nextCode[bits] & 0x1ff80;
                var end = code & 0x1ff80;
                treeSize += (end - start) >> (16 - bits);
            }
        }
        /*      if( code != 65536 )
          throw new ZipException( "Code lengths don't add up properly." );*/
        return { 'code': code, 'treeSize': treeSize };
    };
    /// <summary>
    /// Generates huffman tree.
    /// </summary>
    /// <param name="blCount">Array of counts of each code length.</param>
    /// <param name="nextCode">Numerical values of the smallest code for each code length.</param>
    /// <param name="code">Precalculated code.</param>
    /// <param name="lengths">Array of code lengths.</param>
    /// <param name="treeSize">Calculated size of the tree.</param>
    /// <returns>Generated tree.</returns>
    DecompressorHuffmanTree.prototype.treeFromData = function (blCount, nextCode, lengths, code, treeSize) {
        var tree = new Int16Array(treeSize);
        var pointer = 512;
        var increment = 1 << 7;
        for (var bits = DecompressorHuffmanTree.MAX_BITLEN; bits >= 10; bits--) {
            var end = code & 0x1ff80;
            code -= blCount[bits] << (16 - bits);
            var start = code & 0x1ff80;
            for (var i = start; i < end; i += increment) {
                tree[Utils.bitReverse(i)] = Utils.bitConverterInt32ToInt16((-pointer << 4) | bits);
                pointer += 1 << (bits - 9);
            }
        }
        for (var i = 0; i < lengths.length; i++) {
            var bits = lengths[i];
            if (bits == 0) {
                continue;
            }
            code = nextCode[bits];
            var revcode = Utils.bitReverse(code);
            if (bits <= 9) {
                do {
                    tree[revcode] = Utils.bitConverterInt32ToInt16((i << 4) | bits);
                    revcode += 1 << bits;
                } while (revcode < 512);
            }
            else {
                var subTree = tree[revcode & 511];
                var treeLen = 1 << (subTree & 15);
                subTree = -(subTree >> 4);
                do {
                    tree[subTree | (revcode >> 9)] = Utils.bitConverterInt32ToInt16((i << 4) | bits);
                    revcode += 1 << bits;
                } while (revcode < treeLen);
            }
            nextCode[bits] = code + (1 << (16 - bits));
        }
        return tree;
    };
    /// <summary>
    /// Builds huffman tree from array of code lengths.
    /// </summary>
    /// <param name="lengths">Array of code lengths.</param>
    DecompressorHuffmanTree.prototype.buildTree = function (lengths) {
        // Count of codes for each code length.
        var blCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        // Numerical value of the smallest code for each code length.
        var nextCode = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var prepareData = this.prepareData(blCount, nextCode, lengths);
        this.m_Tree = this.treeFromData(blCount, nextCode, lengths, prepareData.code, prepareData.treeSize);
    };
    /// <summary>
    /// Reads and decompresses one symbol.
    /// </summary>
    /// <param name="input"></param>
    /// <returns></returns>
    DecompressorHuffmanTree.prototype.unpackSymbol = function (input) {
        var lookahead;
        var symbol;
        if ((lookahead = input.peekBits(9)) >= 0) {
            if ((symbol = this.m_Tree[lookahead]) >= 0) {
                input.skipBits((symbol & 15));
                return symbol >> 4;
            }
            var subtree = -(symbol >> 4);
            var bitlen = symbol & 15;
            if ((lookahead = input.peekBits(bitlen)) >= 0) {
                symbol = this.m_Tree[subtree | (lookahead >> 9)];
                input.skipBits((symbol & 15));
                return symbol >> 4;
            }
            else {
                var bits = input.availableBits;
                lookahead = input.peekBits(bits);
                symbol = this.m_Tree[subtree | (lookahead >> 9)];
                if ((symbol & 15) <= bits) {
                    input.skipBits((symbol & 15));
                    return symbol >> 4;
                }
                else {
                    return -1;
                }
            }
        }
        else {
            var bits = input.availableBits;
            lookahead = input.peekBits(bits);
            symbol = this.m_Tree[lookahead];
            if (symbol >= 0 && (symbol & 15) <= bits) {
                input.skipBits((symbol & 15));
                return symbol >> 4;
            }
            else {
                return -1;
            }
        }
    };
    Object.defineProperty(DecompressorHuffmanTree, "lengthTree", {
        /// <summary>
        /// GET huffman tree for encoding and decoding lengths.
        /// </summary>
        get: function () {
            return this.m_LengthTree;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecompressorHuffmanTree, "distanceTree", {
        /// <summary>
        /// GET huffman tree for encoding and decoding distances.
        /// </summary>
        get: function () {
            return this.m_DistanceTree;
        },
        enumerable: true,
        configurable: true
    });
    /// <summary>
    /// Maximum count of bits.
    /// </summary>
    DecompressorHuffmanTree.MAX_BITLEN = 15;
    return DecompressorHuffmanTree;
}());
export { DecompressorHuffmanTree };
/* eslint-enable */ 
