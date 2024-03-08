/* eslint-disable */
/// <summary>
/// Checksum calculator, based on Adler32 algorithm.
/// </summary>
var ChecksumCalculator = /** @class */ (function () {
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
export { ChecksumCalculator };
/* eslint-enable */ 
