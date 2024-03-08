var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/* eslint-disable jsdoc/require-returns */
/* eslint-disable jsdoc/require-param */
/* eslint-disable valid-jsdoc */
/**
 * AccumulationChart Selection src file
 */
import { Browser, extend, isNullOrUndefined } from '@syncfusion/ej2-base';
import { indexFinder, getElement } from '../../common/utils/helper';
import { pointByIndex } from '../model/acc-base';
import { Index } from '../../common/model/base';
import { BaseSelection } from '../../common/user-interaction/selection';
import { selectionComplete } from '../../common/model/constants';
/**
 * `AccumulationSelection` module handles the selection for accumulation chart.
 */
var AccumulationSelection = /** @class */ (function (_super) {
    __extends(AccumulationSelection, _super);
    function AccumulationSelection(accumulation) {
        var _this = _super.call(this, accumulation) || this;
        _this.accumulation = accumulation;
        _this.renderer = accumulation.renderer;
        _this.addEventListener();
        return _this;
    }
    /**
     * Binding events for selection module.
     */
    AccumulationSelection.prototype.addEventListener = function () {
        if (this.accumulation.isDestroyed) {
            return;
        }
        //let cancelEvent: string = Browser.isPointer ? 'pointerleave' : 'mouseleave';
        this.accumulation.on(Browser.touchMoveEvent, this.mouseMove, this);
        this.accumulation.on('click', this.mouseClick, this);
    };
    /**
     * UnBinding events for selection module.
     */
    AccumulationSelection.prototype.removeEventListener = function () {
        if (this.accumulation.isDestroyed) {
            return;
        }
        this.accumulation.off(Browser.touchMoveEvent, this.mouseMove);
        this.accumulation.off('click', this.mouseClick);
    };
    /**
     * To initialize the private variables
     */
    AccumulationSelection.prototype.initPrivateVariables = function (accumulation) {
        this.styleId = accumulation.element.id + '_ej2_chart_selection';
        this.unselected = accumulation.element.id + '_ej2_deselected';
        this.selectedDataIndexes = [];
        this.rectPoints = null;
    };
    /**
     * Invoke selection for rendered chart.
     *
     * @param {AccumulationChart} accumulation Define the chart to invoke the selection.
     * @returns {void}
     */
    AccumulationSelection.prototype.invokeSelection = function (accumulation) {
        this.initPrivateVariables(accumulation);
        this.series = extend({}, accumulation.visibleSeries, null, true);
        this.seriesStyles();
        this.currentMode = accumulation.selectionMode;
        this.selectDataIndex(this.concatIndexes(accumulation.selectedDataIndexes, this.selectedDataIndexes), accumulation);
    };
    /**
     * To get series selection style by series.
     */
    AccumulationSelection.prototype.generateStyle = function (series, point) {
        return (series.selectionStyle || this.styleId + '_series_' + series.index + '_point_' + point);
    };
    /**
     * To get series selection style while hovering legend
     */
    AccumulationSelection.prototype.generateLegendClickStyle = function (series, eventType) {
        if (eventType === 'mousemove') {
            this.styleId = this.accumulation.element.id + '_ej2_chart_highlight';
        }
        else if (eventType === 'click') {
            this.styleId = this.accumulation.element.id + '_ej2_chart_selection';
        }
        return (series.selectionStyle || this.styleId + '_series_' + series.index);
    };
    /**
     * To get elements by index, series
     */
    AccumulationSelection.prototype.findElements = function (accumulation, series, index) {
        return [this.getElementByIndex(index)];
    };
    /**
     * To get series point element by index
     */
    AccumulationSelection.prototype.getElementByIndex = function (index) {
        var elementId = this.control.element.id + '_Series_' + index.series + '_Point_' + index.point;
        return document.getElementById(elementId);
    };
    /**
     * To find the selected element.
     *
     * @return {void}
     * @private
     */
    AccumulationSelection.prototype.isAlreadySelected = function (targetElement, eventType) {
        if (eventType === 'mousemove') {
            this.currentMode = this.accumulation.highlightMode;
            this.highlightDataIndexes = [];
            this.styleId = this.accumulation.element.id + '_ej2_chart_highlight';
        }
        else if (eventType === 'click') {
            this.currentMode = this.accumulation.selectionMode;
            this.styleId = this.accumulation.element.id + '_ej2_chart_selection';
        }
        if (this.accumulation.highlightMode !== 'None' && this.accumulation.selectionMode === 'None') {
            if (eventType === 'click') {
                return false;
            }
        }
        if ((this.accumulation.highlightMode !== 'None' && this.previousSelectedElement && this.previousSelectedElement[0])) {
            var parentNodeId = targetElement.parentNode.id;
            var isValidElement = void 0;
            if (targetElement.parentNode) {
                isValidElement = (parentNodeId.indexOf('SeriesGroup') > 0 ||
                    parentNodeId.indexOf('SymbolGroup') > 0) ? true : false;
            }
            for (var i = 0; i < this.previousSelectedElement.length; i++) {
                if (this.previousSelectedElement[i].hasAttribute('class')) {
                    if (this.previousSelectedElement[i].getAttribute('class').indexOf('highlight') > -1 && (isValidElement || eventType === 'click')) {
                        this.previousSelectedElement[i].removeAttribute('class');
                        this.addOrRemoveIndex(this.highlightDataIndexes, indexFinder(this.previousSelectedElement[i].id));
                    }
                    else if (!isValidElement && this.previousSelectedElement[i].getAttribute('class').indexOf('highlight') > -1) {
                        this.performSelection(indexFinder(this.previousSelectedElement[i].id), this.accumulation, this.previousSelectedElement[i]);
                    }
                }
            }
        }
        return true;
    };
    /**
     * To calculate selected elements on mouse click or touch
     *
     * @private
     */
    AccumulationSelection.prototype.mouseClick = function (accumulation, event) {
        this.calculateSelectedElements(accumulation, event.target, event.type);
    };
    /**
     * To calculate selected elements on mouse click or touch
     *
     * @private
     */
    AccumulationSelection.prototype.calculateSelectedElements = function (accumulation, targetEle, eventType) {
        if (isNullOrUndefined(targetEle)) {
            return;
        }
        if ((accumulation.highlightMode === 'None' && accumulation.selectionMode === 'None') ||
            targetEle.id.indexOf(accumulation.element.id + '_') === -1) {
            return;
        }
        if (eventType === 'mousemove') {
            if (!isNullOrUndefined(targetEle.parentNode) && targetEle.parentNode.hasAttribute('class') &&
                (targetEle.parentNode.getAttribute('class').indexOf('highlight') > 0 ||
                    targetEle.parentNode.getAttribute('class').indexOf('selection') > 0)) {
                return;
            }
        }
        if (targetEle.getAttribute('id').indexOf('_connector_') > -1) {
            return;
        }
        else {
            this.isAlreadySelected(targetEle, eventType);
            if (targetEle.id.indexOf('_Series_') > -1 || targetEle.id.indexOf('_datalabel_') > -1) {
                this.performSelection(indexFinder(targetEle.id), accumulation, targetEle);
            }
        }
    };
    /**
     * To perform the selection process based on index and element.
     */
    AccumulationSelection.prototype.performSelection = function (index, accumulation, element) {
        element = element.id.indexOf('datalabel') > -1 ?
            accumulation.getSeriesElement().childNodes[index.series].childNodes[index.point]
            : element;
        switch (this.currentMode) {
            case 'Point':
                if (!isNaN(index.point)) {
                    this.selection(accumulation, index, [element]);
                    this.selectionComplete(accumulation, accumulation.series[0]);
                    this.blurEffect(accumulation.element.id, accumulation.visibleSeries);
                }
                break;
        }
    };
    /**
     *  Method to get the selected data index
     *
     * @private
     */
    AccumulationSelection.prototype.selectionComplete = function (accumulation, series) {
        var pointIndex;
        var selectedPointValues = [];
        for (var i = 0; i < this.selectedDataIndexes.length; i++) {
            pointIndex = this.selectedDataIndexes[i].point;
            if (!isNaN(pointIndex)) {
                selectedPointValues.push({
                    x: series.dataSource[pointIndex][series.xName], y: series.points[pointIndex].y,
                    seriesIndex: this.selectedDataIndexes[i].series, pointIndex: pointIndex
                });
            }
        }
        var args = {
            name: selectionComplete,
            selectedDataValues: selectedPointValues,
            cancel: false
        };
        accumulation.trigger(selectionComplete, args);
    };
    /**
     * To select the element by index. Adding or removing selection style class name.
     */
    AccumulationSelection.prototype.selection = function (accumulation, index, selectedElements) {
        if (!accumulation.isMultiSelect && this.styleId.indexOf('highlight') === -1 &&
            accumulation.selectionMode !== 'None') {
            this.removeMultiSelectEelments(accumulation, this.selectedDataIndexes, index, accumulation.series);
        }
        var className = selectedElements[0] && (selectedElements[0].getAttribute('class') || '');
        if (selectedElements[0] && className.indexOf(this.getSelectionClass(selectedElements[0].id, index.point)) > -1) {
            this.removeStyles(selectedElements, index);
            if (this.styleId.indexOf('highlight') > 0 && accumulation.highlightMode !== 'None') {
                this.addOrRemoveIndex(this.highlightDataIndexes, index);
            }
            else {
                this.addOrRemoveIndex(this.selectedDataIndexes, index);
            }
            if (accumulation.enableBorderOnMouseMove) {
                var borderElement = document.getElementById(selectedElements[0].id.split('_')[0] + 'PointHover_Border');
                if (!isNullOrUndefined(borderElement)) {
                    this.removeSvgClass(borderElement, borderElement.getAttribute('class'));
                }
            }
        }
        else {
            this.previousSelectedElement = accumulation.highlightMode !== 'None' ? selectedElements : [];
            if (className.indexOf('selection') < 0) {
                this.applyStyles(selectedElements, index);
            }
            if (accumulation.enableBorderOnMouseMove) {
                var borderElement = document.getElementById(selectedElements[0].id.split('_')[0] + 'PointHover_Border');
                if (!isNullOrUndefined(borderElement)) {
                    this.removeSvgClass(borderElement, borderElement.getAttribute('class'));
                    this.addSvgClass(borderElement, selectedElements[0].getAttribute('class'));
                }
            }
            if (this.styleId.indexOf('highlight') > 0 && accumulation.highlightMode !== 'None') {
                this.addOrRemoveIndex(this.highlightDataIndexes, index, true);
            }
            else {
                this.addOrRemoveIndex(this.selectedDataIndexes, index, true);
            }
        }
    };
    /**
     * To redraw the selection process on accumulation chart refresh.
     *
     * @private
     */
    AccumulationSelection.prototype.redrawSelection = function (accumulation) {
        var selectedDataIndexes = extend([], this.selectedDataIndexes, null, true);
        var highlightDataIndexes = extend([], this.highlightDataIndexes, null, true);
        if (this.styleId.indexOf('highlight') > 0 && highlightDataIndexes.length > 0) {
            this.removeSelectedElements(accumulation, this.highlightDataIndexes);
            selectedDataIndexes = highlightDataIndexes;
        }
        else {
            this.removeSelectedElements(accumulation, this.selectedDataIndexes);
        }
        this.blurEffect(accumulation.element.id, accumulation.visibleSeries);
        this.selectDataIndex(selectedDataIndexes, accumulation);
    };
    /**
     * To remove the selected elements style classes by indexes.
     */
    AccumulationSelection.prototype.removeSelectedElements = function (accumulation, indexes) {
        for (var _i = 0, indexes_1 = indexes; _i < indexes_1.length; _i++) {
            var index = indexes_1[_i];
            this.removeStyles([this.getElementByIndex(index)], index);
        }
        var points = accumulation.visibleSeries[0].points;
        for (var i = 0; i < points.length; i++) {
            var index = new Index(0, points[i].index);
            this.removeStyles([this.getElementByIndex(index)], index);
        }
    };
    /**
     * To perform the selection for legend elements.
     *
     * @private
     */
    AccumulationSelection.prototype.legendSelection = function (accumulation, series, pointIndex, targetEle, eventType) {
        if (eventType === 'mousemove') {
            if (targetEle.id.indexOf('text') > 1) {
                targetEle = getElement(targetEle.id.replace('text', 'shape'));
            }
            if (targetEle.hasAttribute('class') && (targetEle.getAttribute('class').indexOf('highlight') > -1 ||
                targetEle.getAttribute('class').indexOf('selection') > -1)) {
                return;
            }
            this.currentMode = this.accumulation.highlightMode;
        }
        var isPreSelected = this.isAlreadySelected(targetEle, eventType);
        if (isPreSelected) {
            //let element: Element = <Element>accumulation.getSeriesElement().childNodes[series as number].childNodes[pointIndex as number];
            //let seriesStyle: string = this.generateLegendClickStyle(accumulation.visibleSeries[series as number], eventType);
            var seriesElements = accumulation.getSeriesElement().
                childNodes[series].childNodes[pointIndex];
            this.selection(accumulation, new Index(series, pointIndex), [seriesElements]);
            this.blurEffect(accumulation.element.id, accumulation.visibleSeries);
        }
    };
    /**
     * To select the element by selected data indexes.
     */
    AccumulationSelection.prototype.selectDataIndex = function (indexes, accumulation) {
        var element;
        for (var _i = 0, indexes_2 = indexes; _i < indexes_2.length; _i++) {
            var index = indexes_2[_i];
            element = this.getElementByIndex(index);
            if (element) {
                this.performSelection(index, accumulation, element);
            }
        }
    };
    /**
     * To remove the selection styles for multi selection process.
     */
    AccumulationSelection.prototype.removeMultiSelectEelments = function (accumulation, index, currentIndex, seriesCollection) {
        var series;
        for (var i = 0; i < index.length; i++) {
            series = seriesCollection[index[i].series];
            if (!this.checkEquals(index[i], currentIndex)) {
                this.removeStyles(this.findElements(accumulation, series, index[i]), index[i]);
                index.splice(i, 1);
                i--;
            }
        }
    };
    /**
     * To apply the opacity effect for accumulation chart series elements.
     */
    AccumulationSelection.prototype.blurEffect = function (pieId, visibleSeries) {
        var visibility = (this.checkVisibility(this.highlightDataIndexes) ||
            this.checkVisibility(this.selectedDataIndexes)); // legend click scenario
        for (var _i = 0, visibleSeries_1 = visibleSeries; _i < visibleSeries_1.length; _i++) {
            var series = visibleSeries_1[_i];
            if (series.visible) {
                this.checkSelectionElements(document.getElementById(pieId + '_SeriesCollection'), this.generateStyle(series), visibility);
            }
        }
    };
    /**
     * To check selection elements by style class name.
     */
    AccumulationSelection.prototype.checkSelectionElements = function (element, className, visibility) {
        var children = element.childNodes[0].childNodes;
        var legendShape;
        var elementClass;
        var parentClass;
        //let selectElement: Element = element;
        for (var i = 0; i < children.length; i++) {
            elementClass = children[i].getAttribute('class') || '';
            parentClass = children[i].parentNode.getAttribute('class') || '';
            if (this.accumulation.selectionMode !== 'None' || this.accumulation.highlightMode !== 'None') {
                className = elementClass.indexOf('selection') > 0 ||
                    elementClass.indexOf('highlight') > 0 ? elementClass : className;
                className = (parentClass.indexOf('selection') > 0 ||
                    parentClass.indexOf('highlight') > 0) ? parentClass : className;
            }
            if (elementClass.indexOf(className) === -1 && parentClass.indexOf(className) === -1 && visibility) {
                this.addSvgClass(children[i], this.unselected);
            }
            else {
                this.removeSvgClass(children[i], this.unselected);
            }
            if (elementClass.indexOf(className) === -1 &&
                parentClass.indexOf(className) === -1 && visibility) {
                this.addSvgClass(children[i], this.unselected);
            }
            else {
                // selectElement = children[i as number] as HTMLElement;
                this.removeSvgClass(children[i], this.unselected);
                this.removeSvgClass(children[i].parentNode, this.unselected);
            }
            if (this.control.accumulationLegendModule && this.control.legendSettings.visible) {
                legendShape = document.getElementById(this.control.element.id + '_chart_legend_shape_' + i);
                if (legendShape) {
                    if (elementClass.indexOf(className) === -1 && parentClass.indexOf(className) === -1 && visibility) {
                        this.addSvgClass(legendShape, this.unselected);
                    }
                    else {
                        this.removeSvgClass(legendShape, this.unselected);
                    }
                }
            }
        }
    };
    /**
     * To apply selection style for elements.
     */
    AccumulationSelection.prototype.applyStyles = function (elements, index) {
        var accumulationTooltip = this.control.accumulationTooltipModule;
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var element = elements_1[_i];
            var legendShape = void 0;
            if (element) {
                if (this.control.accumulationLegendModule && this.control.legendSettings.visible) {
                    legendShape = document.getElementById(this.control.element.id + '_chart_legend_shape_' + index.point);
                    this.removeSvgClass(legendShape, legendShape.getAttribute('class'));
                    this.addSvgClass(legendShape, this.getSelectionClass(legendShape.id, index.point));
                }
                this.removeSvgClass(element.parentNode, this.unselected);
                this.removeSvgClass(element, this.unselected);
                var opacity = accumulationTooltip && (accumulationTooltip.previousPoints.length > 0 &&
                    accumulationTooltip.previousPoints[0].point.index !== index.point) ?
                    accumulationTooltip.svgTooltip.opacity : this.series[index.series].opacity;
                element.setAttribute('opacity', opacity.toString());
                this.addSvgClass(element, this.getSelectionClass(element.id, index.point));
            }
        }
    };
    /**
     * To get selection style class name by id
     */
    AccumulationSelection.prototype.getSelectionClass = function (id, point) {
        return this.generateStyle(this.control.series[indexFinder(id).series], point);
    };
    /**
     * To remove selection style for elements.
     */
    AccumulationSelection.prototype.removeStyles = function (elements, index) {
        var accumulationTooltip = this.control.accumulationTooltipModule;
        var legendShape;
        for (var _i = 0, elements_2 = elements; _i < elements_2.length; _i++) {
            var element = elements_2[_i];
            if (element) {
                if (this.control.accumulationLegendModule && this.control.legendSettings.visible) {
                    legendShape = document.getElementById(this.control.element.id + '_chart_legend_shape_' + index.point);
                    this.removeSvgClass(legendShape, this.getSelectionClass(legendShape.id, index.point));
                }
                var opacity = accumulationTooltip && accumulationTooltip.previousPoints.length > 0
                    && (accumulationTooltip.previousPoints[0].point.index === index.point) ?
                    accumulationTooltip.svgTooltip.opacity : this.series[index.series].opacity;
                element.setAttribute('opacity', opacity.toString());
                this.removeSvgClass(element, this.getSelectionClass(element.id, index.point));
            }
        }
    };
    /**
     * To apply or remove selected elements index.
     */
    AccumulationSelection.prototype.addOrRemoveIndex = function (indexes, index, add) {
        for (var i = 0; i < indexes.length; i++) {
            if (this.checkEquals(indexes[i], index)) {
                indexes.splice(i, 1);
                i--;
            }
        }
        if (add) {
            indexes.push(index);
        }
    };
    /**
     * To check two index, point and series are equal
     */
    AccumulationSelection.prototype.checkEquals = function (first, second) {
        return ((first.point === second.point) && (first.series === second.series));
    };
    /** @private */
    AccumulationSelection.prototype.mouseMove = function (event) {
        var accumulation = this.accumulation;
        var targetElement = event.target;
        if (accumulation.highlightMode !== 'None') {
            if (!isNullOrUndefined(targetElement)) {
                if (event.target.id.indexOf('text') > 1) {
                    targetElement = getElement(event.target.id.replace('text', 'shape'));
                }
                if ((targetElement).hasAttribute('class') && (targetElement).getAttribute('class').indexOf('highlight') > -1) {
                    return;
                }
                this.calculateSelectedElements(accumulation, event.target, event.type);
                return;
            }
        }
        if (accumulation.selectionMode === 'None') {
            return;
        }
    };
    /**
     * To check selected points are visibility
     */
    AccumulationSelection.prototype.checkPointVisibility = function (selectedDataIndexes) {
        var visible = false;
        for (var _i = 0, selectedDataIndexes_1 = selectedDataIndexes; _i < selectedDataIndexes_1.length; _i++) {
            var data = selectedDataIndexes_1[_i];
            if (pointByIndex(data.point, this.control.visibleSeries[0].points).visible) {
                visible = true;
                break;
            }
        }
        return visible;
    };
    /**
     * Get module name.
     */
    AccumulationSelection.prototype.getModuleName = function () {
        return 'AccumulationSelection';
    };
    /**
     * To destroy the selection.
     *
     * @returns {void}
     * @private
     */
    AccumulationSelection.prototype.destroy = function () {
        // Destroy method performed here
        this.removeEventListener();
    };
    return AccumulationSelection;
}(BaseSelection));
export { AccumulationSelection };
