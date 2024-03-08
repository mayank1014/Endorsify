/// <reference path="../stepper-base/stepper-base-model.d.ts" />
import { INotifyPropertyChanged, ChildProperty, EmitType, BaseEventArgs } from '@syncfusion/ej2-base';
import { StepperBase } from '../stepper-base/stepper-base';
import { StepperModel, StepperAnimationSettingsModel } from '../stepper';
/**
 * Defines the step progress animation of the Stepper.
 */
export declare class StepperAnimationSettings extends ChildProperty<StepperAnimationSettings> {
    /**
     * Defines whether a animation is enabled or disabled.
     *
     * @default true
     */
    enable: boolean;
    /**
     * duration in milliseconds
     *
     * @default 2000
     * @aspType int
     */
    duration: number;
    /**
     * delay in milliseconds
     *
     * @default 0
     * @aspType int
     */
    delay: number;
}
/**
 * Defines the label position in the Stepper.
 */
export declare enum StepLabelPosition {
    /**
     * Displays the label on top position regardless of the Stepper's orientation.
     */
    Top = "Top",
    /**
     * Displays the label on bottom position regardless of the Stepper's orientation.
     */
    Bottom = "Bottom",
    /**
     * Displays the label on left side regardless of the Stepper's orientation.
     */
    Start = "Start",
    /**
     * Displays the label on right side regardless of the Stepper's orientation.
     */
    End = "End"
}
/**
 * Defines whether steps are display with only indicator, only labels or combination of both.
 */
export declare enum StepType {
    /**
     * Steps are shown indicator with label defined.
     */
    Default = "Default",
    /**
     * Steps are shown with only label.
     */
    Label = "Label",
    /**
     * Steps are shown with only indicator.
     */
    Indicator = "Indicator"
}
/**
 * Provides information about stepChanged event callback.
 */
export interface StepperChangedEventArgs extends BaseEventArgs {
    /**
     * Provides the original event.
     */
    event: Event;
    /**
     * Provides whether the change is triggered by user interaction.
     */
    isInteracted: boolean;
    /**
     * Provides the index of the previous step.
     */
    previousStep: number;
    /**
     * Provides the index of the current step.
     */
    activeStep: number;
    /**
     * Provides the stepper element.
     */
    element: HTMLElement;
}
/**
 * Provides information about stepChanging event callback.
 */
export interface StepperChangingEventArgs extends StepperChangedEventArgs {
    /**
     * Provides whether the change has been prevented or not. Default value is false.
     */
    cancel: boolean;
}
/**
 * Provides information about stepClick event callback.
 */
export interface StepperClickEventArgs extends BaseEventArgs {
    /**
     * Provides the original event.
     */
    event: Event;
    /**
     * Provides the index of the previous step.
     */
    previousStep: number;
    /**
     * Provides the index of the current step.
     */
    activeStep: number;
    /**
     * Provides the stepper element.
     */
    element: HTMLElement;
}
/**
 * Provides information about beforeStepRender event callback.
 */
export interface StepperRenderingEventArgs extends BaseEventArgs {
    /**
     * Provides the stepper element.
     */
    element: HTMLElement;
    /**
     * Provides the index of the current step.
     */
    index: number;
}
/**
 * The Stepper component visualizes several steps and indicates the current progress by highlighting already completed steps.
 *
 * ```html
 * <nav id="stepper"></nav>
 * ```
 * ```typescript
 * <script>
 *   let stepperObj: Stepper = new Stepper({steps : [{}, {}, {}, {}, {}]});
 *   stepperObj.appendTo('#stepper');
 * </script>
 * ```
 */
export declare class Stepper extends StepperBase implements INotifyPropertyChanged {
    /**
     * Defines the current step index of the Stepper.
     *
     * {% codeBlock src='stepper/activeStep/index.md' %}{% endcodeBlock %}
     *
     * @default 0
     * @aspType int
     */
    activeStep: number;
    /**
     * Defines the step progress animation of the Stepper.
     *
     * {% codeBlock src='stepper/animation/index.md' %}{% endcodeBlock %}
     *
     */
    animation: StepperAnimationSettingsModel;
    /**
     * Defines whether allows to complete one step in order to move to the next or not.
     *
     * {% codeBlock src='stepper/linear/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    linear: boolean;
    /**
     * Defines a value that defines whether to show tooltip or not on each step.
     *
     * @default false
     */
    showTooltip: boolean;
    /**
     * Defines the template content for each step.
     *
     * {% codeBlock src='stepper/template/index.md' %}{% endcodeBlock %}
     *
     * @default ''
     * @aspType string
     */
    template: string | Function;
    /**
     * Defines the template content for the tooltip.
     *
     * @default ''
     * @aspType string
     */
    tooltipTemplate: string | Function;
    /**
     * Defines the label position in the Stepper.
     *
     * The possible values are:
     * * Top
     * * Bottom
     * * Start
     * * End
     *
     * {% codeBlock src='stepper/labelPosition/index.md' %}{% endcodeBlock %}
     *
     * @isenumeration true
     * @default StepLabelPosition.Bottom
     * @asptype StepLabelPosition
     */
    labelPosition: string | StepLabelPosition;
    /**
     * Defines whether steps are display with only indicator, only labels or combination of both.
     *
     * The possible values are:
     * * Default
     * * Label
     * * Indicator
     *
     * {% codeBlock src='stepper/stepType/index.md' %}{% endcodeBlock %}
     *
     * @isenumeration true
     * @default StepType.Default
     * @asptype StepType
     */
    stepType: string | StepType;
    /**
     * Event triggers after active step changed.
     *
     * @event stepChanged
     */
    stepChanged: EmitType<StepperChangedEventArgs>;
    /**
     * Event triggers before active step change.
     *
     * @event stepChanging
     */
    stepChanging: EmitType<StepperChangingEventArgs>;
    /**
     * Event triggers when clicked on step.
     *
     * @event stepClick
     */
    stepClick: EmitType<StepperClickEventArgs>;
    /**
     * Event triggers before rendering each step.
     *
     * @event beforeStepRender
     */
    beforeStepRender: EmitType<StepperRenderingEventArgs>;
    private stepperItemList;
    private stepperItemContainer;
    private labelContainer;
    private textContainer;
    private stepperItemElements;
    private beforeLabelWidth;
    private textEleWidth;
    private tooltipObj;
    private tooltipOpen;
    private isReact?;
    private templateFunction;
    private keyboardModuleStepper;
    private keyConfigs;
    private l10n;
    private isKeyNavFocus;
    private isAngular;
    /**
     * * Constructor for creating the Stepper component.
     *
     * @param {StepperModel} options - Specifies the Stepper model.
     * @param {string | HTMLElement} element - Specifies the element to render as component.
     * @private
     */
    constructor(options?: StepperModel, element?: string | HTMLElement);
    protected preRender(): void;
    /**
     * To get component name.
     *
     * @returns {string} - Module Name
     * @private
     */
    getModuleName(): string;
    protected render(): void;
    private initialize;
    private updatePosition;
    private renderDefault;
    private updateAnimation;
    private updateStepType;
    private wireEvents;
    private updateStepFocus;
    private updateStepperStatus;
    private updateStatusClass;
    private renderItems;
    private calculateProgressBarPosition;
    private checkValidState;
    private updateCurrentLabel;
    private updateLabelPosition;
    private clearLabelPosition;
    private checkValidStep;
    private updateTooltip;
    private wireItemsEvents;
    private openStepperTooltip;
    private closeStepperTooltip;
    private updateTooltipContent;
    private stepClickHandler;
    private updateTemplateFunction;
    private renderItemContent;
    private removeItemContent;
    private updateContent;
    /**
     * Gets template content based on the template property value.
     *
     * @param {string | Function} template - Template property value.
     * @returns {Function} - Return template function.
     * @hidden
     */
    private getTemplateFunction;
    private navigateToStep;
    private navigationHandler;
    private removeItemElements;
    nextStep(): void;
    previousStep(): void;
    reset(): void;
    private updateElementClassArray;
    destroy(): void;
    private wireKeyboardEvent;
    private keyActionHandler;
    private handleNavigation;
    private renderStepperItems;
    /**
     * Called internally if any of the property value changed.
     *
     * @param  {StepperModel} newProp - Specifies new properties
     * @param  {StepperModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    onPropertyChanged(newProp: StepperModel, oldProp?: StepperModel): void;
}
