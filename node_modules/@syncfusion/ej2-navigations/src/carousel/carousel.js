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
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventHandler, Collection, Property, Event, formatUnit, NotifyPropertyChanges, Browser } from '@syncfusion/ej2-base';
import { ChildProperty, addClass, removeClass, setStyleAttribute, attributes, getUniqueID, compile, getInstance, L10n } from '@syncfusion/ej2-base';
import { append, closest, isNullOrUndefined, remove, classList, Touch, KeyboardEvents } from '@syncfusion/ej2-base';
import { Button } from '@syncfusion/ej2-buttons';
// Constant variables
var CLS_CAROUSEL = 'e-carousel';
var CLS_ACTIVE = 'e-active';
var CLS_RTL = 'e-rtl';
var CLS_PARTIAL = 'e-partial';
var CLS_SWIPE = 'e-swipe';
var CLS_SLIDE_CONTAINER = 'e-carousel-slide-container';
var CLS_ITEMS = 'e-carousel-items';
var CLS_CLONED = 'e-cloned';
var CLS_ITEM = 'e-carousel-item';
var CLS_PREVIOUS = 'e-previous';
var CLS_NEXT = 'e-next';
var CLS_PREV_ICON = 'e-previous-icon';
var CLS_NEXT_ICON = 'e-next-icon';
var CLS_NAVIGATORS = 'e-carousel-navigators';
var CLS_INDICATORS = 'e-carousel-indicators';
var CLS_INDICATOR_BARS = 'e-indicator-bars';
var CLS_INDICATOR_BAR = 'e-indicator-bar';
var CLS_INDICATOR = 'e-indicator';
var CLS_ICON = 'e-icons';
var CLS_PLAY_PAUSE = 'e-play-pause';
var CLS_PLAY_ICON = 'e-play-icon';
var CLS_PAUSE_ICON = 'e-pause-icon';
var CLS_PREV_BUTTON = 'e-previous-button';
var CLS_NEXT_BUTTON = 'e-next-button';
var CLS_PLAY_BUTTON = 'e-play-button';
var CLS_FLAT = 'e-flat';
var CLS_ROUND = 'e-round';
var CLS_HOVER_ARROWS = 'e-hover-arrows';
var CLS_HOVER = 'e-carousel-hover';
var CLS_TEMPLATE = 'e-template';
var CLS_SLIDE_ANIMATION = 'e-carousel-slide-animation';
var CLS_FADE_ANIMATION = 'e-carousel-fade-animation';
var CLS_CUSTOM_ANIMATION = 'e-carousel-custom-animation';
var CLS_ANIMATION_NONE = 'e-carousel-animation-none';
var CLS_PREV_SLIDE = 'e-prev';
var CLS_NEXT_SLIDE = 'e-next';
var CLS_TRANSITION_START = 'e-transition-start';
var CLS_TRANSITION_END = 'e-transition-end';
/**
 * Specifies the action (touch & mouse) which enables the slide swiping action in carousel.
 * * Touch - Enables or disables the swiping action in touch interaction.
 * * Mouse - Enables or disables the swiping action in mouse interaction.
 * @aspNumberEnum
 */
export var CarouselSwipeMode;
(function (CarouselSwipeMode) {
    /** Enables or disables the swiping action in touch interaction. */
    CarouselSwipeMode[CarouselSwipeMode["Touch"] = 1] = "Touch";
    /** Enables or disables the swiping action in mouse interaction. */
    CarouselSwipeMode[CarouselSwipeMode["Mouse"] = 2] = "Mouse";
})(CarouselSwipeMode || (CarouselSwipeMode = {}));
/** Specifies the carousel individual item. */
var CarouselItem = /** @class */ (function (_super) {
    __extends(CarouselItem, _super);
    function CarouselItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property()
    ], CarouselItem.prototype, "cssClass", void 0);
    __decorate([
        Property()
    ], CarouselItem.prototype, "interval", void 0);
    __decorate([
        Property()
    ], CarouselItem.prototype, "template", void 0);
    __decorate([
        Property()
    ], CarouselItem.prototype, "htmlAttributes", void 0);
    return CarouselItem;
}(ChildProperty));
export { CarouselItem };
var Carousel = /** @class */ (function (_super) {
    __extends(Carousel, _super);
    /**
     * Constructor for creating the Carousel widget
     *
     * @param {CarouselModel} options Accepts the carousel model properties to initiate the rendering
     * @param {string | HTMLElement} element Accepts the DOM element reference
     */
    function Carousel(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.isSwipe = false;
        return _this;
    }
    Carousel.prototype.getModuleName = function () {
        return CLS_CAROUSEL.replace('e-', '');
    };
    Carousel.prototype.getPersistData = function () {
        return this.addOnPersist(['selectedIndex']);
    };
    Carousel.prototype.preRender = function () {
        this.keyConfigs = {
            home: 'home',
            end: 'end',
            space: 'space',
            moveLeft: 'leftarrow',
            moveRight: 'rightarrow',
            moveUp: 'uparrow',
            moveDown: 'downarrow'
        };
        var defaultLocale = {
            nextSlide: 'Next slide',
            of: 'of',
            pauseSlideTransition: 'Pause slide transition',
            playSlideTransition: 'Play slide transition',
            previousSlide: 'Previous slide',
            slide: 'Slide',
            slideShow: 'Slide show'
        };
        this.localeObj = new L10n(this.getModuleName(), defaultLocale, this.locale);
    };
    Carousel.prototype.render = function () {
        this.initialize();
        this.renderSlides();
        this.renderNavigators();
        this.renderPlayButton();
        this.renderIndicators();
        this.applyAnimation();
        this.wireEvents();
    };
    Carousel.prototype.onPropertyChanged = function (newProp, oldProp) {
        var target;
        var rtlElement;
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'animationEffect':
                    this.applyAnimation();
                    break;
                case 'cssClass':
                    classList(this.element, [newProp.cssClass], [oldProp.cssClass]);
                    break;
                case 'selectedIndex':
                    this.setActiveSlide(this.selectedIndex, oldProp.selectedIndex > this.selectedIndex ? 'Previous' : 'Next');
                    this.autoSlide();
                    break;
                case 'htmlAttributes':
                    if (!isNullOrUndefined(this.htmlAttributes)) {
                        this.setHtmlAttributes(this.htmlAttributes, this.element);
                    }
                    break;
                case 'enableTouchSwipe':
                    if (!this.enableTouchSwipe && this.touchModule) {
                        this.touchModule.destroy();
                    }
                    if (this.element.querySelector("." + CLS_ITEMS)) {
                        this.renderTouchActions();
                    }
                    break;
                case 'loop':
                    if (this.loop && isNullOrUndefined(this.autoSlideInterval)) {
                        this.applySlideInterval();
                    }
                    this.handleNavigatorsActions(this.selectedIndex);
                    if (this.partialVisible || !(this.swipeMode === (~CarouselSwipeMode.Touch & ~CarouselSwipeMode.Mouse))) {
                        this.reRenderSlides();
                    }
                    break;
                case 'enableRtl':
                    rtlElement = [].slice.call(this.element.querySelectorAll("." + CLS_PREV_BUTTON + ",\n                ." + CLS_NEXT_BUTTON + ", ." + CLS_PLAY_BUTTON));
                    rtlElement.push(this.element);
                    if (this.enableRtl) {
                        addClass(rtlElement, CLS_RTL);
                    }
                    else {
                        removeClass(rtlElement, CLS_RTL);
                    }
                    if (this.partialVisible || !(this.swipeMode === (~CarouselSwipeMode.Touch & ~CarouselSwipeMode.Mouse))) {
                        var cloneCount = this.loop ? this.getNumOfItems() : 0;
                        var slideWidth = this.itemsContainer.firstElementChild.clientWidth;
                        this.itemsContainer.style.transform = this.getTranslateX(slideWidth, this.selectedIndex + cloneCount);
                    }
                    break;
                case 'buttonsVisibility':
                    target = this.element.querySelector("." + CLS_NAVIGATORS);
                    if (target) {
                        switch (this.buttonsVisibility) {
                            case 'Hidden':
                                this.resetTemplates(['previousButtonTemplate', 'nextButtonTemplate']);
                                remove(target);
                                break;
                            case 'VisibleOnHover':
                                addClass([].slice.call(target.childNodes), CLS_HOVER_ARROWS);
                                break;
                            case 'Visible':
                                removeClass([].slice.call(target.childNodes), CLS_HOVER_ARROWS);
                                break;
                        }
                    }
                    else {
                        this.renderNavigators();
                        this.renderPlayButton();
                    }
                    break;
                case 'width':
                    setStyleAttribute(this.element, { 'width': formatUnit(this.width) });
                    break;
                case 'height':
                    setStyleAttribute(this.element, { 'height': formatUnit(this.height) });
                    break;
                case 'autoPlay':
                    if (this.showPlayButton && isNullOrUndefined(this.playButtonTemplate)) {
                        this.playButtonClickHandler(null, true);
                    }
                    this.autoSlide();
                    break;
                case 'interval':
                    this.autoSlide();
                    break;
                case 'showIndicators':
                case 'indicatorsType':
                    target = this.element.querySelector("." + CLS_INDICATORS);
                    if (target) {
                        this.resetTemplates(['indicatorsTemplate']);
                        remove(target);
                    }
                    this.renderIndicators();
                    break;
                case 'showPlayButton':
                    target = this.element.querySelector("." + CLS_PLAY_PAUSE);
                    if (!this.showPlayButton && target) {
                        remove(target);
                        this.resetTemplates(['playButtonTemplate']);
                    }
                    this.renderPlayButton();
                    break;
                case 'items':
                case 'dataSource':
                    var selectedData = prop === 'dataSource' ? this.dataSource : this.items;
                    if (selectedData.length > 0 && this.selectedIndex >= selectedData.length) {
                        this.setActiveSlide(selectedData.length - 1, 'Previous');
                        this.autoSlide();
                    }
                    this.reRenderSlides();
                    this.reRenderIndicators();
                    break;
                case 'partialVisible':
                    if (this.partialVisible) {
                        addClass([this.element], CLS_PARTIAL);
                    }
                    else {
                        removeClass([this.element], CLS_PARTIAL);
                    }
                    this.reRenderSlides();
                    break;
                case 'swipeMode':
                    EventHandler.remove(this.element, 'mousedown touchstart', this.swipeStart);
                    EventHandler.remove(this.element, 'mousemove touchmove', this.swiping);
                    EventHandler.remove(this.element, 'mouseup touchend', this.swipStop);
                    this.swipeModehandlers();
                    this.reRenderSlides();
                    break;
            }
        }
    };
    Carousel.prototype.reRenderSlides = function () {
        var target = this.element.querySelector("." + CLS_ITEMS);
        if (target) {
            this.resetTemplates(['itemTemplate']);
            remove(target);
        }
        this.renderSlides();
    };
    Carousel.prototype.reRenderIndicators = function () {
        var target = this.element.querySelector("." + CLS_INDICATORS);
        if (target) {
            this.resetTemplates(['indicatorsTemplate']);
            remove(target);
        }
        this.renderIndicators();
    };
    Carousel.prototype.initialize = function () {
        var carouselClasses = [];
        carouselClasses.push(CLS_CAROUSEL);
        if (this.cssClass) {
            carouselClasses.push(this.cssClass);
        }
        if (this.enableRtl) {
            carouselClasses.push(CLS_RTL);
        }
        if (this.partialVisible) {
            carouselClasses.push(CLS_PARTIAL);
        }
        if (!(this.swipeMode === (~CarouselSwipeMode.Touch & ~CarouselSwipeMode.Mouse))) {
            carouselClasses.push(CLS_SWIPE);
        }
        addClass([this.element], carouselClasses);
        setStyleAttribute(this.element, { 'width': formatUnit(this.width), 'height': formatUnit(this.height) });
        attributes(this.element, { 'role': 'group', 'aria-roledescription': 'carousel', 'aria-label': this.localeObj.getConstant('slideShow') });
        if (!isNullOrUndefined(this.htmlAttributes)) {
            this.setHtmlAttributes(this.htmlAttributes, this.element);
        }
    };
    Carousel.prototype.renderSlides = function () {
        var _this = this;
        var slideContainer = this.element.querySelector('.' + CLS_SLIDE_CONTAINER);
        if (!slideContainer) {
            slideContainer = this.createElement('div', { className: CLS_SLIDE_CONTAINER, attrs: { 'tabindex': '0', 'role': 'tabpanel' } });
            this.element.appendChild(slideContainer);
        }
        this.itemsContainer = this.createElement('div', { className: CLS_ITEMS, attrs: { 'aria-live': this.autoPlay ? 'off' : 'polite' } });
        slideContainer.appendChild(this.itemsContainer);
        var numOfItems = this.getNumOfItems();
        if (numOfItems > 0 && this.loop) {
            if (this.items.length > 0) {
                this.items.slice(-numOfItems).forEach(function (item, index) {
                    _this.renderSlide(item, item.template, index, _this.itemsContainer, true);
                });
            }
            else if (this.dataSource.length > 0) {
                this.dataSource.slice(-numOfItems).forEach(function (item, index) {
                    _this.renderSlide(item, _this.itemTemplate, index, _this.itemsContainer, true);
                });
            }
        }
        if (this.items.length > 0) {
            this.slideItems = this.items;
            this.items.forEach(function (item, index) {
                _this.renderSlide(item, item.template, index, _this.itemsContainer);
            });
        }
        else if (this.dataSource.length > 0) {
            this.slideItems = this.dataSource;
            this.dataSource.forEach(function (item, index) {
                _this.renderSlide(item, _this.itemTemplate, index, _this.itemsContainer);
            });
        }
        if (numOfItems > 0 && this.loop) {
            if (this.items.length > 0) {
                this.items.slice(0, numOfItems).forEach(function (item, index) {
                    _this.renderSlide(item, item.template, index, _this.itemsContainer, true);
                });
            }
            else if (this.dataSource.length > 0) {
                this.dataSource.slice(0, numOfItems).forEach(function (item, index) {
                    _this.renderSlide(item, _this.itemTemplate, index, _this.itemsContainer, true);
                });
            }
        }
        this.renderTemplates();
        this.itemsContainer.style.setProperty('--carousel-items-count', "" + this.itemsContainer.children.length);
        var slideWidth = isNullOrUndefined(this.itemsContainer.firstElementChild) ? 0 :
            this.itemsContainer.firstElementChild.clientWidth;
        this.itemsContainer.style.transitionProperty = 'none';
        var cloneCount = this.loop ? numOfItems : 0;
        this.itemsContainer.style.transform = this.getTranslateX(slideWidth, this.selectedIndex + cloneCount);
        this.autoSlide();
        this.renderTouchActions();
        this.renderKeyboardActions();
    };
    Carousel.prototype.getTranslateX = function (slideWidth, count) {
        if (count === void 0) { count = 1; }
        return this.enableRtl ? "translateX(" + (slideWidth) * (count) + "px)" :
            "translateX(" + -(slideWidth) * (count) + "px)";
    };
    Carousel.prototype.renderSlide = function (item, itemTemplate, index, container, isClone) {
        if (isClone === void 0) { isClone = false; }
        var itemEle = this.createElement('div', {
            id: getUniqueID('carousel_item'),
            className: CLS_ITEM + " " + (item.cssClass ? item.cssClass : '') + " " + (this.selectedIndex === index && !isClone ? CLS_ACTIVE : ''),
            attrs: {
                'aria-hidden': this.selectedIndex === index && !isClone ? 'false' : 'true', 'data-index': index.toString(),
                'role': 'group', 'aria-roledescription': 'slide'
            }
        });
        if (isClone) {
            itemEle.classList.add(CLS_CLONED);
        }
        if (!isNullOrUndefined(item.htmlAttributes)) {
            this.setHtmlAttributes(item.htmlAttributes, itemEle);
        }
        var templateId = this.element.id + '_template';
        var template = this.templateParser(itemTemplate)(item, this, 'itemTemplate', templateId, false);
        append(template, itemEle);
        container.appendChild(itemEle);
    };
    Carousel.prototype.renderNavigators = function () {
        if (this.buttonsVisibility === 'Hidden') {
            return;
        }
        var navigators = this.createElement('div', { className: CLS_NAVIGATORS });
        var itemsContainer = this.element.querySelector("." + CLS_SLIDE_CONTAINER);
        itemsContainer.insertAdjacentElement('afterend', navigators);
        if (!isNullOrUndefined(this.slideItems) && this.slideItems.length > 1) {
            this.renderNavigatorButton('Previous');
            this.renderNavigatorButton('Next');
        }
        this.renderTemplates();
    };
    Carousel.prototype.renderNavigatorButton = function (direction) {
        var buttonContainer = this.createElement('div', {
            className: (direction === 'Previous' ? CLS_PREVIOUS : CLS_NEXT) + ' ' + (this.buttonsVisibility === 'VisibleOnHover' ? CLS_HOVER_ARROWS : '')
        });
        if (direction === 'Previous' && this.previousButtonTemplate) {
            addClass([buttonContainer], CLS_TEMPLATE);
            var templateId = this.element.id + '_previousButtonTemplate';
            var template = this.templateParser(this.previousButtonTemplate)({ type: 'Previous' }, this, 'previousButtonTemplate', templateId, false);
            append(template, buttonContainer);
        }
        else if (direction === 'Next' && this.nextButtonTemplate) {
            addClass([buttonContainer], CLS_TEMPLATE);
            var templateId = this.element.id + '_nextButtonTemplate';
            var template = this.templateParser(this.nextButtonTemplate)({ type: 'Next' }, this, 'nextButtonTemplate', templateId, false);
            append(template, buttonContainer);
        }
        else {
            var button = this.createElement('button', {
                attrs: { 'aria-label': this.localeObj.getConstant(direction === 'Previous' ? 'previousSlide' : 'nextSlide'), 'type': 'button' }
            });
            var buttonObj = new Button({
                cssClass: CLS_FLAT + ' ' + CLS_ROUND + ' ' + (direction === 'Previous' ? CLS_PREV_BUTTON : CLS_NEXT_BUTTON),
                iconCss: CLS_ICON + ' ' + (direction === 'Previous' ? CLS_PREV_ICON : CLS_NEXT_ICON),
                enableRtl: this.enableRtl,
                disabled: !this.loop && this.selectedIndex === (direction === 'Previous' ? 0 : this.slideItems.length - 1)
            });
            buttonObj.appendTo(button);
            buttonContainer.appendChild(button);
        }
        this.element.querySelector('.' + CLS_NAVIGATORS).appendChild(buttonContainer);
        EventHandler.add(buttonContainer, 'click', this.navigatorClickHandler, this);
    };
    Carousel.prototype.renderPlayButton = function () {
        if (isNullOrUndefined(this.slideItems) || this.buttonsVisibility === 'Hidden' || !this.showPlayButton || this.slideItems.length <= 1) {
            return;
        }
        var playPauseWrap = this.createElement('div', {
            className: CLS_PLAY_PAUSE + ' ' + (this.buttonsVisibility === 'VisibleOnHover' ? CLS_HOVER_ARROWS : '')
        });
        if (this.playButtonTemplate) {
            addClass([playPauseWrap], CLS_TEMPLATE);
            var templateId = this.element.id + '_playButtonTemplate';
            var template = this.templateParser(this.playButtonTemplate)({}, this, 'playButtonTemplate', templateId, false);
            append(template, playPauseWrap);
        }
        else {
            var playButton = this.createElement('button', {
                attrs: { 'aria-label': this.localeObj.getConstant(this.autoPlay ? 'pauseSlideTransition' : 'playSlideTransition'), 'type': 'button' }
            });
            var isLastSlide = this.selectedIndex === this.slideItems.length - 1 && !this.loop;
            var buttonObj = new Button({
                cssClass: CLS_FLAT + ' ' + CLS_ROUND + ' ' + CLS_PLAY_BUTTON,
                iconCss: CLS_ICON + ' ' + (this.autoPlay && !isLastSlide ? CLS_PAUSE_ICON : CLS_PLAY_ICON),
                isToggle: true,
                enableRtl: this.enableRtl
            });
            if (isLastSlide) {
                this.setProperties({ autoPlay: false }, true);
                playButton.setAttribute('aria-label', this.localeObj.getConstant('playSlideTransition'));
                this.itemsContainer.setAttribute('aria-live', 'polite');
            }
            buttonObj.appendTo(playButton);
            playPauseWrap.appendChild(playButton);
        }
        var navigators = this.element.querySelector("." + CLS_NAVIGATORS);
        navigators.insertBefore(playPauseWrap, navigators.lastElementChild);
        this.renderTemplates();
        EventHandler.add(playPauseWrap, 'click', this.playButtonClickHandler, this);
    };
    Carousel.prototype.renderIndicators = function () {
        var _this = this;
        if (!this.showIndicators) {
            return;
        }
        var indicatorClass = 'e-default';
        if (!this.indicatorsTemplate) {
            indicatorClass = "e-" + this.indicatorsType.toLowerCase();
        }
        var indicatorWrap = this.createElement('div', { className: CLS_INDICATORS + " " + indicatorClass });
        var indicatorBars = this.createElement('div', { className: CLS_INDICATOR_BARS });
        indicatorWrap.appendChild(indicatorBars);
        var progress;
        if (this.slideItems) {
            switch (this.indicatorsType) {
                case 'Fraction':
                    if (this.indicatorsTemplate) {
                        this.renderIndicatorTemplate(indicatorBars, this.selectedIndex + 1);
                    }
                    else {
                        indicatorBars.innerText = this.selectedIndex + 1 + " / " + this.slideItems.length;
                    }
                    break;
                case 'Progress':
                    if (this.indicatorsTemplate) {
                        this.renderIndicatorTemplate(indicatorBars, this.selectedIndex + 1);
                    }
                    else {
                        progress = this.createElement('div', { className: CLS_INDICATOR_BAR });
                        progress.style.setProperty('--carousel-items-current', "" + (this.selectedIndex + 1));
                        progress.style.setProperty('--carousel-items-count', "" + this.slideItems.length);
                        indicatorBars.appendChild(progress);
                    }
                    break;
                case 'Default':
                case 'Dynamic':
                    this.slideItems.forEach(function (item, index) {
                        var indicatorBar = _this.createElement('div', {
                            className: CLS_INDICATOR_BAR + ' ' + (_this.selectedIndex === index ? CLS_ACTIVE : _this.selectedIndex - 1 === index ? CLS_PREV_SLIDE : _this.selectedIndex + 1 === index ? CLS_NEXT_SLIDE : ''),
                            attrs: { 'data-index': index.toString(), 'aria-current': _this.selectedIndex === index ? 'true' : 'false' }
                        });
                        indicatorBar.style.setProperty('--carousel-items-current', "" + _this.selectedIndex);
                        if (_this.indicatorsTemplate) {
                            _this.renderIndicatorTemplate(indicatorBar, index);
                        }
                        else if (_this.indicatorsType === 'Default') {
                            var indicator = _this.createElement('button', { className: CLS_INDICATOR, attrs: { 'type': 'button', 'aria-label': _this.localeObj.getConstant('slide') + ' ' + (index + 1) + ' ' + _this.localeObj.getConstant('of') + ' ' + _this.slideItems.length } });
                            indicatorBar.appendChild(indicator);
                            indicator.appendChild(_this.createElement('div', {}));
                            var buttonObj = new Button({ cssClass: 'e-flat e-small' });
                            buttonObj.appendTo(indicator);
                        }
                        indicatorBars.appendChild(indicatorBar);
                        if (_this.indicatorsType === 'Default') {
                            EventHandler.add(indicatorBar, 'click', _this.indicatorClickHandler, _this);
                        }
                    });
                    break;
            }
        }
        this.element.appendChild(indicatorWrap);
    };
    Carousel.prototype.renderIndicatorTemplate = function (indicatorBar, index) {
        if (index === void 0) { index = 0; }
        addClass([indicatorBar], CLS_TEMPLATE);
        var templateId = this.element.id + '_indicatorsTemplate';
        var template = this.templateParser(this.indicatorsTemplate)({ index: index, selectedIndex: this.selectedIndex }, this, 'indicatorsTemplate', templateId, false);
        append(template, indicatorBar);
    };
    Carousel.prototype.renderKeyboardActions = function () {
        this.keyModule = new KeyboardEvents(this.element, { keyAction: this.keyHandler.bind(this), keyConfigs: this.keyConfigs });
    };
    Carousel.prototype.renderTouchActions = function () {
        if (!this.enableTouchSwipe) {
            return;
        }
        this.touchModule = new Touch(this.element, { swipe: this.swipeHandler.bind(this) });
    };
    Carousel.prototype.applyAnimation = function () {
        removeClass([this.element], [CLS_CUSTOM_ANIMATION, CLS_FADE_ANIMATION, CLS_SLIDE_ANIMATION, CLS_ANIMATION_NONE]);
        switch (this.animationEffect) {
            case 'Slide':
                addClass([this.element], CLS_SLIDE_ANIMATION);
                break;
            case 'Fade':
                addClass([this.element], CLS_FADE_ANIMATION);
                break;
            case 'None':
                addClass([this.element], CLS_ANIMATION_NONE);
                break;
            case 'Custom':
                addClass([this.element], CLS_CUSTOM_ANIMATION);
                break;
        }
    };
    Carousel.prototype.autoSlide = function () {
        if (isNullOrUndefined(this.slideItems) || this.slideItems.length <= 1) {
            return;
        }
        this.resetSlideInterval();
        this.applySlideInterval();
    };
    Carousel.prototype.autoSlideChange = function () {
        var activeSlide = this.element.querySelector("." + CLS_ACTIVE);
        if (isNullOrUndefined(activeSlide)) {
            return;
        }
        var activeIndex = parseInt(activeSlide.dataset.index, 10);
        if (!this.loop && activeIndex === this.slideItems.length - 1) {
            this.resetSlideInterval();
        }
        else {
            var index = (activeIndex + 1) % this.slideItems.length;
            if (!this.element.classList.contains(CLS_HOVER)) {
                this.setActiveSlide(index, 'Next');
            }
            this.autoSlide();
        }
    };
    Carousel.prototype.applySlideInterval = function () {
        var _this = this;
        if (!this.autoPlay || this.element.classList.contains(CLS_HOVER)) {
            return;
        }
        var itemInterval = this.interval;
        if (this.items.length > 0 && !isNullOrUndefined(this.items[this.selectedIndex].interval)) {
            itemInterval = this.items[this.selectedIndex].interval;
        }
        this.autoSlideInterval = setInterval(function () { return _this.autoSlideChange(); }, itemInterval);
    };
    Carousel.prototype.resetSlideInterval = function () {
        clearInterval(this.autoSlideInterval);
        this.autoSlideInterval = null;
    };
    Carousel.prototype.getSlideIndex = function (direction) {
        var currentIndex = this.selectedIndex;
        if (direction === 'Previous') {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = this.slideItems.length - 1;
            }
        }
        else {
            currentIndex++;
            if (currentIndex === this.slideItems.length) {
                currentIndex = 0;
            }
        }
        return currentIndex;
    };
    Carousel.prototype.setActiveSlide = function (currentIndex, direction, isSwiped) {
        var _this = this;
        if (isSwiped === void 0) { isSwiped = false; }
        if (this.element.querySelectorAll("." + CLS_ITEM + "." + CLS_PREV_SLIDE + ",." + CLS_ITEM + "." + CLS_NEXT_SLIDE).length > 0) {
            return;
        }
        var allSlides = [].slice.call(this.element.querySelectorAll("." + CLS_ITEM + ":not(.e-cloned)"));
        var activeSlide = this.element.querySelector("." + CLS_ITEM + "." + CLS_ACTIVE);
        if (isNullOrUndefined(activeSlide) && this.showIndicators) {
            var activeIndicator = this.element.querySelector("." + CLS_INDICATOR_BAR + "." + CLS_ACTIVE);
            var activeIndex_1 = parseInt(activeIndicator.dataset.index, 10);
            addClass([allSlides[parseInt(activeIndex_1.toString(), 10)]], CLS_ACTIVE);
            return;
        }
        else if (isNullOrUndefined(activeSlide)) {
            addClass([allSlides[parseInt(currentIndex.toString(), 10)]], CLS_ACTIVE);
            return;
        }
        var activeIndex = parseInt(activeSlide.dataset.index, 10);
        var currentSlide = allSlides[parseInt(currentIndex.toString(), 10)];
        var eventArgs = {
            currentIndex: activeIndex,
            nextIndex: currentIndex,
            currentSlide: activeSlide,
            nextSlide: currentSlide,
            slideDirection: direction,
            isSwiped: isSwiped,
            cancel: false
        };
        this.trigger('slideChanging', eventArgs, function (args) {
            if (args.cancel) {
                return;
            }
            _this.setProperties({ selectedIndex: currentIndex }, true);
            attributes(args.currentSlide, { 'aria-hidden': 'true' });
            attributes(args.nextSlide, { 'aria-hidden': 'false' });
            _this.refreshIndicators(activeIndex, currentIndex);
            _this.slideChangedEventArgs = {
                currentIndex: args.nextIndex,
                previousIndex: args.currentIndex,
                currentSlide: args.nextSlide,
                previousSlide: args.currentSlide,
                slideDirection: direction,
                isSwiped: isSwiped
            };
            var slideWidth = allSlides[parseInt(currentIndex.toString(), 10)].clientWidth;
            var numOfItems = _this.getNumOfItems();
            if (!_this.isSwipe) {
                _this.itemsContainer.style.transitionDuration = '0.6s';
            }
            _this.isSwipe = false;
            if ((_this.animationEffect === 'Fade')) {
                _this.itemsContainer.classList.add('e-fade-in-out');
            }
            else {
                _this.itemsContainer.style.transitionProperty = 'transform';
            }
            if (_this.loop) {
                if (_this.slideChangedEventArgs.currentIndex === 0 && _this.slideChangedEventArgs.slideDirection === 'Next') {
                    _this.itemsContainer.style.transform = _this.getTranslateX(slideWidth, allSlides.length + numOfItems);
                }
                else if (_this.slideChangedEventArgs.currentIndex === _this.slideItems.length - 1 && _this.slideChangedEventArgs.slideDirection === 'Previous') {
                    _this.itemsContainer.style.transform = _this.partialVisible ? _this.getTranslateX(slideWidth) : 'translateX(0px)';
                }
                else {
                    _this.itemsContainer.style.transform = _this.getTranslateX(slideWidth, currentIndex + numOfItems);
                }
            }
            else {
                _this.itemsContainer.style.transform = _this.getTranslateX(slideWidth, currentIndex);
            }
            if (_this.animationEffect === 'Slide') {
                if (direction === 'Previous') {
                    addClass([args.nextSlide], CLS_PREV_SLIDE);
                    args.nextSlide.setAttribute('data-slide-height', args.nextSlide.offsetHeight.toString());
                    addClass([args.currentSlide, args.nextSlide], CLS_TRANSITION_END);
                }
                else {
                    addClass([args.nextSlide], CLS_NEXT_SLIDE);
                    args.nextSlide.setAttribute('data-slide-height', args.nextSlide.offsetHeight.toString());
                    addClass([args.currentSlide, args.nextSlide], CLS_TRANSITION_START);
                }
            }
            else if (_this.animationEffect === 'Fade') {
                removeClass([args.currentSlide], CLS_ACTIVE);
                addClass([args.nextSlide], CLS_ACTIVE);
            }
            else if (_this.animationEffect === 'Custom') {
                if (direction === 'Previous') {
                    addClass([args.nextSlide], CLS_NEXT_SLIDE);
                    addClass([args.currentSlide], CLS_PREV_SLIDE);
                }
                else {
                    addClass([args.currentSlide], CLS_PREV_SLIDE);
                    addClass([args.nextSlide], CLS_NEXT_SLIDE);
                }
            }
            else {
                _this.onTransitionEnd();
            }
            _this.handleNavigatorsActions(currentIndex);
        });
    };
    Carousel.prototype.onTransitionEnd = function () {
        var _this = this;
        removeClass(this.element.querySelectorAll("." + CLS_ITEMS), 'e-fade-in-out');
        var numOfItems = this.getNumOfItems();
        if (this.slideChangedEventArgs) {
            this.itemsContainer.style.transitionProperty = 'none';
            if (this.loop && (this.slideChangedEventArgs.currentIndex === 0 && this.slideChangedEventArgs.slideDirection === 'Next' ||
                this.slideChangedEventArgs.currentIndex === this.slideItems.length - 1 && this.slideChangedEventArgs.slideDirection === 'Previous')) {
                var slideWidth = this.slideChangedEventArgs.currentSlide.clientWidth;
                this.itemsContainer.style.transform = this.getTranslateX(slideWidth, this.slideChangedEventArgs.currentIndex + numOfItems);
            }
            addClass([this.slideChangedEventArgs.currentSlide], CLS_ACTIVE);
            removeClass([this.slideChangedEventArgs.previousSlide], CLS_ACTIVE);
            this.trigger('slideChanged', this.slideChangedEventArgs, function () {
                removeClass(_this.element.querySelectorAll("." + CLS_ITEM), [CLS_PREV_SLIDE, CLS_NEXT_SLIDE, CLS_TRANSITION_START, CLS_TRANSITION_END]);
                _this.slideChangedEventArgs = null;
            });
        }
    };
    Carousel.prototype.refreshIndicators = function (activeIndex, currentIndex) {
        var _this = this;
        var slideIndicator = this.element.querySelector("." + CLS_INDICATOR_BARS);
        if (isNullOrUndefined(slideIndicator)) {
            return;
        }
        var indicators = [].slice.call(slideIndicator.childNodes);
        switch (this.indicatorsType) {
            case 'Default':
            case 'Dynamic':
                attributes(indicators[parseInt(activeIndex.toString(), 10)], { 'aria-current': 'false' });
                attributes(indicators[parseInt(currentIndex.toString(), 10)], { 'aria-current': 'true' });
                removeClass(indicators, [CLS_ACTIVE, CLS_PREV_SLIDE, CLS_NEXT_SLIDE]);
                addClass([indicators[parseInt(currentIndex.toString(), 10)]], CLS_ACTIVE);
                if (indicators[currentIndex - 1]) {
                    addClass([indicators[currentIndex - 1]], CLS_PREV_SLIDE);
                }
                if (indicators[currentIndex + 1]) {
                    addClass([indicators[currentIndex + 1]], CLS_NEXT_SLIDE);
                }
                indicators.forEach(function (item) { return item.style.setProperty('--carousel-items-current', "" + _this.selectedIndex); });
                break;
            case 'Fraction':
                if (this.indicatorsTemplate) {
                    if (slideIndicator.children.length > 0) {
                        slideIndicator.removeChild(slideIndicator.firstElementChild);
                    }
                    this.renderIndicatorTemplate(slideIndicator, currentIndex + 1);
                }
                else {
                    slideIndicator.innerText = this.selectedIndex + 1 + " / " + this.slideItems.length;
                }
                break;
            case 'Progress':
                if (this.indicatorsTemplate) {
                    if (slideIndicator.children.length > 0) {
                        slideIndicator.removeChild(slideIndicator.firstElementChild);
                    }
                    this.renderIndicatorTemplate(slideIndicator, currentIndex + 1);
                }
                else {
                    slideIndicator.firstElementChild.style.setProperty('--carousel-items-current', "" + (this.selectedIndex + 1));
                }
                break;
        }
    };
    Carousel.prototype.setHtmlAttributes = function (attribute, element) {
        var keys = Object.keys(attribute);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (key === 'class') {
                addClass([element], attribute["" + key]);
            }
            else {
                element.setAttribute(key, attribute["" + key]);
            }
        }
    };
    Carousel.prototype.templateParser = function (template) {
        if (template) {
            try {
                if (typeof template !== 'function' && document.querySelectorAll(template).length) {
                    return compile(document.querySelector(template).innerHTML.trim());
                }
                else {
                    return compile(template);
                }
            }
            catch (error) {
                return compile(template);
            }
        }
        return undefined;
    };
    Carousel.prototype.getNavigatorState = function (target, isPrevious) {
        var button = target.querySelector("." + (isPrevious ? CLS_PREV_BUTTON : CLS_NEXT_BUTTON));
        if (button) {
            var buttonObj = getInstance(button, Button);
            return buttonObj.disabled;
        }
        return false;
    };
    Carousel.prototype.navigatorClickHandler = function (e) {
        var target = e.currentTarget;
        var isDisabled = this.getNavigatorState(target, target.classList.contains(CLS_PREVIOUS));
        if (isDisabled) {
            return;
        }
        var direction = target.classList.contains(CLS_PREVIOUS) ? 'Previous' : 'Next';
        this.setActiveSlide(this.getSlideIndex(direction), direction);
        this.autoSlide();
    };
    Carousel.prototype.indicatorClickHandler = function (e) {
        var target = closest(e.target, "." + CLS_INDICATOR_BAR);
        var index = parseInt(target.dataset.index, 10);
        if (this.selectedIndex !== index) {
            this.setActiveSlide(index, this.selectedIndex > index ? 'Previous' : 'Next');
            this.autoSlide();
        }
    };
    Carousel.prototype.playButtonClickHandler = function (e, isPropertyChange) {
        if (isPropertyChange === void 0) { isPropertyChange = false; }
        var playButton = this.element.querySelector("." + CLS_PLAY_BUTTON);
        if (playButton) {
            var buttonObj = getInstance(playButton, Button);
            if (!isPropertyChange) {
                this.setProperties({ autoPlay: !this.autoPlay }, true);
            }
            playButton.setAttribute('aria-label', this.localeObj.getConstant(this.autoPlay ? 'pauseSlideTransition' : 'playSlideTransition'));
            buttonObj.iconCss = CLS_ICON + ' ' + (this.autoPlay ? CLS_PAUSE_ICON : CLS_PLAY_ICON);
            buttonObj.dataBind();
            this.itemsContainer.setAttribute('aria-live', this.autoPlay ? 'off' : 'polite');
            if (this.autoPlay && !this.loop && this.selectedIndex === this.slideItems.length - 1) {
                this.setActiveSlide(0, 'Next');
            }
            this.autoSlide();
        }
    };
    Carousel.prototype.keyHandler = function (e) {
        var direction;
        var slideIndex;
        var isSlideTransition = false;
        var target = e.target;
        e.preventDefault();
        switch (e.action) {
            case 'space':
                if (this.showIndicators && target.classList.contains(CLS_INDICATOR)) {
                    target.click();
                }
                else if (target.classList.contains(CLS_CAROUSEL) || target.classList.contains(CLS_PLAY_BUTTON)) {
                    this.playButtonClickHandler(e);
                }
                else if (target.classList.contains(CLS_NEXT_BUTTON)) {
                    this.next();
                }
                else if (target.classList.contains(CLS_PREV_BUTTON)) {
                    this.prev();
                }
                break;
            case 'end':
                slideIndex = this.slideItems.length - 1;
                direction = 'Next';
                isSlideTransition = true;
                break;
            case 'home':
                slideIndex = 0;
                direction = 'Previous';
                isSlideTransition = true;
                break;
            case 'moveUp':
            case 'moveLeft':
            case 'moveDown':
            case 'moveRight':
                if (this.showIndicators && isNullOrUndefined(this.indicatorsTemplate)) {
                    this.element.focus();
                }
                direction = (e.action === 'moveUp' || e.action === 'moveLeft') ? 'Previous' : 'Next';
                slideIndex = this.getSlideIndex(direction);
                isSlideTransition = !this.isSuspendSlideTransition(slideIndex, direction);
                break;
        }
        if (isSlideTransition) {
            this.setActiveSlide(slideIndex, direction);
            this.autoSlide();
            isSlideTransition = false;
        }
    };
    Carousel.prototype.swipeHandler = function (e) {
        if (this.element.classList.contains(CLS_HOVER) || isNullOrUndefined(this.slideItems) || this.slideItems.length <= 1) {
            return;
        }
        var direction = (e.swipeDirection === 'Right') ? 'Previous' : 'Next';
        var slideIndex = this.getSlideIndex(direction);
        if (!this.isSuspendSlideTransition(slideIndex, direction)) {
            this.setActiveSlide(slideIndex, direction, true);
            this.autoSlide();
        }
    };
    Carousel.prototype.isSuspendSlideTransition = function (index, direction) {
        return !this.loop && (direction === 'Next' && index === 0 || direction === 'Previous' && index === this.slideItems.length - 1);
    };
    Carousel.prototype.handleNavigatorsActions = function (index) {
        if (this.buttonsVisibility === 'Hidden') {
            return;
        }
        if (this.showPlayButton) {
            var playButton = this.element.querySelector("." + CLS_PLAY_BUTTON);
            var isLastSlide = this.selectedIndex === this.slideItems.length - 1 && !this.loop;
            var isButtonUpdate = isNullOrUndefined(this.playButtonTemplate) && playButton && isLastSlide;
            if (isNullOrUndefined(this.playButtonTemplate) && playButton && !isLastSlide) {
                isButtonUpdate = !playButton.classList.contains(CLS_ACTIVE);
            }
            if (isButtonUpdate) {
                this.setProperties({ autoPlay: !isLastSlide }, true);
                playButton.setAttribute('aria-label', this.localeObj.getConstant(this.autoPlay ? 'pauseSlideTransition' : 'playSlideTransition'));
                this.itemsContainer.setAttribute('aria-live', this.autoPlay ? 'off' : 'polite');
                var buttonObj = getInstance(playButton, Button);
                buttonObj.iconCss = CLS_ICON + ' ' + (this.autoPlay ? CLS_PAUSE_ICON : CLS_PLAY_ICON);
                buttonObj.dataBind();
            }
        }
        var prevButton = this.element.querySelector("." + CLS_PREV_BUTTON);
        if (prevButton && isNullOrUndefined(this.previousButtonTemplate)) {
            var buttonObj = getInstance(prevButton, Button);
            buttonObj.disabled = !this.loop && index === 0;
            buttonObj.dataBind();
        }
        var nextButton = this.element.querySelector("." + CLS_NEXT_BUTTON);
        if (nextButton && isNullOrUndefined(this.nextButtonTemplate)) {
            var buttonObj = getInstance(nextButton, Button);
            buttonObj.disabled = !this.loop && index === this.slideItems.length - 1;
            buttonObj.dataBind();
        }
    };
    Carousel.prototype.onHoverActions = function (e) {
        var navigator = this.element.querySelector("." + CLS_NAVIGATORS);
        switch (e.type) {
            case 'mouseenter':
                if (this.buttonsVisibility === 'VisibleOnHover' && navigator) {
                    removeClass([].slice.call(navigator.childNodes), CLS_HOVER_ARROWS);
                }
                if (this.pauseOnHover) {
                    addClass([this.element], CLS_HOVER);
                }
                break;
            case 'mouseleave':
                if (this.buttonsVisibility === 'VisibleOnHover' && navigator) {
                    addClass([].slice.call(navigator.childNodes), CLS_HOVER_ARROWS);
                }
                removeClass([this.element], CLS_HOVER);
                break;
        }
        this.autoSlide();
    };
    Carousel.prototype.onFocusActions = function (e) {
        switch (e.type) {
            case 'focusin':
                addClass([this.element], CLS_HOVER);
                break;
            case 'focusout':
                removeClass([this.element], CLS_HOVER);
                break;
        }
        this.autoSlide();
    };
    Carousel.prototype.destroyButtons = function () {
        var buttonCollections = [].slice.call(this.element.querySelectorAll('.e-control.e-btn'));
        for (var _i = 0, buttonCollections_1 = buttonCollections; _i < buttonCollections_1.length; _i++) {
            var button = buttonCollections_1[_i];
            var instance = getInstance(button, Button);
            if (instance) {
                instance.destroy();
            }
        }
    };
    Carousel.prototype.getNumOfItems = function () {
        return this.partialVisible ? 2 : 1;
    };
    Carousel.prototype.getTranslateValue = function (element) {
        var style = getComputedStyle(element);
        return window.WebKitCSSMatrix ?
            new WebKitCSSMatrix(style.webkitTransform).m41 : 0;
    };
    Carousel.prototype.swipeStart = function (e) {
        if (!this.timeStampStart) {
            this.timeStampStart = Date.now();
        }
        this.isSwipe = false;
        this.itemsContainer.classList.add('e-swipe-start');
        this.prevPageX = e.touches ? e.touches[0].pageX : e.pageX;
        this.initialTranslate = this.getTranslateValue(this.itemsContainer);
    };
    Carousel.prototype.swiping = function (e) {
        if (!this.itemsContainer.classList.contains('e-swipe-start')) {
            return;
        }
        e.preventDefault();
        var pageX = e.touches ? e.touches[0].pageX : e.pageX;
        var positionDiff = this.prevPageX - (pageX);
        if (!this.loop && ((this.enableRtl && ((this.selectedIndex === 0 && positionDiff > 0) ||
            (this.selectedIndex === this.itemsContainer.childElementCount - 1 && positionDiff < 0))) ||
            (!this.enableRtl && ((this.selectedIndex === 0 && positionDiff < 0) ||
                (this.selectedIndex === this.itemsContainer.childElementCount - 1 && positionDiff > 0))))) {
            return;
        }
        this.itemsContainer.style.transform = "translateX(" + (this.initialTranslate + (this.enableRtl ? positionDiff : -positionDiff)) + "px)";
    };
    Carousel.prototype.swipStop = function () {
        this.isSwipe = true;
        var time = Date.now() - this.timeStampStart;
        var distanceX = this.getTranslateValue(this.itemsContainer) - this.initialTranslate;
        distanceX = distanceX < 0 ? distanceX * -1 : distanceX;
        if (this.isSwipe) {
            var offsetDist = distanceX * (Browser.isDevice ? 6 : 1.66);
            this.itemsContainer.style.transitionDuration = (((Browser.isDevice ? distanceX : offsetDist) / time) / 10) + 's';
        }
        var slideWidth = this.itemsContainer.firstElementChild.clientWidth;
        var threshold = slideWidth / 2;
        this.itemsContainer.classList.remove('e-swipe-start');
        var value = this.getTranslateValue(this.itemsContainer);
        if (value - this.initialTranslate < -threshold) {
            this.swipeNavigation(!this.enableRtl);
        }
        else if (value - this.initialTranslate > threshold) {
            this.swipeNavigation(this.enableRtl);
        }
        else {
            this.itemsContainer.style.transform = "translateX(" + this.initialTranslate + "px)";
            if (this.animationEffect === 'Fade') {
                this.itemsContainer.classList.add('e-fade-in-out');
            }
        }
    };
    Carousel.prototype.swipeNavigation = function (isRtl) {
        if (isRtl) {
            this.next();
        }
        else {
            this.prev();
        }
    };
    Carousel.prototype.swipeModehandlers = function () {
        if ((this.swipeMode & CarouselSwipeMode.Touch) === CarouselSwipeMode.Touch) {
            EventHandler.add(this.itemsContainer, 'touchstart', this.swipeStart, this);
            EventHandler.add(this.itemsContainer, 'touchmove', this.swiping, this);
            EventHandler.add(this.itemsContainer, 'touchend', this.swipStop, this);
        }
        if ((this.swipeMode & CarouselSwipeMode.Mouse) === CarouselSwipeMode.Mouse) {
            EventHandler.add(this.itemsContainer, 'mousedown', this.swipeStart, this);
            EventHandler.add(this.itemsContainer, 'mousemove', this.swiping, this);
            EventHandler.add(this.itemsContainer, 'mouseup', this.swipStop, this);
        }
        if ((this.swipeMode === 0) && (this.swipeMode & CarouselSwipeMode.Mouse & CarouselSwipeMode.Touch) ===
            (CarouselSwipeMode.Mouse & CarouselSwipeMode.Touch)) {
            EventHandler.add(this.itemsContainer, 'mousedown touchstart', this.swipeStart, this);
            EventHandler.add(this.itemsContainer, 'mousemove touchmove', this.swiping, this);
            EventHandler.add(this.itemsContainer, 'mouseup touchend', this.swipStop, this);
        }
    };
    Carousel.prototype.resizeHandler = function () {
        if (this.itemsContainer && this.itemsContainer.firstElementChild) {
            var numOfItems = this.getNumOfItems();
            var slideWidth = this.itemsContainer.firstElementChild.clientWidth;
            this.itemsContainer.style.transform = this.getTranslateX(slideWidth, this.selectedIndex + numOfItems);
        }
    };
    Carousel.prototype.wireEvents = function () {
        if (!(this.animationEffect === 'Custom')) {
            this.swipeModehandlers();
        }
        EventHandler.add(this.element, 'focusin focusout', this.onFocusActions, this);
        EventHandler.add(this.element, 'mouseenter mouseleave', this.onHoverActions, this);
        EventHandler.add(this.element.firstElementChild, 'animationend', this.onTransitionEnd, this);
        EventHandler.add(this.element.firstElementChild, 'transitionend', this.onTransitionEnd, this);
        EventHandler.add(window, 'resize', this.resizeHandler, this);
    };
    Carousel.prototype.unWireEvents = function () {
        var _this = this;
        var indicators = [].slice.call(this.element.querySelectorAll("." + CLS_INDICATOR_BAR));
        indicators.forEach(function (indicator) {
            EventHandler.remove(indicator, 'click', _this.indicatorClickHandler);
        });
        var navigators = [].slice.call(this.element.querySelectorAll("." + CLS_PREVIOUS + ",." + CLS_NEXT));
        navigators.forEach(function (navigator) {
            EventHandler.remove(navigator, 'click', _this.navigatorClickHandler);
        });
        var playIcon = this.element.querySelector("." + CLS_PLAY_PAUSE);
        if (playIcon) {
            EventHandler.remove(playIcon, 'click', this.playButtonClickHandler);
        }
        EventHandler.remove(this.element.firstElementChild, 'animationend', this.onTransitionEnd);
        EventHandler.remove(this.element.firstElementChild, 'transitionend', this.onTransitionEnd);
        EventHandler.clearEvents(this.element);
        EventHandler.clearEvents(this.itemsContainer);
        EventHandler.remove(window, 'resize', this.resizeHandler);
    };
    /**
     * Method to transit from the current slide to the previous slide.
     *
     * @returns {void}
     */
    Carousel.prototype.prev = function () {
        if (!this.loop && this.selectedIndex === 0) {
            return;
        }
        var index = (this.selectedIndex === 0) ? this.slideItems.length - 1 : this.selectedIndex - 1;
        this.setActiveSlide(index, 'Previous');
        this.autoSlide();
    };
    /**
     * Method to transit from the current slide to the next slide.
     *
     * @returns {void}
     */
    Carousel.prototype.next = function () {
        if (!this.loop && this.selectedIndex === this.slideItems.length - 1) {
            return;
        }
        var index = (this.selectedIndex === this.slideItems.length - 1) ? 0 : this.selectedIndex + 1;
        this.setActiveSlide(index, 'Next');
        this.autoSlide();
    };
    /**
     * Method to play the slides programmatically.
     *
     * @returns {void}
     */
    Carousel.prototype.play = function () {
        var playIcon = this.element.querySelector("." + CLS_PLAY_ICON);
        if (this.showPlayButton && playIcon) {
            classList(playIcon, [CLS_PAUSE_ICON], [CLS_PLAY_ICON]);
            var playButton = this.element.querySelector("." + CLS_PLAY_BUTTON);
            playButton.setAttribute('aria-label', this.localeObj.getConstant('pauseSlideTransition'));
        }
        this.setProperties({ autoPlay: true }, true);
        this.itemsContainer.setAttribute('aria-live', 'off');
        this.applySlideInterval();
    };
    /**
     * Method to pause the slides programmatically.
     *
     * @returns {void}
     */
    Carousel.prototype.pause = function () {
        var pauseIcon = this.element.querySelector("." + CLS_PAUSE_ICON);
        if (this.showPlayButton && pauseIcon) {
            var playButton = this.element.querySelector("." + CLS_PLAY_BUTTON);
            playButton.setAttribute('aria-label', this.localeObj.getConstant('playSlideTransition'));
            classList(pauseIcon, [CLS_PLAY_ICON], [CLS_PAUSE_ICON]);
        }
        this.setProperties({ autoPlay: false }, true);
        this.itemsContainer.setAttribute('aria-live', 'off');
        this.resetSlideInterval();
    };
    /**
     * Method to render react and angular templates
     *
     * @returns {void}
     * @private
     */
    Carousel.prototype.renderTemplates = function () {
        if (this.isAngular || this.isReact) {
            this.renderReactTemplates();
        }
    };
    /**
     * Method to reset react and angular templates
     *
     * @param {string[]} templates Accepts the template ID
     * @returns {void}
     * @private
     */
    Carousel.prototype.resetTemplates = function (templates) {
        if (this.isAngular || this.isReact) {
            this.clearTemplate(templates);
        }
    };
    /**
     * Method for destroy the carousel component.
     *
     * @returns {void}
     */
    Carousel.prototype.destroy = function () {
        var _this = this;
        this.resetTemplates();
        if (this.touchModule) {
            this.touchModule.destroy();
            this.touchModule = null;
        }
        this.keyModule.destroy();
        this.keyModule = null;
        this.resetSlideInterval();
        this.destroyButtons();
        this.unWireEvents();
        [].slice.call(this.element.children).forEach(function (ele) { _this.element.removeChild(ele); });
        removeClass([this.element], [CLS_CAROUSEL, this.cssClass, CLS_RTL, CLS_SWIPE]);
        ['role', 'style'].forEach(function (attr) { _this.element.removeAttribute(attr); });
        this.itemsContainer = null;
        _super.prototype.destroy.call(this);
    };
    __decorate([
        Collection([], CarouselItem)
    ], Carousel.prototype, "items", void 0);
    __decorate([
        Property('Slide')
    ], Carousel.prototype, "animationEffect", void 0);
    __decorate([
        Property()
    ], Carousel.prototype, "previousButtonTemplate", void 0);
    __decorate([
        Property()
    ], Carousel.prototype, "nextButtonTemplate", void 0);
    __decorate([
        Property()
    ], Carousel.prototype, "indicatorsTemplate", void 0);
    __decorate([
        Property()
    ], Carousel.prototype, "playButtonTemplate", void 0);
    __decorate([
        Property()
    ], Carousel.prototype, "cssClass", void 0);
    __decorate([
        Property([])
    ], Carousel.prototype, "dataSource", void 0);
    __decorate([
        Property()
    ], Carousel.prototype, "itemTemplate", void 0);
    __decorate([
        Property(0)
    ], Carousel.prototype, "selectedIndex", void 0);
    __decorate([
        Property('100%')
    ], Carousel.prototype, "width", void 0);
    __decorate([
        Property('100%')
    ], Carousel.prototype, "height", void 0);
    __decorate([
        Property(5000)
    ], Carousel.prototype, "interval", void 0);
    __decorate([
        Property(true)
    ], Carousel.prototype, "autoPlay", void 0);
    __decorate([
        Property(true)
    ], Carousel.prototype, "pauseOnHover", void 0);
    __decorate([
        Property(true)
    ], Carousel.prototype, "loop", void 0);
    __decorate([
        Property(false)
    ], Carousel.prototype, "showPlayButton", void 0);
    __decorate([
        Property(true)
    ], Carousel.prototype, "enableTouchSwipe", void 0);
    __decorate([
        Property(true)
    ], Carousel.prototype, "showIndicators", void 0);
    __decorate([
        Property('Default')
    ], Carousel.prototype, "indicatorsType", void 0);
    __decorate([
        Property('Visible')
    ], Carousel.prototype, "buttonsVisibility", void 0);
    __decorate([
        Property(false)
    ], Carousel.prototype, "partialVisible", void 0);
    __decorate([
        Property(CarouselSwipeMode.Touch)
    ], Carousel.prototype, "swipeMode", void 0);
    __decorate([
        Property()
    ], Carousel.prototype, "htmlAttributes", void 0);
    __decorate([
        Event()
    ], Carousel.prototype, "slideChanging", void 0);
    __decorate([
        Event()
    ], Carousel.prototype, "slideChanged", void 0);
    Carousel = __decorate([
        NotifyPropertyChanges
    ], Carousel);
    return Carousel;
}(Component));
export { Carousel };
