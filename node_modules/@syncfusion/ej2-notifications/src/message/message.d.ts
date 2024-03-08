import { Component, INotifyPropertyChanged } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2-base';
import { MessageModel } from './message-model';
/**
 * Specifies the type of severity to display the message with distinctive icons and colors.
 */
export declare enum Severity {
    /**
     * The message is displayed with icons and colors to denote it as a normal message.
     */
    Normal = "Normal",
    /**
     * The message is displayed with icons and colors to denote it as a success message.
     */
    Success = "Success",
    /**
     * The message is displayed with icons and colors to denote it as information.
     */
    Info = "Info",
    /**
     * The message is displayed with icons and colors to denote it as a warning message.
     */
    Warning = "Warning",
    /**
     * The message is displayed with icons and colors to denote it as an error message.
     */
    Error = "Error"
}
/**
 * Specifies the predefined appearance variants for the component to display.
 */
export declare enum Variant {
    /**
     * Denotes the severity is differentiated using text color and light background color.
     */
    Text = "Text",
    /**
     * Denotes the severity is differentiated using text color and border without background.
     */
    Outlined = "Outlined",
    /**
     * Denotes the severity is differentiated using text color and dark background color.
     */
    Filled = "Filled"
}
/**
 * Provides information about the closed event.
 */
export interface MessageCloseEventArgs {
    /**
     * Returns the element.
     */
    element: Element;
    /**
     * Returns the original event arguments.
     */
    event: Event;
    /**
     * Determines whether the event is triggered by interaction.
     */
    isInteracted: boolean;
}
/**
 * The Message component displays messages with severity by differentiating icons and colors to denote the importance and context of the message to the end user.
 * ```html
 * <div id="msg"></div>
 * <script>
 *   var msgObj: Message = new Message({
 *      content: 'Editing is restricted',
 *      showCloseIcon: true
 *   })
 *   msgObj.appendTo('#msg');
 * </script>
 * ```
 *
 */
export declare class Message extends Component<HTMLElement> implements INotifyPropertyChanged {
    private iconElement;
    private closeIcon;
    private txtElement;
    private initialRender;
    private l10n;
    private innerContent;
    private msgElement;
    /**
     * Specifies the content to be displayed in the Message component. It can be a paragraph, a list, or any other HTML element.
     *
     * @default null
     * @angularType string | object
     * @reactType string | function | JSX.Element
     * @vueType string | function
     * @aspType string
     */
    content: string | Function;
    /**
     * Specifies the CSS class or multiple classes separated by space that can be appended to the root element of the Message component to customize the message.
     *
     * @default ''
     */
    cssClass: string;
    /**
     * Shows or hides the severity icon in the Message component. When set to true, the severity icon is displayed at the left edge of the Message component.
     * This icon will be distinctive based on the severity property.
     *
     * @default true
     */
    showIcon: boolean;
    /**
     * Shows or hides the close icon in the Message component. An end user can click the close icon to hide the message. The closed event is triggered when the message is closed.
     *
     * @default false
     */
    showCloseIcon: boolean;
    /**
     * Specifies the severity of the message, which is used to define the appearance (icons and colors) of the message. The available severity messages are Normal, Success, Info, Warning, and Error.
     *
     * @isenumeration true
     * @default Severity.Normal
     * @asptype Severity
     */
    severity: string | Severity;
    /**
     * Specifies the variant from predefined appearance variants to display the content of the Message component. The available variants are Text, Outlined, and Filled.
     *
     * @isenumeration true
     * @default Variant.Text
     * @asptype Variant
     */
    variant: string | Variant;
    /**
     * Shows or hides the visibility of the Message component. When set to false, the Message component will be hidden.
     *
     * @default true
     */
    visible: boolean;
    /**
     * Triggers when the Message component is created successfully.
     *
     * @event created
     */
    created: EmitType<Object>;
    /**
     * Triggers when the Message component is destroyed successfully.
     *
     * @event destroyed
     */
    destroyed: EmitType<Event>;
    /**
     * Triggers when the Message component is closed successfully.
     *
     * @event closed
     */
    closed: EmitType<MessageCloseEventArgs>;
    /**
     * Constructor for creating the Message component widget.
     *
     * @param {MessageModel}options - Specifies the Message component interface.
     * @param {HTMLElement}element - Specifies the target element.
     */
    constructor(options?: MessageModel, element?: HTMLElement);
    /**
     * Gets the Message component module name.
     *
     * @returns {string} - Returns the string.
     * @private
     */
    getModuleName(): string;
    /**
     * Get the persisted state properties of the Message component.
     *
     * @returns {string} - Returns the string.
     */
    getPersistData(): string;
    /**
     * Method to initialize the variables for the Message component.
     *
     * @returns {void}
     * @private
     */
    preRender(): void;
    /**
     * Method to initialize the Message component rendering.
     *
     * @returns {void}
     * @private
     */
    render(): void;
    private initialize;
    private setIcon;
    private setCloseIcon;
    private setTitle;
    private setContent;
    private setTemplate;
    private setSeverity;
    private setVariant;
    private setCssClass;
    private setVisible;
    private clickHandler;
    private keyboardHandler;
    private closeMessage;
    private wireEvents;
    private unWireEvents;
    /**
     * Method to handle the dynamic changes of the Message component properties.
     *
     * @param {MessageModel} newProp - Specifies the new property.
     * @param {MessageModel} oldProp - Specifies the old property.
     * @returns {void}
     * @private
     */
    onPropertyChanged(newProp?: MessageModel, oldProp?: MessageModel): void;
    /**
     * Method to destroy the Message component. It removes the component from the DOM and detaches all its bound events. It also removes the attributes and classes of the component.
     *
     * @returns {void}
     */
    destroy(): void;
}
