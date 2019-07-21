// tslint:disable:no-console

import { CssClasses } from "./constants"

interface IScreenInfo {
    screenHeight: number
    screenWidth: number
    screenRatio: number
}

export function getScreenRatioAndDimensions(): IScreenInfo {
    const screenWidth: number = $(window).width()
    const screenHeight: number = $(window).height()
    const screenRatio: number = screenWidth / screenHeight
    return {
        screenHeight,
        screenRatio,
        screenWidth,
    }
}

export function getImageInfo($img: JQuery<HTMLImageElement>) {
    // if (!$img.length) {
    //     return true
    // }
    // const tmpImage = new Image()
    // let imgRatio: number
    // tmpImage.onload = () => {
    //     $img.addClass(CssClasses.FADEIN)
    //     return tmpImage.width / tmpImage.height
    // }
    // tmpImage.src = $img.attr("src")
//    return imgRatio

    // function setSizes(imgRatio: number) {
    //     const gutterFactor: number = Math.abs(1 - options.gutter / 100)
    //     const plusOrMinus = Math.random() < 0.5 ? -1 : 1
    //     imgRatio += Number.EPSILON * plusOrMinus

    //     // options.gutter: number
    //     if (imgRatio > 1 && screenRatio > 1) {
    //         // > 1 => width > height
    //         cssHeight = screenHeight
    //         cssWidth = screenHeight * imgRatio
    //     } else if (imgRatio > 1 && screenRatio < 1) {
    //         // < 1 => width < height
    //         cssWidth = screenWidth
    //         cssHeight = screenWidth / imgRatio
    //     } else if (imgRatio < 1 && screenRatio > 1) {
    //         cssHeight = screenHeight
    //         cssWidth = screenHeight * imgRatio
    //     } else if (imgRatio < 1 && screenRatio < 1) {
    //         cssWidth = screenWidth
    //         cssHeight = screenWidth / imgRatio
    //     }

    //     cssHeight *= gutterFactor
    //     cssWidth *= gutterFactor
    //     console.log(cssWidth)
    //     console.log(cssHeight)
    //     $("#bb-bookblock").css({
    //         height: cssHeight,
    //         width: cssWidth,
    //     })
    //     $img.css({
    //         height: cssHeight,
    //         width: cssWidth,
    //     })
    // }

    // if (ratio != null) {
    //     setSizes(ratio)
    // }

    // if ($img != null) {
    //     console.log("lol there is an image")
    // }

    // const tmpImage = new Image()
    // tmpImage.onload = () => {
    //     const imgRatio = tmpImage.width / tmpImage.height
    //     setSizes(imgRatio)
    //     $img.addClass(CssClasses.FADEIN)
    // }

    // tmpImage.src = $img.eq(index).attr("src")
}

export function setFrameSize($element: JQuery, ratio: number, options): void {
    const screenInfo = getScreenRatioAndDimensions()
    let cssHeight: number
    let cssWidth: number

    const gutterFactor: number = Math.abs(1 - options.gutter / 100)
    const plusOrMinus = Math.random() < 0.5 ? -1 : 1
    ratio += Number.EPSILON * plusOrMinus

    // options.gutter: number
    if (ratio > 1 && screenInfo.screenRatio > 1) {
        // > 1 => width > height
        cssHeight = screenInfo.screenHeight
        cssWidth = screenInfo.screenHeight * ratio
    } else if (ratio > 1 && screenInfo.screenRatio < 1) {
        // < 1 => width < height
        cssWidth = screenInfo.screenWidth
        cssHeight = screenInfo.screenWidth / ratio
    } else if (ratio < 1 && screenInfo.screenRatio > 1) {
        cssHeight = screenInfo.screenHeight
        cssWidth = screenInfo.screenHeight * ratio
    } else if (ratio < 1 && screenInfo.screenRatio < 1) {
        cssWidth = screenInfo.screenWidth
        cssHeight = screenInfo.screenWidth / ratio
    }

    cssHeight *= gutterFactor
    cssWidth *= gutterFactor
    $element.css({
        height: cssHeight,
        width: cssWidth,
    })
}
