import { DictionaryProperties } from './../input-output/pdf-dictionary-properties';
import { PdfCatalog } from './pdf-catalog';
import { PdfDictionary } from './../primitives/pdf-dictionary';
import { IPdfPrimitive } from './../../interfaces/i-pdf-primitives';
import { IPdfWrapper } from './../../interfaces/i-pdf-wrapper';
/**
 * Defines the way the document is to be presented on the screen or in print.
 * ```typescript
 * // Create a new PDF document
 * let document : PdfDocument = new PdfDocument();
 * // Gets viewer preferences
 * let viewerPreferences : PdfViewerPreferences = document.viewerPreferences;
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfViewerPreferences implements IPdfWrapper {
    /**
     * Initialize a new instance of `PdfViewerPreferences` class.
     *
     * @private
     * ```
    */
    constructor(catalog: PdfCatalog);
    _dictionaryProperties: DictionaryProperties;
    _catalog: PdfCatalog;
    _centerWindow: boolean;
    _fitWindow: boolean;
    _displayTitle: boolean;
    _splitWindow: boolean;
    _hideMenuBar: boolean;
    _hideToolBar: boolean;
    _hideWindowUI: boolean;
    _pageMode: PdfPageMode;
    _pageLayout: PdfPageLayout;
    _dictionary: PdfDictionary;
    _pageScaling: PageScalingMode;
    _duplex: DuplexMode;
    /**
     * A flag specifying whether to position the document’s window in the center of the screen.
     * ```typescript
     * // Create a new PDF document
     * let document : PdfDocument = new PdfDocument();
     * // Gets the viewer preferences of the document
     * let viewerPreferences : PdfViewerPreferences = document.viewerPreferences;
     * // Gets the center window
     * let centerWindow : boolean = viewerPreferences.centerWindow;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * A flag specifying whether to position the document’s window in the center of the screen.
    * ```typescript
    * // Create a new PDF document
    * let document : PdfDocument = new PdfDocument();
    * // Gets the viewer preferences of the document
    * let viewerPreferences : PdfViewerPreferences = document.viewerPreferences;
    * // Sets the center window
    * viewerPreferences.centerWindow = true;
    * // Destroy the document
    * document.destroy();
    * ```
    */
    centerWindow: boolean;
    /**
     * A flag specifying whether the window’s title bar should display the document title taken
     * from the Title entry of the document information dictionary. If false, the title bar
     * should instead display the name of the PDF file containing the document.
     * ```typescript
     * // Create a new PDF document
     * let document : PdfDocument = new PdfDocument();
     * // Gets the viewer preferences of the document
     * let viewerPreferences : PdfViewerPreferences = document.viewerPreferences;
     * // Gets the display title
     * let displayTitle : boolean = viewerPreferences.displayTitle;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * A flag specifying whether the window’s title bar should display the document title taken
    * from the Title entry of the document information dictionary. If false, the title bar
    * should instead display the name of the PDF file containing the document.
    * ```typescript
    * // Create a new PDF document
    * let document : PdfDocument = new PdfDocument();
    * // Gets the viewer preferences of the document
    * let viewerPreferences : PdfViewerPreferences = document.viewerPreferences;
    * // Sets the display title
    * viewerPreferences.displayTitle = true;
    * // Destroy the document
    * document.destroy();
    * ```
    */
    displayTitle: boolean;
    /**
     * A flag specifying whether to resize the document’s window to fit the size of the first
     * displayed page.
     * ```typescript
     * // Create a new PDF document
     * let document : PdfDocument = new PdfDocument();
     * // Gets the viewer preferences of the document
     * let viewerPreferences : PdfViewerPreferences = document.viewerPreferences;
     * // Gets the fit window
     * let fitWindow : boolean = viewerPreferences.fitWindow;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * A flag specifying whether to resize the document’s window to fit the size of the first
    * displayed page.
    * ```typescript
    * // Create a new PDF document
    * let document : PdfDocument = new PdfDocument();
    * // Gets the viewer preferences of the document
    * let viewerPreferences : PdfViewerPreferences = document.viewerPreferences;
    * // Sets the fit window
    * viewerPreferences.fitWindow = true;
    * // Destroy the document
    * document.destroy();
    * ```
    */
    fitWindow: boolean;
    /**
     * A flag specifying whether to hide the viewer application’s menu bar when the
     * document is active.
     * ```typescript
     * // Create a new PDF document
     * let document : PdfDocument = new PdfDocument();
     * // Gets the viewer preferences of the document
     * let viewerPreferences : PdfViewerPreferences = document.viewerPreferences;
     * // Gets the hide menu bar
     * let hideMenuBar: boolean = viewerPreferences.hideMenuBar;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * A flag specifying whether to hide the viewer application’s menu bar when the
    * document is active.
    * ```typescript
    * // Create a new PDF document
    * let document : PdfDocument = new PdfDocument();
    * // Gets the viewer preferences of the document
    * let viewerPreferences : PdfViewerPreferences = document.viewerPreferences;
    * // Sets the hide menu bar
    * viewerPreferences.hideMenuBar = true;
    * // Destroy the document
    * document.destroy();
    * ```
    */
    hideMenuBar: boolean;
    /**
     * A flag specifying whether to hide the viewer application’s tool bar when the
     * document is active.
     * ```typescript
     * // Create a new PDF document
     * let document : PdfDocument = new PdfDocument();
     * // Gets the viewer preferences of the document
     * let viewerPreferences : PdfViewerPreferences = document.viewerPreferences;
     * // Gets the hide tool bar
     * let hideToolBar: boolean = viewerPreferences.hideToolBar;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * A flag specifying whether to hide the viewer application’s tool bar when the
    * document is active.
    * ```typescript
    * // Create a new PDF document
    * let document : PdfDocument = new PdfDocument();
    * // Gets the viewer preferences of the document
    * let viewerPreferences : PdfViewerPreferences = document.viewerPreferences;
    * // Sets the hide tool bar
    * viewerPreferences.hideToolbar = true;
    * // Destroy the document
    * document.destroy();
    * ```
    */
    hideToolBar: boolean;
    /**
     * A flag specifying whether to hide user interface elements in the document’s window
     * (such as scroll bars and navigation controls), leaving only the document’s contents displayed.
     * ```typescript
     * // Create a new PDF document
     * let document : PdfDocument = new PdfDocument();
     * // Gets the viewer preferences of the document
     * let viewerPreferences : PdfViewerPreferences = document.viewerPreferences;
     * // Gets the hide window UI
     * let hideWindowUI: boolean = viewerPreferences.hideWindowUI;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * A flag specifying whether to hide user interface elements in the document’s window
    * (such as scroll bars and navigation controls), leaving only the document’s contents displayed.
    * ```typescript
    * // Create a new PDF document
    * let document : PdfDocument = new PdfDocument();
    * // Gets the viewer preferences of the document
    * let viewerPreferences : PdfViewerPreferences = document.viewerPreferences;
    * // Sets the hide window UI
    * viewerPreferences.hideWindowUI = true;
    * // Destroy the document
    * document.destroy();
    * ```
    */
    hideWindowUI: boolean;
    /**
     * A name object specifying how the document should be displayed when opened.
     * ```typescript
     * // Create a new PDF document
     * let document : PdfDocument = new PdfDocument();
     * // Gets the viewer preferences of the document
     * let viewerPreferences : PdfViewerPreferences = document.viewerPreferences;
     * // Gets the page mode
     * let pageMode: PdfPageMode = viewerPreferences.pageMode;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * A name object specifying how the document should be displayed when opened.
    * ```typescript
    * // Create a new PDF document
    * let document : PdfDocument = new PdfDocument();
    * // Gets the viewer preferences of the document
    * let viewerPreferences : PdfViewerPreferences = document.viewerPreferences;
    * // Sets the page mode
    * viewerPreferences.pageMode = PdfPageMode.UseOutlines;
    * // Destroy the document
    * document.destroy();
    * ```
    */
    pageMode: PdfPageMode;
    /**
     * Gets print duplex mode handling option to use when printing the file from the print dialog.
     * ```typescript
     * // Create a new PDF document
     * let document : PdfDocument = new PdfDocument();
     * // Gets the viewer preferences of the document
     * let viewerPreferences : PdfViewerPreferences = document.viewerPreferences;
     * // Gets the duplex
     * let duplex : DuplexMode = viewerPreferences.duplex;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets print duplex mode handling option to use when printing the file from the print dialog.
    * ```typescript
    * // Create a new PDF document
    * let document : PdfDocument = new PdfDocument();
    * // Gets the viewer preferences of the document
    * let viewerPreferences : PdfViewerPreferences = document.viewerPreferences;
    * // Sets the duplex
    * viewerPreferences.duplex = DuplexMode.DuplexFlipLongEdge;
    * // Destroy the document
    * document.destroy();
    * ```
    */
    duplex: DuplexMode;
    /**
     * A name object specifying the page layout to be used when the document is opened.
     * ```typescript
     * // Create a new PDF document
     * let document : PdfDocument = new PdfDocument();
     * // Gets the viewer preferences of the document
     * let viewerPreferences : PdfViewerPreferences = document.viewerPreferences;
     * // Gets the page layout
     * let pageLayout : PdfPageLayout = viewerPreferences.pageLayout;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * A name object specifying the page layout to be used when the document is opened.
    * ```typescript
    * // Create a new PDF document
    * let document : PdfDocument = new PdfDocument();
    * // Gets the viewer preferences of the document
    * let viewerPreferences : PdfViewerPreferences = document.viewerPreferences;
    * // Sets the page layout
    * viewerPreferences.pageLayout = PdfPageLayout.TwoColumnLeft;
    * // Destroy the document
    * document.destroy();
    * ```
    */
    pageLayout: PdfPageLayout;
    /**
     * Gets the page scaling option to be selected
     * when a print dialog is displayed for this document.
     * ```typescript
     * // Create a new PDF document
     * let document : PdfDocument = new PdfDocument();
     * // Gets the viewer preferences of the document
     * let viewerPreferences : PdfViewerPreferences = document.viewerPreferences;
     * // Gets the page scaling
     * let pageScaling : PageScalingMode = viewerPreferences.pageScaling;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the page scaling option to be selected
    * when a print dialog is displayed for this document.
    * ```typescript
    * // Create a new PDF document
    * let document : PdfDocument = new PdfDocument();
    * // Gets the viewer preferences of the document
    * let viewerPreferences : PdfViewerPreferences = document.viewerPreferences;
    * // Sets the page scaling
    * viewerPreferences.pageScaling = PageScalingMode.None;
    * // Destroy the document
    * document.destroy();
    * ```
    */
    pageScaling: PageScalingMode;
    /**
     * Primivie element
     *
     * @private
     */
    readonly element: IPdfPrimitive;
    _mapDuplexMode(mode: DuplexMode): string;
    _mapPageMode(mode: PdfPageMode): string;
    _mapPageLayout(layout: PdfPageLayout): string;
}
/**
 * Represents mode of document displaying.
 * ```typescript
 * // Create a new PDF document
 * let document : PdfDocument = new PdfDocument();
 * // Gets the viewer preferences of the document
 * let viewerPreferences : PdfViewerPreferences = document.viewerPreferences;
 * // Sets the page mode
 * viewerPreferences.pageMode = PdfPageMode.UseOutlines;
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare enum PdfPageMode {
    /**
     * Default value. Neither document outline nor thumbnail images visible.
     */
    UseNone = 0,
    /**
     * Document outline visible.
     */
    UseOutlines = 1,
    /**
     * Thumbnail images visible.
     */
    UseThumbs = 2,
    /**
     * Full-screen mode, with no menu bar, window controls, or any other window visible.
     */
    FullScreen = 3,
    /**
     * Optional content group panel visible.
     */
    UseOC = 4,
    /**
     * Attachments are visible.
     */
    UseAttachments = 5
}
/**
 * A name object specifying the page layout to be used when the document is opened.
 * ```typescript
 * // Create a new PDF document
 * let document : PdfDocument = new PdfDocument();
 * // Gets the viewer preferences of the document
 * let viewerPreferences : PdfViewerPreferences = document.viewerPreferences;
 * // Sets the page layout
 * viewerPreferences.pageLayout = PdfPageLayout.TwoColumnLeft;
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare enum PdfPageLayout {
    /**
     * Default Value. Display one page at a time.
     */
    SinglePage = 0,
    /**
     * Display the pages in one column.
     */
    OneColumn = 1,
    /**
     * Display the pages in two columns, with odd numbered
     * pages on the left.
     */
    TwoColumnLeft = 2,
    /**
     * Display the pages in two columns, with odd numbered
     * pages on the right.
     */
    TwoColumnRight = 3,
    /**
     * Display the pages two at a time, with odd-numbered pages on the left.
     */
    TwoPageLeft = 4,
    /**
     * Display the pages two at a time, with odd-numbered pages on the right.
     */
    TwoPageRight = 5
}
/**
 * The paper handling option to use when printing the file from the print dialog.
 * ```typescript
 * // Create a new PDF document
 * let document : PdfDocument = new PdfDocument();
 * // Gets the viewer preferences of the document
 * let viewerPreferences : PdfViewerPreferences = document.viewerPreferences;
 * // Sets the duplex
 * viewerPreferences.duplex = DuplexMode.DuplexFlipLongEdge;
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare enum DuplexMode {
    /**
     * Print single-sided.
     */
    Simplex = 0,
    /**
     * Duplex and flip on the short edge of the sheet.
     */
    DuplexFlipShortEdge = 1,
    /**
     * Duplex and flip on the long edge of the sheet.
     */
    DuplexFlipLongEdge = 2,
    /**
     * Default value.
     */
    None = 3
}
/**
 * Specifies the different page scaling option that shall be selected
 * when a print dialog is displayed for this document.
 * ```typescript
 * // Create a new PDF document
 * let document : PdfDocument = new PdfDocument();
 * // Gets the viewer preferences of the document
 * let viewerPreferences : PdfViewerPreferences = document.viewerPreferences;
 * // Sets the page scaling
 * viewerPreferences.pageScaling = PageScalingMode.None;
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare enum PageScalingMode {
    /**
     * Indicates the conforming reader’s default print scaling.
     */
    AppDefault = 0,
    /**
     * Indicates no page scaling.
     */
    None = 1
}
