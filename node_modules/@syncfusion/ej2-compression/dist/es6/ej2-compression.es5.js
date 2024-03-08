import { Encoding, Save } from '@syncfusion/ej2-file-utils';

/* eslint-disable */
var Utils = /** @__PURE__ @class */ (function () {
    function Utils() {
    }
    Utils.bitReverse = function (value) {
        return (Utils.reverseBits[value & 15] << 12
            | Utils.reverseBits[(value >> 4) & 15] << 8
            | Utils.reverseBits[(value >> 8) & 15] << 4
            | Utils.reverseBits[value >> 12]);
    };
    Utils.bitConverterToInt32 = function (value, index) {
        return value[index] | value[index + 1] << 8 | value[index + 2] << 16 | value[index + 3] << 24;
    };
    Utils.bitConverterToInt16 = function (value, index) {
        return value[index] | value[index + 1] << 8;
    };
    Utils.bitConverterToUInt32 = function (value) {
        var uint = new Uint32Array(1);
        uint[0] = value;
        return uint[0];
    };
    Utils.bitConverterToUInt16 = function (value, index) {
        var uint = new Uint16Array(1);
        uint[0] = (value[index] | value[index + 1] << 8);
        return uint[0];
    };
    Utils.bitConverterUintToInt32 = function (value) {
        var uint = new Int32Array(1);
        uint[0] = value;
        return uint[0];
    };
    Utils.bitConverterInt32ToUint = function (value) {
        var uint = new Uint32Array(1);
        uint[0] = value;
        return uint[0];
    };
    Utils.bitConverterInt32ToInt16 = function (value) {
        var uint = new Int16Array(1);
        uint[0] = value;
        return uint[0];
    };
    Utils.byteToString = function (value) {
        var str = '';
        for (var i = 0; i < value.length; i++) {
            str += String.fromCharCode(value[i]);
        }
        return str;
    };
    Utils.byteIntToString = function (value) {
        var str = '';
        for (var i = 0; i < value.length; i++) {
            str += String.fromCharCode(value[i]);
        }
        return str;
    };
    Utils.arrayCopy = function (source, sourceIndex, destination, destinationIndex, dataToCopy) {
        var temp = new Uint8Array(source.buffer, sourceIndex);
        var data = temp.subarray(0, dataToCopy);
        destination.set(data, destinationIndex);
    };
    Utils.mergeArray = function (arrayOne, arrayTwo) {
        var mergedArray = new Uint8Array(arrayOne.length + arrayTwo.length);
        mergedArray.set(arrayOne);
        mergedArray.set(arrayTwo, arrayOne.length);
        return mergedArray;
    };
    /**
     * @private
     */
    Utils.encodedString = function (input) {
        var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        var chr1;
        var chr2;
        var chr3;
        var encode1;
        var encode2;
        var encode3;
        var encode4;
        var count = 0;
        var resultIndex = 0;
        /*let dataUrlPrefix: string = 'data:';*/
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
        var totalLength = input.length * 3 / 4;
        if (input.charAt(input.length - 1) === keyStr.charAt(64)) {
            totalLength--;
        }
        if (input.charAt(input.length - 2) === keyStr.charAt(64)) {
            totalLength--;
        }
        if (totalLength % 1 !== 0) {
            // totalLength is not an integer, the length does not match a valid
            // base64 content. That can happen if:
            // - the input is not a base64 content
            // - the input is *almost* a base64 content, with a extra chars at the
            // beginning or at the end
            // - the input uses a base64 variant (base64url for example)
            throw new Error('Invalid base64 input, bad content length.');
        }
        var output = new Uint8Array(totalLength | 0);
        while (count < input.length) {
            encode1 = keyStr.indexOf(input.charAt(count++));
            encode2 = keyStr.indexOf(input.charAt(count++));
            encode3 = keyStr.indexOf(input.charAt(count++));
            encode4 = keyStr.indexOf(input.charAt(count++));
            chr1 = (encode1 << 2) | (encode2 >> 4);
            chr2 = ((encode2 & 15) << 4) | (encode3 >> 2);
            chr3 = ((encode3 & 3) << 6) | encode4;
            output[resultIndex++] = chr1;
            if (encode3 !== 64) {
                output[resultIndex++] = chr2;
            }
            if (encode4 !== 64) {
                output[resultIndex++] = chr3;
            }
        }
        return output;
    };
    Utils.reverseBits = [0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15];
    Utils.huffCodeLengthOrders = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
    return Utils;
}());

/* eslint-enable */

/* eslint-disable */
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
var ZipArchive = /** @__PURE__ @class */ (function () {
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
var ZipArchiveItemHelper = /** @__PURE__ @class */ (function () {
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
/**
 * Class represent unique ZipArchive item
 * ```typescript
 * let archiveItem = new ZipArchiveItem(archive, 'directoryName\fileName.txt');
 * ```
 */
var ZipArchiveItem = /** @__PURE__ @class */ (function () {
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

/* eslint-enable */

/* eslint-disable */
/**
 * array literal codes
 */
var ARR_LITERAL_CODES = new Int16Array(286);
var ARR_LITERAL_LENGTHS = new Uint8Array(286);
var ARR_DISTANCE_CODES = new Int16Array(30);
var ARR_DISTANCE_LENGTHS = new Uint8Array(30);
/**
 * represent compression stream writer
 * ```typescript
 * let compressedWriter = new CompressedStreamWriter();
 * let text: string = 'Hello world!!!';
 * compressedWriter.write(text, 0, text.length);
 * compressedWriter.close();
 * ```
 */
var CompressedStreamWriter = /** @__PURE__ @class */ (function () {
    /**
     * Initializes compressor and writes ZLib header if needed.
     * @param {boolean} noWrap - optional if true, ZLib header and checksum will not be written.
     */
    function CompressedStreamWriter(noWrap) {
        this.pendingBuffer = new Uint8Array(1 << 16);
        this.pendingBufLength = 0;
        this.pendingBufCache = 0;
        this.pendingBufBitsInCache = 0;
        this.bufferPosition = 0;
        this.extraBits = 0;
        this.currentHash = 0;
        this.matchStart = 0;
        this.matchLength = 0;
        this.matchPrevAvail = false;
        this.blockStart = 0;
        this.stringStart = 0;
        this.lookAhead = 0;
        this.totalBytesIn = 0;
        this.inputOffset = 0;
        this.inputEnd = 0;
        this.windowSize = 1 << 15;
        this.windowMask = this.windowSize - 1;
        this.hashSize = 1 << 15;
        this.hashMask = this.hashSize - 1;
        this.hashShift = Math.floor((15 + 3 - 1) / 3);
        this.maxDist = this.windowSize - 262;
        this.checkSum = 1;
        this.noWrap = false;
        if (!CompressedStreamWriter.isHuffmanTreeInitiated) {
            CompressedStreamWriter.initHuffmanTree();
            CompressedStreamWriter.isHuffmanTreeInitiated = true;
        }
        this.treeLiteral = new CompressorHuffmanTree(this, 286, 257, 15);
        this.treeDistances = new CompressorHuffmanTree(this, 30, 1, 15);
        this.treeCodeLengths = new CompressorHuffmanTree(this, 19, 4, 7);
        this.arrDistances = new Uint16Array((1 << 14));
        this.arrLiterals = new Uint8Array((1 << 14));
        this.stream = [];
        this.dataWindow = new Uint8Array(2 * this.windowSize);
        this.hashHead = new Int16Array(this.hashSize);
        this.hashPrevious = new Int16Array(this.windowSize);
        this.blockStart = this.stringStart = 1;
        this.noWrap = noWrap;
        if (!noWrap) {
            this.writeZLibHeader();
        }
    }
    Object.defineProperty(CompressedStreamWriter.prototype, "compressedData", {
        /**
         * get compressed data
         */
        get: function () {
            return this.stream;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompressedStreamWriter.prototype, "getCompressedString", {
        get: function () {
            var compressedString = '';
            if (this.stream !== undefined) {
                for (var i = 0; i < this.stream.length; i++) {
                    compressedString += String.fromCharCode.apply(null, this.stream[i]);
                }
            }
            return compressedString;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Compresses data and writes it to the stream.
     * @param {Uint8Array} data - data to compress
     * @param {number} offset - offset in data
     * @param {number} length - length of the data
     * @returns {void}
     */
    CompressedStreamWriter.prototype.write = function (data, offset, length) {
        if (data === undefined || data === null) {
            throw new Error('ArgumentException: data cannot null or undefined');
        }
        var end = offset + length;
        if (0 > offset || offset > end || end > data.length) {
            throw new Error('ArgumentOutOfRangeException: Offset or length is incorrect');
        }
        if (typeof data === 'string') {
            var encode = new Encoding(false);
            encode.type = 'Utf8';
            data = new Uint8Array(encode.getBytes(data, 0, data.length));
            end = offset + data.length;
        }
        this.inputBuffer = data;
        this.inputOffset = offset;
        this.inputEnd = end;
        if (!this.noWrap) {
            this.checkSum = ChecksumCalculator.checksumUpdate(this.checkSum, this.inputBuffer, this.inputOffset, end);
        }
        while (!(this.inputEnd === this.inputOffset) || !(this.pendingBufLength === 0)) {
            this.pendingBufferFlush();
            this.compressData(false);
        }
    };
    /**
     * write ZLib header to the compressed data
     * @return {void}
     */
    CompressedStreamWriter.prototype.writeZLibHeader = function () {
        /* Initialize header.*/
        var headerDate = (8 + (7 << 4)) << 8;
        /* Save compression level.*/
        headerDate |= ((5 >> 2) & 3) << 6;
        /* Align header.*/
        headerDate += 31 - (headerDate % 31);
        /* Write header to stream.*/
        this.pendingBufferWriteShortBytes(headerDate);
    };
    /**
     *  Write Most Significant Bytes in to stream
     * @param {number} s - check sum value
     */
    CompressedStreamWriter.prototype.pendingBufferWriteShortBytes = function (s) {
        this.pendingBuffer[this.pendingBufLength++] = s >> 8;
        this.pendingBuffer[this.pendingBufLength++] = s;
    };
    CompressedStreamWriter.prototype.compressData = function (finish) {
        var success;
        do {
            this.fillWindow();
            var canFlush = (finish && this.inputEnd === this.inputOffset);
            success = this.compressSlow(canFlush, finish);
        } while (this.pendingBufLength === 0 && success);
        return success;
    };
    CompressedStreamWriter.prototype.compressSlow = function (flush, finish) {
        if (this.lookAhead < 262 && !flush) {
            return false;
        }
        while (this.lookAhead >= 262 || flush) {
            if (this.lookAhead === 0) {
                return this.lookAheadCompleted(finish);
            }
            if (this.stringStart >= 2 * this.windowSize - 262) {
                this.slideWindow();
            }
            var prevMatch = this.matchStart;
            var prevLen = this.matchLength;
            if (this.lookAhead >= 3) {
                this.discardMatch();
            }
            if (prevLen >= 3 && this.matchLength <= prevLen) {
                prevLen = this.matchPreviousBest(prevMatch, prevLen);
            }
            else {
                this.matchPreviousAvailable();
            }
            if (this.bufferPosition >= (1 << 14)) {
                return this.huffmanIsFull(finish);
            }
        }
        return true;
    };
    CompressedStreamWriter.prototype.discardMatch = function () {
        var hashHead = this.insertString();
        if (hashHead !== 0 && this.stringStart - hashHead <= this.maxDist && this.findLongestMatch(hashHead)) {
            if (this.matchLength <= 5 && (this.matchLength === 3 && this.stringStart - this.matchStart > 4096)) {
                this.matchLength = 3 - 1;
            }
        }
    };
    CompressedStreamWriter.prototype.matchPreviousAvailable = function () {
        if (this.matchPrevAvail) {
            this.huffmanTallyLit(this.dataWindow[this.stringStart - 1] & 0xff);
        }
        this.matchPrevAvail = true;
        this.stringStart++;
        this.lookAhead--;
    };
    CompressedStreamWriter.prototype.matchPreviousBest = function (prevMatch, prevLen) {
        this.huffmanTallyDist(this.stringStart - 1 - prevMatch, prevLen);
        prevLen -= 2;
        do {
            this.stringStart++;
            this.lookAhead--;
            if (this.lookAhead >= 3) {
                this.insertString();
            }
        } while (--prevLen > 0);
        this.stringStart++;
        this.lookAhead--;
        this.matchPrevAvail = false;
        this.matchLength = 3 - 1;
        return prevLen;
    };
    CompressedStreamWriter.prototype.lookAheadCompleted = function (finish) {
        if (this.matchPrevAvail) {
            this.huffmanTallyLit(this.dataWindow[this.stringStart - 1] & 0xff);
        }
        this.matchPrevAvail = false;
        this.huffmanFlushBlock(this.dataWindow, this.blockStart, this.stringStart - this.blockStart, finish);
        this.blockStart = this.stringStart;
        return false;
    };
    CompressedStreamWriter.prototype.huffmanIsFull = function (finish) {
        var len = this.stringStart - this.blockStart;
        if (this.matchPrevAvail) {
            len--;
        }
        var lastBlock = (finish && this.lookAhead === 0 && !this.matchPrevAvail);
        this.huffmanFlushBlock(this.dataWindow, this.blockStart, len, lastBlock);
        this.blockStart += len;
        return !lastBlock;
    };
    CompressedStreamWriter.prototype.fillWindow = function () {
        if (this.stringStart >= this.windowSize + this.maxDist) {
            this.slideWindow();
        }
        while (this.lookAhead < 262 && this.inputOffset < this.inputEnd) {
            var more = 2 * this.windowSize - this.lookAhead - this.stringStart;
            if (more > this.inputEnd - this.inputOffset) {
                more = this.inputEnd - this.inputOffset;
            }
            this.dataWindow.set(this.inputBuffer.subarray(this.inputOffset, this.inputOffset + more), this.stringStart + this.lookAhead);
            this.inputOffset += more;
            this.totalBytesIn += more;
            this.lookAhead += more;
        }
        if (this.lookAhead >= 3) {
            this.updateHash();
        }
    };
    CompressedStreamWriter.prototype.slideWindow = function () {
        this.dataWindow.set(this.dataWindow.subarray(this.windowSize, this.windowSize + this.windowSize), 0);
        this.matchStart -= this.windowSize;
        this.stringStart -= this.windowSize;
        this.blockStart -= this.windowSize;
        for (var i = 0; i < this.hashSize; ++i) {
            var m = this.hashHead[i] & 0xffff;
            this.hashHead[i] = (((m >= this.windowSize) ? (m - this.windowSize) : 0));
        }
        for (var i = 0; i < this.windowSize; i++) {
            var m = this.hashPrevious[i] & 0xffff;
            this.hashPrevious[i] = ((m >= this.windowSize) ? (m - this.windowSize) : 0);
        }
    };
    CompressedStreamWriter.prototype.insertString = function () {
        var match;
        var hash = ((this.currentHash << this.hashShift) ^ this.dataWindow[this.stringStart + (3 - 1)]) & this.hashMask;
        this.hashPrevious[this.stringStart & this.windowMask] = match = this.hashHead[hash];
        this.hashHead[hash] = this.stringStart;
        this.currentHash = hash;
        return match & 0xffff;
    };
    CompressedStreamWriter.prototype.findLongestMatch = function (curMatch) {
        var chainLen = 4096;
        var niceLen = 258;
        var scan = this.stringStart;
        var match;
        var bestEnd = this.stringStart + this.matchLength;
        var bestLength = Math.max(this.matchLength, 3 - 1);
        var limit = Math.max(this.stringStart - this.maxDist, 0);
        var stringEnd = this.stringStart + 258 - 1;
        var scanEnd1 = this.dataWindow[bestEnd - 1];
        var scanEnd = this.dataWindow[bestEnd];
        var data = this.dataWindow;
        if (bestLength >= 32) {
            chainLen >>= 2;
        }
        if (niceLen > this.lookAhead) {
            niceLen = this.lookAhead;
        }
        do {
            if (data[curMatch + bestLength] !== scanEnd ||
                data[curMatch + bestLength - 1] !== scanEnd1 ||
                data[curMatch] !== data[scan] ||
                data[curMatch + 1] !== data[scan + 1]) {
                continue;
            }
            match = curMatch + 2;
            scan += 2;
            /* tslint:disable */
            while (data[++scan] === data[++match] && data[++scan] === data[++match] &&
                data[++scan] === data[++match] && data[++scan] === data[++match] &&
                data[++scan] === data[++match] && data[++scan] === data[++match] &&
                data[++scan] === data[++match] && data[++scan] === data[++match] && scan < stringEnd) {
                /* tslint:disable */
            }
            if (scan > bestEnd) {
                this.matchStart = curMatch;
                bestEnd = scan;
                bestLength = scan - this.stringStart;
                if (bestLength >= niceLen) {
                    break;
                }
                scanEnd1 = data[bestEnd - 1];
                scanEnd = data[bestEnd];
            }
            scan = this.stringStart;
        } while ((curMatch = (this.hashPrevious[curMatch & this.windowMask] & 0xffff)) > limit && --chainLen !== 0);
        this.matchLength = Math.min(bestLength, this.lookAhead);
        return this.matchLength >= 3;
    };
    CompressedStreamWriter.prototype.updateHash = function () {
        this.currentHash = (this.dataWindow[this.stringStart] << this.hashShift) ^ this.dataWindow[this.stringStart + 1];
    };
    CompressedStreamWriter.prototype.huffmanTallyLit = function (literal) {
        this.arrDistances[this.bufferPosition] = 0;
        this.arrLiterals[this.bufferPosition++] = literal;
        this.treeLiteral.codeFrequencies[literal]++;
        return this.bufferPosition >= (1 << 14);
    };
    CompressedStreamWriter.prototype.huffmanTallyDist = function (dist, len) {
        this.arrDistances[this.bufferPosition] = dist;
        this.arrLiterals[this.bufferPosition++] = (len - 3);
        var lc = this.huffmanLengthCode(len - 3);
        this.treeLiteral.codeFrequencies[lc]++;
        if (lc >= 265 && lc < 285) {
            this.extraBits += Math.floor((lc - 261) / 4);
        }
        var dc = this.huffmanDistanceCode(dist - 1);
        this.treeDistances.codeFrequencies[dc]++;
        if (dc >= 4) {
            this.extraBits += Math.floor((dc / 2 - 1));
        }
        return this.bufferPosition >= (1 << 14);
    };
    CompressedStreamWriter.prototype.huffmanFlushBlock = function (stored, storedOffset, storedLength, lastBlock) {
        this.treeLiteral.codeFrequencies[256]++;
        this.treeLiteral.buildTree();
        this.treeDistances.buildTree();
        this.treeLiteral.calculateBLFreq(this.treeCodeLengths);
        this.treeDistances.calculateBLFreq(this.treeCodeLengths);
        this.treeCodeLengths.buildTree();
        var blTreeCodes = 4;
        for (var i = 18; i > blTreeCodes; i--) {
            if (this.treeCodeLengths.codeLengths[CompressorHuffmanTree.huffCodeLengthOrders[i]] > 0) {
                blTreeCodes = i + 1;
            }
        }
        var opt_len = 14 + blTreeCodes * 3 + this.treeCodeLengths.getEncodedLength() +
            this.treeLiteral.getEncodedLength() + this.treeDistances.getEncodedLength() + this.extraBits;
        var static_len = this.extraBits;
        for (var i = 0; i < 286; i++) {
            static_len += this.treeLiteral.codeFrequencies[i] * ARR_LITERAL_LENGTHS[i];
        }
        for (var i = 0; i < 30; i++) {
            static_len += this.treeDistances.codeFrequencies[i] * ARR_DISTANCE_LENGTHS[i];
        }
        if (opt_len >= static_len) {
            // Force static trees.
            opt_len = static_len;
        }
        if (storedOffset >= 0 && storedLength + 4 < opt_len >> 3) {
            this.huffmanFlushStoredBlock(stored, storedOffset, storedLength, lastBlock);
        }
        else if (opt_len == static_len) {
            // Encode with static tree.
            this.pendingBufferWriteBits((1 << 1) + (lastBlock ? 1 : 0), 3);
            this.treeLiteral.setStaticCodes(ARR_LITERAL_CODES, ARR_LITERAL_LENGTHS);
            this.treeDistances.setStaticCodes(ARR_DISTANCE_CODES, ARR_DISTANCE_LENGTHS);
            this.huffmanCompressBlock();
            this.huffmanReset();
        }
        else {
            this.pendingBufferWriteBits((2 << 1) + (lastBlock ? 1 : 0), 3);
            this.huffmanSendAllTrees(blTreeCodes);
            this.huffmanCompressBlock();
            this.huffmanReset();
        }
    };
    CompressedStreamWriter.prototype.huffmanFlushStoredBlock = function (stored, storedOffset, storedLength, lastBlock) {
        this.pendingBufferWriteBits((0 << 1) + (lastBlock ? 1 : 0), 3);
        this.pendingBufferAlignToByte();
        this.pendingBufferWriteShort(storedLength);
        this.pendingBufferWriteShort(~storedLength);
        this.pendingBufferWriteByteBlock(stored, storedOffset, storedLength);
        this.huffmanReset();
    };
    CompressedStreamWriter.prototype.huffmanLengthCode = function (len) {
        if (len === 255) {
            return 285;
        }
        var code = 257;
        while (len >= 8) {
            code += 4;
            len >>= 1;
        }
        return code + len;
    };
    CompressedStreamWriter.prototype.huffmanDistanceCode = function (distance) {
        var code = 0;
        while (distance >= 4) {
            code += 2;
            distance >>= 1;
        }
        return code + distance;
    };
    CompressedStreamWriter.prototype.huffmanSendAllTrees = function (blTreeCodes) {
        this.treeCodeLengths.buildCodes();
        this.treeLiteral.buildCodes();
        this.treeDistances.buildCodes();
        this.pendingBufferWriteBits(this.treeLiteral.treeLength - 257, 5);
        this.pendingBufferWriteBits(this.treeDistances.treeLength - 1, 5);
        this.pendingBufferWriteBits(blTreeCodes - 4, 4);
        for (var rank = 0; rank < blTreeCodes; rank++) {
            this.pendingBufferWriteBits(this.treeCodeLengths.codeLengths[CompressorHuffmanTree.huffCodeLengthOrders[rank]], 3);
        }
        this.treeLiteral.writeTree(this.treeCodeLengths);
        this.treeDistances.writeTree(this.treeCodeLengths);
    };
    CompressedStreamWriter.prototype.huffmanReset = function () {
        this.bufferPosition = 0;
        this.extraBits = 0;
        this.treeLiteral.reset();
        this.treeDistances.reset();
        this.treeCodeLengths.reset();
    };
    CompressedStreamWriter.prototype.huffmanCompressBlock = function () {
        for (var i = 0; i < this.bufferPosition; i++) {
            var literalLen = this.arrLiterals[i] & 255;
            var dist = this.arrDistances[i];
            if (dist-- !== 0) {
                var lc = this.huffmanLengthCode(literalLen);
                this.treeLiteral.writeCodeToStream(lc);
                var bits = Math.floor((lc - 261) / 4);
                if (bits > 0 && bits <= 5) {
                    this.pendingBufferWriteBits(literalLen & ((1 << bits) - 1), bits);
                }
                var dc = this.huffmanDistanceCode(dist);
                this.treeDistances.writeCodeToStream(dc);
                bits = Math.floor(dc / 2 - 1);
                if (bits > 0) {
                    this.pendingBufferWriteBits(dist & ((1 << bits) - 1), bits);
                }
            }
            else {
                this.treeLiteral.writeCodeToStream(literalLen);
            }
        }
        this.treeLiteral.writeCodeToStream(256);
    };
    /**
     * write bits in to internal buffer
     * @param {number} b - source of bits
     * @param {number} count - count of bits to write
     */
    CompressedStreamWriter.prototype.pendingBufferWriteBits = function (b, count) {
        var uint = new Uint32Array(1);
        uint[0] = this.pendingBufCache | (b << this.pendingBufBitsInCache);
        this.pendingBufCache = uint[0];
        this.pendingBufBitsInCache += count;
        this.pendingBufferFlushBits();
    };
    CompressedStreamWriter.prototype.pendingBufferFlush = function (isClose) {
        this.pendingBufferFlushBits();
        if (this.pendingBufLength > 0) {
            var array = new Uint8Array(this.pendingBufLength);
            array.set(this.pendingBuffer.subarray(0, this.pendingBufLength), 0);
            this.stream.push(array);
        }
        this.pendingBufLength = 0;
    };
    CompressedStreamWriter.prototype.pendingBufferFlushBits = function () {
        var result = 0;
        while (this.pendingBufBitsInCache >= 8 && this.pendingBufLength < (1 << 16)) {
            this.pendingBuffer[this.pendingBufLength++] = this.pendingBufCache;
            this.pendingBufCache >>= 8;
            this.pendingBufBitsInCache -= 8;
            result++;
        }
        return result;
    };
    CompressedStreamWriter.prototype.pendingBufferWriteByteBlock = function (data, offset, length) {
        var array = data.subarray(offset, offset + length);
        this.pendingBuffer.set(array, this.pendingBufLength);
        this.pendingBufLength += length;
    };
    CompressedStreamWriter.prototype.pendingBufferWriteShort = function (s) {
        this.pendingBuffer[this.pendingBufLength++] = s;
        this.pendingBuffer[this.pendingBufLength++] = (s >> 8);
    };
    CompressedStreamWriter.prototype.pendingBufferAlignToByte = function () {
        if (this.pendingBufBitsInCache > 0) {
            this.pendingBuffer[this.pendingBufLength++] = this.pendingBufCache;
        }
        this.pendingBufCache = 0;
        this.pendingBufBitsInCache = 0;
    };
    /**
     * Huffman Tree literal calculation
     * @private
     */
    CompressedStreamWriter.initHuffmanTree = function () {
        var i = 0;
        while (i < 144) {
            ARR_LITERAL_CODES[i] = CompressorHuffmanTree.bitReverse((0x030 + i) << 8);
            ARR_LITERAL_LENGTHS[i++] = 8;
        }
        while (i < 256) {
            ARR_LITERAL_CODES[i] = CompressorHuffmanTree.bitReverse((0x190 - 144 + i) << 7);
            ARR_LITERAL_LENGTHS[i++] = 9;
        }
        while (i < 280) {
            ARR_LITERAL_CODES[i] = CompressorHuffmanTree.bitReverse((0x000 - 256 + i) << 9);
            ARR_LITERAL_LENGTHS[i++] = 7;
        }
        while (i < 286) {
            ARR_LITERAL_CODES[i] = CompressorHuffmanTree.bitReverse((0x0c0 - 280 + i) << 8);
            ARR_LITERAL_LENGTHS[i++] = 8;
        }
        for (i = 0; i < 30; i++) {
            ARR_DISTANCE_CODES[i] = CompressorHuffmanTree.bitReverse(i << 11);
            ARR_DISTANCE_LENGTHS[i] = 5;
        }
    };
    /**
     * close the stream and write all pending buffer in to stream
     * @returns {void}
     */
    CompressedStreamWriter.prototype.close = function () {
        do {
            this.pendingBufferFlush(true);
            if (!this.compressData(true)) {
                this.pendingBufferFlush(true);
                this.pendingBufferAlignToByte();
                if (!this.noWrap) {
                    this.pendingBufferWriteShortBytes(this.checkSum >> 16);
                    this.pendingBufferWriteShortBytes(this.checkSum & 0xffff);
                }
                this.pendingBufferFlush(true);
            }
        } while (!(this.inputEnd === this.inputOffset) ||
            !(this.pendingBufLength === 0));
    };
    /**
     * release allocated un-managed resource
     * @returns {void}
     */
    CompressedStreamWriter.prototype.destroy = function () {
        this.stream = [];
        this.stream = undefined;
        this.pendingBuffer = undefined;
        this.treeLiteral = undefined;
        this.treeDistances = undefined;
        this.treeCodeLengths = undefined;
        this.arrLiterals = undefined;
        this.arrDistances = undefined;
        this.hashHead = undefined;
        this.hashPrevious = undefined;
        this.dataWindow = undefined;
        this.inputBuffer = undefined;
        this.pendingBufLength = undefined;
        this.pendingBufCache = undefined;
        this.pendingBufBitsInCache = undefined;
        this.bufferPosition = undefined;
        this.extraBits = undefined;
        this.currentHash = undefined;
        this.matchStart = undefined;
        this.matchLength = undefined;
        this.matchPrevAvail = undefined;
        this.blockStart = undefined;
        this.stringStart = undefined;
        this.lookAhead = undefined;
        this.totalBytesIn = undefined;
        this.inputOffset = undefined;
        this.inputEnd = undefined;
        this.windowSize = undefined;
        this.windowMask = undefined;
        this.hashSize = undefined;
        this.hashMask = undefined;
        this.hashShift = undefined;
        this.maxDist = undefined;
        this.checkSum = undefined;
        this.noWrap = undefined;
    };
    CompressedStreamWriter.isHuffmanTreeInitiated = false;
    return CompressedStreamWriter;
}());
/**
 * represent the Huffman Tree
 */
var CompressorHuffmanTree = /** @__PURE__ @class */ (function () {
    /**
     * Create new Huffman Tree
     * @param {CompressedStreamWriter} writer instance
     * @param {number} elementCount - element count
     * @param {number} minCodes - minimum count
     * @param {number} maxLength - maximum count
     */
    function CompressorHuffmanTree(writer, elementCount, minCodes, maxLength) {
        this.writer = writer;
        this.codeMinCount = minCodes;
        this.maxLength = maxLength;
        this.codeFrequency = new Uint16Array(elementCount);
        this.lengthCount = new Int32Array(maxLength);
    }
    Object.defineProperty(CompressorHuffmanTree.prototype, "treeLength", {
        get: function () {
            return this.codeCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompressorHuffmanTree.prototype, "codeLengths", {
        get: function () {
            return this.codeLength;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompressorHuffmanTree.prototype, "codeFrequencies", {
        get: function () {
            return this.codeFrequency;
        },
        enumerable: true,
        configurable: true
    });
    CompressorHuffmanTree.prototype.setStaticCodes = function (codes, lengths) {
        var temp = new Int16Array(codes.length);
        temp.set(codes, 0);
        this.codes = temp;
        var lengthTemp = new Uint8Array(lengths.length);
        lengthTemp.set(lengths, 0);
        this.codeLength = lengthTemp;
    };
    /**
     * reset all code data in tree
     * @returns {void}
     */
    CompressorHuffmanTree.prototype.reset = function () {
        for (var i = 0; i < this.codeFrequency.length; i++) {
            this.codeFrequency[i] = 0;
        }
        this.codes = undefined;
        this.codeLength = undefined;
    };
    /**
     * write code to the compressor output stream
     * @param {number} code - code to be written
     * @returns {void}
     */
    CompressorHuffmanTree.prototype.writeCodeToStream = function (code) {
        this.writer.pendingBufferWriteBits(this.codes[code] & 0xffff, this.codeLength[code]);
    };
    /**
     * calculate code from their frequencies
     * @returns {void}
     */
    CompressorHuffmanTree.prototype.buildCodes = function () {
        var nextCode = new Int32Array(this.maxLength);
        this.codes = new Int16Array(this.codeCount);
        var code = 0;
        for (var bitsCount = 0; bitsCount < this.maxLength; bitsCount++) {
            nextCode[bitsCount] = code;
            code += this.lengthCount[bitsCount] << (15 - bitsCount);
        }
        for (var i = 0; i < this.codeCount; i++) {
            var bits = this.codeLength[i];
            if (bits > 0) {
                this.codes[i] = CompressorHuffmanTree.bitReverse(nextCode[bits - 1]);
                nextCode[bits - 1] += 1 << (16 - bits);
            }
        }
    };
    CompressorHuffmanTree.bitReverse = function (value) {
        return (CompressorHuffmanTree.reverseBits[value & 15] << 12
            | CompressorHuffmanTree.reverseBits[(value >> 4) & 15] << 8
            | CompressorHuffmanTree.reverseBits[(value >> 8) & 15] << 4
            | CompressorHuffmanTree.reverseBits[value >> 12]);
    };
    /**
     * calculate length of compressed data
     * @returns {number}
     */
    CompressorHuffmanTree.prototype.getEncodedLength = function () {
        var len = 0;
        for (var i = 0; i < this.codeFrequency.length; i++) {
            len += this.codeFrequency[i] * this.codeLength[i];
        }
        return len;
    };
    /**
     * calculate code frequencies
     * @param {CompressorHuffmanTree} blTree
     * @returns {void}
     */
    CompressorHuffmanTree.prototype.calculateBLFreq = function (blTree) {
        var maxCount;
        var minCount;
        var count;
        var curLen = -1;
        var i = 0;
        while (i < this.codeCount) {
            count = 1;
            var nextLen = this.codeLength[i];
            if (nextLen === 0) {
                maxCount = 138;
                minCount = 3;
            }
            else {
                maxCount = 6;
                minCount = 3;
                if (curLen !== nextLen) {
                    blTree.codeFrequency[nextLen]++;
                    count = 0;
                }
            }
            curLen = nextLen;
            i++;
            while (i < this.codeCount && curLen === this.codeLength[i]) {
                i++;
                if (++count >= maxCount) {
                    break;
                }
            }
            if (count < minCount) {
                blTree.codeFrequency[curLen] += count;
            }
            else if (curLen !== 0) {
                blTree.codeFrequency[16]++;
            }
            else if (count <= 10) {
                blTree.codeFrequency[17]++;
            }
            else {
                blTree.codeFrequency[18]++;
            }
        }
    };
    /**
     * @param {CompressorHuffmanTree} blTree - write tree to output stream
     * @returns {void}
     */
    CompressorHuffmanTree.prototype.writeTree = function (blTree) {
        var maxRepeatCount;
        var minRepeatCount;
        var currentRepeatCount;
        var currentCodeLength = -1;
        var i = 0;
        while (i < this.codeCount) {
            currentRepeatCount = 1;
            var nextLen = this.codeLength[i];
            if (nextLen === 0) {
                maxRepeatCount = 138;
                minRepeatCount = 3;
            }
            else {
                maxRepeatCount = 6;
                minRepeatCount = 3;
                if (currentCodeLength !== nextLen) {
                    blTree.writeCodeToStream(nextLen);
                    currentRepeatCount = 0;
                }
            }
            currentCodeLength = nextLen;
            i++;
            while (i < this.codeCount && currentCodeLength === this.codeLength[i]) {
                i++;
                if (++currentRepeatCount >= maxRepeatCount) {
                    break;
                }
            }
            if (currentRepeatCount < minRepeatCount) {
                while (currentRepeatCount-- > 0) {
                    blTree.writeCodeToStream(currentCodeLength);
                }
            }
            else if (currentCodeLength !== 0) {
                blTree.writeCodeToStream(16);
                this.writer.pendingBufferWriteBits(currentRepeatCount - 3, 2);
            }
            else if (currentRepeatCount <= 10) {
                blTree.writeCodeToStream(17);
                this.writer.pendingBufferWriteBits(currentRepeatCount - 3, 3);
            }
            else {
                blTree.writeCodeToStream(18);
                this.writer.pendingBufferWriteBits(currentRepeatCount - 11, 7);
            }
        }
    };
    /**
     * Build huffman tree
     * @returns {void}
     */
    CompressorHuffmanTree.prototype.buildTree = function () {
        var codesCount = this.codeFrequency.length;
        var arrTree = new Int32Array(codesCount);
        var treeLength = 0;
        var maxCount = 0;
        for (var n = 0; n < codesCount; n++) {
            var freq = this.codeFrequency[n];
            if (freq !== 0) {
                var pos = treeLength++;
                var pPos = 0;
                while (pos > 0 && this.codeFrequency[arrTree[pPos = Math.floor((pos - 1) / 2)]] > freq) {
                    arrTree[pos] = arrTree[pPos];
                    pos = pPos;
                }
                arrTree[pos] = n;
                maxCount = n;
            }
        }
        while (treeLength < 2) {
            arrTree[treeLength++] =
                (maxCount < 2) ? ++maxCount : 0;
        }
        this.codeCount = Math.max(maxCount + 1, this.codeMinCount);
        var leafsCount = treeLength;
        var nodesCount = leafsCount;
        var child = new Int32Array(4 * treeLength - 2);
        var values = new Int32Array(2 * treeLength - 1);
        for (var i = 0; i < treeLength; i++) {
            var node = arrTree[i];
            var iIndex = 2 * i;
            child[iIndex] = node;
            child[iIndex + 1] = -1;
            values[i] = (this.codeFrequency[node] << 8);
            arrTree[i] = i;
        }
        this.constructHuffmanTree(arrTree, treeLength, values, nodesCount, child);
        this.buildLength(child);
    };
    CompressorHuffmanTree.prototype.constructHuffmanTree = function (arrTree, treeLength, values, nodesCount, child) {
        do {
            var first = arrTree[0];
            var last = arrTree[--treeLength];
            var lastVal = values[last];
            var pPos = 0;
            var path = 1;
            while (path < treeLength) {
                if (path + 1 < treeLength && values[arrTree[path]] > values[arrTree[path + 1]]) {
                    path++;
                }
                arrTree[pPos] = arrTree[path];
                pPos = path;
                path = pPos * 2 + 1;
            }
            while ((path = pPos) > 0 && values[arrTree[pPos = Math.floor((path - 1) / 2)]] > lastVal) {
                arrTree[path] = arrTree[pPos];
            }
            arrTree[path] = last;
            var second = arrTree[0];
            last = nodesCount++;
            child[2 * last] = first;
            child[2 * last + 1] = second;
            var minDepth = Math.min(values[first] & 0xff, values[second] & 0xff);
            values[last] = lastVal = values[first] + values[second] - minDepth + 1;
            pPos = 0;
            path = 1;
            /* tslint:disable */
            while (path < treeLength) {
                if (path + 1 < treeLength && values[arrTree[path]] > values[arrTree[path + 1]]) {
                    path++;
                }
                arrTree[pPos] = arrTree[path];
                pPos = path;
                path = pPos * 2 + 1;
            } /* tslint:disable */
            while ((path = pPos) > 0 && values[arrTree[pPos = Math.floor((path - 1) / 2)]] > lastVal) {
                arrTree[path] = arrTree[pPos];
            }
            arrTree[path] = last;
        } while (treeLength > 1);
    };
    CompressorHuffmanTree.prototype.buildLength = function (child) {
        this.codeLength = new Uint8Array(this.codeFrequency.length);
        var numNodes = Math.floor(child.length / 2);
        var numLeafs = Math.floor((numNodes + 1) / 2);
        var overflow = 0;
        for (var i = 0; i < this.maxLength; i++) {
            this.lengthCount[i] = 0;
        }
        overflow = this.calculateOptimalCodeLength(child, overflow, numNodes);
        if (overflow === 0) {
            return;
        }
        var iIncreasableLength = this.maxLength - 1;
        do {
            while (this.lengthCount[--iIncreasableLength] === 0) {
                /* tslint:disable */
            }
            do {
                this.lengthCount[iIncreasableLength]--;
                this.lengthCount[++iIncreasableLength]++;
                overflow -= (1 << (this.maxLength - 1 - iIncreasableLength));
            } while (overflow > 0 && iIncreasableLength < this.maxLength - 1);
        } while (overflow > 0);
        this.recreateTree(child, overflow, numLeafs);
    };
    CompressorHuffmanTree.prototype.recreateTree = function (child, overflow, numLeafs) {
        this.lengthCount[this.maxLength - 1] += overflow;
        this.lengthCount[this.maxLength - 2] -= overflow;
        var nodePtr = 2 * numLeafs;
        for (var bits = this.maxLength; bits !== 0; bits--) {
            var n = this.lengthCount[bits - 1];
            while (n > 0) {
                var childPtr = 2 * child[nodePtr++];
                if (child[childPtr + 1] === -1) {
                    this.codeLength[child[childPtr]] = bits;
                    n--;
                }
            }
        }
    };
    CompressorHuffmanTree.prototype.calculateOptimalCodeLength = function (child, overflow, numNodes) {
        var lengths = new Int32Array(numNodes);
        lengths[numNodes - 1] = 0;
        for (var i = numNodes - 1; i >= 0; i--) {
            var childIndex = 2 * i + 1;
            if (child[childIndex] !== -1) {
                var bitLength = lengths[i] + 1;
                if (bitLength > this.maxLength) {
                    bitLength = this.maxLength;
                    overflow++;
                }
                lengths[child[childIndex - 1]] = lengths[child[childIndex]] = bitLength;
            }
            else {
                var bitLength = lengths[i];
                this.lengthCount[bitLength - 1]++;
                this.codeLength[child[childIndex - 1]] = lengths[i];
            }
        }
        return overflow;
    };
    CompressorHuffmanTree.reverseBits = [0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15];
    CompressorHuffmanTree.huffCodeLengthOrders = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
    return CompressorHuffmanTree;
}());
/**
 * Checksum calculator, based on Adler32 algorithm.
 */
var ChecksumCalculator = /** @__PURE__ @class */ (function () {
    function ChecksumCalculator() {
    }
    /**
     * Updates checksum by calculating checksum of the
     * given buffer and adding it to current value.
     * @param {number} checksum - current checksum.
     * @param {Uint8Array} buffer - data byte array.
     * @param {number} offset - offset in the buffer.
     * @param {number} length - length of data to be used from the stream.
     * @returns {number}
     */
    ChecksumCalculator.checksumUpdate = function (checksum, buffer, offset, length) {
        var uint = new Uint32Array(1);
        uint[0] = checksum;
        var checksum_uint = uint[0];
        var s1 = uint[0] = checksum_uint & 65535;
        var s2 = uint[0] = checksum_uint >> ChecksumCalculator.checkSumBitOffset;
        while (length > 0) {
            var steps = Math.min(length, ChecksumCalculator.checksumIterationCount);
            length -= steps;
            while (--steps >= 0) {
                s1 = s1 + (uint[0] = (buffer[offset++] & 255));
                s2 = s2 + s1;
            }
            s1 %= ChecksumCalculator.checksumBase;
            s2 %= ChecksumCalculator.checksumBase;
        }
        checksum_uint = (s2 << ChecksumCalculator.checkSumBitOffset) | s1;
        return checksum_uint;
    };
    ChecksumCalculator.checkSumBitOffset = 16;
    ChecksumCalculator.checksumBase = 65521;
    ChecksumCalculator.checksumIterationCount = 3800;
    return ChecksumCalculator;
}());

/* eslint-enable */

/* eslint-disable */
var DecompressorHuffmanTree = /** @__PURE__ @class */ (function () {
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

/* eslint-enable */

/* eslint-disable */
/// <summary>
/// Checksum calculator, based on Adler32 algorithm.
/// </summary>
var ChecksumCalculator$1 = /** @__PURE__ @class */ (function () {
    function ChecksumCalculator() {
    }
    /// <summary>
    /// Updates checksum by calculating checksum of the
    /// given buffer and adding it to current value.
    /// </summary>
    /// <param name="checksum">Current checksum.</param>
    /// <param name="buffer">Data byte array.</param>
    /// <param name="offset">Offset in the buffer.</param>
    /// <param name="length">Length of data to be used from the stream.</param>
    ChecksumCalculator.ChecksumUpdate = function (checksum, buffer, offset, length) {
        var checkSumUInt = checksum;
        var s1 = checkSumUInt & 65535;
        var s2 = checkSumUInt >> this.DEF_CHECKSUM_BIT_OFFSET;
        while (length > 0) {
            var steps = Math.min(length, this.DEF_CHECKSUM_ITERATIONSCOUNT);
            length -= steps;
            while (--steps >= 0) {
                s1 = s1 + (buffer[offset++] & 255);
                s2 = s2 + s1;
            }
            s1 %= this.DEF_CHECKSUM_BASE;
            s2 %= this.DEF_CHECKSUM_BASE;
        }
        checkSumUInt = (s2 << this.DEF_CHECKSUM_BIT_OFFSET) | s1;
        checksum = checkSumUInt;
    };
    /// <summary>
    /// Generates checksum by calculating checksum of the
    /// given buffer.
    /// </summary>
    /// <param name="buffer">Data byte array.</param>
    /// <param name="offset">Offset in the buffer.</param>
    /// <param name="length">Length of data to be used from the stream.</param>
    ChecksumCalculator.ChecksumGenerate = function (buffer, offset, length) {
        var result = 1;
        ChecksumCalculator.ChecksumUpdate(result, buffer, offset, length);
        return result;
    };
    /// <summary>
    /// Bits offset, used in adler checksum calculation.
    /// </summary>
    ChecksumCalculator.DEF_CHECKSUM_BIT_OFFSET = 16;
    /// <summary>
    /// Lagrest prime, less than 65535
    /// </summary>
    ChecksumCalculator.DEF_CHECKSUM_BASE = 65521;
    /// <summary>
    /// Count of iteration used in calculated of the adler checksumm.
    /// </summary>
    ChecksumCalculator.DEF_CHECKSUM_ITERATIONSCOUNT = 3800;
    return ChecksumCalculator;
}());

/* eslint-enable */

/* eslint-disable */
var CompressedStreamReader = /** @__PURE__ @class */ (function () {
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
        ChecksumCalculator$1.ChecksumUpdate(this.mCheckSum, buffer, offset, length);
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
var Stream = /** @__PURE__ @class */ (function () {
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

/* eslint-enable */

/**
 * export ZipArchive class
 */

export { ZipArchive, ZipArchiveItemHelper, ZipArchiveItem, CompressedStreamWriter, CompressorHuffmanTree, ChecksumCalculator, Utils, DecompressorHuffmanTree, CompressedStreamReader, Stream };
//# sourceMappingURL=ej2-compression.es5.js.map
