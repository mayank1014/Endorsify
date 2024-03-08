import { isNullOrUndefined } from "@syncfusion/ej2-base";
import { Dictionary } from "../../index";
/**
 * @private
 */
var MajorMinorFontScheme = /** @class */ (function () {
    function MajorMinorFontScheme() {
        this.fntTypeface = new Dictionary();
        this.fntSchemeList = [];
        this.fntTypeface = new Dictionary();
        this.fntSchemeList = [];
    }
    Object.defineProperty(MajorMinorFontScheme.prototype, "fontTypeface", {
        get: function () {
            return this.fntTypeface;
        },
        set: function (value) {
            this.fntTypeface = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MajorMinorFontScheme.prototype, "fontSchemeList", {
        get: function () {
            return this.fntSchemeList;
        },
        set: function (value) {
            this.fntSchemeList = value;
        },
        enumerable: true,
        configurable: true
    });
    MajorMinorFontScheme.prototype.copyFormat = function (majorMinor) {
        if (!isNullOrUndefined(majorMinor)) {
            this.fntTypeface = majorMinor.fntTypeface;
            this.fntSchemeList = majorMinor.fntSchemeList;
        }
    };
    MajorMinorFontScheme.prototype.destroy = function () {
        this.fntTypeface = undefined;
        this.fntSchemeList = undefined;
    };
    return MajorMinorFontScheme;
}());
export { MajorMinorFontScheme };
