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
interface BookBlockPluginSettings {
    _dummy: boolean
    autoplay?: boolean
    circular?: boolean
    direction?: string
    easing?: string
    interval?: number
    gutter?: number
    nextEl?: string
    orientation?: string
    prevEl?: string
    shadowFlip?: number
    shadowSides?: number
    shadows?: boolean
    speed?: number
    startPage?: number

    $container: BookBlockPlugin

        onEndFlip?: (a, b, c: boolean) => boolean
    onBeforeFlip?: (a) => boolean

    width: string
    height: string
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
    private $el: JQuery

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
    direction: string
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
    private _initEvents(): void
    private _action(dir: string, page?: number): void
    private _navigate( dir: string, page?: number ): void
    private _layoutNoSupport(dir: string): void
    private _layout(dir: string): any
    private _startSlideshow(): void
    private _stopSlideshow(): void
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
