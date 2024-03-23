sap.ui.define(["./BaseController"], function (BaseController, MessageBox) {
	"use strict";

	return BaseController.extend("ui5.monaco.controller.Main", {
		onInit: async function() {
			const code = await fetch("Component.js").then((response) => response.text());
			this.byId("editor").setValue(code);
		},

		sayHello: function () {
			MessageBox.show("Hello World!");
		}
	});
});
