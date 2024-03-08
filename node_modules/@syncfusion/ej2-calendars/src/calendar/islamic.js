/**
 *
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventHandler, Internationalization } from '@syncfusion/ej2-base';
import { rippleEffect } from '@syncfusion/ej2-base';
import { removeClass, addClass, attributes, HijriParser } from '@syncfusion/ej2-base';
import { getUniqueID } from '@syncfusion/ej2-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
//class constant defination.
var OTHERMONTH = 'e-other-month';
var YEAR = 'e-year';
var MONTH = 'e-month';
var DECADE = 'e-decade';
var DISABLED = 'e-disabled';
var OVERLAY = 'e-overlay';
var WEEKEND = 'e-weekend';
var WEEKNUMBER = 'e-week-number';
var SELECTED = 'e-selected';
var FOCUSEDDATE = 'e-focused-date';
var OTHERMONTHROW = 'e-month-hide';
var TODAY = 'e-today';
var LINK = 'e-day';
var CELL = 'e-cell';
var dayMilliSeconds = 86400000;
var minDecade = 2060;
var maxDecade = 2069;
var Islamic = /** @class */ (function () {
    function Islamic(instance) {
        this.calendarInstance = instance;
    }
    Islamic.prototype.getModuleName = function () {
        return 'islamic';
    };
    Islamic.prototype.islamicTitleUpdate = function (date, view) {
        var globalize = new Internationalization(this.calendarInstance.locale);
        switch (view) {
            case 'days':
                this.calendarInstance.headerTitleElement.textContent = globalize.formatDate(date, { type: 'dateTime', format: 'MMMMyyyy', calendar: 'islamic' });
                break;
            case 'months':
                this.calendarInstance.headerTitleElement.textContent = globalize.formatDate(date, { type: 'dateTime', format: 'yyyy', calendar: 'islamic' });
        }
    };
    Islamic.prototype.islamicRenderDays = function (currentDate, value, multiSelection, values) {
        var tdEles = [];
        var cellsCount = 42;
        var localDate = new Date(this.islamicInValue(currentDate));
        var minMaxDate;
        this.islamicTitleUpdate(currentDate, 'days');
        var islamicDate = this.getIslamicDate(localDate);
        var gregorianObject = this.toGregorian(islamicDate.year, islamicDate.month, 1);
        var currentMonth = islamicDate.month;
        localDate = gregorianObject;
        while (localDate.getDay() !== this.calendarInstance.firstDayOfWeek) {
            this.calendarInstance.setStartDate(localDate, -1 * dayMilliSeconds);
        }
        for (var day = 0; day < cellsCount; ++day) {
            var weekEle = this.calendarInstance.createElement('td', { className: CELL });
            var weekAnchor = this.calendarInstance.createElement('span');
            if (day % 7 === 0 && this.calendarInstance.weekNumber) {
                weekAnchor.textContent = '' + this.calendarInstance.getWeek(localDate);
                weekEle.appendChild(weekAnchor);
                addClass([weekEle], '' + WEEKNUMBER);
                tdEles.push(weekEle);
            }
            minMaxDate = new Date(+localDate);
            localDate = this.calendarInstance.minMaxDate(localDate);
            var dateFormatOptions = { type: 'dateTime', skeleton: 'full', calendar: 'islamic' };
            var date = this.calendarInstance.globalize.parseDate(this.calendarInstance.globalize.formatDate(localDate, dateFormatOptions), dateFormatOptions);
            var tdEle = this.islamicDayCell(localDate);
            var title = this.calendarInstance.globalize.formatDate(localDate, { type: 'date', skeleton: 'full', calendar: 'islamic' });
            var dayLink = this.calendarInstance.createElement('span');
            dayLink.textContent = this.calendarInstance.globalize.formatDate(localDate, { type: 'date', skeleton: 'd', calendar: 'islamic' });
            var disabled = (this.calendarInstance.min > localDate) || (this.calendarInstance.max < localDate);
            if (disabled) {
                addClass([tdEle], DISABLED);
                addClass([tdEle], OVERLAY);
            }
            else {
                dayLink.setAttribute('title', '' + title);
            }
            var hijriMonthObject = this.getIslamicDate(localDate);
            if (currentMonth !== hijriMonthObject.month) {
                addClass([tdEle], OTHERMONTH);
            }
            if (localDate.getDay() === 0 || localDate.getDay() === 6) {
                addClass([tdEle], WEEKEND);
            }
            tdEle.appendChild(dayLink);
            this.calendarInstance.renderDayCellArgs = {
                date: localDate,
                isDisabled: false,
                element: tdEle,
                isOutOfRange: disabled
            };
            var argument = this.calendarInstance.renderDayCellArgs;
            this.calendarInstance.renderDayCellEvent(argument);
            if (argument.isDisabled) {
                if (this.calendarInstance.isMultiSelection) {
                    if (!isNullOrUndefined(this.calendarInstance.values) && this.calendarInstance.values.length > 0) {
                        for (var index = 0; index < values.length; index++) {
                            var localDateString = +new Date(this.calendarInstance.globalize.formatDate(argument.date, { type: 'date', skeleton: 'yMd', calendar: 'islamic' }));
                            var tempDateString = +new Date(this.calendarInstance.globalize.formatDate(this.calendarInstance.values[index], { type: 'date', skeleton: 'yMd', calendar: 'islamic' }));
                            if (localDateString === tempDateString) {
                                this.calendarInstance.values.splice(index, 1);
                                index = -1;
                            }
                        }
                    }
                }
                else if (value && +value === +argument.date) {
                    this.calendarInstance.setProperties({ value: null }, true);
                }
            }
            if (this.calendarInstance.renderDayCellArgs.isDisabled && !tdEle.classList.contains(SELECTED)) {
                addClass([tdEle], DISABLED);
                addClass([tdEle], OVERLAY);
                if (+this.calendarInstance.renderDayCellArgs.date === +this.calendarInstance.todayDate) {
                    this.calendarInstance.todayDisabled = true;
                }
            }
            var otherMnthBool = tdEle.classList.contains(OTHERMONTH);
            var disabledCls = tdEle.classList.contains(DISABLED);
            if (!disabledCls) {
                EventHandler.add(tdEle, 'click', this.calendarInstance.clickHandler, this.calendarInstance);
            }
            if (this.calendarInstance.isMultiSelection && !isNullOrUndefined(this.calendarInstance.values) &&
                !otherMnthBool && !disabledCls) {
                for (var tempValue = 0; tempValue < this.calendarInstance.values.length; tempValue++) {
                    var localDateString = this.calendarInstance.globalize.formatDate(localDate, { type: 'date', skeleton: 'short', calendar: 'islamic' });
                    var tempDateString = this.calendarInstance.globalize.formatDate(this.calendarInstance.values[tempValue], { type: 'date', skeleton: 'short', calendar: 'islamic' });
                    if (localDateString === tempDateString &&
                        this.calendarInstance.getDateVal(localDate, this.calendarInstance.values[tempValue])) {
                        addClass([tdEle], SELECTED);
                    }
                    else {
                        this.calendarInstance.updateFocus(otherMnthBool, disabledCls, localDate, tdEle, currentDate);
                    }
                }
                if (this.calendarInstance.values.length <= 0) {
                    this.calendarInstance.updateFocus(otherMnthBool, disabledCls, localDate, tdEle, currentDate);
                }
            }
            else if (!otherMnthBool && !disabledCls && this.calendarInstance.getDateVal(localDate, value)) {
                addClass([tdEle], SELECTED);
            }
            else {
                this.calendarInstance.updateFocus(otherMnthBool, disabledCls, localDate, tdEle, currentDate);
            }
            if (date.getDate() === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
                if (date.getFullYear() === new Date().getFullYear()) {
                    addClass([tdEle], TODAY);
                }
            }
            localDate = new Date(+minMaxDate);
            tdEles.push(this.calendarInstance.renderDayCellArgs.element);
            this.calendarInstance.addDay(localDate, 1, null, this.calendarInstance.max, this.calendarInstance.min);
        }
        return tdEles;
    };
    Islamic.prototype.islamicIconHandler = function () {
        new Date(this.islamicInValue(this.calendarInstance.currentDate)).setDate(1);
        var date = new Date(this.islamicInValue(this.calendarInstance.currentDate));
        switch (this.calendarInstance.currentView()) {
            case 'Month':
                {
                    var prevMonthCompare = this.islamicCompareMonth(date, this.calendarInstance.min) < 1;
                    var nextMonthCompare = this.islamicCompareMonth(date, this.calendarInstance.max) > -1;
                    this.calendarInstance.previousIconHandler(prevMonthCompare);
                    this.calendarInstance.nextIconHandler(nextMonthCompare);
                }
                break;
            case 'Year':
                {
                    var prevYearCompare = this.hijriCompareYear(date, this.calendarInstance.min) < 1;
                    var nextYearCompare = this.hijriCompareYear(date, this.calendarInstance.max) > -1;
                    this.calendarInstance.previousIconHandler(prevYearCompare);
                    this.calendarInstance.nextIconHandler(nextYearCompare);
                }
                break;
            case 'Decade': {
                var startIslamicYear = 1361;
                var gregorianValue = HijriParser.toGregorian(startIslamicYear, 1, 1);
                var prevDecadeCompare = this.hijriCompareDecade(date, this.calendarInstance.min) < 1;
                var nextDecadeCompare = this.hijriCompareDecade(date, this.calendarInstance.max) > -1;
                prevDecadeCompare = HijriParser.toGregorian(this.calendarInstance.headerTitleElement.textContent.split('-')[0].trim(), 1, 1).getFullYear() === gregorianValue.getFullYear() ? true : prevDecadeCompare;
                this.calendarInstance.previousIconHandler(prevDecadeCompare);
                this.calendarInstance.nextIconHandler(nextDecadeCompare);
            }
        }
    };
    Islamic.prototype.islamicNext = function () {
        this.calendarInstance.effect = '';
        var view = this.calendarInstance.getViewNumber(this.calendarInstance.currentView());
        var islamicDate = this.getIslamicDate(this.calendarInstance.currentDate);
        switch (this.calendarInstance.currentView()) {
            case 'Year':
                this.calendarInstance.currentDate = this.toGregorian(islamicDate.year + 1, islamicDate.month, 1);
                this.calendarInstance.switchView(view);
                break;
            case 'Month':
                this.calendarInstance.currentDate = this.toGregorian(islamicDate.year, islamicDate.month + 1, 1);
                this.calendarInstance.switchView(view);
                break;
            case 'Decade':
                this.calendarInstance.nextIconClicked = true;
                if (islamicDate.year - this.calendarInstance.headerElement.textContent.split('-')[0].trim() === 1) {
                    islamicDate.year = islamicDate.year - this.calendarInstance.headerElement.textContent.split('-')[0].trim() === 1 ? islamicDate.year + 1 : islamicDate.year;
                }
                this.calendarInstance.currentDate = this.toGregorian(islamicDate.year + 10, islamicDate.month, 1);
                this.calendarInstance.switchView(view);
                break;
        }
    };
    Islamic.prototype.islamicPrevious = function () {
        var currentView = this.calendarInstance.getViewNumber(this.calendarInstance.currentView());
        this.calendarInstance.effect = '';
        var islamicDate = this.getIslamicDate(this.calendarInstance.currentDate);
        switch (this.calendarInstance.currentView()) {
            case 'Month':
                this.calendarInstance.currentDate = this.toGregorian(islamicDate.year, islamicDate.month - 1, 1);
                this.calendarInstance.switchView(currentView);
                break;
            case 'Year':
                this.calendarInstance.currentDate = this.toGregorian(islamicDate.year - 1, islamicDate.month, 1);
                this.calendarInstance.switchView(currentView);
                break;
            case 'Decade':
                this.calendarInstance.previousIconClicked = true;
                this.calendarInstance.currentDate = this.toGregorian(islamicDate.year - 10, islamicDate.month - 1, 1);
                this.calendarInstance.switchView(currentView);
                break;
        }
    };
    Islamic.prototype.islamicRenderYears = function (e, value) {
        this.calendarInstance.removeTableHeadElement();
        var numCells = 4;
        var tdEles = [];
        var valueUtil = isNullOrUndefined(value);
        var curDate = new Date(this.islamicInValue(this.calendarInstance.currentDate));
        var localDate = curDate;
        var islamicDate = this.getIslamicDate(localDate);
        var gregorianObject = HijriParser.toGregorian(islamicDate.year, 1, 1);
        localDate = gregorianObject;
        var mon = islamicDate.month;
        var yr = islamicDate.year;
        var curYrs = islamicDate.year;
        var minYr = (this.getIslamicDate(this.calendarInstance.min)).year;
        var minMonth = (this.getIslamicDate(this.calendarInstance.min)).month;
        var maxYr = (this.getIslamicDate(this.calendarInstance.max)).year;
        var maxMonth = (this.getIslamicDate(this.calendarInstance.max)).month;
        this.islamicTitleUpdate(this.calendarInstance.currentDate, 'months');
        for (var month = 1; month <= 12; ++month) {
            var islamicDate_1 = this.getIslamicDate(localDate);
            var gregorianObject_1 = HijriParser.toGregorian(islamicDate_1.year, month, 1);
            localDate = gregorianObject_1;
            var tdEle = this.islamicDayCell(localDate);
            var dayLink = this.calendarInstance.createElement('span');
            var localMonth = (value &&
                (this.getIslamicDate(value)).month === (this.getIslamicDate(localDate)).month);
            var select = (value && (this.getIslamicDate(value)).year === yr && localMonth);
            dayLink.textContent = this.calendarInstance.globalize.formatDate(localDate, { type: 'dateTime', format: 'MMM', calendar: 'islamic' });
            if ((this.calendarInstance.min && (curYrs < minYr || (month < minMonth && curYrs === minYr))) || (this.calendarInstance.max && (curYrs > maxYr || (month > maxMonth && curYrs >= maxYr)))) {
                addClass([tdEle], DISABLED);
            }
            else if (!valueUtil && select) {
                addClass([tdEle], SELECTED);
            }
            else {
                if ((this.getIslamicDate(localDate)).month === mon &&
                    (this.getIslamicDate(this.calendarInstance.currentDate)).month === mon) {
                    addClass([tdEle], FOCUSEDDATE);
                }
            }
            if (!tdEle.classList.contains(DISABLED)) {
                EventHandler.add(tdEle, 'click', this.calendarInstance.clickHandler, this.calendarInstance);
            }
            tdEle.appendChild(dayLink);
            tdEles.push(tdEle);
        }
        this.islamicRenderTemplate(tdEles, numCells, YEAR, e, value);
    };
    Islamic.prototype.islamicRenderDecade = function (e, value) {
        this.calendarInstance.removeTableHeadElement();
        var numCells = 4;
        var yearCell = 12;
        var tdEles = [];
        var localDate = new Date(this.islamicInValue(this.calendarInstance.currentDate));
        var islamicDate = this.getIslamicDate(localDate);
        var gregorianObject = HijriParser.toGregorian(islamicDate.year, 1, 1);
        localDate = gregorianObject;
        var localYr = localDate.getFullYear();
        var startYr = new Date(this.islamicInValue((localYr - localYr % 10)));
        var endYr = new Date(this.islamicInValue((localYr - localYr % 10 + (10 - 1))));
        var startFullYr = startYr.getFullYear();
        var endFullYr = endYr.getFullYear();
        var startHdrYr = this.calendarInstance.globalize.formatDate(startYr, { type: 'dateTime', format: 'y', calendar: 'islamic' });
        var endHdrYr = this.calendarInstance.globalize.formatDate(endYr, { type: 'dateTime', format: 'y', calendar: 'islamic' });
        if (this.calendarInstance.locale === 'ar') {
            startHdrYr = Number(startHdrYr.replace(/[٠١٢٣٤٥٦٧٨٩]/g, function (d) { return String.fromCharCode(d.charCodeAt(0) - 1632 + 48); }));
            endHdrYr = Number(endHdrYr.replace(/[٠١٢٣٤٥٦٧٨٩]/g, function (d) { return String.fromCharCode(d.charCodeAt(0) - 1632 + 48); }));
        }
        var splityear = this.calendarInstance.headerElement.textContent.split('-');
        if ((!isNullOrUndefined(e) && (splityear[0] !== startHdrYr) && e.action === 'home') || (!isNullOrUndefined(e) && e.type === 'keydown' && e.action === 'end')) {
            startHdrYr = this.calendarInstance.headerElement.textContent.split('-')[0].trim();
            endHdrYr = this.calendarInstance.headerElement.textContent.split('-')[1].trim();
        }
        if (this.calendarInstance.islamicPreviousHeader) {
            startHdrYr = this.calendarInstance.islamicPreviousHeader.split('-')[0].trim();
            endHdrYr = this.calendarInstance.islamicPreviousHeader.split('-')[1].trim();
            this.calendarInstance.islamicPreviousHeader = null;
        }
        if (this.calendarInstance.previousIconClicked) {
            // eslint-disable-next-line no-var
            for (var i = 0; i <= splityear.length; i++) {
                endHdrYr = endHdrYr - splityear[i] === 2 || splityear[i]
                    - endHdrYr === 2 ? (parseInt(endHdrYr, 10) + 1).toString() :
                    endHdrYr - splityear[i] === 3 || splityear[i] - endHdrYr === 3 ?
                        (parseInt(endHdrYr, 10) + 2).toString() : endHdrYr - splityear[i] === 4 ||
                        splityear[i] - endHdrYr === 4 ? (parseInt(endHdrYr, 10) + 3).toString() :
                        endHdrYr - splityear[i] === 5 || splityear[i] - endHdrYr === 5 ?
                            (parseInt(endHdrYr, 10) + 4).toString() : endHdrYr;
                if (endHdrYr - splityear[i] === 0 || splityear[i] - endHdrYr === 0) {
                    endHdrYr = (parseInt(endHdrYr, 10) - 1).toString();
                }
            }
            if (endHdrYr - splityear[i] === 8 || splityear[i] - endHdrYr === 8) {
                endHdrYr = (parseInt(endHdrYr, 10) - 9).toString();
                startHdrYr = (parseInt(endHdrYr, 10) - 9).toString();
            }
            if (endHdrYr - splityear[i] === 7 || splityear[i] - endHdrYr === 7) {
                endHdrYr = (parseInt(endHdrYr, 10) - 8).toString();
                startHdrYr = (parseInt(endHdrYr, 10) - 9).toString();
            }
            startHdrYr = endHdrYr - startHdrYr === 10
                ? (parseInt(startHdrYr, 10) + 1).toString() : endHdrYr - startHdrYr === 11
                ? (parseInt(startHdrYr, 10) + 2).toString() : endHdrYr - startHdrYr === 12
                ? (parseInt(startHdrYr, 10) + 3).toString() : startHdrYr;
            if (endHdrYr - startHdrYr === 8) {
                startHdrYr = (parseInt(startHdrYr, 10) - 1).toString();
            }
        }
        if (this.calendarInstance.nextIconClicked) {
            for (var i_1 = 0; i_1 <= splityear.length; i_1++) {
                if (startHdrYr - splityear[i_1] === 0 || splityear[i_1] - startHdrYr === 0) {
                    startHdrYr = (parseInt(startHdrYr, 10) + 1).toString();
                }
                if (startHdrYr - splityear[i_1] === 2 && startHdrYr > splityear[i_1].trim()) {
                    startHdrYr = (parseInt(startHdrYr, 10) - 1).toString();
                }
                if (splityear[i_1] - startHdrYr === 1 && startHdrYr < splityear[i_1].trim()) {
                    startHdrYr = (parseInt(startHdrYr, 10) + 2).toString();
                }
            }
            if (startHdrYr - this.calendarInstance.headerTitleElement.textContent.split('-')[1].trim() > 1) {
                startHdrYr = (parseInt(this.calendarInstance.headerTitleElement.textContent.split('-')[1].trim(), 10) + 1).toString();
                endHdrYr = (parseInt(startHdrYr, 10) + 9).toString();
            }
            endHdrYr = endHdrYr - startHdrYr === 10 ? (parseInt(endHdrYr, 10) - 1).toString() : endHdrYr;
            endHdrYr = endHdrYr - startHdrYr === 7
                ? (parseInt(endHdrYr, 10) + 2).toString() : endHdrYr - startHdrYr === 8
                ? (parseInt(endHdrYr, 10) + 1).toString() : endHdrYr;
        }
        if (this.calendarInstance.locale === 'ar') {
            var startHeaderYear = this.calendarInstance.globalize.formatDate(startYr, { type: 'dateTime', format: 'y', calendar: 'islamic' });
            var endHeaderYear = this.calendarInstance.globalize.formatDate(endYr, { type: 'dateTime', format: 'y', calendar: 'islamic' });
            this.calendarInstance.headerTitleElement.textContent = startHeaderYear + ' - ' + (endHeaderYear);
        }
        else {
            this.calendarInstance.headerTitleElement.textContent = startHdrYr + ' - ' + (endHdrYr);
        }
        this.calendarInstance.nextIconClicked = this.calendarInstance.previousIconClicked = false;
        var year = (parseInt(startHdrYr, 10) - 2).toString();
        startFullYr = Math.round(parseInt(startHdrYr, 10) * 0.97 + 622);
        endFullYr = Math.round(parseInt(endHdrYr, 10) * 0.97 + 622);
        var startYear = Math.round(parseInt(year, 10) * 0.97 + 622);
        for (var rowCount = 1; rowCount <= yearCell; ++rowCount) {
            var year_1 = startYear + rowCount;
            localDate.setFullYear(year_1);
            localDate.setDate(1);
            localDate.setMonth(0);
            if ((this.getIslamicDate(localDate).year - islamicDate.year) > 1) {
                localDate.setMonth(1);
                rowCount = rowCount - 1;
                localDate.setFullYear(localDate.getFullYear() - 1);
            }
            islamicDate = this.getIslamicDate(localDate);
            var gregorianObject_2 = HijriParser.toGregorian(islamicDate.year, 1, 1);
            localDate = gregorianObject_2;
            if (islamicDate.year === parseInt(startHdrYr, 10) - 1 || islamicDate.year >= startHdrYr &&
                islamicDate.year <= endFullYr || islamicDate.year === parseInt(endHdrYr, 10) + 1) {
                var tdEle = this.islamicDayCell(localDate);
                attributes(tdEle, { 'role': 'gridcell' });
                var dayLink = this.calendarInstance.createElement('span');
                dayLink.textContent = this.calendarInstance.globalize.formatDate(localDate, { type: 'dateTime', format: 'y', calendar: 'islamic' });
                if (islamicDate.year === parseInt(startHdrYr, 10) - 1 || (year_1 < startFullYr) ||
                    (year_1 > endFullYr) && islamicDate.year !== parseInt(endHdrYr, 10)) {
                    addClass([tdEle], OTHERMONTH);
                }
                else if (year_1 < new Date(this.islamicInValue(this.calendarInstance.min)).getFullYear()
                    || year_1 > new Date(this.islamicInValue(this.calendarInstance.max)).getFullYear()) {
                    addClass([tdEle], DISABLED);
                }
                else if (!isNullOrUndefined(value) &&
                    (this.getIslamicDate(localDate)).year ===
                        (this.getIslamicDate(value)).year) {
                    addClass([tdEle], SELECTED);
                }
                else {
                    if (localDate.getFullYear() === this.calendarInstance.currentDate.getFullYear() &&
                        !tdEle.classList.contains(DISABLED)) {
                        addClass([tdEle], FOCUSEDDATE);
                    }
                }
                if (!tdEle.classList.contains(DISABLED)) {
                    EventHandler.add(tdEle, 'click', this.calendarInstance.clickHandler, this.calendarInstance);
                }
                tdEle.appendChild(dayLink);
                if ((!isNullOrUndefined(e) && e.action === 'home' && islamicDate.year.toString() === startHdrYr) || (!isNullOrUndefined(e) && e.action === 'end' && islamicDate.year.toString() === endHdrYr)) {
                    addClass([tdEle], FOCUSEDDATE);
                }
                tdEles.push(tdEle);
            }
        }
        this.islamicRenderTemplate(tdEles, numCells, 'e-decade', e, value);
    };
    Islamic.prototype.islamicDayCell = function (localDate) {
        var dateFormatOptions = { skeleton: 'full', type: 'dateTime', calendar: 'islamic' };
        var formatDate = this.calendarInstance.globalize.formatDate(localDate, dateFormatOptions);
        var date = this.calendarInstance.globalize.parseDate(formatDate, dateFormatOptions);
        var value = date.valueOf();
        var attrs = {
            className: CELL, attrs: { 'id': '' + getUniqueID('' + value), 'aria-selected': 'false', 'role': 'gridcell' }
        };
        return this.calendarInstance.createElement('td', attrs);
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Islamic.prototype.islamicRenderTemplate = function (elements, count, classNm, e, value) {
        var view = this.calendarInstance.getViewNumber(this.calendarInstance.currentView());
        var trEle;
        this.calendarInstance.tableBodyElement = this.calendarInstance.createElement('tbody');
        this.calendarInstance.table.appendChild(this.calendarInstance.tableBodyElement);
        removeClass([this.calendarInstance.contentElement, this.calendarInstance.headerElement], [MONTH, DECADE, YEAR]);
        addClass([this.calendarInstance.contentElement, this.calendarInstance.headerElement], [classNm]);
        var weekNumCell = 41;
        var numberCell = 35;
        var otherMonthCell = 6;
        var row = count;
        var rowCount = 0;
        for (var dayCell = 0; dayCell < Math.round(elements.length / count); ++dayCell) {
            trEle = this.calendarInstance.createElement('tr', { attrs: { 'role': 'row' } });
            for (rowCount = 0 + rowCount; rowCount < row; rowCount++) {
                if (!elements[rowCount].classList.contains('e-week-number') && !isNullOrUndefined(elements[rowCount].children[0])) {
                    addClass([elements[rowCount].children[0]], [LINK]);
                    rippleEffect(elements[rowCount].children[0], {
                        duration: 600,
                        isCenterRipple: true
                    });
                }
                trEle.appendChild(elements[rowCount]);
                if (this.calendarInstance.weekNumber &&
                    rowCount === otherMonthCell + 1 && elements[otherMonthCell + 1].classList.contains(OTHERMONTH)) {
                    addClass([trEle], OTHERMONTHROW);
                }
                if (!this.calendarInstance.weekNumber
                    && rowCount === otherMonthCell && elements[otherMonthCell].classList.contains(OTHERMONTH)) {
                    addClass([trEle], OTHERMONTHROW);
                }
                if (this.calendarInstance.weekNumber) {
                    if (rowCount === weekNumCell && elements[weekNumCell].classList.contains(OTHERMONTH)) {
                        addClass([trEle], OTHERMONTHROW);
                    }
                }
                else {
                    if (rowCount === numberCell && elements[numberCell].classList.contains(OTHERMONTH)) {
                        addClass([trEle], OTHERMONTHROW);
                    }
                }
            }
            row = row + count;
            rowCount = rowCount + 0;
            this.calendarInstance.tableBodyElement.appendChild(trEle);
        }
        this.calendarInstance.table.querySelector('tbody').className = this.calendarInstance.effect;
        this.islamicIconHandler();
        if (view !== this.calendarInstance.getViewNumber(this.calendarInstance.currentView())
            || (view === 0 && view !== this.calendarInstance.getViewNumber(this.calendarInstance.currentView()))) {
            this.calendarInstance.navigateHandler(e);
        }
        this.calendarInstance.setAriaActiveDescendant();
        this.calendarInstance.changedArgs = { value: this.calendarInstance.value, values: this.calendarInstance.values };
        this.calendarInstance.changeHandler();
    };
    Islamic.prototype.islamicCompareMonth = function (start, end) {
        var hijriStart = (this.getIslamicDate(start));
        var hijriEnd = (this.getIslamicDate(end));
        var result;
        if (hijriStart.year > hijriEnd.year) {
            result = 1;
        }
        else if (hijriStart.year < hijriEnd.year) {
            result = -1;
        }
        else {
            result = hijriStart.month === hijriEnd.month ? 0 : hijriStart.month > hijriEnd.month ? 1 : -1;
        }
        return result;
    };
    Islamic.prototype.islamicCompare = function (startDate, endDate, modifier) {
        var hijriStart = this.getIslamicDate(startDate);
        var hijriEnd = this.getIslamicDate(endDate);
        var start = hijriEnd.year;
        var end;
        var result;
        end = start;
        result = 0;
        if (modifier) {
            start = start - start % modifier;
            end = start - start % modifier + modifier - 1;
        }
        if (hijriStart.year > end) {
            result = 1;
        }
        else if ((this.calendarInstance.currentView() === 'Decade') && hijriStart.year < start &&
            !((startDate.getFullYear() >= minDecade && startDate.getFullYear() <= maxDecade))) {
            result = -1;
        }
        else if (hijriStart.year < start && (this.calendarInstance.currentView() === 'Year')) {
            result = -1;
        }
        return result;
    };
    Islamic.prototype.getIslamicDate = function (date) {
        return (HijriParser.getHijriDate(date));
    };
    Islamic.prototype.toGregorian = function (year, month, date) {
        return HijriParser.toGregorian(year, month, date);
    };
    Islamic.prototype.hijriCompareYear = function (start, end) {
        return this.islamicCompare(start, end, 0);
    };
    Islamic.prototype.hijriCompareDecade = function (start, end) {
        return this.islamicCompare(start, end, 10);
    };
    Islamic.prototype.destroy = function () {
        this.calendarInstance = null;
    };
    Islamic.prototype.islamicInValue = function (inValue) {
        if (inValue instanceof Date) {
            return (inValue.toUTCString());
        }
        else {
            return ('' + inValue);
        }
    };
    return Islamic;
}());
export { Islamic };
/* eslint-enable @typescript-eslint/no-explicit-any */
