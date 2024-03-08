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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, NotifyPropertyChanges, addClass, removeClass, L10n } from '@syncfusion/ej2-base';
import { Event, Property, detach, EventHandler, isNullOrUndefined as isNOU, compile, append } from '@syncfusion/ej2-base';
/**
 * Specifies the type of severity to display the message with distinctive icons and colors.
 */
export var Severity;
(function (Severity) {
    /**
     * The message is displayed with icons and colors to denote it as a normal message.
     */
    Severity["Normal"] = "Normal";
    /**
     * The message is displayed with icons and colors to denote it as a success message.
     */
    Severity["Success"] = "Success";
    /**
     * The message is displayed with icons and colors to denote it as information.
     */
    Severity["Info"] = "Info";
    /**
     * The message is displayed with icons and colors to denote it as a warning message.
     */
    Severity["Warning"] = "Warning";
    /**
     * The message is displayed with icons and colors to denote it as an error message.
     */
    Severity["Error"] = "Error";
})(Severity || (Severity = {}));
/**
 * Specifies the predefined appearance variants for the component to display.
 */
export var Variant;
(function (Variant) {
    /**
     * Denotes the severity is differentiated using text color and light background color.
     */
    Variant["Text"] = "Text";
    /**
     * Denotes the severity is differentiated using text color and border without background.
     */
    Variant["Outlined"] = "Outlined";
    /**
     * Denotes the severity is differentiated using text color and dark background color.
     */
    Variant["Filled"] = "Filled";
})(Variant || (Variant = {}));
var MSG_ICON = 'e-msg-icon';
var MSG_CLOSE_ICON = 'e-msg-close-icon';
var MSG_CONTENT = 'e-msg-content';
var MSG_CONTENT_CENTER = 'e-content-center';
var RTL = 'e-rtl';
var SUCCESS = 'e-success';
var WARNING = 'e-warning';
var INFO = 'e-info';
var ERROR = 'e-error';
var OUTLINED = 'e-outlined';
var FILLED = 'e-filled';
var HIDE = 'e-hidden';
/**
 * The Message component displays messages with severity by differentiating icons and colors to denote the importance and context of the message to the end user.
 * ```html
 * <div id="msg"></div>
 * <script>
 *   var msgObj: Message = new Message({
 *      content: 'Editing is restricted',
 *      showCloseIcon: true
 *   })
 *   msgObj.appendTo('#msg');
 * </script>
 * ```
 *
 */
var Message = /** @class */ (function (_super) {
    __extends(Message, _super);
    /**
     * Constructor for creating the Message component widget.
     *
     * @param {MessageModel}options - Specifies the Message component interface.
     * @param {HTMLElement}element - Specifies the target element.
     */
    function Message(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.initialRender = true;
        return _this;
    }
    /**
     * Gets the Message component module name.
     *
     * @returns {string} - Returns the string.
     * @private
     */
    Message.prototype.getModuleName = function () {
        return 'message';
    };
    /**
     * Get the persisted state properties of the Message component.
     *
     * @returns {string} - Returns the string.
     */
    Message.prototype.getPersistData = function () {
        return this.addOnPersist([]);
    };
    /**
     * Method to initialize the variables for the Message component.
     *
     * @returns {void}
     * @private
     */
    Message.prototype.preRender = function () {
        var localeText = { close: 'Close' };
        this.l10n = new L10n('message', localeText, this.locale);
    };
    /**
     * Method to initialize the Message component rendering.
     *
     * @returns {void}
     * @private
     */
    Message.prototype.render = function () {
        this.innerContent = this.element.innerHTML;
        this.element.innerHTML = '';
        this.msgElement = this.createElement('div', { className: 'e-msg-content-wrap' });
        this.initialize();
        this.wireEvents();
        this.renderComplete();
        this.renderReactTemplates();
        this.initialRender = false;
    };
    Message.prototype.initialize = function () {
        this.element.setAttribute('role', 'alert');
        this.setCssClass();
        this.setIcon();
        this.setContent();
        this.setCloseIcon();
        this.setSeverity();
        this.setVariant();
        this.setVisible();
        if (this.enableRtl) {
            this.element.classList.add(RTL);
        }
    };
    Message.prototype.setIcon = function () {
        if (this.showIcon) {
            this.iconElement = this.createElement('span', { className: MSG_ICON });
            if (this.element.classList.contains(MSG_CONTENT_CENTER)) {
                this.msgElement.appendChild(this.iconElement);
            }
            else {
                this.element.appendChild(this.iconElement);
            }
        }
    };
    Message.prototype.setCloseIcon = function () {
        if (this.showCloseIcon) {
            this.closeIcon = this.createElement('button', { attrs: { type: 'button', class: MSG_CLOSE_ICON } });
            this.element.appendChild(this.closeIcon);
            this.setTitle();
        }
    };
    Message.prototype.setTitle = function () {
        this.l10n.setLocale(this.locale);
        var closeIconTitle = this.l10n.getConstant('close');
        this.closeIcon.setAttribute('title', closeIconTitle);
        this.closeIcon.setAttribute('aria-label', closeIconTitle);
    };
    Message.prototype.setContent = function () {
        this.txtElement = this.createElement('div', { className: MSG_CONTENT });
        if (this.element.classList.contains(MSG_CONTENT_CENTER)) {
            this.msgElement.appendChild(this.txtElement);
            this.element.appendChild(this.msgElement);
        }
        else {
            this.element.appendChild(this.txtElement);
        }
        this.setTemplate();
    };
    Message.prototype.setTemplate = function () {
        var templateFn;
        if (isNOU(this.content) || this.content === '') {
            this.txtElement.innerHTML = this.innerContent;
        }
        else if (!isNOU(this.content) && this.content !== '') {
            if ((typeof this.content === 'string') || (typeof this.content !== 'string')) {
                // eslint-disable-next-line
                if (this.isVue || typeof this.content !== 'string') {
                    templateFn = compile(this.content);
                    if (!isNOU(templateFn)) {
                        var tempArr = templateFn({}, this, 'content', this.element.id + 'content', true);
                        if (tempArr) {
                            tempArr = Array.prototype.slice.call(tempArr);
                            append(tempArr, this.txtElement);
                            this.renderReactTemplates();
                        }
                    }
                }
                else {
                    this.txtElement.innerHTML = this.content;
                }
            }
        }
    };
    Message.prototype.setSeverity = function () {
        var classList = [SUCCESS, WARNING, INFO, ERROR];
        removeClass([this.element], classList);
        if (this.severity === 'Success') {
            addClass([this.element], SUCCESS);
        }
        else if (this.severity === 'Warning') {
            addClass([this.element], WARNING);
        }
        else if (this.severity === 'Error') {
            addClass([this.element], ERROR);
        }
        else if (this.severity === 'Info') {
            addClass([this.element], INFO);
        }
    };
    Message.prototype.setVariant = function () {
        var classList = [FILLED, OUTLINED];
        removeClass([this.element], classList);
        if (this.variant === 'Outlined') {
            addClass([this.element], OUTLINED);
        }
        else if (this.variant === 'Filled') {
            addClass([this.element], FILLED);
        }
    };
    Message.prototype.setCssClass = function (oldCssClass) {
        if (oldCssClass) {
            removeClass([this.element], oldCssClass.split(' '));
        }
        if (this.cssClass) {
            addClass([this.element], this.cssClass.split(' '));
        }
    };
    Message.prototype.setVisible = function () {
        if (!this.visible) {
            addClass([this.element], HIDE);
            if (!this.initialRender) {
                this.trigger('closed', { event: event, isInteracted: false, element: this.element });
            }
        }
        else {
            removeClass([this.element], HIDE);
        }
    };
    Message.prototype.clickHandler = function (event) {
        this.closeMessage(event);
    };
    Message.prototype.keyboardHandler = function (event) {
        if (event.keyCode === 32 || event.keyCode === 13) {
            this.closeMessage(event);
        }
    };
    Message.prototype.closeMessage = function (event) {
        addClass([this.element], HIDE);
        this.setProperties({ visible: false }, true);
        var eventArgs = { event: event, isInteracted: true, element: this.element };
        this.trigger('closed', eventArgs);
    };
    Message.prototype.wireEvents = function () {
        if (this.showCloseIcon) {
            EventHandler.add(this.closeIcon, 'click', this.clickHandler, this);
            EventHandler.add(this.closeIcon, 'keydown', this.keyboardHandler, this);
        }
    };
    Message.prototype.unWireEvents = function () {
        if (this.showCloseIcon) {
            EventHandler.remove(this.closeIcon, 'click', this.clickHandler);
            EventHandler.remove(this.closeIcon, 'keydown', this.keyboardHandler);
        }
    };
    /**
     * Method to handle the dynamic changes of the Message component properties.
     *
     * @param {MessageModel} newProp - Specifies the new property.
     * @param {MessageModel} oldProp - Specifies the old property.
     * @returns {void}
     * @private
     */
    Message.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'cssClass':
                    this.setCssClass(oldProp.cssClass);
                    break;
                case 'content':
                    this.txtElement.innerHTML = '';
                    this.setTemplate();
                    break;
                case 'enableRtl':
                    if (!this.enableRtl) {
                        this.element.classList.remove(RTL);
                    }
                    else {
                        this.element.classList.add(RTL);
                    }
                    break;
                case 'locale':
                    if (this.showCloseIcon) {
                        this.setTitle();
                    }
                    break;
                case 'showIcon':
                    if (!this.showIcon && this.element.getElementsByClassName(MSG_ICON).length > 0) {
                        detach(this.iconElement);
                    }
                    if (this.showIcon) {
                        this.iconElement = this.createElement('span', { className: MSG_ICON });
                        this.element.insertBefore(this.iconElement, this.txtElement);
                    }
                    break;
                case 'showCloseIcon':
                    if (!this.showCloseIcon && !isNOU(this.closeIcon)) {
                        this.unWireEvents();
                        detach(this.closeIcon);
                    }
                    else {
                        this.setCloseIcon();
                        this.wireEvents();
                    }
                    break;
                case 'severity':
                    this.setSeverity();
                    break;
                case 'variant':
                    this.setVariant();
                    break;
                case 'visible':
                    this.setVisible();
                    break;
            }
        }
    };
    /**
     * Method to destroy the Message component. It removes the component from the DOM and detaches all its bound events. It also removes the attributes and classes of the component.
     *
     * @returns {void}
     */
    Message.prototype.destroy = function () {
        var cssClass = isNOU(this.cssClass) ? [''] : this.cssClass.split(' ');
        var className = [SUCCESS, WARNING, INFO, ERROR, RTL, HIDE, OUTLINED, FILLED];
        var classList = (cssClass.length === 1 && cssClass[0] === '') ? className : className.concat(cssClass);
        removeClass([this.element], classList);
        this.element.removeAttribute('role');
        this.unWireEvents();
        if (!isNOU(this.iconElement)) {
            detach(this.iconElement);
        }
        detach(this.txtElement);
        if (!isNOU(this.closeIcon)) {
            detach(this.closeIcon);
        }
        _super.prototype.destroy.call(this);
    };
    __decorate([
        Property(null)
    ], Message.prototype, "content", void 0);
    __decorate([
        Property('')
    ], Message.prototype, "cssClass", void 0);
    __decorate([
        Property(true)
    ], Message.prototype, "showIcon", void 0);
    __decorate([
        Property(false)
    ], Message.prototype, "showCloseIcon", void 0);
    __decorate([
        Property('Normal')
    ], Message.prototype, "severity", void 0);
    __decorate([
        Property('Text')
    ], Message.prototype, "variant", void 0);
    __decorate([
        Property(true)
    ], Message.prototype, "visible", void 0);
    __decorate([
        Event()
    ], Message.prototype, "created", void 0);
    __decorate([
        Event()
    ], Message.prototype, "destroyed", void 0);
    __decorate([
        Event()
    ], Message.prototype, "closed", void 0);
    Message = __decorate([
        NotifyPropertyChanges
    ], Message);
    return Message;
}(Component));
export { Message };
