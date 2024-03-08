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
    var MultiSelectHelper = (function (_super) {
        __extends(MultiSelectHelper, _super);
        function MultiSelectHelper(id, wrapperFn) {
            var _this = _super.call(this) || this;
            _this.id = id;
            if (wrapperFn !== undefined) {
                _this.wrapperFn = wrapperFn;
            }
            return _this;
        }
        MultiSelectHelper.prototype.selector = function (arg) {
            return (this.wrapperFn ? this.wrapperFn(arg) : arg);
        };
        MultiSelectHelper.prototype.getInputElement = function () {
            return this.selector('#' + this.id);
        };
        MultiSelectHelper.prototype.getPopupElement = function () {
            return this.selector('#' + this.id + '_popup');
        };
        MultiSelectHelper.prototype.getListItemElement = function () {
            return this.selector('.e-popup .e-content .e-list-parent .e-list-item');
        };
        MultiSelectHelper.prototype.getListGroupingElemnt = function () {
            return this.selector('.e-popup .e-content .e-list-parent .e-list-group-item');
        };
        MultiSelectHelper.prototype.getInputFocusElement = function () {
            return this.selector('.e-multiselect.e-input-group.e-input-focus');
        };
        MultiSelectHelper.prototype.getWrapperElement = function () {
            return this.selector('.e-multiselect.e-input-group .e-multi-select-wrapper');
        };
        MultiSelectHelper.prototype.getValueElement = function () {
            return this.selector('.e-multiselect.e-input-group .e-multi-select-wrapper .e-multi-hidden');
        };
        MultiSelectHelper.prototype.getDropdownBaseInputElement = function () {
            return this.selector('.e-multiselect.e-input-group .e-multi-select-wrapper .e-dropdownbase');
        };
        MultiSelectHelper.prototype.getSpinnerElement = function () {
            return this.selector('.e-multiselect.e-input-group .e-multi-select-wrapper .e-chips-close .e-spinner-pane');
        };
        MultiSelectHelper.prototype.getSpinnerInnerElement = function () {
            return this.selector('.e-multiselect.e-input-group .e-multi-select-wrapper .e-chips-close .e-spinner-pane .e-spinner-inner');
        };
        MultiSelectHelper.prototype.getDelimValuesElement = function () {
            return this.selector('.e-multiselect.e-input-group .e-multi-select-wrapper .e-delim-view');
        };
        MultiSelectHelper.prototype.getChipCollectionElement = function () {
            return this.selector('.e-multiselect.e-input-group .e-multi-select-wrapper .e-chips-collection');
        };
        MultiSelectHelper.prototype.getSearcherElement = function () {
            return this.selector('.e-multiselect.e-input-group .e-multi-select-wrapper .e-searcher');
        };
        MultiSelectHelper.prototype.getChipCloseElement = function () {
            return this.selector('.e-multiselect.e-input-group .e-multi-select-wrapper .e-chips-close');
        };
        MultiSelectHelper.prototype.getInputGroupIconElemet = function () {
            return this.selector('.e-multiselect.e-input-group .e-multi-select-wrapper .e-input-group-icon');
        };
        MultiSelectHelper.prototype.getFilterParentElement = function () {
            return this.selector('.e-popup .e-filter-parent');
        };
        MultiSelectHelper.prototype.getfilterInputGroupElement = function () {
            return this.selector('.e-popup .e-filter-parent .e-input-group');
        };
        MultiSelectHelper.prototype.getFilterInputElement = function () {
            return this.selector('.e-popup .e-filter-parent .e-input-group .e-input-filter');
        };
        MultiSelectHelper.prototype.getFilterClearIconElement = function () {
            return this.selector('.e-popup .e-filter-parent .e-input-group .e-clear-icon');
        };
        MultiSelectHelper.prototype.getSelectAllElement = function () {
            return this.selector('.e-popup .e-selectall-parent');
        };
        MultiSelectHelper.prototype.getSelectionReorderElement = function () {
            return this.selector('.e-popup .e-content .e-list-parent.e-ul.e-reorder');
        };
        MultiSelectHelper.prototype.getSelectionDisabledElement = function () {
            return this.selector('.e-popup .e-content .e-list-parent .e-list-item.e-disable');
        };
        MultiSelectHelper.prototype.getSelectAllCheckboxElement = function () {
            return this.selector('.e-popup .e-selectall-parent .e-checkbox-wrapper');
        };
        MultiSelectHelper.prototype.getListItemCheckBoxElement = function () {
            return this.selector('.e-popup .e-content .e-list-parent .e-list-item .e-checkbox-wrapper');
        };
        return MultiSelectHelper;
    }(e2e_1.TestHelper));
    exports.MultiSelectHelper = MultiSelectHelper;
});
