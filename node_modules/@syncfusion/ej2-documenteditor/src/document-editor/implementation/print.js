import { isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * Print class
 */
var Print = /** @class */ (function () {
    function Print() {
        var _this = this;
        this.windowPrint = undefined;
        this.closePrintWindow = function () {
            if (_this.windowPrint && !_this.windowPrint.closed) {
                _this.windowPrint.close();
            }
        };
    }
    Print.prototype.getModuleName = function () {
        return 'Print';
    };
    /**
     * Prints the current viewer
     *
     * @private
     * @param {DocumentHelper} documentHelper - Specifies the document helper.
     * @param {Window} printWindow - Specifies the print window.
     * @returns {void}
     */
    Print.prototype.print = function (documentHelper, printWindow) {
        this.printWindow(documentHelper, navigator !== undefined ? navigator.userAgent : "", printWindow);
    };
    /**
     * Opens print window and displays current page to print.
     *
     * @private
     * @param {DocumentHelper} documentHelper - Specifies the document helper.
     * @param {string} browserUserAgent - Specifies the browser user agent.
     * @param {Window} printWindow - Specifies the print window.
     * @returns {void}
     */
    Print.prototype.printWindow = function (documentHelper, browserUserAgent, printWindow) {
        var height = this.getPageHeight(documentHelper.pages);
        var width = this.getPageWidth(documentHelper.pages);
        var printElement = document.createElement('div');
        printElement.style.width = '100%';
        printElement.style.height = '100%';
        printElement.style.overflow = 'scroll';
        // Rendering canvas to print
        this.generatePrintContent(documentHelper, printElement);
        if (isNullOrUndefined(printWindow)) {
            printWindow = window.open('', 'print', 'height=452,width=1024,tabbar=no');
        }
        this.windowPrint = printWindow;
        var pageSize = width.toString() + 'px ' + height.toString() + 'px';
        if (width > height) {
            pageSize = 'landscape';
        }
        if (browserUserAgent.indexOf('Chrome') !== -1) {
            // Chrome
            printWindow.document.write('<!DOCTYPE html>');
            printWindow.document.write('<html><head><title>' + documentHelper.owner.documentName + '</title><style>img { height: 100%; width: 100%; display: block;}img { box-sizing: border-box; }br, button { display: none; }@page{ margin: 0cm; size:' + pageSize + '; }</style></head> <body><center>');
        }
        else if (browserUserAgent.indexOf('Firefox') !== -1) {
            // Firefox
            printWindow.document.write('<!DOCTYPE html>');
            printWindow.document.write('<html moznomarginboxes mozdisallowselectionprint><head><title>' + documentHelper.owner.documentName + '</title><style>html, body { height: 100%; } img { height: 100%; width: 100%; display: block;}img { box-sizing: border-box; }br, button { display: none; }@page{ margin: 0cm; size:' + pageSize + '; }@media print{ body { margin: 0cm; size:' + pageSize + '; }}</style></head> <body><center>');
        }
        else {
            // Internet Explorer and Edge
            printWindow.document.write('<html><head><title>' + documentHelper.owner.documentName + '</title><style>@page{margin:0;size:' + pageSize + ';}</style></head><body><center>');
        }
        printWindow.document.write(printElement.innerHTML + '</center><script> (function() { window.ready = true; })(); </script></body></html>');
        printElement = undefined;
        printWindow.document.close();
        printWindow.focus();
        window.addEventListener('beforeunload', this.closePrintWindow);
        var interval = setInterval(function () {
            // eslint-disable-next-line
            if (printWindow.ready) {
                printWindow.print();
                printWindow.close();
                clearInterval(interval);
            }
        }, 500);
    };
    /**
     * Generate Document Image.
     *
     * @param documentHelper
     * @param pageNumber
     * @param imageType
     * @private
     */
    Print.prototype.exportAsImage = function (documentHelper, pageNumber, imageType) {
        var image;
        if (!isNullOrUndefined(pageNumber) && pageNumber <= documentHelper.pages.length && pageNumber >= 1) {
            var printPage = documentHelper.pages[(pageNumber - 1)];
            var pgHeight = printPage.boundingRectangle.height;
            var pgWidth = printPage.boundingRectangle.width;
            documentHelper.render.isPrinting = true;
            documentHelper.render.renderWidgets(printPage, 0, 0, 0, 0);
            //get the image data from the canvas
            var imageData = documentHelper.render.pageCanvas.toDataURL(imageType, 1);
            documentHelper.render.isPrinting = false;
            image = new Image();
            image.src = imageData;
            // tslint:disable-next-line:max-line-length
            image.setAttribute('style', 'margin:0px;display:block;width:' + pgWidth.toString() + 'px;height:' + pgHeight.toString() + 'px;');
        }
        return image;
    };
    /**
     * Generates print content.
     *
     * @private
     * @param {DocumentHelper} documentHelper - Specifies the document helper.
     * @param {HTMLDivElement} element - Specifies the element.
     * @returns {void}
     */
    Print.prototype.generatePrintContent = function (documentHelper, element) {
        // Rendering canvas to print
        var htmlString = '';
        for (var i = 0; i < documentHelper.pages.length; i++) {
            var page = documentHelper.pages[i];
            var pageHeight = page.boundingRectangle.height;
            var pageWidth = page.boundingRectangle.width;
            documentHelper.render.isPrinting = true;
            documentHelper.render.renderWidgets(page, 0, 0, pageWidth, 0);
            var canvasURL = documentHelper.render.pageCanvas.toDataURL();
            documentHelper.render.isPrinting = false;
            var breakstring = (i == documentHelper.pages.length - 1) ? '' : '<br/>';
            htmlString += '<div><img src=' + canvasURL + ' style="margin:0px;display:block;width: ' + pageWidth.toString() + 'px; height:' + pageHeight.toString() + 'px; "/></div>' + breakstring;
        }
        element.innerHTML = htmlString;
    };
    /**
     * Gets page width.
     *
     * @private
     * @param {Page} pages - Specifies the pages.
     * @returns {number} - Returns the page width.
     */
    Print.prototype.getPageWidth = function (pages) {
        var width = 0;
        for (var i = 0; i < pages.length; i++) {
            if (width < pages[i].boundingRectangle.width) {
                width = pages[i].boundingRectangle.width;
            }
        }
        return width;
    };
    /**
     * Gets page height.
     *
     * @private
     * @param {Page} pages - Specifies the pages.
     * @returns {number} - Returns the page height.
     */
    Print.prototype.getPageHeight = function (pages) {
        var height = 0;
        for (var i = 0; i < pages.length; i++) {
            if (height < pages[i].boundingRectangle.height) {
                height = pages[i].boundingRectangle.height;
            }
        }
        return height;
    };
    /**
     * @private
     * @returns {void}
     */
    Print.prototype.destroy = function () {
        window.removeEventListener('beforeunload', this.closePrintWindow);
        this.windowPrint = undefined;
        return;
    };
    return Print;
}());
export { Print };
