// tslint:disable-next-line
declare module "*.scss"

// @ts-ignore
declare global  {
    // tslint:disable-next-line
    interface Window {
        jQuery: JQuery
        $: JQuery
        Modernizr: ModernizrStatic
    }
}

// tslint:disable-next-line
interface BookBlockPluginEffectsSettings {
    // Add shadow around book
    bordershadow: boolean
    // Additional paper effect
    paper: boolean
}

// tslint:disable-next-line
interface BookBlockPluginSettings {
    // does nothing
    _dummy: boolean // false

    // autoplay. If true it overwrites the circular option to true
    autoplay?: boolean // false

    // if we should show the first item after reaching the end
    circular?: boolean // false

    // easing for the flip transition
    easing?: string // "ease-in-out"

    // the space around the image in percent
    gutter?: number // 0

    // History API
    history?: boolean // false

    // time (ms) between page switch, if autoplay is true
    interval?: number // 3000

    // ltr (left to right) or rtl (right to left)
    ltr?: boolean // true

    // vertical or horizontal flip
    orientation?: string

    shadowFlip?: number

    // opacity value for the "shadow" on both sides (when the flipping page is over it)
    // value : 0.1 - 1
    shadowSides?: number

    // if set to true, both the flipping page and the sides will have an overlay to simulate shadows
    shadows?: boolean

    // speed for the flip transition in ms
    speed?: number

    // page to start on (1-based)
    startPage?: number

    // graphical flourishes
    effects: BookBlockPluginEffectsSettings

    // callback after the flip transition
    // old is the index of the previous item
    // page is the current item´s index
    // isLimit is true if the current page is the last one (or the first one)
    onEndFlip?: (old, page, isLimit: boolean) => void

    // callback before the flip transition
    // page is the current item´s index
    onBeforeFlip?: (page) => void
}

// tslint:disable-next-line
interface BookBlockPluginGlobalSettings {
    /**
     * Global options of the example plugin.
     */
    options: BookBlockPluginSettings
}

// // tslint:disable-next-line
// interface BookBlockPluginFunction {
//     /**
//      * Apply the example plugin to the elements selected in the jQuery result.
//      *
//      * @param options Options to use for this application of the example plugin.
//      * @returns jQuery result.
//      */
//     (this: JQuery, options: BookBlockPluginSettings): JQuery
// }

// tslint:disable-next-line
interface BookBlockPlugin extends BookBlockPluginGlobalSettings {
    // these are private
    $el: JQuery

    $items: JQuery
    $current: JQuery
    $nextItem: JQuery
    slideshow: ReturnType<typeof setTimeout>

    modulatedNextIndex: number

    options: BookBlockPluginSettings

    dummyGlobal: boolean

    // settings
    dummy: boolean
    circular: boolean
    easing: string
    gutter: number
    interval: number
    isAnimating: boolean
    isAnimation: boolean
    nextEl: string
    orientation: string
    prevEl: string
    shadowFlip: number
    shadowSides: number
    shadows: boolean
    speed: number
    startPage: number
    autoplay: boolean

    history: boolean

    // PUBLIC METHODS
    next(): void
    prev(): void
    jump(page): void
    last(): void
    first(): void
    isActive(): boolean
    update(): void
    destroy(): void

    // PRIVATE METHODS
    _initEvents(): void
    _action(dir: boolean, page?: number): void
    _navigate( dir: boolean, page?: number ): void
    _layoutNoSupport(dir: boolean): void
    _layout(dir: boolean): any
    _startSlideshow(): void
    _stopSlideshow(): void
}
// tslint:disable-next-line
interface JQuery {
    // attach plugin to jquery
    bookBlock: BookBlockPlugin
}
// tslint:disable-next-line
interface ModernizrStatic {
    csstransformspreserve3d: any
}

// namespace JSX {
//     interface IntrinsicElements {
//         foo: any
//     }
// }
