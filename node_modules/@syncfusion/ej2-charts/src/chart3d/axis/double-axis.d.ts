import { Chart3DAxis } from '../axis/axis';
import { Size } from '@syncfusion/ej2-svg-base';
import { Chart3D } from '../chart3D';
/**
 * The numeric module is used to render numeric axis.
 */
export declare class Double3D {
    /** @private */
    chart: Chart3D;
    /** @private */
    min: Object;
    /** @private */
    max: Object;
    private paddingInterval;
    private isColumn;
    private isStacking;
    /**
     * Constructor for the dateTime module.
     *
     * @param {Chart3D} chart - Chart3D instance.
     * @private
     */
    constructor(chart?: Chart3D);
    /**
     * Calculates a numeric nice interval for the specified axis based on the provided delta and size.
     *
     * @param {Chart3DAxis} axis - The axis for which the numeric nice interval is calculated.
     * @param {number} delta - The delta value to consider in the interval calculation.
     * @param {Size} size - The size of the chart area used in the calculation.
     * @returns {number} - The calculated numeric nice interval.
     * @protected
     */
    protected calculateNumericNiceInterval(axis: Chart3DAxis, delta: number, size: Size): number;
    /**
     * Retrieves the actual range for the specified axis based on the provided size.
     *
     * @param {Chart3DAxis} axis - The axis for which the actual range is retrieved.
     * @param {Size} size - The size of the chart area used in the range calculation.
     * @returns {void}
     */
    getActualRange(axis: Chart3DAxis, size: Size): void;
    /**
     * Range for the axis.
     *
     * @param {Chart3DAxis} axis - Specifies the instance of the axis.
     * @returns {void}
     * @private
     */
    initializeDoubleRange(axis: Chart3DAxis): void;
    /**
     * Calculates the range and interval for the specified axis based on the provided size.
     *
     * @param {Size} size - The size of the chart area used for range and interval calculation.
     * @param {Chart3DAxis} axis - The axis for which the range and interval are calculated.
     * @returns {void}
     */
    calculateRangeAndInterval(size: Size, axis: Chart3DAxis): void;
    /**
     * Calculates range for the axis.
     *
     * @param {Chart3DAxis} axis - Specifies the instance of the axis.
     * @returns {void}
     * @private
     */
    protected calculateRange(axis: Chart3DAxis): void;
    /**
     * Sets the range for the Y-axis based on the minimum and maximum values of the series.
     *
     * @param {Chart3DAxis} axis - The Y-axis of the 3D chart.
     * @param {Chart3DSeries} series - The 3D series for which to determine the range.
     * @returns {void}
     */
    private yAxisRange;
    /**
     * Finds and updates the minimum and maximum values within a given range.
     *
     * @param {Object} min - The minimum value to compare.
     * @param {Object} max - The maximum value to compare.
     * @returns {void}
     */
    private findMinMax;
    /**
     * Apply padding for the range.
     *
     * @param {Chart3DAxis} axis - Specifies the instance of the axis.
     * @param {Size} size - Specifies the size of the axis.
     * @returns {void}
     * @private
     */
    applyRangePadding(axis: Chart3DAxis, size: Size): void;
    /**
     * Updates the actual range of the 3D axis with specified minimum, maximum, and interval values.
     *
     * @param {Chart3DAxis} axis - The 3D axis to update.
     * @param {number} minimum - The minimum value for the axis.
     * @param {number} maximum - The maximum value for the axis.
     * @param {number} interval - The interval value for the axis.
     * @returns {void}
     */
    updateActualRange(axis: Chart3DAxis, minimum: number, maximum: number, interval: number): void;
    /**
     * Finds additional range for the 3D axis based on specified start, end, interval, and size values.
     *
     * @param {Chart3DAxis} axis - The 3D axis to find additional range for.
     * @param {number} start - The start value for the axis range.
     * @param {number} end - The end value for the axis range.
     * @param {number} interval - The interval value for the axis.
     * @param {Size} size - The size of the chart area.
     * @returns {void}
     */
    private findAdditional;
    /**
     * Finds normal range for the 3D axis based on specified start, end, interval, and size values.
     *
     * @param {Chart3DAxis} axis - The 3D axis to find normal range for.
     * @param {number} start - The start value for the axis range.
     * @param {number} end - The end value for the axis range.
     * @param {number} interval - The interval value for the axis.
     * @param {Size} size - The size of the chart area.
     * @returns {void}
     */
    private findNormal;
    /**
     * Calculate visible range for axis.
     *
     * @param {Size} size - Specifies the size of the axis.
     * @param {Chart3DAxis} axis - Specifies the instance of the axis.
     * @returns {void}
     * @private
     */
    protected calculateVisibleRange(size: Size, axis: Chart3DAxis): void;
    /**
     * Calculates the visible label for the axis.
     *
     * @param {Chart3DAxis} axis - Specifies the instance of the axis.
     * @param {Chart3D} chart - Specifies the instance of the chart.
     * @returns {void}
     * @private
     */
    calculateVisibleLabels(axis: Chart3DAxis, chart: Chart3D): void;
    /**
     * Gets the format for the axis label.
     *
     * @param {Chart3DAxis} axis - Specifies the instance of the axis.
     * @returns {string} - Returns the string value.
     * @private
     */
    protected getFormat(axis: Chart3DAxis): string;
    /**
     * Formats the axis label.
     *
     * @param {Chart3DAxis} axis - Specifies the instance of the axis.
     * @param {boolean} isCustom - Specifies whether the format is custom.
     * @param {string} format - Specifies the format of the axis label.
     * @param {number} tempInterval - Specifies the interval of the axis label.
     * @returns {string} - Returns the string value.
     * @private
     */
    formatValue(axis: Chart3DAxis, isCustom: boolean, format: string, tempInterval: number): string;
    /**
     * Gets the module name.
     *
     * @returns {string} - the module name.
     */
    protected getModuleName(): string;
}
