"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("./logger");
var Summary = /** @class */ (function () {
    function Summary(tapes, options) {
        this.tapes = tapes;
        this.options = options;
        this.logger = logger_1.Logger.for(this.options);
    }
    Summary.prototype.print = function () {
        var message = "===== SUMMARY =====\n";
        var newTapes = this.tapes.filter(function (t) { return t.new; });
        if (newTapes.length > 0) {
            message += "New tapes:\n";
            newTapes.forEach(function (t) { return message += "- ".concat(t.path, "\n"); });
        }
        var unusedTapes = this.tapes.filter(function (t) { return !t.used; });
        if (unusedTapes.length > 0) {
            message += "Unused tapes:\n";
            unusedTapes.forEach(function (t) { return message += "- ".concat(t.path, "\n"); });
        }
        this.logger.info(message);
    };
    return Summary;
}());
exports.default = Summary;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VtbWFyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zdW1tYXJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsbUNBQStCO0FBRS9CO0lBS0UsaUJBQVksS0FBYSxFQUFFLE9BQWdCO1FBQ3pDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO1FBQ2xCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFBO1FBRXRCLElBQUksQ0FBQyxNQUFNLEdBQUcsZUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDeEMsQ0FBQztJQUVELHVCQUFLLEdBQUw7UUFDRSxJQUFJLE9BQU8sR0FBRyx1QkFBdUIsQ0FBQTtRQUNyQyxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxHQUFHLEVBQUwsQ0FBSyxDQUFDLENBQUE7UUFDOUMsSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN2QixPQUFPLElBQUksY0FBYyxDQUFBO1lBQ3pCLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxPQUFPLElBQUksWUFBSyxDQUFDLENBQUMsSUFBSSxPQUFJLEVBQTFCLENBQTBCLENBQUMsQ0FBQTtTQUNsRDtRQUNELElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFQLENBQU8sQ0FBQyxDQUFBO1FBQ25ELElBQUksV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDMUIsT0FBTyxJQUFJLGlCQUFpQixDQUFBO1lBQzVCLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxPQUFPLElBQUksWUFBSyxDQUFDLENBQUMsSUFBSSxPQUFJLEVBQTFCLENBQTBCLENBQUMsQ0FBQTtTQUNyRDtRQUNELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQzNCLENBQUM7SUFDSCxjQUFDO0FBQUQsQ0FBQyxBQTFCRCxJQTBCQyJ9