import { Component, INotifyPropertyChanged, ChildProperty, EmitType, BaseEventArgs } from '@syncfusion/ej2-base';
import { BreadcrumbModel, BreadcrumbItemModel } from './breadcrumb-model';
/**
 * Defines the Breadcrumb overflow modes.
 */
export declare enum BreadcrumbOverflowMode {
    /**
     * Hidden mode shows the maximum number of items possible in the container space and hides the remaining items.
     * Clicking on a previous item will make the hidden item visible.
     */
    Hidden = "Hidden",
    /**
     * Collapsed mode shows the first and last Breadcrumb items and hides the remaining items with a collapsed icon.
     * When the collapsed icon is clicked, all items become visible and navigable.
     */
    Collapsed = "Collapsed",
    /**
     * Menu mode shows the number of Breadcrumb items that can be accommodated within the container space and creates a submenu with the remaining items.
     */
    Menu = "Menu",
    /**
     * Wrap mode wraps the items to multiple lines when the Breadcrumb’s width exceeds the container space.
     */
    Wrap = "Wrap",
    /**
     * Scroll mode shows an HTML scroll bar when the Breadcrumb’s width exceeds the container space.
     */
    Scroll = "Scroll",
    /**
     * None mode shows all the items in a single line.
     */
    None = "None"
}
export declare class BreadcrumbItem extends ChildProperty<BreadcrumbItem> {
    /**
     * Specifies the text content of the Breadcrumb item.
     *
     * @default ''
     */
    text: string;
    /**
     * Specifies the Url of the Breadcrumb item that will be activated when clicked.
     *
     * @default ''
     */
    url: string;
    /**
     * Defines a class/multiple classes separated by a space for the item that is used to include an icon.
     *
     * @default null
     */
    iconCss: string;
    /**
     * Enable or disable the breadcrumb item, when set to true, the breadcrumb item will be disabled.
     *
     * @default false
     */
    disabled: boolean;
}
/**
 * Interface for item click event.
 */
export interface BreadcrumbClickEventArgs extends BaseEventArgs {
    /**
     * Specifies the item's element.
     */
    element: HTMLElement;
    /**
     * Specifies the Breadcrumb item.
     */
    item: BreadcrumbItemModel;
    /**
     * Specifies the item click event.
     */
    event: Event;
}
/**
 * Interface for before item render event.
 */
export interface BreadcrumbBeforeItemRenderEventArgs extends BaseEventArgs {
    /**
     * Specifies the item's element.
     */
    element: HTMLElement;
    /**
     * Specifies the Breadcrumb item.
     */
    item: BreadcrumbItemModel;
    /**
     * Cancels the Breadcrumb item rendering.
     */
    cancel: boolean;
}
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
export declare class Breadcrumb extends Component<HTMLElement> implements INotifyPropertyChanged {
    private isExpanded;
    private startIndex;
    private endIndex;
    private _maxItems;
    private popupObj;
    private popupUl;
    private delegateClickHanlder;
    private isPopupCreated;
    /**
     * Defines the Url based on which the Breadcrumb items are generated.
     *
     * @default ''
     */
    url: string;
    /**
     * Defines the list of Breadcrumb items.
     *
     * @default []
     */
    items: BreadcrumbItemModel[];
    /**
     * Specifies the Url of the active Breadcrumb item.
     *
     * @default ''
     */
    activeItem: string;
    /**
     * Specifies an integer to enable overflow behavior when the Breadcrumb items count exceeds and it is based on the overflowMode property.
     *
     * @default -1
     * @aspType int
     */
    maxItems: number;
    /**
     * Specifies the overflow mode of the Breadcrumb item when it exceeds maxItems count. The possible values are,
     * - Default: Specified maxItems count will be visible and the remaining items will be hidden. While clicking on the previous item, the hidden item will become visible.
     * - Collapsed: Only the first and last items will be visible, and the remaining items will be hidden in the collapsed icon. When the collapsed icon is clicked, all items become visible.
     * - Menu: Shows the number of breadcrumb items that can be accommodated within the container space, and creates a sub menu with the remaining items.
     * - Wrap: Wraps the items on multiple lines when the Breadcrumb’s width exceeds the container space.
     * - Scroll: Shows an HTML scroll bar when the Breadcrumb’s width exceeds the container space.
     * - None: Shows all the items on a single line.
     *
     * @isenumeration true
     * @default BreadcrumbOverflowMode.Menu
     * @asptype BreadcrumbOverflowMode
     */
    overflowMode: string | BreadcrumbOverflowMode;
    /**
     * Defines class/multiple classes separated by a space in the Breadcrumb element.
     *
     * @default ''
     */
    cssClass: string;
    /**
     * Specifies the template for Breadcrumb item.
     *
     * @default null
     * @aspType string
     */
    itemTemplate: string | Function;
    /**
     * Specifies the separator template for Breadcrumb.
     *
     * @default '/'
     * @aspType string
     */
    separatorTemplate: string | Function;
    /**
     * Enable or disable the item's navigation, when set to false, each item navigation will be prevented.
     *
     * @default true
     */
    enableNavigation: boolean;
    /**
     * Enable or disable the active item navigation, when set to true, active item will be navigable.
     *
     * @default false
     */
    enableActiveItemNavigation: boolean;
    /**
     * Enable or disable the breadcrumb, when set to true, the breadcrumb will be disabled.
     *
     * @default false
     */
    disabled: boolean;
    /**
     * Overrides the global culture and localization value for this component. Default global culture is 'en-US'.
     *
     * @default ''
     * @private
     * @aspIgnore
     */
    locale: string;
    /**
     * Triggers while rendering each breadcrumb item.
     *
     * @event beforeItemRender
     */
    beforeItemRender: EmitType<BreadcrumbBeforeItemRenderEventArgs>;
    /**
     * Triggers while clicking the breadcrumb item.
     *
     * @event itemClick
     */
    itemClick: EmitType<BreadcrumbClickEventArgs>;
    /**
     * Triggers once the component rendering is completed.
     *
     * @event created
     */
    created: EmitType<Event>;
    /**
     * Constructor for creating the widget.
     *
     * @private
     * @param {BreadcrumbModel} options - Specifies the Breadcrumb model.
     * @param {string | HTMLElement} element - Specifies the element.
     */
    constructor(options?: BreadcrumbModel, element?: string | HTMLElement);
    /**
     * @private
     * @returns {void}
     */
    protected preRender(): void;
    /**
     * Initialize the control rendering.
     *
     * @private
     * @returns {void}
     */
    protected render(): void;
    private initialize;
    private initPvtProps;
    private getEndIndex;
    private initItems;
    private renderItems;
    private calculateMaxItems;
    private hasField;
    private getMenuElement;
    private beforeItemRenderChanges;
    private reRenderItems;
    private clickHandler;
    private renderPopup;
    private documentClickHandler;
    private resize;
    private expandHandler;
    private keyDownHandler;
    private popupKeyDownHandler;
    /**
     * Called internally if any of the property value changed.
     *
     * @private
     * @param {BreadcrumbModel} newProp - Specifies the new properties.
     * @param {BreadcrumbModel} oldProp - Specifies the old properties.
     * @returns {void}
     */
    onPropertyChanged(newProp: BreadcrumbModel, oldProp: BreadcrumbModel): void;
    private wireEvents;
    private popupWireEvents;
    private unWireEvents;
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @returns {string} - Persist data
     */
    protected getPersistData(): string;
    /**
     * Get module name.
     *
     * @private
     * @returns {string} - Module Name
     */
    protected getModuleName(): string;
    /**
     * Destroys the widget.
     *
     * @returns {void}
     */
    destroy(): void;
}
