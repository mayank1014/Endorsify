import { Component, EmitType, INotifyPropertyChanged } from '@syncfusion/ej2-base';
import { ChildProperty } from '@syncfusion/ej2-base';
import { BaseEventArgs } from '@syncfusion/ej2-base';
import { CarouselModel, CarouselItemModel } from './carousel-model';
/**
 * Specifies the direction of previous/next button navigations in carousel.
 * ```props
 * Previous :- To determine the previous direction of carousel item transition.
 * Next :- To determine the next direction of carousel item transition.
 * ```
 */
export declare type CarouselSlideDirection = 'Previous' | 'Next';
/**
 * Specifies the state of navigation buttons displayed in carousel.
 * ```props
 * Hidden :- Navigation buttons are hidden.
 * Visible :- Navigation buttons are visible.
 * VisibleOnHover :- Navigation buttons are visible only when we hover the carousel.
 * ```
 */
export declare type CarouselButtonVisibility = 'Hidden' | 'Visible' | 'VisibleOnHover';
/**
 * Specifies the animation effects of carousel slide.
 * ```props
 * None :- The carousel item transition happens without animation.
 * Slide :- The carousel item transition happens with slide animation.
 * Fade :- The Carousel item transition happens with fade animation.
 * Custom :- The Carousel item transition happens with custom animation.
 * ```
 */
export declare type CarouselAnimationEffect = 'None' | 'Slide' | 'Fade' | 'Custom';
/**
 * Specifies the type of indicators.
 * ```props
 * Default: - Displays the indicators with a bullet design.
 * Dynamic: - Applies a dynamic animation design to the indicators.
 * Fraction: - Displays the slides numerically as indicators.
 * Progress: - Represents the slides using a progress bar design.
 * ```
 */
export declare type CarouselIndicatorsType = 'Default' | 'Dynamic' | 'Fraction' | 'Progress';
/**
 * Specifies the action (touch & mouse) which enables the slide swiping action in carousel.
 * * Touch - Enables or disables the swiping action in touch interaction.
 * * Mouse - Enables or disables the swiping action in mouse interaction.
 * @aspNumberEnum
 */
export declare enum CarouselSwipeMode {
    /** Enables or disables the swiping action in touch interaction. */
    Touch = 1,
    /** Enables or disables the swiping action in mouse interaction. */
    Mouse = 2
}
/** An interface that holds details when changing the slide. */
export interface SlideChangingEventArgs extends BaseEventArgs {
    /** Specifies the index of current slide. */
    currentIndex: number;
    /** Specifies the element of current slide. */
    currentSlide: HTMLElement;
    /** Specifies the index of slide to be changed. */
    nextIndex: number;
    /** Specifies the element of slide to be changed. */
    nextSlide: HTMLElement;
    /** Specifies whether the slide transition occur through swiping or not. */
    isSwiped: boolean;
    /** Specifies the slide direction in which transition occurs. */
    slideDirection: CarouselSlideDirection;
    /** Specifies whether the slide transition should occur or not. */
    cancel: boolean;
}
/** An interface that holds details once slide change done. */
export interface SlideChangedEventArgs extends BaseEventArgs {
    /** Specifies the index of current slide. */
    currentIndex: number;
    /** Specifies the element of current slide. */
    currentSlide: HTMLElement;
    /** Specifies the index of slide from which it changed. */
    previousIndex: number;
    /** Specifies the element of slide from which it changed. */
    previousSlide: HTMLElement;
    /** Specifies whether the slide transition done through swiping or not. */
    isSwiped: boolean;
    /** Specifies the slide direction in which transition occurred. */
    slideDirection: CarouselSlideDirection;
}
/** Specifies the carousel individual item. */
export declare class CarouselItem extends ChildProperty<CarouselItem> {
    /**
     * Accepts single/multiple classes (separated by a space) to be used for individual carousel item customization.
     *
     * @default null
     */
    cssClass: string;
    /**
     * Accepts the interval duration in milliseconds for individual carousel item transition.
     *
     * @default null
     */
    interval: number;
    /**
     * Accepts the template for individual carousel item.
     *
     * @default null
     * @angularType string | object
     * @reactType string | function | JSX.Element
     * @vueType string | function
     * @aspType string
     */
    template: string | Function;
    /**
     * Accepts HTML attributes/custom attributes to add in individual carousel item.
     *
     * @default null
     */
    htmlAttributes: Record<string, string>;
}
export declare class Carousel extends Component<HTMLElement> implements INotifyPropertyChanged {
    private autoSlideInterval;
    private slideItems;
    private touchModule;
    private keyModule;
    private keyConfigs;
    private slideChangedEventArgs;
    private localeObj;
    private prevPageX;
    private initialTranslate;
    private itemsContainer;
    private isSwipe;
    private timeStampStart;
    /**
     * Allows defining the collection of carousel item to be displayed on the Carousel.
     *
     * @default []
     */
    items: CarouselItemModel[];
    /**
     * Specifies the type of animation effects. The possible values for this property as follows
     * * `None`: The carousel item transition happens without animation.
     * * `Slide`: The carousel item transition happens with slide animation.
     * * `Fade`: The Carousel item transition happens with fade animation.
     * * `Custom`: The Carousel item transition happens with custom animation.
     *
     *  @default 'Slide'
     */
    animationEffect: CarouselAnimationEffect;
    /**
     * Accepts the template for previous navigation button.
     *
     * @default null
     * @angularType string | object
     * @reactType string | function | JSX.Element
     * @vueType string | function
     * @aspType string
     */
    previousButtonTemplate: string | Function;
    /**
     * Accepts the template for next navigation button.
     *
     * @default null
     * @angularType string | object
     * @reactType string | function | JSX.Element
     * @vueType string | function
     * @aspType string
     */
    nextButtonTemplate: string | Function;
    /**
     * Accepts the template for indicator buttons.
     *
     * @default null
     * @angularType string | object
     * @reactType string | function | JSX.Element
     * @vueType string | function
     * @aspType string
     */
    indicatorsTemplate: string | Function;
    /**
     * Accepts the template for play/pause button.
     *
     * @default null
     * @angularType string | object
     * @reactType string | function | JSX.Element
     * @vueType string | function
     * @aspType string
     */
    playButtonTemplate: string | Function;
    /**
     * Accepts single/multiple classes (separated by a space) to be used for carousel customization.
     *
     * @default null
     */
    cssClass: string;
    /**
     * Specifies the datasource for the carousel items.
     *
     * @isdatamanager false
     * @default []
     */
    dataSource: Record<string, any>[];
    /**
     * Specifies the template option for carousel items.
     *
     * @default null
     * @angularType string | object
     * @reactType string | function | JSX.Element
     * @vueType string | function
     * @aspType string
     */
    itemTemplate: string | Function;
    /**
     * Specifies index of the current carousel item.
     *
     * @default 0
     */
    selectedIndex: number;
    /**
     * Specifies the width of the Carousel in pixels/number/percentage. The number value is considered as pixels.
     *
     * @default '100%'
     */
    width: string | number;
    /**
     * Specifies the height of the Carousel in pixels/number/percentage. The number value is considered as pixels.
     *
     * @default '100%'
     */
    height: string | number;
    /**
     * Specifies the interval duration in milliseconds for carousel item transition.
     *
     * @default 5000
     */
    interval: number;
    /**
     * Defines whether the slide transition is automatic or manual.
     *
     * @default true
     */
    autoPlay: boolean;
    /**
     * Defines whether the slide transition gets pause on hover or not.
     *
     * @default true
     */
    pauseOnHover: boolean;
    /**
     * Defines whether the slide transitions loop end or not. When set to false, the transition stops at last slide.
     *
     * @default true
     */
    loop: boolean;
    /**
     * Defines whether to show play button or not.
     *
     * @default false
     */
    showPlayButton: boolean;
    /**
     * Defines whether to enable swipe action in touch devices or not.
     *
     * @default true
     */
    enableTouchSwipe: boolean;
    /**
     * Defines whether to show the indicator positions or not. The indicator positions allow to know the current slide position of the carousel component.
     *
     * @default true
     */
    showIndicators: boolean;
    /**
     * Specifies the type of indicators. The available values for this property are:
     *
     * * `Default`: Displays the indicators with a bullet design.
     * * `Dynamic`: Applies a dynamic animation design to the indicators.
     * * `Fraction`: Displays the slides numerically as indicators.
     * * `Progress`: Represents the slides using a progress bar design.
     *
     * @default 'Default'
     */
    indicatorsType: CarouselIndicatorsType;
    /**
     * Defines how to show the previous, next and play pause buttons visibility. The possible values for this property as follows
     * * `Hidden`: Navigation buttons are hidden.
     * * `Visible`: Navigation buttons are visible.
     * * `VisibleOnHover`: Navigation buttons are visible only when we hover the carousel.
     *
     * @default 'Visible'
     */
    buttonsVisibility: CarouselButtonVisibility;
    /**
     * Enables active slide with partial previous/next slides.
     *
     * Slide animation only applicable if the partialVisible is enabled.
     *
     * @default false
     */
    partialVisible: boolean;
    /**
     * Specifies whether the slide transition should occur while performing swiping via touch/mouse.
     * The slide swiping is enabled or disabled using bitwise operators. The swiping is disabled using ‘~’ bitwise operator.
     * * Touch - Enables or disables the swiping action in touch interaction.
     * * Mouse - Enables or disables the swiping action in mouse interaction.
     *
     * @default 'Touch'
     * @aspNumberEnum
     */
    swipeMode: CarouselSwipeMode;
    /**
     * Accepts HTML attributes/custom attributes to add in individual carousel item.
     *
     * @default null
     */
    htmlAttributes: Record<string, string>;
    /**
     * The event will be fired before the slide change.
     *
     * @event slideChanging
     */
    slideChanging: EmitType<SlideChangingEventArgs>;
    /**
     * The event will be fired after the slide changed.
     *
     * @event slideChanged
     */
    slideChanged: EmitType<SlideChangedEventArgs>;
    /**
     * Constructor for creating the Carousel widget
     *
     * @param {CarouselModel} options Accepts the carousel model properties to initiate the rendering
     * @param {string | HTMLElement} element Accepts the DOM element reference
     */
    constructor(options?: CarouselModel, element?: string | HTMLElement);
    protected getModuleName(): string;
    protected getPersistData(): string;
    protected preRender(): void;
    protected render(): void;
    onPropertyChanged(newProp: CarouselModel, oldProp: CarouselModel): void;
    private reRenderSlides;
    private reRenderIndicators;
    private initialize;
    private renderSlides;
    private getTranslateX;
    private renderSlide;
    private renderNavigators;
    private renderNavigatorButton;
    private renderPlayButton;
    private renderIndicators;
    private renderIndicatorTemplate;
    private renderKeyboardActions;
    private renderTouchActions;
    private applyAnimation;
    private autoSlide;
    private autoSlideChange;
    private applySlideInterval;
    private resetSlideInterval;
    private getSlideIndex;
    private setActiveSlide;
    private onTransitionEnd;
    private refreshIndicators;
    private setHtmlAttributes;
    private templateParser;
    private getNavigatorState;
    private navigatorClickHandler;
    private indicatorClickHandler;
    private playButtonClickHandler;
    private keyHandler;
    private swipeHandler;
    private isSuspendSlideTransition;
    private handleNavigatorsActions;
    private onHoverActions;
    private onFocusActions;
    private destroyButtons;
    private getNumOfItems;
    private getTranslateValue;
    private swipeStart;
    private swiping;
    private swipStop;
    private swipeNavigation;
    private swipeModehandlers;
    private resizeHandler;
    private wireEvents;
    private unWireEvents;
    /**
     * Method to transit from the current slide to the previous slide.
     *
     * @returns {void}
     */
    prev(): void;
    /**
     * Method to transit from the current slide to the next slide.
     *
     * @returns {void}
     */
    next(): void;
    /**
     * Method to play the slides programmatically.
     *
     * @returns {void}
     */
    play(): void;
    /**
     * Method to pause the slides programmatically.
     *
     * @returns {void}
     */
    pause(): void;
    /**
     * Method to render react and angular templates
     *
     * @returns {void}
     * @private
     */
    private renderTemplates;
    /**
     * Method to reset react and angular templates
     *
     * @param {string[]} templates Accepts the template ID
     * @returns {void}
     * @private
     */
    private resetTemplates;
    /**
     * Method for destroy the carousel component.
     *
     * @returns {void}
     */
    destroy(): void;
}
