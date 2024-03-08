import { Chart3DAxis } from './axis';
import { Size } from '@syncfusion/ej2-svg-base';
import { Chart3D } from '../chart3D';
import { NiceIntervals } from '../axis/axis-helper';
/**
 * The `Category` module is used to render category axis.
 */
export declare class Category3D extends NiceIntervals {
    /**
     * Constructor for the category module.
     *
     * @param {Chart3D} chart - Chart instance.
     * @private
     */
    constructor(chart: Chart3D);
    /**
     * Calculates the range and interval for the specified axis based on the provided size.
     *
     * @param {Size} size - The size of the chart area used for range and interval calculation.
     * @param {Chart3DAxis} axis - The axis for which the range and interval are calculated.
     * @returns {void}
     * @private
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
     * Calculate visible labels for the axis based on the range calculated.
     *
     * @param {Chart3DAxis} axis - The axis for which the labels are calculated.
     * @returns {void}
     * @private
     */
    calculateVisibleLabels(axis: Chart3DAxis): void;
    /**
     * Get module name
     *
     * @returns {string} - Returns the module name
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
