import { Stream } from './index';
/**
 * class provide compression library
 * ```typescript
 * let archive = new ZipArchive();
 * archive.compressionLevel = 'Normal';
 * let archiveItem = new ZipArchiveItem(archive, 'directoryName\fileName.txt');
 * archive.addItem(archiveItem);
 * archive.save(fileName.zip);
 * ```
 */
export declare class ZipArchive {
    private files;
    private level;
    readonly items: (ZipArchiveItem | string)[];
    /**
     * gets compression level
     */
    /**
    * sets compression level
    */
    compressionLevel: CompressionLevel;
    /**
     * gets items count
     */
    readonly length: number;
    /**
     * constructor for creating ZipArchive instance
     */
    constructor();
    /**
     * add new item to archive
     * @param {ZipArchiveItem} item - item to be added
     * @returns {void}
     */
    addItem(item: ZipArchiveItem): void;
    /**
     * add new directory to archive
     * @param directoryName directoryName to be created
     * @returns {void}
     */
    addDirectory(directoryName: string): void;
    /**
     * gets item at specified index
     * @param {number} index - item index
     * @returns {ZipArchiveItem}
     */
    getItem(index: number): ZipArchiveItem;
    /**
     * determines whether an element is in the collection
     * @param {string | ZipArchiveItem} item - item to search
     * @returns {boolean}
     */
    contains(item: string | ZipArchiveItem): boolean;
    open(base64String: string): void;
    readCentralDirectoryDataAndExtractItems(stream: Stream): void;
    /**
     * save archive with specified file name
     * @param {string} fileName save archive with specified file name
     * @returns {Promise<ZipArchive>}
     */
    save(fileName: string): Promise<ZipArchive>;
    /**
     * Save archive as blob
     * @return {Promise<Blob>}
     */
    saveAsBlob(): Promise<Blob>;
    private saveInternal;
    /**
     * release allocated un-managed resource
     * @returns {void}
     */
    destroy(): void;
    private getCompressedData;
    private compressData;
    private constructZippedObject;
    private writeHeader;
    private writeZippedContent;
    private writeCentralDirectory;
    private writeFooter;
    private getArrayBuffer;
    private getBytes;
    private getModifiedTime;
    private getModifiedDate;
    private calculateCrc32Value;
    /**
     * construct cyclic redundancy code table
     * @private
     */
    static initCrc32Table(): void;
    static findValueFromEnd(stream: Stream, value: number, maxCount: number): number;
    static ReadInt32(stream: Stream): number;
    static ReadInt16(stream: Stream): number;
    static ReadUInt16(stream: Stream): number;
}
export declare class ZipArchiveItemHelper {
    compressedStream: Uint8Array;
    name: string;
    unCompressedStream: Uint8Array;
    headerSignature: number;
    private options;
    private compressionMethod;
    checkCrc: boolean;
    private crc32;
    private compressedSize;
    private originalSize;
    private localHeaderOffset;
    private externalAttributes;
    readCentralDirectoryData(stream: Stream): void;
    readData(stream: Stream, checkCrc: boolean): void;
    decompressData(): void;
    private decompressDataOld;
    private readLocalHeader;
    private readCompressedData;
}
/**
 * Class represent unique ZipArchive item
 * ```typescript
 * let archiveItem = new ZipArchiveItem(archive, 'directoryName\fileName.txt');
 * ```
 */
export declare class ZipArchiveItem {
    data: Blob | ArrayBuffer;
    private decompressedStream;
    private fileName;
    readonly dataStream: Blob | ArrayBuffer;
    /**
     * Get the name of archive item
     * @returns string
     */
    /**
    * Set the name of archive item
    * @param  {string} value
    */
    name: string;
    /**
     * constructor for creating {ZipArchiveItem} instance
     * @param {Blob|ArrayBuffer} data file data
     * @param {itemName} itemName absolute file path
     */
    constructor(data: Blob | ArrayBuffer, itemName: string);
    /**
     * release allocated un-managed resource
     * @returns {void}
     */
    destroy(): void;
}
export interface CompressedData {
    fileName: string;
    compressedData: Uint8Array[] | string;
    uncompressedDataSize: number;
    compressedSize: number;
    crc32Value: number;
    compressionType: string;
    isDirectory: boolean;
}
export interface ZippedObject {
    localHeader: string;
    centralDir: string;
    compressedData: CompressedData;
}
/**
 * Compression level.
 */
export declare type CompressionLevel = 'NoCompression' | 'Normal';
