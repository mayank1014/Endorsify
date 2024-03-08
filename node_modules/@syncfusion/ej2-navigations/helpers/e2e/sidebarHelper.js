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
    var SideBarHelper = (function (_super) {
        __extends(SideBarHelper, _super);
        function SideBarHelper(id, wrapperFn) {
            var _this = _super.call(this) || this;
            _this.id = id;
            if (wrapperFn !== undefined) {
                _this.wrapperFn = wrapperFn;
            }
            return _this;
        }
        SideBarHelper.prototype.selector = function (arg) {
            return (this.wrapperFn ? this.wrapperFn(arg) : arg);
        };
        SideBarHelper.prototype.getElement = function () {
            return this.selector('#' + this.id);
        };
        SideBarHelper.prototype.getSidebar = function () {
            return this.selector('.e-sidebar');
        };
        SideBarHelper.prototype.getLeftSideBar = function () {
            return this.selector('.e-sidebar.e-left.e-open');
        };
        SideBarHelper.prototype.getLeft = function () {
            return this.selector('.e-sidebar.e-left');
        };
        SideBarHelper.prototype.getRight = function () {
            return this.selector('.e-sidebar.e-right');
        };
        SideBarHelper.prototype.getRightSideBar = function () {
            return this.selector('.e-sidebar.e-right.e-open');
        };
        SideBarHelper.prototype.getDockSidebar = function () {
            return this.selector('.e-sidebar.e-dock');
        };
        SideBarHelper.prototype.getExpandedDockSidebar = function () {
            return this.selector('.e-selector.e-dock.e-open');
        };
        SideBarHelper.prototype.getCollapsedDockSidebar = function () {
            return this.selector('.e-sidebar.e-dock.e-close');
        };
        SideBarHelper.prototype.getOverStateSidebar = function () {
            return this.selector('.e-sidebar.e-over');
        };
        SideBarHelper.prototype.getExpandedOverStateSidebar = function () {
            return this.selector('.e-sidebar.e-over.e-open');
        };
        SideBarHelper.prototype.getCollapsedOverStateSidebar = function () {
            return this.selector('.e-sidebar.e-over.e-close');
        };
        SideBarHelper.prototype.getPushStateSidebar = function () {
            return this.selector('.e-sidebar.e-push');
        };
        SideBarHelper.prototype.getExpandedPushStateSidebar = function () {
            return this.selector('.e-sidebar.e-push.e-open');
        };
        SideBarHelper.prototype.getCollapsedPushStateSidebar = function () {
            return this.selector('.e-sidebar.e-push.e-close');
        };
        SideBarHelper.prototype.getSlideStateSidebar = function () {
            return this.selector('.e-sidebar.e-slide');
        };
        SideBarHelper.prototype.getExpandedSlideStateSidebar = function () {
            return this.selector('.e-sidebar.e-slide.e-open');
        };
        SideBarHelper.prototype.getCollapsedSlideStateSidebar = function () {
            return this.selector('.e-sidebar.e-slide.e-close');
        };
        SideBarHelper.prototype.getOverlayElement = function () {
            return this.selector('.e-sidebar-overlay');
        };
        SideBarHelper.prototype.setModel = function (property, value) {
            var cy;
            return cy.get('#' + this.id).then(function (ele) {
                return ele[0].ej2_instances[0][property] = value;
            });
        };
        SideBarHelper.prototype.getModel = function (property) {
            var cy;
            return cy.get('#' + this.id).then(function (ele) {
                return ele[0].ej2_instances[0][property];
            });
        };
        SideBarHelper.prototype.invoke = function (fName, args) {
            if (args === void 0) { args = []; }
            var cy;
            return cy.get('#' + this.id).then(function (ele) {
                var inst = ele[0].ej2_instances[0];
                return inst[fName].apply(inst, args);
            });
        };
        return SideBarHelper;
    }(e2e_1.TestHelper));
    exports.SideBarHelper = SideBarHelper;
});
