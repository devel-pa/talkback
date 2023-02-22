import { Options } from "./options";
export declare class Logger {
    static for(options: Options): Logger;
    options: Options;
    constructor(options: Options);
    info(message: any): void;
    debug(message: any): void;
    error(message: any, ...optionalParameters: any[]): void;
    formatMessage(message: any, level: string): string;
}
