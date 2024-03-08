/* eslint-disable */
import { CompressedStreamWriter, Stream, CompressedStreamReader } from './index';
import { Save } from '@syncfusion/ej2-file-utils';
import { Utils } from './utils';
var CRC32TABLE = [];
/// <summary>
/// Size of the int value in bytes.
/// </summary>
var INT_SIZE = 4;
/// <summary>
/// Size of the short value in bytes.
/// </summary>
var SHORT_SIZE = 2;
/// <summary>
/// End of central directory signature.
/// </summary>
var CentralDirectoryEndSignature = 0x06054b50;
/// <summary>
/// Offset to the size field in the End of central directory record.
/// </summary>
var CentralDirSizeOffset = 12;
/// <summary>
/// Central header signature.
/// </summary>
var CentralHeaderSignature = 0x02014b50;
/// <summary>
/// Buffer size.
/// </summary>
var BufferSize = 4096;
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
var ZipArchive = /** @class */ (function () {
    /**
     * constructor for creating ZipArchive instance
     */
    function ZipArchive() {
        if (CRC32TABLE.length === 0) {
            ZipArchive.initCrc32Table();
        }
        this.files = [];
        this.level = 'Normal';
        Save.isMicrosoftBrowser = !(!navigator.msSaveBlob);
    }
    Object.defineProperty(ZipArchive.prototype, "items", {
        get: function () {
            return this.files;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ZipArchive.prototype, "compressionLevel", {
        /**
         * gets compression level
         */
        get: function () {
            return this.level;
        },
        /**
         * sets compression level
         */
        set: function (level) {
            this.level = level;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ZipArchive.prototype, "length", {
        /**
         * gets items count
         */
        get: function () {
            if (this.files === undefined) {
                return 0;
            }
            return this.files.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * add new item to archive
     * @param {ZipArchiveItem} item - item to be added
     * @returns {void}
     */
    ZipArchive.prototype.addItem = function (item) {
        if (item === null || item === undefined) {
            throw new Error('ArgumentException: item cannot be null or undefined');
        }
        for (var i = 0; i < this.files.length; i++) {
            var file = this.files[i];
            if (file instanceof ZipArchiveItem) {
                if (file.name === item.name) {
                    throw new Error('item with same name already exist');
                }
            }
        }
        this.files.push(item);
    };
    /**
     * add new directory to archive
     * @param directoryName directoryName to be created
     * @returns {void}
     */
    ZipArchive.prototype.addDirectory = function (directoryName) {
        if (directoryName === null || directoryName === undefined) {
            throw new Error('ArgumentException: string cannot be null or undefined');
        }
        if (directoryName.length === 0) {
            throw new Error('ArgumentException: string cannot be empty');
        }
        if (directoryName.slice(-1) !== '/') {
            directoryName += '/';
        }
        if (this.files.indexOf(directoryName) !== -1) {
            throw new Error('item with same name already exist');
        }
        this.files.push(directoryName);
    };
    /**
     * gets item at specified index
     * @param {number} index - item index
     * @returns {ZipArchiveItem}
     */
    ZipArchive.prototype.getItem = function (index) {
        if (index >= 0 && index < this.files.length) {
            return this.files[index];
        }
        return undefined;
    };
    /**
     * determines whether an element is in the collection
     * @param {string | ZipArchiveItem} item - item to search
     * @returns {boolean}
     */
    ZipArchive.prototype.contains = function (item) {
        return this.files.indexOf(item) !== -1 ? true : false;
    };
    ZipArchive.prototype.open = function (base64String) {
        //return promise = new Promise((resolve: Function, reject: Function) => {
        var zipArchive = this;
        var zipByteArray = Utils.encodedString(base64String);
        if (zipByteArray.length == 0)
            throw new DOMException("stream");
        var stream = new Stream(zipByteArray);
        //let lCentralDirEndPosition = this.findValueFromEnd( arrBuffer, Constants.CentralDirectoryEndSignature, 65557 );
        var lCentralDirEndPosition = ZipArchive.findValueFromEnd(stream, CentralDirectoryEndSignature, 65557);
        if (lCentralDirEndPosition < 0)
            throw new DOMException("Can't locate end of central directory record. Possible wrong file format or archive is corrupt.");
        // Step2. Locate central directory and iterate through all items
        stream.position = lCentralDirEndPosition + CentralDirSizeOffset;
        var iCentralDirSize = ZipArchive.ReadInt32(stream);
        var lCentralDirPosition = lCentralDirEndPosition - iCentralDirSize;
        // verify that this is really central directory
        stream.position = lCentralDirPosition;
        this.readCentralDirectoryDataAndExtractItems(stream);
        //});
        // let zipArchive: ZipArchive = this;
        //let promise: Promise<ZipArchive>;
        // return promise = new Promise((resolve: Function, reject: Function) => {
        //     let reader: FileReader = new FileReader();
        //     reader.onload = (e: Event) => {
        //         let data: Uint8Array = new Uint8Array((e.target as any).result);
        //         let zipReader: ZipReader = new ZipReader(data);
        //         zipReader.readEntries().then((entries: ZipEntry[]) => {
        //             for (let i: number = 0; i < entries.length; i++) {
        //                 let entry: ZipEntry = entries[i];
        //                 let item: ZipArchiveItem = new ZipArchiveItem(zipArchive, entry.fileName);
        //                 item.data = entry.data;
        //                 item.compressionMethod = entry.compressionMethod;
        //                 item.crc = entry.crc;
        //                 item.lastModified = entry.lastModified;
        //                 item.lastModifiedDate = entry.lastModifiedDate;
        //                 item.size = entry.size;
        //                 item.uncompressedSize = entry.uncompressedSize;
        //                 zipArchive.addItem(item);
        //             }
        //             resolve(zipArchive);
        //         });
        //     };
        //     reader.readAsArrayBuffer(fileName);
        // });
    };
    /// <summary>
    /// Read central directory record from the stream.
    /// </summary>
    /// <param name="stream">Stream to read from.</param>
    ZipArchive.prototype.readCentralDirectoryDataAndExtractItems = function (stream) {
        if (stream == null)
            throw new DOMException("stream");
        var itemHelper;
        while (ZipArchive.ReadInt32(stream) == CentralHeaderSignature) {
            itemHelper = new ZipArchiveItemHelper();
            itemHelper.readCentralDirectoryData(stream);
            itemHelper;
            // let item: ZipArchiveItem = new ZipArchiveItem(this);
            // item.ReadCentralDirectoryData(stream);
            // m_arrItems.Add(item);
        }
        itemHelper.readData(stream, itemHelper.checkCrc);
        itemHelper.decompressData();
        this.files.push(new ZipArchiveItem(itemHelper.unCompressedStream.buffer, itemHelper.name));
    };
    /**
     * save archive with specified file name
     * @param {string} fileName save archive with specified file name
     * @returns {Promise<ZipArchive>}
     */
    ZipArchive.prototype.save = function (fileName) {
        if (fileName === null || fileName === undefined || fileName.length === 0) {
            throw new Error('ArgumentException: fileName cannot be null or undefined');
        }
        if (this.files.length === 0) {
            throw new Error('InvalidOperation');
        }
        var zipArchive = this;
        var promise;
        return promise = new Promise(function (resolve, reject) {
            zipArchive.saveInternal(fileName, false).then(function () {
                resolve(zipArchive);
            });
        });
    };
    /**
     * Save archive as blob
     * @return {Promise<Blob>}
     */
    ZipArchive.prototype.saveAsBlob = function () {
        var zipArchive = this;
        var promise;
        return promise = new Promise(function (resolve, reject) {
            zipArchive.saveInternal('', true).then(function (blob) {
                resolve(blob);
            });
        });
    };
    ZipArchive.prototype.saveInternal = function (fileName, skipFileSave) {
        var _this = this;
        var zipArchive = this;
        var promise;
        return promise = new Promise(function (resolve, reject) {
            var zipData = [];
            var dirLength = 0;
            for (var i = 0; i < zipArchive.files.length; i++) {
                var compressedObject = _this.getCompressedData(_this.files[i]);
                compressedObject.then(function (data) {
                    dirLength = zipArchive.constructZippedObject(zipData, data, dirLength, data.isDirectory);
                    if (zipData.length === zipArchive.files.length) {
                        var blob = zipArchive.writeZippedContent(fileName, zipData, dirLength, skipFileSave);
                        resolve(blob);
                    }
                });
            }
        });
    };
    /**
     * release allocated un-managed resource
     * @returns {void}
     */
    ZipArchive.prototype.destroy = function () {
        if (this.files !== undefined && this.files.length > 0) {
            for (var i = 0; i < this.files.length; i++) {
                var file = this.files[i];
                if (file instanceof ZipArchiveItem) {
                    file.destroy();
                }
                file = undefined;
            }
            this.files = [];
        }
        this.files = undefined;
        this.level = undefined;
    };
    ZipArchive.prototype.getCompressedData = function (item) {
        var zipArchive = this;
        var promise = new Promise(function (resolve, reject) {
            if (item instanceof ZipArchiveItem) {
                var reader_1 = new FileReader();
                reader_1.onload = function () {
                    var input = new Uint8Array(reader_1.result);
                    var data = {
                        fileName: item.name, crc32Value: 0, compressedData: [],
                        compressedSize: undefined, uncompressedDataSize: input.length, compressionType: undefined,
                        isDirectory: false
                    };
                    if (zipArchive.level === 'Normal') {
                        zipArchive.compressData(input, data, CRC32TABLE);
                        var length_1 = 0;
                        for (var i = 0; i < data.compressedData.length; i++) {
                            length_1 += data.compressedData[i].length;
                        }
                        data.compressedSize = length_1;
                        data.compressionType = '\x08\x00'; //Deflated = 8
                    }
                    else {
                        data.compressedSize = input.length;
                        data.crc32Value = zipArchive.calculateCrc32Value(0, input, CRC32TABLE);
                        data.compressionType = '\x00\x00'; // Stored = 0
                        data.compressedData.push(input);
                    }
                    resolve(data);
                };
                reader_1.readAsArrayBuffer(item.data);
            }
            else {
                var data = {
                    fileName: item, crc32Value: 0, compressedData: '', compressedSize: 0, uncompressedDataSize: 0,
                    compressionType: '\x00\x00', isDirectory: true
                };
                resolve(data);
            }
        });
        return promise;
    };
    ZipArchive.prototype.compressData = function (input, data, crc32Table) {
        var compressor = new CompressedStreamWriter(true);
        var currentIndex = 0;
        var nextIndex = 0;
        do {
            if (currentIndex >= input.length) {
                compressor.close();
                break;
            }
            nextIndex = Math.min(input.length, currentIndex + 16384);
            var subArray = input.subarray(currentIndex, nextIndex);
            data.crc32Value = this.calculateCrc32Value(data.crc32Value, subArray, crc32Table);
            compressor.write(subArray, 0, nextIndex - currentIndex);
            currentIndex = nextIndex;
        } while (currentIndex <= input.length);
        data.compressedData = compressor.compressedData;
        compressor.destroy();
    };
    ZipArchive.prototype.constructZippedObject = function (zipParts, data, dirLength, isDirectory) {
        var extFileAttr = 0;
        var date = new Date();
        if (isDirectory) {
            extFileAttr = extFileAttr | 0x00010; // directory flag
        }
        extFileAttr = extFileAttr | (0 & 0x3F);
        var header = this.writeHeader(data, date);
        var localHeader = 'PK\x03\x04' + header + data.fileName;
        var centralDir = this.writeCentralDirectory(data, header, dirLength, extFileAttr);
        zipParts.push({ localHeader: localHeader, centralDir: centralDir, compressedData: data });
        return dirLength + localHeader.length + data.compressedSize;
    };
    ZipArchive.prototype.writeHeader = function (data, date) {
        var zipHeader = '';
        zipHeader += '\x0A\x00' + '\x00\x00'; // version needed to extract & general purpose bit flag
        zipHeader += data.compressionType; // compression method Deflate=8,Stored=0
        zipHeader += this.getBytes(this.getModifiedTime(date), 2); // last modified Time
        zipHeader += this.getBytes(this.getModifiedDate(date), 2); // last modified date
        zipHeader += this.getBytes(data.crc32Value, 4); // crc-32 value
        zipHeader += this.getBytes(data.compressedSize, 4); // compressed file size
        zipHeader += this.getBytes(data.uncompressedDataSize, 4); // uncompressed file size
        zipHeader += this.getBytes(data.fileName.length, 2); // file name length
        zipHeader += this.getBytes(0, 2); // extra field length
        return zipHeader;
    };
    ZipArchive.prototype.writeZippedContent = function (fileName, zipData, localDirLen, skipFileSave) {
        var cenDirLen = 0;
        var buffer = [];
        for (var i = 0; i < zipData.length; i++) {
            var item = zipData[i];
            cenDirLen += item.centralDir.length;
            buffer.push(this.getArrayBuffer(item.localHeader));
            while (item.compressedData.compressedData.length) {
                buffer.push(item.compressedData.compressedData.shift().buffer);
            }
        }
        for (var i = 0; i < zipData.length; i++) {
            buffer.push(this.getArrayBuffer(zipData[i].centralDir));
        }
        buffer.push(this.getArrayBuffer(this.writeFooter(zipData, cenDirLen, localDirLen)));
        var blob = new Blob(buffer, { type: 'application/zip' });
        if (!skipFileSave) {
            Save.save(fileName, blob);
        }
        return blob;
    };
    ZipArchive.prototype.writeCentralDirectory = function (data, localHeader, offset, externalFileAttribute) {
        var directoryHeader = 'PK\x01\x02' +
            this.getBytes(0x0014, 2) + localHeader + // inherit from file header
            this.getBytes(0, 2) + // comment length
            '\x00\x00' + '\x00\x00' + // internal file attributes 
            this.getBytes(externalFileAttribute, 4) + // external file attributes
            this.getBytes(offset, 4) + // local fileHeader relative offset
            data.fileName;
        return directoryHeader;
    };
    ZipArchive.prototype.writeFooter = function (zipData, centralLength, localLength) {
        var dirEnd = 'PK\x05\x06' + '\x00\x00' + '\x00\x00' +
            this.getBytes(zipData.length, 2) + this.getBytes(zipData.length, 2) +
            this.getBytes(centralLength, 4) + this.getBytes(localLength, 4) +
            this.getBytes(0, 2);
        return dirEnd;
    };
    ZipArchive.prototype.getArrayBuffer = function (input) {
        var a = new Uint8Array(input.length);
        for (var j = 0; j < input.length; ++j) {
            a[j] = input.charCodeAt(j) & 0xFF;
        }
        return a.buffer;
    };
    ZipArchive.prototype.getBytes = function (value, offset) {
        var bytes = '';
        for (var i = 0; i < offset; i++) {
            bytes += String.fromCharCode(value & 0xff);
            value = value >>> 8;
        }
        return bytes;
    };
    ZipArchive.prototype.getModifiedTime = function (date) {
        var modTime = date.getHours();
        modTime = modTime << 6;
        modTime = modTime | date.getMinutes();
        modTime = modTime << 5;
        return modTime = modTime | date.getSeconds() / 2;
    };
    ZipArchive.prototype.getModifiedDate = function (date) {
        var modiDate = date.getFullYear() - 1980;
        modiDate = modiDate << 4;
        modiDate = modiDate | (date.getMonth() + 1);
        modiDate = modiDate << 5;
        return modiDate = modiDate | date.getDate();
    };
    ZipArchive.prototype.calculateCrc32Value = function (crc32Value, input, crc32Table) {
        crc32Value ^= -1;
        for (var i = 0; i < input.length; i++) {
            crc32Value = (crc32Value >>> 8) ^ crc32Table[(crc32Value ^ input[i]) & 0xFF];
        }
        return (crc32Value ^ (-1));
    };
    /**
     * construct cyclic redundancy code table
     * @private
     */
    ZipArchive.initCrc32Table = function () {
        var i;
        for (var j = 0; j < 256; j++) {
            i = j;
            for (var k = 0; k < 8; k++) {
                i = ((i & 1) ? (0xEDB88320 ^ (i >>> 1)) : (i >>> 1));
            }
            CRC32TABLE[j] = i;
        }
    };
    ZipArchive.findValueFromEnd = function (stream, value, maxCount) {
        if (stream == null)
            throw new DOMException("stream");
        //   if( !stream.CanSeek || !stream.CanRead )
        //     throw new ArgumentOutOfRangeException( "We need to have seekable and readable stream." );
        // read last 4 bytes and compare with required value
        var lStreamSize = stream.inputStream.buffer.byteLength;
        if (lStreamSize < 4)
            return -1;
        var arrBuffer = new Uint8Array(4);
        var lLastPos = Math.max(0, lStreamSize - maxCount);
        var lCurrentPosition = lStreamSize - 1 - INT_SIZE;
        stream.position = lCurrentPosition;
        stream.read(arrBuffer, 0, INT_SIZE);
        var uiCurValue = arrBuffer[0];
        var bFound = (uiCurValue == value);
        if (!bFound) {
            while (lCurrentPosition > lLastPos) {
                // remove unnecessary byte and replace it with new value.
                uiCurValue <<= 8;
                lCurrentPosition--;
                stream.position = lCurrentPosition;
                uiCurValue += stream.readByte();
                if (uiCurValue == value) {
                    bFound = true;
                    break;
                }
            }
        }
        return bFound ? lCurrentPosition : -1;
    };
    /// <summary>
    /// Extracts Int32 value from the stream.
    /// </summary>
    /// <param name="stream">Stream to read data from.</param>
    /// <returns>Extracted value.</returns>
    ZipArchive.ReadInt32 = function (stream) {
        var buffer = new Uint8Array(INT_SIZE);
        if (stream.read(buffer, 0, INT_SIZE) != INT_SIZE) {
            throw new DOMException("Unable to read value at the specified position - end of stream was reached.");
        }
        return Utils.bitConverterToInt32(buffer, 0);
    };
    /// <summary>
    /// Extracts Int16 value from the stream.
    /// </summary>
    /// <param name="stream">Stream to read data from.</param>
    /// <returns>Extracted value.</returns>
    ZipArchive.ReadInt16 = function (stream) {
        var buffer = new Uint8Array(SHORT_SIZE);
        if (stream.read(buffer, 0, SHORT_SIZE) != SHORT_SIZE) {
            throw new DOMException("Unable to read value at the specified position - end of stream was reached.");
        }
        return Utils.bitConverterToInt16(buffer, 0);
    };
    /// <summary>
    /// Extracts unsigned Int16 value from the stream.
    /// </summary>
    /// <param name="stream">Stream to read data from.</param>
    /// <returns>Extracted value.</returns>
    ZipArchive.ReadUInt16 = function (stream) {
        {
            var buffer = new Uint8Array(SHORT_SIZE);
            if (stream.read(buffer, 0, SHORT_SIZE) != SHORT_SIZE) {
                throw new DOMException("Unable to read value at the specified position - end of stream was reached.");
            }
            return Utils.bitConverterToInt16(buffer, 0);
        }
    };
    return ZipArchive;
}());
export { ZipArchive };
var ZipArchiveItemHelper = /** @class */ (function () {
    function ZipArchiveItemHelper() {
        /// <summary>
        /// Zip header signature.
        /// </summary>
        this.headerSignature = 0x04034b50;
        /// <summary>
        /// Indicates whether we should check Crc value when reading item's data. Check
        /// is performed when user gets access to decompressed data for the first time.
        /// </summary>
        this.checkCrc = true;
        /// <summary>
        /// Crc.
        /// </summary>
        this.crc32 = 0;
    }
    /// <summary>
    /// Read data from the stream based on the central directory.
    /// </summary>
    /// <param name="stream">Stream to read data from, stream.Position must point at just after correct file header.</param>
    ZipArchiveItemHelper.prototype.readCentralDirectoryData = function (stream) {
        // on the current moment we ignore "version made by" and "version needed to extract" fields.
        stream.position += 4;
        this.options = ZipArchive.ReadInt16(stream);
        this.compressionMethod = ZipArchive.ReadInt16(stream);
        this.checkCrc = (this.compressionMethod != 99); //COmpression.Defalte != SecurityConstants.AES
        //m_bCompressed = true;
        // on the current moment we ignore "last mod file time" and "last mod file date" fields.
        var lastModified = ZipArchive.ReadInt32(stream);
        //LastModified = ConvertToDateTime(lastModified);
        this.crc32 = Utils.bitConverterToUInt32(ZipArchive.ReadInt32(stream));
        this.compressedSize = ZipArchive.ReadInt32(stream);
        this.originalSize = ZipArchive.ReadInt32(stream);
        var iFileNameLength = ZipArchive.ReadInt16(stream);
        var iExtraFieldLenth = ZipArchive.ReadInt16(stream);
        var iCommentLength = ZipArchive.ReadInt16(stream);
        // on the current moment we ignore and "disk number start" (2 bytes),
        // "internal file attributes" (2 bytes).
        stream.position += 4;
        this.externalAttributes = ZipArchive.ReadInt32(stream);
        this.localHeaderOffset = ZipArchive.ReadInt32(stream);
        var arrBuffer = new Uint8Array(iFileNameLength);
        stream.read(arrBuffer, 0, iFileNameLength);
        var m_strItemName = Utils.byteToString(arrBuffer);
        m_strItemName = m_strItemName.replace("\\", "/");
        this.name = m_strItemName;
        stream.position += iExtraFieldLenth + iCommentLength;
        if (this.options != 0)
            this.options = 0;
    };
    /// <summary>
    /// Reads zipped data from the stream.
    /// </summary>
    /// <param name="stream">Stream to read data from.</param>
    /// <param name="checkCrc">Indicates whether we should check crc value after data decompression.</param>
    ZipArchiveItemHelper.prototype.readData = function (stream, checkCrc) {
        if (stream.length == 0)
            throw new DOMException("stream");
        stream.position = this.localHeaderOffset;
        this.checkCrc = checkCrc;
        this.readLocalHeader(stream);
        this.readCompressedData(stream);
    };
    ZipArchiveItemHelper.prototype.decompressData = function () {
        if (this.compressionMethod == 8) {
            if (this.originalSize > 0) {
                this.decompressDataOld();
            }
        }
    };
    ZipArchiveItemHelper.prototype.decompressDataOld = function () {
        var reader = new CompressedStreamReader(this.compressedStream, true);
        var decompressedData;
        if (this.originalSize > 0)
            decompressedData = new Stream(new Uint8Array(this.originalSize));
        var arrBuffer = new Uint8Array(BufferSize);
        var iReadBytes;
        var past = new Uint8Array(0);
        while ((iReadBytes = reader.read(arrBuffer, 0, BufferSize)) > 0) {
            //             past = new Uint8Array(decompressedData.length);
            // let currentBlock: Uint8Array = arrBuffer.subarray(0, iReadBytes);
            decompressedData.write(arrBuffer.subarray(0, iReadBytes), 0, iReadBytes);
        }
        this.unCompressedStream = decompressedData.toByteArray();
        //   this.originalSize = decompressedData.Length;
        //   m_bControlStream = true;
        //   m_streamData = decompressedData;
        //   decompressedData.SetLength( m_lOriginalSize );
        //   decompressedData.Capacity = ( int )m_lOriginalSize;
        if (this.checkCrc) {
            //TODO: fix this
            //CheckCrc(decompressedData.ToArray());
        }
        //m_streamData.Position = 0;
    };
    /// <summary>
    /// Extracts local header from the stream.
    /// </summary>
    /// <param name="stream">Stream to read data from.</param>
    ZipArchiveItemHelper.prototype.readLocalHeader = function (stream) {
        if (stream.length == 0)
            throw new DOMException("stream");
        if (ZipArchive.ReadInt32(stream) != this.headerSignature)
            throw new DOMException("Can't find local header signature - wrong file format or file is corrupt.");
        // TODO: it is good to verify data read from the central directory record,
        // but on the current moment we simply skip it.
        stream.position += 22;
        var iNameLength = ZipArchive.ReadInt16(stream);
        var iExtraLength = ZipArchive.ReadUInt16(stream);
        if (this.compressionMethod == 99) //SecurityConstants.AES
         {
            // stream.Position += iNameLength + 8;
            // m_archive.EncryptionAlgorithm = (EncryptionAlgorithm)stream.ReadByte();
            // m_actualCompression = new byte[2];
            // stream.Read(m_actualCompression, 0, 2);
        }
        else if (iExtraLength > 2) {
            stream.position += iNameLength;
            var headerVal = ZipArchive.ReadInt16(stream);
            if (headerVal == 0x0017) //PKZipEncryptionHeader
                throw new DOMException("UnSupported");
            else
                stream.position += iExtraLength - 2;
        }
        else
            stream.position += iNameLength + iExtraLength;
    };
    /// <summary>
    /// Extracts compressed data from the stream.
    /// </summary>
    /// <param name="stream">Stream to read data from.</param>
    ZipArchiveItemHelper.prototype.readCompressedData = function (stream) {
        var dataStream;
        if (this.compressedSize > 0) {
            var iBytesLeft = this.compressedSize;
            dataStream = new Stream(new Uint8Array(iBytesLeft));
            var arrBuffer = new Uint8Array(BufferSize);
            while (iBytesLeft > 0) {
                var iBytesToRead = Math.min(iBytesLeft, BufferSize);
                if (stream.read(arrBuffer, 0, iBytesToRead) != iBytesToRead)
                    throw new DOMException("End of file reached - wrong file format or file is corrupt.");
                dataStream.write(arrBuffer.subarray(0, iBytesToRead), 0, iBytesToRead);
                iBytesLeft -= iBytesToRead;
            }
            // if(m_archive.Password != null)
            // {
            //     byte[] dataBuffer = new byte[dataStream.Length];
            //     dataBuffer = dataStream.ToArray();
            //     dataStream=new MemoryStream( Decrypt(dataBuffer));
            // }
            this.compressedStream = new Uint8Array(dataStream.inputStream);
            // m_bControlStream = true;
        }
        else if (this.compressedSize < 0) //If compression size is negative, then read until the next header signature reached.
         {
            //   MemoryStream dataStream = new MemoryStream();
            //   int bt = 0;
            //   bool proceed=true;
            //   while (proceed)
            //   {
            //       if ((bt = stream.ReadByte()) == Constants.HeaderSignatureStartByteValue)
            //       {
            //           stream.Position -= 1;
            //           int headerSignature = ZipArchive.ReadInt32(stream);
            //           if (headerSignature==Constants.CentralHeaderSignature || headerSignature==Constants.CentralHeaderSignature)
            //           {
            //               proceed = false;
            //           }
            //           stream.Position -= 3;
            //       }
            //       if (proceed)
            //           dataStream.WriteByte((byte)bt);
            //   }
            //   m_streamData = dataStream;
            //   m_lCompressedSize = m_streamData.Length;
            //   m_bControlStream = true;
        }
        else if (this.compressedSize == 0) {
            //  m_streamData = new MemoryStream();
        }
    };
    return ZipArchiveItemHelper;
}());
export { ZipArchiveItemHelper };
/**
 * Class represent unique ZipArchive item
 * ```typescript
 * let archiveItem = new ZipArchiveItem(archive, 'directoryName\fileName.txt');
 * ```
 */
var ZipArchiveItem = /** @class */ (function () {
    /**
     * constructor for creating {ZipArchiveItem} instance
     * @param {Blob|ArrayBuffer} data file data
     * @param {itemName} itemName absolute file path
     */
    function ZipArchiveItem(data, itemName) {
        if (data === null || data === undefined) {
            throw new Error('ArgumentException: data cannot be null or undefined');
        }
        if (itemName === null || itemName === undefined) {
            throw new Error('ArgumentException: string cannot be null or undefined');
        }
        if (itemName.length === 0) {
            throw new Error('string cannot be empty');
        }
        this.data = data;
        this.name = itemName;
    }
    Object.defineProperty(ZipArchiveItem.prototype, "dataStream", {
        get: function () {
            return this.decompressedStream;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ZipArchiveItem.prototype, "name", {
        /**
         * Get the name of archive item
         * @returns string
         */
        get: function () {
            return this.fileName;
        },
        /**
         * Set the name of archive item
         * @param  {string} value
         */
        set: function (value) {
            this.fileName = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * release allocated un-managed resource
     * @returns {void}
     */
    ZipArchiveItem.prototype.destroy = function () {
        this.fileName = undefined;
        this.data = undefined;
    };
    return ZipArchiveItem;
}());
export { ZipArchiveItem };
/* eslint-enable */ 
