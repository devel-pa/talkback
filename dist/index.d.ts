import { Options } from "./options";
declare const talkback: {
    (options: Partial<Options>): import("./server").default;
    Options: {
        Default: Options;
        FallbackMode: {
            NOT_FOUND: string;
            PROXY: string;
            ALL: string[];
        };
        RecordMode: {
            NEW: string;
            OVERWRITE: string;
            DISABLED: string;
            ALL: string[];
        };
    };
    requestHandler(options: Partial<Options>): Promise<import("./request-handler").default>;
};
export default talkback;
