!function(){if(!window.$fsx){var t=window.$fsx={};t.f={},t.m={},t.r=function(e){var n=t.m[e];if(n)return n.m.exports;var i=t.f[e];return i?((n=t.m[e]={}).exports={},n.m={exports:n.exports},i.call(n.exports,n.m,n.exports),n.m.exports):void 0}}}(),function(t){t.f[0]=function(e,n){Object.defineProperty(n,"__esModule",{value:!0}),t.r(1),t.r(2),t.r(3),t.r(4)},t.f[4]=function(){var e=t.r(8),n=$(window),i=function(t,e){return(t%e+e)%e};Modernizr.addTest("csstransformspreserve3d",function(){var t,e=Modernizr.prefixed("transformStyle"),n="preserve-3d";return!!e&&(e=e.replace(/([A-Z])/g,function(t,e){return"-"+e.toLowerCase()}).replace(/^ms-/,"-ms-"),Modernizr.testStyles("#modernizr{"+e+":"+n+"}",function(n,i){t=window.getComputedStyle?getComputedStyle(n,null).getPropertyValue(e):""}),t===n)});var o=function(){function t(t,e){this.options=t,this.$el=$(e),this.$el.addClass("bb-"+this.options.orientation),this.$items=this.$el.children(".bb-item").hide(),this.itemsCount=this.$items.length,null!=$("#bb-bookblock").data().bbsrcset&&(this.itemsCount=$("#bb-bookblock").data().bbsrcset.length),this.options.startPage>0&&this.options.startPage<=this.itemsCount?this.current=this.options.startPage-1:(r("startPage option is out of range"),this.current=0),this.previous=-1,this.$current=this.$items.eq(this.current).show(),this.elWidth=this.$el.width();this.transEndEventName={MozTransition:"transitionend",OTransition:"oTransitionEnd",WebkitTransition:"webkitTransitionEnd",msTransition:"MSTransitionEnd",transition:"transitionend"}[Modernizr.prefixed("transition")]+".bookblock",this.support=Modernizr.csstransitions&&Modernizr.csstransforms3d&&Modernizr.csstransformspreserve3d,this._initEvents(),this.options.autoplay&&(this.options.circular=!0,this._startSlideshow())}return t.prototype._initEvents=function(){this._getQueryField("page");var t=this,e=t.current;this.modulatedNextIndex=i(e,this.itemsCount),t._addQueryField("page",this.modulatedNextIndex.toString()),""!==this.options.nextEl&&$(this.options.nextEl).on("click.bookblock touchstart.bookblock",function(){return t._action("next"),!1}),""!==this.options.prevEl&&$(this.options.prevEl).on("click.bookblock touchstart.bookblock",function(){return t._action("prev"),!1}),$("#bb-bookblock").hover(function(){$(this).addClass("brighten-20")},function(){$(this).removeClass("brighten-20")}),$("#bb-bookblock").on("click.bookblock touchstart.bookblock",function(e){var n=$(e.currentTarget).offset().left,i=$(e.currentTarget).width(),o=i/2+n;e.touches?e.touches[0].screenX<o?t._action("prev"):t._action("next"):e.offsetX<i/2?t._action("prev"):t._action("next")}),n.on("debouncedresize",function(){t.elWidth=t.$el.width()}),$(document).on("keydown.bookblock",function(e){var n=e.which;[16,39].indexOf(n)>-1&&(e.stopPropagation(),e.preventDefault(),t._action("next")),[40,37].indexOf(n)>-1&&(e.stopPropagation(),e.preventDefault(),t._action("prev"))})},t.prototype._action=function(t,e){var n=this,i=this;i._createPage(t,this.current).then(function(){i._addQueryField("page",n.modulatedNextIndex.toString()),i._stopSlideshow(),i._navigate(t,e)})},t.prototype._navigate=function(t,e){if(this.isAnimating)return!1;this.options.onBeforeFlip(this.current),this.isAnimating=!0,this.$current=this.$items.eq(this.current),void 0!==e?this.current=e:"next"===t&&"ltr"===this.options.direction||"prev"===t&&"rtl"===this.options.direction?this.options.circular||this.current!==this.itemsCount-1?(this.previous=this.current,this.current=this.current<this.itemsCount-1?this.current+1:0):this.end=!0:("prev"===t&&"ltr"===this.options.direction||"next"===t&&"rtl"===this.options.direction)&&(this.options.circular||0!==this.current?(this.previous=this.current,this.current=this.current>0?this.current-1:this.itemsCount-1):this.end=!0),this.$nextItem=!this.options.circular&&this.end?this.$current:this.$items.eq(this.current),this.support?this._layout(t):this._layoutNoSupport(t)},t.prototype._layoutNoSupport=function(t){this.$items.hide(),this.$nextItem.show(),this.end=!1,this.isAnimating=!1;var e="next"===t&&this.current===this.itemsCount-1||"prev"===t&&0===this.current;this.options.onEndFlip(this.previous,this.current,e)},t.prototype._layout=function(t){var e=this,n=this._addSide("left",t),i=this._addSide("middle",t),o=this._addSide("right",t),r=n.find("div.bb-overlay"),s=i.find("div.bb-flipoverlay:first"),a=i.find("div.bb-flipoverlay:last"),c=o.find("div.bb-overlay"),u=this.end?400:this.options.speed;if(this.$items.hide(),this.$el.prepend(n,i,o),i.css({transitionDuration:u+"ms",transitionTimingFunction:this.options.easing}).on(this.transEndEventName,function(n){if($(n.target).hasClass("bb-page")){e.$el.children(".bb-page").remove(),e.$nextItem.show(),e.end=!1,e.isAnimating=!1;var i="next"===t&&e.current===e.itemsCount-1||"prev"===t&&0===e.current;e.options.onEndFlip(e.previous,e.current,i)}}),"prev"===t&&i.addClass("bb-flip-initial"),this.options.shadows&&!this.end){var l="next"===t?{transition:"opacity "+this.options.speed/2+"ms linear "+this.options.speed/2+"ms"}:{opacity:this.options.shadowSides,transition:"opacity "+this.options.speed/2+"ms linear"},h="next"===t?{transition:"opacity "+this.options.speed/2+"ms linear"}:{opacity:this.options.shadowFlip,transition:"opacity "+this.options.speed/2+"ms linear "+this.options.speed/2+"ms"},d="next"===t?{opacity:this.options.shadowFlip,transition:"opacity "+this.options.speed/2+"ms linear "+this.options.speed/2+"ms"}:{transition:"opacity "+this.options.speed/2+"ms linear"},p="next"===t?{opacity:this.options.shadowSides,transition:"opacity "+this.options.speed/2+"ms linear"}:{transition:"opacity "+this.options.speed/2+"ms linear "+this.options.speed/2+"ms"};s.css(h),a.css(d),r.css(l),c.css(p)}setTimeout(function(){i.addClass(e.end?"bb-flip-"+t+"-end":"bb-flip-"+t),e.options.shadows&&!e.end&&(s.css({opacity:"next"===t?e.options.shadowFlip:0}),a.css({opacity:"next"===t?0:e.options.shadowFlip}),r.css({opacity:"next"===t?e.options.shadowSides:0}),c.css({opacity:"next"===t?0:e.options.shadowSides}))},25)},t.prototype._addSide=function(t,e){var n;switch(t){case"left":n=$('<div class="bb-page"><div class="bb-back"><div class="bb-outer"><div class="bb-content"><div class="bb-inner">'+("next"===e?this.$current.html():this.$nextItem.html())+'</div></div><div class="bb-overlay"></div></div></div></div>').css("z-index",102);break;case"middle":n=$('<div class="bb-page"><div class="bb-front"><div class="bb-outer"><div class="bb-content"><div class="bb-inner">'+("next"===e?this.$current.html():this.$nextItem.html())+'</div></div><div class="bb-flipoverlay"></div></div></div><div class="bb-back"><div class="bb-outer"><div class="bb-content" style="width:'+this.elWidth+'px"><div class="bb-inner">'+("next"===e?this.$nextItem.html():this.$current.html())+'</div></div><div class="bb-flipoverlay"></div></div></div></div>').css("z-index",103);break;case"right":n=$('<div class="bb-page"><div class="bb-front"><div class="bb-outer"><div class="bb-content"><div class="bb-inner">'+("next"===e?this.$nextItem.html():this.$current.html())+'</div></div><div class="bb-overlay"></div></div></div></div>').css("z-index",101)}return n},t.prototype._startSlideshow=function(){var t=this;this.slideshow=setTimeout(function(){t._navigate("next"),t.options.autoplay&&t._startSlideshow()},this.options.interval)},t.prototype._addQueryField=function(t,e){var n=new window.URL(window.location.href);n.searchParams.has(t)?n.searchParams.set(t,e):n.searchParams.append(t,e),history.pushState({id:"something"},"",n.href)},t.prototype._getQueryField=function(t){var e=new window.URL(window.location.href);return e.searchParams.has(t)?e.searchParams.get(t):null},t.prototype._stopSlideshow=function(){this.options.autoplay&&(clearTimeout(this.slideshow),this.options.autoplay=!1)},t.prototype._createPage=function(t,e){var n=this;return new Promise(function(o,r){var s=$("#bb-spinner");s.removeClass("bb-not-loading");var a,c=n.itemsCount,u="prev"===t?e-1:e+1;n.modulatedNextIndex=i(u,c);var l=null;null!=n.modulatedNextIndex&&(a=$("#bb-bookblock").data().bbsrcset[n.modulatedNextIndex].path,(l=$("#bb-bookblock").find("img").eq(n.modulatedNextIndex)).on("load",function(t){s.addClass("bb-not-loading"),$(t.target).fadeIn(),o()}),l.attr("src",a))})},t.prototype.next=function(){this._action("ltr"===this.options.direction?"next":"prev")},t.prototype.prev=function(){this._action("ltr"===this.options.direction?"prev":"next")},t.prototype.jump=function(t){if((t-=1)===this.current||t>=this.itemsCount||t<0)return!1;var e;e="ltr"===this.options.direction?t>this.current?"next":"prev":t>this.current?"prev":"next",this._action(e,t)},t.prototype.last=function(){this.jump(this.itemsCount)},t.prototype.first=function(){this.jump(1)},t.prototype.isActive=function(){return this.isAnimating},t.prototype.update=function(){var t=this.$items.eq(this.current);this.$items=this.$el.children(".bb-item"),this.itemsCount=this.$items.length,this.current=t.index()},t.prototype.destroy=function(){this.options.autoplay&&this._stopSlideshow(),this.$el.removeClass("bb-"+this.options.orientation),this.$items.show(),""!==this.options.nextEl&&$(this.options.nextEl).off(".bookblock"),""!==this.options.prevEl&&$(this.options.prevEl).off(".bookblock"),n.off("debouncedresize")},t}(),r=function(t){window.console&&window.console.error(t)};$.fn.bookBlock=Object.assign(function(t){var r=this;if(null!=$.data(this,"bookblock"))return this;t=e.__assign({},$.fn.bookBlock.options,t);var s=[],a=$(this),c=$("<div/>").addClass(["bb-loading-pulse","bb-not-loading"]).attr("id","bb-spinner");a.append(c);var u=a.find("img"),l=i(t.startPage-1,u.length);u.each(function(t,e){var n=$(e).data("bbsrc");s.push({index:t,path:n})}),a.data("bbsrcset",s),u.eq(l).attr("src",u.eq(l).data("bbsrc"));var h=function(){if(!u.length)return!0;var e,i,o=n.width(),r=n.height(),s=o/r;var c=new Image;c.onload=function(){!function(n){var c=Math.abs(1-t.gutter/100),l=Math.random()<.5?-1:1;(n+=Number.EPSILON*l)>1&&s>1?(e=r,i=r*n):n>1&&s<1?(i=o,e=o/n):n<1&&s>1?(e=r,i=r*n):n<1&&s<1&&(i=o,e=o/n),e*=c,i*=c,a.css({height:e,width:i}),u.css({height:e,width:i})}(c.width/c.height),u.addClass("fadeIn")},c.src=u.eq(l).attr("src")};return n.on("resize",h),u.on("load",h),this.each(function(){$.data(r,"bookblock",new o(t,r))}),this},{options:{_dummy:!1,gutter:0,startPage:1,orientation:"vertical",direction:"ltr",speed:1e3,easing:"ease-in-out",shadows:!0,shadowSides:.2,shadowFlip:.1,circular:!1,nextEl:"#bb-nav-next",prevEl:"#bb-nav-prev",autoplay:!1,interval:3e3,onEndFlip:function(t,e,n){return!1},onBeforeFlip:function(t){return!1},width:null,height:null}})},t.f[5]=function(t,e){var n=function(t,e){var n=t.replace(/[\.\/]+/g,"-");"-"===n.charAt(0)&&(n=n.substring(1));var i=document.getElementById(n);if(i)e&&(i.innerHTML=e);else{var o=document.createElement(e?"style":"link");o.id=n,o.type="text/css",e?o.innerHTML=e:(o.rel="stylesheet",o.href=t),document.getElementsByTagName("head")[0].appendChild(o)}};"undefined"!=typeof FuseBox&&FuseBox.on("async",function(t){if(/\.css$/.test(t))return n(t),!1}),t.exports=n},t.f[8]=function(t,e){var n,i,o,r,s,a,c,u,l,h,d,p,f,b,v,y,m,w,_,g;!function(e){var n="object"==typeof self?self:"object"==typeof this?this:{};function i(t,e){return t!==n&&("function"==typeof Object.create?Object.defineProperty(t,"__esModule",{value:!0}):t.__esModule=!0),function(n,i){return t[n]=e?e(n,i):i}}"object"==typeof t.exports?e(i(n,i(t.exports))):e(i(n))}(function(t){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])};n=function(t,n){function i(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(i.prototype=n.prototype,new i)},i=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},o=function(t,e){var n={};for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&e.indexOf(i)<0&&(n[i]=t[i]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(i=Object.getOwnPropertySymbols(t);o<i.length;o++)e.indexOf(i[o])<0&&Object.prototype.propertyIsEnumerable.call(t,i[o])&&(n[i[o]]=t[i[o]])}return n},r=function(t,e,n,i){var o,r=arguments.length,s=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,n,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(s=(r<3?o(s):r>3?o(e,n,s):o(e,n))||s);return r>3&&s&&Object.defineProperty(e,n,s),s},s=function(t,e){return function(n,i){e(n,i,t)}},a=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)},c=function(t,e,n,i){return new(n||(n=Promise))(function(o,r){function s(t){try{c(i.next(t))}catch(t){r(t)}}function a(t){try{c(i.throw(t))}catch(t){r(t)}}function c(t){t.done?o(t.value):new n(function(e){e(t.value)}).then(s,a)}c((i=i.apply(t,e||[])).next())})},u=function(t,e){var n,i,o,r,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return r={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function a(r){return function(a){return function(r){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,i&&(o=2&r[0]?i.return:r[0]?i.throw||((o=i.return)&&o.call(i),0):i.next)&&!(o=o.call(i,r[1])).done)return o;switch(i=0,o&&(r=[2&r[0],o.value]),r[0]){case 0:case 1:o=r;break;case 4:return s.label++,{value:r[1],done:!1};case 5:s.label++,i=r[1],r=[0];continue;case 7:r=s.ops.pop(),s.trys.pop();continue;default:if(!(o=(o=s.trys).length>0&&o[o.length-1])&&(6===r[0]||2===r[0])){s=0;continue}if(3===r[0]&&(!o||r[1]>o[0]&&r[1]<o[3])){s.label=r[1];break}if(6===r[0]&&s.label<o[1]){s.label=o[1],o=r;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(r);break}o[2]&&s.ops.pop(),s.trys.pop();continue}r=e.call(t,s)}catch(t){r=[6,t],i=0}finally{n=o=0}if(5&r[0])throw r[1];return{value:r[0]?r[1]:void 0,done:!0}}([r,a])}}},l=function(t,e){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])},h=function(t){var e="function"==typeof Symbol&&t[Symbol.iterator],n=0;return e?e.call(t):{next:function(){return t&&n>=t.length&&(t=void 0),{value:t&&t[n++],done:!t}}}},d=function(t,e){var n="function"==typeof Symbol&&t[Symbol.iterator];if(!n)return t;var i,o,r=n.call(t),s=[];try{for(;(void 0===e||e-- >0)&&!(i=r.next()).done;)s.push(i.value)}catch(t){o={error:t}}finally{try{i&&!i.done&&(n=r.return)&&n.call(r)}finally{if(o)throw o.error}}return s},p=function(){for(var t=[],e=0;e<arguments.length;e++)t=t.concat(d(arguments[e]));return t},f=function(){for(var t=0,e=0,n=arguments.length;e<n;e++)t+=arguments[e].length;var i=Array(t),o=0;for(e=0;e<n;e++)for(var r=arguments[e],s=0,a=r.length;s<a;s++,o++)i[o]=r[s];return i},b=function(t){return this instanceof b?(this.v=t,this):new b(t)},v=function(t,e,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var i,o=n.apply(t,e||[]),r=[];return i={},s("next"),s("throw"),s("return"),i[Symbol.asyncIterator]=function(){return this},i;function s(t){o[t]&&(i[t]=function(e){return new Promise(function(n,i){r.push([t,e,n,i])>1||a(t,e)})})}function a(t,e){try{(n=o[t](e)).value instanceof b?Promise.resolve(n.value.v).then(c,u):l(r[0][2],n)}catch(t){l(r[0][3],t)}var n}function c(t){a("next",t)}function u(t){a("throw",t)}function l(t,e){t(e),r.shift(),r.length&&a(r[0][0],r[0][1])}},y=function(t){var e,n;return e={},i("next"),i("throw",function(t){throw t}),i("return"),e[Symbol.iterator]=function(){return this},e;function i(i,o){e[i]=t[i]?function(e){return(n=!n)?{value:b(t[i](e)),done:"return"===i}:o?o(e):e}:o}},m=function(t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var e,n=t[Symbol.asyncIterator];return n?n.call(t):(t=h(t),e={},i("next"),i("throw"),i("return"),e[Symbol.asyncIterator]=function(){return this},e);function i(n){e[n]=t[n]&&function(e){return new Promise(function(i,o){(function(t,e,n,i){Promise.resolve(i).then(function(e){t({value:e,done:n})},e)})(i,o,(e=t[n](e)).done,e.value)})}}},w=function(t,e){return Object.defineProperty?Object.defineProperty(t,"raw",{value:e}):t.raw=e,t},_=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e},g=function(t){return t&&t.__esModule?t:{default:t}},t("__extends",n),t("__assign",i),t("__rest",o),t("__decorate",r),t("__param",s),t("__metadata",a),t("__awaiter",c),t("__generator",u),t("__exportStar",l),t("__values",h),t("__read",d),t("__spread",p),t("__spreadArrays",f),t("__await",b),t("__asyncGenerator",v),t("__asyncDelegator",y),t("__asyncValues",m),t("__makeTemplateObject",w),t("__importStar",_),t("__importDefault",g)})};t.r(0)}($fsx);