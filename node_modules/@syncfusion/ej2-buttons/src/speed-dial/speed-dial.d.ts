import { BaseEventArgs, EmitType, ChildProperty, Component, INotifyPropertyChanged } from '@syncfusion/ej2-base';
import { SpeedDialItemModel, SpeedDialModel, RadialSettingsModel, SpeedDialAnimationSettingsModel } from './speed-dial-model';
import { FabPosition } from './../floating-action-button/index';
import { IconPosition } from './../button/index';
/**
 * Defines the display mode of speed dial action items in SpeedDial
 */
export declare enum SpeedDialMode {
    /**
     * SpeedDial items are displayed in linear order like list.
     */
    Linear = "Linear",
    /**
     * SpeedDial items are displayed like radial menu in radial direction (circular direction).
     */
    Radial = "Radial"
}
/**
 * Defines the speed dial action items display direction when mode is Linear.
 */
export declare enum LinearDirection {
    /**
     * Speed dial action items are displayed vertically above the button of Speed Dial.
     */
    Up = "Up",
    /**
     * Speed dial action items are displayed vertically below the button of Speed Dial.
     */
    Down = "Down",
    /**
     * Speed dial action items are displayed horizontally on the button's right side.
     */
    Right = "Right",
    /**
     * Speed dial action items are displayed horizontally on the button's left side.
     */
    Left = "Left",
    /**
     * Speed dial action items are displayed vertically above or below the button of Speed Dial based on the position.
     * If Position is TopRight, TopLeft, TopCenter, the items are displayed vertically below the button else above the button.
     */
    Auto = "Auto"
}
/**
 * Defines the speed dial action items  order, when mode is Radial.
 */
export declare enum RadialDirection {
    /**
     * SpeedDial items are arranged in clockwise direction.
     */
    Clockwise = "Clockwise",
    /**
     * SpeedDial items are shown in anti-clockwise direction.
     */
    AntiClockwise = "AntiClockwise",
    /**
     * SpeedDial items are shown clockwise or anti-clockwise based on the position.
     */
    Auto = "Auto"
}
/**
 * Defines the animation effect applied when open and close the speed dial items.
 */
export declare enum SpeedDialAnimationEffect {
    /**
     * SpeedDial open/close actions occur with the Fade animation effect.
     */
    Fade = "Fade",
    /**
     * SpeedDial open/close actions occur with the FadeZoom animation effect.
     */
    FadeZoom = "FadeZoom",
    /**
     * SpeedDial open/close actions occur with the FlipLeftDown animation effect.
     */
    FlipLeftDown = "FlipLeftDown",
    /**
     * SpeedDial open/close actions occur with the FlipLeftUp animation effect.
     */
    FlipLeftUp = "FlipLeftUp",
    /**
     * SpeedDial open/close actions occur with the FlipRightDown animation effect.
     */
    FlipRightDown = "FlipRightDown",
    /**
     * SpeedDial open/close actions occur with the FlipRightUp animation effect.
     */
    FlipRightUp = "FlipRightUp",
    /**
     * SpeedDial open/close actions occur with the FlipXDown animation effect.
     */
    FlipXDown = "FlipXDown",
    /**
     * SpeedDial open/close actions occur with the FlipXUp animation effect.
     */
    FlipXUp = "FlipXUp",
    /**
     * SpeedDial open/close actions occur with the FlipYLeft animation effect.
     */
    FlipYLeft = "FlipYLeft",
    /**
     * SpeedDial open/close actions occur with the FlipYRight animation effect.
     */
    FlipYRight = "FlipYRight",
    /**
     * SpeedDial open/close actions occur with the SlideBottom animation effect.
     */
    SlideBottom = "SlideBottom",
    /**
     * SpeedDial open/close actions occur with the SlideLeft animation effect.
     */
    SlideLeft = "SlideLeft",
    /**
     * SpeedDial open/close actions occur with the SlideRight animation effect.
     */
    SlideRight = "SlideRight",
    /**
     * SpeedDial open/close actions occur with the SlideTop animation effect.
     */
    SlideTop = "SlideTop",
    /**
     * SpeedDial open/close actions occur with the Zoom animation effect.
     */
    Zoom = "Zoom",
    /**
     * SpeedDial open/close actions occur without any animation effect.
     */
    None = "None"
}
/**
 * Provides information about the beforeOpen and beforeClose event callback.
 */
export interface SpeedDialBeforeOpenCloseEventArgs extends BaseEventArgs {
    /**
     * Provides the popup element of the speed dial.
     */
    element: HTMLElement;
    /**
     * Provides the original event which triggered the open/close action of speed dial.
     */
    event: Event;
    /**
     * Defines whether the to cancel the open/close action of speed dial.
     */
    cancel: boolean;
}
/**
 * Provides information about the open  and close event callback.
 */
export interface SpeedDialOpenCloseEventArgs extends BaseEventArgs {
    /**
     * Provides the popup element of the speed dial.
     */
    element: HTMLElement;
}
/**
 * Provides information about the beforeItemRender  and clicked event callback.
 */
export interface SpeedDialItemEventArgs extends BaseEventArgs {
    /**
     * Provides speed dial item element.
     */
    element: HTMLElement;
    /**
     * Provides speed dial item.
     */
    item: SpeedDialItemModel;
    /**
     * Provides the original event.
     */
    event?: Event;
}
/**
 * AProvides options to customize the animation applied while opening and closing the popup of SpeedDial.
 */
export declare class SpeedDialAnimationSettings extends ChildProperty<SpeedDialAnimationSettings> {
    /**
     * Defines  the type of animation effect used for opening and closing of the Speed Dial items.
     *
     * @isenumeration true
     * @default SpeedDialAnimationEffect.Fade
     * @asptype SpeedDialAnimationEffect
     */
    effect: string | SpeedDialAnimationEffect;
    /**
     * Defines the duration in milliseconds that the animation takes to open or close the popup.
     *
     * @default 400
     * @aspType int
     */
    duration: number;
    /**
     * Defines the delay before starting the animation.
     *
     * @default 0
     * @aspType int
     */
    delay: number;
}
/**
 * Provides the options to customize the speed dial action buttons when mode of SpeedDial is Radial.
 */
export declare class RadialSettings extends ChildProperty<RadialSettings> {
    /**
     * Defines speed dial action items placement order.
     * The possible values are
     * * Clockwise
     * * AntiClockwise
     * * Auto
     *
     * @isenumeration true
     * @default RadialDirection.Auto
     * @asptype RadialDirection
     */
    direction: string | RadialDirection;
    /**
     * Defines end angle of speed dial items placement. The accepted value range is 0 to 360.
     * When a value is outside the accepted value range, then the provided value is ignored, and the angle is calculated based on the position.
     *
     * @default -1
     * @aspType int
     */
    endAngle: number;
    /**
     * Defines distance of speed dial items placement from the button of Speed Dial.
     *
     * @default '100px'
     * @aspType string
     */
    offset: string | number;
    /**
     * Defines start angle of speed dial items placement. The accepted value range is 0 to 360.
     * When a value is outside the accepted value range, then the provided value is ignored, and the angle is calculated based on the position.
     *
     * @default -1
     * @aspType int
     */
    startAngle: number;
}
/**
 * Defines the items of Floating Action Button.
 */
export declare class SpeedDialItem extends ChildProperty<SpeedDialItem> {
    /**
     * Defines one or more CSS classes to include an icon or image in speed dial item.
     *
     * @default ''
     */
    iconCss: string;
    /**
     * Defines a unique value for the SpeedDialItem which can be used to identify the item in event args.
     *
     * @default ''
     */
    id: string;
    /**
     * Defines the text content of SpeedDialItem.
     * Text won't be visible when mode is Radial.
     * Also, in Linear mode, text won't be displayed when direction is Left or Right.
     *
     * @default ''
     */
    text: string;
    /**
     * Defines the title of SpeedDialItem to display tooltip.
     *
     * @default ''
     */
    title: string;
    /**
     * Defines whether to enable or disable the SpeedDialItem.
     *
     * @default false
     */
    disabled: boolean;
}
/**
 * The SpeedDial component that appears in front of all the contents of the page and displays list of action buttons on click which is an extended version of FAB.
 * The button of speed dial is positioned in relative to a view port of browser or the .
 * It can display a menu of related actions or a custom content popupTemplate>.
 *
 */
export declare class SpeedDial extends Component<HTMLButtonElement> implements INotifyPropertyChanged {
    /**
     * Provides options to customize the animation applied while opening and closing the popup of speed dial
     * {% codeBlock src='speeddial/animation/index.md' %}{% endcodeBlock %}
     *
     * @default { effect: 'Fade', duration: 400, delay: 0 }
     */
    animation: SpeedDialAnimationSettingsModel;
    /**
     * Defines the content for the button of SpeedDial.
     *
     * @default ''
     */
    content: string;
    /**
     * Defines one or more CSS classes to include an icon or image to denote the speed dial is opened and displaying menu items.
     *
     * @default ''
     */
    closeIconCss: string;
    /**
     * Defines one or more CSS classes to customize the appearance of SpeedDial.
     *
     * @default ''
     */
    cssClass: string;
    /**
     * Defines the speed dial item display direction when mode is linear .
     * The possible values are
     * * Up
     * * Down
     * * Left
     * * Right
     * * Auto
     *
     * @isenumeration true
     * @default LinearDirection.Auto
     * @asptype LinearDirection
     */
    direction: string | LinearDirection;
    /**
     * Defines whether to enable or disable the SpeedDial.
     *
     * @default false.
     */
    disabled: boolean;
    /**
     * Defines the position of icon in the button of speed dial.
     * The possible values are:
     * * Left
     * * Right
     *
     * @isenumeration true
     * @default IconPosition.Left
     * @asptype IconPosition
     */
    iconPosition: string | IconPosition;
    /**
     * Defines the list of SpeedDial items.
     *
     * @default []
     */
    items: SpeedDialItemModel[];
    /**
     * Defines the template content for the speed dial item.
     * {% codeBlock src='speeddial/itemTemplate/index.md' %}{% endcodeBlock %}
     *
     * @default ''
     * @angularType string | object
     * @reactType string | function | JSX.Element
     * @vueType string | function
     * @aspType string
     */
    itemTemplate: string | Function;
    /**
     * Defines the display mode of speed dial action items.
     * The possible values are:
     * * Linear
     * * Radial
     * {% codeBlock src='speeddial/mode/index.md' %}{% endcodeBlock %}
     *
     * @isenumeration true
     * @default SpeedDialMode.Linear
     * @asptype SpeedDialMode
     */
    mode: string | SpeedDialMode;
    /**
     * Defines one or more CSS classes to include an icon or image for the button of SpeedDial when it's closed.
     *
     * @default ''
     */
    openIconCss: string;
    /**
     * Defines whether to open the popup when the button of SpeedDial is hovered.
     * By default, SpeedDial opens popup on click action.
     *
     * @default false
     */
    opensOnHover: boolean;
    /**
     * Defines the position of the button of Speed Dial relative to target.
     * Defines the position of the FAB relative to target.
     * The possible values are:
     * * TopLeft: Positions the FAB at the target's top left corner.
     * * TopCenter: Positions the FAB at the target's top left corner.
     * * TopRight: Positions the FAB at the target's top left corner.
     * * MiddleLeft: Positions the FAB at the target's top left corner.
     * * MiddleCenter: Positions the FAB at the target's top left corner.
     * * MiddleRight: Positions the FAB at the target's top left corner.
     * * BottomLeft: Positions the FAB at the target's top left corner.
     * * BottomCenter: Places the FAB on the bottom-center position of the target.
     * * BottomRight: Positions the FAB at the target's bottom right corner.
     *
     *  To refresh the position of FAB on target resize, use refreshPosition method.
     *  The position will be refreshed automatically when browser resized.
     *
     * @isenumeration true
     * @default FabPosition.BottomRight
     * @asptype FabPosition
     */
    position: string | FabPosition;
    /**
     * Defines whether the speed dial popup can be displayed as modal or modal less.
     * When enabled, the Speed dial creates an overlay that disables interaction with other elements other than speed dial items.
     * If user clicks anywhere other than speed dial items then popup will get closed.
     *
     * @default false.
     */
    modal: boolean;
    /**
     * Defines a template content for popup of SpeedDial.
     *
     * @default ''
     * @angularType string | object
     * @reactType string | function | JSX.Element
     * @vueType string | function
     * @aspType string
     */
    popupTemplate: string | Function;
    /**
     * Provides the options to customize the speed dial action buttons when mode of speed dial is radial
     * {% codeBlock src='speeddial/radialSettings/index.md' %}{% endcodeBlock %}
     *
     * @default { startAngle: null, endAngle: null, direction: 'Auto' }
     */
    radialSettings: RadialSettingsModel;
    /**
     * Defines the selector that points to the element in which the button of SpeedDial will be positioned.
     * By default button is positioned based on viewport of browser.
     * The target element must have relative position, else Button will get positioned based on the closest element which has relative position.
     *
     * @default ''
     */
    target: string | HTMLElement;
    /**
     * Defines whether the SpeedDial is visible or hidden.
     *
     * @default true.
     */
    visible: boolean;
    /**
     * Specifies whether the SpeedDial acts as the primary.
     *
     * @default true
     */
    isPrimary: boolean;
    /**
     * Event callback that is raised before the speed dial popup is closed.
     *
     * @event beforeClose
     */
    beforeClose: EmitType<SpeedDialBeforeOpenCloseEventArgs>;
    /**
     * Event callback that is raised before rendering the speed dial item.
     *
     * @event beforeItemRender
     */
    beforeItemRender: EmitType<SpeedDialItemEventArgs>;
    /**
     * Event callback that is raised before the speed dial popup is opened.
     *
     * @event beforeOpen
     */
    beforeOpen: EmitType<SpeedDialBeforeOpenCloseEventArgs>;
    /**
     * Event callback that is raised after rendering the speed dial.
     *
     * @event created
     */
    created: EmitType<Event>;
    /**
     * Event callback that is raised when a speed dial action item is clicked.
     *
     * @event clicked
     */
    clicked: EmitType<SpeedDialItemEventArgs>;
    /**
     * Event callback that is raised when the SpeedDial popup is closed.
     *
     * @event onClose
     */
    onClose: EmitType<SpeedDialOpenCloseEventArgs>;
    /**
     * Event callback that is raised when the SpeedDial popup is opened.
     *
     * @event onOpen
     */
    onOpen: EmitType<SpeedDialOpenCloseEventArgs>;
    private fab;
    private targetEle;
    private isFixed;
    private isMenuOpen;
    private popupEle;
    private overlayEle;
    private actualLinDirection;
    private isClock;
    private isVertical;
    private isControl;
    private focusedIndex;
    private keyboardModule;
    private popupKeyboardModule;
    private documentKeyboardModule;
    private removeRippleEffect;
    private keyConfigs;
    /**
     * Constructor for creating the widget
     *
     * @param  {SpeedDialModel} options - Specifies the floating action button model
     * @param  {string|HTMLButtonElement} element - Specifies the target element
     */
    constructor(options?: SpeedDialModel, element?: string | HTMLButtonElement);
    /**
     * Initialize the control rendering
     *
     * @returns {void}
     * @private
     */
    protected render(): void;
    protected preRender(): void;
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @returns {string} - Persist data
     */
    protected getPersistData(): string;
    /**
     * Get component name.
     *
     * @returns {string} - Module name
     * @private
     */
    protected getModuleName(): string;
    private initialize;
    private wireEvents;
    private wirePopupEvents;
    private wireFabClick;
    private wireFabHover;
    createPopup(): void;
    private createOverlay;
    private popupClick;
    private bodyClickHandler;
    private fabClick;
    private setPopupContent;
    private appendTemplate;
    private getTemplateString;
    private updatePopupTemplate;
    private createUl;
    private createItems;
    private setRTL;
    private checkTarget;
    private setVisibility;
    private popupMouseLeaveHandle;
    private mouseOverHandle;
    private mouseLeaveHandle;
    private popupKeyActionHandler;
    private keyActionHandler;
    private focusFirstElement;
    private focusLastElement;
    private focusLinearElement;
    private focusLeftRightElement;
    private focusUpDownElement;
    private focusPrevElement;
    private focusNextElement;
    private setFocus;
    private removeFocus;
    private updatePositionProperties;
    private setPositionProps;
    private validateDirection;
    private setMaxSize;
    private setLinearPosition;
    private setLinearHorizontalPosition;
    private setLeft;
    private setRight;
    private setPosition;
    private setHorizontalPosition;
    private setRadialPosition;
    private setRadialCorner;
    private getActualRange;
    private checkAngleRange;
    private checkAngle;
    private clearPosition;
    private clearHorizontalPosition;
    private clearOverflow;
    private hidePopupEle;
    private startHide;
    private endHide;
    private showPopupEle;
    private startShow;
    private endShow;
    private toggleOverlay;
    private removeOverlayEle;
    private updatePopupItems;
    private handleResize;
    private triggerItemClick;
    /**
     * Opens the SpeedDial popup to display to display the speed dial items or the popupTemplate.
     *
     * @returns {void}
     */
    show(): void;
    /**
     * Closes the SpeedDial popup.
     *
     *@returns {void}
     */
    hide(): void;
    /**
     * Refreshes the button position of speed dial. You can call this method to re-position button when the target is resized.
     *
     *@returns {void}
     */
    refreshPosition(): void;
    private resizeHandler;
    private clearItems;
    private unwireEvents;
    private unwireFabClick;
    private unwireFabHover;
    private unwirePopupEvents;
    destroy(): void;
    /**
     * Called internally if any of the property value changed.
     *
     * @param  {SpeedDialModel} newProp - Specifies new properties
     * @param  {SpeedDialModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    onPropertyChanged(newProp: SpeedDialModel, oldProp?: SpeedDialModel): void;
}
