import Control from "sap/ui/core/Control";
import RenderManager from "sap/ui/core/RenderManager";
import { MetadataOptions } from "sap/ui/core/Element";
import includeStylesheet from "sap/ui/dom/includeStylesheet";

// How to integrate monaco-editor:
// https://github.com/microsoft/monaco-editor/blob/HEAD/docs/integrate-amd.md

type MonacoEditorFactory = {
	editor: {
		create: (domElement: Element, options: object) => object;
	}
};

type MonacoRequireFunction = {
	(module: string[], callback: (monaco: MonacoEditorFactory) => void): void;
	config: (config: object) => void;
};

// shim the monaco-editor to get the exported module
sap.ui.loader.config({
	shim: {
		"monaco-editor/min/vs/loader": {
			exports: "require",
			amd: true,
			deps: [],
		},
	},
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: import monaco-editor as an AMD module
const monacoEditorLoaded = import("monaco-editor/min/vs/loader").then((monacoLoader) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	const require =  monacoLoader.default as MonacoRequireFunction;
	const {config} = require;
	// as we integrate monaco-editor as an AMD module, we need to configure the loader
	config({
		paths: { vs: sap.ui.require.toUrl("monaco-editor/min/vs") },
	});
	return require;
});

/**
 * @namespace ui5.monaco.ts
 */
export default class Editor extends Control {

	// The following three lines were generated and should remain as-is to make TypeScript aware of the constructor signatures
	constructor(idOrSettings?: string | $EditorSettings);
	constructor(id?: string, settings?: $EditorSettings);
	constructor(id?: string, settings?: $EditorSettings) { super(id, settings); }

	static readonly metadata: MetadataOptions = {
		properties: {
			value: "string",
			language: {
				type: "string",
				defaultValue: "javascript",
			},
		},
	}

	init(): void {
		// include the monaco styles (ensures the assets to be packaged with the app)
		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		includeStylesheet(
			sap.ui.require.toUrl("monaco-editor/min/vs/editor/editor.main.css")
		);
	}

	onAfterRendering(): void {
		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		monacoEditorLoaded.then((monacoEditor) => {
			monacoEditor(
				["vs/editor/editor.main"],
				(monaco) => {
					/*var editor =*/ monaco.editor.create(this.getDomRef(), {
						value: this.getValue() || "",
						language: this.getLanguage(),
						minimap: { enabled: false },
						scrollBeyondLastLine: false,
						roundedSelection: false,
						automaticLayout: true,
						theme: "vs-dark",
						bracketPairColorization: { enabled: true }, // does not work: https://github.com/microsoft/monaco-editor/issues/3013
						autoIndent: true,
						insertSpaces: false,
						formatOnPaste: true,
						formatOnType: true,
						folding: true,
						tabSize: 3,
						//autoIndent: "full",
						detectIndentation: true,
					});
				}
			);
		});
	}

	renderer = {
		apiVersion: 4,
		render: (rm: RenderManager, control: Editor) => {
			rm.openStart("div", control);
			rm.style("width", "100%");
			rm.style("height", "100%");
			rm.openEnd();
			rm.close("div");
		}
	}
}
