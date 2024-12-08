"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var treblle_1 = require("treblle");
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var body_parser_1 = __importDefault(require("body-parser"));
var compression_1 = __importDefault(require("compression"));
var routes_1 = __importDefault(require("./routes/routes"));
dotenv_1.default.config();
var app = (0, express_1.default)();
// setting up treblle for api monitoring
(0, treblle_1.useTreblle)(app, {
    apiKey: process.env.TREBLLE_API_KEY,
    projectId: process.env.TREBLLE_APP_ID,
});
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, compression_1.default)());
// catch all routes that are not specified in the routes folder
app.use('*', function (req, res, next) {
    var error = new Error("Cannot find ".concat(req.originalUrl, " on the server"));
    error.status = 'fail';
    error.statusCode = 404;
    next(error); // Forward the error to the global error handler
});
// create our global error handler
app.use(function (error, req, res, next) {
    // Define default values for error
    var statusCode = error.statusCode || 500;
    var status = error.status || 'error';
    res.status(statusCode).json({
        status: status,
        message: error.message,
    });
});
app.use("/api/v1", routes_1.default);
var port = parseInt(process.env.PORT || '3000', 10);
app.listen(port, function () {
    console.log("Listening on port ".concat(port));
});
//# sourceMappingURL=index.js.map