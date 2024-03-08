import { Component, INotifyPropertyChanged } from '@syncfusion/ej2-base';
import { SkeletonModel } from './skeleton-model';
/**
 * Defines the shape of Skeleton.
 */
export declare enum SkeletonType {
    /**
     * Defines the skeleton shape as text.
     */
    Text = "Text",
    /**
     * Defines the skeleton shape as circle.
     */
    Circle = "Circle",
    /**
     * Defines the skeleton shape as square.
     */
    Square = "Square",
    /**
     * Defines the skeleton shape as rectangle.
     */
    Rectangle = "Rectangle"
}
/**
 * Defines the animation effect of Skeleton.
 */
export declare enum ShimmerEffect {
    /**
     * Defines the animation as shimmer wave effect.
     */
    Wave = "Wave",
    /**
     * Defines the animation as fade effect.
     */
    Fade = "Fade",
    /**
     * Defines the animation as pulse effect.
     */
    Pulse = "Pulse",
    /**
     * Defines the animation as no effect.
     */
    None = "None"
}
/**
 * The Shimmer is a placeholder that animates a shimmer effect to let users know that the page’s content is loading at the moment.
 * In other terms, it simulates the layout of page content while loading the actual content.
 * ```html
 * <div id="skeletonCircle"></div>
 * ```
 * ```typescript
 * <script>
 * var skeletonObj = new Skeleton({ shape: 'Circle', width: "2rem" });
 * skeletonObj.appendTo("#skeletonCircle");
 * </script>
 * ```
 */
export declare class Skeleton extends Component<HTMLElement> implements INotifyPropertyChanged {
    /**
     * Constructor for creating Skeleton component.
     *
     * @param {SkeletonModel} options - Defines the model of Skeleton class.
     * @param {HTMLElement} element - Defines the target HTML element.
     */
    constructor(options?: SkeletonModel, element?: HTMLElement);
    /**
     * Defines the width of the Skeleton.
     * Width will be prioritized and used as dimension when shape is "Circle" and "Square".
     *
     * @default ""
     * @aspType string
     */
    width: string | number;
    /**
     * Defines the height of the Skeleton.
     * Height is not required when shape is "Circle" and "Square".
     *
     * @default ""
     * @aspType string
     */
    height: string | number;
    /**
     * Defines the visibility state of Skeleton.
     *
     * @default true
     */
    visible: boolean;
    /**
     * Defines the shape of the Skeleton.
     * {% codeBlock src='skeleton/shape/index.md' %}{% endcodeBlock %}
     *
     * @isenumeration true
     * @default SkeletonType.Text
     * @asptype SkeletonType
     */
    shape: string | SkeletonType;
    /**
     * Defines the animation effect of the Skeleton.
     * {% codeBlock src='skeleton/shimmerEffect/index.md' %}{% endcodeBlock %}
     *
     * @isenumeration true
     * @default ShimmerEffect.Wave
     * @asptype ShimmerEffect
     */
    shimmerEffect: string | ShimmerEffect;
    /**
     * Defines the 'aria-label' for Skeleton accessibility.
     *
     * @default "Loading..."
     */
    label: string;
    /**
     * Defines single/multiple classes (separated by space) to be used for customization of Skeleton.
     *
     * @default ""
     */
    cssClass: string;
    /**
     * Get component module name.
     *
     * @returns {string} - Module name
     * @private
     */
    protected getModuleName(): string;
    getPersistData(): string;
    protected preRender(): void;
    /**
     * Method for initialize the component rendering.
     *
     * @returns {void}
     * @private
     */
    protected render(): void;
    onPropertyChanged(newProp: SkeletonModel, oldProp: SkeletonModel): void;
    /**
     * Method to destroys the Skeleton component.
     *
     * @returns {void}
     */
    destroy(): void;
    private initialize;
    private updateShape;
    private updateDimension;
    private updateEffect;
    private updateVisibility;
    private updateCssClass;
}
