import { PdfPageOrientation } from '@syncfusion/ej2-pdf-export';
import { ExportType } from '../../common/utils/enum';
import { IPDFArgs } from '../../common/model/interface';
import { Chart3D } from '../chart3D';
/**
 * The `Export3DModule` module is used to print and export the rendered chart.
 */
export declare class Export3D {
    private chart;
    /**
     * Constructor for export module.
     *
     * @private
     */
    constructor(chart: Chart3D);
    /**
     * Export the chart on the page to PNG, JPEG, or SVG format.
     *
     * @param {number} type - The format in which the chart will be exported.
     * @param {string} fileName - The name of the exported file.
     * @returns {void}
     */
    export(type: ExportType, fileName: string): void;
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
    pdfExport(fileName: string, orientation?: PdfPageOrientation, controls?: (Chart3D)[], width?: number, height?: number, isVertical?: boolean, header?: IPDFArgs, footer?: IPDFArgs, exportToMultiplePage?: boolean): void;
    /**
     * Gets a data URL for the rendered 3D chart as an HTML canvas element, including data URL and blob URL if available.
     *
     * @param {Chart3D} chart - The 3D chart for which the data URL is requested.
     * @returns {{ element: HTMLCanvasElement, dataUrl?: string, blobUrl?: string }} An object containing the HTML canvas element, data URL, and blob URL.
     */
    getDataUrl(chart: Chart3D): {
        element: HTMLCanvasElement;
        dataUrl?: string;
        blobUrl?: string;
    };
    /**
     * Gets the module name for the current component.
     *
     * @returns {string} The module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the export modules.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
