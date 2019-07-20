// tslint:disable:no-console

import { CssClasses } from "./constants"

export function setImage($img: JQuery<HTMLImageElement>, options, index: number) {
    if (!$img.length) {
        return true
    }
    const screenWidth: number = $(window).width()
    const screenHeight: number = $(window).height()
    const screenRatio = screenWidth / screenHeight as number
    let cssHeight: number
    let cssWidth: number
    function setSizes(imgRatio: number) {
        const gutterFactor: number = Math.abs(1 - options.gutter / 100)
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

        $("#bb-bookblock").css({
            height: cssHeight,
            width: cssWidth,
        })
        $img.css({
            height: cssHeight,
            width: cssWidth,
        })
    }

    const tmpImage = new Image()
    tmpImage.onload = () => {
        const imgRatio = tmpImage.width / tmpImage.height
        setSizes(imgRatio)
        $img.addClass(CssClasses.FADEIN)
    }

    tmpImage.src = $img.eq(index).attr("src")
}
