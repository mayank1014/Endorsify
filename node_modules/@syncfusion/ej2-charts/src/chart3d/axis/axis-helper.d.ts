import { Double3D } from '../axis/double-axis';
import { Chart3DAxis } from './axis';
import { Size } from '@syncfusion/ej2-svg-base';
/**
 * Common axis classes
 *
 * @private
 */
export declare class NiceIntervals extends Double3D {
    /**
     * Calculates a nice interval for a date-time axis based on the given size and data range.
     *
     * @param {Chart3DAxis} axis - The date-time axis for which the nice interval is calculated.
     * @param {Size} size - The size of the chart area.
     * @param {number} start - The start value of the data range.
     * @param {number} end - The end value of the data range.
     * @returns {number} - The calculated nice interval for the date-time axis.
     */
    calculateDateTimeNiceInterval(axis: Chart3DAxis, size: Size, start: number, end: number): number;
    /**
     * To get the skeleton for the DateTime axis.
     *
     * @param {Chart3DAxis} axis - The date-time axis for which the skeleton is calculated.
     * @returns {string} - Skeleton format.
     * @private
     */
    getSkeleton(axis: Chart3DAxis): string;
    /**
     * Find label format for axis
     *
     * @param {Chart3DAxis} axis - The  axis for which the label format is calculated.
     * @returns {string} - The axis label format.
     * @private
     */
    findCustomFormats(axis: Chart3DAxis): string;
}
