import { DictionaryProperties } from './../input-output/pdf-dictionary-properties';
import { PdfDictionary } from './../primitives/pdf-dictionary';
import { PdfBoolean } from './../primitives/pdf-boolean';
import { PdfName } from './../primitives/pdf-name';
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
var PdfViewerPreferences = /** @class */ (function () {
    /**
     * Initialize a new instance of `PdfViewerPreferences` class.
     *
     * @private
     * ```
    */
    function PdfViewerPreferences(catalog) {
        this._dictionaryProperties = new DictionaryProperties();
        this._centerWindow = false;
        this._fitWindow = false;
        this._displayTitle = false;
        this._splitWindow = false;
        this._hideMenuBar = false;
        this._hideToolBar = false;
        this._hideWindowUI = false;
        this._pageMode = PdfPageMode.UseNone;
        this._pageLayout = PdfPageLayout.SinglePage;
        this._dictionary = new PdfDictionary();
        this._duplex = DuplexMode.None;
        this._catalog = catalog;
    }
    Object.defineProperty(PdfViewerPreferences.prototype, "centerWindow", {
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
        get: function () {
            return this._centerWindow;
        },
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
        set: function (value) {
            this._centerWindow = value;
            this._dictionary.items.setValue(this._dictionaryProperties.centerWindow, new PdfBoolean(this._centerWindow));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewerPreferences.prototype, "displayTitle", {
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
        get: function () {
            return this._displayTitle;
        },
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
        set: function (value) {
            this._displayTitle = value;
            this._dictionary.items.setValue(this._dictionaryProperties.displayTitle, new PdfBoolean(this._displayTitle));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewerPreferences.prototype, "fitWindow", {
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
        get: function () {
            return this._fitWindow;
        },
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
        set: function (value) {
            this._fitWindow = value;
            this._dictionary.items.setValue(this._dictionaryProperties.fitWindow, new PdfBoolean(this._fitWindow));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewerPreferences.prototype, "hideMenuBar", {
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
        get: function () {
            return this._hideMenuBar;
        },
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
        set: function (value) {
            this._hideMenuBar = value;
            this._dictionary.items.setValue(this._dictionaryProperties.hideMenuBar, new PdfBoolean(this._hideMenuBar));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewerPreferences.prototype, "hideToolBar", {
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
        get: function () {
            return this._hideToolBar;
        },
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
        set: function (value) {
            this._hideToolBar = value;
            this._dictionary.items.setValue(this._dictionaryProperties.hideToolBar, new PdfBoolean(this._hideToolBar));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewerPreferences.prototype, "hideWindowUI", {
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
        get: function () {
            return this._hideWindowUI;
        },
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
        set: function (value) {
            this._hideWindowUI = value;
            this._dictionary.items.setValue(this._dictionaryProperties.hideWindowUI, new PdfBoolean(this._hideWindowUI));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewerPreferences.prototype, "pageMode", {
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
        get: function () {
            return this._pageMode;
        },
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
        set: function (value) {
            this._pageMode = value;
            this._catalog.items.setValue(this._dictionaryProperties.pageMode, new PdfName(this._mapPageMode(this._pageMode)));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewerPreferences.prototype, "duplex", {
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
        get: function () {
            return this._duplex;
        },
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
        set: function (value) {
            this._duplex = value;
            this._catalog.items.setValue(this._dictionaryProperties.duplex, new PdfName(this._mapDuplexMode(this._duplex)));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewerPreferences.prototype, "pageLayout", {
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
        get: function () {
            return this._pageLayout;
        },
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
        set: function (value) {
            this._pageLayout = value;
            this._catalog.items.setValue(this._dictionaryProperties.pageLayout, new PdfName(this._mapPageLayout(this._pageLayout)));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewerPreferences.prototype, "pageScaling", {
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
        get: function () {
            return this._pageScaling;
        },
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
        set: function (value) {
            this._pageScaling = value;
            if (this._pageScaling === PageScalingMode.AppDefault && this._dictionary.items.containsKey(this._dictionaryProperties.printScaling)) {
                this._dictionary.items.remove(this._dictionaryProperties.printScaling);
            }
            else if (this._pageScaling === PageScalingMode.None) {
                this._dictionary.items.setValue(this._dictionaryProperties.printScaling, new PdfName('None'));
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewerPreferences.prototype, "element", {
        /**
         * Primivie element
         *
         * @private
         */
        get: function () {
            return this._dictionary;
        },
        enumerable: true,
        configurable: true
    });
    PdfViewerPreferences.prototype._mapDuplexMode = function (mode) {
        switch (mode) {
            case DuplexMode.Simplex:
                return 'Simplex';
            case DuplexMode.DuplexFlipShortEdge:
                return 'DuplexFlipShortEdge';
            case DuplexMode.DuplexFlipLongEdge:
                return 'DuplexFlipLongEdge';
            case DuplexMode.None:
                return 'None';
        }
    };
    PdfViewerPreferences.prototype._mapPageMode = function (mode) {
        switch (mode) {
            case PdfPageMode.UseNone:
                return 'UseNone';
            case PdfPageMode.UseOutlines:
                return 'UseOutlines';
            case PdfPageMode.UseThumbs:
                return 'UseThumbs';
            case PdfPageMode.FullScreen:
                return 'FullScreen';
            case PdfPageMode.UseOC:
                return 'UseOC';
            case PdfPageMode.UseAttachments:
                return 'UseAttachments';
        }
    };
    PdfViewerPreferences.prototype._mapPageLayout = function (layout) {
        switch (layout) {
            case PdfPageLayout.SinglePage:
                return 'SinglePage';
            case PdfPageLayout.OneColumn:
                return 'OneColumn';
            case PdfPageLayout.TwoColumnLeft:
                return 'TwoColumnLeft';
            case PdfPageLayout.TwoColumnRight:
                return 'TwoColumnRight';
            case PdfPageLayout.TwoPageLeft:
                return 'TwoPageLeft';
            case PdfPageLayout.TwoPageRight:
                return 'TwoPageRight';
        }
    };
    return PdfViewerPreferences;
}());
export { PdfViewerPreferences };
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
export var PdfPageMode;
(function (PdfPageMode) {
    /**
     * Default value. Neither document outline nor thumbnail images visible.
     */
    PdfPageMode[PdfPageMode["UseNone"] = 0] = "UseNone";
    /**
     * Document outline visible.
     */
    PdfPageMode[PdfPageMode["UseOutlines"] = 1] = "UseOutlines";
    /**
     * Thumbnail images visible.
     */
    PdfPageMode[PdfPageMode["UseThumbs"] = 2] = "UseThumbs";
    /**
     * Full-screen mode, with no menu bar, window controls, or any other window visible.
     */
    PdfPageMode[PdfPageMode["FullScreen"] = 3] = "FullScreen";
    /**
     * Optional content group panel visible.
     */
    PdfPageMode[PdfPageMode["UseOC"] = 4] = "UseOC";
    /**
     * Attachments are visible.
     */
    PdfPageMode[PdfPageMode["UseAttachments"] = 5] = "UseAttachments";
})(PdfPageMode || (PdfPageMode = {}));
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
export var PdfPageLayout;
(function (PdfPageLayout) {
    /**
     * Default Value. Display one page at a time.
     */
    PdfPageLayout[PdfPageLayout["SinglePage"] = 0] = "SinglePage";
    /**
     * Display the pages in one column.
     */
    PdfPageLayout[PdfPageLayout["OneColumn"] = 1] = "OneColumn";
    /**
     * Display the pages in two columns, with odd numbered
     * pages on the left.
     */
    PdfPageLayout[PdfPageLayout["TwoColumnLeft"] = 2] = "TwoColumnLeft";
    /**
     * Display the pages in two columns, with odd numbered
     * pages on the right.
     */
    PdfPageLayout[PdfPageLayout["TwoColumnRight"] = 3] = "TwoColumnRight";
    /**
     * Display the pages two at a time, with odd-numbered pages on the left.
     */
    PdfPageLayout[PdfPageLayout["TwoPageLeft"] = 4] = "TwoPageLeft";
    /**
     * Display the pages two at a time, with odd-numbered pages on the right.
     */
    PdfPageLayout[PdfPageLayout["TwoPageRight"] = 5] = "TwoPageRight";
})(PdfPageLayout || (PdfPageLayout = {}));
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
export var DuplexMode;
(function (DuplexMode) {
    /**
     * Print single-sided.
     */
    DuplexMode[DuplexMode["Simplex"] = 0] = "Simplex";
    /**
     * Duplex and flip on the short edge of the sheet.
     */
    DuplexMode[DuplexMode["DuplexFlipShortEdge"] = 1] = "DuplexFlipShortEdge";
    /**
     * Duplex and flip on the long edge of the sheet.
     */
    DuplexMode[DuplexMode["DuplexFlipLongEdge"] = 2] = "DuplexFlipLongEdge";
    /**
     * Default value.
     */
    DuplexMode[DuplexMode["None"] = 3] = "None";
})(DuplexMode || (DuplexMode = {}));
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
export var PageScalingMode;
(function (PageScalingMode) {
    /**
     * Indicates the conforming reader’s default print scaling.
     */
    PageScalingMode[PageScalingMode["AppDefault"] = 0] = "AppDefault";
    /**
     * Indicates no page scaling.
     */
    PageScalingMode[PageScalingMode["None"] = 1] = "None";
})(PageScalingMode || (PageScalingMode = {}));
