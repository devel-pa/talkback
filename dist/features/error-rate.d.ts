import { Options } from "../options";
import Tape from "../tape";
import { Req, Res } from "../types";
export default class ErrorRate {
    private readonly options;
    private readonly logger;
    constructor(options: Options);
    shouldSimulate(req: Req, tape?: Tape): boolean;
    simulate(req: Req): Res;
}
