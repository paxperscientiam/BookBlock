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

// @ts-ignore
const COMPILE_TIME = `${process.env.COMPILE_TIME}`
const PROJECT_NAME = `${process.env.PROJECT_NAME}`
const PROJECT_VERSION = `${process.env.PROJECT_VERSION}`

// global
const $window: JQuery<Window> = $(window)

import {
    CssClasses,
    CssIds,
    KEY_DOWN,
    KEY_LEFT,
    KEY_RIGHT,
    KEY_UP,
    NEXT,
    PREV,
} from "./constants"

import {
    loadImage,
} from "./imageHandlers"

import { BookBlockUtil } from "./utils"

import { Notify } from "./notify"

import {
    setFrameSize,
} from "./setImage"

import {
    getLeftSide,
    getMiddleSide,
    getNavigationPanel,
    getRightSide,
} from "./components"

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
    orientation: string
    shadowFlip: number
    shadowSides: number
    shadows: boolean
    speed: number
    startPage: number
    autoplay: boolean
    effects: BookBlockPluginEffectsSettings

    PROJECT_NAME: string = PROJECT_NAME
    PROJECT_VERSION: string = PROJECT_VERSION
    // @ts-ignore
    COMPILE_TIME: string = COMPILE_TIME

    navigation: BookBlockPluginNavigationSettings

    // tslint:disable-next-line
    _dummy: boolean

    // optional functions
    onEndFlip?: (a: number, b: number, c: boolean) => void
    onBeforeFlip?: (a: number) => void

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

    nextEl: string =  "#bb-nav-next"
    prevEl: string = "#bb-nav-prev"

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

        // current item´s index

        // previous item´s index
        this.previous = -1
        // show first item
        this.startIndex = this.current
        if (this.options.history) {
            const initialQSPageValue = BookBlockUtil.getQueryField("page")
            const initialQSPageNumberValue = Number.parseInt(initialQSPageValue, 10)
            console.log(`initialQSPageNumberValue is ${initialQSPageNumberValue}`)
            if (Number.isInteger(initialQSPageNumberValue)) {
                this.startIndex = BookBlockUtil.mod(initialQSPageNumberValue - 1, this.itemsCount)
                // i think this is correct
                console.log(`this.startIndex from construct is ${this.startIndex}`)
            } else {
                this.startIndex = 0
            }
            this.current = this.startIndex
        } else if ( (this.options.startPage > 0) && (this.options.startPage <= this.itemsCount) ) {
            this.current = (this.options.startPage - 1)
            this.startIndex = this.current
        } else {
            BookBlockUtil.logError("startPage option is out of range")
            this.startIndex = 0
        }

        console.log(`this.startIndex is ${this.startIndex}`)
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

        $( this.nextEl ).on( "click.bookblock touchstart.bookblock", () => {
            console.log("next button clicked")
            self._action( NEXT )
            return false
        } )

        $( this.prevEl ).on( "click.bookblock touchstart.bookblock", () => {
            console.log("prev button clicked")
            self._action( PREV )
            return false
        } )

        this.$el.hover(
            () => {
                //  Notify.diplay()
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
                if ([KEY_UP, KEY_RIGHT].indexOf(keyCode) > -1) {
                    e.stopPropagation()
                    e.preventDefault()
                    self._action( NEXT )
                }

                if ([KEY_DOWN, KEY_LEFT].indexOf(keyCode) > -1) {
                    e.stopPropagation()
                    e.preventDefault()
                    self._action( PREV)
                }
            }
        })
    }

    _action( dir: boolean, page?: number ) {
        const shit = this
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
                $side = getLeftSide(html)
                break
            case "middle":
                html = ( dir ? this.$current.html() : this.$nextItem.html())
                const html2 = ( dir ? this.$nextItem.html() : this.$current.html() )
                $side = getMiddleSide(html, html2)
                break
            case "right":
                html = ( dir ? this.$nextItem.html() : this.$current.html() )
                $side = getRightSide(html)
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
                loadImage(path).then((result: Blob) => {
                    $spinner.addClass(CssClasses.NOT_LOADING)
                    const imageURL = window.URL.createObjectURL(result)
                    $img.addClass(CssClasses.FADEIN)
                    $img.attr("src", imageURL)
                    resolve()
                }, (Error) => {
                    reject(Error)
                })
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

        $( this.nextEl ).off( ".bookblock" )

        $( this.prevEl ).off( ".bookblock" )

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

        const $container = $(this)

        if (options.navigation.buttons) {
            const $bbNav = getNavigationPanel()
            $container.after($bbNav)
        }

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
                    Notify.diplay(`Only 1 through ${$img.length} are valid page selections!`)
                    initialQSPageNumberValue = 1
                    BookBlockUtil.addQueryField("page", (BookBlockUtil.mod(initialQSPageNumberValue - 1, $img.length) + 1).toString())
                } else if (initialQSPageNumberValue > $img.length) {
                    Notify.diplay(`Requested page '${initialQSPageValue}' does not exist! Last page is ${$img.length}`)

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

        const indexedImagePath = $img.eq(eqVal).data("bbsrc")

        let imgRatio = $container.data("bbratio")
        if (imgRatio != null) {
            imgRatio = Function(`"use strict";return (${imgRatio})`)()
            setFrameSize($container, imgRatio, options)
            setFrameSize($img, imgRatio, options)
        }

        loadImage(indexedImagePath).then((result: Blob) => {
            const imageURL = window.URL.createObjectURL(result)
            $img.addClass(CssClasses.FADEIN)
            $img.eq(eqVal).attr("src", imageURL)
        }, (Error) => {
            console.log(Error)
        })

        console.log(`img ration is ${imgRatio}`)

        $window.on("resize", () => {
            //            setImage($img, options, eqVal, imgRatio)
            //          setImage($img, options, eqVal, null)
        })

        // @ts-ignore
        $img.on("load", () => {
            //            setImage($img, options, eqVal, imgRatio)
            //            setImage($img, options, eqVal, null)
        })
        this.each(() => {
            $.data( this, $.fn.bookBlock.PROJECT_NAME, new BookBlock( options, this ) )
        })

        return this
    },
    // Define the global default options.
    {
        COMPILE_TIME,
        PROJECT_NAME,
        PROJECT_VERSION,

        options: {
            // does nothing so _dummy
            _dummy: false,

            gutter: 0,

            startPage : 1,

            orientation : "vertical",

            ltr: true,

            speed : 1000,

            easing : "ease-in-out",

            shadows : true,

            shadowSides : 0.2,

            shadowFlip : 0.1,

            circular : false,

            autoplay : false,

            interval : 3000,

            effects: {
                bordershadow: null,
                paper: null,
            },

            navigation: {
                buttons: true,
            },

            history: false,

            // METHODS
            onBeforeFlip: $.noop,
            onEndFlip: $.noop,
        },
    },
)
