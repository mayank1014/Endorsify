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
    var DropDownListHelper = (function (_super) {
        __extends(DropDownListHelper, _super);
        function DropDownListHelper(id, wrapperFn) {
            var _this = _super.call(this) || this;
            _this.id = id;
            if (wrapperFn !== undefined) {
                _this.wrapperFn = wrapperFn;
            }
            return _this;
        }
        DropDownListHelper.prototype.selector = function (arg) {
            return (this.wrapperFn ? this.wrapperFn(arg) : arg);
        };
        DropDownListHelper.prototype.getInputElement = function () {
            return this.selector('#' + this.id);
        };
        DropDownListHelper.prototype.getPopupElement = function () {
            return this.selector('#' + this.id + '_popup');
        };
        DropDownListHelper.prototype.getValueElement = function () {
            return this.selector('#' + this.id + '_hidden');
        };
        DropDownListHelper.prototype.getListItemElement = function () {
            return this.selector('.e-popup .e-content .e-list-parent .e-list-item');
        };
        DropDownListHelper.prototype.getListGroupingElemnt = function () {
            return this.selector('.e-popup .e-content .e-list-parent .e-list-group-item');
        };
        DropDownListHelper.prototype.getWrapperElement = function () {
            return this.selector('.e-input-group.e-control-wrapper.e-ddl.e-lib.e-keyboard');
        };
        DropDownListHelper.prototype.getInputGroupIconElement = function () {
            return this.selector('.e-input-group.e-control-wrapper.e-ddl.e-lib.e-keyboard .e-input-group-icon');
        };
        DropDownListHelper.prototype.getSpinnerElement = function () {
            return this.selector('.e-input-group.e-control-wrapper.e-ddl.e-lib.e-keyboard .e-input-group-icon .e-spinner-pane');
        };
        DropDownListHelper.prototype.getSpinnerInnerElement = function () {
            return this.selector('.e-input-group.e-control-wrapper.e-ddl.e-lib.e-keyboard .e-input-group-icon .e-spinner-pane .e-spinner-inner');
        };
        DropDownListHelper.prototype.getFilterParentElement = function () {
            return this.selector('.e-popup .e-filter-parent');
        };
        DropDownListHelper.prototype.getfilterInputGroupElement = function () {
            return this.selector('.e-popup .e-filter-parent .e-input-group');
        };
        DropDownListHelper.prototype.getFilterInputElement = function () {
            return this.selector('.e-popup .e-filter-parent .e-input-group .e-input-filter');
        };
        DropDownListHelper.prototype.getFilterClearIconElement = function () {
            return this.selector('.e-popup .e-filter-parent .e-input-group .e-clear-icon');
        };
        return DropDownListHelper;
    }(e2e_1.TestHelper));
    exports.DropDownListHelper = DropDownListHelper;
});
