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
define(["require", "exports", "@syncfusion/ej2-base/helpers/e2e"], function (require, exports, e2e_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ChartHelper = (function (_super) {
        __extends(ChartHelper, _super);
        function ChartHelper(id, wrapperFn) {
            var _this = _super.call(this) || this;
            _this.id = id;
            if (wrapperFn !== undefined) {
                _this.wrapperFn = wrapperFn;
            }
            return _this;
        }
        ChartHelper.prototype.getChartContainer = function () {
            return this.selector('#' + this.id);
        };
        ChartHelper.prototype.getAxisInsideElement = function () {
            return this.selector('#' + this.id + 'AxisInsideCollection');
        };
        ChartHelper.prototype.getAxisOutsideElement = function () {
            return this.selector('#' + this.id + 'AxisOutsideCollection');
        };
        ChartHelper.prototype.getSeriesElement = function () {
            return this.selector('#' + this.id + 'SeriesCollection');
        };
        ChartHelper.prototype.getTooltipElement = function () {
            return this.selector('#' + this.id + '_tooltip');
        };
        ChartHelper.prototype.getLegendElement = function () {
            return this.selector('#' + this.id + '_chart_legend_collections');
        };
        ChartHelper.prototype.getAnnotationElement = function () {
            return this.selector('#' + this.id + '_Annotation_Collections');
        };
        ChartHelper.prototype.getUserInteractionElement = function () {
            return this.selector('#' + this.id + '_UserInteraction');
        };
        ChartHelper.prototype.getTrendLineElement = function () {
            return this.selector('#' + this.id + 'TrendLineCollection');
        };
        ChartHelper.prototype.getIndicatorElement = function () {
            return this.selector('#' + this.id + 'IndicatorCollection');
        };
        ChartHelper.prototype.getZoomingKitElement = function () {
            return this.selector('#' + this.id + '_Zooming_KitCollection');
        };
        ChartHelper.prototype.getStriplineBehindCollection = function () {
            return this.selector('#' + this.id + '_stripline_Behind_collections');
        };
        ChartHelper.prototype.getStriplineOverCollection = function () {
            return this.selector('#' + this.id + '_stripline_Over_collections');
        };
        return ChartHelper;
    }(e2e_1.TestHelper));
    exports.ChartHelper = ChartHelper;
});
