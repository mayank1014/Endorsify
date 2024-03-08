import { FontScheme } from "./font-scheme";
/**
 * @private
 */
export declare class Themes {
    private fntScheme;
    fontScheme: FontScheme;
    constructor(node?: Object);
    copyFormat(themes: Themes): void;
    destroy(): void;
}
