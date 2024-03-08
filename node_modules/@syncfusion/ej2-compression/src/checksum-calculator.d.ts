export declare class ChecksumCalculator {
    private static DEF_CHECKSUM_BIT_OFFSET;
    private static DEF_CHECKSUM_BASE;
    private static DEF_CHECKSUM_ITERATIONSCOUNT;
    static ChecksumUpdate(checksum: number, buffer: Uint8Array, offset: number, length: number): void;
    static ChecksumGenerate(buffer: Uint8Array, offset: number, length: number): number;
}
