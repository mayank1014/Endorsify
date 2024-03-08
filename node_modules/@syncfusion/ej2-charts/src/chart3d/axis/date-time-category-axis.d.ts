import { Chart3DAxis } from '../axis/axis';
import { Category3D } from '../axis/category-axis';
import { Size } from '@syncfusion/ej2-svg-base';
import { Chart3D } from '../chart3D';
import { IntervalType } from '../../common/utils/enum';
/**
 * The DatetimeCategory module is used to render date time category axis.
 */
export declare class DateTimeCategory3D extends Category3D {
    private axisSize;
    /**
     * Constructor for the category module.
     *
     * @param {Chart3D} chart - Chart3D instance.
     * @private
     */
    constructor(chart: Chart3D);
    /**
     * Calculates the range and interval for the specified axis based on the provided size.
     *
     * @param {Size} size - The size of the chart area used for range and interval calculation.
     * @param {Chart3DAxis} axis - The axis for which the range and interval are calculated.
     * @returns {void}
     */
    calculateRangeAndInterval(size: Size, axis: Chart3DAxis): void;
    /**
     * Calculates and updates the visible labels for the specified axis.
     *
     * @param {Chart3DAxis} axis - The axis for which visible labels are calculated.
     * @returns {void}
     */
    calculateVisibleLabels(axis: Chart3DAxis): void;
    /**
     * To get the indexed axis label text with format for DateTimeCategory axis.
     *
     * @param {string} value value
     * @param {Function} format format
     * @returns {string} Indexed axis label text
     */
    getIndexedAxisLabel(value: string, format: Function): string;
    /**
     * Checks whether two dates have the same interval value of the specified type at the given index.
     *
     * @param {number} currentDate - The current date to be compared.
     * @param {number} previousDate - The previous date to be compared.
     * @param {IntervalType} type - The type of interval (year, month, day, etc.).
     * @param {number} index - The index within the interval.
     * @returns {boolean} - True if the two dates have the same interval value; otherwise, false.
     */
    sameInterval(currentDate: number, previousDate: number, type: IntervalType, index: number): boolean;
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name
     */
    protected getModuleName(): string;
    /**
     * To destroy the datetime category axis.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
