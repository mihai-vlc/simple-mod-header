import * as esbuild from "esbuild";

const workerEntryPoints = [
    "vs/language/json/json.worker.js",
    // "vs/language/css/css.worker.js",
    // "vs/language/html/html.worker.js",
    // "vs/language/typescript/ts.worker.js",
    "vs/editor/editor.worker.js",
];

await esbuild.build({
    entryPoints: workerEntryPoints.map((entry) => `node_modules/monaco-editor/esm/${entry}`),
    bundle: true,
    format: "iife",
    outbase: "node_modules/monaco-editor/esm/",
    outdir: "src/monaco",
});

await esbuild.build({
    entryPoints: ["src/monaco.js"],
    bundle: true,
    format: "iife",
    outdir: "src/monaco",
    loader: {
        ".ttf": "file",
    },
});
