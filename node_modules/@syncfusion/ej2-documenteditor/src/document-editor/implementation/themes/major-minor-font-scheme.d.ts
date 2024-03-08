import { Dictionary, FontSchemeStruct } from "../../index";
/**
 * @private
 */
export declare class MajorMinorFontScheme {
    private fntTypeface;
    private fntSchemeList;
    fontTypeface: Dictionary<string, string>;
    fontSchemeList: FontSchemeStruct[];
    constructor();
    copyFormat(majorMinor: MajorMinorFontScheme): void;
    destroy(): void;
}
