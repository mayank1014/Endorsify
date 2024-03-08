import { ListView, ItemCreatedArgs, Fields, UISelectedItem } from './list-view';
/**
 * ElementContext
 */
export interface ElementContext extends HTMLElement {
    context: {
        [key: string]: string | object;
    };
}
export declare class Virtualization {
    constructor(instance: ListView);
    private listViewInstance;
    private templateData;
    private topElementHeight;
    private bottomElementHeight;
    listItemHeight: number;
    private domItemCount;
    private expectedDomItemCount;
    private scrollPosition;
    private onVirtualScroll;
    private updateUl;
    private checkListWrapper;
    private iconCssWrapper;
    uiFirstIndex: number;
    private uiLastIndex;
    private totalHeight;
    private topElement;
    private bottomElement;
    private activeIndex;
    private uiIndices;
    private listDiff;
    private elementDifference;
    /**
     * For internal use only.
     *
     * @private
     */
    isNgTemplate(): boolean;
    /**
     * Checks if the platform is a Vue and its template property is a function type.
     *
     * @returns {boolean} indicating the result of the check
     */
    private isVueFunctionTemplate;
    /**
     * For internal use only.
     *
     * @private
     */
    uiVirtualization(): void;
    private wireScrollEvent;
    private updateUlContainer;
    private ValidateItemCount;
    private uiIndicesInitialization;
    refreshItemHeight(): void;
    private getscrollerHeight;
    private onVirtualUiScroll;
    private onLongScroll;
    private onNormalScroll;
    private updateUiContent;
    private changeElementAttributes;
    private findDSAndIndexFromId;
    getSelectedItems(): UISelectedItem;
    selectItem(obj: Fields | HTMLElement | Element): void;
    enableItem(obj: Fields | HTMLElement | Element): void;
    disableItem(obj: Fields | HTMLElement | Element): void;
    showItem(obj: Fields | HTMLElement | Element): void;
    hideItem(obj: Fields | HTMLElement | Element): void;
    removeItem(obj: HTMLElement | Element | Fields): void;
    setCheckboxLI(li: HTMLElement | Element, e?: MouseEvent | KeyboardEvent | FocusEvent): void;
    setSelectLI(li: HTMLElement | Element, e?: MouseEvent | KeyboardEvent | FocusEvent): void;
    checkedItem(checked: boolean): void;
    private addUiItem;
    private removeUiItem;
    private changeUiIndices;
    addItem(data: DataSource[], fields: Fields, dataSource: DataSource[], index: number): void;
    private createAndInjectNewItem;
    createUIItem(args: ItemCreatedArgs): void;
    reRenderUiVirtualization(): void;
    private updateUI;
    /**
     * Handles the UI change in vue for the list view.
     *
     * @param {DataSource} newData - The new data source for the list view.
     * @param {ElementContext} listElement - The HTML element context for the list view.
     * @param {Virtualization} virtualThis - The virtualization context for the list view.
     */
    private onChange;
    private onNgChange;
    getModuleName(): string;
    destroy(): void;
}
interface DataSource {
    [key: string]: object;
}
export {};
