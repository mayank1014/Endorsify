var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Double3D } from '../axis/double-axis';
/**
 * Common axis classes
 *
 * @private
 */
var NiceIntervals = /** @class */ (function (_super) {
    __extends(NiceIntervals, _super);
    function NiceIntervals() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Calculates a nice interval for a date-time axis based on the given size and data range.
     *
     * @param {Chart3DAxis} axis - The date-time axis for which the nice interval is calculated.
     * @param {Size} size - The size of the chart area.
     * @param {number} start - The start value of the data range.
     * @param {number} end - The end value of the data range.
     * @returns {number} - The calculated nice interval for the date-time axis.
     */
    NiceIntervals.prototype.calculateDateTimeNiceInterval = function (axis, size, start, end) {
        var oneDay = 24 * 60 * 60 * 1000;
        var startDate = new Date(start);
        var endDate = new Date(end);
        var totalDays = (Math.abs((startDate.getTime() - endDate.getTime()) / (oneDay)));
        var interval;
        axis.actualIntervalType = axis.intervalType;
        var type = axis.intervalType;
        switch (type) {
            case 'Years':
                interval = this.calculateNumericNiceInterval(axis, totalDays / 365, size);
                break;
            case 'Months':
                interval = this.calculateNumericNiceInterval(axis, totalDays / 30, size);
                break;
            case 'Days':
                interval = this.calculateNumericNiceInterval(axis, totalDays, size);
                break;
            case 'Hours':
                interval = this.calculateNumericNiceInterval(axis, totalDays * 24, size);
                break;
            case 'Minutes':
                interval = this.calculateNumericNiceInterval(axis, totalDays * 24 * 60, size);
                break;
            case 'Seconds':
                interval = this.calculateNumericNiceInterval(axis, totalDays * 24 * 60 * 60, size);
                break;
            case 'Auto':
                interval = this.calculateNumericNiceInterval(axis, totalDays / 365, size);
                if (interval >= 1) {
                    axis.actualIntervalType = 'Years';
                    return interval;
                }
                interval = this.calculateNumericNiceInterval(axis, totalDays / 30, size);
                if (interval >= 1) {
                    axis.actualIntervalType = 'Months';
                    return interval;
                }
                interval = this.calculateNumericNiceInterval(axis, totalDays, size);
                if (interval >= 1) {
                    axis.actualIntervalType = 'Days';
                    return interval;
                }
                interval = this.calculateNumericNiceInterval(axis, totalDays * 24, size);
                if (interval >= 1) {
                    axis.actualIntervalType = 'Hours';
                    return interval;
                }
                interval = this.calculateNumericNiceInterval(axis, totalDays * 24 * 60, size);
                if (interval >= 1) {
                    axis.actualIntervalType = 'Minutes';
                    return interval;
                }
                interval = this.calculateNumericNiceInterval(axis, totalDays * 24 * 60 * 60, size);
                axis.actualIntervalType = 'Seconds';
                return interval;
        }
        return interval;
    };
    /**
     * To get the skeleton for the DateTime axis.
     *
     * @param {Chart3DAxis} axis - The date-time axis for which the skeleton is calculated.
     * @returns {string} - Skeleton format.
     * @private
     */
    NiceIntervals.prototype.getSkeleton = function (axis) {
        var skeleton;
        var intervalType = axis.actualIntervalType;
        if (axis.skeleton) {
            return axis.skeleton;
        }
        if (intervalType === 'Years') {
            skeleton = ((axis.valueType === 'DateTime' && axis.isIntervalInDecimal) ? 'y' : 'yMMM');
        }
        else if (intervalType === 'Months') {
            skeleton = 'MMMd';
        }
        else if (intervalType === 'Days') {
            skeleton = (axis.valueType === 'DateTime' ? 'MMMd' : 'yMd');
        }
        else if (intervalType === 'Hours') {
            skeleton = (axis.valueType === 'DateTime' ? 'Hm' : 'EHm');
        }
        else if (intervalType === 'Minutes') {
            skeleton = 'Hms';
        }
        else {
            skeleton = 'Hms';
        }
        return skeleton;
    };
    /**
     * Find label format for axis
     *
     * @param {Chart3DAxis} axis - The  axis for which the label format is calculated.
     * @returns {string} - The axis label format.
     * @private
     */
    NiceIntervals.prototype.findCustomFormats = function (axis) {
        var labelFormat = axis.labelFormat ? axis.labelFormat : '';
        if (!axis.skeleton && axis.actualIntervalType === 'Months' && !labelFormat) {
            labelFormat = axis.valueType === 'DateTime' ? 'MMM yyyy' : 'yMMM';
        }
        return labelFormat;
    };
    return NiceIntervals;
}(Double3D));
export { NiceIntervals };
