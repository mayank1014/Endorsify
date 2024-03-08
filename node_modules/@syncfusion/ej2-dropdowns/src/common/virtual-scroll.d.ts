import { IDropdownlist } from './interface';
export declare type ScrollDirection = 'up' | 'down';
declare type ScrollArg = {
    direction: string;
    sentinel: SentinelType;
    offset: Offsets;
    focusElement: HTMLElement;
};
export declare type SentinelType = {
    check?: (rect: ClientRect, info: SentinelType) => boolean;
    top?: number;
    entered?: boolean;
    axis?: string;
};
export declare type SentinelInfo = {
    up?: SentinelType;
    down?: SentinelType;
    right?: SentinelType;
    left?: SentinelType;
};
export declare type Offsets = {
    top?: number;
    left?: number;
};
export interface VirtualInfo {
    currentPageNumber?: number;
    direction?: string;
    sentinelInfo?: SentinelType;
    offsets?: Offsets;
    startIndex?: number;
    endIndex?: number;
}
export declare class VirtualScroll {
    private parent;
    private containerElementRect;
    private element;
    private options;
    private touchModule;
    private component;
    constructor(parent: IDropdownlist);
    addEventListener(): void;
    removeEventListener(): void;
    private bindScrollEvent;
    private observe;
    getModuleName(): string;
    private popupScrollHandler;
    private getPageQuery;
    private setGeneratedData;
    private generateAndExecuteQueryAsync;
    private removeSkipAndTakeEvents;
    setCurrentViewDataAsync(): void;
    private generateQueryAndSetQueryIndexAsync;
    private dataProcessAsync;
    private virtualScrollRefreshAsync;
    scrollListener(scrollArgs: ScrollArg): void;
    private getPageCount;
    private getRowHeight;
    private getInfoFromView;
    private sentinelInfo;
    private virtualScrollHandler;
    destroy(): void;
}
export {};
