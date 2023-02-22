"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var uuid_1 = require("uuid");
var fetch = require("node-fetch");
var tape_1 = __importDefault(require("./tape"));
var options_1 = __importStar(require("./options"));
var error_rate_1 = __importDefault(require("./features/error-rate"));
var latency_1 = __importDefault(require("./features/latency"));
var logger_1 = require("./logger");
var RequestHandler = /** @class */ (function () {
    function RequestHandler(tapeStore, options) {
        this.tapeStore = tapeStore;
        this.options = options;
        this.errorRate = new error_rate_1.default(this.options);
        this.latency = new latency_1.default(this.options);
        this.logger = logger_1.Logger.for(this.options);
    }
    RequestHandler.prototype.handle = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var matchingContext, recordMode, newTape, matchingTape, resObj, responseTape, clonedTape, resTape;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        matchingContext = {
                            id: (0, uuid_1.v4)()
                        };
                        recordMode = typeof (this.options.record) === "string" ? this.options.record : this.options.record(req);
                        options_1.default.validateRecord(recordMode);
                        if (this.options.requestDecorator) {
                            req = this.options.requestDecorator(req, matchingContext);
                            if (!req) {
                                throw new Error("requestDecorator didn't return a req object");
                            }
                        }
                        newTape = new tape_1.default(req, this.options);
                        matchingTape = this.tapeStore.find(newTape);
                        if (!(recordMode !== options_1.RecordMode.OVERWRITE && matchingTape)) return [3 /*break*/, 2];
                        responseTape = matchingTape;
                        if (this.errorRate.shouldSimulate(req, matchingTape)) {
                            return [2 /*return*/, this.errorRate.simulate(req)];
                        }
                        return [4 /*yield*/, this.latency.simulate(req, matchingTape)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 2:
                        if (matchingTape) {
                            responseTape = matchingTape;
                        }
                        else {
                            responseTape = newTape;
                        }
                        if (!(recordMode === options_1.RecordMode.NEW || recordMode === options_1.RecordMode.OVERWRITE)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.makeRealRequest(req)];
                    case 3:
                        resObj = _a.sent();
                        responseTape.res = __assign({}, resObj);
                        if (this.options.tapeDecorator) {
                            responseTape = this.options.tapeDecorator(responseTape, matchingContext);
                            if (!responseTape) {
                                throw new Error("tapeDecorator didn't return a tape object");
                            }
                        }
                        return [4 /*yield*/, this.tapeStore.save(responseTape)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, this.onNoRecord(req)];
                    case 6:
                        resObj = _a.sent();
                        responseTape.res = __assign({}, resObj);
                        _a.label = 7;
                    case 7:
                        resObj = responseTape.res;
                        if (!this.options.responseDecorator) return [3 /*break*/, 9];
                        return [4 /*yield*/, responseTape.clone()];
                    case 8:
                        clonedTape = _a.sent();
                        resTape = this.options.responseDecorator(clonedTape, req, matchingContext);
                        if (!resTape) {
                            throw new Error("responseDecorator didn't return a tape object");
                        }
                        if (resTape.res.headers["content-length"]) {
                            resTape.res.headers["content-length"] = resTape.res.body.length;
                        }
                        resObj = resTape.res;
                        _a.label = 9;
                    case 9: return [2 /*return*/, resObj];
                }
            });
        });
    };
    RequestHandler.prototype.onNoRecord = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var fallbackMode;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fallbackMode = typeof (this.options.fallbackMode) === "string" ? this.options.fallbackMode : this.options.fallbackMode(req);
                        options_1.default.validateFallbackMode(fallbackMode);
                        this.logger.info("Tape for ".concat(req.url, " not found and recording is disabled (fallbackMode: ").concat(fallbackMode, ")"));
                        this.logger.info({
                            url: req.url,
                            headers: req.headers
                        });
                        if (!(fallbackMode === options_1.FallbackMode.PROXY)) return [3 /*break*/, 3];
                        if (this.errorRate.shouldSimulate(req, undefined)) {
                            return [2 /*return*/, this.errorRate.simulate(req)];
                        }
                        return [4 /*yield*/, this.latency.simulate(req, undefined)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.makeRealRequest(req)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [2 /*return*/, {
                            status: 404,
                            headers: { "content-type": ["text/plain"] },
                            body: Buffer.from("talkback - tape not found")
                        }];
                }
            });
        });
    };
    RequestHandler.prototype.makeRealRequest = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var fetchBody, method, url, body, headers, host, fRes, buff;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = req.method, url = req.url, body = req.body;
                        fetchBody = body;
                        headers = __assign({}, req.headers);
                        delete headers.host;
                        host = this.options.host;
                        this.logger.info("Making real request to ".concat(host).concat(url));
                        if (method === "GET" || method === "HEAD") {
                            fetchBody = null;
                        }
                        return [4 /*yield*/, fetch(host + url, { method: method, headers: headers, body: fetchBody, compress: false, redirect: "manual" })];
                    case 1:
                        fRes = _a.sent();
                        return [4 /*yield*/, fRes.buffer()];
                    case 2:
                        buff = _a.sent();
                        return [2 /*return*/, {
                                status: fRes.status,
                                headers: fRes.headers.raw(),
                                body: buff
                            }];
                }
            });
        });
    };
    return RequestHandler;
}());
exports.default = RequestHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC1oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3JlcXVlc3QtaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSw2QkFBb0M7QUFFcEMsSUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFBO0FBRW5DLGdEQUF5QjtBQUN6QixtREFBMkU7QUFDM0UscUVBQTZDO0FBQzdDLCtEQUF3QztBQUV4QyxtQ0FBK0I7QUFFL0I7SUFPRSx3QkFBWSxTQUFvQixFQUFFLE9BQWdCO1FBQ2hELElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFBO1FBQzFCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFBO1FBQ3RCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxvQkFBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUM1QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksaUJBQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDeEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxlQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUN4QyxDQUFDO0lBRUssK0JBQU0sR0FBWixVQUFhLEdBQWdCOzs7Ozs7d0JBQ3JCLGVBQWUsR0FBb0I7NEJBQ3ZDLEVBQUUsRUFBRSxJQUFBLFNBQU0sR0FBRTt5QkFDYixDQUFBO3dCQUNLLFVBQVUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTt3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