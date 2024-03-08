import { DocumentEditor } from '../../document-editor';
import { Toolbar } from '@syncfusion/ej2-navigations';
import { Revision } from './track-changes';
import { CommentReviewPane } from '../comments';
import { WRowFormat } from '../index';
import { Dictionary } from '../../base/index';
/**
 * Track changes pane
 */
export declare class TrackChangesPane {
    /***
     * @private
     */
    isChangesTabVisible: boolean;
    private owner;
    private trackChangeDiv;
    private toolbarElement;
    closeButton: HTMLElement;
    private noChangeDivElement;
    /**
     * @private
     */
    toolbar: Toolbar;
    changesInfoDiv: HTMLElement;
    private locale;
    private commentReviewPane;
    private userDropDownitems;
    private userDropDownButton;
    private viewTypeDropDownButton;
    private userDropDown;
    private selectedUser;
    private selectedType;
    private users;
    private menuoptionEle;
    private menuDropDownButton;
    private enableButtons;
    private currentSelectedRevisionInternal;
    private viewTypeitems;
    changes: Dictionary<Revision, ChangesSingleView>;
    revisions: Revision[];
    private sortedRevisions;
    private noChangesVisibleInternal;
    isTrackingPageBreak: boolean;
    /***
     * @private
     */
    tableRevisions: Dictionary<Revision, Revision[]>;
    renderedChanges: Dictionary<Revision, ChangesSingleView>;
    setNoChangesVisibility: boolean;
    currentSelectedRevision: Revision;
    constructor(owner: DocumentEditor, commentReviewPane: CommentReviewPane);
    private initTrackChangePane;
    private initPaneHeader;
    private beforeDropDownItemRender;
    private onUserOpen;
    private enableDisableToolbarItem;
    private getSpanView;
    private onMenuSelect;
    onSelection(revision: Revision): void;
    private onUserSelect;
    private onTypeSelect;
    private updateMenuOptions;
    private sortCollectionToDisplay;
    enableDisableButton(enableButton: boolean): void;
    isUpdateTrackChanges(revisionCount: number): boolean;
    updateCurrentTrackChanges(revision: Revision): void;
    updateTrackChanges(show?: boolean): void;
    /**
     * @private
     */
    groupTableRevisions(revisions: Revision[], startIndex: number): Revision[];
    updateUsers(): void;
    updateHeight(): void;
    private removeAllChanges;
    /**
     * @private
     */
    clear(): void;
    /**
     * @private
     * @returns {void}
     */
    destroy(): void;
    private addChanges;
    /**
         * @private
         * @returns {void}
         */
    navigatePreviousChanges(): void;
    /**
         * @private
         * @returns {void}
         */
    navigateNextChanges(): void;
    private revisionNavigateInternal;
}
export declare class ChangesSingleView {
    private trackChangesPane;
    private locale;
    private owner;
    outerSingleDiv: HTMLElement;
    user: string;
    revisionType: string;
    revision: Revision;
    singleInnerDiv: HTMLElement;
    acceptButtonElement: HTMLButtonElement;
    rejectButtonElement: HTMLButtonElement;
    private acceptButton;
    private rejectButton;
    changesCount: HTMLElement;
    /***
     * @private
     */
    tableElement: HTMLTableElement;
    constructor(owner: DocumentEditor, trackChangesPane: TrackChangesPane);
    updateRevisionIndexAndCount(currentIndex: number, totalCount: number): void;
    createSingleChangesDiv(revision: Revision): HTMLElement;
    /**
     * @private
     */
    appendRowToTable(rowFormat: WRowFormat, insertIndex: number): void;
    private selectRevision;
    layoutElementText(range: object[], changesText: HTMLElement): void;
    private addSpan;
    private acceptButtonClick;
    private rejectButtonClick;
    private removeFromParentCollec;
    /**
     *
     * @private
     */
    clear(): void;
    /**
     * Disposes the internal objects which are maintained.
     * @private
     */
    destroy(): void;
}
