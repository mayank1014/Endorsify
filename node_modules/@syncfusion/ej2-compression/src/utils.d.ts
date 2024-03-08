export declare class Utils {
    private static reverseBits;
    static huffCodeLengthOrders: number[];
    static bitReverse(value: number): number;
    static bitConverterToInt32(value: Uint8Array, index: number): number;
    static bitConverterToInt16(value: Uint8Array, index: number): number;
    static bitConverterToUInt32(value: number): number;
    static bitConverterToUInt16(value: Uint8Array, index: number): number;
    static bitConverterUintToInt32(value: number): number;
    static bitConverterInt32ToUint(value: number): number;
    static bitConverterInt32ToInt16(value: number): number;
    static byteToString(value: Uint8Array): string;
    static byteIntToString(value: Int8Array): string;
    static arrayCopy(source: Uint8Array, sourceIndex: number, destination: Uint8Array, destinationIndex: number, dataToCopy: number): void;
    static mergeArray(arrayOne: Uint8Array, arrayTwo: Uint8Array): Uint8Array;
    /**
     * @private
     */
    static encodedString(input: string): Uint8Array;
}
