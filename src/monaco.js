import * as monaco from "monaco-editor/esm/vs/editor/editor.main.js";
import DragBar from "./DragBar";
import { initVimMode } from "monaco-vim";

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

const snippets = [
    {
        label: "Set response header",
        documentation: "Set value for a response header",
        insertText: `{
    "id": 1,
    "priority": 1,
    "action": {
        "type": "modifyHeaders",
        "responseHeaders": [
            {
                "header": "content-type",
                "operation": "set",
                "value": "text/plain"
            }
        ]
    },
    "condition": {
        "resourceTypes": [
            "main_frame"
        ],
        "urlFilter": "*csv|"
    }
}`,
    },
    {
        label: "Redirect by regex",
        description: "Redirect by regex",
        insertText: `{
    "id": 4,
    "condition": {
        "regexFilter": "^https?://([^?]+)$",
        "requestDomains": ["example.com"],
        "resourceTypes": ["main_frame"]
    },
    "action": {
        "type": "redirect",
        "redirect": {
            "regexSubstitution": "https://\\\\1?redirected_by_regex"
        }
    }
}`,
    },
];
// https://github.com/mdn/webextensions-examples/blob/main/dnr-redirect-url/redirect-rules.json

monaco.languages.registerCompletionItemProvider("json", {
    provideCompletionItems(model) {
        if (!model.uri.path.endsWith("rules.json")) {
            return {
                suggestions: [],
            };
        }

        // we need to build a new list of objects each time we provide a completion
        const monacoSnippets = snippets.map((s) => {
            return {
                ...s,
                kind: monaco.languages.CompletionItemKind.Snippet,
            };
        });
        return {
            suggestions: monacoSnippets.map((s) => Object.assign({}, s)),
        };
    },
});

document.querySelectorAll(".js-editor").forEach((el) => {
    const valueElement = document.querySelector(el.getAttribute("data-value-target"));
    const saveElement = document.querySelector(el.getAttribute("data-save-target"));

    const modelUri = monaco.Uri.parse("file:///" + el.getAttribute("data-file-name"));
    const model = monaco.editor.createModel(valueElement.value, "json", modelUri);
    const editor = monaco.editor.create(el, {
        language: "json",
        theme: "vs-dark",
        automaticLayout: true,
        fontSize: "20px",
        renderWhitespace: "all",
        model: model,
    });

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

    new DragBar(el.parentElement.querySelector(".js-dragbar"), el);

    let vimMode = null;

    el.parentElement.querySelector(".js-vim-mode").addEventListener("change", (e) => {
        if (e.target.checked) {
            vimMode = initVimMode(editor, el.parentElement.querySelector(".js-vim-status-bar"));
        } else {
            if (vimMode) {
                vimMode.dispose();
            }
        }
    });

    const snippetsDropdown = el.parentElement.querySelector(".js-snippets-list");

    if (snippetsDropdown) {
        snippets.forEach((s) => {
            var opt = document.createElement("option");
            opt.value = s.label;
            opt.innerHTML = s.label;
            snippetsDropdown.appendChild(opt);
        });

        snippetsDropdown.addEventListener("change", () => {
            const selectedSnippet = snippets.find((s) => s.label === snippetsDropdown.value);

            if (selectedSnippet) {
                editor.focus();
                const snippetController = editor.getContribution("snippetController2");
                snippetController.insert(selectedSnippet.insertText);
                snippetsDropdown.value = "";
                // snippetController.insert( "for (const ${2:defaultElement} of ${1:defaultArray}) {\n\tconsole.log(${2});\n}");
            }
        });
    }
});
