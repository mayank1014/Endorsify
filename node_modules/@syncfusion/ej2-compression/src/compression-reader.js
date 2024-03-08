/* eslint-disable */
import { DecompressorHuffmanTree } from './decompressor-huffman-tree';
import { Utils } from './utils';
import { ChecksumCalculator } from './checksum-calculator';
var CompressedStreamReader = /** @class */ (function () {
    function CompressedStreamReader(stream, bNoWrap) {
        /// <summary>
        /// Code lengths for the code length alphabet.
        /// </summary>
        this.defaultHuffmanDynamicTree = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
        /// <summary>
        /// Mask for compression method to be decoded from 16-bit header.
        /// </summary>
        this.DEF_HEADER_METHOD_MASK = 15 << 8;
        /// <summary>
        /// Mask for compression info to be decoded from 16-bit header.
        /// </summary>
        this.DEF_HEADER_INFO_MASK = 240 << 8;
        /// <summary>
        /// Mask for check bits to be decoded from 16-bit header.
        /// </summary>
        this.DEF_HEADER_FLAGS_FCHECK = 31;
        /// <summary>
        /// Mask for dictionary presence to be decoded from 16-bit header.
        /// </summary>
        this.DEF_HEADER_FLAGS_FDICT = 32;
        /// <summary>
        /// Mask for compression level to be decoded from 16-bit header.
        /// </summary>
        this.DEF_HEADER_FLAGS_FLEVEL = 192;
        /// <summary>
        /// Maximum size of the data window.
        /// </summary>
        this.DEF_MAX_WINDOW_SIZE = 65535;
        /// <summary>
        /// Maximum length of the repeatable block.
        /// </summary>
        this.DEF_HUFFMAN_REPEATE_MAX = 258;
        /// <summary>
        /// End of the block sign.
        /// </summary>
        this.DEF_HUFFMAN_END_BLOCK = 256;
        /// <summary>
        /// Minimal length code.
        /// </summary>
        this.DEF_HUFFMAN_LENGTH_MINIMUMCODE = 257;
        /// <summary>
        /// Maximal length code.
        /// </summary>
        this.DEF_HUFFMAN_LENGTH_MAXIMUMCODE = 285;
        /// <summary>
        /// Maximal distance code.
        /// </summary>
        this.DEF_HUFFMAN_DISTANCE_MAXIMUMCODE = 29;
        /// <summary>
        /// Currently calculated checksum,
        /// based on Adler32 algorithm.
        /// </summary>
        this.mCheckSum = 1;
        /// <summary>
        /// Currently read 4 bytes.
        /// </summary>
        this.tBuffer = 0;
        /// <summary>
        /// Count of bits that are in buffer.
        /// </summary>
        this.mBufferedBits = 0;
        /// <summary>
        /// Temporary buffer.
        /// </summary>
        this.mTempBuffer = new Uint8Array(4);
        /// <summary>
        /// 32k buffer for unpacked data.
        /// </summary>
        this.mBlockBuffer = new Uint8Array(this.DEF_MAX_WINDOW_SIZE);
        /// <summary>
        /// No wrap mode.
        /// </summary>
        this.mbNoWrap = false;
        /// <summary>
        /// Window size, can not be larger than 32k.
        /// </summary>
        this.mWindowSize = 0;
        /// <summary>
        /// Current position in output stream.
        /// Current in-block position can be extracted by applying Int16.MaxValue mask.
        /// </summary>
        this.mCurrentPosition = 0;
        /// <summary>
        /// Data length.
        /// Current in-block position can be extracted by applying Int16.MaxValue mask.
        /// </summary>
        this.mDataLength = 0;
        /// <summary>
        /// Specifies wheather next block can to be read.
        /// Reading can be denied because the header of the last block have been read.
        /// </summary>
        this.mbCanReadNextBlock = true;
        /// <summary>
        /// Specifies wheather user can read more data from stream.
        /// </summary>
        this.mbCanReadMoreData = true;
        /// <summary>
        /// Specifies wheather checksum has been read.
        /// </summary>
        this.mbCheckSumRead = false;
        if (stream == null) {
            throw new DOMException('stream');
        }
        if (stream.length === 0) {
            throw new DOMException('stream - string can not be empty');
        }
        DecompressorHuffmanTree.init();
        this.mInputStream = new Stream(stream);
        this.mbNoWrap = bNoWrap;
        if (!this.mbNoWrap) {
            this.readZLibHeader();
        }
        this.decodeBlockHeader();
    }
    Object.defineProperty(CompressedStreamReader.prototype, "mBuffer", {
        get: function () {
            return this.tBuffer;
        },
        set: function (value) {
            this.tBuffer = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Initializes compressor and writes ZLib header if needed.
     * @param {boolean} noWrap - optional if true, ZLib header and checksum will not be written.
     */
    /// <summary>
    /// Reads specified count of bits without adjusting position.
    /// </summary>
    /// <param name="count">Count of bits to be read.</param>
    /// <returns>Read value.</returns>
    CompressedStreamReader.prototype.peekBits = function (count) {
        if (count < 0) {
            throw new DOMException('count', 'Bits count can not be less than zero.');
        }
        if (count > 32) {
            throw new DOMException('count', 'Count of bits is too large.');
        }
        // If buffered data is not enough to give result,
        // fill buffer.
        if (this.mBufferedBits < count) {
            this.fillBuffer();
        }
        // If you want to read 4 bytes and there is partial data in
        // buffer, than you will fail.
        if (this.mBufferedBits < count) {
            return -1;
        }
        // Create bitmask for reading of count bits
        var bitMask = ~(4294967295 << count);
        var result = Utils.bitConverterUintToInt32(this.mBuffer & bitMask);
        //Debug.WriteLine( /*new string( ' ', 32 - mBufferedBits + (int)( ( 32 - mBufferedBits ) / 8 ) ) + BitsToString( (int)mBuffer, mBufferedBits ) + " " + BitsToString( result, count ) +*/ " " + result.ToString() );
        return result;
    };
    CompressedStreamReader.prototype.fillBuffer = function () {
        var length = 4 - (this.mBufferedBits >> 3) -
            (((this.mBufferedBits & 7) !== 0) ? 1 : 0);
        if (length === 0) {
            return;
        }
        //TODO: fix this
        var bytesRead = this.mInputStream.read(this.mTempBuffer, 0, length);
        for (var i = 0; i < bytesRead; i++) {
            this.mBuffer = Utils.bitConverterInt32ToUint(this.mBuffer |
                (Utils.bitConverterInt32ToUint(this.mTempBuffer[i] << this.mBufferedBits)));
            this.mBufferedBits += 8;
        }
        //TODO: fix this
    };
    /// <summary>
    /// Skips specified count of bits.
    /// </summary>
    /// <param name="count">Count of bits to be skipped.</param>
    CompressedStreamReader.prototype.skipBits = function (count) {
        if (count < 0) {
            throw new DOMException('count', 'Bits count can not be less than zero.');
        }
        if (count === 0) {
            return;
        }
        if (count >= this.mBufferedBits) {
            count -= this.mBufferedBits;
            this.mBufferedBits = 0;
            this.mBuffer = 0;
            // if something left, skip it.
            if (count > 0) {
                // Skip entire bytes.
                this.mInputStream.position += (count >> 3); //TODO: fix this
                count &= 7;
                // Skip bits.
                if (count > 0) {
                    this.fillBuffer();
                    this.mBufferedBits -= count;
                    this.mBuffer = Utils.bitConverterInt32ToUint(this.mBuffer >>> count);
                }
            }
        }
        else {
            this.mBufferedBits -= count;
            this.mBuffer = Utils.bitConverterInt32ToUint(this.mBuffer >>> count);
        }
    };
    Object.defineProperty(CompressedStreamReader.prototype, "availableBits", {
        get: function () {
            return this.mBufferedBits;
        },
        enumerable: true,
        configurable: true
    });
    /// <summary>
    /// Reads ZLib header with compression method and flags.
    /// </summary>
    CompressedStreamReader.prototype.readZLibHeader = function () {
        // first 8 bits - compression Method and flags
        // 8 other - flags
        var header = this.readInt16();
        //Debug.WriteLine( BitsToString( header ) );
        if (header === -1) {
            throw new DOMException('Header of the stream can not be read.');
        }
        if (header % 31 !== 0) {
            throw new DOMException('Header checksum illegal');
        }
        if ((header & this.DEF_HEADER_METHOD_MASK) !== (8 << 8)) {
            throw new DOMException('Unsupported compression method.');
        }
        this.mWindowSize = Math.pow(2, ((header & this.DEF_HEADER_INFO_MASK) >> 12) + 8);
        if (this.mWindowSize > 65535) {
            throw new DOMException('Unsupported window size for deflate compression method.');
        }
        if ((header & this.DEF_HEADER_FLAGS_FDICT) >> 5 === 1) {
            // Get dictionary.
            throw new DOMException('Custom dictionary is not supported at the moment.');
        }
    };
    /// <summary>
    /// TODO: place correct comment here
    /// </summary>
    /// <returns>
    /// TODO: place correct comment here
    /// </returns>
    CompressedStreamReader.prototype.readInt16 = function () {
        var result = (this.readBits(8) << 8);
        result |= this.readBits(8);
        return result;
    };
    /// <summary>
    /// Reads specified count of bits from stream.
    /// </summary>
    /// <param name="count">Count of bits to be read.</param>
    /// <returns>
    /// TODO: place correct comment here
    /// </returns>
    CompressedStreamReader.prototype.readBits = function (count) {
        var result = this.peekBits(count);
        if (result === -1) {
            return -1;
        }
        this.mBufferedBits -= count;
        this.mBuffer = Utils.bitConverterInt32ToUint(this.mBuffer >>> count);
        return result;
    };
    /// <summary>
    /// Reads and decodes block of data.
    /// </summary>
    /// <returns>True if buffer was empty and new data was read, otherwise - False.</returns>
    CompressedStreamReader.prototype.decodeBlockHeader = function () {
        if (!this.mbCanReadNextBlock) {
            return false;
        }
        var bFinalBlock = this.readBits(1);
        if (bFinalBlock === -1) {
            return false;
        }
        var blockType = this.readBits(2);
        if (blockType === -1) {
            return false;
        }
        this.mbCanReadNextBlock = (bFinalBlock === 0);
        //      ChecksumReset();
        switch (blockType) {
            case 0:
                // Uncompressed data
                this.mbReadingUncompressed = true;
                this.skipToBoundary();
                var length_1 = this.readInt16Inverted();
                var lengthComplement = this.readInt16Inverted();
                if (length_1 !== (lengthComplement ^ 0xffff)) {
                    throw new DOMException('Wrong block length.');
                }
                if (length_1 > 65535) {
                    throw new DOMException('Uncompressed block length can not be more than 65535.');
                }
                this.mUncompressedDataLength = length_1;
                this.mCurrentLengthTree = null;
                this.mCurrentDistanceTree = null;
                break;
            case 1:
                // Compressed data with fixed huffman codes.
                this.mbReadingUncompressed = false;
                this.mUncompressedDataLength = -1;
                this.mCurrentLengthTree = DecompressorHuffmanTree.lengthTree;
                this.mCurrentDistanceTree = DecompressorHuffmanTree.distanceTree;
                break;
            case 2:
                // Compressed data with dynamic huffman codes.
                this.mbReadingUncompressed = false;
                this.mUncompressedDataLength = -1;
                var trees = this.decodeDynamicHeader(this.mCurrentLengthTree, this.mCurrentDistanceTree);
                this.mCurrentLengthTree = trees.lengthTree;
                this.mCurrentDistanceTree = trees.distanceTree;
                break;
            default:
                throw new DOMException('Wrong block type.');
        }
        return true;
    };
    /// <summary>
    /// Discards left-most partially used byte.
    /// </summary>
    CompressedStreamReader.prototype.skipToBoundary = function () {
        this.mBuffer = Utils.bitConverterInt32ToUint(this.mBuffer >>> (this.mBufferedBits & 7));
        this.mBufferedBits &= ~7;
    };
    /// <summary>
    /// TODO: place correct comment here
    /// </summary>
    /// <returns>
    /// TODO: place correct comment here
    /// </returns>
    CompressedStreamReader.prototype.readInt16Inverted = function () {
        var result = (this.readBits(8));
        result |= this.readBits(8) << 8;
        return result;
    };
    /// <summary>
    /// Reades dynamic huffman codes from block header.
    /// </summary>
    /// <param name="lengthTree">Literals/Lengths tree.</param>
    /// <param name="distanceTree">Distances tree.</param>
    CompressedStreamReader.prototype.decodeDynamicHeader = function (lengthTree, distanceTree) {
        var bLastSymbol = 0;
        var iLengthsCount = this.readBits(5);
        var iDistancesCount = this.readBits(5);
        var iCodeLengthsCount = this.readBits(4);
        if (iLengthsCount < 0 || iDistancesCount < 0 || iCodeLengthsCount < 0) {
            throw new DOMException('Wrong dynamic huffman codes.');
        }
        iLengthsCount += 257;
        iDistancesCount += 1;
        var iResultingCodeLengthsCount = iLengthsCount + iDistancesCount;
        var arrResultingCodeLengths = new Uint8Array(iResultingCodeLengthsCount);
        var arrDecoderCodeLengths = new Uint8Array(19);
        iCodeLengthsCount += 4;
        var iCurrentCode = 0;
        while (iCurrentCode < iCodeLengthsCount) {
            var len = this.readBits(3);
            if (len < 0) {
                throw new DOMException('Wrong dynamic huffman codes.');
            }
            arrDecoderCodeLengths[this.defaultHuffmanDynamicTree[iCurrentCode++]] = len;
        }
        var treeInternalDecoder = new DecompressorHuffmanTree(arrDecoderCodeLengths);
        iCurrentCode = 0;
        for (;;) {
            var symbol = void 0;
            var bNeedBreak = false;
            symbol = treeInternalDecoder.unpackSymbol(this);
            while ((symbol & ~15) === 0) {
                arrResultingCodeLengths[iCurrentCode++] = bLastSymbol = symbol;
                if (iCurrentCode === iResultingCodeLengthsCount) {
                    bNeedBreak = true;
                    break;
                }
                symbol = treeInternalDecoder.unpackSymbol(this);
            }
            if (bNeedBreak) {
                break;
            }
            if (symbol < 0) {
                throw new DOMException('Wrong dynamic huffman codes.');
            }
            if (symbol >= 17) {
                bLastSymbol = 0;
            }
            else if (iCurrentCode === 0) {
                throw new DOMException('Wrong dynamic huffman codes.');
            }
            var miRepSymbol = symbol - 16;
            var bits = CompressedStreamReader.DEF_HUFFMAN_DYNTREE_REPEAT_BITS[miRepSymbol];
            var count = this.readBits(bits);
            if (count < 0) {
                throw new DOMException('Wrong dynamic huffman codes.');
            }
            count += CompressedStreamReader.DEF_HUFFMAN_DYNTREE_REPEAT_MINIMUMS[miRepSymbol];
            if (iCurrentCode + count > iResultingCodeLengthsCount) {
                throw new DOMException('Wrong dynamic huffman codes.');
            }
            while (count-- > 0) {
                arrResultingCodeLengths[iCurrentCode++] = bLastSymbol;
            }
            if (iCurrentCode === iResultingCodeLengthsCount) {
                break;
            }
        }
        var tempArray = new Uint8Array(iLengthsCount);
        tempArray.set(arrResultingCodeLengths.subarray(0, iLengthsCount), 0);
        //sourceArray, sourceIndex, destinationArray, destinationIndex, length
        //Array.copy( arrResultingCodeLengths, 0, tempArray, 0, iLengthsCount );
        lengthTree = new DecompressorHuffmanTree(tempArray);
        tempArray = arrResultingCodeLengths.slice(iLengthsCount, iLengthsCount + iDistancesCount);
        //Array.copy( arrResultingCodeLengths, iLengthsCount, tempArray, 0, iDistancesCount );
        distanceTree = new DecompressorHuffmanTree(tempArray);
        return { 'lengthTree': lengthTree, 'distanceTree': distanceTree };
    };
    /// <summary>
    /// Decodes huffman codes.
    /// </summary>
    /// <returns>True if some data was read.</returns>
    CompressedStreamReader.prototype.readHuffman = function () {
        var free = this.DEF_MAX_WINDOW_SIZE - (this.mDataLength - this.mCurrentPosition);
        var dataRead = false;
        //long maxdistance = DEF_MAX_WINDOW_SIZE >> 1;
        var readdata = {};
        // DEF_HUFFMAN_REPEATE_MAX - longest repeatable block, we should always reserve space for it because
        // if we should not, we will have buffer overrun.
        while (free >= this.DEF_HUFFMAN_REPEATE_MAX) {
            var symbol = void 0;
            symbol = this.mCurrentLengthTree.unpackSymbol(this);
            // Only codes 0..255 are valid independent symbols.
            while (((symbol) & ~0xff) === 0) {
                readdata[(this.mDataLength + 1) % this.DEF_MAX_WINDOW_SIZE] = symbol;
                this.mBlockBuffer[this.mDataLength++ % this.DEF_MAX_WINDOW_SIZE] = symbol;
                dataRead = true;
                if (--free < this.DEF_HUFFMAN_REPEATE_MAX) {
                    return true;
                }
                //if( (mDataLength - mCurrentPosition ) < maxdistance ) return true;
                symbol = this.mCurrentLengthTree.unpackSymbol(this);
            }
            if (symbol < this.DEF_HUFFMAN_LENGTH_MINIMUMCODE) {
                if (symbol < this.DEF_HUFFMAN_END_BLOCK) {
                    throw new DOMException('Illegal code.');
                }
                var numDataRead = dataRead ? 1 : 0;
                this.mbCanReadMoreData = this.decodeBlockHeader();
                var numReadMore = (this.mbCanReadMoreData) ? 1 : 0;
                return (numDataRead | numReadMore) ? true : false;
            }
            if (symbol > this.DEF_HUFFMAN_LENGTH_MAXIMUMCODE) {
                throw new DOMException('Illegal repeat code length.');
            }
            var iRepeatLength = CompressedStreamReader.DEF_HUFFMAN_REPEAT_LENGTH_BASE[symbol -
                this.DEF_HUFFMAN_LENGTH_MINIMUMCODE];
            var iRepeatExtraBits = CompressedStreamReader.DEF_HUFFMAN_REPEAT_LENGTH_EXTENSION[symbol -
                this.DEF_HUFFMAN_LENGTH_MINIMUMCODE];
            if (iRepeatExtraBits > 0) {
                var extra = this.readBits(iRepeatExtraBits);
                if (extra < 0) {
                    throw new DOMException('Wrong data.');
                }
                iRepeatLength += extra;
            }
            // Unpack repeat distance.
            symbol = this.mCurrentDistanceTree.unpackSymbol(this);
            if (symbol < 0 || symbol > CompressedStreamReader.DEF_HUFFMAN_REPEAT_DISTANCE_BASE.length) {
                throw new DOMException('Wrong distance code.');
            }
            var iRepeatDistance = CompressedStreamReader.DEF_HUFFMAN_REPEAT_DISTANCE_BASE[symbol];
            iRepeatExtraBits = CompressedStreamReader.DEF_HUFFMAN_REPEAT_DISTANCE_EXTENSION[symbol];
            if (iRepeatExtraBits > 0) {
                var extra = this.readBits(iRepeatExtraBits);
                if (extra < 0) {
                    throw new DOMException('Wrong data.');
                }
                iRepeatDistance += extra;
            }
            // Copy data in slow repeat mode
            for (var i = 0; i < iRepeatLength; i++) {
                this.mBlockBuffer[this.mDataLength % this.DEF_MAX_WINDOW_SIZE] =
                    this.mBlockBuffer[(this.mDataLength - iRepeatDistance) % this.DEF_MAX_WINDOW_SIZE];
                this.mDataLength++;
                free--;
            }
            dataRead = true;
        }
        return dataRead;
    };
    /// <summary>
    /// Reads data to buffer.
    /// </summary>
    /// <param name="buffer">Output buffer for data.</param>
    /// <param name="offset">Offset in output data.</param>
    /// <param name="length">Length of the data to be read.</param>
    /// <returns>Count of bytes actually read.</returns>
    CompressedStreamReader.prototype.read = function (buffer, offset, length) {
        if (buffer == null) {
            throw new DOMException('buffer');
        }
        if (offset < 0 || offset > buffer.length - 1) {
            throw new DOMException('offset', 'Offset does not belong to specified buffer.');
        }
        if (length < 0 || length > buffer.length - offset) {
            throw new DOMException('length', 'Length is illegal.');
        }
        var initialLength = length;
        while (length > 0) {
            // Read from internal buffer.
            if (this.mCurrentPosition < this.mDataLength) {
                // Position in buffer array.
                var inBlockPosition = (this.mCurrentPosition % this.DEF_MAX_WINDOW_SIZE);
                // We can not read more than we have in buffer at once,
                // and we not read more than till the array end.
                var dataToCopy = Math.min(this.DEF_MAX_WINDOW_SIZE - inBlockPosition, (this.mDataLength - this.mCurrentPosition));
                // Reading not more, than the rest of the buffer.
                dataToCopy = Math.min(dataToCopy, length);
                //sourceArray, sourceIndex, destinationArray, destinationIndex, length
                // Copy data.
                //Array.Copy( mBlockBuffer, inBlockPosition, buffer, offset, dataToCopy );
                //buffer.set(this.mBlockBuffer.slice(inBlockPosition, dataToCopy), offset);
                Utils.arrayCopy(this.mBlockBuffer, inBlockPosition, buffer, offset, dataToCopy);
                // Correct position, length,
                this.mCurrentPosition += dataToCopy;
                offset += dataToCopy;
                length -= dataToCopy;
            }
            else {
                if (!this.mbCanReadMoreData) {
                    break;
                }
                var oldDataLength = this.mDataLength;
                if (!this.mbReadingUncompressed) {
                    if (!this.readHuffman()) {
                        break;
                    }
                }
                else {
                    if (this.mUncompressedDataLength === 0) {
                        // If there is no more data in stream, just exit.
                        this.mbCanReadMoreData = this.decodeBlockHeader();
                        if (!(this.mbCanReadMoreData)) {
                            break;
                        }
                    }
                    else {
                        // Position of the data end in block buffer.
                        var inBlockPosition = (this.mDataLength % this.DEF_MAX_WINDOW_SIZE);
                        var dataToRead = Math.min(this.mUncompressedDataLength, this.DEF_MAX_WINDOW_SIZE - inBlockPosition);
                        var dataRead = this.readPackedBytes(this.mBlockBuffer, inBlockPosition, dataToRead);
                        if (dataToRead !== dataRead) {
                            throw new DOMException('Not enough data in stream.');
                        }
                        this.mUncompressedDataLength -= dataRead;
                        this.mDataLength += dataRead;
                    }
                }
                if (oldDataLength < this.mDataLength) {
                    var start = (oldDataLength % this.DEF_MAX_WINDOW_SIZE);
                    var end = (this.mDataLength % this.DEF_MAX_WINDOW_SIZE);
                    if (start < end) {
                        this.checksumUpdate(this.mBlockBuffer, start, end - start);
                    }
                    else {
                        this.checksumUpdate(this.mBlockBuffer, start, this.DEF_MAX_WINDOW_SIZE - start);
                        if (end > 0) {
                            this.checksumUpdate(this.mBlockBuffer, 0, end);
                        }
                    }
                }
            }
        }
        if (!this.mbCanReadMoreData && !this.mbCheckSumRead && !this.mbNoWrap) {
            this.skipToBoundary();
            var checkSum = this.readInt32();
            //Debug.Assert( checkSum == mCheckSum, "" );
            if (checkSum !== this.mCheckSum) {
                throw new DOMException('Checksum check failed.');
            }
            this.mbCheckSumRead = true;
        }
        return initialLength - length;
    };
    /// <summary>
    /// Reads array of bytes.
    /// </summary>
    /// <param name="buffer">Output buffer.</param>
    /// <param name="offset">Offset in output buffer.</param>
    /// <param name="length">Length of the data to be read.</param>
    /// <returns>Count of bytes actually read to the buffer.</returns>
    CompressedStreamReader.prototype.readPackedBytes = function (buffer, offset, length) {
        if (buffer == null) {
            throw new DOMException('buffer');
        }
        if (offset < 0 || offset > buffer.length - 1) {
            throw new DOMException('offset", "Offset can not be less than zero or greater than buffer length - 1.');
        }
        if (length < 0) {
            throw new DOMException('length", "Length can not be less than zero.');
        }
        if (length > buffer.length - offset) {
            throw new DOMException('length", "Length is too large.');
        }
        if ((this.mBufferedBits & 7) !== 0) {
            throw new DOMException('Reading of unalligned data is not supported.');
        }
        if (length === 0) {
            return 0;
        }
        var result = 0;
        while (this.mBufferedBits > 0 && length > 0) {
            buffer[offset++] = (this.mBuffer);
            this.mBufferedBits -= 8;
            this.mBuffer = Utils.bitConverterInt32ToUint(this.mBuffer >>> 8);
            length--;
            result++;
        }
        if (length > 0) {
            //TODO: Fix this.
            result += this.mInputStream.read(buffer, offset, length);
        }
        return result;
    };
    /// <summary>
    /// TODO: place correct comment here
    /// </summary>
    /// <returns>
    /// TODO: place correct comment here
    /// </returns>
    CompressedStreamReader.prototype.readInt32 = function () {
        var result = this.readBits(8) << 24;
        result |= this.readBits(8) << 16;
        result |= this.readBits(8) << 8;
        result |= this.readBits(8);
        return result;
    };
    /// <summary>
    /// Updates checksum by calculating checksum of the
    /// given buffer and adding it to current value.
    /// </summary>
    /// <param name="buffer">Data byte array.</param>
    /// <param name="offset">Offset in the buffer.</param>
    /// <param name="length">Length of data to be used from the stream.</param>
    CompressedStreamReader.prototype.checksumUpdate = function (buffer, offset, length) {
        ChecksumCalculator.ChecksumUpdate(this.mCheckSum, buffer, offset, length);
    };
    CompressedStreamReader.DEF_REVERSE_BITS = new Uint8Array([0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15]);
    /// <summary>
    /// Minimum count of repetions.
    /// </summary>
    CompressedStreamReader.DEF_HUFFMAN_DYNTREE_REPEAT_MINIMUMS = [3, 3, 11];
    /// <summary>
    /// Bits, that responds for different repetion modes.
    /// </summary>
    CompressedStreamReader.DEF_HUFFMAN_DYNTREE_REPEAT_BITS = [2, 3, 7];
    /// <summary>
    /// Length bases.
    /// </summary>
    CompressedStreamReader.DEF_HUFFMAN_REPEAT_LENGTH_BASE = [
        3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31,
        35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258
    ];
    /// <summary>
    /// Length extended bits count.
    /// </summary>
    CompressedStreamReader.DEF_HUFFMAN_REPEAT_LENGTH_EXTENSION = [
        0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2,
        3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0
    ];
    /// <summary>
    /// Distance bases.
    /// </summary>
    CompressedStreamReader.DEF_HUFFMAN_REPEAT_DISTANCE_BASE = [
        1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193,
        257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145,
        8193, 12289, 16385, 24577
    ];
    /// <summary>
    /// Distance extanded bits count.
    /// </summary>
    CompressedStreamReader.DEF_HUFFMAN_REPEAT_DISTANCE_EXTENSION = [
        0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6,
        7, 7, 8, 8, 9, 9, 10, 10, 11, 11,
        12, 12, 13, 13
    ];
    return CompressedStreamReader;
}());
export { CompressedStreamReader };
var Stream = /** @class */ (function () {
    function Stream(input) {
        this.position = 0;
        this.inputStream = new Uint8Array(input.buffer);
    }
    Object.defineProperty(Stream.prototype, "length", {
        get: function () {
            return this.inputStream.buffer.byteLength;
        },
        enumerable: true,
        configurable: true
    });
    Stream.prototype.read = function (buffer, start, length) {
        var temp = new Uint8Array(this.inputStream.buffer, this.position + start);
        var data = temp.subarray(0, length);
        buffer.set(data, 0);
        this.position += data.byteLength;
        return data.byteLength;
    };
    Stream.prototype.readByte = function () {
        return this.inputStream[this.position++];
    };
    Stream.prototype.write = function (inputBuffer, offset, count) {
        Utils.arrayCopy(inputBuffer, 0, this.inputStream, this.position + offset, count);
        // this.inputStream = new Uint8Array(this.inputStream.buffer, this.position + offset);
        // this.inputStream.set(inputBuffer, offset);
        this.position += count;
    };
    Stream.prototype.toByteArray = function () {
        return new Uint8Array(this.inputStream.buffer);
    };
    return Stream;
}());
export { Stream };
/* eslint-enable */ 
