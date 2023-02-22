"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var JSON5 = require("json5");
var mkdirp = require("mkdirp");
var tape_1 = __importDefault(require("./tape"));
var tape_matcher_1 = __importDefault(require("./tape-matcher"));
var tape_renderer_1 = __importDefault(require("./tape-renderer"));
var logger_1 = require("./logger");
var TapeStore = /** @class */ (function () {
    function TapeStore(options) {
        this.path = path.normalize(options.path + "/");
        this.options = options;
        this.tapes = [];
        this.logger = logger_1.Logger.for(this.options);
    }
    TapeStore.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mkdirp.sync(this.path);
                        return [4 /*yield*/, this.loadTapesAtDir(this.path)];
                    case 1:
                        _a.sent();
                        this.logger.info("Loaded ".concat(this.tapes.length, " tapes from ").concat(this.path));
                        return [2 /*return*/];
                }
            });
        });
    };
    TapeStore.prototype.loadTapesAtDir = function (directory) {
        return __awaiter(this, void 0, void 0, function () {
            var items, i, filename, fullPath, stat, data, raw, tape, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        items = fs.readdirSync(directory);
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < items.length)) return [3 /*break*/, 8];
                        filename = items[i];
                        fullPath = "".concat(directory).concat(filename);
                        stat = fs.statSync(fullPath);
                        if (!!stat.isDirectory()) return [3 /*break*/, 6];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        data = fs.readFileSync(fullPath, "utf8");
                        raw = JSON5.parse(data);
                        return [4 /*yield*/, tape_1.default.fromStore(raw, this.options)];
                    case 3:
                        tape = _a.sent();
                        tape.path = filename;
                        this.tapes.push(tape);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        this.logger.error("Error reading tape ".concat(fullPath), e_1.message);
                        return [3 /*break*/, 5];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        this.loadTapesAtDir(fullPath + "/");
                        _a.label = 7;
                    case 7:
                        i++;
                        return [3 /*break*/, 1];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    TapeStore.prototype.find = function (newTape) {
        var _this = this;
        var foundTape = this.tapes.find(function (t) {
            _this.logger.debug("Comparing against tape ".concat(t.path));
            return new tape_matcher_1.default(t, _this.options).sameAs(newTape);
        });
        if (foundTape) {
            foundTape.used = true;
            this.logger.info("Found matching tape for ".concat(newTape.req.url, " at ").concat(foundTape.path));
            return foundTape;
        }
    };
    TapeStore.prototype.save = function (tape) {
        return __awaiter(this, void 0, void 0, function () {
            var tapePath, fullFilename, tapeRenderer, toSave;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tape.new = true;
                        tape.used = true;
                        tapePath = tape.path;
                        if (tapePath) {
                            fullFilename = path.join(this.path, tapePath);
                        }
                        else {
                            // If the tape doesn't have a path then it's new
                            this.tapes.push(tape);
                            fullFilename = this.createTapePath(tape);
                            tape.path = path.relative(this.path, fullFilename);
                        }
                        this.logger.info("Saving request ".concat(tape.req.url, " at ").concat(tape.path));
                        tapeRenderer = new tape_renderer_1.default(tape);
                        return [4 /*yield*/, tapeRenderer.render()];
                    case 1:
                        toSave = _a.sent();
                        fs.writeFileSync(fullFilename, JSON5.stringify(toSave, null, 4));
                        return [2 /*return*/];
                }
            });
        });
    };
    TapeStore.prototype.currentTapeId = function () {
        return this.tapes.length;
    };
    TapeStore.prototype.hasTapeBeenUsed = function (tapeName) {
        return this.tapes.some(function (t) { return t.used && t.path === tapeName; });
    };
    TapeStore.prototype.resetTapeUsage = function () {
        return this.tapes.forEach(function (t) { return t.used = false; });
    };
    TapeStore.prototype.createTapePath = function (tape) {
        var currentTapeId = this.currentTapeId();
        var tapePath = "unnamed-".concat(currentTapeId, ".json5");
        if (this.options.tapeNameGenerator) {
            tapePath = this.options.tapeNameGenerator(currentTapeId, tape);
        }
        var result = path.normalize(path.join(this.options.path, tapePath));
        if (!result.endsWith(".json5")) {
            result = "".concat(result, ".json5");
        }
        var dir = path.dirname(result);
        mkdirp.sync(dir);
        return result;
    };
    return TapeStore;
}());
exports.default = TapeStore;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFwZS1zdG9yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy90YXBlLXN0b3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ3hCLElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUM1QixJQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUE7QUFDOUIsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0FBRWhDLGdEQUF5QjtBQUN6QixnRUFBd0M7QUFDeEMsa0VBQTBDO0FBQzFDLG1DQUErQjtBQUUvQjtJQU1FLG1CQUFZLE9BQWdCO1FBQzFCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFBO1FBQzlDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFBO1FBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFBO1FBRWYsSUFBSSxDQUFDLE1BQU0sR0FBRyxlQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUN4QyxDQUFDO0lBRUssd0JBQUksR0FBVjs7Ozs7d0JBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7d0JBRXRCLHFCQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFBOzt3QkFBcEMsU0FBb0MsQ0FBQTt3QkFDcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQVUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLHlCQUFlLElBQUksQ0FBQyxJQUFJLENBQUUsQ0FBQyxDQUFBOzs7OztL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