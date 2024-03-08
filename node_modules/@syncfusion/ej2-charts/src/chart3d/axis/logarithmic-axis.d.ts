import { Chart3DAxis } from '../axis/axis';
import { Double3D } from '../axis/double-axis';
import { Size } from '@syncfusion/ej2-svg-base';
import { Chart3D } from '../chart3D';
/**
 * The `Logarithmic` module is used to render log axis.
 */
export declare class Logarithmic3D extends Double3D {
    /**
     * Constructor for the logerithmic module.
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
     * Calculates actual range for the axis.
     *
     * @param {Chart3DAxis} axis - The axis for which the range and interval are calculated.
     * @param {Size} size - The size of the axis.
     * @returns {void}
     * @private
     */
    getActualRange(axis: Chart3DAxis, size: Size): void;
    /**
     * Calculates visible range for the axis.
     *
     * @param {Size} size - The size of the axis.
     * @param {Chart3DAxis} axis - The axis for which the range and interval are calculated.
     * @returns {void}
     * @private
     */
    protected calculateVisibleRange(size: Size, axis: Chart3DAxis): void;
    /**
     * Calculates log inteval for the axis.
     *
     * @param {number} delta - The delta value.
     * @param {Size} size - The size of the axis.
     * @param {Chart3DAxis} axis - The axis for which the range and interval are calculated.
     * @returns {number} - Returns the log interval.
     * @private
     */
    protected calculateLogNiceInterval(delta: number, size: Size, axis: Chart3DAxis): number;
    /**
     * Calculates labels for the axis.
     *
     * @param {Chart3DAxis} axis - The axis for which the range and interval are calculated.
     * @param {Chart3D} chart - Specifies the instance of the chart.
     * @returns {void}
     * @private
     */
    calculateVisibleLabels(axis: Chart3DAxis, chart: Chart3D): void;
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the category axis.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
