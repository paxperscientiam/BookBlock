// credit to https://codeburst.io/javascript-promises-explained-with-simple-real-life-analogies-dd6908092138
// http://ccoenraets.github.io/es6-tutorial-data/promisify/
// https://gist.github.com/santisbon/a7c221780b528bd3ebb8

export function loadImage(url: string) {
    return new Promise((resolve, reject) => {
        // Open a new XHR
        const request = new XMLHttpRequest()
        request.open("GET", url)
        request.responseType = "blob"

        // When the request loads, check whether it was successful
        request.onload = () => {
            if (request.status === 200) {
                // If successful, resolve the promise
                resolve(request.response)
            } else {
                // Otherwise, reject the promise
                reject(new Error(`${request.status} An error occurred while loading image. Error: ${request.statusText}`))
            }
        }

        request.onerror = () => {
            // Also deal with the case when the entire request fails to begin with
            // This is probably a network error, so reject the promise with an appropriate message
            reject(new Error("There was a network error."))
        }

        request.send()
    })
}

export function embedImage(url: string) {
    loadImage(url).then((result) => {
        const img = new Image()
        const imageURL = window.URL.createObjectURL(result)
        img.src = imageURL
        document.querySelector("body").appendChild(img)
    },
                        (err) => {
                            console.log(err)
                        })
}

export function addSrcToImageElement() {

}
