// tslint:disable:no-console
// tslint:disable:max-line-length

/*!
 * @paxperscientiam/bookblock
 * jquery.bookblock.js v2.0.1
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */

// global
const $window: JQuery<Window> = $(window)

import { CssClasses, CssIds, NEXT, PREV } from "./constants"
import { BookBlockUtil } from "./utils"

// https://gist.github.com/edankwan/4389601
Modernizr.addTest("csstransformspreserve3d", () => {
    let prop = Modernizr.prefixed("transformStyle")
    const val = "preserve-3d"
    let computedStyle: string
    if (!prop) { return false }

    prop = prop.replace(/([A-Z])/g, (str: string, m1: string) => "-" + m1.toLowerCase() ).replace(/^ms-/, "-ms-")

    Modernizr.testStyles("#modernizr{" + prop + ":" + val + "}", (el, rule) => {
        computedStyle = window.getComputedStyle ? getComputedStyle(el, null).getPropertyValue(prop) : ""
    })
    return (computedStyle === val)
})

/*
 * debouncedresize: special jQuery event that happens once after a window resize
 *
 * latest version and complete README available on Github:
 * https://github.com/louisremi/jquery-smartresize
 *
 * Copyright 2012 @louis_remi
 * Licensed under the MIT license.
 *
 * This saved you an hour of work?
 * Send me music http://www.amazon.co.uk/wishlist/HNTU0468LQON
 */
// const $event = $.event
// let $special
// let resizeTimeout: ReturnType<typeof setTimeout>

//    $special = $event.special.debouncedresize = {
//         setup() {
//             console.log("setup")
//             $( this ).on( "resize", $special.handler )
//         },
//         teardown() {
//             console.log("teardown")
//             $( this ).off( "resize", $special.handler )
//         },
//         handler( event, execAsap ) {
//             console.log("handler")
//             // Save the context
//             const context = this
//             const args = arguments
//             const dispatch = () => {
//                 // set correct event type
//                 event.type = "debouncedresize"
//                 // @ts-ignore
//                 $event.dispatch.apply( context, args )
//             }

//             if ( resizeTimeout ) {
//                 clearTimeout( resizeTimeout )
//             }

//             execAsap ?
//                 dispatch() :
//                 resizeTimeout = setTimeout( dispatch, $special.threshold )
//         },
//         threshold: 150
//     }

export class BookBlock implements BookBlockPlugin  {
    // global settings
    dummyGlobal: boolean

    // settings
    dummy: boolean
    circular: boolean
    easing: string
    gutter: number
    interval: number
    isAnimating: boolean
    isAnimation: boolean
    ltr: boolean // left to right movement instread of rtl
    nextEl: string
    orientation: string
    prevEl: string
    shadowFlip: number
    shadowSides: number
    shadows: boolean
    speed: number
    startPage: number
    autoplay: boolean
    effects: BookBlockPluginEffectsSettings

    // optional functions
    onEndFlip?: (a: number, b: number, c: boolean) => boolean
    onBeforeFlip?: (a: number) => boolean

    options: BookBlockPluginSettings

    $el: JQuery
    modulatedNextIndex: number

    itemsCount: number
    slideshow: ReturnType<typeof setTimeout>
        end: boolean

    current: number
    previous: number

    elWidth: number
    transEndEventName: string
    support: boolean

    history: boolean

    $items: JQuery
    $current: JQuery
    $nextItem: JQuery

    startIndex: number

    constructor(options: BookBlockPluginSettings, element: JQuery) {
        this.options = options

        this.$el = $( element )

        // orientation class
        this.$el.addClass( `bb-${this.options.orientation}` )
        // items
        this.$items = this.$el.children(CssClasses._ITEM).hide()
        // total items
        this.itemsCount = this.$items.length
        if (this.$el.data().bbsrcset != null) {
            this.itemsCount = this.$el.data().bbsrcset.length
        }

        console.log(`startpage is ${this.options.startPage}_1`)
        // current item´s index
        if ( (this.options.startPage > 0) && (this.options.startPage <= this.itemsCount) ) {
            this.current = (this.options.startPage - 1)
        } else {
            BookBlockUtil.logError("startPage option is out of range")
            this.current = 0
        }
        // previous item´s index
        this.previous = -1
        // show first item
        this.startIndex = this.current
        if (this.options.history) {
            const initialQSPageValue = BookBlockUtil.getQueryField("page")
            const initialQSPageNumberValue = Number.parseInt(initialQSPageValue, 10)
            if (Number.isInteger(initialQSPageNumberValue)) {
                this.startIndex = BookBlockUtil.mod(initialQSPageNumberValue - 1, this.itemsCount)
                // i think this is correct
                console.log(`this.startIndex from construct is ${this.startIndex}`)
            }
        }

        this.$current = this.$items.eq( this.startIndex ).show()
        // get width of this.$el
        // this will be necessary to create the flipping layout
        this.elWidth = this.$el.width()
        const transEndEventNames = {
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd",
            WebkitTransition: "webkitTransitionEnd",
            msTransition: "MSTransitionEnd",
            transition: "transitionend",
        }
        this.transEndEventName = transEndEventNames[Modernizr.prefixed( "transition" )] + ".bookblock"
        // support css 3d transforms && css transitions && Modernizr.csstransformspreserve3d
        this.support = Modernizr.csstransitions && Modernizr.csstransforms3d && Modernizr.csstransformspreserve3d
        // initialize/bind some events
        this._initEvents()
        // start slideshow
        if ( this.options.autoplay ) {
            this.options.circular = true
            this._startSlideshow()
        }
    }

    _initEvents() {
        console.log("initialized")
        const self = this
        const subIndex: number = self.current  // self.options.startPage - 1
        this.modulatedNextIndex = BookBlockUtil.mod(subIndex, this.itemsCount)
        if ( this.options.nextEl !== "" ) {
            $( this.options.nextEl ).on( "click.bookblock touchstart.bookblock", () => {
                console.log("next button clicked")
                self._action( NEXT )
                return false
            } )
        }

        if ( this.options.prevEl !== "" ) {
            $( this.options.prevEl ).on( "click.bookblock touchstart.bookblock", () => {
                console.log("prev button clicked")
                self._action( PREV )
                return false
            } )
        }

        this.$el.hover(
            () => {
                console.log("hovering yo")
            }, () => {
                //              $(this).removeClass("brighten-20")
            },
        )

        this.$el.on("click.bookblock touchstart.bookblock", (e) => {
            e.preventDefault()

            if (this.isAnimating === false || typeof this.isAnimating === "undefined") {
                console.log(`is animating: ${this.isAnimating}`)
                const left: number = $(e.currentTarget).offset().left
                const width: number = $(e.currentTarget).width()
                const midX: number = (width / 2) + left

                if (e.touches) {
                    if (e.touches[0].screenX < midX) {
                        self._action(PREV)
                    } else {
                        self._action(NEXT)
                    }
                } else {
                    if (e.offsetX < width / 2) {
                        self._action(PREV)
                    } else {
                        self._action(NEXT)
                    }
                }
            }
        })

        $window.on( "debouncedresize", () => {
            // update width value
            self.elWidth = self.$el.width()
        } )

        $( document ).on("keydown.bookblock", (e) => {
            if (this.isAnimating === false || typeof this.isAnimating === "undefined") {
                const keyCode = e.which
                const UP: number = 16
                const RIGHT: number = 39
                const LEFT: number = 37
                const DOWN: number = 40

                if ([UP, RIGHT].indexOf(keyCode) > -1) {
                    e.stopPropagation()
                    e.preventDefault()
                    self._action( NEXT )
                }

                if ([DOWN, LEFT].indexOf(keyCode) > -1) {
                    e.stopPropagation()
                    e.preventDefault()
                    self._action( PREV)
                }
            }
        })

    }

    _action( dir: boolean, page?: number ) {
        const shit = this
        console.log(`this current is ${this.current}_0`)

        shit._createPage(dir, this.current)
            .then(() => {
                if (shit.options.history) {
                    BookBlockUtil.addQueryField("page", (this.modulatedNextIndex + 1).toString())
                }
                shit._stopSlideshow()
                shit._navigate( dir, page )
            })
    }

    _navigate( dir: boolean, page?: number ) {

        if ( this.isAnimating ) {
            return false
        }

        // callback trigger
        this.options.onBeforeFlip( this.current )

        this.isAnimating = true
        // update current value
        this.$current = this.$items.eq( this.current )

        if ( page !== undefined ) {
            this.current = page
        } else if ( dir && this.options.ltr || !dir && !this.options.ltr ) {
            if ( !this.options.circular && this.current === this.itemsCount - 1 ) {
                this.end = true
            } else {
                this.previous = this.current
                this.current = this.current < this.itemsCount - 1 ? this.current + 1 : 0
            }
        } else if ( !dir && this.options.ltr || dir && !this.options.ltr ) {
            if ( !this.options.circular && this.current === 0 ) {
                this.end = true
            } else {
                this.previous = this.current
                this.current = this.current > 0 ? this.current - 1 : this.itemsCount - 1
            }
        }

        this.$nextItem = !this.options.circular && this.end ? this.$current : this.$items.eq( this.current )

        if ( !this.support ) {
            this._layoutNoSupport( dir )
        } else {
            this._layout( dir )
        }

    }

    _layoutNoSupport(dir: boolean) {
        this.$items.hide()
        this.$nextItem.show()
        this.end = false
        this.isAnimating = false
        const isLimit = true && this.current === this.itemsCount - 1 || !dir && this.current === 0
        // callback trigger
        this.options.onEndFlip( this.previous, this.current, isLimit )
    }
    // creates the necessary layout for the 3d structure
    _layout(dir: boolean) {

        const self = this
        // basic structure: 1 element for the left side.
        const $sLeft = this._addSide( "left", dir )
        // 1 element for the flipping/middle page
        const $sMiddle = this._addSide( "middle", dir )
        // 1 element for the right side
        const $sRight = this._addSide( "right", dir )
        // overlays
        const $oLeft = $sLeft.find( "div.bb-overlay" )
        const $oMiddleF = $sMiddle.find( "div.bb-flipoverlay:first" )
        const $oMiddleB = $sMiddle.find( "div.bb-flipoverlay:last" )

        const $oRight = $sRight.find( CssClasses._OVERLAY )

        const speed = this.end ? 400 : this.options.speed

        this.$items.hide()
        this.$el.prepend( $sLeft, $sMiddle, $sRight )

        $sMiddle.css({
            transitionDuration: speed + "ms",
            transitionTimingFunction : this.options.easing,
        }).on( this.transEndEventName, ( event ) => {
            if ( $( event.target ).hasClass( CssClasses.PAGE ) ) {
                self.$el.children( CssClasses._PAGE ).remove()
                self.$nextItem.show()
                self.end = false
                self.isAnimating = false
                const isLimit = true && self.current === self.itemsCount - 1 || !dir && self.current === 0
                // callback trigger
                self.options.onEndFlip( self.previous, self.current, isLimit )
            }
        })

        if ( !dir ) {
            $sMiddle.addClass( CssClasses.FLIP_INITIAL )
        }

        // overlays
        if (this.options.shadows && !this.end) {

            const oLeftStyle = (dir) ? {
                transition: "opacity " + this.options.speed / 2 + "ms " + "linear" + " " + this.options.speed / 2 + "ms",
            } : {
                opacity: this.options.shadowSides,
                transition: "opacity " + this.options.speed / 2 + "ms " + "linear",
            }

            const oMiddleFStyle = (dir) ? {
                transition: "opacity " + this.options.speed / 2 + "ms " + "linear",
            } : {
                opacity: this.options.shadowFlip,
                transition: "opacity " + this.options.speed / 2 + "ms " + "linear" + " " + this.options.speed / 2 + "ms",
            }

            const oMiddleBStyle = (dir) ? {
                opacity: this.options.shadowFlip,
                transition: "opacity " + this.options.speed / 2 + "ms " + "linear" + " " + this.options.speed / 2 + "ms",
            } : {
                transition: "opacity " + this.options.speed / 2 + "ms " + "linear",
            }

            const oRightStyle = (dir) ? {
                opacity: this.options.shadowSides,
                transition: "opacity " + this.options.speed / 2 + "ms " + "linear",

            } : {
                transition: "opacity " + this.options.speed / 2 + "ms " + "linear" + " " + this.options.speed / 2 + "ms",
            }

            $oMiddleF.css(oMiddleFStyle)
            $oMiddleB.css(oMiddleBStyle)
            $oLeft.css(oLeftStyle)
            $oRight.css(oRightStyle)

        }

        setTimeout( () => {
            const classprefx: string = dir ? "next" : "prev"
            // first && last pages lift slightly up when we can"t go further
            $sMiddle.addClass( self.end ? "bb-flip-" + classprefx + "-end" : "bb-flip-" + classprefx )

            // overlays
            if ( self.options.shadows && !self.end ) {

                $oMiddleF.css({
                    opacity: true ? self.options.shadowFlip : 0,
                })

                $oMiddleB.css({
                    opacity: true ? 0 : self.options.shadowFlip,
                })

                $oLeft.css({
                    opacity: true ? self.options.shadowSides : 0,
                })

                $oRight.css({
                    opacity: true ? 0 : self.options.shadowSides,
                })

            }
        }, 25 )
    }
    // adds the necessary sides (bb-page) to the layout
    _addSide( side: string, dir: boolean ) {
        let $side: JQuery
        let html: string

        switch (side) {
            case "left":
                html = ( dir ? this.$current.html() : this.$nextItem.html() ) as string
                $side = $("<div/>").addClass(CssClasses.PAGE)
                    .append($("<div/>").addClass(CssClasses.BACK)
                            .append($("<div/>").addClass(CssClasses.OUTER)
                                    .append($("<div/>").addClass(CssClasses.CONTENT)
                                            .append($("<div/>").addClass(CssClasses.INNER).append(html)))
                                    .append($("<div/>").addClass(CssClasses.OVERLAY)))).css( "z-index", 102 )
                break
            case "middle":
                html = ( dir ? this.$current.html() : this.$nextItem.html())
                const html2 = ( dir ? this.$nextItem.html() : this.$current.html() )
                $side = $(`<div class="bb-page"><div class="bb-front"><div class="bb-outer"><div class="bb-content"><div class="bb-inner">${html}</div></div><div class="bb-flipoverlay"></div></div></div><div class="bb-back"><div class="bb-outer"><div class="bb-content" style="width:${this.elWidth}px"><div class="bb-inner">${html2}</div></div><div class="bb-flipoverlay"></div></div></div></div>`).css( "z-index", 103 )
                break
            case "right":
                html = ( dir ? this.$nextItem.html() : this.$current.html() )

                $side = $("<div/>").addClass(CssClasses.PAGE)
                    .append($("<div/>").addClass(CssClasses.FRONT)
                            .append($("<div/>").addClass(CssClasses.OUTER)
                                    .append($("<div/>").addClass(CssClasses.CONTENT)
                                            .append($("<div/>").addClass(CssClasses.INNER).append(html)))
                                    .append($("<div/>").addClass(CssClasses.OVERLAY)))).css( "z-index", 101 )
                break
        }

        return $side
    }

    _startSlideshow() {
        const self = this
        this.slideshow = setTimeout( () => {
            self._navigate( NEXT )
            if ( self.options.autoplay ) {
                self._startSlideshow()
            }
        }, this.options.interval )
    }

    _stopSlideshow() {
        if ( this.options.autoplay ) {
            clearTimeout( this.slideshow )
            this.options.autoplay = false
        }
    }

    _createPage(dir: boolean, index?: number) {
        return new Promise((resolve, reject) => {
            const $spinner = $(CssIds._SPINNER)
            $spinner.removeClass(CssClasses.NOT_LOADING)

            const itemsCount = this.itemsCount
            // magic formula by https://dev.to/maurobringolf/a-neat-trick-to-compute-modulo-of-negative-numbers-111e

            const subIndex: number = !dir ? index - 1 : index + 1
            this.modulatedNextIndex = BookBlockUtil.mod(subIndex, itemsCount)
            console.log(`next to load is ${this.modulatedNextIndex}_0,${BookBlockUtil.mod(index, itemsCount)}_0 `)

            let path: string
            let $img: JQuery<HTMLImageElement> = null
            if (this.modulatedNextIndex != null) {
                path = this.$el.data().bbsrcset[this.modulatedNextIndex].path
                $img = this.$el.find("img").eq(this.modulatedNextIndex) as JQuery<HTMLImageElement>
                $img.on("load", (e) => {
                    $spinner.addClass(CssClasses.NOT_LOADING)
                    $(e.target).fadeIn()
                    console.log("image should be loaded atp")
                    resolve()

                })

                $img.attr("src", path)
            }
        })
    }

    // public method: flips next
    next(): void {
        console.log("next ...")
        this._action( this.options.ltr )
    }
    // public method: flips back
    prev() {
        console.log("previous ...")
        this._action( !this.options.ltr )
    }
    // public method: goes to a specific page
    jump( page: number ) {

        page -= 1

        if ( page === this.current || page >= this.itemsCount || page < 0 ) {
            return false
        }

        let dir: boolean
        if ( this.options.ltr ) {
            dir = page > this.current ? true : false
        } else {
            dir = page > this.current ? false : true
        }
        this._action( dir, page )

    }
    // public method: goes to the last page
    last() {
        this.jump( this.itemsCount )
    }
    // public method: goes to the first page
    first() {
        this.jump( 1 )
    }
    // public method: check if isAnimating is true
    isActive() {
        return this.isAnimating
    }
    // public method: dynamically adds new elements
    // call this method after inserting new "bb-item" elements inside the BookBlock
    update() {
        const $currentItem = this.$items.eq( this.current )
        this.$items = this.$el.children( CssClasses._ITEM )
        this.itemsCount = this.$items.length
        this.current = $currentItem.index()
    }
    destroy() {
        if ( this.options.autoplay ) {
            this._stopSlideshow()
        }
        this.$el.removeClass( `bb-${this.options.orientation}` )
        this.$items.show()

        if ( this.options.nextEl !== "" ) {
            $( this.options.nextEl ).off( ".bookblock" )
        }

        if ( this.options.prevEl !== "" ) {
            $( this.options.prevEl ).off( ".bookblock" )
        }

        $window.off( "debouncedresize" )
    }
}

// <3 https://github.com/georgwittberger/jquery-plugin-typescript-example
// <3 https://www.smashingmagazine.com/2011/10/essential-jquery-plugin-patterns/
$.fn.bookBlock = Object.assign<any, BookBlockPluginGlobalSettings>(
    function(this: JQuery, options: BookBlockPluginSettings ): JQuery {
        // guard against double initialization
        if ($.data( this, "bookblock") != null) {
            return this
        }
        // Here's a best practice for overriding 'defaults'
        // with specified options. Note how, rather than a
        // regular defaults object being passed as the second
        // parameter, we instead refer to $.fn.pluginName.options
        // explicitly, merging it with the options passed directly
        // to the plugin. This allows us to override options both
        // globally and on a per-call level.
        //   // Merge the global options with the options given as argument.
        options = {
            ...$.fn.bookBlock.options,
            ...options,
        }

        const $pathArray: Array<{index: number, path: string}> = []

        // Check if required options are missing.
        //  if (options.height == null || options.width == null) {
        //             console.error(`BookBlock options are missing required parameter "height" and "width"`, JSON.stringify(options))
        //             return this
        //         }
        const $container = $(this)

        if (options.effects.paper) {
            $container.addClass(CssClasses.PAPER_EFFECT)
        }

        if (options.effects.bordershadow) {
            $container.addClass(CssClasses.DROPSHADOW_EFFECT)
        }

        const $spinner = $("<div/>")
            .addClass([CssClasses.LOADING_PULSE, CssClasses.NOT_LOADING])
            .attr("id", CssIds.SPINNER)

        $container.append($spinner)

        const $img = $container.find("img") as JQuery<HTMLImageElement>
        let eqVal = BookBlockUtil.mod(options.startPage - 1, $img.length)

        let initialQSPageValue: string
        if (options.history) {
            initialQSPageValue = BookBlockUtil.getQueryField("page")
            let initialQSPageNumberValue = Number.parseInt(initialQSPageValue, 10)
            if (Number.isInteger(initialQSPageNumberValue)) {
                if (initialQSPageNumberValue === 0 || initialQSPageNumberValue < 0) {
                    initialQSPageNumberValue = 1
                    BookBlockUtil.addQueryField("page", (BookBlockUtil.mod(initialQSPageNumberValue - 1, $img.length) + 1).toString())
                } else if (initialQSPageNumberValue > $img.length) {
                    console.log(`initialQSPageNumberValue is ${initialQSPageNumberValue}`)
                    initialQSPageNumberValue = BookBlockUtil.mod(initialQSPageNumberValue - 1, $img.length)
                    console.log(`initialQSPageNumberValue is ${initialQSPageNumberValue}`)
                    BookBlockUtil.addQueryField("page", (initialQSPageNumberValue + 1).toString())
                    eqVal = initialQSPageNumberValue
                } else {
                    eqVal = BookBlockUtil.mod(initialQSPageNumberValue - 1, $img.length)
                }
            }
        }

        $img.each((index: number, element: HTMLImageElement) => {
            const path: string = $(element).data("bbsrc")
            $pathArray.push({ index, path })
        })

        // attach image paths
        $container.data("bbsrcset", $pathArray)
        console.log(`eqVal is ${eqVal}`)
        $img.eq(eqVal).attr("src", $img.eq(eqVal).data("bbsrc"))

        const setImage = () => {
            if (!$img.length) {
                return true
            }
            const screenWidth: number = $window.width()
            const screenHeight: number = $window.height()
            const screenRatio = screenWidth / screenHeight as number
            let cssHeight: number
            let cssWidth: number
            function setSizes(imgRatio: number) {
                const gutterFactor: number = Math.abs(1 - options.gutter / 100)
                const plusOrMinus = Math.random() < 0.5 ? -1 : 1
                imgRatio += Number.EPSILON * plusOrMinus

                // options.gutter: number
                if (imgRatio > 1 && screenRatio > 1) {
                    // > 1 => width > height
                    cssHeight = screenHeight
                    cssWidth = screenHeight * imgRatio
                } else if (imgRatio > 1 && screenRatio < 1) {
                    // < 1 => width < height
                    cssWidth = screenWidth
                    cssHeight = screenWidth / imgRatio
                } else if (imgRatio < 1 && screenRatio > 1) {
                    cssHeight = screenHeight
                    cssWidth = screenHeight * imgRatio
                } else if (imgRatio < 1 && screenRatio < 1) {
                    cssWidth = screenWidth
                    cssHeight = screenWidth / imgRatio
                }

                cssHeight *= gutterFactor
                cssWidth *= gutterFactor

                $container.css({
                    height: cssHeight,
                    width: cssWidth,
                })
                $img.css({
                    height: cssHeight,
                    width: cssWidth,
                })
            }

            const tmpImage = new Image()
            tmpImage.onload = () => {
                const imgRatio = tmpImage.width / tmpImage.height
                setSizes(imgRatio)
                $img.addClass(CssClasses.FADEIN)
            }

            tmpImage.src = $img.eq(eqVal).attr("src")
        }

        $window.on("resize", setImage)

        $img.on("load", setImage)

        this.each(() => {
            $.data( this, "bookblock", new BookBlock( options, this ) )
        })

        return this
    },
    // Define the global default options.
    {
        options: {
            // does nothing so _dummy
            _dummy: false,

            // the space around the image in percent
            gutter: 0,

            // page to start on (1-based)
            startPage : 1,

            // vertical or horizontal flip
            orientation : "vertical",

            // ltr (left to right) or rtl (right to left)
            ltr: true,

            // speed for the flip transition in ms
            speed : 1000,

            // easing for the flip transition
            easing : "ease-in-out",

            // if set to true, both the flipping page and the sides will have an overlay to simulate shadows
            shadows : true,

            // opacity value for the "shadow" on both sides (when the flipping page is over it)
            // value : 0.1 - 1
            shadowSides : 0.2,

            // opacity value for the "shadow" on the flipping page (while it is flipping)
            // value : 0.1 - 1
            shadowFlip : 0.1,

            // if we should show the first item after reaching the end
            circular : false,

            // if we want to specify a selector that triggers the next() function. example: ´#bb-nav-next´
            nextEl : "#bb-nav-next",

            // if we want to specify a selector that triggers the prev() function
            prevEl : "#bb-nav-prev",

            // autoplay. If true it overwrites the circular option to true
            autoplay : false,

            // time (ms) between page switch, if autoplay is true
            interval : 3000,

            // callback after the flip transition
            // old is the index of the previous item
            // page is the current item´s index
            // isLimit is true if the current page is the last one (or the first one)
            onEndFlip(old, page, isLimit: boolean) {
                console.log(`Flipped from ${old}_0 to ${page}_0. Limit: ${isLimit}`)
                return false
            },

            // callback before the flip transition
            // page is the current item´s index
            onBeforeFlip(page) {
                console.log(`Will flip to page ${page}_0`)
                return false
            },

            // bb-block width in pixels
            width: null,

            // bb-block height in pixels
            height: null,

            //
            effects: {
                bordershadow: null,
                paper: null,
            },

            // history
            history: false,
        },
    },
)
