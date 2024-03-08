/**
 * Chart legend
 */
import { ChildProperty } from '@syncfusion/ej2-base';
import { Chart3DSeries } from '../series/chart-series';
import { LegendOptions, BaseLegend } from '../../common/legend/legend';
import { Chart3D } from '../../chart3d';
import { Chart3DLegendMode } from '../../chart3d/utils/enum';
import { ChartLocation } from '../../common/utils/helper';
import { Size, Rect } from '@syncfusion/ej2-svg-base';
import { Alignment, LabelOverflow, LegendPosition, LegendTitlePosition, TextWrap } from '../../common/utils/enum';
import { BorderModel, ContainerPaddingModel, FontModel, LocationModel, MarginModel } from '../../common/model/base-model';
import { Chart3DLegendSettingsModel } from './legend-model';
/**
 * Configures the legends in charts.
 */
export declare class Chart3DLegendSettings extends ChildProperty<Chart3DLegendSettings> {
    /**
     * If set to true, the legend will be displayed for the chart.
     *
     * @default true
     */
    visible: boolean;
    /**
     * The height of the legend in pixels.
     *
     * @default null
     */
    height: string;
    /**
     * The width of the legend in pixels.
     *
     * @default null
     */
    width: string;
    /**
     * Specifies the location of the legend, relative to the chart.
     * If x is 20, legend moves by 20 pixels to the right of the chart. It requires the `position` to be `Custom`.
     * ```html
     * <div id='Chart'></div>
     * ```
     * ```typescript
     * let chart3D: Chart3D = new Chart3D({
     * ...
     *   legendSettings: {
     *     visible: true,
     *     position: 'Custom',
     *     location: { x: 100, y: 150 },
     *   },
     * ...
     * });
     * chart3D.appendTo('#Chart');
     * ```
     */
    location: LocationModel;
    /**
     * Position of the legend in the chart. Available options include:
     * * Auto: Places the legend based on the area type.
     * * Top: Displays the legend at the top of the chart.
     * * Left: Displays the legend at the left of the chart.
     * * Bottom: Displays the legend at the bottom of the chart.
     * * Right: Displays the legend at the right of the chart.
     * * Custom: Displays the legend based on the given x and y values.
     *
     * @default 'Auto'
     */
    position: LegendPosition;
    /**
     * Mode of legend items.
     * * Series: Legend items generated based on series count.
     * * Point: Legend items generated based on unique data points.
     * * Range: Legend items generated based on range color mapping property.
     * * Gradient: Single linear bar generated based on range color mapping property.
     * This property is applicable for chart component only.
     */
    mode: Chart3DLegendMode;
    /**
     * Option to customize the padding around the legend items.
     *
     * @default 8
     */
    padding: number;
    /**
     * Option to customize the padding between legend items.
     *
     * @default null
     */
    itemPadding: number;
    /**
     * Legend in chart can be aligned as follows:
     * * Near: Aligns the legend to the left of the chart.
     * * Center: Aligns the legend to the center of the chart.
     * * Far: Aligns the legend to the right of the chart.
     *
     * @default 'Center'
     */
    alignment: Alignment;
    /**
     * Options to customize the legend text.
     */
    textStyle: FontModel;
    /**
     * Shape height of the legend in pixels.
     *
     * @default 10
     */
    shapeHeight: number;
    /**
     * Shape width of the legend in pixels.
     *
     * @default 10
     */
    shapeWidth: number;
    /**
     * Options to customize the border of the legend.
     */
    border: BorderModel;
    /**
     *  Options to customize left, right, top and bottom margins of the chart.
     */
    margin: MarginModel;
    /**
     *  Options to customize left, right, top and bottom padding for legend container of the chart.
     */
    containerPadding: ContainerPaddingModel;
    /**
     * Padding between the legend shape and text.
     *
     * @default 8
     */
    shapePadding: number;
    /**
     * The background color of the legend that accepts value in hex and rgba as a valid CSS color string.
     *
     * @default 'transparent'
     */
    background: string;
    /**
     * Opacity of the legend.
     *
     * @default 1
     */
    opacity: number;
    /**
     * If set to true, series visibility collapses based on the legend visibility.
     *
     * @default true
     */
    toggleVisibility: boolean;
    /**
     * If set to true, the series get highlighted, while hovering the legend.
     *
     * @default false
     */
    enableHighlight: boolean;
    /**
     * Description for legends.
     *
     * @default null
     */
    description: string;
    /**
     * TabIndex value for the legend.
     *
     * @default 3
     */
    tabIndex: number;
    /**
     * Title for legends.
     *
     * @default null
     */
    title: string;
    /**
     * Options to customize the legend title.
     */
    titleStyle: FontModel;
    /**
     * legend title position.
     *
     * @default 'Top'
     */
    titlePosition: LegendTitlePosition;
    /**
     * Defines the text wrap behavior to employ when the individual legend text overflows
     * * `Normal` -  Specifies to break words only at allowed break points.
     * * `Wrap` - Specifies to break a word once it is too long to fit on a line by itself.
     * * `AnyWhere` - Specifies to break a word at any point if there are no otherwise-acceptable break points in the line.
     *
     * @default 'Normal'
     */
    textWrap: TextWrap;
    /**
     * Defines the text overflow behavior to employ when the individual legend text overflows
     * * `Clip` -  Specifies the text is clipped and not accessible.
     * * `Ellipsis` -  Specifies an ellipsis (“...”) to the clipped text.
     *
     * @default 'Ellipsis'
     */
    textOverflow: LabelOverflow;
    /**
     * maximum width for the legend title.
     *
     * @default 100
     */
    maximumTitleWidth: number;
    /**
     * Maximum label width for the legend text.
     *
     * @default null
     */
    maximumLabelWidth: number;
    /**
     * If set to true, legend will be visible using pages.
     *
     * @default true
     */
    enablePages: boolean;
    /**
     * If `isInversed` set to true, then it inverses legend item content (image and text).
     *
     * @default false.
     */
    isInversed: boolean;
    /**
     * If `reverse` is set to true, it reverses the order of legend items.
     *
     * @default false
     */
    reverse: boolean;
}
/**
 * The `Legend` module is used to render legend for the chart.
 */
export declare class Legend3D extends BaseLegend {
    constructor(chart: Chart3D);
    /**
     * Binding events for legend module.
     *
     * @returns {void}
     */
    private addEventListener;
    /**
     * Unbinding events for legend module.
     *
     * @returns {void}
     */
    private removeEventListener;
    /**
     * To handle mosue move for legend module
     *
     * @param {MouseEvent} e - Specifies the mouse event.
     * @returns {void}
     */
    private mouseMove;
    /**
     * To handle mouse end for legend module
     *
     * @param {MouseEvent} e - Specifies the mouse event.
     * @returns {void}
     */
    private mouseEnd;
    /**
     * Retrieves and returns legend options for the visible series within a 3D chart.
     *
     * @param {Chart3DSeries[]} visibleSeriesCollection - The collection of visible series to extract legend options from.
     * @param {Chart3D} chart - The 3D chart containing the series and legend.
     * @returns {void}
     */
    getLegendOptions(visibleSeriesCollection: Chart3DSeries[], chart: Chart3D): void;
    /**
     * Calculates and retrieves the legend bounds within the available size for the provided legend settings.
     *
     * @param {Size} availableSize - The available size for positioning the legend.
     * @param {Rect} legendBounds - The initial bounds of the legend.
     * @param {Chart3DLegendSettingsModel} legend - The customization option for the legend.
     * @returns {void}
     */
    get3DLegendBounds(availableSize: Size, legendBounds: Rect, legend: Chart3DLegendSettingsModel): void;
    /**
     * Calculates and retrieves the height of the legend within the specified legend bounds and based on the provided options and settings.
     *
     * @param {LegendOptions} legendOption - The options and data for the legend.
     * @param {Chart3DLegendSettingsModel} legend - The customization options for the legend.
     * @param {Rect} legendBounds - The bounds of the legend.
     * @param {number} rowWidth - The width of a row within the legend.
     * @param {number} legendHeight - The initial height of the legend.
     * @param {number} padding - The padding applied to the legend.
     * @returns {void}
     * @private
     */
    getLegendHeight(legendOption: LegendOptions, legend: Chart3DLegendSettingsModel, legendBounds: Rect, rowWidth: number, legendHeight: number, padding: number): void;
    /**
     * Calculates and retrieves the render point (position) for the legend item within the legend area.
     *
     * @param {LegendOptions} legendOption - The options and data for the legend item.
     * @param {ChartLocation} start - The starting point for positioning the legend item.
     * @param {number} textPadding - The padding applied to the legend text.
     * @param {LegendOptions} prevLegend - The previous legend item for reference.
     * @param {Rect} rect - The bounding rectangle of the legend area.
     * @param {number} count - The index of the legend item within the legend.
     * @param {number} firstLegend - The index of the first legend item.
     * @returns {void}
     * @private
     */
    getRenderPoint(legendOption: LegendOptions, start: ChartLocation, textPadding: number, prevLegend: LegendOptions, rect: Rect, count: number, firstLegend: number): void;
    /**
     * Checks whether the previous bound  width is within the given rectangular bounds.
     *
     * @param {number} previousBound - The previous bound (position) of an element.
     * @param {number} textWidth - The width of the text or element to be positioned.
     * @param {Rect} rect - The rectangular bounds to check against.
     * @returns {boolean} - True if the element is within the bounds; otherwise, false.
     * @private
     */
    private isWithinBounds;
    /**
     * Handles the click event on a legend item at the specified index.
     *
     * @param {number} index - The index of the legend item clicked.
     * @param {Event | PointerEvent} event - The click or pointer event.
     * @returns {void}
     * @private
     */
    LegendClick(index: number, event: Event | PointerEvent): void;
    /**
     * Refreshes the legend toggle behavior for the specified series in a 3D chart.
     *
     * @param {Chart3D} chart - The 3D chart containing the legend and series.
     * @param {Chart3DSeries} series - The series for which the legend toggle behavior is refreshed.
     * @returns {void}
     * @private
     */
    private refreshLegendToggle;
    /**
     * Changes the visibility of the specified series in a 3D chart.
     *
     * @param {Chart3DSeries} series - The series whose visibility is being changed.
     * @param {boolean} visibility - The new visibility state for the series (true for visible, false for hidden).
     * @returns {void}
     * @private
     */
    private changeSeriesVisiblity;
    /**
     * Checks whether the specified axis is a secondary axis within the 3D chart.
     *
     * @param {Chart3DAxis} axis - The axis to be checked.
     * @returns {boolean} - True if the axis is a secondary axis, otherwise, false.
     * @private
     */
    private isSecondaryAxis;
    /**
     * Redraws the elements of a 3D series on the chart.
     *
     * @param {Chart3DSeries} series - The 3D series to redraw.
     * @param {Chart3D} chart - The 3D chart instance.
     * @returns {void}
     * @private
     */
    private redrawSeriesElements;
    /**
     * Refreshes the position information of each series in a collection.
     *
     * @param {Chart3DSeries[]} seriesCollection - The collection of 3D series to refresh.
     * @returns {void}
     * @private
     */
    private refreshSeries;
    /**
     * To show the tooltip for the trimmed text in legend.
     *
     * @param {Event | PointerEvent} event - Specifies the event.
     * @returns {void}
     * @private
     */
    click(event: Event | PointerEvent): void;
    /**
     * Get module name
     *
     * @returns {string} - Returns the module name
     */
    protected getModuleName(): string;
    /**
     * To destroy the legend module.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
