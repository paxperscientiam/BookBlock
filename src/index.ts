// tslint:disable:no-console

// tslint:disable-next-line
declare global  {
    // tslint:disable-next-line
    interface Window {
        jQuery: typeof jQuery
        $: typeof jQuery
        Modernizr: ModernizrStatic
        BookBlock: typeof BookBlock
//         Page: typeof Page
    }
}

import "./scss/main.scss"

import * as $ from "jquery"
window.$ = $

import "./js/jquery.bookblock"

// $.BookBlock = BookBlock

// class Page {
//     $bookBlock = $( "#bb-bookblock" )
//     $navNext = $( "#bb-nav-next" )
//     $navPrev = $( "#bb-nav-prev" )
//     $navFirst = $( "#bb-nav-first" )
//     $navLast = $( "#bb-nav-last" )
//     $slides = this.$bookBlock.children()

//     constructor(configuration) {
//         //
//     }

//     enableSlides() {
//         this.$slides.on( {
//             swipeleft( event ) {
//                 this.$bookBlock.bookblock( "next" )
//                 return false
//             },
//             swiperight( event ) {
//                 this.$bookBlock.bookblock( "prev" )
//                 return false
//             },
//         } )

//     }

//     initEvents() {
//         console.log("initEvents")
//         // add navigation events
//         this.$navNext.on( "click touchstart", function() {
//             this.$bookBlock.bookblock( "next" )
//             return false
//         } )

//         this.$navPrev.on( "click touchstart", function() {
//             this.$bookBlock.bookblock( "prev" )
//             return false
//         } )

//         this.$navFirst.on( "click touchstart", function() {
//             this.$bookBlock.bookblock( "first" )
//             return false
//         } )

//         this.$navLast.on( "click touchstart", function() {
//             this.$bookBlock.bookblock( "last" )
//             return false
//         } )
//     }

//     init() {
//         this.$bookBlock.bookblock( {
//             circular: true,
//             shadowFlip : 0.7,
//             shadowSides : 0.8,
//             speed : 800,
//         } )
//         this.initEvents()
//     }
// }

// $(() => {
//     window.Page = Page
// })
