import { Chart3DAxis } from '../axis/axis';
import { Size } from '@syncfusion/ej2-svg-base';
import { Chart3D } from '../chart3D';
import { NiceIntervals } from '../axis/axis-helper';
/**
 * The `DateTime` module is used to render datetime axis.
 */
export declare class DateTime3D extends NiceIntervals {
    /** @private */
    min: number;
    /** @private */
    max: number;
    /**
     * Constructor for the dateTime module.
     *
     * @param {Chart3D} chart - Chart3D instance.
     * @private
     */
    constructor(chart?: Chart3D);
    /**
     * Calculates the range and interval for the specified axis based on the provided size.
     *
     * @param {Size} size - The size of the chart area used for range and interval calculation.
     * @param {Chart3DAxis} axis - The axis for which the range and interval are calculated.
     * @returns {void}
     */
    calculateRangeAndInterval(size: Size, axis: Chart3DAxis): void;
    /**
     * Retrieves the actual range for the specified axis based on the provided size.
     *
     * @param {Chart3DAxis} axis - The axis for which the actual range is calculated.
     * @param {Size} size - The size of the chart area used in the range calculation.
     * @returns {void}
     */
    getActualRange(axis: Chart3DAxis, size: Size): void;
    /**
     * Applies range padding to the specified axis based on the provided size.
     *
     * @param {Chart3DAxis} axis - The axis to which range padding is applied.
     * @param {Size} size - The size of the chart area used in the padding calculation.
     * @returns {void}
     */
    applyRangePadding(axis: Chart3DAxis, size: Size): void;
    /**
     * Determines the year values within the specified date range with consideration for range padding and interval.
     *
     * @param {Date} minimum - The minimum date of the range.
     * @param {Date} maximum - The maximum date of the range.
     * @param {ChartRangePadding} rangePadding - The type of range padding to apply.
     * @param {number} interval - The desired interval between years.
     * @returns {void}
     */
    private getYear;
    /**
     * Determines the month values within the specified date range with consideration for range padding and interval.
     *
     * @param {Date} minimum - The minimum date of the range.
     * @param {Date} maximum - The maximum date of the range.
     * @param {ChartRangePadding} rangePadding - The type of range padding to apply.
     * @param {number} interval - The desired interval between months.
     * @returns {void}
     */
    private getMonth;
    /**
     * Determines the day values within the specified date range with consideration for range padding and interval.
     *
     * @param {Date} minimum - The minimum date of the range.
     * @param {Date} maximum - The maximum date of the range.
     * @param {ChartRangePadding} rangePadding - The type of range padding to apply.
     * @param {number} interval - The desired interval between days.
     * @returns {void}
     */
    private getDay;
    /**
     * Determines the hour values within the specified date range with consideration for range padding and interval.
     *
     * @param {Date} minimum - The minimum date of the range.
     * @param {Date} maximum - The maximum date of the range.
     * @param {ChartRangePadding} rangePadding - The type of range padding to apply.
     * @param {number} interval - The desired interval between hours.
     * @returns {void}
     */
    private getHour;
    /**
     * Calculates the visible range for the specified axis based on the provided size.
     *
     * @param {Size} size - The size of the chart area used in the visible range calculation.
     * @param {Chart3DAxis} axis - The axis for which the visible range is calculated.
     * @returns {void}
     */
    protected calculateVisibleRange(size: Size, axis: Chart3DAxis): void;
    /**
     * Calculate visible labels for the axis.
     *
     * @param {Chart3DAxis} axis -  The axis for which the labels are calculated.
     * @param {Chart3D} chart chart
     * @returns {void}
     * @private
     */
    calculateVisibleLabels(axis: Chart3DAxis, chart: Chart3D): void;
    /**
     * Increases a date-time interval by the specified value for the given axis.
     *
     * @param {Chart3DAxis} axis - The axis for which the date-time interval is increased.
     * @param {number} value - The value by which to increase the interval.
     * @param {number} interval - The original interval to be adjusted.
     * @returns {Date} - The adjusted date-time interval.
     * @private
     */
    increaseDateTimeInterval(axis: Chart3DAxis, value: number, interval: number): Date;
    /**
     * Aligns the starting date of the range for the specified axis based on the provided date and interval size.
     *
     * @param {Chart3DAxis} axis - The axis for which the range start is aligned.
     * @param {number} sDate - The date in numerical format to be aligned.
     * @param {number} intervalSize - The size of the interval used for alignment.
     * @returns {Date} - The aligned date for the range start.
     * @private
     */
    private alignRangeStart;
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the date time axis.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
