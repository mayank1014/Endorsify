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
import { Component, NotifyPropertyChanges, ChildProperty, Property, Collection, append, extend, Event, EventHandler, closest, addClass, removeClass, detach, remove, initializeCSPTemplate, isNullOrUndefined } from '@syncfusion/ej2-base';
import { ListBase } from '@syncfusion/ej2-lists';
import { Popup } from '@syncfusion/ej2-popups';
var ICONRIGHT = 'e-icon-right';
var ITEMTEXTCLASS = 'e-breadcrumb-text';
var ICONCLASS = 'e-breadcrumb-icon';
var MENUCLASS = 'e-breadcrumb-menu';
var ITEMCLASS = 'e-breadcrumb-item';
var POPUPCLASS = 'e-breadcrumb-popup';
var WRAPMODECLASS = 'e-breadcrumb-wrap-mode';
var SCROLLMODECLASS = 'e-breadcrumb-scroll-mode';
var TABINDEX = 'tabindex';
var DISABLEDCLASS = 'e-disabled';
var ARIADISABLED = 'aria-disabled';
var DOT = '.';
/**
 * Defines the Breadcrumb overflow modes.
 */
export var BreadcrumbOverflowMode;
(function (BreadcrumbOverflowMode) {
    /**
     * Hidden mode shows the maximum number of items possible in the container space and hides the remaining items.
     * Clicking on a previous item will make the hidden item visible.
     */
    BreadcrumbOverflowMode["Hidden"] = "Hidden";
    /**
     * Collapsed mode shows the first and last Breadcrumb items and hides the remaining items with a collapsed icon.
     * When the collapsed icon is clicked, all items become visible and navigable.
     */
    BreadcrumbOverflowMode["Collapsed"] = "Collapsed";
    /**
     * Menu mode shows the number of Breadcrumb items that can be accommodated within the container space and creates a submenu with the remaining items.
     */
    BreadcrumbOverflowMode["Menu"] = "Menu";
    /**
     * Wrap mode wraps the items to multiple lines when the Breadcrumb’s width exceeds the container space.
     */
    BreadcrumbOverflowMode["Wrap"] = "Wrap";
    /**
     * Scroll mode shows an HTML scroll bar when the Breadcrumb’s width exceeds the container space.
     */
    BreadcrumbOverflowMode["Scroll"] = "Scroll";
    /**
     * None mode shows all the items in a single line.
     */
    BreadcrumbOverflowMode["None"] = "None";
})(BreadcrumbOverflowMode || (BreadcrumbOverflowMode = {}));
var BreadcrumbItem = /** @class */ (function (_super) {
    __extends(BreadcrumbItem, _super);
    function BreadcrumbItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('')
    ], BreadcrumbItem.prototype, "text", void 0);
    __decorate([
        Property('')
    ], BreadcrumbItem.prototype, "url", void 0);
    __decorate([
        Property(null)
    ], BreadcrumbItem.prototype, "iconCss", void 0);
    __decorate([
        Property(false)
    ], BreadcrumbItem.prototype, "disabled", void 0);
    return BreadcrumbItem;
}(ChildProperty));
export { BreadcrumbItem };
/**
 * Breadcrumb is a graphical user interface that helps to identify or highlight the current location within a hierarchical structure of websites.
 * The aim is to make the user aware of their current position in a hierarchy of website links.
 * ```html
 * <nav id='breadcrumb'></nav>
 * ```
 * ```typescript
 * <script>
 * var breadcrumbObj = new Breadcrumb({ items: [{ text: 'Home', url: '/' }, { text: 'Index', url: './index.html }]});
 * breadcrumbObj.appendTo("#breadcrumb");
 * </script>
 * ```
 */
var Breadcrumb = /** @class */ (function (_super) {
    __extends(Breadcrumb, _super);
    /**
     * Constructor for creating the widget.
     *
     * @private
     * @param {BreadcrumbModel} options - Specifies the Breadcrumb model.
     * @param {string | HTMLElement} element - Specifies the element.
     */
    function Breadcrumb(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.isPopupCreated = false;
        return _this;
    }
    /**
     * @private
     * @returns {void}
     */
    Breadcrumb.prototype.preRender = function () {
        // pre render code
    };
    /**
     * Initialize the control rendering.
     *
     * @private
     * @returns {void}
     */
    Breadcrumb.prototype.render = function () {
        this.initialize();
        this.renderItems(this.items);
        this.wireEvents();
    };
    Breadcrumb.prototype.initialize = function () {
        this._maxItems = this.maxItems;
        if (isNullOrUndefined(this.element.getAttribute('aria-label'))) {
            this.element.setAttribute('aria-label', 'breadcrumb');
        }
        if (this.cssClass) {
            addClass([this.element], this.cssClass.replace(/\s+/g, ' ').trim().split(' '));
        }
        if (this.enableRtl) {
            this.element.classList.add('e-rtl');
        }
        if (this.disabled) {
            this.element.classList.add(DISABLEDCLASS);
            this.element.setAttribute(ARIADISABLED, 'true');
        }
        if (this.overflowMode === 'Wrap') {
            this.element.classList.add(WRAPMODECLASS);
        }
        else if (this.overflowMode === 'Scroll') {
            this.element.classList.add(SCROLLMODECLASS);
        }
        this.initItems();
        this.initPvtProps();
    };
    Breadcrumb.prototype.initPvtProps = function () {
        if (this.overflowMode === 'Hidden' && this._maxItems > 0) {
            this.endIndex = this.getEndIndex();
            this.startIndex = this.endIndex + 1 - (this._maxItems - 1);
        }
        if (this.overflowMode === 'Menu') {
            if (this._maxItems >= 0) {
                this.startIndex = this._maxItems > 1 ? 1 : 0;
                this.endIndex = this.getEndIndex();
                this.popupUl = this.createElement('ul', { attrs: { TABINDEX: '0', 'role': 'menu' } });
            }
            else {
                this.startIndex = this.endIndex = null;
            }
        }
    };
    Breadcrumb.prototype.getEndIndex = function () {
        var _this = this;
        var endIndex;
        if (this.activeItem) {
            this.items.forEach(function (item, idx) {
                if (item.url === _this.activeItem || item.text === _this.activeItem) {
                    endIndex = idx;
                }
            });
        }
        else {
            endIndex = this.items.length - 1;
        }
        return endIndex;
    };
    Breadcrumb.prototype.initItems = function () {
        if (!this.items.length) {
            var baseUri = void 0;
            var uri = void 0;
            var items = [];
            if (this.url) {
                var url = new URL(this.url, window.location.origin);
                baseUri = url.origin + '/';
                uri = url.href.split(baseUri)[1].split('/');
            }
            else {
                baseUri = window.location.origin + '/';
                uri = window.location.href.split(baseUri)[1].split('/');
            }
            items.push({ iconCss: 'e-icons e-home', url: baseUri });
            for (var i = 0; i < uri.length; i++) {
                if (uri[i]) {
                    items.push({ text: uri[i], url: baseUri + uri[i] });
                    baseUri += uri[i] + '/';
                }
            }
            this.setProperties({ items: items }, true);
        }
    };
    Breadcrumb.prototype.renderItems = function (items) {
        var _this = this;
        var item;
        var isSingleLevel;
        var isIconRight = this.element.classList.contains(ICONRIGHT);
        var itemsLength = items.length;
        if (itemsLength) {
            var isActiveItem = void 0;
            var isLastItem = void 0;
            var isLastItemInPopup_1;
            var j_1 = 0;
            var wrapDiv = void 0;
            var len = (itemsLength * 2) - 1;
            var isItemCancelled_1 = false;
            var ol = this.createElement('ol', { className: this.overflowMode === 'Wrap' ? 'e-breadcrumb-wrapped-ol' : '' });
            var firstOl = this.createElement('ol', { className: this.overflowMode === 'Wrap' ? 'e-breadcrumb-first-ol' : '' });
            var showIcon = this.hasField(items, 'iconCss');
            var isCollasped = (this.overflowMode === 'Collapsed' && this._maxItems > 0 && itemsLength > this._maxItems && !this.isExpanded);
            var isDefaultOverflowMode_1 = (this.overflowMode === 'Hidden' && this._maxItems > 0);
            if (this.overflowMode === 'Menu' && this.popupUl) {
                this.popupUl.innerHTML = '';
            }
            var listBaseOptions = {
                moduleName: this.getModuleName(),
                showIcon: showIcon,
                itemNavigable: true,
                itemCreated: function (args) {
                    var isLastItem = args.curData.isLastItem;
                    if (isLastItem && args.item.children.length && !_this.itemTemplate) {
                        delete args.curData.isLastItem;
                        if (!isLastItemInPopup_1 && !_this.enableActiveItemNavigation) {
                            args.item.innerHTML = _this.createElement('span', { className: ITEMTEXTCLASS, innerHTML: args.item.children[0].innerHTML }).outerHTML;
                        }
                    }
                    if (args.curData.iconCss && !args.curData.text && !_this.itemTemplate) {
                        args.item.classList.add('e-icon-item');
                    }
                    if (isDefaultOverflowMode_1) {
                        args.item.setAttribute('item-index', j_1.toString());
                    }
                    var eventArgs = {
                        item: extend({}, args.curData.properties ?
                            args.curData.properties : args.curData), element: args.item, cancel: false
                    };
                    _this.trigger('beforeItemRender', eventArgs);
                    isItemCancelled_1 = eventArgs.cancel;
                    var containsRightIcon = (isIconRight || eventArgs.element.classList.contains(ICONRIGHT));
                    if (containsRightIcon && args.curData.iconCss && !_this.itemTemplate) {
                        args.item.querySelector('.e-anchor-wrap').appendChild(args.item.querySelector(DOT + ICONCLASS));
                    }
                    if (eventArgs.item.disabled) {
                        args.item.setAttribute(ARIADISABLED, 'true');
                        args.item.classList.add(DISABLEDCLASS);
                    }
                    if ((eventArgs.item.disabled || _this.disabled) && args.item.children.length && !_this.itemTemplate) {
                        args.item.children[0].setAttribute(TABINDEX, '-1');
                    }
                    if (args.curData.isEmptyUrl) {
                        args.item.children[0].removeAttribute('href');
                        if ((!isLastItem || (isLastItem && _this.enableActiveItemNavigation)) && !(eventArgs.item.disabled
                            || _this.disabled)) {
                            args.item.children[0].setAttribute(TABINDEX, '0');
                            EventHandler.add(args.item.children[0], 'keydown', _this.keyDownHandler, _this);
                        }
                    }
                    args.item.removeAttribute('role');
                    if (isLastItem) {
                        args.item.setAttribute('data-active-item', '');
                    }
                    if (!_this.itemTemplate) {
                        _this.beforeItemRenderChanges(args.curData, eventArgs.item, args.item, containsRightIcon);
                    }
                }
            };
            for (var i = 0; i < len; (i % 2 && j_1++), i++) {
                isActiveItem = (this.activeItem && (this.activeItem === items[j_1].url ||
                    this.activeItem === items[j_1].text));
                if (isCollasped && i > 1 && i < len - 2) {
                    continue;
                }
                else if (isDefaultOverflowMode_1 && ((j_1 < this.startIndex || j_1 > this.endIndex)
                    && (i % 2 ? j_1 !== this.startIndex - 1 : true)) && j_1 !== 0) {
                    continue;
                }
                if (i % 2) {
                    // separator item
                    wrapDiv = this.createElement('div', { className: 'e-breadcrumb-item-wrapper' });
                    if ((this.separatorTemplate && this.separatorTemplate === '/') || isNullOrUndefined(this.separatorTemplate)) {
                        listBaseOptions.template = initializeCSPTemplate(function () {
                            return '/';
                        });
                    }
                    else {
                        listBaseOptions.template = this.separatorTemplate;
                    }
                    listBaseOptions.itemClass = 'e-breadcrumb-separator';
                    isSingleLevel = false;
                    item = [{ previousItem: items[j_1], nextItem: items[j_1 + 1] }];
                }
                else {
                    // list item
                    listBaseOptions.itemClass = '';
                    if (this.itemTemplate) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        listBaseOptions.template = this.itemTemplate;
                        isSingleLevel = false;
                    }
                    else {
                        isSingleLevel = true;
                    }
                    item = [extend({}, items[j_1].properties ?
                            items[j_1].properties
                            : items[j_1])];
                    if (!item[0].url && !this.itemTemplate) {
                        item = [extend({}, item[0], { isEmptyUrl: true, url: '#' })];
                    }
                    isLastItem = (isDefaultOverflowMode_1 || this.overflowMode === 'Menu') && (j_1 === this.endIndex);
                    if (((i === len - 1 || isLastItem) && !this.itemTemplate) || isActiveItem) {
                        item[0].isLastItem = true;
                    }
                }
                var parent_1 = ol;
                var lastPopupItemIdx = this.startIndex + this.endIndex - this._maxItems;
                if (this.overflowMode === 'Menu' && ((j_1 >= this.startIndex && (j_1 <= lastPopupItemIdx && (i % 2 ? !(j_1 === lastPopupItemIdx) : true)) && this.endIndex >= this._maxItems && this._maxItems > 0) || this._maxItems === 0)) {
                    if (i % 2) {
                        continue;
                    }
                    else {
                        parent_1 = this.popupUl;
                        if (isLastItem) {
                            isLastItemInPopup_1 = true;
                        }
                    }
                }
                else if (this.overflowMode === 'Wrap') {
                    if (i === 0) {
                        parent_1 = firstOl;
                    }
                    else {
                        parent_1 = wrapDiv;
                    }
                }
                var li = ListBase.createList(this.createElement, item, listBaseOptions, isSingleLevel, this).childNodes;
                if (!isItemCancelled_1) {
                    append(li, parent_1);
                }
                else if (isDefaultOverflowMode_1 || isCollasped || this.overflowMode === 'Menu' || this.overflowMode === 'Wrap') {
                    items.splice(j_1, 1);
                    this.initPvtProps();
                    return this.reRenderItems();
                }
                else if ((i === len - 1 || isLastItem)) {
                    remove(parent_1.lastElementChild);
                }
                if (this.overflowMode === 'Wrap' && i !== 0 && i % 2 === 0) {
                    ol.appendChild(wrapDiv);
                }
                if (isCollasped && i === 1) {
                    var li_1 = this.createElement('li', { className: 'e-icons e-breadcrumb-collapsed', attrs: { TABINDEX: '0' } });
                    EventHandler.add(li_1, 'keyup', this.expandHandler, this);
                    ol.appendChild(li_1);
                }
                if (this.overflowMode === 'Menu' && this.startIndex === i && this.endIndex >= this._maxItems && this._maxItems >= 0) {
                    var menu = this.getMenuElement();
                    EventHandler.add(menu, 'keyup', this.keyDownHandler, this);
                    ol.appendChild(menu);
                }
                if (isActiveItem || isLastItem) {
                    break;
                }
                if (isItemCancelled_1) {
                    i++;
                }
            }
            if (this.isReact) {
                this.renderReactTemplates();
            }
            if (this.overflowMode === 'Wrap') {
                this.element.appendChild(firstOl);
            }
            this.element.appendChild(ol);
            this.calculateMaxItems();
        }
    };
    Breadcrumb.prototype.calculateMaxItems = function () {
        if (this.overflowMode === 'Hidden' || this.overflowMode === 'Collapsed' || this.overflowMode === 'Menu') {
            var maxItems = void 0;
            var width = this.element.offsetWidth;
            var liElems = [].slice.call(this.element.children[0].children).reverse();
            var liWidth = this.overflowMode === 'Menu' ? 0 : liElems[liElems.length - 1].offsetWidth + (liElems[liElems.length - 2] ? liElems[liElems.length - 2].offsetWidth : 0);
            if (this.overflowMode === 'Menu') {
                var menuEle = this.getMenuElement();
                this.element.appendChild(menuEle);
                liWidth += menuEle.offsetWidth;
                remove(menuEle);
            }
            for (var i = 0; i < liElems.length - 2; i++) {
                if (liWidth > width) {
                    maxItems = Math.ceil((i - 1) / 2) + ((this.overflowMode === 'Menu' && i <= 2) ? 0 : 1);
                    if (((this.maxItems > maxItems && !(this.maxItems > -1 && maxItems === -1)) ||
                        this.maxItems === -1) && this._maxItems !== maxItems) {
                        this._maxItems = maxItems;
                        this.initPvtProps();
                        return this.reRenderItems();
                    }
                    else {
                        break;
                    }
                }
                else {
                    if (this.overflowMode === 'Menu' && i === 2) {
                        liWidth += liElems[liElems.length - 1].offsetWidth + liElems[liElems.length - 2].offsetWidth;
                        if (liWidth > width) {
                            this._maxItems = 1;
                            this.initPvtProps();
                            return this.reRenderItems();
                        }
                    }
                    if (!(this.overflowMode === 'Menu' && liElems[i].classList.contains(MENUCLASS))) {
                        liWidth += liElems[i].offsetWidth;
                    }
                }
            }
        }
        else if ((this.overflowMode === 'Wrap' || this.overflowMode === 'Scroll') && this._maxItems > 0) {
            var width = 0;
            var liElems = this.element.querySelectorAll(DOT + ITEMCLASS);
            if (liElems.length > this._maxItems + this._maxItems - 1) {
                for (var i = this.overflowMode === 'Wrap' ? 1 : 0; i < this._maxItems + this._maxItems - 1; i++) {
                    width += liElems[i].offsetWidth;
                }
                width = width + 5 + (parseInt(getComputedStyle(this.element.children[0]).paddingLeft, 10) * 2);
                if (this.overflowMode === 'Wrap') {
                    this.element.querySelector('.e-breadcrumb-wrapped-ol').style.width = width + 'px';
                }
                else {
                    this.element.style.width = width + 'px';
                }
            }
        }
    };
    Breadcrumb.prototype.hasField = function (items, field) {
        for (var i = 0, len = items.length; i < len; i++) {
            if (items[i]["" + field]) {
                return true;
            }
        }
        return false;
    };
    Breadcrumb.prototype.getMenuElement = function () {
        return this.createElement('li', { className: 'e-icons e-breadcrumb-menu', attrs: { TABINDEX: '0' } });
    };
    Breadcrumb.prototype.beforeItemRenderChanges = function (prevItem, currItem, elem, isRightIcon) {
        var wrapElem = elem.querySelector('.e-anchor-wrap');
        if (wrapElem) {
            wrapElem.parentElement.setAttribute('aria-label', 'home');
        }
        if (currItem.text !== prevItem.text) {
            wrapElem.childNodes.forEach(function (child) {
                if (child.nodeType === Node.TEXT_NODE) {
                    child.textContent = currItem.text;
                }
            });
        }
        if (currItem.iconCss !== prevItem.iconCss && wrapElem) { // wrapElem - for checking it is item not a separator
            var iconElem = elem.querySelector(DOT + ICONCLASS);
            if (iconElem) {
                if (currItem.iconCss) {
                    removeClass([iconElem], prevItem.iconCss.split(' '));
                    addClass([iconElem], currItem.iconCss.split(' '));
                }
                else {
                    remove(iconElem);
                }
            }
            else if (currItem.iconCss) {
                var iconElem_1 = this.createElement('span', { className: ICONCLASS + ' ' + currItem.iconCss });
                if (isRightIcon) {
                    append([iconElem_1], wrapElem);
                }
                else {
                    wrapElem.insertBefore(iconElem_1, wrapElem.childNodes[0]);
                }
            }
        }
        if (currItem.url !== prevItem.url && this.enableNavigation) {
            var anchor = elem.querySelector('a.' + ITEMTEXTCLASS);
            if (anchor) {
                if (currItem.url) {
                    anchor.setAttribute('href', currItem.url);
                }
                else {
                    anchor.removeAttribute('href');
                }
            }
        }
    };
    Breadcrumb.prototype.reRenderItems = function () {
        this.element.innerHTML = '';
        this.renderItems(this.items);
    };
    Breadcrumb.prototype.clickHandler = function (e) {
        var li = closest(e.target, DOT + ITEMCLASS + ':not(.e-breadcrumb-separator)');
        if (!this.enableNavigation) {
            e.preventDefault();
        }
        if (li && (closest(e.target, DOT + ITEMTEXTCLASS) || this.itemTemplate)) {
            var idx = void 0;
            if (this.overflowMode === 'Wrap') {
                idx = [].slice.call(this.element.querySelectorAll(DOT + ITEMCLASS)).indexOf(li);
            }
            else {
                idx = [].slice.call(li.parentElement.children).indexOf(li);
            }
            if (this.overflowMode === 'Menu') {
                if (closest(e.target, DOT + POPUPCLASS)) {
                    idx += this.startIndex;
                    this.endIndex = idx;
                    if (e.type === 'keydown') {
                        this.documentClickHandler(e);
                    }
                }
                else if (this.element.querySelector(DOT + MENUCLASS)) {
                    if (idx > [].slice.call(this.element.children[0].children).indexOf(this.element.querySelector(DOT + MENUCLASS))) {
                        idx += (this.popupUl.childElementCount * 2) - 2;
                        idx = Math.floor(idx / 2);
                        this.endIndex = idx;
                    }
                    else {
                        this.startIndex = this.endIndex = idx;
                    }
                }
                else {
                    idx = Math.floor(idx / 2);
                    this.startIndex = this.endIndex = idx;
                }
            }
            else {
                idx = Math.floor(idx / 2);
            }
            if (this.overflowMode === 'Hidden' && this._maxItems > 0 && this.endIndex !== 0) {
                idx = parseInt(li.getAttribute('item-index'), 10);
                if (this.startIndex > 1) {
                    this.startIndex -= (this.endIndex - idx);
                }
                this.endIndex = idx;
            }
            this.trigger('itemClick', { element: li, item: this.items[idx], event: e });
            this.activeItem = this.items[idx].url || this.items[idx].text;
            this.dataBind();
        }
        if (e.target.classList.contains('e-breadcrumb-collapsed')) {
            this.isExpanded = true;
            this.reRenderItems();
        }
        if (e.target.classList.contains(MENUCLASS) && !this.isPopupCreated) {
            this.renderPopup();
        }
    };
    Breadcrumb.prototype.renderPopup = function () {
        var _this = this;
        var wrapper = this.createElement('div', { className: POPUPCLASS + ' ' + this.cssClass + (this.enableRtl ? ' e-rtl' : '') });
        document.body.appendChild(wrapper);
        this.isPopupCreated = true;
        this.popupObj = new Popup(wrapper, {
            content: this.popupUl,
            relateTo: this.element.querySelector(DOT + MENUCLASS),
            enableRtl: this.enableRtl,
            position: { X: 'left', Y: 'bottom' },
            collision: { X: 'fit', Y: 'flip' },
            open: function () {
                _this.popupUl.focus();
            }
        });
        this.popupWireEvents();
        this.popupObj.show();
    };
    Breadcrumb.prototype.documentClickHandler = function (e) {
        if (this.overflowMode === 'Menu' && this.popupObj && this.popupObj.element.classList.contains('e-popup-open') && !closest(e.target, DOT + MENUCLASS)) {
            this.popupObj.hide();
            this.popupObj.destroy();
            this.isPopupCreated = false;
            detach(this.popupObj.element);
        }
    };
    Breadcrumb.prototype.resize = function () {
        this._maxItems = this.maxItems;
        this.initPvtProps();
        this.reRenderItems();
    };
    Breadcrumb.prototype.expandHandler = function (e) {
        if (e.key === 'Enter') {
            this.isExpanded = true;
            this.reRenderItems();
        }
    };
    Breadcrumb.prototype.keyDownHandler = function (e) {
        if (e.key === 'Enter') {
            this.clickHandler(e);
        }
    };
    Breadcrumb.prototype.popupKeyDownHandler = function (e) {
        if (e.key === 'Escape') {
            this.documentClickHandler(e);
        }
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @private
     * @param {BreadcrumbModel} newProp - Specifies the new properties.
     * @param {BreadcrumbModel} oldProp - Specifies the old properties.
     * @returns {void}
     */
    Breadcrumb.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'items':
                case 'enableActiveItemNavigation':
                    this.reRenderItems();
                    break;
                case 'activeItem':
                    this._maxItems = this.maxItems;
                    this.initPvtProps();
                    this.reRenderItems();
                    break;
                case 'overflowMode':
                case 'maxItems':
                    this._maxItems = this.maxItems;
                    this.initPvtProps();
                    this.reRenderItems();
                    if (oldProp.overflowMode === 'Wrap') {
                        this.element.classList.remove(WRAPMODECLASS);
                    }
                    else if (newProp.overflowMode === 'Wrap') {
                        this.element.classList.add(WRAPMODECLASS);
                    }
                    if (oldProp.overflowMode === 'Scroll') {
                        this.element.classList.remove(SCROLLMODECLASS);
                    }
                    else if (newProp.overflowMode === 'Scroll') {
                        this.element.classList.add(SCROLLMODECLASS);
                    }
                    break;
                case 'url':
                    this.initItems();
                    this.reRenderItems();
                    break;
                case 'cssClass':
                    if (oldProp.cssClass) {
                        removeClass([this.element], oldProp.cssClass.split(' '));
                    }
                    if (newProp.cssClass) {
                        addClass([this.element], newProp.cssClass.replace(/\s+/g, ' ').trim().split(' '));
                    }
                    if ((oldProp.cssClass && oldProp.cssClass.indexOf(ICONRIGHT) > -1) && !(newProp.cssClass &&
                        newProp.cssClass.indexOf(ICONRIGHT) > -1) || !(oldProp.cssClass && oldProp.cssClass.indexOf(ICONRIGHT) > -1) &&
                        (newProp.cssClass && newProp.cssClass.indexOf(ICONRIGHT) > -1)) {
                        this.reRenderItems();
                    }
                    break;
                case 'enableRtl':
                    this.element.classList.toggle('e-rtl');
                    break;
                case 'disabled':
                    this.element.classList.toggle(DISABLEDCLASS);
                    this.element.setAttribute(ARIADISABLED, newProp.disabled + '');
                    break;
            }
        }
    };
    Breadcrumb.prototype.wireEvents = function () {
        this.delegateClickHanlder = this.documentClickHandler.bind(this);
        EventHandler.add(document, 'click', this.delegateClickHanlder, this);
        EventHandler.add(this.element, 'click', this.clickHandler, this);
        window.addEventListener('resize', this.resize.bind(this));
    };
    Breadcrumb.prototype.popupWireEvents = function () {
        EventHandler.add(this.popupObj.element, 'click', this.clickHandler, this);
        EventHandler.add(this.popupObj.element, 'keydown', this.popupKeyDownHandler, this);
    };
    Breadcrumb.prototype.unWireEvents = function () {
        EventHandler.remove(document, 'click', this.delegateClickHanlder);
        EventHandler.remove(this.element, 'click', this.clickHandler);
        window.removeEventListener('resize', this.resize.bind(this));
        if (this.popupObj) {
            EventHandler.remove(this.popupObj.element, 'click', this.clickHandler);
            EventHandler.remove(this.popupObj.element, 'keydown', this.popupKeyDownHandler);
        }
    };
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @returns {string} - Persist data
     */
    Breadcrumb.prototype.getPersistData = function () {
        return this.addOnPersist(['activeItem']);
    };
    /**
     * Get module name.
     *
     * @private
     * @returns {string} - Module Name
     */
    Breadcrumb.prototype.getModuleName = function () {
        return 'breadcrumb';
    };
    /**
     * Destroys the widget.
     *
     * @returns {void}
     */
    Breadcrumb.prototype.destroy = function () {
        var _this = this;
        var classes = [];
        var attributes = ['aria-label'];
        if (this.cssClass) {
            classes.concat(this.cssClass.split(' '));
        }
        if (this.enableRtl) {
            classes.push('e-rtl');
        }
        if (this.disabled) {
            classes.push(DISABLEDCLASS);
            attributes.push(ARIADISABLED);
        }
        if (this.overflowMode === 'Wrap') {
            classes.push(WRAPMODECLASS);
        }
        else if (this.overflowMode === 'Scroll') {
            classes.push(SCROLLMODECLASS);
        }
        this.unWireEvents();
        this.element.innerHTML = '';
        removeClass([this.element], classes);
        attributes.forEach(function (attribute) {
            _this.element.removeAttribute(attribute);
        });
        _super.prototype.destroy.call(this);
    };
    __decorate([
        Property('')
    ], Breadcrumb.prototype, "url", void 0);
    __decorate([
        Collection([], BreadcrumbItem)
    ], Breadcrumb.prototype, "items", void 0);
    __decorate([
        Property('')
    ], Breadcrumb.prototype, "activeItem", void 0);
    __decorate([
        Property(-1)
    ], Breadcrumb.prototype, "maxItems", void 0);
    __decorate([
        Property('Menu')
    ], Breadcrumb.prototype, "overflowMode", void 0);
    __decorate([
        Property('')
    ], Breadcrumb.prototype, "cssClass", void 0);
    __decorate([
        Property(null)
    ], Breadcrumb.prototype, "itemTemplate", void 0);
    __decorate([
        Property('/')
    ], Breadcrumb.prototype, "separatorTemplate", void 0);
    __decorate([
        Property(true)
    ], Breadcrumb.prototype, "enableNavigation", void 0);
    __decorate([
        Property(false)
    ], Breadcrumb.prototype, "enableActiveItemNavigation", void 0);
    __decorate([
        Property(false)
    ], Breadcrumb.prototype, "disabled", void 0);
    __decorate([
        Property('')
    ], Breadcrumb.prototype, "locale", void 0);
    __decorate([
        Event()
    ], Breadcrumb.prototype, "beforeItemRender", void 0);
    __decorate([
        Event()
    ], Breadcrumb.prototype, "itemClick", void 0);
    __decorate([
        Event()
    ], Breadcrumb.prototype, "created", void 0);
    Breadcrumb = __decorate([
        NotifyPropertyChanges
    ], Breadcrumb);
    return Breadcrumb;
}(Component));
export { Breadcrumb };
