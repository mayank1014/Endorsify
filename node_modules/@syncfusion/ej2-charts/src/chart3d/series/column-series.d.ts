import { Chart3D } from '../chart3D';
import { Chart3DSeries } from './chart-series';
export declare class ColumnSeries3D {
    /**
     * Draws the column 3D series on a 3D chart.
     *
     * @param {Chart3DSeries} series - The 3D series to be drawn.
     * @param {Chart3D} chart - The 3D chart on which the series will be drawn.
     * @returns {void}
     */
    draw(series: Chart3DSeries, chart: Chart3D): void;
    /**
     * Updates a specific point in a column series on a 3D chart.
     *
     * @param {Chart3DSeries} series - The 3D series to which the point belongs.
     * @param {Chart3DPoint} point - The point to be updated.
     * @param {number} pointIndex - The index of the point within the series.
     * @param {Chart3D} chart - The 3D chart to which the series and point belong.
     * @returns {void}
     */
    private update;
    /**
     * Creates segments for a column series within a 3D chart.
     *
     * @param {Chart3DSeries} series - The 3D series for which segments will be created.
     * @returns {void}
     */
    createSegments(series: Chart3DSeries): void;
    /**
     * Sets data for a column series in a 3D chart.
     *
     * @param {number} x1 - The x-coordinate of the starting point of the segment.
     * @param {number} y1 - The y-coordinate of the starting point of the segment.
     * @param {number} x2 - The x-coordinate of the ending point of the segment.
     * @param {number} y2 - The y-coordinate of the ending point of the segment.
     * @param {number} start - The starting value of the segment on the axis.
     * @param {number} end - The ending value of the segment on the axis.
     * @param {Chart3DSeries} series - The 3D series to which the segment belongs.
     * @param {Chart3DPoint} point - The point associated with the segment.
     * @returns {void}
     */
    private setData;
    /**
     * To destroy the column series.
     *
     * @returns {void}
     * @private
     */
    protected destroy(): void;
    /**
     * Gets the module name for the Column3D series.
     *
     * @returns {string} - Returns the module name for the Column3D series.
     */
    protected getModuleName(): string;
}
