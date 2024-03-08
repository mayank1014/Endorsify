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
    var ToastHelper = (function (_super) {
        __extends(ToastHelper, _super);
        function ToastHelper(id, wrapperFn) {
            var _this = _super.call(this) || this;
            _this.id = id;
            if (wrapperFn !== undefined) {
                _this.wrapperFn = wrapperFn;
            }
            return _this;
        }
        ToastHelper.prototype.getElement = function () {
            return this.selector('#' + this.id);
        };
        ToastHelper.prototype.getToastElement = function () {
            return this.selector('#' + this.id + ' .e-toast');
        };
        ToastHelper.prototype.getMessageWrapper = function () {
            return this.selector('#' + this.id + ' .e-toast-message');
        };
        ToastHelper.prototype.getTitleElement = function () {
            return this.selector('#' + this.id + ' .e-toast-title');
        };
        ToastHelper.prototype.getContentElement = function () {
            return this.selector('#' + this.id + ' .e-toast-content');
        };
        ToastHelper.prototype.getProgressElement = function () {
            return this.selector('#' + this.id + ' .e-toast-progress');
        };
        ToastHelper.prototype.getButtonWrapper = function () {
            return this.selector('#' + this.id + ' .e-toast-actions');
        };
        ToastHelper.prototype.getButtons = function () {
            return this.selector('#' + this.id + ' .e-toast-btn');
        };
        ToastHelper.prototype.getCloseButton = function () {
            return this.selector('#' + this.id + ' .e-toast-close-icon');
        };
        ToastHelper.prototype.getModel = function (property) {
            this.getModel(property);
        };
        ToastHelper.prototype.setModel = function (property, value) {
            this.setModel(property, value);
        };
        ToastHelper.prototype.invoke = function (fName, args) {
            this.invoke(fName, args);
        };
        return ToastHelper;
    }(e2e_1.TestHelper));
    exports.ToastHelper = ToastHelper;
});
