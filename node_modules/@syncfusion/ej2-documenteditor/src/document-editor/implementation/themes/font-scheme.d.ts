import { MajorMinorFontScheme } from "./major-minor-font-scheme";
/**
 * @private
 */
export declare class FontScheme {
    private schemeName;
    private majFontScheme;
    private minFontScheme;
    fontSchemeName: string;
    majorFontScheme: MajorMinorFontScheme;
    minorFontScheme: MajorMinorFontScheme;
    constructor(node?: Object);
    copyFormat(fontScheme: FontScheme): void;
    destroy(): void;
}
/**
 * @private
 */
export declare class FontSchemeStruct {
    private fontName;
    private fontTypeface;
    private pnose;
    name: string;
    typeface: string;
    panose: string;
    copyFormat(fontSchemeStructure: FontSchemeStruct): void;
    destroy(): void;
}
