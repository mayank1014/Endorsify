import { Chart3D } from '../../chart3d';
import { Selection3D } from './selection';
/**
 * The `Highlight` module handles the highlight for chart.
 *
 * @private
 */
export declare class Highlight3D extends Selection3D {
    /**
     * Constructor for selection module.
     *
     * @param {Chart3D} chart - Chart3D instance.
     */
    constructor(chart: Chart3D);
    /**
     * Binding events for highlight module.
     *
     * @returns {void}
     */
    private wireEvents;
    /**
     * Unbinding events for highlight module.
     *
     * @returns {void}
     */
    private unWireEvents;
    /**
     * Declares private variables for the highlight modules.
     *
     * @param {Chart3D} chart - The 3D chart for which private variables are being declared.
     * @returns {void}
     */
    private declarePrivateVariables;
    /**
     * Invokes the highlighting functionality on a 3D chart.
     *
     * @param {Chart3D} chart - The 3D chart on which highlighting is being invoked.
     * @returns {void}
     */
    invokeHighlight(chart: Chart3D): void;
    /**
     * Gets the module name for the highlighting functionality.
     *
     * @returns {string} The module name.
     */
    getModuleName(): string;
    /**
     * To destroy the highlight module.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
