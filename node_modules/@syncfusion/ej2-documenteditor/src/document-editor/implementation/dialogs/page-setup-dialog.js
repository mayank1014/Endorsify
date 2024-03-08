import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { createElement, L10n } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { CheckBox, RadioButton } from '@syncfusion/ej2-buttons';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { WColumnFormat, WSectionFormat } from './../../implementation/format/index';
import { Tab } from '@syncfusion/ej2-navigations';
import { HelperMethods } from '../editor/editor-helper';
import { DialogUtility } from '@syncfusion/ej2-popups';
/**
 * The Page setup dialog is used to modify formatting of selected sections.
 */
var PageSetupDialog = /** @class */ (function () {
    /**
     * @param {DocumentHelper} documentHelper - Specifies the document helper.
     * @private
     */
    function PageSetupDialog(documentHelper) {
        var _this = this;
        this.isPortrait = true;
        /**
         * @private
         * @returns {void}
         */
        this.loadPageSetupDialog = function () {
            _this.documentHelper.updateFocus();
            var sectionFormat = _this.documentHelper.selection.sectionFormat;
            _this.topMarginBox.value = sectionFormat.topMargin;
            _this.leftMarginBox.value = sectionFormat.leftMargin;
            _this.bottomMarginBox.value = sectionFormat.bottomMargin;
            _this.rightMarginBox.value = sectionFormat.rightMargin;
            _this.widthBox.value = sectionFormat.pageWidth;
            _this.heightBox.value = sectionFormat.pageHeight;
            _this.checkBox1.checked = sectionFormat.differentOddAndEvenPages;
            _this.checkBox2.checked = sectionFormat.differentFirstPage;
            _this.headerBox.value = sectionFormat.headerDistance;
            _this.footerBox.value = sectionFormat.footerDistance;
            if (_this.widthBox.value > _this.heightBox.value) {
                _this.landscape.checked = true;
            }
            else {
                _this.portrait.checked = true;
            }
            /* eslint-disable-next-line max-len */
            _this.setPageSize(_this.portrait.checked, parseFloat(sectionFormat.pageWidth.toFixed(1)), parseFloat(sectionFormat.pageHeight.toFixed(1)));
        };
        /**
         * @private
         * @returns {void}
         */
        this.closePageSetupDialog = function () {
            _this.unWireEventsAndBindings();
            _this.documentHelper.updateFocus();
        };
        /**
         * @private
         * @returns {void}
         */
        this.onCancelButtonClick = function () {
            _this.documentHelper.dialog.hide();
            _this.unWireEventsAndBindings();
            _this.documentHelper.updateFocus();
        };
        /**
         * @private
         * @param {KeyboardEvent} event - Specifies the event args.
         * @returns {void}
         */
        this.keyUpInsertPageSettings = function (event) {
            if (event.keyCode === 13) {
                _this.applyPageSetupProperties();
            }
        };
        /**
         * @private
         * @returns {void}
         */
        this.applyPageSetupProperties = function () {
            var sectionFormat = new WSectionFormat();
            var localValue = new L10n('documenteditor', _this.documentHelper.owner.defaultLocale);
            localValue.setLocale(_this.documentHelper.owner.locale);
            var currentSectionFormat = _this.documentHelper.selection.sectionFormat;
            sectionFormat.bottomMargin = _this.bottomMarginBox.value;
            sectionFormat.topMargin = _this.topMarginBox.value;
            sectionFormat.leftMargin = _this.leftMarginBox.value;
            sectionFormat.rightMargin = _this.rightMarginBox.value;
            sectionFormat.pageWidth = _this.widthBox.value;
            sectionFormat.pageHeight = _this.heightBox.value;
            sectionFormat.differentOddAndEvenPages = _this.checkBox1.checked;
            sectionFormat.differentFirstPage = _this.checkBox2.checked;
            sectionFormat.headerDistance = _this.headerBox.value;
            sectionFormat.footerDistance = _this.footerBox.value;
            if (_this.widthBox.value < (_this.leftMarginBox.value + _this.rightMarginBox.value)) {
                DialogUtility.alert(localValue.getConstant('Left and right margins.'));
                return;
            }
            if (_this.widthBox.value < (_this.leftMarginBox.value + _this.rightMarginBox.value + 36)) {
                DialogUtility.alert(localValue.getConstant('Column width cannot be less than 36 pt.'));
                return;
            }
            if (Math.abs((_this.topMarginBox.value + _this.bottomMarginBox.value)) > _this.heightBox.value) {
                DialogUtility.alert(localValue.getConstant('The top/bottom margins are too large for the page height in some sections.'));
                return;
            }
            sectionFormat.numberOfColumns = currentSectionFormat.numberOfColumns;
            sectionFormat.equalWidth = currentSectionFormat.equalWidth;
            sectionFormat.lineBetweenColumns = currentSectionFormat.lineBetweenColumns;
            var cols = [];
            var pageWidth = HelperMethods.convertPointToPixel(sectionFormat.pageWidth - sectionFormat.leftMargin - sectionFormat.rightMargin);
            for (var i = 0; i < currentSectionFormat.columns.length; i++) {
                var colFormat = new WColumnFormat();
                var width = HelperMethods.convertPointToPixel(currentSectionFormat.columns[parseInt(i.toString(), 10)].width);
                var space = HelperMethods.convertPointToPixel(currentSectionFormat.columns[parseInt(i.toString(), 10)].space);
                var totalSpace = (currentSectionFormat.numberOfColumns - 1) * space;
                if ((currentSectionFormat.equalWidth || width === 0) && !isNullOrUndefined(pageWidth)) {
                    width = (pageWidth - totalSpace) / currentSectionFormat.numberOfColumns;
                }
                colFormat.width = width;
                colFormat.space = space;
                colFormat.index = i;
                cols.push(colFormat);
            }
            sectionFormat.columns = cols;
            if (currentSectionFormat.pageHeight === sectionFormat.pageHeight && currentSectionFormat.pageWidth === sectionFormat.pageWidth) {
                sectionFormat.breakCode = currentSectionFormat.breakCode;
            }
            _this.documentHelper.owner.editorModule.onApplySectionFormat(undefined, sectionFormat);
            _this.documentHelper.hideDialog();
        };
        /**
         * @private
         * @param {ChangeEventArgs} event - Specifies the event args.
         * @returns {void}
         */
        this.changeByPaperSize = function (event) {
            var value = event.value;
            // const sectionFormat: SelectionSectionFormat = this.documentHelper.selection.sectionFormat;
            // const width: number = sectionFormat.pageWidth;
            // const height: number = sectionFormat.pageHeight;
            /* eslint-disable-next-line max-len */
            if (_this.documentHelper.selection.sectionFormat.pageWidth > _this.documentHelper.selection.sectionFormat.pageHeight || _this.landscape.checked) {
                _this.isPortrait = false;
                _this.portrait.checked = false;
            }
            else {
                _this.isPortrait = true;
            }
            if (value === 'letter') {
                if (_this.isPortrait) {
                    _this.widthBox.value = 612;
                    _this.heightBox.value = 792;
                }
                else {
                    _this.widthBox.value = 792;
                    _this.heightBox.value = 612;
                }
            }
            else if (value === 'tabloid') {
                if (_this.isPortrait) {
                    _this.widthBox.value = 792;
                    _this.heightBox.value = 1224;
                }
                else {
                    _this.widthBox.value = 1224;
                    _this.heightBox.value = 792;
                }
            }
            else if (value === 'legal') {
                if (_this.isPortrait) {
                    _this.widthBox.value = 612;
                    _this.heightBox.value = 1008;
                }
                else {
                    _this.widthBox.value = 1008;
                    _this.heightBox.value = 612;
                }
            }
            else if (value === 'statement') {
                if (_this.isPortrait) {
                    _this.widthBox.value = 392;
                    _this.heightBox.value = 612;
                }
                else {
                    _this.widthBox.value = 612;
                    _this.heightBox.value = 392;
                }
            }
            else if (value === 'executive') {
                if (_this.isPortrait) {
                    _this.widthBox.value = 522;
                    _this.heightBox.value = 756;
                }
                else {
                    _this.widthBox.value = 756;
                    _this.heightBox.value = 522;
                }
            }
            else if (value === 'a3') {
                if (_this.isPortrait) {
                    _this.widthBox.value = 841.9;
                    _this.heightBox.value = 1190.55;
                }
                else {
                    _this.widthBox.value = 1190.55;
                    _this.heightBox.value = 841.9;
                }
            }
            else if (value === 'a4') {
                if (_this.isPortrait) {
                    _this.widthBox.value = 595.3;
                    _this.heightBox.value = 841.9;
                }
                else {
                    _this.widthBox.value = 841.9;
                    _this.heightBox.value = 595.3;
                }
            }
            else if (value === 'a5') {
                if (_this.isPortrait) {
                    _this.widthBox.value = 419.55;
                    _this.heightBox.value = 595.3;
                }
                else {
                    _this.widthBox.value = 595.3;
                    _this.heightBox.value = 419.55;
                }
            }
            else if (value === 'b4') {
                if (_this.isPortrait) {
                    _this.widthBox.value = 728.5;
                    _this.heightBox.value = 1031.8;
                }
                else {
                    _this.widthBox.value = 1031.8;
                    _this.heightBox.value = 728.5;
                }
            }
            else if (value === 'b5') {
                if (_this.isPortrait) {
                    _this.widthBox.value = 515.9;
                    _this.heightBox.value = 728.5;
                }
                else {
                    _this.widthBox.value = 728.5;
                    _this.heightBox.value = 515.9;
                }
            }
            else if (value === 'customsize') {
                if (_this.isPortrait) {
                    _this.widthBox.value = _this.documentHelper.selection.sectionFormat.pageWidth;
                    _this.heightBox.value = _this.documentHelper.selection.sectionFormat.pageHeight;
                }
                else {
                    _this.widthBox.value = _this.documentHelper.selection.sectionFormat.pageWidth;
                    _this.heightBox.value = _this.documentHelper.selection.sectionFormat.pageHeight;
                }
            }
        };
        /**
         * @private
         * @returns {void}
         */
        this.onPortrait = function () {
            _this.landscape.checked = false;
            var width = _this.widthBox.value;
            var height = _this.heightBox.value;
            if (width > height) {
                _this.widthBox.value = height;
                _this.heightBox.value = width;
            }
        };
        /**
         * @private
         * @returns {void}
         */
        this.onLandscape = function () {
            _this.portrait.checked = false;
            var width = _this.widthBox.value;
            var height = _this.heightBox.value;
            if (width < height) {
                _this.widthBox.value = height;
                _this.heightBox.value = width;
            }
        };
        /**
         * @private
         * @returns {void}
         */
        this.unWireEventsAndBindings = function () {
            _this.paperSize.value = undefined;
            _this.topMarginBox.value = undefined;
            _this.bottomMarginBox.value = undefined;
            _this.leftMarginBox.value = undefined;
            _this.rightMarginBox.value = undefined;
            _this.headerBox.value = undefined;
            _this.footerBox.value = undefined;
            _this.widthBox.value = undefined;
            _this.heightBox.value = undefined;
            _this.checkBox1.checked = false;
            _this.checkBox2.checked = false;
            _this.portrait.checked = false;
            _this.landscape.checked = false;
        };
        this.documentHelper = documentHelper;
    }
    PageSetupDialog.prototype.getModuleName = function () {
        return 'PageSetupDialog';
    };
    /**
     * @private
     * @param {L10n} locale - Specifies the locale value
     * @param {boolean} isRtl - Specifies the is rtl
     * @returns {void}
     */
    PageSetupDialog.prototype.initPageSetupDialog = function (locale, isRtl) {
        this.target = createElement('div');
        var ejtabContainer = createElement('div');
        this.target.appendChild(ejtabContainer);
        this.marginTab = createElement('div', {
            styles: 'position: relative;', className: 'e-de-dlg-tab-first-child'
        });
        this.paperTab = createElement('div', {
            styles: 'position: relative;', className: 'e-de-dlg-tab-first-child'
        });
        this.layoutTab = createElement('div', {
            styles: 'position: relative;', className: 'e-de-dlg-tab-first-child'
        });
        var ejtab = createElement('div', { className: 'e-de-page-setup-ppty-tab' });
        var headerContainer = createElement('div', { className: 'e-tab-header' });
        var marginHeader = createElement('div', {
            innerHTML: locale.getConstant('Margin')
        });
        var paperHeader = createElement('div', {
            innerHTML: locale.getConstant('Paper')
        });
        var layoutHeader = createElement('div', {
            innerHTML: locale.getConstant('Layout')
        });
        headerContainer.appendChild(marginHeader);
        headerContainer.appendChild(paperHeader);
        headerContainer.appendChild(layoutHeader);
        var marginContent = createElement('div');
        var paperContent = createElement('div');
        var layoutContent = createElement('div');
        marginContent.appendChild(this.marginTab);
        paperContent.appendChild(this.paperTab);
        layoutContent.appendChild(this.layoutTab);
        ejtabContainer.appendChild(ejtab);
        this.initMarginProperties(this.marginTab, locale, isRtl);
        this.initPaperSizeProperties(this.paperTab, locale, isRtl);
        this.initLayoutProperties(this.layoutTab, locale, isRtl);
        var items = [
            { header: { text: marginHeader }, content: marginContent },
            { header: { text: paperHeader }, content: paperContent },
            { header: { text: layoutHeader }, content: layoutContent }
        ];
        var tabObj = new Tab({ items: items, enableRtl: isRtl }, ejtab);
        tabObj.isStringTemplate = true;
        this.target.addEventListener('keyup', this.keyUpInsertPageSettings);
    };
    /**
     * @private
     * @param {HTMLDivElement} element - Specifies the div element
     * @param {L10n} locale - Specifies the locale value
     * @param {boolean} isRtl - Specifies the is rtl
     * @returns {void}
     */
    PageSetupDialog.prototype.initMarginProperties = function (element, locale, isRtl) {
        var marginDiv = createElement('div');
        var leftMarginDiv = createElement('div', { className: 'e-de-container-row' });
        marginDiv.appendChild(leftMarginDiv);
        var rightMarginDiv = createElement('div', { className: 'e-de-container-row' });
        marginDiv.appendChild(rightMarginDiv);
        if (isRtl) {
            leftMarginDiv.classList.add('e-de-rtl');
            rightMarginDiv.classList.add('e-de-rtl');
        }
        var topTextBox = createElement('input', {
            attrs: { 'type': 'text' }
        });
        var bottomTextBox = createElement('input', {
            attrs: { 'type': 'text' },
        });
        var topContainer = createElement('div', { className: 'e-de-subcontainer-left' });
        topContainer.appendChild(topTextBox);
        leftMarginDiv.appendChild(topContainer);
        var bottomContainer = createElement('div', { className: 'e-de-subcontainer-right' });
        bottomContainer.appendChild(bottomTextBox);
        leftMarginDiv.appendChild(bottomContainer);
        var leftTextBox = createElement('input', {
            attrs: { 'type': 'text' }, id: this.target.id + '_left'
        });
        var rightTextBox = createElement('input', {
            attrs: { 'type': 'text' },
        });
        var leftContainer = createElement('div', { className: 'e-de-subcontainer-left' });
        leftContainer.appendChild(leftTextBox);
        rightMarginDiv.appendChild(leftContainer);
        var rightContainer = createElement('div', { className: 'e-de-subcontainer-right' });
        rightContainer.appendChild(rightTextBox);
        rightMarginDiv.appendChild(rightContainer);
        element.appendChild(marginDiv);
        this.topMarginBox = new NumericTextBox({ value: 71, max: 1584, min: -1584, width: 170, decimals: 2, floatLabelType: 'Always', placeholder: locale.getConstant('Top') });
        this.topMarginBox.appendTo(topTextBox);
        this.leftMarginBox = new NumericTextBox({ value: 73, max: 1584, min: 0, width: 170, decimals: 2, floatLabelType: 'Always', placeholder: locale.getConstant('Left') });
        this.leftMarginBox.appendTo(leftTextBox);
        this.bottomMarginBox = new NumericTextBox({ value: 72, max: 1584, min: -1584, width: 170, decimals: 2, floatLabelType: 'Always', placeholder: locale.getConstant('Bottom') });
        this.bottomMarginBox.appendTo(bottomTextBox);
        this.rightMarginBox = new NumericTextBox({ value: 74, max: 1584, min: 0, width: 170, decimals: 2, floatLabelType: 'Always', placeholder: locale.getConstant('Right') });
        this.rightMarginBox.appendTo(rightTextBox);
        var orientationDiv = createElement('div');
        var orientationLabeldiv = createElement('div', { className: 'e-de-para-dlg-heading', innerHTML: locale.getConstant('Orientation') });
        var orientationPropDiv = createElement('div', { styles: 'display: flex;' });
        topTextBox.setAttribute('aria-labelledby', locale.getConstant('Top'));
        bottomTextBox.setAttribute('aria-labelledby', locale.getConstant('Bottom'));
        leftTextBox.setAttribute('aria-labelledby', locale.getConstant('Left'));
        rightTextBox.setAttribute('aria-labelledby', locale.getConstant('Right'));
        var portraitDivStyles;
        if (isRtl) {
            portraitDivStyles = 'padding-left: 30px;';
        }
        else {
            portraitDivStyles = 'padding-right: 30px;';
        }
        var portraitDiv = createElement('div', { id: '_portraitDiv', styles: portraitDivStyles });
        var portrait = createElement('input', {
            attrs: { 'type': 'radiobutton' }
        });
        var landscapeDiv = createElement('div', { id: '_landscapeDiv' });
        var landscape = createElement('input', {
            attrs: { 'type': 'radiobutton' }
        });
        portraitDiv.appendChild(portrait);
        landscapeDiv.appendChild(landscape);
        orientationPropDiv.appendChild(portraitDiv);
        orientationPropDiv.appendChild(landscapeDiv);
        orientationDiv.appendChild(orientationLabeldiv);
        orientationDiv.appendChild(orientationPropDiv);
        this.portrait = new RadioButton({ label: locale.getConstant('Portrait'), checked: true, enableRtl: isRtl, change: this.onPortrait });
        this.landscape = new RadioButton({ label: locale.getConstant('Landscape'), enableRtl: isRtl, change: this.onLandscape });
        this.portrait.appendTo(portrait);
        this.landscape.appendTo(landscape);
        element.appendChild(orientationDiv);
        portrait.setAttribute('aria-label', locale.getConstant('Portrait'));
        landscape.setAttribute('aria-label', locale.getConstant('Landscape'));
    };
    /**
     * @private
     * @param {HTMLDivElement} element - Specifies the div element
     * @param {L10n} locale - Specifies the locale value
     * @param {boolean} isRtl - Specifies the is rtl
     * @returns {void}
     */
    PageSetupDialog.prototype.initPaperSizeProperties = function (element, locale, isRtl) {
        var sizeDiv = createElement('div', {
            className: 'e-de-container-row'
        });
        var leftSizeDiv = createElement('div', { className: 'e-de-subcontainer-left' });
        sizeDiv.appendChild(leftSizeDiv);
        var rightSizeDiv = createElement('div', { className: 'e-de-subcontainer-right' });
        sizeDiv.appendChild(rightSizeDiv);
        if (isRtl) {
            leftSizeDiv.classList.add('e-de-rtl');
            rightSizeDiv.classList.add('e-de-rtl');
        }
        // const widthLabel: HTMLLabelElement = createElement('label', {
        //     innerHTML: locale.getConstant('Width'), className: 'e-de-page-setup-dlg-sub-header',
        //     id: this.target.id + '_widthLabel', styles: 'padding-top:0px;'
        // }) as HTMLLabelElement;
        var widthTextBox = createElement('input', {
            attrs: { 'type': 'text' }
        });
        //leftSizeDiv.appendChild(widthLabel);
        leftSizeDiv.appendChild(widthTextBox);
        // const heightLabel: HTMLLabelElement = <HTMLLabelElement>createElement('label', {
        //     innerHTML: locale.getConstant('Height'), className: 'e-de-page-setup-dlg-sub-header', styles: 'padding-top:0px;',
        //     id: this.target.id + '_heightLabel'
        // });
        var heightTextBox = createElement('input', {
            attrs: { 'type': 'text' }
        });
        //rightSizeDiv.appendChild(heightLabel);
        rightSizeDiv.appendChild(heightTextBox);
        element.appendChild(sizeDiv);
        this.widthBox = new NumericTextBox({ value: 612, width: 170, decimals: 2, floatLabelType: 'Always', placeholder: locale.getConstant('Width') });
        this.widthBox.appendTo(widthTextBox);
        this.heightBox = new NumericTextBox({ value: 792, width: 170, decimals: 2, floatLabelType: 'Always', placeholder: locale.getConstant('Height') });
        this.heightBox.appendTo(heightTextBox);
        widthTextBox.setAttribute('arial-label', locale.getConstant('Width'));
        heightTextBox.setAttribute('arial-label', locale.getConstant('Height'));
        var paperSizeDiv = createElement('div');
        var paperSize = createElement('select', {
            styles: 'width:170px;padding-bottom: 20px;',
            innerHTML: '<option value="letter">' + locale.getConstant('Letter') +
                '</option><option value="tabloid">' + locale.getConstant('Tabloid') +
                '</option><option value="legal">' + locale.getConstant('Legal') +
                '</option><option value="statement">' + locale.getConstant('Statement') +
                '</option><option value="executive">' + locale.getConstant('Executive') +
                '</option><option value="a3">' + locale.getConstant('A3') +
                '</option><option value="a4">' + locale.getConstant('A4') +
                '</option><option value="a5">' + locale.getConstant('A5') +
                '</option><option value="b4">' + locale.getConstant('B4') +
                '</option><option value="b5">' + locale.getConstant('B5') +
                '</option><option value="customsize">' + locale.getConstant('Custom Size') + '</option>'
        });
        paperSizeDiv.appendChild(paperSize);
        this.paperSize = new DropDownList({ change: this.changeByPaperSize, width: '170px', enableRtl: isRtl });
        this.paperSize.appendTo(paperSize);
        this.paperSize.htmlAttributes = { 'aria-labelledby': 'PaperSize', 'aria-describedby': 'PaperSize' };
        element.appendChild(paperSizeDiv);
    };
    /**
     * @private
     * @param {HTMLDivElement} element - Specifies the div element
     * @param {L10n} locale - Specifies the locale value
     * @param {boolean} isRtl - Specifies the is rtl
     * @returns {void}
     */
    PageSetupDialog.prototype.initLayoutProperties = function (element, locale, isRtl) {
        var layoutDiv = createElement('div', { className: 'e-de-dlg-container' });
        var firstPageDiv = createElement('div', { styles: 'height: 27px;' });
        var checkBox1 = createElement('input', {
            attrs: { 'type': 'checkbox' }
        });
        firstPageDiv.appendChild(checkBox1);
        var oddOrEvenDiv = createElement('div', { styles: 'height: 27px;' });
        var checkBox2 = createElement('input', {
            attrs: { 'type': 'checkbox' }
        });
        firstPageDiv.setAttribute('aria-label', locale.getConstant('Different first page'));
        oddOrEvenDiv.setAttribute('aria-label', locale.getConstant('Different odd and even'));
        oddOrEvenDiv.appendChild(checkBox2);
        layoutDiv.appendChild(firstPageDiv);
        layoutDiv.appendChild(oddOrEvenDiv);
        this.checkBox1 = new CheckBox({ label: locale.getConstant('Different odd and even'), enableRtl: isRtl });
        this.checkBox2 = new CheckBox({ label: locale.getConstant('Different first page'), enableRtl: isRtl });
        this.checkBox1.appendTo(checkBox1);
        this.checkBox2.appendTo(checkBox2);
        element.appendChild(layoutDiv);
        var textLabelDiv = createElement('div');
        var textLabel = createElement('label', { className: 'e-de-para-dlg-heading', innerHTML: locale.getConstant('From edge')
        });
        textLabelDiv.appendChild(textLabel);
        element.appendChild(textLabelDiv);
        var propertyDiv = createElement('div', { className: 'e-de-dlg-row' });
        var leftLayoutDiv = createElement('div', { className: 'e-de-subcontainer-left' });
        propertyDiv.appendChild(leftLayoutDiv);
        var rightLayoutDiv = createElement('div', { className: 'e-de-subcontainer-right' });
        propertyDiv.appendChild(rightLayoutDiv);
        if (isRtl) {
            rightLayoutDiv.classList.add('e-de-rtl');
            leftLayoutDiv.classList.add('e-de-rtl');
        }
        var headerBox = createElement('input', {
            attrs: { 'type': 'text' }
        });
        leftLayoutDiv.appendChild(headerBox);
        var footerBox = createElement('input', {
            attrs: { 'type': 'text' }
        });
        rightLayoutDiv.appendChild(footerBox);
        element.appendChild(propertyDiv);
        this.headerBox = new NumericTextBox({ value: 612, width: 170, decimals: 2, floatLabelType: 'Always', placeholder: locale.getConstant('Header') });
        this.headerBox.appendTo(headerBox);
        this.footerBox = new NumericTextBox({ value: 792, width: 170, decimals: 2, floatLabelType: 'Always', placeholder: locale.getConstant('Footer') });
        this.footerBox.appendTo(footerBox);
        headerBox.setAttribute('aria-labelledby', locale.getConstant('Header'));
        footerBox.setAttribute('aria-labelledby', locale.getConstant('Footer'));
    };
    /**
     * @private
     * @returns {void}
     */
    PageSetupDialog.prototype.show = function () {
        var localValue = new L10n('documenteditor', this.documentHelper.owner.defaultLocale);
        localValue.setLocale(this.documentHelper.owner.locale);
        if (!this.target) {
            this.initPageSetupDialog(localValue, this.documentHelper.owner.enableRtl);
        }
        this.documentHelper.dialog.header = localValue.getConstant('Page Setup');
        this.documentHelper.dialog.width = 'auto';
        this.documentHelper.dialog.height = 'auto';
        this.documentHelper.dialog.content = this.target;
        this.documentHelper.dialog.beforeOpen = this.loadPageSetupDialog;
        this.documentHelper.dialog.close = this.closePageSetupDialog;
        this.documentHelper.dialog.buttons = [{
                click: this.applyPageSetupProperties,
                buttonModel: { content: localValue.getConstant('Ok'), cssClass: 'e-flat e-layout-ppty-okay', isPrimary: true }
            },
            {
                click: this.onCancelButtonClick,
                buttonModel: { content: localValue.getConstant('Cancel'), cssClass: 'e-flat e-layout-ppty-cancel' }
            }];
        this.documentHelper.dialog.dataBind();
        this.documentHelper.dialog.show();
        var dialogElement = this.documentHelper.dialog.element;
        if (dialogElement) {
            this.documentHelper.updateDialogTabHeight(dialogElement, this.target);
        }
    };
    PageSetupDialog.prototype.setPageSize = function (isPortrait, width, height) {
        if ((isPortrait && width === 612 && height === 792)
            || (!isPortrait && width === 792 && height === 612)) {
            this.paperSize.value = 'letter';
        }
        else if ((isPortrait && width === 792 && height === 1224)
            || (!isPortrait && width === 1224 && height === 792)) {
            this.paperSize.value = 'tabloid';
        }
        else if ((isPortrait && width === 612 && height === 1008)
            || (!isPortrait && width === 1008 && height === 612)) {
            this.paperSize.value = 'legal';
        }
        else if ((isPortrait && width === 392 && height === 612)
            || (!isPortrait && width === 392 && height === 612)) {
            this.paperSize.value = 'statement';
        }
        else if ((isPortrait && width === 522 && height === 756)
            || (!isPortrait && width === 756 && height === 522)) {
            this.paperSize.value = 'executive';
        }
        else if ((isPortrait && width === 841.9 && height === 1190.5)
            || (!isPortrait && width === 1190.5 && height === 841.9)) {
            this.paperSize.value = 'a3';
        }
        else if ((isPortrait && width === 595.3 && height === 841.9)
            || (!isPortrait && width === 841.9 && height === 595.3)) {
            this.paperSize.value = 'a4';
        }
        else if ((isPortrait && width === 419.6 && height === 595.3)
            || (!isPortrait && width === 595.3 && height === 419.6)) {
            this.paperSize.value = 'a5';
        }
        else if ((isPortrait && width === 728.5 && height === 1031.8)
            || (!isPortrait && width === 1031.8 && height === 728.5)) {
            this.paperSize.value = 'b4';
        }
        else if ((isPortrait && width === 515.9 && height === 728.5)
            || (!isPortrait && width === 728.5 && height === 515.9)) {
            this.paperSize.value = 'b5';
        }
        else {
            this.paperSize.value = 'customsize';
        }
    };
    /**
     * @private
     * @returns {void}
     */
    PageSetupDialog.prototype.destroy = function () {
        if (this.topMarginBox) {
            this.topMarginBox.destroy();
            this.topMarginBox = undefined;
        }
        if (this.leftMarginBox) {
            this.leftMarginBox.destroy();
            this.leftMarginBox = undefined;
        }
        if (this.bottomMarginBox) {
            this.bottomMarginBox.destroy();
            this.bottomMarginBox = undefined;
        }
        if (this.rightMarginBox) {
            this.rightMarginBox.destroy();
            this.rightMarginBox = undefined;
        }
        if (this.headerBox) {
            this.headerBox.destroy();
            this.headerBox = undefined;
        }
        if (this.footerBox) {
            this.footerBox.destroy();
            this.footerBox = undefined;
        }
        if (this.widthBox) {
            this.widthBox.destroy();
            this.widthBox = undefined;
        }
        if (this.heightBox) {
            this.heightBox.destroy();
            this.heightBox = undefined;
        }
        if (this.paperSize) {
            this.paperSize.destroy();
            this.paperSize = undefined;
        }
        if (this.checkBox1) {
            this.checkBox1.destroy();
            this.checkBox1 = undefined;
        }
        if (this.checkBox2) {
            this.checkBox2.destroy();
            this.checkBox2 = undefined;
        }
        if (this.portrait) {
            this.portrait.destroy();
            this.portrait = undefined;
        }
        if (this.landscape) {
            this.landscape.destroy();
            this.landscape = undefined;
        }
        this.documentHelper = undefined;
        if (!isNullOrUndefined(this.target)) {
            if (this.target.parentElement) {
                this.target.parentElement.removeChild(this.target);
            }
            for (var s = 0; s < this.target.childNodes.length; s++) {
                this.target.removeChild(this.target.childNodes[parseInt(s.toString(), 10)]);
                s--;
            }
            this.target = undefined;
        }
    };
    return PageSetupDialog;
}());
export { PageSetupDialog };
