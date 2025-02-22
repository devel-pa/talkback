/// <reference types="node" />
import { ReqRes } from "../types";
export default class ContentEncoding {
    private reqRes;
    constructor(reqRes: ReqRes);
    isUncompressed(): boolean;
    supportedAlgorithm(): boolean;
    contentEncoding(): any;
    uncompressedBody(body: Buffer): Promise<any>;
    compressedBody(body: string): Promise<any>;
}
