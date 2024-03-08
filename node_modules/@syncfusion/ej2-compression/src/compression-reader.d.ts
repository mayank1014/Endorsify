import { DecompressorHuffmanTree } from './decompressor-huffman-tree';
export declare class CompressedStreamReader {
    private static readonly DEF_REVERSE_BITS;
    defaultHuffmanDynamicTree: number[];
    private DEF_HEADER_METHOD_MASK;
    private DEF_HEADER_INFO_MASK;
    private DEF_HEADER_FLAGS_FCHECK;
    private DEF_HEADER_FLAGS_FDICT;
    private DEF_HEADER_FLAGS_FLEVEL;
    private static readonly DEF_HUFFMAN_DYNTREE_REPEAT_MINIMUMS;
    private static readonly DEF_HUFFMAN_DYNTREE_REPEAT_BITS;
    private DEF_MAX_WINDOW_SIZE;
    private static readonly DEF_HUFFMAN_REPEAT_LENGTH_BASE;
    private static readonly DEF_HUFFMAN_REPEAT_LENGTH_EXTENSION;
    private static readonly DEF_HUFFMAN_REPEAT_DISTANCE_BASE;
    private static readonly DEF_HUFFMAN_REPEAT_DISTANCE_EXTENSION;
    private DEF_HUFFMAN_REPEATE_MAX;
    private DEF_HUFFMAN_END_BLOCK;
    private DEF_HUFFMAN_LENGTH_MINIMUMCODE;
    private DEF_HUFFMAN_LENGTH_MAXIMUMCODE;
    private DEF_HUFFMAN_DISTANCE_MAXIMUMCODE;
    private mInputStream;
    private mCheckSum;
    private tBuffer;
    mBuffer: number;
    private mBufferedBits;
    private mTempBuffer;
    private mBlockBuffer;
    private mbNoWrap;
    private mWindowSize;
    private mCurrentPosition;
    private mDataLength;
    private mbReadingUncompressed;
    private mUncompressedDataLength;
    private mbCanReadNextBlock;
    private mbCanReadMoreData;
    private mCurrentLengthTree;
    private mCurrentDistanceTree;
    private mbCheckSumRead;
    /**
     * Initializes compressor and writes ZLib header if needed.
     * @param {boolean} noWrap - optional if true, ZLib header and checksum will not be written.
     */
    peekBits(count: number): number;
    protected fillBuffer(): void;
    skipBits(count: number): void;
    readonly availableBits: number;
    constructor(stream: Uint8Array, bNoWrap: boolean);
    protected readZLibHeader(): void;
    protected readInt16(): number;
    protected readBits(count: number): number;
    protected decodeBlockHeader(): boolean;
    protected skipToBoundary(): void;
    protected readInt16Inverted(): number;
    protected decodeDynamicHeader(lengthTree: DecompressorHuffmanTree, distanceTree: DecompressorHuffmanTree): any;
    private readHuffman;
    read(buffer: Uint8Array, offset: number, length: number): number;
    protected readPackedBytes(buffer: Uint8Array, offset: number, length: number): number;
    protected readInt32(): number;
    protected checksumUpdate(buffer: Uint8Array, offset: number, length: number): void;
}
export declare class Stream {
    inputStream: Uint8Array;
    readonly length: number;
    position: number;
    constructor(input: Uint8Array);
    read(buffer: Uint8Array, start: number, length: number): number;
    readByte(): number;
    write(inputBuffer: Uint8Array, offset: number, count: number): void;
    toByteArray(): Uint8Array;
}
