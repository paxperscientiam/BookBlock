// tslint:disable:max-line-length
import { CssClasses, CssIds } from "./constants"

export function getNavigationPanel() {
    return $("<nav/>").addClass(CssClasses.NAV_CONTAINER)
        .append($("<a/>")
                .attr("id", CssIds.NAV_FIRST)
                .addClass(CssClasses.NAV_FIRST))
        .append($("<a/>")
                .attr("id", CssIds.NAV_PREV)
                .addClass(CssClasses.NAV_PREV))
        .append($("<a/>")
                .attr("id", CssIds.NAV_NEXT)
                .addClass(CssClasses.NAV_NEXT))
        .append($("<a/>")
                .attr("id", CssIds.NAV_LAST)
                .addClass(CssClasses.NAV_LAST))

}

export function getLeftSide(html: string): JQuery {
    return $("<div/>").addClass(CssClasses.PAGE)
        .append($("<div/>").addClass(CssClasses.BACK)
                .append($("<div/>").addClass(CssClasses.OUTER)
                        .append($("<div/>").addClass(CssClasses.CONTENT)
                                .append($("<div/>").addClass(CssClasses.INNER).append(html)))
                        .append($("<div/>").addClass(CssClasses.OVERLAY)))).css( "z-index", 102 )
}

export function getRightSide(html: string): JQuery {
    return $("<div/>").addClass(CssClasses.PAGE)
        .append($("<div/>").addClass(CssClasses.FRONT)
                .append($("<div/>").addClass(CssClasses.OUTER)
                        .append($("<div/>").addClass(CssClasses.CONTENT)
                                .append($("<div/>").addClass(CssClasses.INNER).append(html)))
                        .append($("<div/>").addClass(CssClasses.OVERLAY)))).css( "z-index", 101 )

}

export function getMiddleSide(html: string, html2: string): JQuery {
    return $(`<div class="bb-page"><div class="bb-front"><div class="bb-outer"><div class="bb-content"><div class="bb-inner">${html}</div></div><div class="bb-flipoverlay"></div></div></div><div class="bb-back"><div class="bb-outer"><div class="bb-content" style="width:${this.elWidth}px"><div class="bb-inner">${html2}</div></div><div class="bb-flipoverlay"></div></div></div></div>`).css( "z-index", 103 )
}
