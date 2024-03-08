/**
 * @private
 */
export declare class DocumentCanvasElement {
    /** Gets or sets the height of a canvas element on a document. */
    height: number;
    /** Gets or sets the width of a canvas element on a document. */
    width: number;
    style: CSSStyleDeclaration;
    private context;
    constructor();
    /**
     * @private
     */
    getContext(contextId: "2d", options?: CanvasRenderingContext2DSettings): DocumentCanvasRenderingContext2D;
    /**
     * @private
     */
    toDataURL(type?: string, quality?: any): string;
}
/**
 * @private
 */
export declare class DocumentCanvasRenderingContext2D {
    renderedPath: string;
    globalAlpha: number;
    globalCompositeOperation: any;
    fillStyle: string;
    strokeStyle: string;
    direction: CanvasDirection;
    font: string;
    textAlign: CanvasTextAlign;
    textBaseline: CanvasTextBaseline;
    lineWidth: number;
    lineCap: number;
    drawImage(image: CanvasImageSource, sx: number, sy: number, sw: number, sh: number, dx?: number, dy?: number, dw?: number, dh?: number): void;
    beginPath(): void;
    clip(fillRule?: CanvasFillRule): void;
    fill(fillRule?: CanvasFillRule): void;
    stroke(): void;
    closePath(): void;
    lineTo(x: number, y: number): void;
    moveTo(x: number, y: number): void;
    rect(x: number, y: number, w: number, h: number): void;
    setLineDash(segments: number[]): void;
    clearRect(x: number, y: number, w: number, h: number): void;
    fillRect(x: number, y: number, w: number, h: number): void;
    strokeRect(x: number, y: number, w: number, h: number): void;
    restore(): void;
    save(): void;
    fillText(text: string, x: number, y: number, maxWidth?: number): void;
    measureText(text: string): any;
    strokeText(text: string, x: number, y: number, maxWidth?: number): void;
    scale(x: number, y: number): void;
}
