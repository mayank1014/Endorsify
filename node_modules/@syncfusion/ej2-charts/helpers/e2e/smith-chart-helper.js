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
    var SmithChartHelper = (function (_super) {
        __extends(SmithChartHelper, _super);
        function SmithChartHelper(id, wrapperFn) {
            var _this = _super.call(this) || this;
            _this.id = id;
            if (wrapperFn !== undefined) {
                _this.wrapperFn = wrapperFn;
            }
            return _this;
        }
        SmithChartHelper.prototype.getSmithchartContainer = function () {
            return this.selector('#' + this.id);
        };
        SmithChartHelper.prototype.getTitlegroupElement = function () {
            return this.selector('#' + this.id + '_Title_Group');
        };
        SmithChartHelper.prototype.getHorizontalAxisMajorGridLinesElement = function () {
            return this.selector('#' + this.id + '_svg_horizontalAxisMajorGridLines');
        };
        SmithChartHelper.prototype.gethAxisLineElement = function () {
            return this.selector('#' + this.id + '_svg_hAxisLine');
        };
        SmithChartHelper.prototype.getRadialAxisMajorGridLinesElement = function () {
            return this.selector('#' + this.id + '_svg_radialAxisMajorGridLines');
        };
        SmithChartHelper.prototype.getRAxisLineElement = function () {
            return this.selector('#' + this.id + '_svg_rAxisLine');
        };
        SmithChartHelper.prototype.getHAxisLabelsElement = function () {
            return this.selector('#' + this.id + '_HAxisLabels');
        };
        SmithChartHelper.prototype.getRAxisLabelsElement = function () {
            return this.selector('#' + this.id + '_RAxisLabels');
        };
        SmithChartHelper.prototype.getseriesCollectionsElement = function () {
            return this.selector('#' + this.id + '_svg_seriesCollections');
        };
        SmithChartHelper.prototype.getMarkerElement = function () {
            return this.selector('#' + this.id + '_svg_series1_Marker');
        };
        SmithChartHelper.prototype.getSecondaryElement = function () {
            return this.selector('#' + this.id + '_Secondary_Element');
        };
        SmithChartHelper.prototype.getLegendElement = function () {
            return this.selector('#' + this.id + 'legendItem_Group');
        };
        return SmithChartHelper;
    }(e2e_1.TestHelper));
    exports.SmithChartHelper = SmithChartHelper;
});
