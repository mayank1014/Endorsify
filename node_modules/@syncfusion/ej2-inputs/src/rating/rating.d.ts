import { BaseEventArgs, Component, EmitType, INotifyPropertyChanged } from '@syncfusion/ej2-base';
import { RatingModel } from './rating-model';
/**
 * Defines where to position the label in rating
 */
export declare enum LabelPosition {
    /**
     * The label is positioned at the top center of the rating component.
     */
    Top = "Top",
    /**
     * The label is positioned at the bottom center of the rating component.
     */
    Bottom = "Bottom",
    /**
     * The label is positioned at the left side of the rating component.
     */
    Left = "Left",
    /**
     * The label is positioned at the right side of the rating component.
     */
    Right = "Right"
}
/**
 * Defines the precision type of the rating.
 * It is used to component the granularity of the rating, allowing users to provide ratings with varying levels of precision.
 */
export declare enum PrecisionType {
    /**
     * The rating is increased in whole number increments.
     */
    Full = "Full",
    /**
     * The rating is increased in increments of 0.5 (half).
     */
    Half = "Half",
    /**
     * The rating is increased in increments of 0.25 (quarter).
     */
    Quarter = "Quarter",
    /**
     * The rating is increased in increments of 0.1.
     */
    Exact = "Exact"
}
/**
 * Provides information about valueChanged event callback
 */
export interface RatingChangedEventArgs extends BaseEventArgs {
    /**
     * Provides the original event
     */
    event: Event;
    /**
     * Provides whether the change is triggered by user interaction.
     */
    isInteracted: boolean;
    /**
     * Provides the previous value.
     */
    previousValue: number;
    /**
     * Provides the current value.
     */
    value: number;
}
/**
 * Provides information about onItemHover event callback.
 */
export interface RatingHoverEventArgs extends BaseEventArgs {
    /**
     * Provides the rating item element reference.
     */
    element: HTMLElement;
    /**
     * Provides the original event.
     */
    event: Event;
    /**
     * Provides the hover value at hovered point of rating.
     */
    value: number;
}
/**
 * Provides information about beforeItemRender event callback.
 */
export interface RatingItemEventArgs extends BaseEventArgs {
    /**
     * Provides the rating item element reference.
     */
    element: HTMLElement;
    /**
     * Provides the place value of the item.
     */
    value: number;
}
/**
 * The Rating component allows the user to rate something by clicking on a set of symbols on a numeric scale.
 * This allows users to provide feedback or ratings for products, services, or content.
 *
 * ```html
 * <input id="rating">
 * ```
 * ```typescript
 * <script>
 *   let ratingObj: Rating = new Rating();
 *   ratingObj.appendTo('#rating');
 * </script>
 * ```
 */
export declare class Rating extends Component<HTMLElement> implements INotifyPropertyChanged {
    /**
     * Defines whether to show or hide the reset button in a rating component.
     * When set to "true", the reset button will be visible to the user, and they will be able to click it to reset the rating value to its default value.
     *
     * {% codeBlock src='rating/allowReset/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    allowReset: boolean;
    /**
     * Defines one or more CSS classes that can be used to customize the appearance of a rating component.
     * One or more CSS classes to customize the appearance of the rating component, such as by changing its colors, fonts, sizes, or other visual aspects.
     *
     * @default ''
     */
    cssClass: string;
    /**
     * Defines whether a rating component is enabled or disabled.
     * A disabled rating component may have a different visual appearance than an enabled one.
     * When set to "true", the rating component will be disabled, and the user will not be able to interact with it.
     *
     * @default false
     */
    disabled: boolean;
    /**
     * Defines the template that defines the appearance of each un-rated item in a rating component.
     *
     * @default ''
     * @angularType string | object
     * @reactType string | function | JSX.Element
     * @vueType string | function
     * @aspType string
     */
    emptyTemplate: string | Function;
    /**
     * Defines whether to add animation (to provide visual feedback to the user) when an item in a rating component is hovered.
     * When set to "true", an animation will be added when the user hovers their cursor over an item in the rating component.
     *
     * @default true
     */
    enableAnimation: boolean;
    /**
     * Defines whether to select all the items before the selected item should be in selected state in a rating component.
     * When set to "true", only the selected item will be in the selected state, and all other items will be un-selected.
     * When set to "false", all items before the selected one will be in the selected state.
     *
     * @default false
     */
    enableSingleSelection: boolean;
    /**
     * Defines the template that defines the appearance of each rated item in a rating component.
     *
     * {% codeBlock src='rating/fullTemplate/index.md' %}{% endcodeBlock %}
     *
     * @default ''
     * @angularType string | object
     * @reactType string | function | JSX.Element
     * @vueType string | function
     * @aspType string
     */
    fullTemplate: string | Function;
    /**
     * Defines the specific number of items (symbols) in rating component.
     * The rating component typically consists of a number of items, such as stars or other symbols, that represent the rating value.
     *
     * @default 5
     * @aspType int
     */
    itemsCount: number;
    /**
     * Defines the position of the label in rating component.
     *
     * The possible values are:
     * * Top
     * * Bottom
     * * Left
     * * Right
     *
     * {% codeBlock src='rating/labelPosition/index.md' %}{% endcodeBlock %}
     *
     * @isenumeration true
     * @default LabelPosition.Right
     * @asptype LabelPosition
     */
    labelPosition: string | LabelPosition;
    /**
     * Defines the template that used as label over default label of the rating. The current value of rating passed as context to build the content.
     *
     * {% codeBlock src='rating/labelTemplate/index.md' %}{% endcodeBlock %}
     *
     * @default ''
     * @angularType string | object
     * @reactType string | function | JSX.Element
     * @vueType string | function
     * @aspType string
     */
    labelTemplate: string | Function;
    /**
     * Defines the value that specifies minimum rating that a user can select.
     * The value is set to 0, which means that the minimum possible rating is 0.
     *
     * @default 0.0
     * @aspType double
     */
    min: number;
    /**
     * Defines the precision type of the rating which used to component the granularity of the rating,
     * allowing users to provide ratings with varying levels of precision.
     *
     * The possible values are:
     * * Full
     * * Half
     * * Quarter
     * * Exact
     *
     * {% codeBlock src='rating/precision/index.md' %}{% endcodeBlock %}
     *
     * @isenumeration true
     * @default PrecisionType.Full
     * @asptype PrecisionType
     */
    precision: string | PrecisionType;
    /**
     * Defines a boolean value that specifies whether the read-only mode is enabled for a rating component,
     * which prevents the user from modifying or interacting with the rating value but allows them to read it.
     *
     * @default false
     */
    readOnly: boolean;
    /**
     * Defines a value that specifies whether to display a label that shows the current value of a rating.
     * When set to "true", a label will be displayed that shows the current value of the rating; otherwise false.
     *
     * {% codeBlock src='rating/showLabel/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    showLabel: boolean;
    /**
     * Defines a value that defines whether to show tooltip for the items.
     * When set to "true", show tooltip for the items.
     *
     * @default true
     */
    showTooltip: boolean;
    /**
     * Defines the template that used as tooltip content over default tooltip content of the rating.
     * The current value of rating passed as context to build the content.
     *
     * {% codeBlock src='rating/tooltipTemplate/index.md' %}{% endcodeBlock %}
     *
     * @default ''
     * @angularType string | object
     * @reactType string | function | JSX.Element
     * @vueType string | function
     * @aspType string
     */
    tooltipTemplate: string | Function;
    /**
     * Defines the current rating value which used to display and update the rating selected by the user.
     * Based on "PrecisionType", users can select ratings with varying levels of precision.
     * The "value" is a decimal value that ranges from the minimum value to the items count,
     * as specified by the "min" and "itemsCount" properties of the rating.
     *
     * {% codeBlock src='rating/value/index.md' %}{% endcodeBlock %}
     *
     * @default 0.0
     * @aspType double
     */
    value: number;
    /**
     * Defines a value that indicates whether the rating component is visible or hidden.
     * When set to "true", if the rating component is visible.
     *
     * @default true
     */
    visible: boolean;
    /**
     * Event callback that is raised before rendering each item.
     *
     * {% codeBlock src='rating/beforeItemRenderEvent/index.md' %}{% endcodeBlock %}
     *
     * @event beforeItemRender
     */
    beforeItemRender: EmitType<RatingItemEventArgs>;
    /**
     * Event callback that is raised after rendering the rating.
     *
     * @event created
     */
    created: EmitType<Event>;
    /**
     * Event callback that is raised when a user hovers over an item.
     *
     * {% codeBlock src='rating/onItemHoverEvent/index.md' %}{% endcodeBlock %}
     *
     * @event onItemHover
     */
    onItemHover: EmitType<RatingHoverEventArgs>;
    /**
     * Event callback that is raised when the value is changed.
     *
     * {% codeBlock src='rating/valueChangedEvent/index.md' %}{% endcodeBlock %}
     *
     * @event valueChanged
     */
    valueChanged: EmitType<RatingChangedEventArgs>;
    private wrapper;
    private ratingItemList;
    private spanLabel;
    private itemElements;
    private resetElement;
    private keyboardModuleRating;
    private keyConfigs;
    private tooltipObj;
    private currentValue;
    private emptyTemplateFunction;
    private fullTemplateFunction;
    private tooltipOpen;
    private isReact?;
    private isTouchSelected;
    private isAngular;
    /**
     * Constructor for creating the widget
     *
     * @param  {RatingModel} options - Specifies the rating model
     * @param  {string|HTMLButtonElement} element - Specifies the target element
     */
    constructor(options?: RatingModel, element?: string | HTMLInputElement);
    protected preRender(): void;
    render(): void;
    private initialize;
    private updateDisabled;
    private updateResetButton;
    private renderItemList;
    private touchMoveHandler;
    private touchEndHandler;
    private updateTemplateFunction;
    private renderItems;
    private renderItemContent;
    private removeItemContent;
    private updateTooltip;
    private updateMinValue;
    private validateValue;
    private getRatingValue;
    private updateItemValue;
    private updateItemContent;
    private updateTooltipContent;
    private getTemplateString;
    private displayLabel;
    private updateLabel;
    private updateReset;
    private updateLabelPosition;
    private clearLabelPosition;
    private wireItemsEvents;
    private clickHandler;
    private updateValueChange;
    private triggerChange;
    private mouseMoveHandler;
    private openRatingTooltip;
    private closeRatingTooltip;
    private updateCurrentValue;
    private mouseLeaveHandler;
    private calculateCurrentValue;
    /**
     * Reset’s the value to minimum.
     *
     * {% codeBlock src='rating/reset/index.md' %}{% endcodeBlock %}
     *
     * @returns {void}
     */
    reset(): void;
    private resetClicked;
    private wireKeyboardEvent;
    private keyActionHandler;
    private handleNavigation;
    private updateContent;
    /**
     * To get component name.
     *
     * @returns {string} - Module Name
     * @private
     */
    getModuleName(): string;
    /**
     * To get the properties to be maintained in the persisted state.
     *
     * @returns {string} - Persist data
     */
    protected getPersistData(): string;
    private removeItemElements;
    /**
     * Destroys the Rating instance.
     *
     * @returns {void}
     */
    destroy(): void;
    /**
     * Called internally if any of the property value changed.
     *
     * @param  {RatingModel} newProp - Specifies new properties
     * @param  {RatingModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    onPropertyChanged(newProp: RatingModel, oldProp?: RatingModel): void;
}
