import { Component, INotifyPropertyChanged, ChildProperty, EmitType } from '@syncfusion/ej2-base';
import { StepperBaseModel, StepModel } from './stepper-base-model';
/**
 * Defines the status of the step.
 */
export declare enum StepStatus {
    /**
     * Shows the status of the step is not started.
     */
    NotStarted = "NotStarted",
    /**
     * Shows the step is in progress.
     */
    InProgress = "InProgress",
    /**
     * Shows the status of the step is completed.
     */
    Completed = "Completed"
}
/**
 * Specifies the steps of the Stepper.
 */
export declare class Step extends ChildProperty<Step> {
    /**
     * Defines the CSS class to customize the step appearance.
     *
     * @default ''
     */
    cssClass: string;
    /**
     * Defines whether a step is enabled or disabled.
     *
     * @default false
     */
    disabled: boolean;
    /**
     * Defines the icon content of the step.
     *
     * @default ''
     */
    iconCss: string;
    /**
     * Defines the state whether it is valid completion or not.
     *
     * @aspType bool?
     * @default null
     */
    isValid: boolean;
    /**
     * Defines the label content of the step.
     *
     * @default ''
     */
    label: string;
    /**
     * Defines whether the step is optionally to skip completion or not.
     *
     * @default false
     */
    optional: boolean;
    /**
     * Defines the status of the step.
     * The possible values are
     * * NotStarted
     * * InProgress
     * * Completed
     *
     * @isenumeration true
     * @default StepStatus.NotStarted
     * @asptype StepStatus
     */
    status: string | StepStatus;
    /**
     * Defines the text content of the step.
     *
     * @default ''
     */
    text: string;
}
/**
 * Defines the orientation type of the Stepper.
 */
export declare enum StepperOrientation {
    /**
     * Steps are displayed horizontally.
     */
    Horizontal = "Horizontal",
    /**
     * Steps are displayed vertically.
     */
    Vertical = "Vertical"
}
/**
 * StepperBase component act as base class to the stepper component.
 */
export declare class StepperBase extends Component<HTMLElement> implements INotifyPropertyChanged {
    /**
     * Defines the list of steps.
     *
     * @default []
     */
    steps: StepModel[];
    /**
     * Defines the CSS class to customize the Stepper appearance.
     *
     * @default ''
     */
    cssClass: string;
    /**
     * Defines whether the read-only mode is enabled for a Stepper control, which means that the user will not be able to interact with it.
     *
     * @default false
     */
    readOnly: boolean;
    /**
     * Defines the orientation type of the Stepper.
     *
     * The possible values are:
     * * Horizontal
     * * vertical
     *
     * @isenumeration true
     * @default StepperOrientation.Horizontal
     * @asptype StepperOrientation
     */
    orientation: string | StepperOrientation;
    /**
     * Event callback that is raised after rendering the stepper.
     *
     * @event created
     */
    created: EmitType<Event>;
    protected progressStep: HTMLElement;
    protected progressbar: HTMLElement;
    protected progressBarPosition: number;
    /**
     * * Constructor for Base class
     *
     * @param {StepperBaseModel} options - Specifies the Base model.
     * @param {string | HTMLElement} element - Specifies the element to render as component.
     * @private
     */
    constructor(options?: StepperBaseModel, element?: string | HTMLElement);
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @private
     * @returns {void}
     */
    protected preRender(): void;
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @private
     * @returns {string}
     */
    getModuleName(): string;
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @private
     * @returns {string}
     */
    protected getPersistData(): string;
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @private
     * @returns {void}
     */
    protected render(): void;
    protected updateOrientaion(wrapper: HTMLElement): void;
    protected renderProgressBar(wrapper: HTMLElement): void;
    protected setProgressPosition(wrapper: HTMLElement, isResize?: boolean): void;
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @param newProp
     * @param oldProp
     * @private
     * @returns {void}
     */
    onPropertyChanged(newProp: StepperBaseModel, oldProp: StepperBaseModel): void;
}
