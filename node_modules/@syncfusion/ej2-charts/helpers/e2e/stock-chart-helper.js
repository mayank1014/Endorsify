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
    var StockChartHelper = (function (_super) {
        __extends(StockChartHelper, _super);
        function StockChartHelper(id, wrapperFn) {
            var _this = _super.call(this) || this;
            _this.id = id;
            if (wrapperFn !== undefined) {
                _this.wrapperFn = wrapperFn;
            }
            return _this;
        }
        StockChartHelper.prototype.getStockContainer = function () {
            return this.selector('#' + this.id);
        };
        StockChartHelper.prototype.getStockBorder = function () {
            return this.selector('#' + this.id + '_stock_border');
        };
        StockChartHelper.prototype.getStockSecondaryElement = function () {
            return this.selector('#' + this.id + '_Secondary_Element');
        };
        StockChartHelper.prototype.getStockTitle = function () {
            return this.selector('#' + this.id + '_stockChart_Title');
        };
        StockChartHelper.prototype.getStockRangeLeftTooltip = function () {
            return this.selector('#' + this.id + '_stockChart_rangeSelector_leftTooltip');
        };
        StockChartHelper.prototype.getStockRangeRightTooltip = function () {
            return this.selector('#' + this.id + '_stockChart_rangeSelector_rightTooltip');
        };
        StockChartHelper.prototype.getStockToolbar = function () {
            return this.selector('#' + this.id + '_Secondary_Element_Secondary_Element');
        };
        StockChartHelper.prototype.getStockTooltip = function () {
            return this.selector('#' + this.id + '_stockChart_chart_tooltip');
        };
        StockChartHelper.prototype.getStockSvgElement = function () {
            return this.selector('#' + this.id + '_stockChart_svg');
        };
        StockChartHelper.prototype.getStockChartElement = function () {
            return this.selector('#' + this.id + '_stockChart_chart');
        };
        StockChartHelper.prototype.getStockChartBorder = function () {
            return this.selector('#' + this.id + '_stockChart_chart_ChartBorder');
        };
        StockChartHelper.prototype.getStockChartAxisInsideCollection = function () {
            return this.selector('#' + this.id + '_stockChart_chartAxisInsideCollection');
        };
        StockChartHelper.prototype.getStockChartAxisOutsideCollection = function () {
            return this.selector('#' + this.id + '_stockChart_chartAxisOutsideCollection');
        };
        StockChartHelper.prototype.getStockChartSeriesCollection = function () {
            return this.selector('#' + this.id + '_stockChart_chart');
        };
        StockChartHelper.prototype.getStockChartUserInteraction = function () {
            return this.selector('#' + this.id + '_stockChart_chart_UserInteraction');
        };
        StockChartHelper.prototype.getStockRangeElement = function () {
            return this.selector('#' + this.id + '_stockChart_rangeSelector');
        };
        StockChartHelper.prototype.getStockRangeBorder = function () {
            return this.selector('#' + this.id + '_stockChart_rangeSelector_ChartBorder');
        };
        StockChartHelper.prototype.getStockRangeGridLines = function () {
            return this.selector('#' + this.id + '_stockChart_rangeSelector_GridLines');
        };
        StockChartHelper.prototype.getStockRangeAxisLabels = function () {
            return this.selector('#' + this.id + '_stockChart_rangeSelector_AxisLabels');
        };
        StockChartHelper.prototype.getStockRangeChart = function () {
            return this.selector('#' + this.id + '_stockChart_rangeSelector_chart');
        };
        StockChartHelper.prototype.getStockRangeSliders = function () {
            return this.selector('#' + this.id + '_stockChart_rangeSelector_sliders');
        };
        StockChartHelper.prototype.getStockRangeLeftUnselectedArea = function () {
            return this.selector('#' + this.id + '_stockChart_rangeSelector_leftUnSelectedArea');
        };
        StockChartHelper.prototype.getStockRangeRightUnselectedArea = function () {
            return this.selector('#' + this.id + '_stockChart_rangeSelector_rightUnSelectedArea');
        };
        StockChartHelper.prototype.getStockRangeSelectedArea = function () {
            return this.selector('#' + this.id + '_stockChart_rangeSelector_SelectedArea');
        };
        StockChartHelper.prototype.getStockRangeLeftSlider = function () {
            return this.selector('#' + this.id + '_stockChart_rangeSelector_LeftSlider');
        };
        StockChartHelper.prototype.getStockRangeRightSlider = function () {
            return this.selector('#' + this.id + '_stockChart_rangeSelector_RightSlider');
        };
        return StockChartHelper;
    }(e2e_1.TestHelper));
    exports.StockChartHelper = StockChartHelper;
});
