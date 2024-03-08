import { isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * @private
 */
var WLevelOverride = /** @class */ (function () {
    function WLevelOverride() {
    }
    /**
     * @private
     */
    WLevelOverride.prototype.clear = function () {
        if (!isNullOrUndefined(this.overrideListLevel)) {
            this.overrideListLevel.clearFormat();
        }
        this.overrideListLevel = undefined;
    };
    /**
     * Disposes the internal objects which are maintained.
     * @private
     */
    WLevelOverride.prototype.destroy = function () {
        if (!isNullOrUndefined(this.overrideListLevel)) {
            this.overrideListLevel.destroy();
        }
        this.levelNumber = undefined;
        this.startAt = undefined;
        this.overrideListLevel = undefined;
    };
    WLevelOverride.prototype.clone = function () {
        var levelOverride = new WLevelOverride();
        levelOverride.startAt = this.startAt;
        levelOverride.levelNumber = this.levelNumber;
        if (!isNullOrUndefined(this.overrideListLevel)) {
            levelOverride.overrideListLevel = this.overrideListLevel.clone(levelOverride);
        }
        return levelOverride;
    };
    return WLevelOverride;
}());
export { WLevelOverride };
