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
    var ToolbarHelper = (function (_super) {
        __extends(ToolbarHelper, _super);
        function ToolbarHelper(id, wrapperFn) {
            var _this = _super.call(this) || this;
            _this.id = id;
            if (wrapperFn !== undefined) {
                _this.wrapperFn = wrapperFn;
            }
            return _this;
        }
        ToolbarHelper.prototype.selector = function (arg) {
            return (this.wrapperFn ? this.wrapperFn(arg) : arg);
        };
        ToolbarHelper.prototype.getElement = function () {
            return this.selector('#' + this.id);
        };
        ToolbarHelper.prototype.getLeftScrollNavigationElement = function () {
            return this.selector('#' + this.id + ' .e-toolbar-items.e-hscroll .e-scroll-nav.e-scroll-left-nav');
        };
        ToolbarHelper.prototype.getRightScrollNavigationElement = function () {
            return this.selector('#' + this.id + ' .e-toolbar-items.e-hscroll .e-scroll-nav.e-scroll-right-nav');
        };
        ToolbarHelper.prototype.getOverflowNavigationElement = function () {
            return this.selector('#' + this.id + ' .e-toolbar_pop_nav.e-hor-nav');
        };
        ToolbarHelper.prototype.getItems = function () {
            return this.selector('#' + this.id + ' .e-toolbar-items');
        };
        ToolbarHelper.prototype.getItemElement = function () {
            return this.selector('#' + this.id + ' .e-toolbar-items .e-toolbar-item');
        };
        ToolbarHelper.prototype.getOverflowItemElement = function () {
            return this.selector('#' + this.id + ' .e-toolbar-pop.e-popup .e-toolbar-item');
        };
        ToolbarHelper.prototype.setModel = function (property, value) {
            var cy;
            return cy.get('#' + this.id).then(function (ele) {
                return ele[0].ej2_instances[0][property] = value;
            });
        };
        ToolbarHelper.prototype.getModel = function (property) {
            var cy;
            return cy.get('#' + this.id).then(function (ele) {
                return ele[0].ej2_instances[0][property];
            });
        };
        ToolbarHelper.prototype.invoke = function (fName, args) {
            if (args === void 0) { args = []; }
            var cy;
            return cy.get('#' + this.id).then(function (ele) {
                var inst = ele[0].ej2_instances[0];
                return inst[fName].apply(inst, args);
            });
        };
        return ToolbarHelper;
    }(e2e_1.TestHelper));
    exports.ToolbarHelper = ToolbarHelper;
});
