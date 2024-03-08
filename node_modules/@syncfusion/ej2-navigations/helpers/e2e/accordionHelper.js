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
    var AccordionHelper = (function (_super) {
        __extends(AccordionHelper, _super);
        function AccordionHelper(id, wrapperFn) {
            var _this = _super.call(this) || this;
            _this.id = id;
            if (wrapperFn !== undefined) {
                _this.wrapperFn = wrapperFn;
            }
            return _this;
        }
        AccordionHelper.prototype.selector = function (arg) {
            return (this.wrapperFn ? this.wrapperFn(arg) : arg);
        };
        AccordionHelper.prototype.getElement = function () {
            return this.selector('#' + this.id);
        };
        AccordionHelper.prototype.getItemElement = function () {
            return this.selector('#' + this.id + ' .e-acrdn-item');
        };
        AccordionHelper.prototype.getHeaderElement = function () {
            return this.selector('#' + this.id + ' .e-acrdn-item .e-acrdn-header');
        };
        AccordionHelper.prototype.getPanelElement = function () {
            return this.selector('#' + this.id + ' .e-acrdn-item .e-acrdn-panel');
        };
        AccordionHelper.prototype.getActiveElement = function () {
            return this.selector('#' + this.id + ' .e-acrdn-item.e-selected.e-active');
        };
        AccordionHelper.prototype.getExpandStateElement = function () {
            return this.selector('#' + this.id + ' .e-acrdn-item.e-expand-state');
        };
        AccordionHelper.prototype.setModel = function (property, value) {
            var cy;
            return cy.get('#' + this.id).then(function (ele) {
                return ele[0].ej2_instances[0][property] = value;
            });
        };
        AccordionHelper.prototype.getModel = function (property) {
            var cy;
            return cy.get('#' + this.id).then(function (ele) {
                return ele[0].ej2_instances[0][property];
            });
        };
        AccordionHelper.prototype.invoke = function (functionName, args) {
            if (args === void 0) { args = []; }
            var cy;
            return cy.get('#' + this.id).then(function (ele) {
                var inst = ele[0].ej2_instances[0];
                return inst[functionName].apply(inst, args);
            });
        };
        return AccordionHelper;
    }(e2e_1.TestHelper));
    exports.AccordionHelper = AccordionHelper;
});
