import { isNullOrUndefined } from "@syncfusion/ej2-base";
import { FontScheme } from "./font-scheme";
/**
 * @private
 */
var Themes = /** @class */ (function () {
    function Themes(node) {
        this.fntScheme = new FontScheme();
    }
    Object.defineProperty(Themes.prototype, "fontScheme", {
        get: function () {
            return this.fntScheme;
        },
        set: function (value) {
            this.fntScheme = value;
        },
        enumerable: true,
        configurable: true
    });
    Themes.prototype.copyFormat = function (themes) {
        if (!isNullOrUndefined(themes)) {
            this.fntScheme.copyFormat(themes.fntScheme);
        }
    };
    Themes.prototype.destroy = function () {
        this.fntScheme = undefined;
    };
    return Themes;
}());
export { Themes };
