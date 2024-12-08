"use strict";
// // Suggested code may be subject to a license. Learn more: ~LicenseLog:2752666768.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express from 'express';
// import { deleteuser, userbykinde, usercreate, users, userupdate } from '../controllers/user';
// const routes = express.Router()
// //users
// routes.get('/users', users)
// routes.get('/user/:kinde_id', userbykinde)
// routes.get('/user/:id', userbyid)
// routes.post('/user', usercreate)
// routes.patch('/user', userupdate)
// routes.delete('/users/:id', deleteuser)
// export default routes
var express_1 = __importDefault(require("express"));
var user_1 = require("../controllers/user");
var routes = express_1.default.Router();
// Users
routes.get('/users', user_1.users); // Corrected path
routes.get('/user/:kinde_id', user_1.userbykinde); // Corrected path
routes.get('/user/:id', user_1.userbyid); // Ensure `userbyid` is imported from your controllers
routes.post('/user', user_1.usercreate); // Corrected path
routes.patch('/user/:id', user_1.userupdate); // Added ":id" to specify the user being updated
routes.delete('/user/:id', user_1.deleteuser); // Consistent naming and corrected path
exports.default = routes;
//# sourceMappingURL=routes.js.map