// tslint:disable:no-console

import * as Autoprefixer from "autoprefixer"
import * as Cssnano from "cssnano"
import * as Unprefix from "postcss-unprefix"

import { TypeChecker } from "fuse-box-typechecker"

const testSync = TypeChecker({
    basePath: "./",
    name: "Test Sync",
    tsConfig: "./tsconfig.json", // optional
    tsLint: "./tslint.json", // optional
    // for more option, see ITypeCheckerOptionsInterface in bottom on readme
})

import {
    CSSPlugin,
    CSSResourcePlugin,
    FuseBox,
    PostCSSPlugin,
    QuantumPlugin,
    SassPlugin,
    WebIndexPlugin,
} from "fuse-box"

import {
    context as ctx,
    exec,
    src,
    task,
} from "fuse-box/sparky"

import * as fs from "fs"

class CTX {
    isProduction: boolean = false
    isTest: boolean = false

    getConfig() {
        return FuseBox.init({
            homeDir: "src",
            output: "dist/$name.js",

            cache: true,

            globals: {default : "*"},
            plugins: [
                WebIndexPlugin({
                    template: "src/index.html",
                }),
                [
                    SassPlugin({importer: true}),
                    PostCSSPlugin([
                        Unprefix,
                        Autoprefixer,
                        Cssnano,
                    ]),
                    CSSResourcePlugin({
                        dist: "dist/css-resources",
                        inline: true,
                    }),
                    CSSPlugin(),
                ],
                this.isProduction && QuantumPlugin({
                    bakeApiIntoBundle: "app",
                    containedAPI: true,
                    css: {
                        path: "css-resources/styles.min.css",
                    },
                    treeshake: true,
                    uglify: true,
                }),
            ],
        })
    }

    createBundle(fuse: FuseBox) {
        const bundle = fuse.bundle("app")
        if (!this.isProduction) {
            bundle.watch()
            bundle.hmr()
        }
        bundle.instructions(`> index.ts`)

        return bundle
    }
}

ctx(CTX)

task("test", async (context: CTX) => {
    const fuse = context.getConfig()
    fuse.dev()
    console.log(fuse)
    setInterval(() => {
        console.log("OMFG")
        fuse.sendPageReload()
    }, 1000)
})

task("copy:js", async () => {
    await src("./**/*.js", { base: "./src/js" })
        .dest("./dist/js")
        .exec()
})

task("copy:images", async () => {
    await src("./**/*.png", { base: "./src/assets" })
        .dest("./dist/images")
        .exec()
})

task("copy", [
    "&copy:js", // parallel task mode
    "&copy:images", // parallel task mode
])

task("clean", async () => {
    await src("./dist")
        .clean("dist/")
        .exec()
})

task("watch", async (context: CTX) => {
    const fuse = context.getConfig()
    await fs.watch("./src/index.html", {
        recursive: true,
    }, async (eventType, filename) => {
        console.log(`event type is: ${eventType}`)
        if (filename) {
            console.log(`filename provided: ${filename}`)
            await fuse.sendPageReload()
        } else {
            console.log("filename not provided")
        }
    })
})

task("build", [], async (context: CTX) => {
    context.isProduction = true
    console.log("PRODUCTION BUILD")
    //    const fuse = context.getConfig()
    await exec("default")
})

task("default", ["clean", "copy"], async (context: CTX) => {
    const fuse = context.getConfig()
    if (!context.isProduction) {
        fuse.dev()
        fs.watch("./src/index.html", {
            recursive: true,
        }, (eventType, filename) => {
            console.log(`event type is: ${eventType}`)
            if (filename) {
                console.log(`filename provided: ${filename}`)
                fuse.sendPageReload()
            } else {
                console.log("filename not provided")
            }
        })
    }

    context.createBundle(fuse)
    if (!context.isProduction) {
        exec("test:ts")
    }
    await fuse.run()
})

task("test:ts", [], () => {
    testSync.runWatch("./src")
})
