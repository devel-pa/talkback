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
var zlib = require("zlib");
var headers_1 = __importDefault(require("./headers"));
var ALGORITHMS = {
    gzip: { compress: zlib.gzipSync, uncompress: zlib.gunzipSync },
    deflate: { compress: zlib.deflateSync, uncompress: zlib.inflateSync },
    br: { compress: zlib.brotliCompressSync, uncompress: zlib.brotliDecompressSync }
};
var ContentEncoding = /** @class */ (function () {
    function ContentEncoding(reqRes) {
        this.reqRes = reqRes;
    }
    ContentEncoding.prototype.isUncompressed = function () {
        var contentEncoding = this.contentEncoding();
        return !contentEncoding || contentEncoding === "identity";
    };
    ContentEncoding.prototype.supportedAlgorithm = function () {
        var contentEncoding = this.contentEncoding();
        return Object.keys(ALGORITHMS).includes(contentEncoding);
    };
    ContentEncoding.prototype.contentEncoding = function () {
        return headers_1.default.read(this.reqRes.headers, "content-encoding");
    };
    ContentEncoding.prototype.uncompressedBody = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var contentEncoding;
            return __generator(this, function (_a) {
                contentEncoding = this.contentEncoding();
                if (!this.supportedAlgorithm()) {
                    throw new Error("Unsupported content-encoding ".concat(contentEncoding));
                }
                return [2 /*return*/, ALGORITHMS[contentEncoding].uncompress(body)];
            });
        });
    };
    ContentEncoding.prototype.compressedBody = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var contentEncoding;
            return __generator(this, function (_a) {
                contentEncoding = this.contentEncoding();
                if (!this.supportedAlgorithm()) {
                    throw new Error("Unsupported content-encoding ".concat(contentEncoding));
                }
                return [2 /*return*/, ALGORITHMS[contentEncoding].compress(body)];
            });
        });
    };
    return ContentEncoding;
}());
exports.default = ContentEncoding;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC1lbmNvZGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9jb250ZW50LWVuY29kaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQzVCLHNEQUErQjtBQUUvQixJQUFNLFVBQVUsR0FBRztJQUNqQixJQUFJLEVBQUUsRUFBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBQztJQUM1RCxPQUFPLEVBQUUsRUFBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBQztJQUNuRSxFQUFFLEVBQUUsRUFBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsb0JBQW9CLEVBQUM7Q0FDL0UsQ0FBQTtBQUlEO0lBR0UseUJBQVksTUFBYztRQUN4QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtJQUN0QixDQUFDO0lBRUQsd0NBQWMsR0FBZDtRQUNFLElBQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQTtRQUM5QyxPQUFPLENBQUMsZUFBZSxJQUFJLGVBQWUsS0FBSyxVQUFVLENBQUE7SUFDM0QsQ0FBQztJQUVELDRDQUFrQixHQUFsQjtRQUNFLElBQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQTtRQUM5QyxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFBO0lBQzFELENBQUM7SUFFRCx5Q0FBZSxHQUFmO1FBQ0UsT0FBTyxpQkFBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxrQkFBa0IsQ0FBQyxDQUFBO0lBQzlELENBQUM7SUFFSywwQ0FBZ0IsR0FBdEIsVUFBdUIsSUFBWTs7OztnQkFDM0IsZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQTtnQkFFOUMsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxFQUFFO29CQUM5QixNQUFNLElBQUksS0FBSyxDQUFDLHVDQUFnQyxlQUFlLENBQUUsQ0FBQyxDQUFBO2lCQUNuRTtnQkFFRCxzQkFBTyxVQUFVLENBQUMsZUFBc0MsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBQTs7O0tBQzNFO0lBRUssd0NBQWMsR0FBcEIsVUFBcUIsSUFBWTs7OztnQkFDekIsZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQTtnQkFFOUMsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxFQUFFO29CQUM5QixNQUFNLElBQUksS0FBSyxDQUFDLHVDQUFnQyxlQUFlLENBQUUsQ0FBQyxDQUFBO2lCQUNuRTtnQkFFRCxzQkFBTyxVQUFVLENBQUMsZUFBc0MsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBQTs7O0tBQ3pFO0lBQ0gsc0JBQUM7QUFBRCxDQUFDLEFBeENELElBd0NDIn0=