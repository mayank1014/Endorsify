import { EditorHistory } from '../editor-history/editor-history';
import { FootEndNoteNumberFormat, FootnoteRestartIndex } from '../../base/types';
import { SelectionHeaderFooter } from '../selection';
import { HeaderFooterWidget } from '../viewer/page';
/**
 * @private
 */
export declare class WSectionFormat {
    private uniqueSectionFormat;
    private static uniqueSectionFormats;
    private static uniqueFormatType;
    ownerBase: Object;
    columns: WColumnFormat[];
    removedHeaderFooters: HeaderFooterWidget[];
    headerDistance: number;
    footerDistance: number;
    differentFirstPage: boolean;
    differentOddAndEvenPages: boolean;
    pageHeight: number;
    rightMargin: number;
    pageWidth: number;
    leftMargin: number;
    bottomMargin: number;
    topMargin: number;
    bidi: boolean;
    restartPageNumbering: boolean;
    pageStartingNumber: number;
    endnoteNumberFormat: FootEndNoteNumberFormat;
    restartIndexForEndnotes: FootnoteRestartIndex;
    restartIndexForFootnotes: FootnoteRestartIndex;
    footNoteNumberFormat: FootEndNoteNumberFormat;
    initialFootNoteNumber: number;
    initialEndNoteNumber: number;
    pageNumberStyle: FootEndNoteNumberFormat;
    numberOfColumns: number;
    equalWidth: boolean;
    lineBetweenColumns: boolean;
    breakCode: string;
    firstPageHeader: SelectionHeaderFooter;
    firstPageFooter: SelectionHeaderFooter;
    oddPageHeader: SelectionHeaderFooter;
    oddPageFooter: SelectionHeaderFooter;
    evenPageHeader: SelectionHeaderFooter;
    evenPageFooter: SelectionHeaderFooter;
    constructor(node?: Object);
    destroy(): void;
    /**
     * @private
     */
    hasValue(property: string): boolean;
    private static getPropertyDefaultValue;
    getPropertyValue(property: string): Object;
    private setPropertyValue;
    private initializeUniqueSectionFormat;
    private addUniqueSectionFormat;
    copyFormat(format: WSectionFormat, history?: EditorHistory): void;
    updateUniqueSectionFormat(format: WSectionFormat): void;
    cloneFormat(): WSectionFormat;
    static clear(): void;
}
/**
 * @private
 */
export declare class WColumnFormat {
    private uniqueColumnFormat;
    private static uniqueColumnFormats;
    private static uniqueFormatType;
    ownerBase: Object;
    private indexIn;
    constructor(node?: Object);
    destroy(): void;
    private hasValue;
    index: number;
    width: number;
    space: number;
    getPropertyValue(property: string): Object;
    private static getPropertyDefaultValue;
    private setPropertyValue;
    private initializeUniqueColumnFormat;
    private addUniqueColumnFormat;
    updateUniqueColumnFormat(format: WColumnFormat): void;
    cloneFormat(): WColumnFormat;
    copyFormat(colFormat: WColumnFormat): void;
    static clear(): void;
}
