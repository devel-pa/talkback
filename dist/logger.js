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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
var Logger = /** @class */ (function () {
    function Logger(options) {
        this.options = options;
        if (this.options.debug) {
            this.debug("DEBUG mode active");
        }
    }
    Logger.for = function (options) {
        return new Logger(options);
    };
    Logger.prototype.info = function (message) {
        if (!this.options.silent || this.options.debug) {
            console.log(this.formatMessage(message, "INFO"));
        }
    };
    Logger.prototype.debug = function (message) {
        if (this.options.debug) {
            console.debug(this.formatMessage(message, "DEBUG"));
        }
    };
    Logger.prototype.error = function (message) {
        var optionalParameters = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParameters[_i - 1] = arguments[_i];
        }
        console.error.apply(console, __spreadArray([this.formatMessage(message, "ERROR")], optionalParameters, false));
    };
    Logger.prototype.formatMessage = function (message, level) {
        var now = new Date();
        var formattedNow = now.toISOString();
        var messageString;
        if (typeof message == "object") {
            messageString = JSON.stringify(message);
        }
        else {
            messageString = message;
        }
        return "".concat(formattedNow, " [").concat(this.options.name, "] [").concat(level, "] ").concat(messageString);
    };
    return Logger;
}());
exports.Logger = Logger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2xvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFFQTtJQU9FLGdCQUFZLE9BQWdCO1FBQzFCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFBO1FBQ3RCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUU7WUFDdEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO1NBQ2hDO0lBQ0gsQ0FBQztJQVhNLFVBQUcsR0FBVixVQUFXLE9BQWdCO1FBQ3pCLE9BQU8sSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDNUIsQ0FBQztJQVdELHFCQUFJLEdBQUosVUFBSyxPQUFZO1FBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFO1lBQzlDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQTtTQUNqRDtJQUNILENBQUM7SUFFRCxzQkFBSyxHQUFMLFVBQU0sT0FBWTtRQUNoQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFO1lBQ3RCLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQTtTQUNwRDtJQUNILENBQUM7SUFFRCxzQkFBSyxHQUFMLFVBQU0sT0FBWTtRQUFFLDRCQUE0QjthQUE1QixVQUE0QixFQUE1QixxQkFBNEIsRUFBNUIsSUFBNEI7WUFBNUIsMkNBQTRCOztRQUM5QyxPQUFPLENBQUMsS0FBSyxPQUFiLE9BQU8saUJBQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUssa0JBQWtCLFVBQUM7SUFDNUUsQ0FBQztJQUVELDhCQUFhLEdBQWIsVUFBYyxPQUFZLEVBQUUsS0FBYTtRQUN2QyxJQUFNLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFBO1FBQ3RCLElBQU0sWUFBWSxHQUFHLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtRQUN0QyxJQUFJLGFBQXFCLENBQUE7UUFDekIsSUFBSSxPQUFPLE9BQU8sSUFBSSxRQUFRLEVBQUU7WUFDOUIsYUFBYSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUE7U0FDeEM7YUFBTTtZQUNMLGFBQWEsR0FBRyxPQUFPLENBQUE7U0FDeEI7UUFDRCxPQUFPLFVBQUcsWUFBWSxlQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxnQkFBTSxLQUFLLGVBQUssYUFBYSxDQUFFLENBQUE7SUFDN0UsQ0FBQztJQUNILGFBQUM7QUFBRCxDQUFDLEFBekNELElBeUNDO0FBekNZLHdCQUFNIn0=