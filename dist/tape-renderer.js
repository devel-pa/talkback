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
var headers_1 = __importDefault(require("./utils/headers"));
var media_type_1 = __importDefault(require("./utils/media-type"));
var tape_1 = __importDefault(require("./tape"));
var content_encoding_1 = __importDefault(require("./utils/content-encoding"));
var bufferShim = require("buffer-shims");
var TapeRenderer = /** @class */ (function () {
    function TapeRenderer(tape) {
        this.tape = tape;
    }
    TapeRenderer.fromStore = function (raw, options) {
        return __awaiter(this, void 0, void 0, function () {
            var req, _a, tape, baseRes, resBody;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        req = __assign({}, raw.req);
                        _a = req;
                        return [4 /*yield*/, this.prepareBody(raw, req, req.body, "req")];
                    case 1:
                        _a.body = _b.sent();
                        tape = new tape_1.default(req, options);
                        tape.meta = __assign({}, raw.meta);
                        baseRes = __assign({}, raw.res);
                        return [4 /*yield*/, this.prepareBody(tape, baseRes, baseRes.body, "res")];
                    case 2:
                        resBody = _b.sent();
                        tape.res = __assign(__assign({}, baseRes), { body: resBody });
                        return [2 /*return*/, tape];
                }
            });
        });
    };
    TapeRenderer.prepareBody = function (tape, reqResObj, rawBody, metaPrefix) {
        return __awaiter(this, void 0, void 0, function () {
            var contentEncoding, isTapeUncompressed, isTapeHumanReadable, isTapeInPlainText, mediaType, bufferContent, isResAnObject;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contentEncoding = new content_encoding_1.default(reqResObj);
                        isTapeUncompressed = tape.meta[metaPrefix + "Uncompressed"];
                        isTapeHumanReadable = tape.meta[metaPrefix + "HumanReadable"];
                        isTapeInPlainText = isTapeUncompressed || contentEncoding.isUncompressed();
                        if (!(isTapeHumanReadable && isTapeInPlainText)) return [3 /*break*/, 3];
                        mediaType = new media_type_1.default(reqResObj);
                        bufferContent = rawBody;
                        isResAnObject = typeof bufferContent === "object";
                        if (isResAnObject && mediaType.isJSON()) {
                            bufferContent = JSON.stringify(bufferContent, null, 2);
                        }
                        // @ts-ignore
                        if (!isNaN(bufferContent)) {
                            bufferContent = bufferContent.toString();
                        }
                        if (headers_1.default.read(reqResObj.headers, "content-length")) {
                            headers_1.default.write(reqResObj.headers, "content-length", Buffer.byteLength(bufferContent).toString(), metaPrefix);
                        }
                        if (!isTapeUncompressed) return [3 /*break*/, 2];
                        return [4 /*yield*/, contentEncoding.compressedBody(bufferContent)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/, bufferShim.from(bufferContent)];
                    case 3: return [2 /*return*/, bufferShim.from(rawBody, "base64")];
                }
            });
        });
    };
    TapeRenderer.prototype.render = function () {
        return __awaiter(this, void 0, void 0, function () {
            var reqBody, resBody;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.bodyFor(this.tape.req, "req")];
                    case 1:
                        reqBody = _a.sent();
                        return [4 /*yield*/, this.bodyFor(this.tape.res, "res")];
                    case 2:
                        resBody = _a.sent();
                        return [2 /*return*/, {
                                meta: this.tape.meta,
                                req: __assign(__assign({}, this.tape.req), { body: reqBody }),
                                res: __assign(__assign({}, this.tape.res), { body: resBody }),
                            }];
                }
            });
        });
    };
    TapeRenderer.prototype.bodyFor = function (reqResObj, metaPrefix) {
        return __awaiter(this, void 0, void 0, function () {
            var mediaType, contentEncoding, bodyLength, isUncompressed, contentEncodingSupported, body, rawBody;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mediaType = new media_type_1.default(reqResObj);
                        contentEncoding = new content_encoding_1.default(reqResObj);
                        bodyLength = reqResObj.body.length;
                        isUncompressed = contentEncoding.isUncompressed();
                        contentEncodingSupported = isUncompressed || contentEncoding.supportedAlgorithm();
                        if (!(mediaType.isHumanReadable() &&
                            contentEncodingSupported &&
                            bodyLength > 0)) return [3 /*break*/, 3];
                        this.tape.meta[metaPrefix + "HumanReadable"] = true;
                        body = reqResObj.body;
                        if (!!isUncompressed) return [3 /*break*/, 2];
                        this.tape.meta[metaPrefix + "Uncompressed"] = true;
                        return [4 /*yield*/, contentEncoding.uncompressedBody(body)];
                    case 1:
                        body = _a.sent();
                        _a.label = 2;
                    case 2:
                        rawBody = body.toString("utf8");
                        if (mediaType.isJSON()) {
                            try {
                                return [2 /*return*/, JSON.parse(rawBody)];
                            }
                            catch (_b) {
                                return [2 /*return*/, rawBody];
                            }
                        }
                        else {
                            return [2 /*return*/, rawBody];
                        }
                        return [3 /*break*/, 4];
                    case 3: return [2 /*return*/, reqResObj.body.toString("base64")];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return TapeRenderer;
}());
exports.default = TapeRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFwZS1yZW5kZXJlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy90YXBlLXJlbmRlcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0REFBc0M7QUFDdEMsa0VBQTJDO0FBQzNDLGdEQUEwQjtBQUMxQiw4RUFBdUQ7QUFJdkQsSUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBRTNDO0lBR0Usc0JBQVksSUFBVTtRQUNwQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNuQixDQUFDO0lBRVksc0JBQVMsR0FBdEIsVUFBdUIsR0FBUSxFQUFFLE9BQWdCOzs7Ozs7d0JBQ3pDLEdBQUcsZ0JBQVEsR0FBRyxDQUFDLEdBQUcsQ0FBRSxDQUFDO3dCQUUzQixLQUFBLEdBQUcsQ0FBQTt3QkFBUSxxQkFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsRUFBQTs7d0JBQTVELEdBQUksSUFBSSxHQUFHLFNBQWlELENBQUM7d0JBRXZELElBQUksR0FBRyxJQUFJLGNBQUksQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7d0JBQ3BDLElBQUksQ0FBQyxJQUFJLGdCQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUUsQ0FBQzt3QkFDdEIsT0FBTyxnQkFBUSxHQUFHLENBQUMsR0FBRyxDQUFFLENBQUM7d0JBQ2YscUJBQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUE7O3dCQUFwRSxPQUFPLEdBQUcsU0FBMEQ7d0JBRTFFLElBQUksQ0FBQyxHQUFHLHlCQUNILE9BQU8sS0FDVixJQUFJLEVBQUUsT0FBTyxHQUNkLENBQUM7d0JBRUYsc0JB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