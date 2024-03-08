import { AccumulationChart } from '../accumulation';
import { AccumulationSelection } from './selection';
/**
 * `AccumulationHighlight` module handles the selection for chart.
 *
 * @private
 */
export declare class AccumulationHighlight extends AccumulationSelection {
    /**
     * Constructor for selection module.
     *
     * @private.
     */
    constructor(accumulation: AccumulationChart);
    /**
     * Binding events for selection module.
     */
    private wireEvents;
    /**
     * UnBinding events for selection module.
     */
    private unWireEvents;
    /**
     * To find private variable values
     */
    private declarePrivateVariables;
    /**
     * Method to select the point and series.
     *
     * @return {void}
     */
    invokeHighlight(accumulation: AccumulationChart): void;
    /**
     * Get module name.
     *
     * @private
     */
    getModuleName(): string;
    /**
     * To destroy the highlight.
     *
     * @return {void}
     * @private
     */
    destroy(): void;
}
