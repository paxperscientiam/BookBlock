(function(FuseBox){FuseBox.$fuse$=FuseBox;
FuseBox.target = "browser";
FuseBox.pkg("default", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:no-console
require("./scss/main.scss");
require("./ts/jquery.bookblock");

});
___scope___.file("scss/main.scss", function(exports, require, module, __filename, __dirname){


require("fuse-box-css")("default/scss/main.scss", "@font-face{font-family:arrows;src:url(\"data:application/vnd.ms-fontobject;charset=utf-8;base64,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\");src:url(\"data:application/vnd.ms-fontobject;charset=utf-8;base64,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\") format(\"embedded-opentype\"),url(\"data:application/font-woff;charset=utf-8;base64,d09GRk9UVE8AAASMAAsAAAAABmgAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABDRkYgAAABCAAAAWgAAAGpwLpPskZGVE0AAAJwAAAAGgAAABxn0g/QR0RFRgAAAowAAAAdAAAAIAAxAARPUy8yAAACrAAAAEsAAABgMY/d7mNtYXAAAAL4AAAAPQAAAVLgF/LMaGVhZAAAAzgAAAAvAAAANv0zrr1oaGVhAAADaAAAAB4AAAAkBRz/5WhtdHgAAAOIAAAAEAAAABAHgAFEbWF4cAAAA5gAAAAGAAAABgAEUABuYW1lAAADoAAAAN0AAAF6DL0wDHBvc3QAAASAAAAADAAAACAAAwAAeJw1Tk0oBGEYfr8100xrGn8zjEyzJSmXbTKyDi7abJFy5SRuVn5aSVESyc+XE+vmQA6OiuOeJEmclHJBuShSamtnFY/v2+XyPu/7Pu/zPC8jRSHGmDaayUzPzxKLEKPu0IuEsYrQUbhRwQ3Fi5I9NsL5PxoanyhaYV51abXKJap2aavGJd1lB7WkSgedqqieXGqemxrv9f32MgQCUr7vl7P+EonYOttgm6RIYYSexTeVJtiGswsWb3m0OUhPLwFfRj9QuDz+L9kVsbMWeAxoCAJg8vpcBT6uToF8Lg18vq0JZc+m0NszRzpY01O3VhoOQaa1KMi+HKgmMVASiAP/rAvUOFRtg1yRSHUyopDcA16yyzH83D84mui3B4F3+VEhmZXUyl+RO9JzE0KdOfHA2lpfNem0XHYSVLpk7Jmgi84U2F3QYYMl9uPAwM0Nfq6GHdndqiYP88q3VbQ0s2hZ3N4xor/0/LT2eJxjYGBgZACCM7aLzoPos6fMGmA0AE0zBxYAAHicY2BkYGDgA2IJBhBgYmAEQmYgZgHzGAAEawA2AAAAeJxjYGZqYJzAwMrAwbiA8QADA0MkhGY0ZpBnWMrAwMTAyswABwIIJkNAmmsKg8MDpg8MTAn/HzBYMSUwKDQANcIVKAAhIwBvQwyDAHicY2BgYGaAYBkGRgYQ8AHyGMF8FgYDIM0BhEwgiQfMHxj+/wezmCAs+f8CzFBdYMDIxoDMHZEAAN/nCbEAAAB4nGNgZGBgAOLtUTns8fw2Xxm4mRqAIgxnT5kh0f8fMDUwJQC5HAxMIFEAM4kLGgB4nGNgZGBgSvj/gMGKqYGB4W8DkASKoAAWAIA2BQMAAAKAAAACgACAAoAAxAAAAAAAAFAAAAQAAHicbY4xasNAEEWfbFnG2KRL6iWQUkLaYDCugw/gwr2KRRiMFtY2volPkC7HyAFygtwlX6stUniHYR6zf+YPsOJOxvAyCp4ST5jzlnjKK+fEuTSfiWcs+U5cKH6lzPKFOqs4NfBEG58TT/mgTJxH35FnvPCVuFD/h5ag8NzkSxuCv6nucXRcOcVv9q67nlrBTsKeS6xBCofBUlGrbpX/l40dy0aHrJVWqoZ3LfH9ZedD54ytarM1o6nAbsp1aetGmodXHeQX1DjGK4y2Dc4cXDgffW+aqn48+AcC4zbfAAAAeJxjYGbACwAAfQAE\") format(\"woff\"),url(\"data:application/x-font-ttf;charset=utf-8;base64,AAEAAAANAIAAAwBQRkZUTWfSD9AAAAWgAAAAHEdERUYAMwAGAAAFgAAAACBPUy8yMW3dzQAAAVgAAABWY21hcOAZ89MAAAHIAAABUmdhc3D//wADAAAFeAAAAAhnbHlmZj5ZrgAAAywAAACIaGVhZP0zrr0AAADcAAAANmhoZWEFHP/nAAABFAAAACRobXR4CFUBRAAAAbAAAAAYbG9jYQBsADYAAAMcAAAADm1heHAASgAaAAABOAAAACBuYW1lDL0wDAAAA7QAAAF6cG9zdN3f5/QAAAUwAAAARgABAAAAAQAABSNsql8PPPUACwKAAAAAAM3KNoAAAAAAzco2gAAA/+ACgAJgAAAACAACAAAAAAAAAAEAAAJg/+AAOgKAAAD9gAKAAAEAAAAAAAAAAAAAAAAAAAAGAAEAAAAGABcAAgAAAAAAAgAAAAEAAQAAAEAAAAAAAAAAAQKAAZAABQAIAaABwAAAAFkBoAHAAAABMwAfAKUAAAIABQMAAAAAAAAAAAAAEAAAAAAAAAAAAAAAUGZFZABA4ALwAAJg/+AAOgJgACCAAAABAAAAAAAAAoAAAAAAAAAA1QAAAoAAgAKAAMQAAAAAAAAAAwAAAAMAAAAcAAEAAAAAAEwAAwABAAAAHAAEADAAAAAIAAgAAgAAAADgA/AA//8AAAAA4ALwAP//AAAgARAFAAEAAAAAAAAAAAAAAQYAAAEAAAAAAAAAAQIAAAACAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACgANgBEAAAAAgCAAGYCAAHaAA4AFgAAAScmBhURFBY/ATY1NCYnNiIVERQyNREBiOkNEhIN6QkFAnZgYAEukgkLEP7kEAsJkgYIBAcBriX+1iUlASoAAAABAMQAbAH8AdQAAgAAExElxAE4AdP+mrMAAAAAAQAA/+ACgAJgAAIAABEBIQKA/YACYP2AAAAAAAAADACWAAEAAAAAAAEABgAOAAEAAAAAAAIABwAlAAEAAAAAAAMAIgBzAAEAAAAAAAQABgCkAAEAAAAAAAUACwDDAAEAAAAAAAYABgDdAAMAAQQJAAEADAAAAAMAAQQJAAIADgAVAAMAAQQJAAMARAAtAAMAAQQJAAQADACWAAMAAQQJAAUAFgCrAAMAAQQJAAYADADPAGEAcgByAG8AdwBzAABhcnJvd3MAAFIAZQBnAHUAbABhAHIAAFJlZ3VsYXIAAEYAbwBuAHQARgBvAHIAZwBlACAAMgAuADAAIAA6ACAAYQByAHIAbwB3AHMAIAA6ACAAMgA4AC0ANQAtADIAMAAxADMAAEZvbnRGb3JnZSAyLjAgOiBhcnJvd3MgOiAyOC01LTIwMTMAAGEAcgByAG8AdwBzAABhcnJvd3MAAFYAZQByAHMAaQBvAG4AIAAxAC4AMAAAVmVyc2lvbiAxLjAAAGEAcgByAG8AdwBzAABhcnJvd3MAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGAAAAAQACAQIBAwEEB3VuaUUwMDIHdW5pRTAwMwd1bmlGMDAwAAAAAAAB//8AAgABAAAADgAAABgAAAAAAAIAAQADAAUAAQAEAAAAAgAAAAAAAQAAAADMPaLPAAAAAM3KNoAAAAAAzco2gA==\") format(\"truetype\"),url(\"data:image/svg+xml;charset=utf8,%3C?xml version='1.0' standalone='no'?%3E %3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd' %3E %3Csvg xmlns='http://www.w3.org/2000/svg'%3E %3Cmetadata%3E This is a custom SVG font generated by IcoMoon. %3Ciconset grid='20'%3E%3C/iconset%3E %3C/metadata%3E %3Cdefs%3E %3Cfont id='arrows' horiz-adv-x='640' %3E %3Cfont-face units-per-em='640' ascent='608' descent='-32' /%3E %3Cmissing-glyph horiz-adv-x='640' /%3E %3Cglyph unicode='&%23xe002;' d='M 392.096,302.144l-232.8,146.24C 142.080,459.648, 128,451.36, 128,429.92l0-283.872 c0-21.44, 14.080-29.696, 31.296-18.432l 232.8,146.208 c0,0, 8.416,5.92, 8.416,14.144S 392.096,302.144, 392.096,302.144z M 464,473.728c-28.416,0-48-8.736-48-37.152l0-297.152 c0-28.448, 19.584-37.184, 48-37.184s 48,8.736, 48,37.184L 512,436.576 C 512,464.992, 492.416,473.728, 464,473.728z' /%3E %3Cglyph unicode='&%23xe003;' d='M 196.212,467.2L 196.174,108.8L 507.826,288 z' /%3E %3Cglyph unicode='&%23x20;' horiz-adv-x='320' /%3E %3Cglyph class='hidden' unicode='&%23xf000;' d='M0,608L 640 -32L0 -32 z' horiz-adv-x='0' /%3E %3C/font%3E%3C/defs%3E%3C/svg%3E\") format(\"svg\");font-weight:400;font-style:normal}.bb-bookblock{margin:0 auto;position:relative;z-index:100;-webkit-perspective:1300px;perspective:1300px;-webkit-backface-visibility:hidden;backface-visibility:hidden}.bb-page{position:absolute;-webkit-transform-style:preserve-3d;transform-style:preserve-3d;transition-property:-webkit-transform;transition-property:transform;transition-property:transform,-webkit-transform}.bb-page>div{position:absolute;height:100%;width:100%;top:0;left:0;-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-transform-style:preserve-3d;transform-style:preserve-3d}.bb-content{position:absolute;height:100%;width:100%;top:0;left:0;-webkit-backface-visibility:hidden;backface-visibility:hidden;background:#fff}.bb-horizontal .bb-content{height:200%}.bb-vertical .bb-content{width:200%}.bb-horizontal .bb-page{width:100%;height:50%;top:50%;-webkit-transform-origin:center top;transform-origin:center top}.bb-horizontal .bb-back{-webkit-transform:rotateX(-180deg);transform:rotateX(-180deg)}.bb-horizontal .bb-front .bb-content{top:-100%}.bb-horizontal .bb-flip-initial,.bb-horizontal .bb-flip-next{-webkit-transform:rotateX(180deg);transform:rotateX(180deg)}.bb-horizontal .bb-flip-prev{-webkit-transform:rotateX(0deg);transform:rotateX(0deg)}.bb-horizontal .bb-flip-next-end{-webkit-transform:rotateX(15deg);transform:rotateX(15deg)}.bb-horizontal .bb-flip-prev-end{-webkit-transform:rotateX(165deg);transform:rotateX(165deg)}.bb-vertical .bb-page{width:50%;height:100%;left:50%;-webkit-transform-origin:left center;transform-origin:left center}.bb-vertical .bb-back{-webkit-transform:rotateY(-180deg);transform:rotateY(-180deg)}.bb-vertical .bb-front .bb-content{left:-100%}.bb-vertical .bb-flip-initial,.bb-vertical .bb-flip-next{-webkit-transform:rotateY(-180deg);transform:rotateY(-180deg)}.bb-vertical .bb-flip-prev{-webkit-transform:rotateY(0deg);transform:rotateY(0deg)}.bb-vertical .bb-flip-next-end{-webkit-transform:rotateY(-15deg);transform:rotateY(-15deg)}.bb-vertical .bb-flip-prev-end{-webkit-transform:rotateY(-165deg);transform:rotateY(-165deg)}.bb-outer{overflow:hidden;z-index:999}.bb-inner,.bb-outer{position:absolute;height:100%;width:100%;top:0;left:0;-webkit-backface-visibility:hidden;backface-visibility:hidden}.bb-flipoverlay,.bb-overlay{background-color:rgba(0,0,0,.7);position:absolute;top:0;left:0;width:100%;height:100%;opacity:0}.bb-bookblock.bb-horizontal>div.bb-page:first-child{-webkit-transform:rotateX(180deg);transform:rotateX(180deg)}.bb-bookblock.bb-horizontal>div.bb-page:first-child .bb-back{-webkit-transform:rotateX(180deg);transform:rotateX(180deg)}.bb-bookblock.bb-vertical>div.bb-page:first-child{-webkit-transform:rotateY(180deg);transform:rotateY(180deg)}.bb-bookblock.bb-vertical>div.bb-page:first-child .bb-back{-webkit-transform:rotateY(180deg);transform:rotateY(180deg)}.bb-item{width:100%;height:100%;position:absolute;top:0;left:0;display:none;background:#fff}.bb-nav-container{width:100%;height:30px;margin:1em auto 0;position:relative;z-index:0;text-align:center}.bb-nav-container a{display:inline-block;width:30px;height:30px;text-align:center;border-radius:2px;background:#72b890;color:#fff;font-size:0;margin:2px}.bb-nav-container a:hover{opacity:.6}.bb-icon:before{display:block;font-family:arrows,sans-serif;font-size:20px;font-style:normal;font-variant:normal;font-weight:400;line-height:1;speak:none;text-transform:none}.bb-icon-first:before,.bb-icon-last:before{content:\"\\e002\"}.bb-icon-arrow-left:before,.bb-icon-arrow-right:before{content:\"\\e003\"}.bb-icon-arrow-left:before,.bb-icon-first:before{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.no-js .bb-bookblock,.no-js ul.bb-custom-grid li{width:auto;height:auto}.no-js .bb-item{display:block;position:relative}")
});
___scope___.file("ts/jquery.bookblock.js", function(exports, require, module, __filename, __dirname){

// tslint:disable:variable-name
// tslint:disable:trailing-comma
// tslint:disable:prefer-const
// tslint:disable:no-var-keyword
// tslint:disable:object-literal-sort-keys
// tslint:disable:only-arrow-functions
// tslint:disable:no-console
// tslint:disable:max-line-length
var tslib_1 = require("tslib");
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
var $window = $(window);
// const Modernizr = window.Modernizr
// https://gist.github.com/edankwan/4389601
Modernizr.addTest("csstransformspreserve3d", function () {
    var prop = Modernizr.prefixed("transformStyle");
    var val = "preserve-3d";
    var computedStyle;
    if (!prop) {
        return false;
    }
    prop = prop.replace(/([A-Z])/g, function (str, m1) { return "-" + m1.toLowerCase(); }).replace(/^ms-/, "-ms-");
    Modernizr.testStyles("#modernizr{" + prop + ":" + val + "}", function (el, rule) {
        computedStyle = window.getComputedStyle ? getComputedStyle(el, null).getPropertyValue(prop) : "";
    });
    return (computedStyle === val);
});
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
var $event = $.event;
var $special;
var resizeTimeout;
$special = $event.special.debouncedresize = {
    setup: function () {
        $(this).on("resize", $special.handler);
    },
    teardown: function () {
        $(this).off("resize", $special.handler);
    },
    handler: function (event, execAsap) {
        // Save the context
        var context = this;
        var args = arguments;
        var dispatch = function () {
            // set correct event type
            event.type = "debouncedresize";
            // @ts-ignore
            $event.dispatch.apply(context, args);
        };
        if (resizeTimeout) {
            clearTimeout(resizeTimeout);
        }
        execAsap ?
            dispatch() :
            resizeTimeout = setTimeout(dispatch, $special.threshold);
    },
    threshold: 150
};
var BookBlock = /** @class */ (function () {
    function BookBlock(options, element) {
        this.options = options;
        this.$el = $(element);
        // orientation class
        this.$el.addClass("bb-" + this.options.orientation);
        // items
        this.$items = this.$el.children(".bb-item").hide();
        // total items
        this.itemsCount = this.$items.length;
        console.log("startpage is " + this.options.startPage);
        // current item´s index
        if ((this.options.startPage > 0) && (this.options.startPage <= this.itemsCount)) {
            this.current = (this.options.startPage - 1);
        }
        else {
            logError("startPage option is out of range");
            this.current = 0;
        }
        // previous item´s index
        this.previous = -1;
        // show first item
        this.$current = this.$items.eq(this.current).show();
        // get width of this.$el
        // this will be necessary to create the flipping layout
        this.elWidth = this.$el.width();
        var transEndEventNames = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd",
            msTransition: "MSTransitionEnd",
            transition: "transitionend",
        };
        this.transEndEventName = transEndEventNames[Modernizr.prefixed("transition")] + ".bookblock";
        // support css 3d transforms && css transitions && Modernizr.csstransformspreserve3d
        this.support = Modernizr.csstransitions && Modernizr.csstransforms3d && Modernizr.csstransformspreserve3d;
        // initialize/bind some events
        this._initEvents();
        // start slideshow
        if (this.options.autoplay) {
            this.options.circular = true;
            this._startSlideshow();
        }
    }
    BookBlock.prototype._initEvents = function () {
        var self = this;
        if (this.options.nextEl !== "") {
            $(this.options.nextEl).on("click.bookblock touchstart.bookblock", function () {
                console.log("next button clicked");
                self._action("next");
                return false;
            });
        }
        if (this.options.prevEl !== "") {
            $(this.options.prevEl).on("click.bookblock touchstart.bookblock", function () { self._action("prev"); return false; });
        }
        $window.on("debouncedresize", function () {
            // update width value
            self.elWidth = self.$el.width();
        });
        $(document).keydown(function (e) {
            var keyCode = e.keyCode || e.which;
            var arrow = {
                left: 37,
                up: 38,
                right: 39,
                down: 40
            };
            switch (keyCode) {
                case arrow.left:
                    self._action("prev");
                    break;
                case arrow.right:
                    self._action("next");
                    break;
            }
        });
    };
    BookBlock.prototype._action = function (dir, page) {
        this._stopSlideshow();
        this._navigate(dir, page);
    };
    BookBlock.prototype._navigate = function (dir, page) {
        if (this.isAnimating) {
            return false;
        }
        // callback trigger
        this.options.onBeforeFlip(this.current);
        this.isAnimating = true;
        // update current value
        this.$current = this.$items.eq(this.current);
        if (page !== undefined) {
            this.current = page;
        }
        else if (dir === "next" && this.options.direction === "ltr" || dir === "prev" && this.options.direction === "rtl") {
            if (!this.options.circular && this.current === this.itemsCount - 1) {
                this.end = true;
            }
            else {
                this.previous = this.current;
                this.current = this.current < this.itemsCount - 1 ? this.current + 1 : 0;
            }
        }
        else if (dir === "prev" && this.options.direction === "ltr" || dir === "next" && this.options.direction === "rtl") {
            if (!this.options.circular && this.current === 0) {
                this.end = true;
            }
            else {
                this.previous = this.current;
                this.current = this.current > 0 ? this.current - 1 : this.itemsCount - 1;
            }
        }
        this.$nextItem = !this.options.circular && this.end ? this.$current : this.$items.eq(this.current);
        if (!this.support) {
            this._layoutNoSupport(dir);
        }
        else {
            this._layout(dir);
        }
    };
    BookBlock.prototype._layoutNoSupport = function (dir) {
        this.$items.hide();
        this.$nextItem.show();
        this.end = false;
        this.isAnimating = false;
        var isLimit = dir === "next" && this.current === this.itemsCount - 1 || dir === "prev" && this.current === 0;
        // callback trigger
        this.options.onEndFlip(this.previous, this.current, isLimit);
    };
    // creates the necessary layout for the 3d structure
    BookBlock.prototype._layout = function (dir) {
        var self = this;
        // basic structure: 1 element for the left side.
        var $s_left = this._addSide("left", dir);
        // 1 element for the flipping/middle page
        var $s_middle = this._addSide("middle", dir);
        // 1 element for the right side
        var $s_right = this._addSide("right", dir);
        // overlays
        var $o_left = $s_left.find("div.bb-overlay");
        var $o_middle_f = $s_middle.find("div.bb-flipoverlay:first");
        var $o_middle_b = $s_middle.find("div.bb-flipoverlay:last");
        var $o_right = $s_right.find("div.bb-overlay");
        var speed = this.end ? 400 : this.options.speed;
        this.$items.hide();
        this.$el.prepend($s_left, $s_middle, $s_right);
        $s_middle.css({
            transitionDuration: speed + "ms",
            transitionTimingFunction: this.options.easing
        }).on(this.transEndEventName, function (event) {
            if ($(event.target).hasClass("bb-page")) {
                self.$el.children(".bb-page").remove();
                self.$nextItem.show();
                self.end = false;
                self.isAnimating = false;
                var isLimit = dir === "next" && self.current === self.itemsCount - 1 || dir === "prev" && self.current === 0;
                // callback trigger
                self.options.onEndFlip(self.previous, self.current, isLimit);
            }
        });
        if (dir === "prev") {
            $s_middle.addClass("bb-flip-initial");
        }
        // overlays
        if (this.options.shadows && !this.end) {
            var o_left_style = (dir === "next") ? {
                transition: "opacity " + this.options.speed / 2 + "ms " + "linear" + " " + this.options.speed / 2 + "ms"
            } : {
                transition: "opacity " + this.options.speed / 2 + "ms " + "linear",
                opacity: this.options.shadowSides
            };
            var o_middle_f_style = (dir === "next") ? {
                transition: "opacity " + this.options.speed / 2 + "ms " + "linear"
            } : {
                transition: "opacity " + this.options.speed / 2 + "ms " + "linear" + " " + this.options.speed / 2 + "ms",
                opacity: this.options.shadowFlip
            };
            var o_middle_b_style = (dir === "next") ? {
                transition: "opacity " + this.options.speed / 2 + "ms " + "linear" + " " + this.options.speed / 2 + "ms",
                opacity: this.options.shadowFlip
            } : {
                transition: "opacity " + this.options.speed / 2 + "ms " + "linear"
            };
            var o_right_style = (dir === "next") ? {
                transition: "opacity " + this.options.speed / 2 + "ms " + "linear",
                opacity: this.options.shadowSides
            } : {
                transition: "opacity " + this.options.speed / 2 + "ms " + "linear" + " " + this.options.speed / 2 + "ms"
            };
            $o_middle_f.css(o_middle_f_style);
            $o_middle_b.css(o_middle_b_style);
            $o_left.css(o_left_style);
            $o_right.css(o_right_style);
        }
        setTimeout(function () {
            // first && last pages lift slightly up when we can"t go further
            $s_middle.addClass(self.end ? "bb-flip-" + dir + "-end" : "bb-flip-" + dir);
            // overlays
            if (self.options.shadows && !self.end) {
                $o_middle_f.css({
                    opacity: dir === "next" ? self.options.shadowFlip : 0
                });
                $o_middle_b.css({
                    opacity: dir === "next" ? 0 : self.options.shadowFlip
                });
                $o_left.css({
                    opacity: dir === "next" ? self.options.shadowSides : 0
                });
                $o_right.css({
                    opacity: dir === "next" ? 0 : self.options.shadowSides
                });
            }
        }, 25);
    };
    // adds the necessary sides (bb-page) to the layout
    BookBlock.prototype._addSide = function (side, dir) {
        var $side;
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
                $side = $("<div class=\"bb-page\"><div class=\"bb-back\"><div class=\"bb-outer\"><div class=\"bb-content\"><div class=\"bb-inner\">" + (dir === "next" ? this.$current.html() : this.$nextItem.html()) + "</div></div><div class=\"bb-overlay\"></div></div></div></div>").css("z-index", 102);
                break;
            case "middle":
                /*
                  <div class="bb-page" style="z-index:103">
                  <div class="bb-front">
                  <div class="bb-outer">
                  <div class="bb-content">
                  <div class="bb-inner">
                  dir==="next" ? [content of current page] : [content of next page]
                  </div>
                  </div>
                  <div class="bb-flipoverlay"></div>
                  </div>
                  </div>
                  <div class="bb-back">
                  <div class="bb-outer">
                  <div class="bb-content">
                  <div class="bb-inner">
                  dir==="next" ? [content of next page] : [content of current page]
                  </div>
                  </div>
                  <div class="bb-flipoverlay"></div>
                  </div>
                  </div>
                  </div>
                */
                $side = $("<div class=\"bb-page\"><div class=\"bb-front\"><div class=\"bb-outer\"><div class=\"bb-content\"><div class=\"bb-inner\">"
                    + (dir === "next" ? this.$current.html() : this.$nextItem.html())
                    + "</div></div><div class=\"bb-flipoverlay\"></div></div></div><div class=\"bb-back\"><div class=\"bb-outer\"><div class=\"bb-content\" style=\"width:"
                    + this.elWidth
                    + "px\"><div class=\"bb-inner\">"
                    + (dir === "next" ? this.$nextItem.html() : this.$current.html())
                    + "</div></div><div class=\"bb-flipoverlay\"></div></div></div></div>").css("z-index", 103);
                break;
            case "right":
                /*
                  <div class="bb-page" style="z-index:101">
                  <div class="bb-front">
                  <div class="bb-outer">
                  <div class="bb-content">
                  <div class="bb-inner">
                  dir==="next" ? [content of next page] : [content of current page]
                  </div>
                  </div>
                  <div class="bb-overlay"></div>
                  </div>
                  </div>
                  </div>
                */
                $side = $("<div class=\"bb-page\"><div class=\"bb-front\"><div class=\"bb-outer\"><div class=\"bb-content\"><div class=\"bb-inner\">"
                    + (dir === "next" ? this.$nextItem.html() : this.$current.html())
                    + "</div></div><div class=\"bb-overlay\"></div></div></div></div>").css("z-index", 101);
                break;
        }
        return $side;
    };
    BookBlock.prototype._startSlideshow = function () {
        var self = this;
        this.slideshow = setTimeout(function () {
            self._navigate("next");
            if (self.options.autoplay) {
                self._startSlideshow();
            }
        }, this.options.interval);
    };
    BookBlock.prototype._stopSlideshow = function () {
        if (this.options.autoplay) {
            clearTimeout(this.slideshow);
            this.options.autoplay = false;
        }
    };
    // public method: flips next
    BookBlock.prototype.next = function () {
        this._action(this.options.direction === "ltr" ? "next" : "prev");
    };
    // public method: flips back
    BookBlock.prototype.prev = function () {
        this._action(this.options.direction === "ltr" ? "prev" : "next");
    };
    // public method: goes to a specific page
    BookBlock.prototype.jump = function (page) {
        page -= 1;
        if (page === this.current || page >= this.itemsCount || page < 0) {
            return false;
        }
        var dir;
        if (this.options.direction === "ltr") {
            dir = page > this.current ? "next" : "prev";
        }
        else {
            dir = page > this.current ? "prev" : "next";
        }
        this._action(dir, page);
    };
    // public method: goes to the last page
    BookBlock.prototype.last = function () {
        this.jump(this.itemsCount);
    };
    // public method: goes to the first page
    BookBlock.prototype.first = function () {
        this.jump(1);
    };
    // public method: check if isAnimating is true
    BookBlock.prototype.isActive = function () {
        return this.isAnimating;
    };
    // public method: dynamically adds new elements
    // call this method after inserting new "bb-item" elements inside the BookBlock
    BookBlock.prototype.update = function () {
        var $currentItem = this.$items.eq(this.current);
        this.$items = this.$el.children(".bb-item");
        this.itemsCount = this.$items.length;
        this.current = $currentItem.index();
    };
    BookBlock.prototype.destroy = function () {
        if (this.options.autoplay) {
            this._stopSlideshow();
        }
        this.$el.removeClass("bb-" + this.options.orientation);
        this.$items.show();
        if (this.options.nextEl !== "") {
            $(this.options.nextEl).off(".bookblock");
        }
        if (this.options.prevEl !== "") {
            $(this.options.prevEl).off(".bookblock");
        }
        $window.off("debouncedresize");
    };
    return BookBlock;
}());
var logError = function (message) {
    if (window.console) {
        window.console.error(message);
    }
};
// <3 https://github.com/georgwittberger/jquery-plugin-typescript-example
// <3 https://www.smashingmagazine.com/2011/10/essential-jquery-plugin-patterns/
$.fn.bookBlock = Object.assign(function (options) {
    var _this = this;
    // Here's a best practice for overriding 'defaults'
    // with specified options. Note how, rather than a
    // regular defaults object being passed as the second
    // parameter, we instead refer to $.fn.pluginName.options
    // explicitly, merging it with the options passed directly
    // to the plugin. This allows us to override options both
    // globally and on a per-call level.
    //   // Merge the global options with the options given as argument.
    options = tslib_1.__assign({}, $.fn.bookBlock.options, options);
    // Check if required options are missing.
    if (options.height == null || options.width == null) {
        console.error("BookBlock options are missing required parameter \"height\" and \"width\"", JSON.stringify(options));
        return this;
    }
    this.css({
        height: options.height,
        width: options.width,
    });
    this.each(function () {
        var instance = $.data(_this, "bookblock", new BookBlock(options, _this));
        instance._initEvents();
    });
    return this;
}, 
// Define the global default options.
{
    options: {
        // does nothing so _dummy
        _dummy: false,
        // page to start on
        startPage: 1,
        // vertical or horizontal flip
        orientation: "vertical",
        // ltr (left to right) or rtl (right to left)
        direction: "ltr",
        // speed for the flip transition in ms
        speed: 1000,
        // easing for the flip transition
        easing: "ease-in-out",
        // if set to true, both the flipping page and the sides will have an overlay to simulate shadows
        shadows: true,
        // opacity value for the "shadow" on both sides (when the flipping page is over it)
        // value : 0.1 - 1
        shadowSides: 0.2,
        // opacity value for the "shadow" on the flipping page (while it is flipping)
        // value : 0.1 - 1
        shadowFlip: 0.1,
        // if we should show the first item after reaching the end
        circular: false,
        // if we want to specify a selector that triggers the next() function. example: ´#bb-nav-next´
        nextEl: "#bb-nav-next",
        // if we want to specify a selector that triggers the prev() function
        prevEl: "#bb-nav-prev",
        // autoplay. If true it overwrites the circular option to true
        autoplay: false,
        // time (ms) between page switch, if autoplay is true
        interval: 3000,
        // callback after the flip transition
        // old is the index of the previous item
        // page is the current item´s index
        // isLimit is true if the current page is the last one (or the first one)
        onEndFlip: function (old, page, isLimit) { return false; },
        // callback before the flip transition
        // page is the current item´s index
        onBeforeFlip: function (page) { return false; },
        // bb-block width in pixels
        width: null,
        // bb-block height in pixels
        height: null,
    }
});

});
return ___scope___.entry = "index.js";
});
FuseBox.pkg("events", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module, __filename, __dirname){

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
if (FuseBox.isServer) {
    module.exports = global.require("events");
}
else {
    function EventEmitter() {
        this._events = this._events || {};
        this._maxListeners = this._maxListeners || undefined;
    }
    module.exports = EventEmitter;
    // Backwards-compat with node 0.10.x
    EventEmitter.EventEmitter = EventEmitter;
    EventEmitter.prototype._events = undefined;
    EventEmitter.prototype._maxListeners = undefined;
    // By default EventEmitters will print a warning if more than 10 listeners are
    // added to it. This is a useful default which helps finding memory leaks.
    EventEmitter.defaultMaxListeners = 10;
    // Obviously not all Emitters should be limited to 10. This function allows
    // that to be increased. Set to zero for unlimited.
    EventEmitter.prototype.setMaxListeners = function (n) {
        if (!isNumber(n) || n < 0 || isNaN(n))
            throw TypeError("n must be a positive number");
        this._maxListeners = n;
        return this;
    };
    EventEmitter.prototype.emit = function (type) {
        var er, handler, len, args, i, listeners;
        if (!this._events)
            this._events = {};
        // If there is no 'error' event listener then throw.
        if (type === "error") {
            if (!this._events.error || (isObject(this._events.error) && !this._events.error.length)) {
                er = arguments[1];
                if (er instanceof Error) {
                    throw er; // Unhandled 'error' event
                }
                throw TypeError('Uncaught, unspecified "error" event.');
            }
        }
        handler = this._events[type];
        if (isUndefined(handler))
            return false;
        if (isFunction(handler)) {
            switch (arguments.length) {
                // fast cases
                case 1:
                    handler.call(this);
                    break;
                case 2:
                    handler.call(this, arguments[1]);
                    break;
                case 3:
                    handler.call(this, arguments[1], arguments[2]);
                    break;
                // slower
                default:
                    args = Array.prototype.slice.call(arguments, 1);
                    handler.apply(this, args);
            }
        }
        else if (isObject(handler)) {
            args = Array.prototype.slice.call(arguments, 1);
            listeners = handler.slice();
            len = listeners.length;
            for (i = 0; i < len; i++)
                listeners[i].apply(this, args);
        }
        return true;
    };
    EventEmitter.prototype.addListener = function (type, listener) {
        var m;
        if (!isFunction(listener))
            throw TypeError("listener must be a function");
        if (!this._events)
            this._events = {};
        // To avoid recursion in the case that type === "newListener"! Before
        // adding it to the listeners, first emit "newListener".
        if (this._events.newListener)
            this.emit("newListener", type, isFunction(listener.listener) ? listener.listener : listener);
        if (!this._events[type])
            // Optimize the case of one listener. Don't need the extra array object.
            this._events[type] = listener;
        else if (isObject(this._events[type]))
            // If we've already got an array, just append.
            this._events[type].push(listener);
        // Adding the second element, need to change to array.
        else
            this._events[type] = [this._events[type], listener];
        // Check for listener leak
        if (isObject(this._events[type]) && !this._events[type].warned) {
            if (!isUndefined(this._maxListeners)) {
                m = this._maxListeners;
            }
            else {
                m = EventEmitter.defaultMaxListeners;
            }
            if (m && m > 0 && this._events[type].length > m) {
                this._events[type].warned = true;
                console.error("(node) warning: possible EventEmitter memory " + "leak detected. %d listeners added. " + "Use emitter.setMaxListeners() to increase limit.", this._events[type].length);
                if (typeof console.trace === "function") {
                    // not supported in IE 10
                    console.trace();
                }
            }
        }
        return this;
    };
    EventEmitter.prototype.on = EventEmitter.prototype.addListener;
    EventEmitter.prototype.once = function (type, listener) {
        if (!isFunction(listener))
            throw TypeError("listener must be a function");
        var fired = false;
        function g() {
            this.removeListener(type, g);
            if (!fired) {
                fired = true;
                listener.apply(this, arguments);
            }
        }
        g.listener = listener;
        this.on(type, g);
        return this;
    };
    // emits a 'removeListener' event iff the listener was removed
    EventEmitter.prototype.removeListener = function (type, listener) {
        var list, position, length, i;
        if (!isFunction(listener))
            throw TypeError("listener must be a function");
        if (!this._events || !this._events[type])
            return this;
        list = this._events[type];
        length = list.length;
        position = -1;
        if (list === listener || (isFunction(list.listener) && list.listener === listener)) {
            delete this._events[type];
            if (this._events.removeListener)
                this.emit("removeListener", type, listener);
        }
        else if (isObject(list)) {
            for (i = length; i-- > 0;) {
                if (list[i] === listener || (list[i].listener && list[i].listener === listener)) {
                    position = i;
                    break;
                }
            }
            if (position < 0)
                return this;
            if (list.length === 1) {
                list.length = 0;
                delete this._events[type];
            }
            else {
                list.splice(position, 1);
            }
            if (this._events.removeListener)
                this.emit("removeListener", type, listener);
        }
        return this;
    };
    EventEmitter.prototype.removeAllListeners = function (type) {
        var key, listeners;
        if (!this._events)
            return this;
        // not listening for removeListener, no need to emit
        if (!this._events.removeListener) {
            if (arguments.length === 0)
                this._events = {};
            else if (this._events[type])
                delete this._events[type];
            return this;
        }
        // emit removeListener for all listeners on all events
        if (arguments.length === 0) {
            for (key in this._events) {
                if (key === "removeListener")
                    continue;
                this.removeAllListeners(key);
            }
            this.removeAllListeners("removeListener");
            this._events = {};
            return this;
        }
        listeners = this._events[type];
        if (isFunction(listeners)) {
            this.removeListener(type, listeners);
        }
        else if (listeners) {
            // LIFO order
            while (listeners.length)
                this.removeListener(type, listeners[listeners.length - 1]);
        }
        delete this._events[type];
        return this;
    };
    EventEmitter.prototype.listeners = function (type) {
        var ret;
        if (!this._events || !this._events[type])
            ret = [];
        else if (isFunction(this._events[type]))
            ret = [this._events[type]];
        else
            ret = this._events[type].slice();
        return ret;
    };
    EventEmitter.prototype.listenerCount = function (type) {
        if (this._events) {
            var evlistener = this._events[type];
            if (isFunction(evlistener))
                return 1;
            else if (evlistener)
                return evlistener.length;
        }
        return 0;
    };
    EventEmitter.listenerCount = function (emitter, type) {
        return emitter.listenerCount(type);
    };
    function isFunction(arg) {
        return typeof arg === "function";
    }
    function isNumber(arg) {
        return typeof arg === "number";
    }
    function isObject(arg) {
        return typeof arg === "object" && arg !== null;
    }
    function isUndefined(arg) {
        return arg === void 0;
    }
}

});
return ___scope___.entry = "index.js";
});
FuseBox.pkg("fuse-box-css", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module, __filename, __dirname){

/**
 * Listens to 'async' requets and if the name is a css file
 * wires it to `__fsbx_css`
 */
var runningInBrowser = FuseBox.isBrowser || FuseBox.target === "electron";
var cssHandler = function (__filename, contents) {
    if (runningInBrowser) {
        var styleId = __filename.replace(/[\.\/]+/g, "-");
        if (styleId.charAt(0) === "-")
            styleId = styleId.substring(1);
        var exists = document.getElementById(styleId);
        if (!exists) {
            //<link href="//fonts.googleapis.com/css?family=Covered+By+Your+Grace" rel="stylesheet" type="text/css">
            var s = document.createElement(contents ? "style" : "link");
            s.id = styleId;
            s.type = "text/css";
            if (contents) {
                s.innerHTML = contents;
            }
            else {
                s.rel = "stylesheet";
                s.href = __filename;
            }
            document.getElementsByTagName("head")[0].appendChild(s);
        }
        else {
            if (contents) {
                exists.innerHTML = contents;
            }
        }
    }
};
if (typeof FuseBox !== "undefined" && runningInBrowser) {
    FuseBox.on("async", function (name) {
        if (/\.css$/.test(name)) {
            cssHandler(name);
            return false;
        }
    });
}
module.exports = cssHandler;

});
return ___scope___.entry = "index.js";
});
FuseBox.pkg("fusebox-hot-reload", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module, __filename, __dirname){

"use strict";
/**
 * @module listens to `source-changed` socket events and actions hot reload
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Client = require("fusebox-websocket").SocketClient, bundleErrors = {}, outputElement = document.createElement("div"), styleElement = document.createElement("style"), minimizeToggleId = "fuse-box-toggle-minimized", hideButtonId = "fuse-box-hide", expandedOutputClass = "fuse-box-expanded-output", localStoragePrefix = "__fuse-box_";
function storeSetting(key, value) {
    localStorage[localStoragePrefix + key] = value;
}
function getSetting(key) {
    return localStorage[localStoragePrefix + key] === "true" ? true : false;
}
var outputInBody = false, outputMinimized = getSetting(minimizeToggleId), outputHidden = false;
outputElement.id = "fuse-box-output";
styleElement.innerHTML = "\n    #" + outputElement.id + ", #" + outputElement.id + " * {\n        box-sizing: border-box;\n    }\n    #" + outputElement.id + " {\n        z-index: 999999999999;\n        position: fixed;\n        top: 10px;\n        right: 10px;\n        width: 400px;\n        overflow: auto;\n        background: #fdf3f1;\n        border: 1px solid #eca494;\n        border-radius: 5px;\n        font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n        box-shadow: 0px 3px 6px 1px rgba(0,0,0,.15);\n    }\n    #" + outputElement.id + "." + expandedOutputClass + " {\n        height: auto;\n        width: auto;\n        left: 10px;\n        max-height: calc(100vh - 50px);\n    }\n    #" + outputElement.id + " .fuse-box-errors {\n        display: none;\n    }\n    #" + outputElement.id + "." + expandedOutputClass + " .fuse-box-errors {\n        display: block;\n        border-top: 1px solid #eca494;\n        padding: 0 10px;\n    }\n    #" + outputElement.id + " button {\n        border: 1px solid #eca494;\n        padding: 5px 10px;\n        border-radius: 4px;\n        margin-left: 5px;\n        background-color: white;\n        color: black;\n        box-shadow: 0px 2px 2px 0px rgba(0,0,0,.05);\n    }\n    #" + outputElement.id + " .fuse-box-header {\n        padding: 10px;\n    }\n    #" + outputElement.id + " .fuse-box-header h4 {\n        display: inline-block;\n        margin: 4px;\n    }";
styleElement.type = "text/css";
document.getElementsByTagName("head")[0].appendChild(styleElement);
function displayBundleErrors() {
    var errorMessages = Object.keys(bundleErrors).reduce(function (allMessages, bundleName) {
        var bundleMessages = bundleErrors[bundleName];
        return allMessages.concat(bundleMessages.map(function (message) {
            var messageOutput = message
                .replace(/\n/g, "<br>")
                .replace(/\t/g, "&nbsp;&nbps;&npbs;&nbps;")
                .replace(/ /g, "&nbsp;");
            return "<pre>" + messageOutput + "</pre>";
        }));
    }, []), errorOutput = errorMessages.join("");
    if (errorOutput && !outputHidden) {
        outputElement.innerHTML = "\n        <div class=\"fuse-box-header\" style=\"\">\n            <h4 style=\"\">Fuse Box Bundle Errors (" + errorMessages.length + "):</h4>\n            <div style=\"float: right;\">\n                <button id=\"" + minimizeToggleId + "\">" + (outputMinimized ? "Expand" : "Minimize") + "</button>\n                <button id=\"" + hideButtonId + "\">Hide</button>\n            </div>\n        </div>\n        <div class=\"fuse-box-errors\">\n            " + errorOutput + "\n        </div>\n        ";
        document.body.appendChild(outputElement);
        outputElement.className = outputMinimized ? "" : expandedOutputClass;
        outputInBody = true;
        document.getElementById(minimizeToggleId).onclick = function () {
            outputMinimized = !outputMinimized;
            storeSetting(minimizeToggleId, outputMinimized);
            displayBundleErrors();
        };
        document.getElementById(hideButtonId).onclick = function () {
            outputHidden = true;
            displayBundleErrors();
        };
    }
    else if (outputInBody) {
        document.body.removeChild(outputElement);
        outputInBody = false;
    }
}
exports.connect = function (port, uri, reloadFullPage) {
    if (FuseBox.isServer) {
        return;
    }
    port = port || window.location.port;
    var client = new Client({
        port: port,
        uri: uri
    });
    client.connect();
    client.on("page-reload", function (data) {
        return window.location.reload();
    });
    client.on("page-hmr", function (data) {
        FuseBox.flush();
        FuseBox.dynamic(data.path, data.content);
        if (FuseBox.mainFile) {
            try {
                FuseBox.import(FuseBox.mainFile);
            }
            catch (e) {
                if (typeof e === "string") {
                    if (/not found/.test(e)) {
                        return window.location.reload();
                    }
                }
                console.error(e);
            }
        }
    });
    client.on("source-changed", function (data) {
        console.info("%cupdate \"" + data.path + "\"", "color: #237abe");
        if (reloadFullPage) {
            return window.location.reload();
        }
        /**
         * If a plugin handles this request then we don't have to do anything
         **/
        for (var index = 0; index < FuseBox.plugins.length; index++) {
            var plugin = FuseBox.plugins[index];
            if (plugin.hmrUpdate && plugin.hmrUpdate(data)) {
                return;
            }
        }
        if (data.type === "hosted-css") {
            var fileId = data.path.replace(/^\//, "").replace(/[\.\/]+/g, "-");
            var existing = document.getElementById(fileId);
            if (existing) {
                existing.setAttribute("href", data.path + "?" + new Date().getTime());
            }
            else {
                var node = document.createElement("link");
                node.id = fileId;
                node.type = "text/css";
                node.rel = "stylesheet";
                node.href = data.path;
                document.getElementsByTagName("head")[0].appendChild(node);
            }
        }
        if (data.type === "js" || data.type === "css") {
            FuseBox.flush();
            FuseBox.dynamic(data.path, data.content);
            if (FuseBox.mainFile) {
                try {
                    FuseBox.import(FuseBox.mainFile);
                }
                catch (e) {
                    if (typeof e === "string") {
                        if (/not found/.test(e)) {
                            return window.location.reload();
                        }
                    }
                    console.error(e);
                }
            }
        }
    });
    client.on("error", function (error) {
        console.log(error);
    });
    client.on("bundle-error", function (_a) {
        var bundleName = _a.bundleName, message = _a.message;
        console.error("Bundle error in " + bundleName + ": " + message);
        var errorsForBundle = bundleErrors[bundleName] || [];
        errorsForBundle.push(message);
        bundleErrors[bundleName] = errorsForBundle;
        displayBundleErrors();
    });
    client.on("update-bundle-errors", function (_a) {
        var bundleName = _a.bundleName, messages = _a.messages;
        messages.forEach(function (message) { return console.error("Bundle error in " + bundleName + ": " + message); });
        bundleErrors[bundleName] = messages;
        displayBundleErrors();
    });
};

});
return ___scope___.entry = "index.js";
});
FuseBox.pkg("fusebox-websocket", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var events = require("events");
var SocketClient = /** @class */ (function () {
    function SocketClient(opts) {
        opts = opts || {};
        var port = opts.port || window.location.port;
        var protocol = location.protocol === "https:" ? "wss://" : "ws://";
        var domain = location.hostname || "localhost";
        this.url = opts.host || "" + protocol + domain + ":" + port;
        if (opts.uri) {
            this.url = opts.uri;
        }
        this.authSent = false;
        this.emitter = new events.EventEmitter();
    }
    SocketClient.prototype.reconnect = function (fn) {
        var _this = this;
        setTimeout(function () {
            _this.emitter.emit("reconnect", { message: "Trying to reconnect" });
            _this.connect(fn);
        }, 5000);
    };
    SocketClient.prototype.on = function (event, fn) {
        this.emitter.on(event, fn);
    };
    SocketClient.prototype.connect = function (fn) {
        var _this = this;
        console.log("%cConnecting to fusebox HMR at " + this.url, "color: #237abe");
        setTimeout(function () {
            _this.client = new WebSocket(_this.url);
            _this.bindEvents(fn);
        }, 0);
    };
    SocketClient.prototype.close = function () {
        this.client.close();
    };
    SocketClient.prototype.send = function (eventName, data) {
        if (this.client.readyState === 1) {
            this.client.send(JSON.stringify({ event: eventName, data: data || {} }));
        }
    };
    SocketClient.prototype.error = function (data) {
        this.emitter.emit("error", data);
    };
    /** Wires up the socket client messages to be emitted on our event emitter */
    SocketClient.prototype.bindEvents = function (fn) {
        var _this = this;
        this.client.onopen = function (event) {
            console.log("%cConnected", "color: #237abe");
            if (fn) {
                fn(_this);
            }
        };
        this.client.onerror = function (event) {
            _this.error({ reason: event.reason, message: "Socket error" });
        };
        this.client.onclose = function (event) {
            _this.emitter.emit("close", { message: "Socket closed" });
            if (event.code !== 1011) {
                _this.reconnect(fn);
            }
        };
        this.client.onmessage = function (event) {
            var data = event.data;
            if (data) {
                var item = JSON.parse(data);
                _this.emitter.emit(item.type, item.data);
                _this.emitter.emit("*", item);
            }
        };
    };
    return SocketClient;
}());
exports.SocketClient = SocketClient;

});
return ___scope___.entry = "index.js";
});
FuseBox.pkg("tslib", {}, function(___scope___){
___scope___.file("tslib.js", function(exports, require, module, __filename, __dirname){

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global global, define, System, Reflect, Promise */
var __extends;
var __assign;
var __rest;
var __decorate;
var __param;
var __metadata;
var __awaiter;
var __generator;
var __exportStar;
var __values;
var __read;
var __spread;
var __spreadArrays;
var __await;
var __asyncGenerator;
var __asyncDelegator;
var __asyncValues;
var __makeTemplateObject;
var __importStar;
var __importDefault;
(function (factory) {
    var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
    if (typeof define === "function" && define.amd) {
        define("tslib", ["exports"], function (exports) { factory(createExporter(root, createExporter(exports))); });
    }
    else if (typeof module === "object" && typeof module.exports === "object") {
        factory(createExporter(root, createExporter(module.exports)));
    }
    else {
        factory(createExporter(root));
    }
    function createExporter(exports, previous) {
        if (exports !== root) {
            if (typeof Object.create === "function") {
                Object.defineProperty(exports, "__esModule", { value: true });
            }
            else {
                exports.__esModule = true;
            }
        }
        return function (id, v) { return exports[id] = previous ? previous(id, v) : v; };
    }
})(function (exporter) {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b)
            if (b.hasOwnProperty(p))
                d[p] = b[p]; };
    __extends = function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    __rest = function (s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    };
    __decorate = function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    __param = function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    };
    __metadata = function (metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    };
    __awaiter = function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    __generator = function (thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    __exportStar = function (m, exports) {
        for (var p in m)
            if (!exports.hasOwnProperty(p))
                exports[p] = m[p];
    };
    __values = function (o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m)
            return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length)
                    o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    };
    __read = function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    };
    __spread = function () {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    };
    __spreadArrays = function () {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };
    __await = function (v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    };
    __asyncGenerator = function (thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    };
    __asyncDelegator = function (o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    };
    __asyncValues = function (o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    };
    __makeTemplateObject = function (cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    };
    __importStar = function (mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (Object.hasOwnProperty.call(mod, k))
                    result[k] = mod[k];
        result["default"] = mod;
        return result;
    };
    __importDefault = function (mod) {
        return (mod && mod.__esModule) ? mod : { "default": mod };
    };
    exporter("__extends", __extends);
    exporter("__assign", __assign);
    exporter("__rest", __rest);
    exporter("__decorate", __decorate);
    exporter("__param", __param);
    exporter("__metadata", __metadata);
    exporter("__awaiter", __awaiter);
    exporter("__generator", __generator);
    exporter("__exportStar", __exportStar);
    exporter("__values", __values);
    exporter("__read", __read);
    exporter("__spread", __spread);
    exporter("__spreadArrays", __spreadArrays);
    exporter("__await", __await);
    exporter("__asyncGenerator", __asyncGenerator);
    exporter("__asyncDelegator", __asyncDelegator);
    exporter("__asyncValues", __asyncValues);
    exporter("__makeTemplateObject", __makeTemplateObject);
    exporter("__importStar", __importStar);
    exporter("__importDefault", __importDefault);
});

});
return ___scope___.entry = "tslib.js";
});
FuseBox.import("fusebox-hot-reload").connect(4444, "", false)
FuseBox.expose([{"alias":"*","pkg":"default/index.js"}]);
FuseBox.main("default/index.js");
})
(function(e){function r(e){var r=e.charCodeAt(0),n=e.charCodeAt(1);if((m||58!==n)&&(r>=97&&r<=122||64===r)){if(64===r){var t=e.split("/"),i=t.splice(2,t.length).join("/");return[t[0]+"/"+t[1],i||void 0]}var o=e.indexOf("/");if(o===-1)return[e];var a=e.substring(0,o),f=e.substring(o+1);return[a,f]}}function n(e){return e.substring(0,e.lastIndexOf("/"))||"./"}function t(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];for(var n=[],t=0,i=arguments.length;t<i;t++)n=n.concat(arguments[t].split("/"));for(var o=[],t=0,i=n.length;t<i;t++){var a=n[t];a&&"."!==a&&(".."===a?o.pop():o.push(a))}return""===n[0]&&o.unshift(""),o.join("/")||(o.length?"/":".")}function i(e){var r=e.match(/\.(\w{1,})$/);return r&&r[1]?e:e+".js"}function o(e){if(m){var r,n=document,t=n.getElementsByTagName("head")[0];/\.css$/.test(e)?(r=n.createElement("link"),r.rel="stylesheet",r.type="text/css",r.href=e):(r=n.createElement("script"),r.type="text/javascript",r.src=e,r.async=!0),t.insertBefore(r,t.firstChild)}}function a(e,r){for(var n in e)e.hasOwnProperty(n)&&r(n,e[n])}function f(e){return{server:require(e)}}function u(e,n){var o=n.path||"./",a=n.pkg||"default",u=r(e);if(u&&(o="./",a=u[0],n.v&&n.v[a]&&(a=a+"@"+n.v[a]),e=u[1]),e)if(126===e.charCodeAt(0))e=e.slice(2,e.length),o="./";else if(!m&&(47===e.charCodeAt(0)||58===e.charCodeAt(1)))return f(e);var s=x[a];if(!s){if(m&&"electron"!==_.target)throw"Package not found "+a;return f(a+(e?"/"+e:""))}e=e?e:"./"+s.s.entry;var l,d=t(o,e),c=i(d),p=s.f[c];return!p&&c.indexOf("*")>-1&&(l=c),p||l||(c=t(d,"/","index.js"),p=s.f[c],p||"."!==d||(c=s.s&&s.s.entry||"index.js",p=s.f[c]),p||(c=d+".js",p=s.f[c]),p||(p=s.f[d+".jsx"]),p||(c=d+"/index.jsx",p=s.f[c])),{file:p,wildcard:l,pkgName:a,versions:s.v,filePath:d,validPath:c}}function s(e,r,n){if(void 0===n&&(n={}),!m)return r(/\.(js|json)$/.test(e)?h.require(e):"");if(n&&n.ajaxed===e)return console.error(e,"does not provide a module");var i=new XMLHttpRequest;i.onreadystatechange=function(){if(4==i.readyState)if(200==i.status){var n=i.getResponseHeader("Content-Type"),o=i.responseText;/json/.test(n)?o="module.exports = "+o:/javascript/.test(n)||(o="module.exports = "+JSON.stringify(o));var a=t("./",e);_.dynamic(a,o),r(_.import(e,{ajaxed:e}))}else console.error(e,"not found on request"),r(void 0)},i.open("GET",e,!0),i.send()}function l(e,r){var n=y[e];if(n)for(var t in n){var i=n[t].apply(null,r);if(i===!1)return!1}}function d(e){if(null!==e&&["function","object","array"].indexOf(typeof e)!==-1&&!e.hasOwnProperty("default"))return Object.isFrozen(e)?void(e.default=e):void Object.defineProperty(e,"default",{value:e,writable:!0,enumerable:!1})}function c(e,r){if(void 0===r&&(r={}),58===e.charCodeAt(4)||58===e.charCodeAt(5))return o(e);var t=u(e,r);if(t.server)return t.server;var i=t.file;if(t.wildcard){var a=new RegExp(t.wildcard.replace(/\*/g,"@").replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&").replace(/@@/g,".*").replace(/@/g,"[a-z0-9$_-]+"),"i"),f=x[t.pkgName];if(f){var p={};for(var v in f.f)a.test(v)&&(p[v]=c(t.pkgName+"/"+v));return p}}if(!i){var g="function"==typeof r,y=l("async",[e,r]);if(y===!1)return;return s(e,function(e){return g?r(e):null},r)}var w=t.pkgName;if(i.locals&&i.locals.module)return i.locals.module.exports;var b=i.locals={},j=n(t.validPath);b.exports={},b.module={exports:b.exports},b.require=function(e,r){var n=c(e,{pkg:w,path:j,v:t.versions});return _.sdep&&d(n),n},m||!h.require.main?b.require.main={filename:"./",paths:[]}:b.require.main=h.require.main;var k=[b.module.exports,b.require,b.module,t.validPath,j,w];return l("before-import",k),i.fn.apply(k[0],k),l("after-import",k),b.module.exports}if(e.FuseBox)return e.FuseBox;var p="undefined"!=typeof ServiceWorkerGlobalScope,v="undefined"!=typeof WorkerGlobalScope,m="undefined"!=typeof window&&"undefined"!=typeof window.navigator||v||p,h=m?v||p?{}:window:global;m&&(h.global=v||p?{}:window),e=m&&"undefined"==typeof __fbx__dnm__?e:module.exports;var g=m?v||p?{}:window.__fsbx__=window.__fsbx__||{}:h.$fsbx=h.$fsbx||{};m||(h.require=require);var x=g.p=g.p||{},y=g.e=g.e||{},_=function(){function r(){}return r.global=function(e,r){return void 0===r?h[e]:void(h[e]=r)},r.import=function(e,r){return c(e,r)},r.on=function(e,r){y[e]=y[e]||[],y[e].push(r)},r.exists=function(e){try{var r=u(e,{});return void 0!==r.file}catch(e){return!1}},r.remove=function(e){var r=u(e,{}),n=x[r.pkgName];n&&n.f[r.validPath]&&delete n.f[r.validPath]},r.main=function(e){return this.mainFile=e,r.import(e,{})},r.expose=function(r){var n=function(n){var t=r[n].alias,i=c(r[n].pkg);"*"===t?a(i,function(r,n){return e[r]=n}):"object"==typeof t?a(t,function(r,n){return e[n]=i[r]}):e[t]=i};for(var t in r)n(t)},r.dynamic=function(r,n,t){this.pkg(t&&t.pkg||"default",{},function(t){t.file(r,function(r,t,i,o,a){var f=new Function("__fbx__dnm__","exports","require","module","__filename","__dirname","__root__",n);f(!0,r,t,i,o,a,e)})})},r.flush=function(e){var r=x.default;for(var n in r.f)e&&!e(n)||delete r.f[n].locals},r.pkg=function(e,r,n){if(x[e])return n(x[e].s);var t=x[e]={};return t.f={},t.v=r,t.s={file:function(e,r){return t.f[e]={fn:r}}},n(t.s)},r.addPlugin=function(e){this.plugins.push(e)},r.packages=x,r.isBrowser=m,r.isServer=!m,r.plugins=[],r}();return m||(h.FuseBox=_),e.FuseBox=_}(this))