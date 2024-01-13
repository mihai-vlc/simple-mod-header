import * as esbuild from "esbuild";
import { rimrafSync } from "rimraf";

rimrafSync("dist/");

const workerEntryPoints = [
    "vs/language/json/json.worker.js",
    // "vs/language/css/css.worker.js",
    // "vs/language/html/html.worker.js",
    // "vs/language/typescript/ts.worker.js",
    "vs/editor/editor.worker.js",
];

const monacoWorkers = await esbuild.context({
    logLevel: "info",
    entryPoints: workerEntryPoints.map((entry) => `node_modules/monaco-editor/esm/${entry}`),
    bundle: true,
    format: "iife",
    outbase: "node_modules/monaco-editor/esm/",
    outdir: "dist/monaco",
});

const monacoEditor = await esbuild.context({
    logLevel: "info",
    entryPoints: ["src/monaco.js"],
    bundle: true,
    format: "iife",
    outdir: "dist/monaco",
    loader: {
        ".ttf": "file",
    },
});

const optionsPage = await esbuild.context({
    logLevel: "info",
    entryPoints: ["src/options.js", "src/options.css", "src/options.html", "src/manifest.json"],
    bundle: true,
    format: "iife",
    outdir: "dist/",
    assetNames: "[name]",
    loader: {
        ".html": "copy",
        ".json": "copy",
    },
});

const args = process.argv.slice(2);

if (args[0] == "watch") {
    await monacoWorkers.rebuild();
    await monacoEditor.watch();
    await optionsPage.watch();
    console.log("starting watch mode...");
} else {
    await monacoWorkers.rebuild();
    await monacoEditor.rebuild();
    await optionsPage.rebuild();
    monacoWorkers.dispose();
    monacoEditor.dispose();
    optionsPage.dispose();
    console.log("generated files in dist/ folder");
}
