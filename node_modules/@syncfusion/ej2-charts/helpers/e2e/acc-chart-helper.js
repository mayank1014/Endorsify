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
    var AccumulationChartHelper = (function (_super) {
        __extends(AccumulationChartHelper, _super);
        function AccumulationChartHelper(id, wrapperFn) {
            var _this = _super.call(this) || this;
            _this.id = id;
            if (wrapperFn !== undefined) {
                _this.wrapperFn = wrapperFn;
            }
            return _this;
        }
        AccumulationChartHelper.prototype.getAccumulationContainer = function () {
            return this.selector('#' + this.id);
        };
        AccumulationChartHelper.prototype.getAccumulationSecondaryElement = function () {
            return this.selector('#' + this.id + '_Secondary_Element');
        };
        AccumulationChartHelper.prototype.getAccumulationTooltip = function () {
            return this.selector('#' + this.id + '_tooltip');
        };
        AccumulationChartHelper.prototype.getAccumulationSvgElement = function () {
            return this.selector('#' + this.id + '_svg');
        };
        AccumulationChartHelper.prototype.getAccumulationSeriesCollection = function () {
            return this.selector('#' + this.id + '_SeriesCollection');
        };
        AccumulationChartHelper.prototype.getAccumulationSeries = function () {
            return this.selector('#' + this.id + '_Series_0_Point_0');
        };
        AccumulationChartHelper.prototype.getAccumulationDatalabel = function () {
            return this.selector('#' + this.id + '_datalabel_Series_0');
        };
        AccumulationChartHelper.prototype.getAccumulationTitle = function () {
            return this.selector('#' + this.id + '_title');
        };
        AccumulationChartHelper.prototype.getAccumulationSubtitle = function () {
            return this.selector('#' + this.id + '_subTitle');
        };
        AccumulationChartHelper.prototype.getAccumulatioLegendCollection = function () {
            return this.selector('#' + this.id + '_chart_legend_collections');
        };
        AccumulationChartHelper.prototype.getAccumulationLegendBoundary = function () {
            return this.selector('#' + this.id + '_chart_legend_element');
        };
        AccumulationChartHelper.prototype.getAccumulationBorder = function () {
            return this.selector('#' + this.id + '_border');
        };
        AccumulationChartHelper.prototype.getAccumulationAnnotationCollection = function () {
            return this.selector('#' + this.id + '_Annotation_Collections');
        };
        return AccumulationChartHelper;
    }(e2e_1.TestHelper));
    exports.AccumulationChartHelper = AccumulationChartHelper;
});
