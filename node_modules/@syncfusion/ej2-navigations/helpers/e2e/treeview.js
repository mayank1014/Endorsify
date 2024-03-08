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
    var TreeViewHelper = (function (_super) {
        __extends(TreeViewHelper, _super);
        function TreeViewHelper(id, wrapperFn) {
            var _this = _super.call(this) || this;
            _this.id = id;
            if (wrapperFn !== undefined) {
                _this.wrapperFn = wrapperFn;
            }
            return _this;
        }
        TreeViewHelper.prototype.selector = function (arg) {
            return (this.wrapperFn ? this.wrapperFn(arg) : arg);
        };
        TreeViewHelper.prototype.getElement = function () {
            return this.selector('#' + this.id);
        };
        TreeViewHelper.prototype.getCollapsedStateElement = function () {
            return this.selector('.e-list-item.e-level-1.e-node-collapsed');
        };
        TreeViewHelper.prototype.getExpandedStateElement = function () {
            return this.selector('.e-list-item.e-level-1');
        };
        TreeViewHelper.prototype.getTreeViewInstance = function () {
            return this.getElement().then(function (ele) {
                return ele[0].ej2_instances[0];
            });
        };
        TreeViewHelper.prototype.setTreeViewProperty = function (propertyName, args) {
            if (args === void 0) { args = null; }
            return this.getTreeViewInstance().then(function (ej2_instance) {
                return (ej2_instance[propertyName] = args);
            });
        };
        TreeViewHelper.prototype.callTreeviewMethods = function (methodName, args) {
            if (args === void 0) { args = null; }
            return this.getTreeViewInstance().then(function (ej2_instance) {
                return ej2_instance[methodName].call(ej2_instance, args);
            });
        };
        TreeViewHelper.prototype.getSelectedNodes = function (id) {
            return this.setTreeViewProperty('selectedNodes', id);
        };
        TreeViewHelper.prototype.getDisableNode = function (id) {
            return this.callTreeviewMethods('disableNodes', id);
        };
        TreeViewHelper.prototype.getActiveElement = function (id) {
            this.getSelectedNodes(id);
            return this.selector('.e-list-item.e-level-1.e-active.e-node-focus');
        };
        TreeViewHelper.prototype.getDisabledNodes = function (id) {
            this.getDisableNode(id);
            return this.selector('.e-list-item.e-level-1.e-disable');
        };
        TreeViewHelper.prototype.getNodeEdit = function (id) {
            return this.callTreeviewMethods('beginEdit', id);
        };
        TreeViewHelper.prototype.getEditableNode = function (id) {
            this.getNodeEdit(id);
            return this.selector('.e-text-content.e-icon-wrapper .e-input-group.e-control-wrapper');
        };
        return TreeViewHelper;
    }(e2e_1.TestHelper));
    exports.TreeViewHelper = TreeViewHelper;
});
