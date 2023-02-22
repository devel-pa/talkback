"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var options_1 = __importDefault(require("../options"));
var logger_1 = require("../logger");
var ErrorRate = /** @class */ (function () {
    function ErrorRate(options) {
        this.options = options;
        this.logger = logger_1.Logger.for(this.options);
    }
    ErrorRate.prototype.shouldSimulate = function (req, tape) {
        var globalErrorRate = typeof (this.options.errorRate) === 'number' ? this.options.errorRate : this.options.errorRate(req);
        var errorRate = tape && tape.meta.errorRate !== undefined ? tape.meta.errorRate : globalErrorRate;
        options_1.default.validateErrorRate(errorRate);
        var random = Math.random() * 100;
        return random < errorRate;
    };
    ErrorRate.prototype.simulate = function (req) {
        this.logger.info("Simulating error for ".concat(req.url));
        return {
            status: 503,
            headers: { 'content-type': ['text/plain'] },
            body: Buffer.from("talkback - failure injection")
        };
    };
    return ErrorRate;
}());
exports.default = ErrorRate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItcmF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mZWF0dXJlcy9lcnJvci1yYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsdURBQWtEO0FBR2xELG9DQUFnQztBQUVoQztJQUlFLG1CQUFZLE9BQWdCO1FBQzFCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFBO1FBRXRCLElBQUksQ0FBQyxNQUFNLEdBQUcsZUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDeEMsQ0FBQztJQUVELGtDQUFjLEdBQWQsVUFBZSxHQUFPLEVBQUUsSUFBVztRQUNqQyxJQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUUzSCxJQUFNLFNBQVMsR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFBO1FBRW5HLGlCQUFjLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUE7UUFFM0MsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQTtRQUNsQyxPQUFPLE1BQU0sR0FBRyxTQUFTLENBQUE7SUFDM0IsQ0FBQztJQUVELDRCQUFRLEdBQVIsVUFBUyxHQUFRO1FBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsK0JBQXdCLEdBQUcsQ0FBQyxHQUFHLENBQUUsQ0FBQyxDQUFBO1FBQ25ELE9BQU87WUFDTCxNQUFNLEVBQUUsR0FBRztZQUNYLE9BQU8sRUFBRSxFQUFDLGNBQWMsRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFDO1lBQ3pDLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLDhCQUE4QixDQUFDO1NBQzNDLENBQUE7SUFDVixDQUFDO0lBQ0gsZ0JBQUM7QUFBRCxDQUFDLEFBN0JELElBNkJDIn0=