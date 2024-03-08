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
    var SparklineHelper = (function (_super) {
        __extends(SparklineHelper, _super);
        function SparklineHelper(id, wrapperFn) {
            var _this = _super.call(this) || this;
            _this.id = id;
            if (wrapperFn !== undefined) {
                _this.wrapperFn = wrapperFn;
            }
            return _this;
        }
        SparklineHelper.prototype.getSparklineContainer = function () {
            return this.selector('#' + this.id);
        };
        SparklineHelper.prototype.getLinePathElement = function () {
            return this.selector('#' + this.id + '_sparkline_line');
        };
        SparklineHelper.prototype.getAreaElement = function () {
            return this.selector('#' + this.id + '_sparkline_area_str');
        };
        SparklineHelper.prototype.getColumnElement = function () {
            return this.selector('#' + this.id + '_sparkline_column_0');
        };
        SparklineHelper.prototype.getWinlossElement = function () {
            return this.selector('#' + this.id + '_sparkline_winloss_0');
        };
        SparklineHelper.prototype.getPieElement = function () {
            return this.selector('#' + this.id + '_sparkline_pie_0');
        };
        SparklineHelper.prototype.getMarkerGroupElement = function () {
            return this.selector('#' + this.id + '_sparkline_marker_g');
        };
        SparklineHelper.prototype.getLabelGroupElement = function () {
            return this.selector('#' + this.id + '_sparkline_label_g');
        };
        SparklineHelper.prototype.getTooltipElement = function () {
            return this.selector('#' + this.id + '_Secondary_Element');
        };
        return SparklineHelper;
    }(e2e_1.TestHelper));
    exports.SparklineHelper = SparklineHelper;
});
