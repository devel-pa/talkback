"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var content_encoding_1 = __importDefault(require("./utils/content-encoding"));
var media_type_1 = __importDefault(require("./utils/media-type"));
var logger_1 = require("./logger");
var isEqual = require("lodash/isEqual");
var TapeMatcher = /** @class */ (function () {
    function TapeMatcher(tape, options) {
        this.tape = tape;
        this.options = options;
        this.logger = logger_1.Logger.for(this.options);
    }
    TapeMatcher.prototype.sameAs = function (otherTape) {
        var otherReq = otherTape.req;
        var req = this.tape.req;
        if (!this.isSameUrl(req, otherReq)) {
            return false;
        }
        if (!this.isSameMethod(req, otherReq)) {
            return false;
        }
        if (!this.isSameHeaders(req, otherReq)) {
            return false;
        }
        return this.options.ignoreBody || this.isSameBody(req, otherReq);
    };
    TapeMatcher.prototype.isSameBody = function (req, otherReq) {
        var mediaType = new media_type_1.default(req);
        var contentEncoding = new content_encoding_1.default(req);
        var sameBody;
        if (contentEncoding.isUncompressed() && mediaType.isJSON() && req.body.length > 0 && otherReq.body.length > 0) {
            var parsedReqBody = JSON.parse(req.body.toString());
            var parsedOtherReqBody = JSON.parse(otherReq.body.toString());
            sameBody = isEqual(parsedReqBody, parsedOtherReqBody);
        }
        else {
            sameBody = req.body.equals(otherReq.body);
        }
        if (!sameBody) {
            if (!this.options.bodyMatcher) {
                this.logger.debug("Not same BODY ".concat(req.body, " vs ").concat(otherReq.body));
                return false;
            }
            var bodyMatches = this.options.bodyMatcher(this.tape, otherReq);
            if (!bodyMatches) {
                this.logger.debug("Not same bodyMatcher ".concat(req.body, " vs ").concat(otherReq.body));
                return false;
            }
        }
        return true;
    };
    TapeMatcher.prototype.isSameHeaders = function (req, otherReq) {
        var currentHeadersLength = Object.keys(req.headers).length;
        var otherHeadersLength = Object.keys(otherReq.headers).length;
        var sameNumberOfHeaders = currentHeadersLength === otherHeadersLength;
        if (!sameNumberOfHeaders) {
            this.logger.debug("Not same #HEADERS ".concat(JSON.stringify(req.headers), " vs ").concat(JSON.stringify(otherReq.headers)));
            return false;
        }
        var headersSame = true;
        Object.keys(req.headers).forEach(function (k) {
            var entryHeader = req.headers[k];
            var header = otherReq.headers[k];
            headersSame = headersSame && entryHeader === header;
        });
        if (!headersSame) {
            this.logger.debug("Not same HEADERS values ".concat(JSON.stringify(req.headers), " vs ").concat(JSON.stringify(otherReq.headers)));
            return false;
        }
        return true;
    };
    TapeMatcher.prototype.isSameMethod = function (req, otherReq) {
        var sameMethod = req.method === otherReq.method;
        if (!sameMethod) {
            this.logger.debug("Not same METHOD ".concat(req.method, " vs ").concat(otherReq.method));
            return false;
        }
        return true;
    };
    TapeMatcher.prototype.isSameUrl = function (req, otherReq) {
        var sameURL = req.url === otherReq.url;
        if (!sameURL) {
            if (!this.options.urlMatcher) {
                this.logger.debug("Not same URL ".concat(req.url, " vs ").concat(otherReq.url));
                return false;
            }
            var urlMatches = this.options.urlMatcher(this.tape, otherReq);
            if (!urlMatches) {
                this.logger.debug("Not same urlMatcher ".concat(req.url, " vs ").concat(otherReq.url));
                return false;
            }
        }
        return true;
    };
    return TapeMatcher;
}());
exports.default = TapeMatcher;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFwZS1tYXRjaGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3RhcGUtbWF0Y2hlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDhFQUFzRDtBQUN0RCxrRUFBMEM7QUFJMUMsbUNBQStCO0FBRS9CLElBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO0FBRXpDO0lBS0UscUJBQVksSUFBVSxFQUFFLE9BQWdCO1FBQ3RDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO1FBQ2hCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFBO1FBRXRCLElBQUksQ0FBQyxNQUFNLEdBQUcsZUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDeEMsQ0FBQztJQUVELDRCQUFNLEdBQU4sVUFBTyxTQUFlO1FBQ3BCLElBQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUE7UUFDOUIsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUE7UUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxFQUFFO1lBQ2xDLE9BQU8sS0FBSyxDQUFBO1NBQ2I7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLEVBQUU7WUFDckMsT0FBTyxLQUFLLENBQUE7U0FDYjtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsRUFBRTtZQUN0QyxPQUFPLEtBQUssQ0FBQTtTQUNiO1FBRUQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUVuRSxDQUFDO0lBRU8sZ0NBQVUsR0FBbEIsVUFBbUIsR0FBUSxFQUFFLFFB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