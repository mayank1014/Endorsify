/* eslint-disable */
var Utils = /** @class */ (function () {
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
export { Utils };
/* eslint-enable */ 
