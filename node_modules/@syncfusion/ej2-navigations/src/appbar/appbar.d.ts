import { Component, INotifyPropertyChanged, EmitType } from '@syncfusion/ej2-base';
import { AppBarModel } from './appbar-model';
/**
 * Specifies the height mode of the AppBar component which defines the height of the AppBar.
 * ```props
 * Regular :- Specifies default height for the AppBar.
 * Prominent :- Specifies longer height for the AppBar to show the longer titles and images, or to provide a stronger presence.
 * Dense :- Specifies compressed (short) height for the AppBar to accommodate all the app bar content in a denser layout.
 * ```
 */
export declare type AppBarMode = 'Regular' | 'Prominent' | 'Dense';
/**
 * Specifies the position of the AppBar.
 * ```props
 * Top :- Position the AppBar at the top.
 * Bottom :- Position the AppBar at the bottom.
 * ```
 */
export declare type AppBarPosition = 'Top' | 'Bottom';
/**
 * Specifies the color of the AppBar component.
 * ```props
 * Light :- Specifies the AppBar in light color.
 * Dark :- Specifies the AppBar in dark color.
 * Primary :- Specifies the AppBar in a primary color.
 * Inherit :- Inherit color from parent for AppBar. AppBar background and colors are inherited from its parent element.
 * ```
 */
export declare type AppBarColor = 'Light' | 'Dark' | 'Primary' | 'Inherit';
/**
 * The AppBar displays the information and actions related to the current application screen. It is used to show branding, screen titles, navigation, and actions.
 * Support to inherit colors from AppBar provided to <c>Button</c>, <c>DropDownButton</c>, <c>Menu</c> and <c>TextBox</c>.
 * Set <c>CssClass</c> property with <code>e-inherit</code> CSS class to inherit the background and color from AppBar.
 */
export declare class AppBar extends Component<HTMLElement> implements INotifyPropertyChanged {
    /**
     * Specifies the mode of the AppBar that defines the AppBar height. The possible values for this property are as follows:
     * * `Regular`: Specifies default height for the AppBar.
     * * `Prominent`: Specifies longer height for the AppBar to show the longer titles and images, or to provide a stronger presence.
     * * `Dense`: Specifies compressed (short) height for the AppBar to accommodate all the app bar content in a denser layout.
     *
     * @default 'Regular'
     */
    mode: AppBarMode;
    /**
     * Specifies the position of the AppBar. The possible values for this property are as follows:
     * * `Top`: Position the AppBar at the top.
     * * `Bottom`: Position the AppBar at the bottom.
     *
     * @default 'Top'
     */
    position: AppBarPosition;
    /**
     * Accepts single/multiple CSS classes (separated by a space) to be used for AppBar customization.
     *
     * @default null
     */
    cssClass: string;
    /**
     * Defines whether the AppBar position is fixed or not while scrolling the page.
     * When set to `true`, the AppBar will be sticky while scrolling.
     *
     * @default false
     */
    isSticky: boolean;
    /**
     * Accepts HTML attributes/custom attributes that will be applied to the AppBar element.
     *
     * @default null
     */
    htmlAttributes: Record<string, string>;
    /**
     * Specifies the color mode that defines the color of the AppBar component. The possible values for this property are as follows:
     * * `Light`: Specifies the AppBar in light color.
     * * `Dark`: Specifies the AppBar in dark color.
     * * `Primary`: Specifies the AppBar in a primary color.
     * * `Inherit`: Inherit color from parent for AppBar. AppBar background and colors are inherited from its parent element.
     *
     * @default 'Light'
     */
    colorMode: AppBarColor;
    /**
     * Triggers after the AppBar component is created.
     *
     * @event created
     */
    created: EmitType<Event>;
    /**
     * Triggers when the AppBar component is destroyed.
     *
     * @event destroyed
     */
    destroyed: EmitType<Event>;
    /**
     * Constructor for creating the AppBar widget
     *
     * @param {AppBarModel} options Accepts the AppBar model properties to initiate the rendering
     * @param {string | HTMLElement} element Accepts the DOM element reference
     */
    constructor(options?: AppBarModel, element?: string | HTMLElement);
    /**
     * Removes the control from the DOM and also removes all its related events.
     *
     * @returns {void}
     */
    destroy(): void;
    protected getModuleName(): string;
    protected getPersistData(): string;
    protected preRender(): void;
    protected render(): void;
    onPropertyChanged(newProp: AppBarModel, oldProp: AppBarModel): void;
    private setHtmlAttributes;
    private setHeightMode;
    private setColorMode;
}
