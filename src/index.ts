// tslint:disable:no-console

declare global  {
    // tslint:disable-next-line
    interface Window {
        jQuery: typeof JQuery
        $: typeof JQuery
        Modernizr: ModernizrStatic
        BookBlock: typeof BookBlock
    }
}

import "./scss/test.scss"

import "./scss/app/index.scss"
import "./scss/bookblock/index.scss"

// @ts-ignore
// import * as $ from "jquery"

import "./ts/jquery.bookblock"
