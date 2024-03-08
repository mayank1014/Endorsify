import { WBorder } from './border';
import { IWidget } from '../viewer/page';
/**
 * @private
 */
export declare class WBorders implements IWidget {
    private leftIn;
    private rightIn;
    private topIn;
    private bottomIn;
    private horizontalIn;
    private verticalIn;
    private diagonalUpIn;
    private diagonalDownIn;
    isParsing: boolean;
    ownerBase: Object;
    left: WBorder;
    right: WBorder;
    top: WBorder;
    bottom: WBorder;
    horizontal: WBorder;
    vertical: WBorder;
    diagonalUp: WBorder;
    diagonalDown: WBorder;
    constructor(node?: Object);
    private getPropertyValue;
    private getDefaultValue;
    private documentParagraphFormat;
    getBorder(property: string): WBorder;
    /**
     * @private
     */
    clearFormat(): void;
    /**
     * Disposes the internal objects which are maintained.
     * @private
     */
    destroy(): void;
    cloneFormat(): WBorders;
    copyFormat(borders: WBorders): void;
}
