// How to integrate monaco-editor:
// https://github.com/microsoft/monaco-editor/blob/HEAD/docs/integrate-amd.md

// shim the monaco-editor to get the exported module
sap.ui.loader.config({
	shim: {
		"monaco-editor/min/vs/loader": {
			exports: "require",
		},
	},
});

// define the monaco-editor control
sap.ui.define([
	"sap/ui/core/Control",
	"sap/ui/dom/includeStylesheet",
	"monaco-editor/min/vs/loader",
],
function (Control, includeStylesheet, monacoLoader) {
	"use strict";

	// as we integrate monaco-editor as an AMD module, we need to configure the loader
	monacoLoader.config({
		paths: { vs: sap.ui.require.toUrl("monaco-editor/min/vs") },
	});

	return Control.extend("ui5.monaco.control.Editor", {
		metadata: {
			properties: {
				value: "string",
				language: {
					type: "string",
					defaultValue: "javascript",
				},
			},
		},

		init: function () {
			// include the monaco styles (ensures the assets to be packaged with the app)
			includeStylesheet(
				sap.ui.require.toUrl("monaco-editor/min/vs/editor/editor.main.css")
			);
		},

		onAfterRendering: function () {
			monacoLoader(["vs/editor/editor.main"], function () {
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
			}.bind(this));
		},

		renderer: {
			apiVersion: 2,
			render: function (rm, control) {
				rm.openStart("div", control);
				rm.style("width", "100%");
				rm.style("height", "100%");
				rm.openEnd();
				rm.close("div");
			},
		},
	});
});
