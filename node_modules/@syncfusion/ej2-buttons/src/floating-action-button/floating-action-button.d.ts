/// <reference path="../button/button-model.d.ts" />
import { INotifyPropertyChanged } from '@syncfusion/ej2-base';
import { Button } from '../button/button';
import { FabModel } from './floating-action-button-model';
/**
 * Defines the position of FAB (Floating Action Button) in target.
 */
export declare enum FabPosition {
    /**
     * Positions the FAB at the target's top left corner.
     */
    TopLeft = "TopLeft",
    /**
     * Places the FAB on the top-center position of the target.
     */
    TopCenter = "TopCenter",
    /**
     * Positions the FAB at the target's top right corner.
     */
    TopRight = "TopRight",
    /**
     * Positions the FAB in the middle of target's left side.
     */
    MiddleLeft = "MiddleLeft",
    /**
     * Positions the FAB in the center of target.
     */
    MiddleCenter = "MiddleCenter",
    /**
     * Positions the FAB in the middle of target's right side.
     */
    MiddleRight = "MiddleRight",
    /**
     * Positions the FAB at the target's bottom left corner.
     */
    BottomLeft = "BottomLeft",
    /**
     * Places the FAB on the bottom-center position of the target.
     */
    BottomCenter = "BottomCenter",
    /**
     * Positions the FAB at the target's bottom right corner.
     */
    BottomRight = "BottomRight"
}
/**
 * The FAB Component (Floating Action Button) is an extension of Button Component that appears in front of all the contents of the page and performs the primary action.
 */
export declare class Fab extends Button implements INotifyPropertyChanged {
    /**
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
     * {% codeBlock src='fab/position/index.md' %}{% endcodeBlock %}
     *
     * @isenumeration true
     * @default FabPosition.BottomRight
     * @asptype FabPosition
     */
    position: string | FabPosition;
    /**
     * Defines the selector that points to an element in which the FAB will be positioned.
     * By default, FAB is positioned based on viewport of browser.
     * The target element must have relative position, else FAB will get positioned based on the closest element which has relative position.
     *
     * @default ''
     */
    target: string | HTMLElement;
    /**
     * Defines whether the fab is visible or hidden.
     *
     * @default true.
     */
    visible: boolean;
    /**
     * Defines whether to apply primary style for FAB.
     *
     * @default true
     */
    isPrimary: boolean;
    private isFixed;
    private targetEle;
    /**
     * Constructor for creating the widget
     *
     * @param  {FabModel} options - Specifies the floating action button model
     * @param  {string|HTMLButtonElement} element - Specifies the target element
     */
    constructor(options?: FabModel, element?: string | HTMLButtonElement);
    /**
     * Initialize the control rendering
     *
     * @returns {void}
     * @private
     */
    render(): void;
    protected preRender(): void;
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @returns {string} - Persist data
     */
    getPersistData(): string;
    /**
     * Get component name.
     *
     * @returns {string} - Module name
     * @private
     */
    getModuleName(): string;
    private initializeFab;
    private checkTarget;
    private setVisibility;
    private setPosition;
    private setVerticalPosition;
    private setHorizontalPosition;
    private clearPosition;
    private clearHorizontalPosition;
    /**
     * Refreshes the FAB position. You can call this method to re-position FAB when target is resized.
     *
     * @returns {void}
     */
    refreshPosition(): void;
    private resizeHandler;
    /**
     * Destroys the FAB instance.
     *
     * @returns {void}
     *
     */
    destroy(): void;
    /**
     * Called internally if any of the property value changed.
     *
     * @param  {FabModel} newProp - Specifies new properties
     * @param  {FabModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    onPropertyChanged(newProp: FabModel, oldProp?: FabModel): void;
}
