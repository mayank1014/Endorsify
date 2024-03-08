import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { L10n, createElement, isNullOrUndefined } from '@syncfusion/ej2-base';
import { DialogUtility } from '@syncfusion/ej2-popups';
/**
 * The Table dialog is used to insert table at selection.
 */
var TableDialog = /** @class */ (function () {
    /**
     * @param {DocumentHelper} documentHelper - Specifies the document helper
     * @private
     */
    function TableDialog(documentHelper) {
        var _this = this;
        /**
         * @private
         * @returns {void}
         */
        this.onCancelButtonClick = function () {
            _this.documentHelper.dialog.hide();
            _this.documentHelper.updateFocus();
        };
        /**
         * @private
         * @returns {void}
         */
        this.onInsertTableClick = function () {
            if (_this.columnValueTexBox.value < 1 || _this.columnValueTexBox.value > _this.documentHelper.owner.documentEditorSettings.maximumColumns) {
                var columnAlertPopup = _this.localeValue.getConstant('Number of columns must be between') + ' 1 ' + _this.localeValue.getConstant('and') + ' ' + _this.documentHelper.owner.documentEditorSettings.maximumColumns.toString();
                DialogUtility.alert(columnAlertPopup).enableRtl = _this.documentHelper.owner.enableRtl;
                return;
            }
            if (_this.rowValueTextBox.value < 1 || _this.rowValueTextBox.value > _this.documentHelper.owner.documentEditorSettings.maximumRows) {
                var rowAlertPopup = _this.localeValue.getConstant('Number of rows must be between') + ' 1 ' + _this.localeValue.getConstant('and') + ' ' + _this.documentHelper.owner.documentEditorSettings.maximumColumns.toString();
                DialogUtility.alert(rowAlertPopup).enableRtl = _this.documentHelper.owner.enableRtl;
                return;
            }
            if (_this.rowValueTextBox.value <= _this.documentHelper.owner.documentEditorSettings.maximumRows && _this.columnValueTexBox.value <= _this.documentHelper.owner.documentEditorSettings.maximumColumns) {
                var rowCount = _this.rowValueTextBox.value;
                var columnCount = _this.columnValueTexBox.value;
                if (!(isNullOrUndefined(rowCount) && isNullOrUndefined(columnCount))) {
                    _this.documentHelper.owner.editor.insertTable(rowCount, columnCount);
                }
                _this.documentHelper.hideDialog();
            }
        };
        this.documentHelper = documentHelper;
    }
    TableDialog.prototype.getModuleName = function () {
        return 'TableDialog';
    };
    /**
     * @private
     * @param {L10n} localValue - Specified the locale value.
     * @returns {void}
     */
    TableDialog.prototype.initTableDialog = function (localValue) {
        this.target = createElement('div', { className: 'e-de-insert-table' });
        var parentDiv = createElement('div');
        var columnValue = createElement('div', { className: 'e-de-container-row' });
        this.columnsCountBox = createElement('input', {
            attrs: { type: 'text' }
        });
        columnValue.appendChild(this.columnsCountBox);
        this.columnsCountBox.setAttribute('aria-labelledby', localValue.getConstant('Insert Table'));
        var rowValue = createElement('div');
        this.rowsCountBox = createElement('input', {
            attrs: { type: 'text' }
        });
        rowValue.appendChild(this.rowsCountBox);
        parentDiv.appendChild(columnValue);
        parentDiv.appendChild(rowValue);
        this.target.appendChild(parentDiv);
        this.rowValueTextBox = new NumericTextBox({
            format: '#',
            value: 2,
            min: 1,
            strictMode: true,
            enablePersistence: false,
            placeholder: localValue.getConstant('Number of rows'),
            floatLabelType: 'Always'
        });
        this.rowValueTextBox.appendTo(this.rowsCountBox);
        this.rowsCountBox.setAttribute('aria-labelledby', localValue.getConstant('Number of rows'));
        this.columnValueTexBox = new NumericTextBox({
            format: '#',
            value: 2,
            min: 1,
            strictMode: true,
            enablePersistence: false,
            placeholder: localValue.getConstant('Number of columns'),
            floatLabelType: 'Always'
        });
        this.columnsCountBox.setAttribute('aria-labelledby', localValue.getConstant('Number of columns'));
        parentDiv.setAttribute('aria-labelledby', localValue.getConstant('Insert Table'));
        parentDiv.setAttribute('aria-describedby', localValue.getConstant('Insert Table'));
        this.columnValueTexBox.appendTo(this.columnsCountBox);
    };
    /**
     * @private
     * @returns {void}
     */
    TableDialog.prototype.show = function () {
        var localValue = new L10n('documenteditor', this.documentHelper.owner.defaultLocale);
        localValue.setLocale(this.documentHelper.owner.locale);
        this.localeValue = localValue;
        if (!this.target) {
            this.initTableDialog(localValue);
        }
        if (this.documentHelper.selection.caret.style.display !== 'none') {
            this.documentHelper.selection.caret.style.display = 'none';
        }
        this.documentHelper.dialog.header = localValue.getConstant('Insert Table');
        this.documentHelper.dialog.height = 'auto';
        this.documentHelper.dialog.width = 'auto';
        this.documentHelper.dialog.content = this.target;
        this.documentHelper.dialog.beforeOpen = this.documentHelper.updateFocus;
        this.documentHelper.dialog.buttons = [{
                click: this.onInsertTableClick,
                buttonModel: { content: localValue.getConstant('Ok'), cssClass: 'e-flat e-table-ok', isPrimary: true }
            },
            {
                click: this.onCancelButtonClick,
                buttonModel: { content: localValue.getConstant('Cancel'), cssClass: 'e-flat e-table-cancel' }
            }];
        this.rowValueTextBox.value = 2;
        this.columnValueTexBox.value = 2;
        this.documentHelper.dialog.close = this.documentHelper.updateFocus;
        this.documentHelper.dialog.dataBind();
        this.columnValueTexBox.focusIn();
        this.documentHelper.dialog.show();
    };
    /**
     * @private
     * @returns {void}
     */
    TableDialog.prototype.destroy = function () {
        if (this.columnsCountBox) {
            if (this.columnsCountBox.parentElement) {
                this.columnsCountBox.parentElement.removeChild(this.columnsCountBox);
            }
            this.columnsCountBox = undefined;
        }
        if (this.rowsCountBox) {
            if (this.rowsCountBox.parentElement) {
                this.rowsCountBox.parentElement.removeChild(this.rowsCountBox);
            }
            this.rowsCountBox = undefined;
        }
        if (this.columnValueTexBox) {
            this.columnValueTexBox.destroy();
            this.columnValueTexBox = undefined;
        }
        if (this.rowValueTextBox) {
            this.rowValueTextBox.destroy();
            this.rowValueTextBox = undefined;
        }
        this.columnsCountBox = undefined;
        this.rowsCountBox = undefined;
        this.documentHelper = undefined;
        if (!isNullOrUndefined(this.target)) {
            if (this.target.parentElement) {
                this.target.parentElement.removeChild(this.target);
            }
            for (var i = 0; i < this.target.childNodes.length; i++) {
                this.target.removeChild(this.target.childNodes[parseInt(i.toString(), 10)]);
                i--;
            }
            this.target = undefined;
        }
    };
    return TableDialog;
}());
export { TableDialog };
