var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { EventHandler, Browser, select, isNullOrUndefined } from '@syncfusion/ej2-base';
import { debounce, Touch } from '@syncfusion/ej2-base';
import { DataManager, Query } from '@syncfusion/ej2-data';
var VirtualScroll = /** @class */ (function () {
    function VirtualScroll(parent) {
        var _this = this;
        this.sentinelInfo = {
            'up': {
                check: function (rect, info) {
                    var top = rect.top - _this.containerElementRect.top;
                    info.entered = top >= 0;
                    return top + (_this.parent.listItemHeight * _this.parent.virtualItemCount / 2) >= 0;
                },
                axis: 'Y'
            },
            'down': {
                check: function (rect, info) {
                    var cHeight = _this.parent.popupContentElement.clientHeight;
                    var top = rect.bottom;
                    info.entered = rect.bottom <= _this.containerElementRect.bottom;
                    return top - (_this.parent.listItemHeight * _this.parent.virtualItemCount / 2) <= _this.parent.listItemHeight * _this.parent.virtualItemCount / 2;
                }, axis: 'Y'
            }
        };
        this.parent = parent;
        this.removeEventListener();
        this.addEventListener();
    }
    VirtualScroll.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on('observe', this.observe, this);
        this.parent.on('setGeneratedData', this.setGeneratedData, this);
        this.parent.on('dataProcessAsync', this.dataProcessAsync, this);
        this.parent.on('setCurrentViewDataAsync', this.setCurrentViewDataAsync, this);
        this.parent.on('bindScrollEvent', this.bindScrollEvent, this);
    };
    VirtualScroll.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off('observe', this.observe);
        this.parent.off('setGeneratedData', this.setGeneratedData);
        this.parent.off('dataProcessAsync', this.dataProcessAsync);
        this.parent.off('setCurrentViewDataAsync', this.setCurrentViewDataAsync);
        this.parent.off('bindScrollEvent', this.bindScrollEvent);
    };
    VirtualScroll.prototype.bindScrollEvent = function (component) {
        var _this = this;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.component = component.component;
        this.observe(function (scrollArgs) { return _this.scrollListener(scrollArgs); });
    };
    VirtualScroll.prototype.observe = function (callback) {
        this.containerElementRect = this.parent.popupContentElement.getBoundingClientRect();
        EventHandler.add(this.parent.popupContentElement, 'wheel mousedown', this.popupScrollHandler, this);
        this.touchModule = new Touch(this.parent.popupContentElement, {
            scroll: this.popupScrollHandler.bind(this)
        });
        EventHandler.add(this.parent.popupContentElement, 'scroll', this.virtualScrollHandler(callback), this);
    };
    VirtualScroll.prototype.getModuleName = function () {
        return 'VirtualScroll';
    };
    VirtualScroll.prototype.popupScrollHandler = function (e) {
        this.parent.isMouseScrollAction = true;
        this.parent.isPreventScrollAction = false;
    };
    VirtualScroll.prototype.getPageQuery = function (query, virtualStartIndex, virtualEndIndex) {
        if (virtualEndIndex !== 0 && !this.parent.allowFiltering && this.component !== 'autocomplete') {
            query = query.skip(virtualStartIndex);
        }
        return query;
    };
    VirtualScroll.prototype.setGeneratedData = function (qStartIndex, recentlyGeneratedData) {
        var loopIteration = 0;
        var endIndex = this.parent.listData.length + this.parent.virtualItemStartIndex;
        for (var i = this.parent.virtualItemStartIndex; i < endIndex; i++) {
            var alreadyAddedData = this.parent.generatedDataObject[i];
            if (!alreadyAddedData) {
                if (recentlyGeneratedData !== null && this.parent.listData.slice(loopIteration, loopIteration + 1).length > 0) {
                    var slicedData = this.parent.listData.slice(loopIteration, loopIteration + 1);
                    if (slicedData.length > 0) {
                        // Safely assign slicedData to this.parent.generatedDataObject[i]
                        this.parent.generatedDataObject[i] = slicedData;
                    }
                }
            }
            loopIteration++;
        }
    };
    VirtualScroll.prototype.generateAndExecuteQueryAsync = function (query, virtualItemStartIndex, virtualItemEndIndex, isQueryGenerated) {
        if (virtualItemStartIndex === void 0) { virtualItemStartIndex = 0; }
        if (virtualItemEndIndex === void 0) { virtualItemEndIndex = 0; }
        if (isQueryGenerated === void 0) { isQueryGenerated = false; }
        var dataSource = this.parent.dataSource;
        if (!isQueryGenerated) {
            if (!isNullOrUndefined(this.parent.query)) {
                var newQuery = this.removeSkipAndTakeEvents(this.parent.query.clone());
                query = this.getPageQuery(newQuery, virtualItemStartIndex, virtualItemEndIndex);
            }
            else {
                query = this.getPageQuery(query, virtualItemStartIndex, virtualItemEndIndex);
            }
        }
        var tempCustomFilter = this.parent.isCustomFilter;
        if (this.component === 'combobox') {
            var totalData = 0;
            if (this.parent.dataSource instanceof DataManager) {
                totalData = this.parent.dataSource.dataSource.json.length;
            }
            else if (this.parent.dataSource && this.parent.dataSource.length > 0) {
                totalData = this.parent.dataSource.length;
            }
            if (totalData > 0) {
                this.parent.isCustomFilter = (totalData == this.parent.totalItemCount && this.parent.queryString != this.parent.typedString) ? true : this.parent.isCustomFilter;
            }
        }
        this.parent.resetList(dataSource, this.parent.fields, query);
        this.parent.isCustomFilter = tempCustomFilter;
    };
    VirtualScroll.prototype.removeSkipAndTakeEvents = function (query) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        query.queries = query.queries.filter(function (event) {
            return event.fn !== 'onSkip' && event.fn !== 'onTake';
        });
        return query;
    };
    VirtualScroll.prototype.setCurrentViewDataAsync = function () {
        // eslint-disable-next-line
        var currentData = [];
        for (var i = this.parent.viewPortInfo.startIndex; i < this.parent.viewPortInfo.endIndex; i++) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var alreadyAddedData = this.parent.generatedDataObject[i];
            if (alreadyAddedData) {
                currentData.push(alreadyAddedData[0]);
            }
        }
        this.parent.renderItems(currentData, this.parent.fields);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var virtualTrackElement = this.parent.list.getElementsByClassName('e-virtual-ddl')[0];
        if (virtualTrackElement) {
            (virtualTrackElement).style = this.parent.GetVirtualTrackHeight();
        }
        this.parent.UpdateSkeleton();
        this.parent.liCollections = this.parent.list.querySelectorAll('.e-list-item');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var virtualContentElement = this.parent.list.getElementsByClassName('e-virtual-ddl-content')[0];
        if (virtualContentElement) {
            (virtualContentElement).style = this.parent.getTransformValues();
        }
        if (this.parent.fields.groupBy) {
            this.parent.scrollStop();
        }
    };
    VirtualScroll.prototype.generateQueryAndSetQueryIndexAsync = function (query, isPopupOpen) {
        var isStartIndexInitialised = false;
        var queryStartIndex = 0;
        var queryEndIndex = 0;
        var sortedDataStartIndex = 0;
        var vEndIndex = this.parent && this.parent.viewPortInfo.endIndex !== 0 ? this.parent.viewPortInfo.endIndex : sortedDataStartIndex + this.parent.getItems().length;
        if (!isPopupOpen && vEndIndex !== 0) {
            for (var i = this.parent.viewPortInfo.startIndex; i <= vEndIndex; i++) {
                if (!(i in this.parent.generatedDataObject)) {
                    if (!isStartIndexInitialised) {
                        isStartIndexInitialised = true;
                        queryStartIndex = queryEndIndex = i;
                    }
                    else {
                        queryEndIndex = i === vEndIndex ? i : i + 1;
                    }
                }
            }
        }
        if (isStartIndexInitialised && !((this.parent.totalItemCount == queryStartIndex) && (this.parent.totalItemCount == queryEndIndex))) {
            this.parent.virtualItemStartIndex = queryStartIndex;
            this.parent.virtualItemEndIndex = queryEndIndex;
            this.generateAndExecuteQueryAsync(query, queryStartIndex, queryEndIndex);
        }
        this.setCurrentViewDataAsync();
    };
    VirtualScroll.prototype.dataProcessAsync = function (isOpenPopup) {
        this.parent.selectedValueInfo = null;
        this.parent.virtualItemStartIndex = this.parent.viewPortInfo.startIndex;
        this.parent.virtualItemEndIndex = this.parent.viewPortInfo.endIndex;
        this.generateQueryAndSetQueryIndexAsync(new Query(), isOpenPopup);
    };
    VirtualScroll.prototype.virtualScrollRefreshAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.parent.isCustomFilter = (!(this.parent.isTyped || (this.component === 'combobox' && this.parent.allowFiltering && this.parent.queryString != this.parent.typedString) || (!isNullOrUndefined(this.parent.filterInput) && !isNullOrUndefined(this.parent.filterInput.value) && this.parent.filterInput.value !== '') && this.component !== 'combobox') && !(this.component === 'autocomplete' && this.parent.value != null)) || this.parent.isCustomFilter;
                        if (this.parent.allowFiltering || this.component === 'autocomplete') {
                            if (!isNullOrUndefined(this.parent.typedString) && !(this.component === 'combobox' && !isNullOrUndefined(this.parent.typedString) && this.parent.allowFiltering)) {
                                if (this.parent.viewPortInfo.endIndex >= this.parent.dataCount) {
                                    this.parent.viewPortInfo.endIndex = this.parent.dataCount;
                                }
                                if (this.parent.viewPortInfo.startIndex >= this.parent.dataCount) {
                                    this.parent.viewPortInfo.startIndex = this.parent.dataCount - this.parent.itemCount;
                                }
                            }
                            else {
                                this.parent.getSkeletonCount(true);
                                if (this.component === 'combobox') {
                                    this.parent.skeletonCount = this.parent.totalItemCount != 0 && this.parent.totalItemCount < (this.parent.itemCount * 2) ? 0 : this.parent.skeletonCount;
                                }
                            }
                        }
                        return [4 /*yield*/, this.dataProcessAsync()];
                    case 1:
                        _a.sent();
                        if (this.parent.keyboardEvent != null) {
                            this.parent.handleVirtualKeyboardActions(this.parent.keyboardEvent, this.parent.pageCount);
                        }
                        this.parent.isCustomFilter = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    VirtualScroll.prototype.scrollListener = function (scrollArgs) {
        var _this = this;
        if (!this.parent.isPreventScrollAction) {
            var info = scrollArgs.sentinel;
            var pStartIndex = this.parent.previousStartIndex;
            this.parent.viewPortInfo = this.getInfoFromView(scrollArgs.direction, info, scrollArgs.offset, false);
            this.parent.isUpwardScrolling = false;
            if (this.parent.previousStartIndex !== pStartIndex && !this.parent.isKeyBoardAction) {
                this.parent.isScrollActionTriggered = false;
                this.parent.currentPageNumber = this.parent.viewPortInfo.currentPageNumber;
                this.parent.virtualListInfo = __assign({}, this.parent.viewPortInfo);
                this.parent.isPreventKeyAction = true;
                this.parent.isVirtualScrolling = true;
                setTimeout(function () {
                    _this.parent.pageCount = _this.parent.getPageCount();
                    _this.virtualScrollRefreshAsync().then(function () {
                        if (_this.parent.popupObj) {
                            _this.parent.list = _this.parent.popupObj.element.querySelector('.' + 'e-content') || select('.' + 'e-content');
                            _this.parent.updateSelectionList();
                            _this.parent.liCollections = _this.parent.getItems();
                        }
                        _this.parent.isKeyBoardAction = false;
                        _this.parent.isVirtualScrolling = false;
                        _this.parent.isPreventKeyAction = false;
                    });
                }, 5);
            }
            else if (this.parent.isScrollActionTriggered) {
                this.parent.isPreventKeyAction = false;
                this.parent.isScrollActionTriggered = false;
                var virtualListCount = this.parent.list.querySelectorAll('.e-virtual-list').length;
                var listElement = this.parent.list.querySelector('.' + 'e-list-item');
                var translateY = scrollArgs.offset.top - (listElement.offsetHeight * virtualListCount);
                this.parent.list.getElementsByClassName('e-virtual-ddl-content')[0].style.transform = "translate(0px," + translateY + "px)";
            }
            this.parent.previousInfo = this.parent.viewPortInfo;
        }
    };
    VirtualScroll.prototype.getPageCount = function (popupElement, returnExactCount) {
        if (returnExactCount === void 0) { returnExactCount = false; }
        var list = popupElement && popupElement.querySelector('.e-content');
        if (list) {
            var liHeight = list.classList.contains('e-nodata') ? null : getComputedStyle(list.querySelectorAll('.e-list-item')[0], null).getPropertyValue('height');
            var pageCount = list.getBoundingClientRect().height / parseInt(liHeight, 10);
            return returnExactCount ? pageCount : Math.round(pageCount);
        }
        return 0;
    };
    ;
    VirtualScroll.prototype.getRowHeight = function () {
        return (isNullOrUndefined(this.parent.liCollections) || this.parent.liCollections.length == 0) ? 0 : Math.ceil(this.parent.liCollections[0].getBoundingClientRect().height);
    };
    VirtualScroll.prototype.getInfoFromView = function (direction, info, e, isscrollAction) {
        var infoType = {
            direction: direction, sentinelInfo: info, offsets: e,
            startIndex: this.parent.previousStartIndex, endIndex: this.parent.previousEndIndex
        };
        var vHeight = this.parent.popupContentElement.getBoundingClientRect().height;
        //Row Start and End Index calculation
        var rowHeight = this.parent.listItemHeight;
        var exactTopIndex = e.top / rowHeight;
        var infoViewIndices = vHeight / rowHeight;
        var exactEndIndex = exactTopIndex + infoViewIndices;
        var pageSizeBy4 = this.parent.virtualItemCount / 4;
        var totalItemCount = this.parent.totalItemCount;
        if (infoType.direction === 'down') {
            var sIndex = Math.round(exactEndIndex) - Math.round((pageSizeBy4));
            if (isNullOrUndefined(infoType.startIndex) || (exactEndIndex >
                (infoType.startIndex + Math.round((this.parent.virtualItemCount / 2 + pageSizeBy4)))
                && infoType.endIndex !== totalItemCount)) {
                infoType.startIndex = sIndex >= 0 ? Math.round(sIndex) : 0;
                infoType.startIndex = infoType.startIndex > exactTopIndex ? Math.floor(exactTopIndex) : infoType.startIndex;
                var eIndex = infoType.startIndex + this.parent.virtualItemCount;
                infoType.startIndex = eIndex < exactEndIndex ? (Math.ceil(exactEndIndex) - this.parent.virtualItemCount)
                    : infoType.startIndex;
                infoType.endIndex = eIndex < totalItemCount ? eIndex : totalItemCount;
                infoType.startIndex = eIndex >= totalItemCount ? (infoType.endIndex - this.parent.virtualItemCount > 0 ? infoType.endIndex - this.parent.virtualItemCount : 0) : infoType.startIndex;
                infoType.currentPageNumber = Math.ceil(infoType.endIndex / this.parent.virtualItemCount);
            }
        }
        else if (infoType.direction === 'up') {
            if (infoType.startIndex && infoType.endIndex) {
                var loadAtIndex = Math.round(((infoType.startIndex * rowHeight) + (pageSizeBy4 * rowHeight)) / rowHeight);
                if (exactTopIndex < loadAtIndex) {
                    var idxAddedToExactTop = (pageSizeBy4) > infoViewIndices ? pageSizeBy4 :
                        (infoViewIndices + infoViewIndices / 4);
                    var eIndex = Math.round(exactTopIndex + idxAddedToExactTop);
                    infoType.endIndex = eIndex < totalItemCount ? eIndex : totalItemCount;
                    var sIndex = infoType.endIndex - this.parent.virtualItemCount;
                    infoType.startIndex = sIndex > 0 ? sIndex : 0;
                    infoType.endIndex = sIndex < 0 ? this.parent.virtualItemCount : infoType.endIndex;
                    infoType.currentPageNumber = Math.ceil(infoType.startIndex / this.parent.virtualItemCount);
                }
            }
        }
        if (!isscrollAction) {
            this.parent.previousStartIndex = infoType.startIndex;
            this.parent.startIndex = infoType.startIndex;
            this.parent.previousEndIndex = infoType.endIndex;
        }
        else {
            this.parent.scrollPreStartIndex = infoType.startIndex;
        }
        return infoType;
    };
    VirtualScroll.prototype.virtualScrollHandler = function (callback) {
        var _this = this;
        var delay = Browser.info.name === 'chrome' ? 200 : 100;
        var prevTop = 0;
        var debounced100 = debounce(callback, delay);
        var debounced50 = debounce(callback, 50);
        return function (e) {
            var top = e.target.scrollTop;
            var left = e.target.scrollLeft;
            var direction = prevTop < top && !_this.parent.isUpwardScrolling ? 'down' : 'up';
            prevTop = top;
            var current = _this.sentinelInfo[direction];
            var pstartIndex = _this.parent.scrollPreStartIndex;
            var scrollOffsetargs = {
                top: top,
                left: left
            };
            if (_this.parent.list.querySelectorAll('.e-virtual-list').length > 0) {
                var infoview = _this.getInfoFromView(direction, current, scrollOffsetargs, true);
                if (_this.parent.scrollPreStartIndex != pstartIndex && !_this.parent.isPreventScrollAction) {
                    _this.parent.isScrollActionTriggered = true;
                    var virtualPoup = (_this.parent.list.querySelector('.e-virtual-ddl-content'));
                    virtualPoup.style.transform = "translate(0px," + top + "px)";
                }
            }
            var debounceFunction = debounced100;
            if (current.axis === 'X') {
                debounceFunction = debounced50;
            }
            debounceFunction({ direction: direction, sentinel: current, offset: { top: top, left: left },
                focusElement: document.activeElement });
        };
    };
    VirtualScroll.prototype.destroy = function () {
        this.removeEventListener();
    };
    return VirtualScroll;
}());
export { VirtualScroll };
