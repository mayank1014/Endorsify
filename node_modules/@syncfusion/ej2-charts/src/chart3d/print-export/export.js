import { ExportUtils } from '../../common/utils/export';
import { beforeExport } from '../../common/model/constants';
/**
 * The `Export3DModule` module is used to print and export the rendered chart.
 */
var Export3D = /** @class */ (function () {
    /**
     * Constructor for export module.
     *
     * @private
     */
    function Export3D(chart) {
        this.chart = chart;
    }
    /**
     * Export the chart on the page to PNG, JPEG, or SVG format.
     *
     * @param {number} type - The format in which the chart will be exported.
     * @param {string} fileName - The name of the exported file.
     * @returns {void}
     */
    Export3D.prototype.export = function (type, fileName) {
        var exportChart = new ExportUtils(this.chart);
        var argsData = {
            cancel: false, width: null, height: null
        };
        this.chart.trigger(beforeExport, argsData);
        if (!argsData.cancel) {
            exportChart.export(type, fileName, undefined, [this.chart]);
        }
    };
    /**
     * Export the chart on the page to a PDF document.
     *
     * @param {string} fileName - The name of the exported file.
     * @param {PdfPageOrientation} orientation - Page orientation (portrait or landscape).
     * @param {Chart3D[]} controls - Array of controls to be exported.
     * @param {number} width - The width of the exported chart.
     * @param {number} height - The height of the exported chart.
     * @param {boolean} isVertical - Export the chart vertically or horizontally.
     * @param {string} header - Text to appear at the top of the exported PDF document.
     * @param {string} footer - Text to appear at the bottom of the exported PDF document.
     * @param {boolean} exportToMultiplePage - Export the chart to multiple PDF pages.
     * @returns {void}
     */
    Export3D.prototype.pdfExport = function (fileName, orientation, controls, width, height, isVertical, header, footer, exportToMultiplePage) {
        var exportChart = new ExportUtils(this.chart);
        controls = controls ? controls : [this.chart];
        var argsData = {
            cancel: false, width: width, height: height
        };
        this.chart.trigger(beforeExport, argsData);
        if (!argsData.cancel) {
            exportChart.export('PDF', fileName, orientation, controls, width = argsData.width, height = argsData.height, isVertical, header, footer, exportToMultiplePage);
        }
    };
    /**
     * Gets a data URL for the rendered 3D chart as an HTML canvas element, including data URL and blob URL if available.
     *
     * @param {Chart3D} chart - The 3D chart for which the data URL is requested.
     * @returns {{ element: HTMLCanvasElement, dataUrl?: string, blobUrl?: string }} An object containing the HTML canvas element, data URL, and blob URL.
     */
    Export3D.prototype.getDataUrl = function (chart) {
        var exportUtil = new ExportUtils(chart);
        return exportUtil.getDataUrl(chart);
    };
    /**
     * Gets the module name for the current component.
     *
     * @returns {string} The module name.
     */
    Export3D.prototype.getModuleName = function () {
        // Returns the module name
        return 'Export3D';
    };
    /**
     * To destroy the export modules.
     *
     * @returns {void}
     * @private
     */
    Export3D.prototype.destroy = function () {
        // Destroy method performed here
    };
    return Export3D;
}());
export { Export3D };
