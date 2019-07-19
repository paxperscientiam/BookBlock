export class Notify {
    static diplay(message: string) {
        const $messageBox = $("<div/>")
            .text(message)
            .css({
                background: "black",
                color: "white",
                left: 0,
                position: "fixed",
                top: 0,
            })
            .fadeOut({
                duration: 2000,
                easing: "linear",
            })

        $("body").append($messageBox)
    }
}
