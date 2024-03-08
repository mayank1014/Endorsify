var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Highlight src file
 */
import { Browser } from '@syncfusion/ej2-base';
import { extend } from '@syncfusion/ej2-base';
import { Selection3D } from './selection';
/**
 * The `Highlight` module handles the highlight for chart.
 *
 * @private
 */
var Highlight3D = /** @class */ (function (_super) {
    __extends(Highlight3D, _super);
    /**
     * Constructor for selection module.
     *
     * @param {Chart3D} chart - Chart3D instance.
     */
    function Highlight3D(chart) {
        var _this = _super.call(this, chart) || this;
        _this.chart = chart;
        _this.wireEvents();
        return _this;
    }
    /**
     * Binding events for highlight module.
     *
     * @returns {void}
     */
    Highlight3D.prototype.wireEvents = function () {
        if (this.chart.isDestroyed) {
            return;
        }
        this.chart.on(Browser.touchMoveEvent, this.mouseMove, this);
    };
    /**
     * Unbinding events for highlight module.
     *
     * @returns {void}
     */
    Highlight3D.prototype.unWireEvents = function () {
        if (this.chart.isDestroyed) {
            return;
        }
        this.chart.off(Browser.touchMoveEvent, this.mouseMove);
    };
    /**
     * Declares private variables for the highlight modules.
     *
     * @param {Chart3D} chart - The 3D chart for which private variables are being declared.
     * @returns {void}
     */
    Highlight3D.prototype.declarePrivateVariables = function (chart) {
        this.styleId = chart.element.id + '_ej2_chart_highlight';
        this.unselected = chart.element.id + '_ej2_deselected';
        this.selectedDataIndexes = [];
        this.highlightDataIndexes = [];
        this.isSeriesMode = chart.highlightMode === 'Series';
    };
    /**
     * Invokes the highlighting functionality on a 3D chart.
     *
     * @param {Chart3D} chart - The 3D chart on which highlighting is being invoked.
     * @returns {void}
     */
    Highlight3D.prototype.invokeHighlight = function (chart) {
        this.declarePrivateVariables(chart);
        this.series = extend({}, chart.visibleSeries, null, true);
        this.seriesStyles();
        this.currentMode = chart.highlightMode;
    };
    /**
     * Gets the module name for the highlighting functionality.
     *
     * @returns {string} The module name.
     */
    Highlight3D.prototype.getModuleName = function () {
        return 'Highlight3D';
    };
    /**
     * To destroy the highlight module.
     *
     * @returns {void}
     * @private
     */
    Highlight3D.prototype.destroy = function () {
        this.unWireEvents();
        // Destroy method performed here
    };
    return Highlight3D;
}(Selection3D));
export { Highlight3D };
