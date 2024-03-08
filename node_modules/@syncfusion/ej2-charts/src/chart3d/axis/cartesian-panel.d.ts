import { Chart3D } from '../chart3D';
import { Chart3DRow, Chart3DColumn } from './axis';
import { Size, Rect } from '@syncfusion/ej2-svg-base';
/**
 * The `CartesianAxisLayoutPanel` class is responsible for managing the layout of Cartesian axes in a 3D chart.
 */
export declare class CartesianAxisLayoutPanel {
    private chart;
    private initialClipRect;
    /** @private */
    leftSize: number;
    /** @private */
    rightSize: number;
    /** @private */
    topSize: number;
    /** @private */
    bottomSize: number;
    /** @private */
    seriesClipRect: Rect;
    /**
     *
     *
     * @param {Chart3D} chartModule - Specifies the chart module.
     * @private
     */
    constructor(chartModule?: Chart3D);
    /**
     * Measures and calculates the dimensions of the axis based on the provided rectangle.
     *
     * @param {Rect} rect - The rectangle used as a reference for axis measurement and sizing.
     * @returns {void}
     */
    measureAxis(rect: Rect): void;
    /**
     * Measures and calculates the dimensions of the row axis within the 3D chart.
     *
     * @param {Chart3D} chart - The 3D chart containing the row axis.
     * @param {Rect} rect - The initial rect values.
     * @returns {void}
     */
    private measureRowAxis;
    /**
     * Measures and calculates the dimensions of the column axis within the 3D chart.
     *
     * @param {Chart3D} chart - The 3D chart containing the column axis.
     * @param {Rect} rect - The initial rect values.
     * @returns {void}
     */
    private measureColumnAxis;
    /**
     * Measure the column and row in chart.
     *
     * @param {Chart3DRow | Chart3DColumn} definition - Specifies the row or column.
     * @param {Chart3D} chart - Specifies the chart.
     * @param {Size} size - Specifies the size.
     * @returns {void}
     * @private
     */
    measureDefinition(definition: Chart3DRow | Chart3DColumn, chart: Chart3D, size: Size): void;
    /**
     * Measure the axis.
     *
     * @param {Rect} rect - The initial rect values.
     * @returns {void}
     * @private
     */
    private calculateAxisSize;
    /**
     * Measure the axis.
     *
     * @returns {void}
     * @private
     */
    measure(): void;
    /**
     * Calculates the offset value for an axis based on positions and a plot offset.
     *
     * @param {number} position1 - The first position.
     * @param {number} position2 - The second position.
     * @param {number} plotOffset - The plot offset value.
     * @returns {number} - The calculated axis offset value.
     */
    private getAxisOffsetValue;
    /**
     * Pushes an axis definition into the specified row or column within the 3D chart.
     *
     * @param {Chart3DRow | Chart3DColumn} definition - The row or column definition to which the axis is added.
     * @param {Chart3DAxis} axis - The axis to be pushed into the definition.
     * @returns {void}
     */
    private pushAxis;
    /**
     * Arranges and positions axis elements within the specified row or column definition.
     *
     * @param {Chart3DRow | Chart3DColumn} definition - The row or column definition in which axis elements are arranged.
     * @returns {void}
     */
    private arrangeAxis;
    /**
     * Retrieves the actual column index for the specified axis within the 3D chart.
     *
     * @param {Chart3DAxis} axis - The axis for which the actual column index is retrieved.
     * @returns {number} - The actual column index.
     */
    private getActualColumn;
    /**
     * Retrieves the actual row index for the specified axis within the 3D chart.
     *
     * @param {Chart3DAxis} axis - The axis for which the actual row index is retrieved.
     * @returns {number} - The actual row index.
     */
    private getActualRow;
    /**
     * Measure the row size.
     *
     * @param {Rect} rect - The available rect value.
     * @returns {void}
     */
    private calculateRowSize;
    /**
     * Measure the column size.
     *
     * @param {Rect} rect - The available rect value.
     * @returns {void}
     */
    private calculateColumnSize;
}
