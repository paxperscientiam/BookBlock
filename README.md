Fork Notice
==========

Aiming to turn codrops awesome work into an easy to use package!

## Breaking change in build process [0.1.0]

OK, so now the dist folder filenames are hashed. Please adjust your build process accordingly.

## Note

The production file `dist/*-bookblock.js` is the `BookBlock` code. The demo uses the file `dist/*-shims.js`, which includes the necessary dependencies: `src/modernizr.custom.js`, `src/jquerypp.custom.js`, and `jquery`.

## Usage

### Javascript project
If you're not concerned with conflicts, then you could simply use prebuilt files `dist/*-bookblock.js` and `dist/*-shims.js` (which contains the aforementioned dependencies).

Alternatively, you could use `dist/*-bookblock.js`, `src/js/jquerypp.custom.js`, `src/js/modernizr.custom.js`, and include your own copy of `jquery`.

### Typescript project
It'll depend on your build tool somewhat, but here is what I do with `FuseBox`

``` typescript
import "@paxperscientiam/bookblock"
```

Again, you can either use the prebuild `*-shims.js` or import `jquerypp.custom.js` and `modernizr.custom.js`.

## Testing 1 2 3

``` shell
git clone https://github.com/paxperscientiam/BookBlock
cd BookBlock
pnpm i && pnpm run start
```

With the above, `fuse-box` should start a server.


BookBlock
=========

A jQuery plugin that will create a booklet-like component that let's you navigate through its items by flipping the pages.

[article on Codrops](http://tympanus.net/codrops/2012/09/03/bookblock-a-content-flip-plugin/)

[demo](http://tympanus.net/Development/BookBlock/)

License: http://tympanus.net/codrops/licensing/

### BookBlock Configuration Options

```js
// page to start on
startPage : 1,
// vertical or horizontal flip
orientation : 'vertical',
// ltr (left to right) or rtl (right to left)
direction : 'ltr',
// speed for the flip transition in ms
speed : 1000,
// easing for the flip transition
easing : 'ease-in-out',
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
nextEl : '',
// if we want to specify a selector that triggers the prev() function
prevEl : '',
// autoplay. If true it overwrites the circular option to true
autoplay : false,
// time (ms) between page switch, if autoplay is true
interval : 3000,
// callback after the flip transition
// old is the index of the previous item
// page is the current item´s index
// isLimit is true if the current page is the last one (or the first one)
onEndFlip : function(old, page, isLimit) { return false; },
// callback before the flip transition
// page is the current item´s index
onBeforeFlip : function(page) { return false; }
```

Usage
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
      const sexy = $( "#bb-bookblock" ).bookBlock({
          _dummy: true,
          circular: true,
          height: "300px",
          width: "400px",
      })
  });
</script>
```
