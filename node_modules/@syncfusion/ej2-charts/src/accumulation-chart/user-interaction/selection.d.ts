import { Rect, SvgRenderer, CanvasRenderer } from '@syncfusion/ej2-svg-base';
import { AccumulationSelectionMode, AccumulationHighlightMode } from '../model/enum';
import { AccumulationChart } from '../accumulation';
import { AccumulationSeries } from '../model/acc-base';
import { Indexes } from '../../common/model/base';
import { BaseSelection } from '../../common/user-interaction/selection';
/**
 * `AccumulationSelection` module handles the selection for accumulation chart.
 */
export declare class AccumulationSelection extends BaseSelection {
    /** @private */
    renderer: SvgRenderer | CanvasRenderer;
    /** @private */
    rectPoints: Rect;
    /** @private */
    selectedDataIndexes: Indexes[];
    /** @private */
    highlightDataIndexes: Indexes[];
    /** @private */
    series: AccumulationSeries[];
    /** @private */
    accumulation: AccumulationChart;
    /** @private */
    currentMode: AccumulationSelectionMode | AccumulationHighlightMode;
    /** @private */
    previousSelectedElement: Element[];
    constructor(accumulation: AccumulationChart);
    /**
     * Binding events for selection module.
     */
    private addEventListener;
    /**
     * UnBinding events for selection module.
     */
    private removeEventListener;
    /**
     * To initialize the private variables
     */
    private initPrivateVariables;
    /**
     * Invoke selection for rendered chart.
     *
     * @param {AccumulationChart} accumulation Define the chart to invoke the selection.
     * @returns {void}
     */
    invokeSelection(accumulation: AccumulationChart): void;
    /**
     * To get series selection style by series.
     */
    private generateStyle;
    /**
     * To get series selection style while hovering legend
     */
    private generateLegendClickStyle;
    /**
     * To get elements by index, series
     */
    private findElements;
    /**
     * To get series point element by index
     */
    private getElementByIndex;
    /**
     * To find the selected element.
     *
     * @return {void}
     * @private
     */
    isAlreadySelected(targetElement: Element, eventType: string): boolean;
    /**
     * To calculate selected elements on mouse click or touch
     *
     * @private
     */
    mouseClick(accumulation: AccumulationChart, event: Event): void;
    /**
     * To calculate selected elements on mouse click or touch
     *
     * @private
     */
    calculateSelectedElements(accumulation: AccumulationChart, targetEle: Element, eventType: string): void;
    /**
     * To perform the selection process based on index and element.
     */
    private performSelection;
    /**
     *  Method to get the selected data index
     *
     * @private
     */
    private selectionComplete;
    /**
     * To select the element by index. Adding or removing selection style class name.
     */
    private selection;
    /**
     * To redraw the selection process on accumulation chart refresh.
     *
     * @private
     */
    redrawSelection(accumulation: AccumulationChart): void;
    /**
     * To remove the selected elements style classes by indexes.
     */
    private removeSelectedElements;
    /**
     * To perform the selection for legend elements.
     *
     * @private
     */
    legendSelection(accumulation: AccumulationChart, series: number, pointIndex: number, targetEle: Element, eventType: string): void;
    /**
     * To select the element by selected data indexes.
     */
    private selectDataIndex;
    /**
     * To remove the selection styles for multi selection process.
     */
    private removeMultiSelectEelments;
    /**
     * To apply the opacity effect for accumulation chart series elements.
     */
    private blurEffect;
    /**
     * To check selection elements by style class name.
     */
    private checkSelectionElements;
    /**
     * To apply selection style for elements.
     */
    private applyStyles;
    /**
     * To get selection style class name by id
     */
    private getSelectionClass;
    /**
     * To remove selection style for elements.
     */
    private removeStyles;
    /**
     * To apply or remove selected elements index.
     */
    private addOrRemoveIndex;
    /**
     * To check two index, point and series are equal
     */
    private checkEquals;
    /** @private */
    mouseMove(event: PointerEvent | TouchEvent): void;
    /**
     * To check selected points are visibility
     */
    private checkPointVisibility;
    /**
     * Get module name.
     */
    getModuleName(): string;
    /**
     * To destroy the selection.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
