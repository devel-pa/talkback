import { Options } from "./options";
import Tape from "./tape";
export default class TapeMatcher {
    private readonly tape;
    private readonly options;
    private readonly logger;
    constructor(tape: Tape, options: Options);
    sameAs(otherTape: Tape): boolean;
    private isSameBody;
    private isSameHeaders;
    private isSameMethod;
    private isSameUrl;
}
