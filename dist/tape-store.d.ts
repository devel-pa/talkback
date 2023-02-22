import { Options } from "./options";
import Tape from "./tape";
export default class TapeStore {
    private readonly path;
    private readonly options;
    tapes: Tape[];
    private readonly logger;
    constructor(options: Options);
    load(): Promise<void>;
    loadTapesAtDir(directory: string): Promise<void>;
    find(newTape: Tape): Tape;
    save(tape: Tape): Promise<void>;
    currentTapeId(): number;
    hasTapeBeenUsed(tapeName: string): boolean;
    resetTapeUsage(): void;
    createTapePath(tape: Tape): any;
}
