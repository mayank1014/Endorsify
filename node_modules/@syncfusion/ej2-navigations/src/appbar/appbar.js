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
import { Component, NotifyPropertyChanges, Property, Event } from '@syncfusion/ej2-base';
import { addClass, removeClass, isNullOrUndefined } from '@syncfusion/ej2-base';
// Constant variables
var CLS_APPBAR = 'e-appbar';
var CLS_HORIZONTAL_BOTTOM = 'e-horizontal-bottom';
var CLS_STICKY = 'e-sticky';
var CLS_PROMINENT = 'e-prominent';
var CLS_DENSE = 'e-dense';
var CLS_RTL = 'e-rtl';
var CLS_LIGHT = 'e-light';
var CLS_DARK = 'e-dark';
var CLS_PRIMARY = 'e-primary';
var CLS_INHERIT = 'e-inherit';
/**
 * The AppBar displays the information and actions related to the current application screen. It is used to show branding, screen titles, navigation, and actions.
 * Support to inherit colors from AppBar provided to <c>Button</c>, <c>DropDownButton</c>, <c>Menu</c> and <c>TextBox</c>.
 * Set <c>CssClass</c> property with <code>e-inherit</code> CSS class to inherit the background and color from AppBar.
 */
var AppBar = /** @class */ (function (_super) {
    __extends(AppBar, _super);
    /**
     * Constructor for creating the AppBar widget
     *
     * @param {AppBarModel} options Accepts the AppBar model properties to initiate the rendering
     * @param {string | HTMLElement} element Accepts the DOM element reference
     */
    function AppBar(options, element) {
        return _super.call(this, options, element) || this;
    }
    /**
     * Removes the control from the DOM and also removes all its related events.
     *
     * @returns {void}
     */
    AppBar.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.element.classList.remove(CLS_APPBAR);
        this.element.removeAttribute('style');
        this.element.removeAttribute('role');
    };
    AppBar.prototype.getModuleName = function () {
        return 'appbar';
    };
    AppBar.prototype.getPersistData = function () {
        return this.addOnPersist([]);
    };
    AppBar.prototype.preRender = function () {
        // pre render code
    };
    AppBar.prototype.render = function () {
        this.element.classList.add(CLS_APPBAR);
        if (this.element.tagName !== 'HEADER') {
            this.element.setAttribute('role', 'header');
        }
        if (this.cssClass) {
            addClass([this.element], this.cssClass.split(' '));
        }
        if (this.position === 'Bottom') {
            this.element.classList.add(CLS_HORIZONTAL_BOTTOM);
        }
        if (this.isSticky) {
            this.element.classList.add(CLS_STICKY);
        }
        if (this.enableRtl) {
            this.element.classList.add(CLS_RTL);
        }
        this.setHeightMode();
        this.setColorMode();
        if (!isNullOrUndefined(this.htmlAttributes)) {
            this.setHtmlAttributes(this.htmlAttributes, this.element);
        }
    };
    AppBar.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'mode':
                    removeClass([this.element], [CLS_DENSE, CLS_PROMINENT]);
                    this.setHeightMode();
                    break;
                case 'position':
                    if (this.position === 'Bottom') {
                        addClass([this.element], CLS_HORIZONTAL_BOTTOM);
                    }
                    else {
                        removeClass([this.element], CLS_HORIZONTAL_BOTTOM);
                    }
                    break;
                case 'cssClass':
                    if (oldProp.cssClass) {
                        removeClass([this.element], oldProp.cssClass.split(' '));
                    }
                    if (newProp.cssClass) {
                        addClass([this.element], newProp.cssClass.split(' '));
                    }
                    break;
                case 'isSticky':
                    if (this.isSticky) {
                        addClass([this.element], CLS_STICKY);
                    }
                    else {
                        removeClass([this.element], CLS_STICKY);
                    }
                    break;
                case 'htmlAttributes':
                    if (!isNullOrUndefined(this.htmlAttributes)) {
                        if (!isNullOrUndefined(oldProp.htmlAttributes)) {
                            var keys = Object.keys(oldProp.htmlAttributes);
                            for (var _b = 0, keys_1 = keys; _b < keys_1.length; _b++) {
                                var key = keys_1[_b];
                                if (key === 'class') {
                                    removeClass([this.element], oldProp.htmlAttributes["" + key]);
                                }
                                else {
                                    this.element.removeAttribute(key);
                                }
                            }
                        }
                        this.setHtmlAttributes(newProp.htmlAttributes, this.element);
                    }
                    break;
                case 'colorMode':
                    removeClass([this.element], [CLS_DARK, CLS_PRIMARY, CLS_INHERIT, CLS_LIGHT]);
                    this.setColorMode();
                    break;
                case 'enableRtl':
                    if (this.enableRtl) {
                        addClass([this.element], CLS_RTL);
                    }
                    else {
                        removeClass([this.element], CLS_RTL);
                    }
                    break;
            }
        }
    };
    AppBar.prototype.setHtmlAttributes = function (attribute, element) {
        var keys = Object.keys(attribute);
        for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
            var key = keys_2[_i];
            if (key === 'class') {
                addClass([element], attribute["" + key]);
            }
            else {
                element.setAttribute(key, attribute["" + key]);
            }
        }
    };
    AppBar.prototype.setHeightMode = function () {
        if (this.mode === 'Prominent') {
            this.element.classList.add(CLS_PROMINENT);
        }
        else if (this.mode === 'Dense') {
            this.element.classList.add(CLS_DENSE);
        }
    };
    AppBar.prototype.setColorMode = function () {
        switch (this.colorMode) {
            case 'Light':
                this.element.classList.add(CLS_LIGHT);
                break;
            case 'Dark':
                this.element.classList.add(CLS_DARK);
                break;
            case 'Primary':
                this.element.classList.add(CLS_PRIMARY);
                break;
            case 'Inherit':
                this.element.classList.add(CLS_INHERIT);
                break;
        }
    };
    __decorate([
        Property('Regular')
    ], AppBar.prototype, "mode", void 0);
    __decorate([
        Property('Top')
    ], AppBar.prototype, "position", void 0);
    __decorate([
        Property()
    ], AppBar.prototype, "cssClass", void 0);
    __decorate([
        Property(false)
    ], AppBar.prototype, "isSticky", void 0);
    __decorate([
        Property()
    ], AppBar.prototype, "htmlAttributes", void 0);
    __decorate([
        Property('Light')
    ], AppBar.prototype, "colorMode", void 0);
    __decorate([
        Event()
    ], AppBar.prototype, "created", void 0);
    __decorate([
        Event()
    ], AppBar.prototype, "destroyed", void 0);
    AppBar = __decorate([
        NotifyPropertyChanges
    ], AppBar);
    return AppBar;
}(Component));
export { AppBar };
