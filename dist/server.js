"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var request_handler_1 = __importDefault(require("./request-handler"));
var summary_1 = __importDefault(require("./summary"));
var tape_store_1 = __importDefault(require("./tape-store"));
var http = __importStar(require("http"));
var https = __importStar(require("https"));
var fs = __importStar(require("fs"));
var logger_1 = require("./logger");
var TalkbackServer = /** @class */ (function () {
    function TalkbackServer(options) {
        this.closed = false;
        this.options = options;
        this.tapeStore = new tape_store_1.default(this.options);
        this.requestHandler = new request_handler_1.default(this.tapeStore, this.options);
        this.closeSignalHandler = this.close.bind(this);
        this.logger = logger_1.Logger.for(this.options);
    }
    TalkbackServer.prototype.handleRequest = function (rawReq, res) {
        var _this = this;
        var reqBody = [];
        rawReq.on("data", function (chunk) {
            reqBody.push(chunk);
        }).on("end", function () { return __awaiter(_this, void 0, void 0, function () {
            var req, fRes, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        req = {
                            headers: rawReq.headers,
                            url: rawReq.url,
                            method: rawReq.method,
                            body: Buffer.concat(reqBody)
                        };
                        return [4 /*yield*/, this.requestHandler.handle(req)];
                    case 1:
                        fRes = _a.sent();
                        res.writeHead(fRes.status, fRes.headers);
                        res.end(fRes.body);
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _a.sent();
                        console.error("Error handling request", ex_1);
                        res.statusCode = 500;
                        res.end();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    TalkbackServer.prototype.start = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var handleRequest, serverFactory;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tapeStore.load()];
                    case 1:
                        _a.sent();
                        handleRequest = this.handleRequest.bind(this);
                        serverFactory = this.options.https.enabled ? function () {
                            var httpsOpts = {
                                key: fs.readFileSync(_this.options.https.keyPath),
                                cert: fs.readFileSync(_this.options.https.certPath)
                            };
                            return https.createServer(httpsOpts, handleRequest);
                        } : function () { return http.createServer(handleRequest); };
                        this.server = serverFactory();
                        this.logger.info("Starting talkback on port ".concat(this.options.port));
                        this.server.listen(this.options.port, callback);
                        process.on("exit", this.closeSignalHandler);
                        process.on("SIGINT", this.closeSignalHandler);
                        process.on("SIGTERM", this.closeSignalHandler);
                        return [2 /*return*/, this.server];
                }
            });
        });
    };
    TalkbackServer.prototype.hasTapeBeenUsed = function (tapeName) {
        return this.tapeStore.hasTapeBeenUsed(tapeName);
    };
    TalkbackServer.prototype.resetTapeUsage = function () {
        this.tapeStore.resetTapeUsage();
    };
    TalkbackServer.prototype.close = function (callback) {
        if (this.closed) {
            return;
        }
        this.closed = true;
        this.server.close(callback);
        process.removeListener("exit", this.closeSignalHandler);
        process.removeListener("SIGINT", this.closeSignalHandler);
        process.removeListener("SIGTERM", this.closeSignalHandler);
        if (this.options.summary) {
            var summary = new summary_1.default(this.tapeStore.tapes, this.options);
            summary.print();
        }
    };
    return TalkbackServer;
}());
exports.default = TalkbackServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3NlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0VBQThDO0FBQzlDLHNEQUErQjtBQUMvQiw0REFBb0M7QUFFcEMseUNBQTRCO0FBQzVCLDJDQUE4QjtBQUM5QixxQ0FBd0I7QUFHeEIsbUNBQStCO0FBRS9CO0lBU0Usd0JBQVksT0FBZ0I7UUFIcEIsV0FBTSxHQUFZLEtBQUssQ0FBQTtRQUk3QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQTtRQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksb0JBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDNUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLHlCQUFjLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7UUFFdEUsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQy9DLElBQUksQ0FBQyxNQUFNLEdBQUcsZUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDeEMsQ0FBQztJQUVELHNDQUFhLEdBQWIsVUFBYyxNQUE0QixFQUFFLEdBQXdCO1FBQXBFLGlCQXNCQztRQXJCQyxJQUFJLE9BQU8sR0FBRyxFQUFrQixDQUFBO1FBQ2hDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQUMsS0FBSztZQUN0QixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ3JCLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUU7Ozs7Ozt3QkFFSCxHQUFHLEdBQVE7NEJBQ2YsT0FBTyxFQUFFLE1B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