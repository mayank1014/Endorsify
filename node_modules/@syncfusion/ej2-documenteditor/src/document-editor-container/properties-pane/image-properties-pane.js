import { createElement, L10n, classList } from '@syncfusion/ej2-base';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { TextBox } from '@syncfusion/ej2-inputs';
import { SanitizeHtmlHelper } from '@syncfusion/ej2-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * Image Property pane
 *
 * @private
 */
var ImageProperties = /** @class */ (function () {
    function ImageProperties(container, isRtl) {
        this.isWidthApply = false;
        this.isHeightApply = false;
        this.container = container;
        this.elementId = this.documentEditor.element.id;
        this.isMaintainAspectRatio = false;
        this.isRtl = isRtl;
        this.initializeImageProperties();
    }
    Object.defineProperty(ImageProperties.prototype, "documentEditor", {
        get: function () {
            return this.container.documentEditor;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @param {boolean} enable - enable/disable image properties pane.
     * @returns {void}
     */
    ImageProperties.prototype.enableDisableElements = function (enable) {
        if (enable) {
            classList(this.element, [], ['e-de-overlay']);
        }
        else {
            classList(this.element, ['e-de-overlay'], []);
        }
    };
    ImageProperties.prototype.initializeImageProperties = function () {
        this.element = createElement('div', { id: this.elementId + '_imageProperties', className: 'e-de-prop-pane' });
        this.element.style.display = 'none';
        this.container.propertiesPaneContainer.appendChild(this.element);
        this.initImageProp();
        this.initImageAltProp();
        this.wireEvents();
    };
    ImageProperties.prototype.initImageProp = function () {
        var localObj = new L10n('documenteditorcontainer', this.container.defaultLocale, this.container.locale);
        var imageDiv = createElement('div', { id: this.elementId + '_imageDiv', className: 'e-de-cntr-pane-padding e-de-prop-separator-line' });
        this.element.appendChild(imageDiv);
        var label = createElement('label', { className: 'e-de-ctnr-prop-label' });
        label.textContent = localObj.getConstant('Image');
        imageDiv.appendChild(label);
        var outerDiv = createElement('div');
        imageDiv.appendChild(outerDiv);
        this.widthElement = this.createImagePropertiesDiv('_widthDiv', outerDiv, '_widthInput', localObj.getConstant('W'), localObj.getConstant('Width'));
        this.widthNumericBox = new NumericTextBox({ min: 0, max: 23500, cssClass: 'e-de-image-property', showSpinButton: false, format: 'n0', decimals: 2 });
        this.widthNumericBox.appendTo(this.widthElement);
        this.heightElement = this.createImagePropertiesDiv('_heightDiv', outerDiv, '_heightInput', localObj.getConstant('H'), localObj.getConstant('Height'));
        this.heightNumericBox = new NumericTextBox({ min: 0, max: 23500, cssClass: 'e-de-image-property', showSpinButton: false, format: 'n0', decimals: 2 });
        this.heightNumericBox.appendTo(this.heightElement);
        var aspectRatioDiv = createElement('div', { id: this.elementId + '_aspectRatioDiv' });
        aspectRatioDiv.setAttribute('title', localObj.getConstant('Aspect ratio'));
        outerDiv.appendChild(aspectRatioDiv);
        var aspectRatio = createElement('input', { id: this.elementId + '_aspectRatio', className: 'e-de-ctnr-prop-label' });
        aspectRatioDiv.appendChild(aspectRatio);
        this.aspectRatioBtn = new CheckBox({ label: localObj.getConstant('Aspect ratio'), enableRtl: this.isRtl }, aspectRatio);
    };
    ImageProperties.prototype.initImageAltProp = function () {
        var localObj = new L10n('documenteditorcontainer', this.container.defaultLocale, this.container.locale);
        var AltDiv = createElement('div', { id: this.elementId + '_altDiv', className: 'e-de-cntr-pane-padding e-de-prop-separator-line' });
        this.element.appendChild(AltDiv);
        var label = createElement('label', { className: 'e-de-ctnr-prop-label' });
        label.textContent = localObj.getConstant('Alternate Text');
        AltDiv.appendChild(label);
        this.textArea = createElement('textarea', { id: this.elementId + '_textarea', className: 'e-de-ctnr-prop-label ' });
        AltDiv.appendChild(this.textArea);
        var textareaObj = new TextBox({
            floatLabelType: 'Never'
        });
        textareaObj.appendTo(this.textArea);
    };
    ;
    /* eslint-disable-next-line max-len */
    ImageProperties.prototype.createImagePropertiesDiv = function (id, outerDiv, inputId, spanContent, tooltip) {
        var divElement = createElement('div', { id: this.elementId + id, styles: 'position: relative;width: 100%;', className: 'e-de-ctnr-segment' });
        divElement.setAttribute('title', tooltip);
        outerDiv.appendChild(divElement);
        var inputElement = createElement('input', { id: this.elementId + inputId, className: 'e-textbox', styles: 'width:100%;' });
        divElement.appendChild(inputElement);
        var spanElement = createElement('span', { className: 'e-de-img-prty-span' });
        spanElement.textContent = spanContent;
        divElement.appendChild(spanElement);
        return inputElement;
    };
    ImageProperties.prototype.wireEvents = function () {
        var _this = this;
        this.aspectRatioBtn.element.addEventListener('change', this.onAspectRatioBtnClick.bind(this));
        this.widthNumericBox.element.addEventListener('click', function () {
            _this.isWidthApply = true;
        });
        this.heightNumericBox.element.addEventListener('click', function () {
            _this.isHeightApply = true;
        });
        this.widthNumericBox.element.addEventListener('keydown', this.onImageWidth.bind(this));
        this.heightNumericBox.element.addEventListener('keydown', this.onImageHeight.bind(this));
        this.widthNumericBox.element.addEventListener('blur', function () {
            _this.applyImageWidth();
            _this.isWidthApply = false;
        });
        this.heightNumericBox.element.addEventListener('blur', function () {
            _this.applyImageHeight();
            _this.isHeightApply = false;
        });
        this.textArea.addEventListener('blur', function () {
            if (_this.documentEditor.selection.imageFormat.alternateText != _this.textArea.value) {
                _this.applyImageAlternativeText();
            }
        });
    };
    ImageProperties.prototype.applyImageAlternativeText = function () {
        var altText = SanitizeHtmlHelper.sanitize(this.textArea.value);
        if (!isNullOrUndefined(altText)) {
            this.documentEditor.selection.imageFormat.applyImageAlternativeText(altText);
        }
    };
    ImageProperties.prototype.onImageWidth = function (e) {
        var _this = this;
        if (e.keyCode === 13) {
            setTimeout(function () {
                _this.applyImageWidth();
                _this.isWidthApply = false;
            }, 30);
        }
    };
    ImageProperties.prototype.onImageHeight = function (e) {
        var _this = this;
        if (e.keyCode === 13) {
            setTimeout(function () {
                _this.applyImageHeight();
                _this.isHeightApply = false;
            }, 30);
        }
    };
    ImageProperties.prototype.applyImageWidth = function () {
        if (!this.isMaintainAspectRatio) {
            var width = this.widthNumericBox.value;
            var height = this.heightNumericBox.value;
            if (width > this.widthNumericBox.max) {
                width = this.widthNumericBox.max;
            }
            if (height > this.heightNumericBox.max) {
                height = this.heightNumericBox.max;
            }
            if (!(width === null || height === null)) {
                this.documentEditor.selection.imageFormat.resize(width, height);
            }
        }
        else if (this.isMaintainAspectRatio) {
            var width = this.widthNumericBox.value;
            if (width > this.widthNumericBox.max) {
                width = this.widthNumericBox.max;
            }
            var ratio = width / this.documentEditor.selection.imageFormat.width;
            var height = this.heightNumericBox.value * ratio;
            this.heightNumericBox.value = height;
            if (!(width === null || height === null)) {
                this.documentEditor.selection.imageFormat.resize(width, height);
            }
        }
    };
    ImageProperties.prototype.applyImageHeight = function () {
        if (!this.isMaintainAspectRatio) {
            var width = this.widthNumericBox.value;
            var height = this.heightNumericBox.value;
            if (!(width === null || height === null)) {
                this.documentEditor.selection.imageFormat.resize(width, height);
            }
        }
        else if (this.isMaintainAspectRatio) {
            var height = this.heightNumericBox.value;
            var ratio = height / this.documentEditor.selection.imageFormat.height;
            var width = this.widthNumericBox.value * ratio;
            this.widthNumericBox.value = width;
            if (!(width === null || height === null)) {
                this.documentEditor.selection.imageFormat.resize(width, height);
            }
        }
    };
    ImageProperties.prototype.onAspectRatioBtnClick = function () {
        if (this.isMaintainAspectRatio) {
            this.isMaintainAspectRatio = false;
        }
        else {
            this.isMaintainAspectRatio = true;
        }
    };
    ImageProperties.prototype.showImageProperties = function (isShow) {
        if (this.element.style.display === 'block') {
            this.updateImageProperties();
        }
        if (!isShow && this.element.style.display === 'none' || (isShow && this.element.style.display === 'block')) {
            return;
        }
        this.element.style.display = isShow ? 'block' : 'none';
        this.documentEditor.resize();
    };
    ImageProperties.prototype.updateImageProperties = function () {
        this.widthNumericBox.value = this.documentEditor.selection.imageFormat.width;
        this.heightNumericBox.value = this.documentEditor.selection.imageFormat.height;
        if (isNullOrUndefined(this.documentEditor.selection.imageFormat.alternateText)) {
            this.textArea.value = "";
        }
        else {
            this.textArea.value = this.documentEditor.selection.imageFormat.alternateText;
        }
    };
    ImageProperties.prototype.destroy = function () {
        this.container = undefined;
        if (this.widthNumericBox) {
            this.widthNumericBox.destroy();
        }
        this.widthNumericBox = undefined;
        if (this.heightNumericBox) {
            this.heightNumericBox.destroy();
        }
        this.heightNumericBox = undefined;
        if (this.aspectRatioBtn) {
            this.aspectRatioBtn.destroy();
        }
        this.aspectRatioBtn = undefined;
    };
    return ImageProperties;
}());
export { ImageProperties };
