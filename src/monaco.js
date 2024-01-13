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
    const valueElement = document.querySelector(el.getAttribute("data-value-target"));
    const saveElement = document.querySelector(el.getAttribute("data-save-target"));
    console.log(saveElement);

    const editor = monaco.editor.create(el, {
        language: "json",
        theme: "vs-dark",
        automaticLayout: true,
        fontSize: "20px",
    });

    editor.setValue(valueElement.value);

    editor.onDidChangeModelContent(function () {
        valueElement.value = editor.getValue();
    });

    editor.addAction({
        id: "save",
        label: "save",
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS],
        run: function () {
            saveElement.click();
        },
    });
});
