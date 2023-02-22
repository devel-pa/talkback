"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonTypes = void 0;
var headers_1 = __importDefault(require("./headers"));
var contentTypeParser = require("content-type");
var equals = function (to) { return function (contentType) { return to == contentType; }; };
exports.jsonTypes = [
    equals("application/graphql"),
    equals("application/json"),
    equals("application/x-amz-json-1.0"),
    equals("application/x-amz-json-1.1"),
    function (contentType) { return contentType.startsWith("application/") && contentType.endsWith("+json"); }
];
var humanReadableContentTypes = __spreadArray([
    equals("application/javascript"),
    equals("text/css"),
    equals("text/html"),
    equals("text/javascript"),
    equals("text/plain")
], exports.jsonTypes, true);
var MediaType = /** @class */ (function () {
    function MediaType(htmlReqRes) {
        this.htmlReqRes = htmlReqRes;
    }
    MediaType.prototype.isHumanReadable = function () {
        var contentType = this.contentType();
        if (!contentType) {
            return false;
        }
        return humanReadableContentTypes.some(function (comparator) { return comparator(contentType); });
    };
    MediaType.prototype.isJSON = function () {
        var contentType = this.contentType();
        if (!contentType) {
            return false;
        }
        return exports.jsonTypes.some(function (comparator) { return comparator(contentType); });
    };
    MediaType.prototype.contentType = function () {
        var contentTypeHeader = headers_1.default.read(this.headers(), "content-type");
        if (!contentTypeHeader) {
            return null;
        }
        var parsedContentType = contentTypeParser.parse(contentTypeHeader);
        return parsedContentType.type;
    };
    MediaType.prototype.headers = function () {
        return this.htmlReqRes.headers;
    };
    return MediaType;
}());
exports.default = MediaType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEtdHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9tZWRpYS10eXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHNEQUErQjtBQUUvQixJQUFNLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQTtBQUVqRCxJQUFNLE1BQU0sR0FBRyxVQUFDLEVBQVUsSUFBSyxPQUFBLFVBQUMsV0FBbUIsSUFBSyxPQUFBLEVBQUUsSUFBSSxXQUFXLEVBQWpCLENBQWlCLEVBQTFDLENBQTBDLENBQUE7QUFFNUQsUUFBQSxTQUFTLEdBQUc7SUFDdkIsTUFBTSxDQUFDLHFCQUFxQixDQUFDO0lBQzdCLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQztJQUMxQixNQUFNLENBQUMsNEJBQTRCLENBQUM7SUFDcEMsTUFBTSxDQUFDLDRCQUE0QixDQUFDO0lBQ3BDLFVBQUMsV0FBbUIsSUFBSyxPQUFBLFdBQVcsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBdkUsQ0FBdUU7Q0FDakcsQ0FBQTtBQUVELElBQU0seUJBQXlCO0lBQzdCLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQztJQUNoQyxNQUFNLENBQUMsVUFBVSxDQUFDO0lBQ2xCLE1BQU0sQ0FBQyxXQUFXLENBQUM7SUFDbkIsTUFBTSxDQUFDLGlCQUFpQixDQUFDO0lBQ3pCLE1BQU0sQ0FBQyxZQUFZLENBQUM7R0FDakIsaUJBQVMsT0FDYixDQUFBO0FBRUQ7SUFHRSxtQkFBWSxVQUFrQjtRQUM1QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQTtJQUM5QixDQUFDO0lBRUQsbUNBQWUsR0FBZjtRQUNFLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQTtRQUN0QyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2hCLE9BQU8sS0FBSyxDQUFBO1NBQ2I7UUFFRCxPQUFPLHlCQUF5QixDQUFDLElBQUksQ0FBQyxVQUFBLFVBQVUsSUFBSSxPQUFBLFVBQVUsQ0FBQyxXQUFXLENBQUMsRUFBdkIsQ0FBdUIsQ0FBQyxDQUFBO0lBQzlFLENBQUM7SUFFRCwwQkFBTSxHQUFOO1FBQ0UsSUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO1FBQ3RDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDaEIsT0FBTyxLQUFLLENBQUE7U0FDYjtRQUVELE9BQU8saUJBQVMsQ0FBQyxJQUFJLENBQUMsVUFBQSxVQUFVLElBQUksT0FBQSxVQUFVLENBQUMsV0FBVyxDQUFDLEVBQXZCLENBQXVCLENBQUMsQ0FBQTtJQUM5RCxDQUFDO0lBRUQsK0JBQVcsR0FBWDtRQUNFLElBQU0saUJBQWlCLEdBQUcsaUJBQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLGNBQWMsQ0FBQyxDQUFBO1FBQ3RFLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUN0QixPQUFPLElBQUksQ0FBQTtTQUNaO1FBQ0QsSUFBTSxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtRQUNwRSxPQUFPLGlCQUFpQixDQUFDLElBQWMsQ0FBQTtJQUN6QyxDQUFDO0lBRUQsMkJBQU8sR0FBUDtRQUNFLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUE7SUFDaEMsQ0FBQztJQUNILGdCQUFDO0FBQUQsQ0FBQyxBQXJDRCxJQXFDQyJ9