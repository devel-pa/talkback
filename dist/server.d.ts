/// <reference types="node" />
import TapeStore from "./tape-store";
import * as http from "http";
import { Options } from "./options";
export default class TalkbackServer {
    private readonly options;
    readonly tapeStore: TapeStore;
    private requestHandler;
    private readonly closeSignalHandler?;
    private server?;
    private closed;
    private readonly logger;
    constructor(options: Options);
    handleRequest(rawReq: http.IncomingMessage, res: http.ServerResponse): void;
    start(callback?: () => void): Promise<http.Server>;
    hasTapeBeenUsed(tapeName: string): boolean;
    resetTapeUsage(): void;
    close(callback?: () => void): void;
}
