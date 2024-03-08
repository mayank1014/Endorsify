import { WListLevel } from './list-level';
/**
 * @private
 */
export declare class WLevelOverride {
    startAt: number;
    levelNumber: number;
    overrideListLevel: WListLevel;
    /**
     * @private
     */
    clear(): void;
    /**
     * Disposes the internal objects which are maintained.
     * @private
     */
    destroy(): void;
    clone(): WLevelOverride;
}
