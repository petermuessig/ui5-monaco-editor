import { PropertyBindingInfo } from "sap/ui/base/ManagedObject";
import { $ControlSettings } from "sap/ui/core/Control";

declare module "./Editor" {

    /**
     * Interface defining the settings object used in constructor calls
     */
    interface $EditorSettings extends $ControlSettings {
        value?: string | PropertyBindingInfo;
        language?: string | PropertyBindingInfo;
    }

    export default interface Editor {

        // property: value
        getValue(): string;
        setValue(value: string): this;

        // property: language
        getLanguage(): string;
        setLanguage(language: string): this;
    }
}
