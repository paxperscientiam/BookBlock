export class BookBlockUtil {
    static mod(index: number, count: number): number {
        // magic formula by https://dev.to/maurobringolf/a-neat-trick-to-compute-modulo-of-negative-numbers-111e
        return (index % count + count) % count
    }

    static capture(path: string, prefix: string, count: number, ext: string) {
        let i = 0
        let result: string
        const pad = "0".repeat((count).toString().length + 1)
        while (i < count) {
            result = path + prefix + (pad + i).slice(-1 * (1 + (count).toString().length)) + `.${ext}`
            window.console.log(result)
            i++
        }
    }

    static logError( message: string ): void {
        if ( window.console ) {
            window.console.error( message )
        }
    }

    static getQueryField(key: string) {
        const url: URL = new window.URL(window.location.href)
        if (url.searchParams.has(key)) {
            return url.searchParams.get(key)
        }
        return null
    }

    static addQueryField(key: string, value: string) {
        const url: URL = new window.URL(window.location.href)

        if (url.searchParams.has(key)) {
            url.searchParams.set(key, value)
        } else {
            url.searchParams.append(key, value)
        }

        history.pushState({
            id: "booblockhistory",
        },
                          "",
                          url.href,
                         )
    }
}
