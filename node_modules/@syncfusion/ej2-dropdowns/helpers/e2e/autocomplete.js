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
    var AutoCompleteHelper = (function (_super) {
        __extends(AutoCompleteHelper, _super);
        function AutoCompleteHelper(id, wrapperFn) {
            var _this = _super.call(this) || this;
            _this.id = id;
            if (wrapperFn !== undefined) {
                _this.wrapperFn = wrapperFn;
            }
            return _this;
        }
        AutoCompleteHelper.prototype.selector = function (arg) {
            return (this.wrapperFn ? this.wrapperFn(arg) : arg);
        };
        AutoCompleteHelper.prototype.getInputElement = function () {
            return this.selector('#' + this.id);
        };
        AutoCompleteHelper.prototype.getPopupElement = function () {
            return this.selector('#' + this.id + '_popup');
        };
        AutoCompleteHelper.prototype.getListItemElement = function () {
            return this.selector('.e-popup .e-content .e-list-parent .e-list-item');
        };
        AutoCompleteHelper.prototype.getListGroupingElemnt = function () {
            return this.selector('.e-popup .e-content .e-list-parent .e-list-group-item');
        };
        AutoCompleteHelper.prototype.getValueElement = function () {
            return this.selector('#' + this.id + '_hidden');
        };
        AutoCompleteHelper.prototype.getWrapperElement = function () {
            return this.selector('.e-input-group.e-control-wrapper.e-ddl');
        };
        AutoCompleteHelper.prototype.getClearIconElement = function () {
            return this.selector('.e-input-group.e-control-wrapper.e-ddl .e-clear-icon');
        };
        AutoCompleteHelper.prototype.getSpinnerElement = function () {
            return this.selector('.e-input-group.e-control-wrapper.e-ddl .e-clear-icon .e-spinner-pane');
        };
        AutoCompleteHelper.prototype.getSpinnerInnerElement = function () {
            return this.selector('.e-input-group.e-control-wrapper.e-ddl .e-clear-icon .e-spinner-pane .e-spinner-inner');
        };
        return AutoCompleteHelper;
    }(e2e_1.TestHelper));
    exports.AutoCompleteHelper = AutoCompleteHelper;
});
