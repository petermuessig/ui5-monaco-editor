import MessageBox from "sap/m/MessageBox";
import BaseController from "./BaseController";
import Editor from "../control/Editor";

/**
 * @namespace ui5.monaco.ts.controller
 */
export default class Main extends BaseController {
	public async onInit() {
		const code = await fetch("Component.js").then((response) => response.text());
		(this.byId("editor") as Editor).setValue(code);
	}
	public sayHello(): void {
		MessageBox.show("Hello World!");
	}
}
