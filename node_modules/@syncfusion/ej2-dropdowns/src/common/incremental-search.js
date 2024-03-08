/**
 * IncrementalSearch module file
 */
var queryString = '';
var prevString = '';
var tempQueryString = '';
var matches = [];
var activeClass = 'e-active';
var prevElementId = '';
/**
 * Search and focus the list item based on key code matches with list text content
 *
 * @param  { number } keyCode - Specifies the key code which pressed on keyboard events.
 * @param  { HTMLElement[]} items - Specifies an array of HTMLElement, from which matches find has done.
 * @param { number } selectedIndex - Specifies the selected item in list item, so that search will happen
 * after selected item otherwise it will do from initial.
 * @param  { boolean } ignoreCase - Specifies the case consideration when search has done.
 * @param {string} elementId - Specifies the list element ID.
 * @returns {Element} Returns list item based on key code matches with list text content.
 */
export function incrementalSearch(keyCode, items, selectedIndex, ignoreCase, elementId, queryStringUpdated, currentValue, isVirtual, refresh) {
    if (!queryStringUpdated || queryString === '') {
        if (tempQueryString != '') {
            queryString = tempQueryString + String.fromCharCode(keyCode);
            tempQueryString = '';
        }
        else {
            queryString += String.fromCharCode(keyCode);
        }
    }
    else if (queryString == prevString) {
        tempQueryString = String.fromCharCode(keyCode);
    }
    if (isVirtual) {
        setTimeout(function () {
            tempQueryString = '';
        }, 700);
        setTimeout(function () {
            queryString = '';
        }, 3000);
    }
    else {
        setTimeout(function () {
            queryString = '';
        }, 1000);
    }
    var index;
    queryString = ignoreCase ? queryString.toLowerCase() : queryString;
    if (prevElementId === elementId && prevString === queryString && !refresh) {
        for (var i = 0; i < matches.length; i++) {
            if (matches[i].classList.contains(activeClass)) {
                index = i;
                break;
            }
            if (currentValue && matches[i].textContent.toLowerCase() === currentValue.toLowerCase()) {
                index = i;
                break;
            }
        }
        index = index + 1;
        if (isVirtual) {
            return matches[index] && matches.length - 1 != index ? matches[index] : matches[matches.length];
        }
        return matches[index] ? matches[index] : matches[0];
    }
    else {
        var listItems = items;
        var strLength = queryString.length;
        var text = void 0;
        var item = void 0;
        selectedIndex = selectedIndex ? selectedIndex + 1 : 0;
        var i = selectedIndex;
        matches = [];
        do {
            if (i === listItems.length) {
                i = -1;
            }
            if (i === -1) {
                index = 0;
            }
            else {
                index = i;
            }
            item = listItems[index];
            text = ignoreCase ? item.innerText.toLowerCase() : item.innerText;
            if (text.substr(0, strLength) === queryString) {
                matches.push(listItems[index]);
            }
            i++;
        } while (i !== selectedIndex);
        prevString = queryString;
        prevElementId = elementId;
        if (isVirtual) {
            var indexUpdated = false;
            for (var i_1 = 0; i_1 < matches.length; i_1++) {
                if (currentValue && matches[i_1].textContent.toLowerCase() === currentValue.toLowerCase()) {
                    index = i_1;
                    indexUpdated = true;
                    break;
                }
            }
            if (currentValue && indexUpdated) {
                index = index + 1;
            }
            return matches[index] ? matches[index] : matches[0];
        }
        return matches[0];
    }
}
/**
 * Search the list item based on given input value matches with search type.
 *
 * @param {string} inputVal - Specifies the given input value.
 * @param {HTMLElement[]} items - Specifies the list items.
 * @param {SearchType} searchType - Specifies the filter type.
 * @param {boolean} ignoreCase - Specifies the case sensitive option for search operation.
 * @returns {Element | number} Returns the search matched items.
 */
export function Search(inputVal, items, searchType, ignoreCase, dataSource, fields, type) {
    var listItems = items;
    ignoreCase = ignoreCase !== undefined && ignoreCase !== null ? ignoreCase : true;
    var itemData = { item: null, index: null };
    if (inputVal && inputVal.length) {
        var strLength = inputVal.length;
        var queryStr = ignoreCase ? inputVal.toLocaleLowerCase() : inputVal;
        queryStr = escapeCharRegExp(queryStr);
        var _loop_1 = function (i, itemsData) {
            var item = itemsData[i];
            var text = void 0;
            var filterValue;
            if (items && dataSource) {
                var checkField_1 = item;
                var fieldValue_1 = fields.text.split('.');
                dataSource.filter(function (data) {
                    Array.prototype.slice.call(fieldValue_1).forEach(function (value) {
                        /* eslint-disable security/detect-object-injection */
                        if (type === 'object' && (!data.isHeader && checkField_1.textContent.toString().indexOf(data[value]) !== -1) && checkField_1.getAttribute('data-value') === data[fields.value].toString() || type === 'string' && checkField_1.textContent.toString().indexOf(data) !== -1) {
                            filterValue = type === 'object' ? data[value] : data;
                        }
                    });
                });
            }
            text = dataSource && filterValue ? (ignoreCase ? filterValue.toString().toLocaleLowerCase() : filterValue).replace(/^\s+|\s+$/g, '') : (ignoreCase ? item.textContent.toLocaleLowerCase() : item.textContent).replace(/^\s+|\s+$/g, '');
            /* eslint-disable security/detect-non-literal-regexp */
            if ((searchType === 'Equal' && text === queryStr) || (searchType === 'StartsWith' && text.substr(0, strLength) === queryStr) || (searchType === 'EndsWith' && text.substr(text.length - queryStr.length) === queryStr) || (searchType === 'Contains' && new RegExp(queryStr, "g").test(text))) {
                itemData.item = item;
                itemData.index = i;
                return { value: { item: item, index: i } };
            }
        };
        for (var i = 0, itemsData = listItems; i < itemsData.length; i++) {
            var state_1 = _loop_1(i, itemsData);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        return itemData;
        /* eslint-enable security/detect-non-literal-regexp */
    }
    return itemData;
}
/* eslint-enable security/detect-object-injection */
export function escapeCharRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
export function resetIncrementalSearchValues(elementId) {
    if (prevElementId === elementId) {
        prevElementId = '';
        prevString = '';
        queryString = '';
        matches = [];
    }
}
