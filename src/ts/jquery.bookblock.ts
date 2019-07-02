// tslint:disable:variable-name
// tslint:disable:trailing-comma
// tslint:disable:prefer-const
// tslint:disable:object-literal-sort-keys
// tslint:disable:only-arrow-functions
// tslint:disable:no-console
// tslint:disable:max-line-length

/**
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
const $window = $(window)

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
//             var context = this
//             var args = arguments
//             var dispatch = () => {
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

class BookBlock  {
    // global settings
    _dummyGlobal: boolean

    // settings
    _dummy: boolean
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

    // optional functions
    onEndFlip?: (a, b, c: boolean) => boolean
    onBeforeFlip?: (a) => boolean

    options: BookBlockPluginSettings

    //    private defaults: BookBlockPluginSettings

    private itemsCount: number
    private slideshow: ReturnType<typeof setTimeout>
    private end: boolean

    private current: number
    private previous: number

    private elWidth: number
    private transEndEventName: string
    private support: boolean

    private $el: JQuery
    private $items: JQuery
    private $current: JQuery
    private $nextItem: JQuery

    constructor(options: BookBlockPluginSettings, element: JQuery) {
        this.options = options

        this.$el = $( element )

        // orientation class
        this.$el.addClass( "bb-" + this.options.orientation )
        // items
        this.$items = this.$el.children( ".bb-item" ).hide()
        // total items
        this.itemsCount = this.$items.length
        if ($("#bb-bookblock").data().bbsrcset != null) {
            this.itemsCount = $("#bb-bookblock").data().bbsrcset.length
        }

        console.log(`startpage is ${this.options.startPage}`)
        // current item´s index
        if ( (this.options.startPage > 0) && (this.options.startPage <= this.itemsCount) ) {
            this.current = (this.options.startPage - 1)
        } else {
            logError("startPage option is out of range")
            this.current = 0
        }
        // previous item´s index
        this.previous = -1
        // show first item
        this.$current = this.$items.eq( this.current ).show()
        // get width of this.$el
        // this will be necessary to create the flipping layout
        this.elWidth = this.$el.width()
        var transEndEventNames = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd",
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

        var self = this

        if ( this.options.nextEl !== "" ) {
            $( this.options.nextEl ).on( "click.bookblock touchstart.bookblock", () => {
                console.log("next button clicked")
                self._action( "next" )
                return false
            } )
        }

        if ( this.options.prevEl !== "" ) {
            $( this.options.prevEl ).on( "click.bookblock touchstart.bookblock", () => {
                console.log("prev button clicked")
                self._action( "prev" )
                return false
            } )
        }

        $("#bb-bookblock").hover(
            function() {
                console.log("hovering yo")
                $(this).addClass("brighten-20")
            }, function() {
                $(this).removeClass("brighten-20")
            }
        )

        $("#bb-bookblock").on("click.bookblock touchstart.bookblock", (e) => {
            //            e.preventDefault()

            console.log("touched the book")

            if (!!this.isAnimating === false) {
                const left: number = $(e.currentTarget).offset().left
                const width: number = $(e.currentTarget).width()
                const midX: number = (width / 2) + left

                if (e.touches) {
                    if (e.touches[0].screenX < midX) {
                        self._action("prev")
                    } else {
                        self._action("next")
                    }
                } else {
                    if (e.offsetX < width / 2) {
                        self._action("prev")
                    } else {
                        self._action("next")
                    }
                }
            }
        })

        $window.on( "debouncedresize", () => {
            // update width value
            self.elWidth = self.$el.width()
        } )

        $( document ).on("keydown.bookblock", (e) => {
            const keyCode = e.which

            const UP: number = 16
            const RIGHT: number = 39
            const LEFT: number = 37
            const DOWN: number = 40

            if ([UP, RIGHT].indexOf(keyCode) > -1) {
                e.stopPropagation()
                e.preventDefault()
                self._action( "next" )
            }

            if ([DOWN, LEFT].indexOf(keyCode) > -1) {
                e.stopPropagation()
                e.preventDefault()
                self._action( "prev")
            }
        })

    }

    _action( dir: string, page?: number ) {
        const shit = this
        console.log(`this current is ${this.current}`)
        shit._createPage(dir, this.current)
            .then(() => {
                shit._stopSlideshow()
                shit._navigate( dir, page )
            })
    }

    _navigate( dir: string, page?: number ) {

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
        } else if ( dir === "next" && this.options.direction === "ltr" || dir === "prev" && this.options.direction === "rtl" ) {
            if ( !this.options.circular && this.current === this.itemsCount - 1 ) {
                this.end = true
            } else {
                this.previous = this.current
                this.current = this.current < this.itemsCount - 1 ? this.current + 1 : 0
            }
        } else if ( dir === "prev" && this.options.direction === "ltr" || dir === "next" && this.options.direction === "rtl" ) {
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

    _layoutNoSupport(dir: string) {
        this.$items.hide()
        this.$nextItem.show()
        this.end = false
        this.isAnimating = false
        var isLimit = dir === "next" && this.current === this.itemsCount - 1 || dir === "prev" && this.current === 0
        // callback trigger
        this.options.onEndFlip( this.previous, this.current, isLimit )
    }
    // creates the necessary layout for the 3d structure
    _layout(dir: string) {

        var self = this
        // basic structure: 1 element for the left side.
        var $s_left = this._addSide( "left", dir )
        // 1 element for the flipping/middle page
        var $s_middle = this._addSide( "middle", dir )
        // 1 element for the right side
        var $s_right = this._addSide( "right", dir )
        // overlays
        var $o_left = $s_left.find( "div.bb-overlay" )
        var $o_middle_f = $s_middle.find( "div.bb-flipoverlay:first" )
        var $o_middle_b = $s_middle.find( "div.bb-flipoverlay:last" )
        var $o_right = $s_right.find( "div.bb-overlay" )
        var speed = this.end ? 400 : this.options.speed

        this.$items.hide()
        this.$el.prepend( $s_left, $s_middle, $s_right )

        $s_middle.css({
            transitionDuration: speed + "ms",
            transitionTimingFunction : this.options.easing
        }).on( this.transEndEventName, ( event ) => {
            if ( $( event.target ).hasClass( "bb-page" ) ) {
                self.$el.children( ".bb-page" ).remove()
                self.$nextItem.show()
                self.end = false
                self.isAnimating = false
                var isLimit = dir === "next" && self.current === self.itemsCount - 1 || dir === "prev" && self.current === 0
                // callback trigger
                self.options.onEndFlip( self.previous, self.current, isLimit )
            }
        })

        if ( dir === "prev" ) {
            $s_middle.addClass( "bb-flip-initial" )
        }

        // overlays
        if (this.options.shadows && !this.end) {

            var o_left_style = (dir === "next") ? {
                transition: "opacity " + this.options.speed / 2 + "ms " + "linear" + " " + this.options.speed / 2 + "ms"
            } : {
                transition: "opacity " + this.options.speed / 2 + "ms " + "linear",
                opacity: this.options.shadowSides
            }

            var o_middle_f_style = (dir === "next") ? {
                transition: "opacity " + this.options.speed / 2 + "ms " + "linear"
            } : {
                transition: "opacity " + this.options.speed / 2 + "ms " + "linear" + " " + this.options.speed / 2 + "ms",
                opacity: this.options.shadowFlip
            }

            var o_middle_b_style = (dir === "next") ? {
                transition: "opacity " + this.options.speed / 2 + "ms " + "linear" + " " + this.options.speed / 2 + "ms",
                opacity: this.options.shadowFlip
            } : {
                transition: "opacity " + this.options.speed / 2 + "ms " + "linear"
            }

            var o_right_style = (dir === "next") ? {
                transition: "opacity " + this.options.speed / 2 + "ms " + "linear",
                opacity: this.options.shadowSides
            } : {
                transition: "opacity " + this.options.speed / 2 + "ms " + "linear" + " " + this.options.speed / 2 + "ms"
            }

            $o_middle_f.css(o_middle_f_style)
            $o_middle_b.css(o_middle_b_style)
            $o_left.css(o_left_style)
            $o_right.css(o_right_style)

        }

        setTimeout( () => {
            // first && last pages lift slightly up when we can"t go further
            $s_middle.addClass( self.end ? "bb-flip-" + dir + "-end" : "bb-flip-" + dir )

            // overlays
            if ( self.options.shadows && !self.end ) {

                $o_middle_f.css({
                    opacity: dir === "next" ? self.options.shadowFlip : 0
                })

                $o_middle_b.css({
                    opacity: dir === "next" ? 0 : self.options.shadowFlip
                })

                $o_left.css({
                    opacity: dir === "next" ? self.options.shadowSides : 0
                })

                $o_right.css({
                    opacity: dir === "next" ? 0 : self.options.shadowSides
                })

            }
        }, 25 )
    }
    // adds the necessary sides (bb-page) to the layout
    _addSide( side: string, dir: string ) {
        var $side: JQuery

        switch (side) {
            case "left":
                /*
                  <div class="bb-page" style="z-index:102">
                  <div class="bb-back">
                  <div class="bb-outer">
                  <div class="bb-content">
                  <div class="bb-inner">
                  dir==="next" ? [content of current page] : [content of next page]
                  </div>
                  </div>
                  <div class="bb-overlay"></div>
                  </div>
                  </div>
                  </div>
                */
                $side = $("<div class=\"bb-page\"><div class=\"bb-back\"><div class=\"bb-outer\"><div class=\"bb-content\"><div class=\"bb-inner\">" + ( dir === "next" ? this.$current.html() : this.$nextItem.html() ) + "</div></div><div class=\"bb-overlay\"></div></div></div></div>").css( "z-index", 102 )
                break
            case "middle":
                $side = $(`<div class="bb-page"><div class="bb-front"><div class="bb-outer"><div class="bb-content"><div class="bb-inner">`
                          + (dir === "next" ? this.$current.html() : this.$nextItem.html())
                          + `</div></div><div class="bb-flipoverlay"></div></div></div><div class="bb-back"><div class="bb-outer"><div class="bb-content" style="width:`
                          + this.elWidth
                          + `px"><div class="bb-inner">`
                          + ( dir === "next" ? this.$nextItem.html() : this.$current.html() )
                          + `</div></div><div class="bb-flipoverlay"></div></div></div></div>`).css( "z-index", 103 )
                break
            case "right":
                $side = $(`<div class="bb-page"><div class="bb-front"><div class="bb-outer"><div class="bb-content"><div class="bb-inner">`
                          + ( dir === "next" ? this.$nextItem.html() : this.$current.html() )
                          + `</div></div><div class="bb-overlay"></div></div></div></div>`).css( "z-index", 101 )
                break
        }

        return $side
    }

    _startSlideshow() {
        var self = this
        this.slideshow = setTimeout( () => {
            self._navigate( "next" )
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

    _createPage(dir: string, index?: number) {
        return new Promise((resolve, reject) => {
            const $spinner = $("#bb-spinner")
            $spinner.removeClass("bb-not-loading")

            const itemsCount = this.itemsCount
            // magic formula by https://dev.to/maurobringolf/a-neat-trick-to-compute-modulo-of-negative-numbers-111e
            const mod = (x: number, n: number) => (x % n + n) % n

            const subIndex: number = (dir === "prev") ? index - 1 : index + 1
            const modulatedNextIndex: number = mod(subIndex, itemsCount)

            console.log(`next to load is ${modulatedNextIndex}`)
            let path: string
            let $img: JQuery<HTMLImageElement>
                if (modulatedNextIndex != null) {
                    path = $("#bb-bookblock").data().bbsrcset[modulatedNextIndex].path
                    console.log(path)
                    $img = $("#bb-bookblock").find("img").eq(modulatedNextIndex) as JQuery<HTMLImageElement>
                    $img.on("load", (e) => {
                        $spinner.addClass("bb-not-loading")
                        console.log($(e.target)[0])
                        $(e.target).addClass("fadeIn")
                        console.log("image should be loaded atp")
                    })

                    $img.attr("src", path)
                }
            resolve()
        })
    }

    // public method: flips next
    next() {
        console.log("next ...")
        this._action( this.options.direction === "ltr" ? "next" : "prev" )
    }
    // public method: flips back
    prev() {
        console.log("previous ...")
        this._action( this.options.direction === "ltr" ? "prev" : "next" )
    }
    // public method: goes to a specific page
    jump( page: number ) {

        page -= 1

        if ( page === this.current || page >= this.itemsCount || page < 0 ) {
            return false
        }

        let dir: string
        if ( this.options.direction === "ltr" ) {
            dir = page > this.current ? "next" : "prev"
        } else {
            dir = page > this.current ? "prev" : "next"
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
        var $currentItem = this.$items.eq( this.current )
        this.$items = this.$el.children( ".bb-item" )
        this.itemsCount = this.$items.length
        this.current = $currentItem.index()
    }
    destroy() {
        if ( this.options.autoplay ) {
            this._stopSlideshow()
        }
        this.$el.removeClass( "bb-" + this.options.orientation )
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

var logError = ( message: string ) => {
    if ( window.console ) {
        window.console.error( message )
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
        const $spinner = $("<div/>")
            .addClass(["bb-loading-pulse", "bb-not-loading"])
            .attr("id", "bb-spinner")

        $container.append($spinner)

        const $img = $container.find("img") as JQuery<HTMLImageElement>


        $img.each((index: number, element: HTMLImageElement) => {
            let path: string = $(element).data("bbsrc")
            $pathArray.push({ index, path })
            //             if (index > 0) {
            //  $(element).css("background-image", 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAEsAQMAAAAPddOLAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABlBMVEVvIeX///9Be5XsAAAAAWJLR0QB/wIt3gAAAAd0SU1FB+MGHQo2IM7SjQUAAAApSURBVHja7cExAQAAAMKg9U9tCy+gAAAAAAAAAAAAAAAAAAAAAAAA4GdLAAAB9wDA9AAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOS0wNi0yOVQxNDo1NDozMi0wNDowMCWobV0AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTktMDYtMjlUMTQ6NTQ6MzItMDQ6MDBU9dXhAAAAAElFTkSuQmCC")')
            // //             }
        })

        // attach image paths
        $container.data("bbsrcset", $pathArray)

        $img.first().attr("src", $img.first().data("bbsrc"))

        const _setImage = () => {
            if (!$img.length) {
                return true
            }
            const screenWidth: number = $window.width()
            const screenHeight: number = $window.height()
            const screenRatio = screenWidth / screenHeight as number
            let cssHeight: number
            let cssWidth: number
            function setSizes(imgRatio: number) {
                let gutterFactor: number = Math.abs(1 - options.gutter / 100)
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
            tmpImage.onload = function() {
                const imgRatio = tmpImage.width / tmpImage.height
                setSizes(imgRatio)
            }
            tmpImage.src = $img.attr("src")
        }

        $window.on("resize", _setImage)

        $img.on("load", _setImage)

        //      $img.on("load", () => {
        //             $(this).css({
        //                 boxShadow: "0px 9px 8px 2px rgba(50, 50, 50, 0.8)",
        //             })
        //         })

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

            // page to start on
            startPage : 1,
            // vertical or horizontal flip
            orientation : "vertical",
            // ltr (left to right) or rtl (right to left)
            direction : "ltr",
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
            onEndFlip(old, page, isLimit: boolean) { return false },
            // callback before the flip transition
            // page is the current item´s index
            onBeforeFlip(page: HTMLElement) { return false },

            // bb-block width in pixels
            width: null,

            // bb-block height in pixels
            height: null,
        }
    }
)
