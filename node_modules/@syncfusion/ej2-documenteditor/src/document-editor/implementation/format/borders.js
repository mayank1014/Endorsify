import { WBorder } from './border';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { WParagraphFormat } from './paragraph-format';
/**
 * @private
 */
var WBorders = /** @class */ (function () {
    function WBorders(node) {
        this.leftIn = new WBorder(this);
        this.rightIn = new WBorder(this);
        this.topIn = new WBorder(this);
        this.bottomIn = new WBorder(this);
        this.horizontalIn = new WBorder(this);
        this.verticalIn = new WBorder(this);
        this.diagonalUpIn = new WBorder(this);
        this.diagonalDownIn = new WBorder(this);
        this.isParsing = false;
        this.ownerBase = node;
    }
    Object.defineProperty(WBorders.prototype, "left", {
        get: function () {
            if (this.ownerBase instanceof WParagraphFormat) {
                return this.getPropertyValue('left');
            }
            return this.leftIn;
        },
        set: function (value) {
            this.leftIn = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WBorders.prototype, "right", {
        get: function () {
            if (this.ownerBase instanceof WParagraphFormat) {
                return this.getPropertyValue('right');
            }
            return this.rightIn;
        },
        set: function (value) {
            this.rightIn = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WBorders.prototype, "top", {
        get: function () {
            if (this.ownerBase instanceof WParagraphFormat) {
                return this.getPropertyValue('top');
            }
            return this.topIn;
        },
        set: function (value) {
            this.topIn = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WBorders.prototype, "bottom", {
        get: function () {
            if (this.ownerBase instanceof WParagraphFormat) {
                return this.getPropertyValue('bottom');
            }
            return this.bottomIn;
        },
        set: function (value) {
            this.bottomIn = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WBorders.prototype, "horizontal", {
        get: function () {
            if (this.ownerBase instanceof WParagraphFormat) {
                return this.getPropertyValue('horizontal');
            }
            return this.horizontalIn;
        },
        set: function (value) {
            this.horizontalIn = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WBorders.prototype, "vertical", {
        get: function () {
            if (this.ownerBase instanceof WParagraphFormat) {
                return this.getPropertyValue('vertical');
            }
            return this.verticalIn;
        },
        set: function (value) {
            this.verticalIn = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WBorders.prototype, "diagonalUp", {
        get: function () {
            return this.diagonalUpIn;
        },
        set: function (value) {
            this.diagonalUpIn = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WBorders.prototype, "diagonalDown", {
        get: function () {
            return this.diagonalDownIn;
        },
        set: function (value) {
            this.diagonalDownIn = value;
        },
        enumerable: true,
        configurable: true
    });
    WBorders.prototype.getPropertyValue = function (property) {
        var border = this.getBorder(property);
        if (this.isParsing) {
            return border;
        }
        if (!border.hasValues()) {
            var baseStyle = this.ownerBase.baseStyle;
            if (!isNullOrUndefined(baseStyle)) {
                var currentFormat = this;
                while (!isNullOrUndefined(baseStyle)) {
                    var listParaFormat = void 0;
                    if (!this.ownerBase.listFormat.hasValue('listId')) {
                        listParaFormat = baseStyle.paragraphFormat.getListPargaraphFormat(property);
                    }
                    if (baseStyle.paragraphFormat.borders.getBorder(property).hasValues()) {
                        currentFormat = baseStyle.paragraphFormat.borders;
                        break;
                    }
                    else if (!isNullOrUndefined(listParaFormat) &&
                        (listParaFormat.borders.getBorder(property).hasValues())) {
                        currentFormat = listParaFormat.borders;
                        break;
                    }
                    else {
                        baseStyle = baseStyle.basedOn;
                    }
                }
                if (!isNullOrUndefined(baseStyle)) {
                    return currentFormat.getBorder(property);
                }
            }
        }
        else {
            return border;
        }
        return this.getDefaultValue(property);
    };
    WBorders.prototype.getDefaultValue = function (property) {
        var docParagraphFormat = this.documentParagraphFormat();
        var border;
        if (!isNullOrUndefined(docParagraphFormat) && !isNullOrUndefined(docParagraphFormat.borders)) {
            border = docParagraphFormat.borders.getBorder(property);
        }
        return border;
    };
    WBorders.prototype.documentParagraphFormat = function () {
        var docParagraphFormat;
        if (this.ownerBase instanceof WParagraphFormat) {
            docParagraphFormat = this.ownerBase.getDocumentParagraphFormat();
        }
        return docParagraphFormat;
    };
    WBorders.prototype.getBorder = function (property) {
        var value = undefined;
        switch (property) {
            case 'left':
                return this.leftIn;
            case 'right':
                return this.rightIn;
            case 'top':
                return this.topIn;
            case 'bottom':
                return this.bottomIn;
            case 'vertical':
                return this.verticalIn;
            case 'horizontal':
                return this.horizontalIn;
        }
        return value;
    };
    /**
     * @private
     */
    WBorders.prototype.clearFormat = function () {
        if (!isNullOrUndefined(this.leftIn)) {
            this.leftIn.clearFormat();
        }
        if (!isNullOrUndefined(this.topIn)) {
            this.topIn.clearFormat();
        }
        if (!isNullOrUndefined(this.bottomIn)) {
            this.bottomIn.clearFormat();
        }
        if (!isNullOrUndefined(this.rightIn)) {
            this.rightIn.clearFormat();
        }
        if (!isNullOrUndefined(this.horizontalIn)) {
            this.horizontalIn.clearFormat();
        }
        if (!isNullOrUndefined(this.verticalIn)) {
            this.verticalIn.clearFormat();
        }
        if (!isNullOrUndefined(this.diagonalDown)) {
            this.diagonalDown.clearFormat();
        }
        if (!isNullOrUndefined(this.diagonalUp)) {
            this.diagonalUp.clearFormat();
        }
    };
    /* eslint-enable */
    /**
     * Disposes the internal objects which are maintained.
     * @private
     */
    WBorders.prototype.destroy = function () {
        if (!isNullOrUndefined(this.leftIn)) {
            this.leftIn.destroy();
        }
        if (!isNullOrUndefined(this.topIn)) {
            this.topIn.destroy();
        }
        if (!isNullOrUndefined(this.bottomIn)) {
            this.bottomIn.destroy();
        }
        if (!isNullOrUndefined(this.rightIn)) {
            this.rightIn.destroy();
        }
        if (!isNullOrUndefined(this.horizontalIn)) {
            this.horizontalIn.destroy();
        }
        if (!isNullOrUndefined(this.verticalIn)) {
            this.verticalIn.destroy();
        }
        if (!isNullOrUndefined(this.diagonalDown)) {
            this.diagonalDown.destroy();
        }
        if (!isNullOrUndefined(this.diagonalUp)) {
            this.diagonalUp.destroy();
        }
        this.topIn = undefined;
        this.bottomIn = undefined;
        this.leftIn = undefined;
        this.rightIn = undefined;
        this.horizontalIn = undefined;
        this.verticalIn = undefined;
        this.diagonalDownIn = undefined;
        this.diagonalUpIn = undefined;
        this.ownerBase = undefined;
    };
    WBorders.prototype.cloneFormat = function () {
        var borders = new WBorders(undefined);
        borders.top = isNullOrUndefined(this.topIn) ? undefined : this.topIn.cloneFormat();
        borders.bottom = isNullOrUndefined(this.bottomIn) ? undefined : this.bottomIn.cloneFormat();
        borders.left = isNullOrUndefined(this.leftIn) ? undefined : this.leftIn.cloneFormat();
        borders.right = isNullOrUndefined(this.rightIn) ? undefined : this.rightIn.cloneFormat();
        borders.horizontal = isNullOrUndefined(this.horizontalIn) ? undefined : this.horizontalIn.cloneFormat();
        borders.vertical = isNullOrUndefined(this.verticalIn) ? undefined : this.verticalIn.cloneFormat();
        borders.diagonalUp = isNullOrUndefined(this.diagonalUp) ? undefined : this.diagonalUp.cloneFormat();
        borders.diagonalDown = isNullOrUndefined(this.diagonalDown) ? undefined : this.diagonalDown.cloneFormat();
        return borders;
    };
    WBorders.prototype.copyFormat = function (borders) {
        if (!isNullOrUndefined(borders.getBorder('left')) && borders.getBorder('left') instanceof WBorder) {
            var left = new WBorder(this);
            left.copyFormat(borders.getBorder('left'));
            this.left = left;
        }
        if (!isNullOrUndefined(borders.getBorder('right')) && borders.getBorder('right') instanceof WBorder) {
            var right = new WBorder(this);
            right.copyFormat(borders.getBorder('right'));
            this.right = right;
        }
        if (!isNullOrUndefined(borders.getBorder('top')) && borders.getBorder('top') instanceof WBorder) {
            var top_1 = new WBorder(this);
            top_1.copyFormat(borders.getBorder('top'));
            this.top = top_1;
        }
        if (!isNullOrUndefined(borders.getBorder('bottom')) && borders.getBorder('bottom') instanceof WBorder) {
            var bottom = new WBorder(this);
            bottom.copyFormat(borders.getBorder('bottom'));
            this.bottom = bottom;
        }
        if (!isNullOrUndefined(borders.getBorder('horizontal')) && borders.getBorder('horizontal') instanceof WBorder) {
            var horizontal = new WBorder(this);
            horizontal.copyFormat(borders.getBorder('horizontal'));
            this.horizontal = horizontal;
        }
        if (!isNullOrUndefined(borders.getBorder('vertical')) && borders.getBorder('vertical') instanceof WBorder) {
            var vertical = new WBorder(this);
            vertical.copyFormat(borders.getBorder('vertical'));
            this.vertical = vertical;
        }
        if (!isNullOrUndefined(borders.diagonalDown) && borders.diagonalDown instanceof WBorder) {
            this.diagonalDown = new WBorder(this);
            this.diagonalDown.copyFormat(borders.diagonalDown);
        }
        if (!isNullOrUndefined(borders.diagonalUp) && borders.diagonalUp instanceof WBorder) {
            this.diagonalUp = new WBorder(this);
            this.diagonalUp.copyFormat(borders.diagonalUp);
        }
    };
    return WBorders;
}());
export { WBorders };
