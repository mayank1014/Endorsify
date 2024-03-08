var GLOBAL_ALPHA = "GA";
var GLOBAL_COMPOSITE_OPERATION = "GCP";
var FILL_STYLE = "FS";
var STROKE_STYLE = "SS";
var DIRECTION = "Dir";
var FONT = "Fn";
var TEXT_ALIGN = "TA";
var TEXT_BASE_LINE = "TBL";
var LINE_WIDTH = "LW";
var LINE_CAP = "LC";
var MAX_WIDTH = "MW";
var BEGIN_PATH = "BP";
var CLOSE_PATH = "CP";
var CLIP = "Cl";
var FILL = "Fl";
var STROKE = "Stk";
var LINE_TO = "LT";
var MOVE_TO = "MT";
var SEGMENTS = "Sgm";
var RECT = "Rt";
var CLEAR_RECT = "CR";
var FILL_RECT = "FR";
var STROKE_RECT = "SR";
var RESTORE = "RES";
var SAVE = "S";
var FILL_TEXT = "FT";
var STROKE_TEXT = "ST";
var SCALE = "SC";
/**
 * @private
 */
var DocumentCanvasElement = /** @class */ (function () {
    function DocumentCanvasElement() {
        this.style = {};
        this.context = new DocumentCanvasRenderingContext2D();
    }
    /**
     * @private
     */
    DocumentCanvasElement.prototype.getContext = function (contextId, options) {
        return this.context;
    };
    /**
     * @private
     */
    DocumentCanvasElement.prototype.toDataURL = function (type, quality) {
        return this.context.renderedPath;
    };
    return DocumentCanvasElement;
}());
export { DocumentCanvasElement };
/**
 * @private
 */
var DocumentCanvasRenderingContext2D = /** @class */ (function () {
    function DocumentCanvasRenderingContext2D() {
        this.renderedPath = "";
    }
    Object.defineProperty(DocumentCanvasRenderingContext2D.prototype, "globalAlpha", {
        set: function (value) {
            this.renderedPath += (GLOBAL_ALPHA + ":" + value + ';');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentCanvasRenderingContext2D.prototype, "globalCompositeOperation", {
        set: function (value) {
            this.renderedPath += (GLOBAL_COMPOSITE_OPERATION + ":" + value + ';');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentCanvasRenderingContext2D.prototype, "fillStyle", {
        set: function (value) {
            this.renderedPath += (FILL_STYLE + ":" + value + ';');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentCanvasRenderingContext2D.prototype, "strokeStyle", {
        set: function (value) {
            this.renderedPath += (STROKE_STYLE + ":" + value + ';');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentCanvasRenderingContext2D.prototype, "direction", {
        set: function (value) {
            this.renderedPath += (DIRECTION + ":" + value + ';');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentCanvasRenderingContext2D.prototype, "font", {
        set: function (value) {
            this.renderedPath += (FONT + ":" + value + ';');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentCanvasRenderingContext2D.prototype, "textAlign", {
        set: function (value) {
            this.renderedPath += (TEXT_ALIGN + ":" + value + ';');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentCanvasRenderingContext2D.prototype, "textBaseline", {
        set: function (value) {
            this.renderedPath += (TEXT_BASE_LINE + ":" + value + ';');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentCanvasRenderingContext2D.prototype, "lineWidth", {
        set: function (value) {
            this.renderedPath += (LINE_WIDTH + ":" + value + ';');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentCanvasRenderingContext2D.prototype, "lineCap", {
        set: function (value) {
            this.renderedPath += (LINE_CAP + ":" + value + ';');
        },
        enumerable: true,
        configurable: true
    });
    DocumentCanvasRenderingContext2D.prototype.drawImage = function (image, sx, sy, sw, sh, dx, dy, dw, dh) {
        this.renderedPath += (LINE_CAP + ":" + image.src + ';');
        this.renderedPath += ("sx:" + sx + ';');
        this.renderedPath += ("sy:" + sy + ';');
        this.renderedPath += ("sw:" + sw + ';');
        this.renderedPath += ("sh:" + sh + ';');
        if (dx) {
            this.renderedPath += ("dx:" + dx + ';');
        }
        if (dy) {
            this.renderedPath += ("dy:" + dy + ';');
        }
        if (dw) {
            this.renderedPath += ("dw:" + dw + ';');
        }
        if (dh) {
            this.renderedPath += ("dh:" + dh + ';');
        }
    };
    DocumentCanvasRenderingContext2D.prototype.beginPath = function () {
        this.renderedPath += (BEGIN_PATH + ";");
    };
    DocumentCanvasRenderingContext2D.prototype.clip = function (fillRule) {
        this.renderedPath += (CLIP + ";");
    };
    DocumentCanvasRenderingContext2D.prototype.fill = function (fillRule) {
        this.renderedPath += (FILL + ";");
    };
    DocumentCanvasRenderingContext2D.prototype.stroke = function () {
        this.renderedPath += (STROKE + ";");
    };
    DocumentCanvasRenderingContext2D.prototype.closePath = function () {
        this.renderedPath += (CLOSE_PATH + ";");
    };
    DocumentCanvasRenderingContext2D.prototype.lineTo = function (x, y) {
        this.renderedPath += (LINE_TO + ":" + 'x:' + x + ';' + 'y:' + y + ';');
    };
    DocumentCanvasRenderingContext2D.prototype.moveTo = function (x, y) {
        this.renderedPath += (MOVE_TO + ":" + 'x:' + x + ';' + 'y:' + y + ';');
    };
    DocumentCanvasRenderingContext2D.prototype.rect = function (x, y, w, h) {
        this.renderedPath += (RECT + ":" + 'x:' + x + ';' + 'y:' + y + ';' + 'w:' + w + ';' + 'h:' + h + ';');
    };
    DocumentCanvasRenderingContext2D.prototype.setLineDash = function (segments) {
        this.renderedPath += (SEGMENTS + ":" + segments.toString() + ';');
    };
    DocumentCanvasRenderingContext2D.prototype.clearRect = function (x, y, w, h) {
        this.renderedPath += (CLEAR_RECT + ":" + 'x:' + x + ';' + 'y:' + y + ';' + 'w:' + w + ';' + 'h:' + h + ';');
    };
    DocumentCanvasRenderingContext2D.prototype.fillRect = function (x, y, w, h) {
        this.renderedPath += (FILL_RECT + ":" + 'x:' + x + ';' + 'y:' + y + ';' + 'w:' + w + ';' + 'h:' + h + ';');
    };
    DocumentCanvasRenderingContext2D.prototype.strokeRect = function (x, y, w, h) {
        this.renderedPath += (STROKE_RECT + ":" + 'x:' + x + ';' + 'y:' + y + ';' + 'w:' + w + ';' + 'h:' + h + ';');
    };
    DocumentCanvasRenderingContext2D.prototype.restore = function () {
        this.renderedPath += (RESTORE + ";");
    };
    DocumentCanvasRenderingContext2D.prototype.save = function () {
        this.renderedPath += (SAVE + ";");
    };
    DocumentCanvasRenderingContext2D.prototype.fillText = function (text, x, y, maxWidth) {
        this.renderedPath += (FILL_TEXT + ":" + text + ';' + 'x:' + x + ';' + 'y:' + y + ';');
        if (maxWidth) {
            this.renderedPath += (MAX_WIDTH + ':' + maxWidth + ';');
        }
    };
    DocumentCanvasRenderingContext2D.prototype.measureText = function (text) {
        return { width: 30 };
    };
    DocumentCanvasRenderingContext2D.prototype.strokeText = function (text, x, y, maxWidth) {
        this.renderedPath += (STROKE_TEXT + ":" + text + ';' + 'x:' + x + ';' + 'y:' + y + ';');
        if (maxWidth) {
            this.renderedPath += (MAX_WIDTH + ':' + maxWidth + ';');
        }
    };
    DocumentCanvasRenderingContext2D.prototype.scale = function (x, y) {
        this.renderedPath += (SCALE + ":" + 'x:' + x + ';' + 'y:' + y + ';');
    };
    return DocumentCanvasRenderingContext2D;
}());
export { DocumentCanvasRenderingContext2D };
