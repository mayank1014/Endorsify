import { Series, Points } from './chart-series';
import { LineBase } from './line-base';
import { Axis } from '../../chart/axis/axis';
/**
 * `RangeStepAreaSeries` Module used to render the range step area series.
 */
export declare class RangeStepAreaSeries extends LineBase {
    private borderDirection;
    private prevPoint;
    /**
     * Render RangeStepArea series.
     *
     * @returns {void}
     * @private
     */
    render(series: Series, xAxis: Axis, yAxis: Axis, isInverted: boolean): void;
    /**
     * Calculating path direction for rendering the low points.
     *
     * @returns {void}.
     * @private
     */
    protected closeRangeStepAreaPath(visiblePoints: Points[], point: Points, series: Series, direction: string, i: number, xAxis: Axis, yAxis: Axis, isInverted: boolean): string;
    /**
     * Animates the series.
     *
     * @param  {Series} series - Defines the series to animate.
     * @returns {void}
     */
    doAnimation(series: Series): void;
    /**
     * Get module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the range step area series.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
