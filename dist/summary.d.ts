import Tape from "./tape";
import { Options } from "./options";
export default class Summary {
    private tapes;
    private options;
    private logger;
    constructor(tapes: Tape[], options: Options);
    print(): void;
}
