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
import { Component, NotifyPropertyChanges, Property, ChildProperty, Collection, Event } from '@syncfusion/ej2-base';
var PROGRESSVALUE = '--progress-value';
/**
 * Defines the status of the step.
 */
export var StepStatus;
(function (StepStatus) {
    /**
     * Shows the status of the step is not started.
     */
    StepStatus["NotStarted"] = "NotStarted";
    /**
     * Shows the step is in progress.
     */
    StepStatus["InProgress"] = "InProgress";
    /**
     * Shows the status of the step is completed.
     */
    StepStatus["Completed"] = "Completed";
})(StepStatus || (StepStatus = {}));
/**
 * Specifies the steps of the Stepper.
 */
var Step = /** @class */ (function (_super) {
    __extends(Step, _super);
    function Step() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('')
    ], Step.prototype, "cssClass", void 0);
    __decorate([
        Property(false)
    ], Step.prototype, "disabled", void 0);
    __decorate([
        Property('')
    ], Step.prototype, "iconCss", void 0);
    __decorate([
        Property(null)
    ], Step.prototype, "isValid", void 0);
    __decorate([
        Property('')
    ], Step.prototype, "label", void 0);
    __decorate([
        Property(false)
    ], Step.prototype, "optional", void 0);
    __decorate([
        Property(StepStatus.NotStarted)
    ], Step.prototype, "status", void 0);
    __decorate([
        Property('')
    ], Step.prototype, "text", void 0);
    return Step;
}(ChildProperty));
export { Step };
/**
 * Defines the orientation type of the Stepper.
 */
export var StepperOrientation;
(function (StepperOrientation) {
    /**
     * Steps are displayed horizontally.
     */
    StepperOrientation["Horizontal"] = "Horizontal";
    /**
     * Steps are displayed vertically.
     */
    StepperOrientation["Vertical"] = "Vertical";
})(StepperOrientation || (StepperOrientation = {}));
/**
 * StepperBase component act as base class to the stepper component.
 */
var StepperBase = /** @class */ (function (_super) {
    __extends(StepperBase, _super);
    /**
     * * Constructor for Base class
     *
     * @param {StepperBaseModel} options - Specifies the Base model.
     * @param {string | HTMLElement} element - Specifies the element to render as component.
     * @private
     */
    function StepperBase(options, element) {
        return _super.call(this, options, element) || this;
    }
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @private
     * @returns {void}
     */
    StepperBase.prototype.preRender = function () {
    };
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @private
     * @returns {string}
     */
    StepperBase.prototype.getModuleName = function () {
        return 'stepperBase';
    };
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @private
     * @returns {string}
     */
    StepperBase.prototype.getPersistData = function () {
        return this.addOnPersist([]);
    };
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @private
     * @returns {void}
     */
    StepperBase.prototype.render = function () {
    };
    StepperBase.prototype.updateOrientaion = function (wrapper) {
        if (wrapper.classList.contains('e-horizontal') || wrapper.classList.contains('e-vertical')) {
            wrapper.classList.contains('e-horizontal') ? wrapper.classList.remove('e-horizontal') : wrapper.classList.remove('e-vertical');
        }
        wrapper.classList.add('e-' + this.orientation.toLocaleLowerCase());
    };
    StepperBase.prototype.renderProgressBar = function (wrapper) {
        this.progressStep = this.createElement('div', { className: 'e-stepper-progressbar' });
        this.progressbar = this.createElement('div', { className: 'e-progressbar-value' });
        this.progressStep.appendChild(this.progressbar);
        wrapper.prepend(this.progressStep);
        this.progressbar.style.setProperty(PROGRESSVALUE, (0) + '%');
        var beforeLabel = (wrapper.querySelector('li').querySelector('.e-step-label-container'));
        if (wrapper.classList.contains('e-vertical')) {
            if (wrapper.classList.contains('e-label-bottom') || wrapper.classList.contains('e-label-top')) {
                var stepsContainer = (wrapper.querySelector('.e-stepper-steps'));
                this.progressStep.style.setProperty('--progress-position', (stepsContainer.offsetWidth / 2) + 'px');
            }
            else {
                this.progressStep.style.setProperty('--progress-position', ((this.progressBarPosition / 2) - 1) + 'px');
            }
        }
        if (beforeLabel && (beforeLabel.classList.contains('e-label-before'))) {
            this.progressStep.style.setProperty('--progress-position', (((this.progressBarPosition) - 1)) + 5 + 'px');
        }
        if (wrapper.classList.contains('e-horizontal')) {
            this.setProgressPosition(wrapper);
        }
    };
    StepperBase.prototype.setProgressPosition = function (wrapper, isResize) {
        var stepItemContainer = (wrapper.querySelector('.e-step-container'));
        var stepItemEle = stepItemContainer.firstElementChild;
        if (isResize != true) {
            var topPos = 0;
            if (wrapper.classList.contains('e-label-before')) {
                topPos = (stepItemContainer.offsetParent.offsetHeight - (stepItemEle.offsetHeight / 2) - 1);
            }
            else {
                topPos = (stepItemEle.offsetHeight / 2);
            }
            this.progressStep.style.setProperty('--progress-top-position', topPos + 'px');
        }
        var lastEle = wrapper.querySelector('.e-stepper-steps').lastChild.firstChild;
        if (wrapper.classList.contains('e-rtl')) {
            var leftPost = ((stepItemEle.offsetLeft + stepItemEle.offsetWidth) - wrapper.querySelector('.e-stepper-steps').offsetWidth);
            this.progressStep.style.setProperty('--progress-left-position', Math.abs(leftPost) + 'px');
            this.progressStep.style.setProperty('--progress-bar-width', Math.abs(lastEle.offsetLeft - stepItemEle.offsetLeft) + 'px');
        }
        else {
            this.progressStep.style.setProperty('--progress-left-position', (stepItemEle.offsetLeft + 1) + 'px');
            this.progressStep.style.setProperty('--progress-bar-width', ((lastEle.offsetWidth + lastEle.offsetLeft - 2) - (stepItemEle.offsetLeft + 2)) + 'px');
        }
    };
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @param newProp
     * @param oldProp
     * @private
     * @returns {void}
     */
    StepperBase.prototype.onPropertyChanged = function (newProp, oldProp) {
    };
    __decorate([
        Collection([], Step)
    ], StepperBase.prototype, "steps", void 0);
    __decorate([
        Property('')
    ], StepperBase.prototype, "cssClass", void 0);
    __decorate([
        Property(false)
    ], StepperBase.prototype, "readOnly", void 0);
    __decorate([
        Property(StepperOrientation.Horizontal)
    ], StepperBase.prototype, "orientation", void 0);
    __decorate([
        Event()
    ], StepperBase.prototype, "created", void 0);
    StepperBase = __decorate([
        NotifyPropertyChanges
    ], StepperBase);
    return StepperBase;
}(Component));
export { StepperBase };
