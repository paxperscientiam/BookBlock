/*!
@paxperscientiam/bookblock
Full version: 0.2.0.190718676 PRODUCTION READY

Product version: 0.2.0
Builder number: 190718676
Build time: Thu Jul 18 2019 22:32
*/
!function(){if(!window.$fsx){var t=window.$fsx={};t.f={},t.m={},t.r=function(e){var n=t.m[e];if(n)return n.m.exports;var s=t.f[e];return s?((n=t.m[e]={}).exports={},n.m={exports:n.exports},s.call(n.exports,n.m,n.exports),n.m.exports):void 0}}}(),function(t){t.f[0]=function(e,n){Object.defineProperty(n,"__esModule",{value:!0}),t.r(1),t.r(2),t.r(3),t.r(4)},t.f[4]=function(e,n){Object.defineProperty(n,"__esModule",{value:!0});var s=t.r(10),i=$(window),o=t.r(5),r=t.r(6);Modernizr.addTest("csstransformspreserve3d",function(){var t,e=Modernizr.prefixed("transformStyle"),n="preserve-3d";return!!e&&(e=e.replace(/([A-Z])/g,function(t,e){return"-"+e.toLowerCase()}).replace(/^ms-/,"-ms-"),Modernizr.testStyles("#modernizr{"+e+":"+n+"}",function(n,s){t=window.getComputedStyle?getComputedStyle(n,null).getPropertyValue(e):""}),t===n)});var a=function(){function t(t,e){if(this.options=t,this.$el=$(e),this.$el.addClass("bb-"+this.options.orientation),this.$items=this.$el.children(o.CssClasses._ITEM).hide(),this.itemsCount=this.$items.length,null!=this.$el.data().bbsrcset&&(this.itemsCount=this.$el.data().bbsrcset.length),this.options.startPage>0&&this.options.startPage<=this.itemsCount?this.current=this.options.startPage-1:(r.BookBlockUtil.logError("startPage option is out of range"),this.current=0),this.previous=-1,this.startIndex=this.current,this.options.history){var n=r.BookBlockUtil.getQueryField("page"),s=Number.parseInt(n,10);Number.isInteger(s)&&(this.startIndex=r.BookBlockUtil.mod(s-1,this.itemsCount))}this.$current=this.$items.eq(this.startIndex).show(),this.elWidth=this.$el.width();this.transEndEventName={MozTransition:"transitionend",OTransition:"oTransitionEnd",WebkitTransition:"webkitTransitionEnd",msTransition:"MSTransitionEnd",transition:"transitionend"}[Modernizr.prefixed("transition")]+".bookblock",this.support=Modernizr.csstransitions&&Modernizr.csstransforms3d&&Modernizr.csstransformspreserve3d,this._initEvents(),this.options.autoplay&&(this.options.circular=!0,this._startSlideshow())}return t.prototype._initEvents=function(){var t=this,e=this,n=e.current;this.modulatedNextIndex=r.BookBlockUtil.mod(n,this.itemsCount),""!==this.options.nextEl&&$(this.options.nextEl).on("click.bookblock touchstart.bookblock",function(){return e._action(o.NEXT),!1}),""!==this.options.prevEl&&$(this.options.prevEl).on("click.bookblock touchstart.bookblock",function(){return e._action(o.PREV),!1}),this.$el.hover(function(){},function(){}),this.$el.on("click.bookblock touchstart.bookblock",function(n){if(n.preventDefault(),!1===t.isAnimating||void 0===t.isAnimating){var s=$(n.currentTarget).offset().left,i=$(n.currentTarget).width(),r=i/2+s;n.touches?n.touches[0].screenX<r?e._action(o.PREV):e._action(o.NEXT):n.offsetX<i/2?e._action(o.PREV):e._action(o.NEXT)}}),i.on("debouncedresize",function(){e.elWidth=e.$el.width()}),$(document).on("keydown.bookblock",function(n){if(!1===t.isAnimating||void 0===t.isAnimating){var s=n.which;[16,39].indexOf(s)>-1&&(n.stopPropagation(),n.preventDefault(),e._action(o.NEXT)),[40,37].indexOf(s)>-1&&(n.stopPropagation(),n.preventDefault(),e._action(o.PREV))}})},t.prototype._action=function(t,e){var n=this,s=this;s._createPage(t,this.current).then(function(){s.options.history&&r.BookBlockUtil.addQueryField("page",(n.modulatedNextIndex+1).toString()),s._stopSlideshow(),s._navigate(t,e)})},t.prototype._navigate=function(t,e){if(this.isAnimating)return!1;this.options.onBeforeFlip(this.current),this.isAnimating=!0,this.$current=this.$items.eq(this.current),void 0!==e?this.current=e:t&&this.options.ltr||!t&&!this.options.ltr?this.options.circular||this.current!==this.itemsCount-1?(this.previous=this.current,this.current=this.current<this.itemsCount-1?this.current+1:0):this.end=!0:(!t&&this.options.ltr||t&&!this.options.ltr)&&(this.options.circular||0!==this.current?(this.previous=this.current,this.current=this.current>0?this.current-1:this.itemsCount-1):this.end=!0),this.$nextItem=!this.options.circular&&this.end?this.$current:this.$items.eq(this.current),this.support?this._layout(t):this._layoutNoSupport(t)},t.prototype._layoutNoSupport=function(t){this.$items.hide(),this.$nextItem.show(),this.end=!1,this.isAnimating=!1;var e=this.current===this.itemsCount-1||!t&&0===this.current;this.options.onEndFlip(this.previous,this.current,e)},t.prototype._layout=function(t){var e=this,n=this._addSide("left",t),s=this._addSide("middle",t),i=this._addSide("right",t),r=n.find("div.bb-overlay"),a=s.find("div.bb-flipoverlay:first"),l=s.find("div.bb-flipoverlay:last"),c=i.find(o.CssClasses._OVERLAY),u=this.end?400:this.options.speed;if(this.$items.hide(),this.$el.prepend(n,s,i),s.css({transitionDuration:u+"ms",transitionTimingFunction:this.options.easing}).on(this.transEndEventName,function(n){if($(n.target).hasClass(o.CssClasses.PAGE)){e.$el.children(o.CssClasses._PAGE).remove(),e.$nextItem.show(),e.end=!1,e.isAnimating=!1;var s=e.current===e.itemsCount-1||!t&&0===e.current;e.options.onEndFlip(e.previous,e.current,s)}}),t||s.addClass(o.CssClasses.FLIP_INITIAL),this.options.shadows&&!this.end){var d=t?{transition:"opacity "+this.options.speed/2+"ms linear "+this.options.speed/2+"ms"}:{opacity:this.options.shadowSides,transition:"opacity "+this.options.speed/2+"ms linear"},h=t?{transition:"opacity "+this.options.speed/2+"ms linear"}:{opacity:this.options.shadowFlip,transition:"opacity "+this.options.speed/2+"ms linear "+this.options.speed/2+"ms"},p=t?{opacity:this.options.shadowFlip,transition:"opacity "+this.options.speed/2+"ms linear "+this.options.speed/2+"ms"}:{transition:"opacity "+this.options.speed/2+"ms linear"},f=t?{opacity:this.options.shadowSides,transition:"opacity "+this.options.speed/2+"ms linear"}:{transition:"opacity "+this.options.speed/2+"ms linear "+this.options.speed/2+"ms"};a.css(h),l.css(p),r.css(d),c.css(f)}setTimeout(function(){var n=t?"next":"prev";s.addClass(e.end?"bb-flip-"+n+"-end":"bb-flip-"+n),e.options.shadows&&!e.end&&(a.css({opacity:e.options.shadowFlip}),l.css({opacity:0}),r.css({opacity:e.options.shadowSides}),c.css({opacity:0}))},25)},t.prototype._addSide=function(t,e){var n,s;switch(t){case"left":s=e?this.$current.html():this.$nextItem.html(),n=$("<div/>").addClass(o.CssClasses.PAGE).append($("<div/>").addClass(o.CssClasses.BACK).append($("<div/>").addClass(o.CssClasses.OUTER).append($("<div/>").addClass(o.CssClasses.CONTENT).append($("<div/>").addClass(o.CssClasses.INNER).append(s))).append($("<div/>").addClass(o.CssClasses.OVERLAY)))).css("z-index",102);break;case"middle":s=e?this.$current.html():this.$nextItem.html();var i=e?this.$nextItem.html():this.$current.html();n=$('<div class="bb-page"><div class="bb-front"><div class="bb-outer"><div class="bb-content"><div class="bb-inner">'+s+'</div></div><div class="bb-flipoverlay"></div></div></div><div class="bb-back"><div class="bb-outer"><div class="bb-content" style="width:'+this.elWidth+'px"><div class="bb-inner">'+i+'</div></div><div class="bb-flipoverlay"></div></div></div></div>').css("z-index",103);break;case"right":s=e?this.$nextItem.html():this.$current.html(),n=$("<div/>").addClass(o.CssClasses.PAGE).append($("<div/>").addClass(o.CssClasses.FRONT).append($("<div/>").addClass(o.CssClasses.OUTER).append($("<div/>").addClass(o.CssClasses.CONTENT).append($("<div/>").addClass(o.CssClasses.INNER).append(s))).append($("<div/>").addClass(o.CssClasses.OVERLAY)))).css("z-index",101)}return n},t.prototype._startSlideshow=function(){var t=this;this.slideshow=setTimeout(function(){t._navigate(o.NEXT),t.options.autoplay&&t._startSlideshow()},this.options.interval)},t.prototype._stopSlideshow=function(){this.options.autoplay&&(clearTimeout(this.slideshow),this.options.autoplay=!1)},t.prototype._createPage=function(t,e){var n=this;return new Promise(function(s,i){var a=$(o.CssIds._SPINNER);a.removeClass(o.CssClasses.NOT_LOADING);var l,c=n.itemsCount,u=t?e+1:e-1;n.modulatedNextIndex=r.BookBlockUtil.mod(u,c);var d=null;null!=n.modulatedNextIndex&&(l=n.$el.data().bbsrcset[n.modulatedNextIndex].path,(d=n.$el.find("img").eq(n.modulatedNextIndex)).on("load",function(t){a.addClass(o.CssClasses.NOT_LOADING),$(t.target).fadeIn(),s()}),d.attr("src",l))})},t.prototype.next=function(){this._action(this.options.ltr)},t.prototype.prev=function(){this._action(!this.options.ltr)},t.prototype.jump=function(t){if((t-=1)===this.current||t>=this.itemsCount||t<0)return!1;var e;e=this.options.ltr?t>this.current:!(t>this.current),this._action(e,t)},t.prototype.last=function(){this.jump(this.itemsCount)},t.prototype.first=function(){this.jump(1)},t.prototype.isActive=function(){return this.isAnimating},t.prototype.update=function(){var t=this.$items.eq(this.current);this.$items=this.$el.children(o.CssClasses._ITEM),this.itemsCount=this.$items.length,this.current=t.index()},t.prototype.destroy=function(){this.options.autoplay&&this._stopSlideshow(),this.$el.removeClass("bb-"+this.options.orientation),this.$items.show(),""!==this.options.nextEl&&$(this.options.nextEl).off(".bookblock"),""!==this.options.prevEl&&$(this.options.prevEl).off(".bookblock"),i.off("debouncedresize")},t}();n.BookBlock=a,$.fn.bookBlock=Object.assign(function(t){var e=this;if(null!=$.data(this,"bookblock"))return this;t=s.__assign({},$.fn.bookBlock.options,t);var n=[],l=$(this);t.effects.paper&&l.addClass(o.CssClasses.PAPER_EFFECT),t.effects.bordershadow&&l.addClass(o.CssClasses.DROPSHADOW_EFFECT);var c=$("<div/>").addClass([o.CssClasses.LOADING_PULSE,o.CssClasses.NOT_LOADING]).attr("id",o.CssIds.SPINNER);l.append(c);var u,d=l.find("img"),h=r.BookBlockUtil.mod(t.startPage-1,d.length);if(t.history){u=r.BookBlockUtil.getQueryField("page");var p=Number.parseInt(u,10);Number.isInteger(p)&&(0===p||p<0?(p=1,r.BookBlockUtil.addQueryField("page",(r.BookBlockUtil.mod(p-1,d.length)+1).toString())):p>d.length?(p=r.BookBlockUtil.mod(p-1,d.length),r.BookBlockUtil.addQueryField("page",(p+1).toString()),h=p):h=r.BookBlockUtil.mod(p-1,d.length))}d.each(function(t,e){var s=$(e).data("bbsrc");n.push({index:t,path:s})}),l.data("bbsrcset",n),d.eq(h).attr("src",d.eq(h).data("bbsrc"));var f=function(){if(!d.length)return!0;var e,n,s=i.width(),r=i.height(),a=s/r;var c=new Image;c.onload=function(){!function(i){var o=Math.abs(1-t.gutter/100),c=Math.random()<.5?-1:1;(i+=Number.EPSILON*c)>1&&a>1?(e=r,n=r*i):i>1&&a<1?(n=s,e=s/i):i<1&&a>1?(e=r,n=r*i):i<1&&a<1&&(n=s,e=s/i),e*=o,n*=o,l.css({height:e,width:n}),d.css({height:e,width:n})}(c.width/c.height),d.addClass(o.CssClasses.FADEIN)},c.src=d.eq(h).attr("src")};return i.on("resize",f),d.on("load",f),this.each(function(){$.data(e,"bookblock",new a(t,e))}),this},{options:{_dummy:!1,gutter:0,startPage:1,orientation:"vertical",ltr:!0,speed:1e3,easing:"ease-in-out",shadows:!0,shadowSides:.2,shadowFlip:.1,circular:!1,nextEl:"#bb-nav-next",prevEl:"#bb-nav-prev",autoplay:!1,interval:3e3,onEndFlip:function(t,e,n){return!1},onBeforeFlip:function(t){return!1},width:null,height:null,effects:{bordershadow:null,paper:null},history:!1}})},t.f[5]=function(t,e){Object.defineProperty(e,"__esModule",{value:!0}),function(t){t.CONTENT="bb-content",t.FADEIN="bb-fadeIn",t.FLIP_NEXT_END="bb-flip-next-end",t.FLIP_NEXT="bb-flip-next",t.FLIP_INITIAL="bb-flip-initial",t.FRONT="bb-front",t.BACK="bb-back",t.OUTER="bb-outer",t.INNER="bb-inner",t.DROPSHADOW_EFFECT="bb-dropshadow-effect",t.LOADING_PULSE="bb-loading-pulse",t.NOT_LOADING="bb-not-loading",t.OVERLAY="bb-overlay",t._OVERLAY=".bb-overlay",t.PAPER_EFFECT="bb-paper-effect",t.PAGE="bb-page",t._PAGE=".bb-page",t._ITEM=".bb-item"}(e.CssClasses||(e.CssClasses={})),function(t){t.SPINNER="bb-spinner",t._SPINNER="#bb-spinner"}(e.CssIds||(e.CssIds={})),e.NEXT=!0,e.PREV=!1},t.f[6]=function(t,e){Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(){}return t.mod=function(t,e){return(t%e+e)%e},t.capture=function(t,e,n,s){for(var i,o=0,r="0".repeat(n.toString().length+1);o<n;)i=t+e+(r+o).slice(-1*(1+n.toString().length))+"."+s,window.console.log(i),o++},t.logError=function(t){window.console&&window.console.error(t)},t.getQueryField=function(t){var e=new window.URL(window.location.href);return e.searchParams.has(t)?e.searchParams.get(t):null},t.addQueryField=function(t,e){var n=new window.URL(window.location.href);n.searchParams.has(t)?n.searchParams.set(t,e):n.searchParams.append(t,e),history.pushState({id:"booblockhistory"},"",n.href)},t}();e.BookBlockUtil=n},t.f[7]=function(t,e){var n=function(t,e){var n=t.replace(/[\.\/]+/g,"-");"-"===n.charAt(0)&&(n=n.substring(1));var s=document.getElementById(n);if(s)e&&(s.innerHTML=e);else{var i=document.createElement(e?"style":"link");i.id=n,i.type="text/css",e?i.innerHTML=e:(i.rel="stylesheet",i.href=t),document.getElementsByTagName("head")[0].appendChild(i)}};"undefined"!=typeof FuseBox&&FuseBox.on("async",function(t){if(/\.css$/.test(t))return n(t),!1}),t.exports=n},t.f[10]=function(t,e){var n,s,i,o,r,a,l,c,u,d,h,p,f,b,v,m,y,_,g,C;!function(e){var n="object"==typeof self?self:"object"==typeof this?this:{};function s(t,e){return t!==n&&("function"==typeof Object.create?Object.defineProperty(t,"__esModule",{value:!0}):t.__esModule=!0),function(n,s){return t[n]=e?e(n,s):s}}"object"==typeof t.exports?e(s(n,s(t.exports))):e(s(n))}(function(t){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])};n=function(t,n){function s(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(s.prototype=n.prototype,new s)},s=Object.assign||function(t){for(var e,n=1,s=arguments.length;n<s;n++)for(var i in e=arguments[n])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t},i=function(t,e){var n={};for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&e.indexOf(s)<0&&(n[s]=t[s]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(s=Object.getOwnPropertySymbols(t);i<s.length;i++)e.indexOf(s[i])<0&&Object.prototype.propertyIsEnumerable.call(t,s[i])&&(n[s[i]]=t[s[i]])}return n},o=function(t,e,n,s){var i,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,n):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,n,s);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(r=(o<3?i(r):o>3?i(e,n,r):i(e,n))||r);return o>3&&r&&Object.defineProperty(e,n,r),r},r=function(t,e){return function(n,s){e(n,s,t)}},a=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)},l=function(t,e,n,s){return new(n||(n=Promise))(function(i,o){function r(t){try{l(s.next(t))}catch(t){o(t)}}function a(t){try{l(s.throw(t))}catch(t){o(t)}}function l(t){t.done?i(t.value):new n(function(e){e(t.value)}).then(r,a)}l((s=s.apply(t,e||[])).next())})},c=function(t,e){var n,s,i,o,r={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function a(o){return function(a){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;r;)try{if(n=1,s&&(i=2&o[0]?s.return:o[0]?s.throw||((i=s.return)&&i.call(s),0):s.next)&&!(i=i.call(s,o[1])).done)return i;switch(s=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return r.label++,{value:o[1],done:!1};case 5:r.label++,s=o[1],o=[0];continue;case 7:o=r.ops.pop(),r.trys.pop();continue;default:if(!(i=(i=r.trys).length>0&&i[i.length-1])&&(6===o[0]||2===o[0])){r=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){r.label=o[1];break}if(6===o[0]&&r.label<i[1]){r.label=i[1],i=o;break}if(i&&r.label<i[2]){r.label=i[2],r.ops.push(o);break}i[2]&&r.ops.pop(),r.trys.pop();continue}o=e.call(t,r)}catch(t){o=[6,t],s=0}finally{n=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,a])}}},u=function(t,e){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])},d=function(t){var e="function"==typeof Symbol&&t[Symbol.iterator],n=0;return e?e.call(t):{next:function(){return t&&n>=t.length&&(t=void 0),{value:t&&t[n++],done:!t}}}},h=function(t,e){var n="function"==typeof Symbol&&t[Symbol.iterator];if(!n)return t;var s,i,o=n.call(t),r=[];try{for(;(void 0===e||e-- >0)&&!(s=o.next()).done;)r.push(s.value)}catch(t){i={error:t}}finally{try{s&&!s.done&&(n=o.return)&&n.call(o)}finally{if(i)throw i.error}}return r},p=function(){for(var t=[],e=0;e<arguments.length;e++)t=t.concat(h(arguments[e]));return t},f=function(){for(var t=0,e=0,n=arguments.length;e<n;e++)t+=arguments[e].length;var s=Array(t),i=0;for(e=0;e<n;e++)for(var o=arguments[e],r=0,a=o.length;r<a;r++,i++)s[i]=o[r];return s},b=function(t){return this instanceof b?(this.v=t,this):new b(t)},v=function(t,e,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var s,i=n.apply(t,e||[]),o=[];return s={},r("next"),r("throw"),r("return"),s[Symbol.asyncIterator]=function(){return this},s;function r(t){i[t]&&(s[t]=function(e){return new Promise(function(n,s){o.push([t,e,n,s])>1||a(t,e)})})}function a(t,e){try{(n=i[t](e)).value instanceof b?Promise.resolve(n.value.v).then(l,c):u(o[0][2],n)}catch(t){u(o[0][3],t)}var n}function l(t){a("next",t)}function c(t){a("throw",t)}function u(t,e){t(e),o.shift(),o.length&&a(o[0][0],o[0][1])}},m=function(t){var e,n;return e={},s("next"),s("throw",function(t){throw t}),s("return"),e[Symbol.iterator]=function(){return this},e;function s(s,i){e[s]=t[s]?function(e){return(n=!n)?{value:b(t[s](e)),done:"return"===s}:i?i(e):e}:i}},y=function(t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var e,n=t[Symbol.asyncIterator];return n?n.call(t):(t=d(t),e={},s("next"),s("throw"),s("return"),e[Symbol.asyncIterator]=function(){return this},e);function s(n){e[n]=t[n]&&function(e){return new Promise(function(s,i){(function(t,e,n,s){Promise.resolve(s).then(function(e){t({value:e,done:n})},e)})(s,i,(e=t[n](e)).done,e.value)})}}},_=function(t,e){return Object.defineProperty?Object.defineProperty(t,"raw",{value:e}):t.raw=e,t},g=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e},C=function(t){return t&&t.__esModule?t:{default:t}},t("__extends",n),t("__assign",s),t("__rest",i),t("__decorate",o),t("__param",r),t("__metadata",a),t("__awaiter",l),t("__generator",c),t("__exportStar",u),t("__values",d),t("__read",h),t("__spread",p),t("__spreadArrays",f),t("__await",b),t("__asyncGenerator",v),t("__asyncDelegator",m),t("__asyncValues",y),t("__makeTemplateObject",_),t("__importStar",g),t("__importDefault",C)})};t.r(0)}($fsx);