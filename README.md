Fork Notice
==========

Aiming to turn codrops awesome work into an easy to use package! Really, their work never ceases to amaze me. Check them out here: https://tympanus.net/codrops/

BookBlock
=========

A jQuery plugin that will create a booklet-like component that let's you navigate through its items by flipping the pages.

[article on Codrops](http://tympanus.net/codrops/2012/09/03/bookblock-a-content-flip-plugin/)

[original demo](http://tympanus.net/Development/BookBlock/)

Stay tuned for new demo ...

While I've made some improvements, they're not at the same quality level.
* Images will now load "on demand". So, you're book could be a thousand images and you'll no longer have to worry about being able to load them all at once.
* History API now has basic support.
* Images and container will resize on window resize.



License: http://tympanus.net/codrops/licensing/


Usage
=====

### Testing

``` shell
git clone https://github.com/paxperscientiam/BookBlock
cd BookBlock
pnpm i && pnpm run start
```

With the above, `fuse-box` should start a server.


### Javascript project
If you're not concerned with conflicts, then you could simply use prebuilt files `dist/*-bookblock.js` and `dist/*-shims.js` (which contains the aforementioned dependencies).

Alternatively, you could use `dist/*-bookblock.js`, `src/js/jquerypp.custom.js`, `src/js/modernizr.custom.js`, and include your own copy of `jquery`.

### Typescript project
It'll depend on your build tool somewhat, but here is what I do with `FuseBox`

``` typescript
import "@paxperscientiam/bookblock"
```

Again, you can either use the prebuild `*-shims.js`, or import `jquerypp.custom.js` and `modernizr.custom.js`.


### BookBlock Configuration Options

```typescript
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

    // if we want to specify a selector that triggers the next() function. example: ´#bb-nav-next´
    nextEl?: string // "#bb-nav-next"

    // vertical or horizontal flip
    orientation?: string

    // if we want to specify a selector that triggers the prev() function
    prevEl?: string // "#bb-nav-prev"

    shadowFlip?: number

    // opacity value for the "shadow" on both sides (when the flipping page is over it)
    // value : 0.1 - 1
    shadowSides?: number

    // if set to true, both the flipping page and the sides will have an overlay to simulate shadow
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
    onEndFlip?: (a, b, c: boolean) => boolean

    // callback before the flip transition
    // page is the current item´s index
    onBeforeFlip?: (a) => boolean
}
```

Usage examples
===

### Example (see example for more info)

``` html
<div>
		<h3>Illustrations by <a href="http://dribbble.com/kevinhowdeshell">Kevin Howdeshell</a></h3>
		<div id="bb-bookblock" class="bb-bookblock">
				<div class="bb-item">
						<a href="#"><img src="images/demo1/1.jpg" alt="image01"/></a>
				</div>
				<div class="bb-item">
						<a href="#"><img src="images/demo1/2.jpg" alt="image02"/></a>
				</div>
		</div>
		<nav class="bb-nav-container">
				<a id="bb-nav-first" href="#" class="bb-nav bb-icon bb-icon-first">
            First page</a>
				<a id="bb-nav-prev" href="#" class="bb-nav bb-icon bb-icon-arrow-left">Previous</a>
				<a id="bb-nav-next" href="#" class="bb-nav bb-icon bb-icon-arrow-right">Next</a>
				<a id="bb-nav-last" href="#" class="bb-nav bb-icon bb-icon-last">Last page</a>
		</nav>
</div>
<script>
  $(function () {
      const bookBlockOptions = {
          circular: true
          // etc
      }
      const sexy = $( "#bb-bookblock" ).bookBlock(bookBlockOptions)
  });
</script>
```

Notes
=====

## Newest feature is support for History API [0.2.0]

Plugin now accepts the boolean option `history` (default value is `false`). Enabling this will add a queryField to the current URI and allow you to bookmark any page of your BookBlock book.


## Breaking change in build process [0.1.0]

OK, so now the dist folder filenames are hashed. Please adjust your build process accordingly.

## Note

The production file `dist/*-bookblock.js` is the `BookBlock` code. The demo uses the file `dist/*-shims.js`, which includes the necessary dependencies: `src/modernizr.custom.js`, `src/jquerypp.custom.js`, and `jquery`.
