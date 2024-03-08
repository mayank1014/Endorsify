import { TechnicalIndicator } from './technical-indicator';
import { TechnicalAnalysis } from './indicator-base';
/**
 * `TmaIndicator` module is used to render TMA indicator.
 */
export declare class TmaIndicator extends TechnicalAnalysis {
    /**
     * Defines the predictions based on TMA approach
     *
     * @private
     */
    initDataSource(indicator: TechnicalIndicator): void;
    /**
     * To destroy the TMA indicator.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
    /**
     * Get module name.
     */
    protected getModuleName(): string;
}
