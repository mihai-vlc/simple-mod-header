import * as monaco from "monaco-editor/esm/vs/editor/editor.main.js";

self.MonacoEnvironment = {
    getWorkerUrl: function (moduleId, label) {
        if (label === "json") {
            return "./monaco/vs/language/json/json.worker.js";
        }
        // if (label === "css" || label === "scss" || label === "less") {
        //     return "./monaco/vs/language/css/css.worker.js";
        // }
        // if (label === "html" || label === "handlebars" || label === "razor") {
        //     return "./monaco/vs/language/html/html.worker.js";
        // }
        // if (label === "typescript" || label === "javascript") {
        //     return "./monaco/vs/language/typescript/ts.worker.js";
        // }
        return "./monaco/vs/editor/editor.worker.js";
    },
};

document.querySelectorAll(".js-editor").forEach((el) => {
    const target = el.getAttribute("data-target");
    const targetElement = document.querySelector(target);
    const editor = monaco.editor.create(el, {
        language: "json",
        theme: "vs-dark",
        automaticLayout: true,
    });

    editor.setValue(targetElement.value);

    editor.onDidChangeModelContent(function () {
        targetElement.value = editor.getValue();
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, function () {
        console.log("SAVE pressed!");
    });
});
