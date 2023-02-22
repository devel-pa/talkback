import TapeStore from "./tape-store";
import { Options } from "./options";
import { HttpRequest, HttpResponse } from "./types";
export default class RequestHandler {
    private readonly tapeStore;
    private readonly options;
    private readonly errorRate;
    private readonly latency;
    private readonly logger;
    constructor(tapeStore: TapeStore, options: Options);
    handle(req: HttpRequest): Promise<HttpResponse>;
    private onNoRecord;
    private makeRealRequest;
}
