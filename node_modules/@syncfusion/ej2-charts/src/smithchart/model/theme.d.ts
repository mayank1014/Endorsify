import { ISmithchartThemeStyle } from '../model/interface';
import { SmithchartTheme } from '../utils/enum';
/**
 * @param {SmithchartTheme} theme theme of the smith chart
 * @private
 * @returns {string[]} series colors
 */
export declare function getSeriesColor(theme: SmithchartTheme): string[];
/**
 * @param {SmithchartTheme} theme smithchart theme
 * @private
 * @returns {ISmithchartThemeStyle} theme style of the smith chart
 */
export declare function getThemeColor(theme: SmithchartTheme): ISmithchartThemeStyle;
