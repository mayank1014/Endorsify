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
    var RangeNavigatorHelper = (function (_super) {
        __extends(RangeNavigatorHelper, _super);
        function RangeNavigatorHelper(id, wrapperFn) {
            var _this = _super.call(this) || this;
            _this.id = id;
            if (wrapperFn !== undefined) {
                _this.wrapperFn = wrapperFn;
            }
            return _this;
        }
        RangeNavigatorHelper.prototype.getRangeNavigatorContainer = function () {
            return this.selector('#' + this.id);
        };
        RangeNavigatorHelper.prototype.getRangeSecondaryElement = function () {
            return this.selector('#' + this.id + '_Secondary_Element');
        };
        RangeNavigatorHelper.prototype.getRangeLeftTooltip = function () {
            return this.selector('#' + this.id + '_leftTooltip');
        };
        RangeNavigatorHelper.prototype.getRangeRightTooltip = function () {
            return this.selector('#' + this.id + '_rightTooltip');
        };
        RangeNavigatorHelper.prototype.getRangeSvgElement = function () {
            return this.selector('#' + this.id + '_svg');
        };
        RangeNavigatorHelper.prototype.getRangeChartBorder = function () {
            return this.selector('#' + this.id + '_ChartBorder');
        };
        RangeNavigatorHelper.prototype.getRangeGridLines = function () {
            return this.selector('#' + this.id + '_GridLines');
        };
        RangeNavigatorHelper.prototype.getRangeAxisLabels = function () {
            return this.selector('#' + this.id + '_AxisLabels');
        };
        RangeNavigatorHelper.prototype.getRangeChart = function () {
            return this.selector('#' + this.id + '_chart');
        };
        RangeNavigatorHelper.prototype.getRangeChartSeriesBorder = function () {
            return this.selector('#' + this.id + '_SeriesBorder');
        };
        RangeNavigatorHelper.prototype.getRangeSliders = function () {
            return this.selector('#' + this.id + '_sliders');
        };
        RangeNavigatorHelper.prototype.getRangeLeftUnselectedArea = function () {
            return this.selector('#' + this.id + '_leftUnSelectedArea');
        };
        RangeNavigatorHelper.prototype.getRangeRightUnselectedArea = function () {
            return this.selector('#' + this.id + '_rightUnSelectedArea');
        };
        RangeNavigatorHelper.prototype.getRangeSelectedArea = function () {
            return this.selector('#' + this.id + '_SelectedArea');
        };
        RangeNavigatorHelper.prototype.getRangeLeftSlider = function () {
            return this.selector('#' + this.id + '_LeftSlider');
        };
        RangeNavigatorHelper.prototype.getRangeRightSlider = function () {
            return this.selector('#' + this.id + '_RightSlider');
        };
        return RangeNavigatorHelper;
    }(e2e_1.TestHelper));
    exports.RangeNavigatorHelper = RangeNavigatorHelper;
});
