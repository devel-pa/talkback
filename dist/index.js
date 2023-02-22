"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var talkback_factory_1 = __importDefault(require("./talkback-factory"));
var options_1 = require("./options");
var talkback = function (options) {
    return talkback_factory_1.default.server(options);
};
talkback.Options = {
    Default: options_1.DefaultOptions,
    FallbackMode: options_1.FallbackMode,
    RecordMode: options_1.RecordMode
};
talkback.requestHandler = function (options) { return talkback_factory_1.default.requestHandler(options); };
exports.default = talkback;
module.exports = talkback;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx3RUFBZ0Q7QUFDaEQscUNBQTJFO0FBRTNFLElBQU0sUUFBUSxHQUFHLFVBQUMsT0FBeUI7SUFDekMsT0FBTywwQkFBZSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQTtBQUN4QyxDQUFDLENBQUE7QUFFRCxRQUFRLENBQUMsT0FBTyxHQUFHO0lBQ2pCLE9BQU8sRUFBRSx3QkFBYztJQUN2QixZQUFZLHdCQUFBO0lBQ1osVUFBVSxzQkFBQTtDQUNYLENBQUE7QUFFRCxRQUFRLENBQUMsY0FBYyxHQUFHLFVBQUMsT0FBeUIsSUFBSyxPQUFBLDBCQUFlLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxFQUF2QyxDQUF1QyxDQUFBO0FBRWhHLGtCQUFlLFFBQVEsQ0FBQTtBQUN2QixNQUFNLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQSJ9