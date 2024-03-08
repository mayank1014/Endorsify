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
import { Component, getUniqueID, formatUnit, NotifyPropertyChanges, Property, attributes, removeClass, addClass } from '@syncfusion/ej2-base';
var cssClassName = {
    TEXTSHAPE: 'e-skeleton-text',
    CIRCLESHAPE: 'e-skeleton-circle',
    SQUARESHAPE: 'e-skeleton-square',
    RECTANGLESHAPE: 'e-skeleton-rectangle',
    WAVEEFFECT: 'e-shimmer-wave',
    PULSEEFFECT: 'e-shimmer-pulse',
    FADEEFFECT: 'e-shimmer-fade',
    VISIBLENONE: 'e-visible-none'
};
/**
 * Defines the shape of Skeleton.
 */
export var SkeletonType;
(function (SkeletonType) {
    /**
     * Defines the skeleton shape as text.
     */
    SkeletonType["Text"] = "Text";
    /**
     * Defines the skeleton shape as circle.
     */
    SkeletonType["Circle"] = "Circle";
    /**
     * Defines the skeleton shape as square.
     */
    SkeletonType["Square"] = "Square";
    /**
     * Defines the skeleton shape as rectangle.
     */
    SkeletonType["Rectangle"] = "Rectangle";
})(SkeletonType || (SkeletonType = {}));
/**
 * Defines the animation effect of Skeleton.
 */
export var ShimmerEffect;
(function (ShimmerEffect) {
    /**
     * Defines the animation as shimmer wave effect.
     */
    ShimmerEffect["Wave"] = "Wave";
    /**
     * Defines the animation as fade effect.
     */
    ShimmerEffect["Fade"] = "Fade";
    /**
     * Defines the animation as pulse effect.
     */
    ShimmerEffect["Pulse"] = "Pulse";
    /**
     * Defines the animation as no effect.
     */
    ShimmerEffect["None"] = "None";
})(ShimmerEffect || (ShimmerEffect = {}));
/**
 * The Shimmer is a placeholder that animates a shimmer effect to let users know that the page’s content is loading at the moment.
 * In other terms, it simulates the layout of page content while loading the actual content.
 * ```html
 * <div id="skeletonCircle"></div>
 * ```
 * ```typescript
 * <script>
 * var skeletonObj = new Skeleton({ shape: 'Circle', width: "2rem" });
 * skeletonObj.appendTo("#skeletonCircle");
 * </script>
 * ```
 */
var Skeleton = /** @class */ (function (_super) {
    __extends(Skeleton, _super);
    /**
     * Constructor for creating Skeleton component.
     *
     * @param {SkeletonModel} options - Defines the model of Skeleton class.
     * @param {HTMLElement} element - Defines the target HTML element.
     */
    function Skeleton(options, element) {
        return _super.call(this, options, element) || this;
    }
    /**
     * Get component module name.
     *
     * @returns {string} - Module name
     * @private
     */
    Skeleton.prototype.getModuleName = function () {
        return 'skeleton';
    };
    Skeleton.prototype.getPersistData = function () {
        return this.addOnPersist([]);
    };
    Skeleton.prototype.preRender = function () {
        if (!this.element.id) {
            this.element.id = getUniqueID('e-' + this.getModuleName());
        }
        this.updateCssClass();
        attributes(this.element, { role: 'alert', 'aria-busy': 'true', 'aria-live': 'polite', 'aria-label': this.label });
    };
    /**
     * Method for initialize the component rendering.
     *
     * @returns {void}
     * @private
     */
    Skeleton.prototype.render = function () {
        this.initialize();
    };
    Skeleton.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'width':
                case 'height':
                    this.updateDimension();
                    break;
                case 'shape':
                    this.updateShape();
                    break;
                case 'shimmerEffect':
                    this.updateEffect();
                    break;
                case 'visible':
                    this.updateVisibility();
                    break;
                case 'label':
                    this.element.setAttribute('aria-label', this.label);
                    break;
                case 'cssClass':
                    if (oldProp.cssClass) {
                        removeClass([this.element], oldProp.cssClass.split(' '));
                    }
                    this.updateCssClass();
                    break;
            }
        }
    };
    /**
     * Method to destroys the Skeleton component.
     *
     * @returns {void}
     */
    Skeleton.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        var attrs = ['role', 'aria-live', 'aria-busy', 'aria-label'];
        var cssClass = [];
        if (this.cssClass) {
            cssClass = cssClass.concat(this.cssClass.split(' '));
        }
        for (var i = 0; i < attrs.length; i++) {
            this.element.removeAttribute(attrs[parseInt(i.toString(), 10)]);
        }
        cssClass = cssClass.concat(this.element.classList.value.match(/(e-skeleton-[^\s]+)/g));
        cssClass = cssClass.concat(this.element.classList.value.match(/(e-shimmer-[^\s]+)/g));
        removeClass([this.element], cssClass);
    };
    Skeleton.prototype.initialize = function () {
        this.updateShape();
        this.updateEffect();
        this.updateVisibility();
    };
    Skeleton.prototype.updateShape = function () {
        var shapeCss = cssClassName[this.shape.toUpperCase() + 'SHAPE'];
        var removeCss = this.element.classList.value.match(/(e-skeleton-[^\s]+)/g);
        this.updateDimension();
        if (removeCss) {
            removeClass([this.element], removeCss);
        }
        addClass([this.element], [shapeCss]);
    };
    Skeleton.prototype.updateDimension = function () {
        var width = (!this.width && (['Text', 'Rectangle'].indexOf(this.shape) > -1)) ? '100%' : formatUnit(this.width);
        var height = ['Circle', 'Square'].indexOf(this.shape) > -1 ? width : formatUnit(this.height);
        this.element.style.width = width;
        this.element.style.height = height;
    };
    Skeleton.prototype.updateEffect = function () {
        var removeCss = this.element.classList.value.match(/(e-shimmer-[^\s]+)/g);
        if (removeCss) {
            removeClass([this.element], removeCss);
        }
        addClass([this.element], [cssClassName[this.shimmerEffect.toUpperCase() + 'EFFECT']]);
    };
    Skeleton.prototype.updateVisibility = function () {
        this.element.classList[this.visible ? 'remove' : 'add'](cssClassName.VISIBLENONE);
    };
    Skeleton.prototype.updateCssClass = function () {
        if (this.cssClass) {
            addClass([this.element], this.cssClass.split(' '));
        }
    };
    __decorate([
        Property('')
    ], Skeleton.prototype, "width", void 0);
    __decorate([
        Property('')
    ], Skeleton.prototype, "height", void 0);
    __decorate([
        Property(true)
    ], Skeleton.prototype, "visible", void 0);
    __decorate([
        Property('Text')
    ], Skeleton.prototype, "shape", void 0);
    __decorate([
        Property('Wave')
    ], Skeleton.prototype, "shimmerEffect", void 0);
    __decorate([
        Property('Loading...')
    ], Skeleton.prototype, "label", void 0);
    __decorate([
        Property('')
    ], Skeleton.prototype, "cssClass", void 0);
    Skeleton = __decorate([
        NotifyPropertyChanges
    ], Skeleton);
    return Skeleton;
}(Component));
export { Skeleton };
