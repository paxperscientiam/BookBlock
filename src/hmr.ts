import { FuseBox, Sparky } from "fuse-box"

console.log("SHIT")

const customizedHMRPlugin = {
    hmrUpdate: ({ type, path, content, dependants }) => {
        // Dependants only available when emitHMRDependencies = true
   //     if (type === "ts") {
            FuseBox.flush();
            FuseBox.dynamic(path, content);
            if (FuseBox.mainFile) {
                FuseBox.import(FuseBox.mainFile);
            }
            return true;
//        }
    },
};

let alreadyRegistered = false;
if (!window.hmrRegistered) {
    window.hmrRegistered = true;
    FuseBox.addPlugin(customizedHMRPlugin);
}
