// tslint:disable-next-line
declare global  {
    // tslint:disable-next-line
    interface Window {
        jQuery: typeof jQuery
        $: typeof jQuery
        Modernizr: ModernizrStatic
        BookBlock: typeof BookBlock
    }
}
