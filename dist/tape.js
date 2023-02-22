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
var media_type_1 = __importDefault(require("./utils/media-type"));
var tape_renderer_1 = __importDefault(require("./tape-renderer"));
var content_encoding_1 = __importDefault(require("./utils/content-encoding"));
var URL = require("url");
var querystring = require("querystring");
var Tape = /** @class */ (function () {
    function Tape(req, options) {
        this.new = false;
        this.used = false;
        this.req = __assign({}, req);
        this.options = options;
        // This needs to happen before we erase headers since we could lose information
        this.normalizeReqBody();
        this.cleanupReqHeaders();
        this.queryParamsToIgnore = this.options.ignoreQueryParams;
        this.cleanupQueryParams();
        this.meta = {
            createdAt: new Date(),
            host: this.options.host,
        };
    }
    Tape.fromStore = function (raw, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, tape_renderer_1.default.fromStore(raw, options)];
            });
        });
    };
    Tape.prototype.cleanupReqHeaders = function () {
        var _this = this;
        var newHeaders = {};
        if (this.options.allowHeaders != undefined) {
            newHeaders = this.options.allowHeaders.reduce(function (headers, header) {
                var lowerHeader = header.toLowerCase();
                if (lowerHeader in _this.req.headers) {
                    headers[lowerHeader] = _this.req.headers[lowerHeader];
                }
                return headers;
            }, {});
        }
        else {
            newHeaders = __assign({}, this.req.headers);
        }
        this.options.ignoreHeaders.forEach(function (h) { return delete newHeaders[h]; });
        this.req = __assign(__assign({}, this.req), { headers: newHeaders });
    };
    Tape.prototype.cleanupQueryParams = function () {
        if (this.queryParamsToIgnore.length === 0) {
            return;
        }
        var url = URL.parse(this.req.url, true);
        if (!url.search) {
            return;
        }
        var query = __assign({}, url.query);
        this.queryParamsToIgnore.forEach(function (q) { return delete query[q]; });
        var newQuery = querystring.stringify(query);
        if (newQuery) {
            url.query = query;
            url.search = "?" + newQuery;
        }
        else {
            url.query = null;
            url.search = null;
        }
        this.req.url = URL.format(url);
    };
    Tape.prototype.normalizeReqBody = function () {
        var mediaType = new media_type_1.default(this.req);
        var contentEncoding = new content_encoding_1.default(this.req);
        if (contentEncoding.isUncompressed() &&
            mediaType.isJSON() &&
            this.req.body.length > 0) {
            try {
                var jsonString = JSON.parse(this.req.body.toString());
                this.req.body = Buffer.from(JSON.stringify(jsonString, null, 2));
            }
            catch (err) {
                this.req.body = Buffer.from(this.req.body.toString());
            }
        }
    };
    Tape.prototype.clone = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tapeRenderer, raw;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tapeRenderer = new tape_renderer_1.default(this);
                        return [4 /*yield*/, tapeRenderer.render()];
                    case 1:
                        raw = _a.sent();
                        return [2 /*return*/, Tape.fromStore(raw, this.options)];
                }
            });
        });
    };
    return Tape;
}());
exports.default = Tape;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy90YXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrRUFBMkM7QUFDM0Msa0VBQTJDO0FBQzNDLDhFQUF1RDtBQUl2RCxJQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDM0IsSUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBRTNDO0lBV0UsY0FBWSxHQUFRLEVBQUUsT0FBZ0I7UUFIdEMsUUFBRyxHQUFZLEtBQUssQ0FBQztRQUNyQixTQUFJLEdBQVksS0FBSyxDQUFDO1FBR3BCLElBQUksQ0FBQyxHQUFHLGdCQUFRLEdBQUcsQ0FBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBRXZCLCtFQUErRTtRQUMvRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUV4QixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUV6QixJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztRQUMxRCxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUUxQixJQUFJLENBQUMsSUFBSSxHQUFHO1lBQ1YsU0FBUyxFQUFFLElBQUksSUFBSSxFQUFFO1lBQ3JCLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUk7U0FDeEIsQ0FBQztJQUNKLENBQUM7SUFFWSxjQUFTLEdBQXRCLFVBQXVCLEdBQVEsRUFBRSxPQUFnQjs7O2dCQUMvQyxzQkFBTyx1QkFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLEVBQUM7OztLQUM3QztJQUVELGdDQUFpQixHQUFqQjtRQUFBLGlCQWtCQztRQWpCQyxJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7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