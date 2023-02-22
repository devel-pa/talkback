import { Options } from "./options";
import { Metadata, Req, Res } from "./types";
export default class Tape {
    req: Req;
    res?: Res;
    options: Options;
    queryParamsToIgnore: string[];
    meta: Metadata;
    path?: string;
    new: boolean;
    used: boolean;
    constructor(req: Req, options: Options);
    static fromStore(raw: any, options: Options): Promise<Tape>;
    cleanupReqHeaders(): void;
    cleanupQueryParams(): void;
    normalizeReqBody(): void;
    clone(): Promise<Tape>;
}
