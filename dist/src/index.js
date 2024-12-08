"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const treblle_1 = require("treblle");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const routes_1 = __importDefault(require("./routes/routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
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
app.use('*', (req, res, next) => {
    const error = new Error(`Cannot find ${req.originalUrl} on the server`);
    error.status = 'fail';
    error.statusCode = 404;
    next(error); // Forward the error to the global error handler
});
// create our global error handler
app.use((error, req, res, next) => {
    // Define default values for error
    const statusCode = error.statusCode || 500;
    const status = error.status || 'error';
    res.status(statusCode).json({
        status,
        message: error.message,
    });
});
app.use("api/v1/", routes_1.default);
const port = parseInt(process.env.PORT || '3000', 10);
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
//# sourceMappingURL=index.js.map