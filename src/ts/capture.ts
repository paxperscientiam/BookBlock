export function capture(path: string, prefix: string, count: number, ext: string) {
    let i = 0
    let result: string
    const pad = "0".repeat((count).toString().length + 1)
    while (i < count) {
        result = path + prefix + (pad + i).slice(-1 * (1 + (count).toString().length)) + `.${ext}`
        console.log(result)
        i++
    }
}

capture("images/demo/", "dummy-", 11, "png")
