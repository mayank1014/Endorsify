import { CompressedStreamReader } from './index';
export declare class DecompressorHuffmanTree {
    private static MAX_BITLEN;
    private m_Tree;
    static m_LengthTree: DecompressorHuffmanTree;
    static m_DistanceTree: DecompressorHuffmanTree;
    constructor(lengths: Uint8Array);
    static init(): void;
    private prepareData;
    private treeFromData;
    private buildTree;
    unpackSymbol(input: CompressedStreamReader): number;
    static readonly lengthTree: DecompressorHuffmanTree;
    static readonly distanceTree: DecompressorHuffmanTree;
}
