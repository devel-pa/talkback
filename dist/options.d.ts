import Tape from "./tape";
import { Req, MatchingContext } from "./types";
export declare const RecordMode: {
    NEW: string;
    OVERWRITE: string;
    DISABLED: string;
    ALL: string[];
};
export declare const FallbackMode: {
    NOT_FOUND: string;
    PROXY: string;
    ALL: string[];
};
export interface Options {
    host: string;
    port: number;
    path: string;
    record: string | ((req: Req) => string);
    fallbackMode: string | ((req: Req) => string);
    name: string;
    tapeNameGenerator?: (tapeNumber: number, tape: Tape) => string;
    https: {
        enabled: boolean;
        keyPath?: string;
        certPath?: string;
    };
    allowHeaders: string[];
    ignoreHeaders: string[];
    ignoreQueryParams: string[];
    ignoreBody: boolean;
    bodyMatcher?: (tape: Tape, req: Req) => boolean;
    urlMatcher?: (tape: Tape, req: Req) => boolean;
    requestDecorator?: (req: Req, context: MatchingContext) => Req;
    responseDecorator?: (tape: Tape, req: Req, context: MatchingContext) => Tape;
    tapeDecorator?: (tape: Tape, context: MatchingContext) => Tape;
    latency: number | number[] | ((req: Req) => number);
    errorRate: number | ((req: Req) => number);
    silent: boolean;
    summary: boolean;
    debug: boolean;
}
export declare const DefaultOptions: Options;
export default class OptionsFactory {
    static prepare(usrOpts?: Partial<Options>): Options;
    static validateOptions(opts: Options): void;
    static validateRecord(record: any): void;
    static validateFallbackMode(fallbackMode: any): void;
    static validateLatency(latency: any): void;
    static validateErrorRate(errorRate: any): void;
}
