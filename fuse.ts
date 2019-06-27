// tslint:disable:no-console
import * as fs from "fs"
import * as path from "path"

import * as dlv from "dlv"

function importJSON(filePath: string, property?: string) {
    if (fs.existsSync(filePath)) {
        let json = fs.readFileSync(filePath, "utf8")
        // @ts-ignore
        json = JSON.parse(json)
        // @ts-ignore
        if (property != null) {
            // @ts-ignore
            return dlv(json, property)
        }
        return json
    }
    // @ts-ignore
    return JSON.parse("{}")
}

const PKG = importJSON("./package.json")
const FB = importJSON("./package.json", "fuse-box")

let APP_NAME = dlv(FB, "bundle.app.name") || "app"
if (process.env.NODE_ENV === "production") {
    APP_NAME+=".min"
}

const Autoprefixer = require("autoprefixer")
const Cssnano = require("cssnano")
const Unprefix = require("postcss-unprefix")

import { TypeChecker } from "fuse-box-typechecker"

function testSync() {
    return TypeChecker({
        basePath: "./",
        name: "Test Sync",
        tsConfig: "./tsconfig.json", // optional
        tsLint: "./tslint.json", // optional
        // for more option, see ITypeCheckerOptionsInterface in bottom on readme
    })
}

import {
    CSSPlugin,
    CSSModulesPlugin,
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

class CTX {
    isProduction: boolean = false
    isTest: boolean = false

    getConfig() {
        return FuseBox.init({
            shim: {
                modernizr: {
                    exports: "Modernizr",
                    source: "src/js/modernizr.custom.js",
                },

                jquery: {
                    exports: "$",
                    source: "node_modules/jquery/dist/jquery.js",
                },

                jquerypp: {
                    source: "src/js/jquerypp.custom.js",
                },
            },

            homeDir:  dlv(PKG, "homeDir") || "src",
            output: "dist/$name.js",

            target: "browser@es5",

            cache: true,

            //            globals: {default : "*"},
            plugins: [
                WebIndexPlugin({
                    cssPath: "css",
                    template: "src/index.html",
                }),
                [
                    SassPlugin({
                        importer: true,
                        //                        resources: [{ test: /.*/, file: "resources.scss" }],
                    }),
                    PostCSSPlugin([
                        Unprefix(),
                        Autoprefixer(),
                        Cssnano(),
                    ]),
                    CSSResourcePlugin({
                        dist: "dist/css-resources",
                        inline: true,
                    }),
                    CSSPlugin({inject: true}),
                ],
                this.isProduction && QuantumPlugin({
                    css: {
                        clean: true,
                        path: "css/styles.min.css",
                    },
                    cssFiles: {
                        "default/app**": "css/app.min.css",
                        "default/bookblock**": "css/bookblock.min.css",
                    },
                    bakeApiIntoBundle: "bookblock",
                   // containedAPI: true,
                    treeshake: true,
                    uglify: true,
                }),
            ],
        })
    }

    createBundle(fuse: FuseBox, instructions: string, name: string) {
        const bundle = fuse.bundle(name)
        if (!this.isProduction) {
            bundle.watch()
            bundle.hmr()
        }
        bundle.instructions(instructions)

        return bundle
    }
}

ctx(CTX)

task("test", (context: CTX) => {
    context.isProduction = true
    const fuse = context.getConfig()
    console.dir(fuse.collectionSource.context.quantumSplitConfig)

    //     fuse.dev()
    //     console.log(fuse)
    //     setInterval(() => {
    //         console.log("OMFG")
    //         fuse.sendPageReload()
    //     }, 1000)
})

task("copy:js", async () => {
    await src("./**/*.js", { base: "./src/js" })
        .dest("./dist/js")
        .exec()
})

task("copy:images", async () => {
    await src("./**/*.jpg", { base: "./src/assets" })
        .dest("./dist/")
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

task("build", ["test:ts"], async (context: CTX) => {
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

//    context.createBundle(fuse, "~ index.ts", "vendor")

    context.createBundle(fuse, "> index.ts", "bookblock")

    await fuse.run()
})

task("test:ts", [], (context: CTX) => {
    if (process.env.NODE_ENV === "production" || context.isProduction) {
        console.log("PRODUCTION TEST")
        testSync().runSync()
    } else {
        testSync().runWatch("./src")
    }
})

task("serve", [], async (context: CTX) => {
    const fuse = FuseBox.init({
        output: "dist",
    })
    fuse.dev({
        root: "dist",
    })
    await fuse.run()
})
