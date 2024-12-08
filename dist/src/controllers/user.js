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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.deleteuser = exports.userupdate = exports.usercreate = exports.userbyid = exports.userbykinde = exports.users = void 0;
var prismaclient_1 = require("../../utils/prismaclient");
var joi_1 = __importDefault(require("joi"));
// global error
var statusError = new Error("");
// get schema
var getKindeSchema = joi_1.default.object({
    kinde_id: joi_1.default.string().required(),
});
var getIdSchema = joi_1.default.object({
    id: joi_1.default.string().required(),
});
// create schema
var userSchema = joi_1.default.object({
    firstname: joi_1.default.string().required(),
    lastname: joi_1.default.string().required(),
    email: joi_1.default.string().required(),
    kinde_id: joi_1.default.string().required(),
    phone: joi_1.default.string().required(),
    phone2: joi_1.default.string().optional(),
    profile: joi_1.default.object({
        profileImage: joi_1.default.string().required(),
        companyinfo: joi_1.default.string().optional(),
        shortBio: joi_1.default.string().optional(),
    }).required(),
});
// update schema
var updateUserSchema = joi_1.default.object({
    id: joi_1.default.string().required(),
    firstname: joi_1.default.string().optional(),
    lastname: joi_1.default.string().optional(),
    email: joi_1.default.string().optional(),
    kinde_id: joi_1.default.string().optional(),
    phone: joi_1.default.string().optional(),
    phone2: joi_1.default.string().optional(),
    profile: joi_1.default.object({
        profileImage: joi_1.default.string().optional(),
        companyinfo: joi_1.default.string().optional(),
        shortBio: joi_1.default.string().optional(),
    }).optional(),
});
// get all users available 
function users(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var getusers, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, prismaclient_1.prisma.user.findMany()];
                case 1:
                    getusers = _a.sent();
                    return [2 /*return*/, res.status(200).json({
                            message: "success",
                            data: getusers
                        })];
                case 2:
                    e_1 = _a.sent();
                    statusError.message = e_1.message;
                    statusError.status = "fail";
                    statusError.statusCode = 400;
                    next(statusError);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.users = users;
// get a specific user by kindeid or id
function userbykinde(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, error, value, kinde_id, getuser, e_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = getKindeSchema.validate(req.params, { abortEarly: false }), error = _a.error, value = _a.value;
                    if (error) {
                        statusError = new Error(JSON.stringify({
                            error: error.details.map(function (detail) { return detail.message; }),
                        }));
                        statusError.statusCode = 400;
                        statusError.status = "fail";
                        return [2 /*return*/, next(statusError)];
                    }
                    kinde_id = value.kinde_id;
                    return [4 /*yield*/, prismaclient_1.prisma.user.findUnique({
                            where: {
                                kinde_id: kinde_id
                            }
                        })];
                case 1:
                    getuser = _b.sent();
                    return [2 /*return*/, res.status(200).json({
                            message: "success",
                            data: getuser
                        })];
                case 2:
                    e_2 = _b.sent();
                    statusError.message = e_2.message;
                    statusError.status = "fail";
                    statusError.statusCode = 400;
                    next(statusError);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.userbykinde = userbykinde;
function userbyid(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, error, value, id, getuser, e_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = getKindeSchema.validate(req.params, { abortEarly: false }), error = _a.error, value = _a.value;
                    if (error) {
                        statusError = new Error(JSON.stringify({
                            error: error.details.map(function (detail) { return detail.message; }),
                        }));
                        statusError.statusCode = 400;
                        statusError.status = "fail";
                        return [2 /*return*/, next(statusError)];
                    }
                    id = value.id;
                    return [4 /*yield*/, prismaclient_1.prisma.user.findUnique({
                            where: {
                                id: id
                            }
                        })];
                case 1:
                    getuser = _b.sent();
                    return [2 /*return*/, res.status(200).json({
                            message: "success",
                            data: getuser
                        })];
                case 2:
                    e_3 = _b.sent();
                    statusError.message = e_3.message;
                    statusError.status = "fail";
                    statusError.statusCode = 400;
                    next(statusError);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.userbyid = userbyid;
// mutation apis,,,create , delete and update a user
function usercreate(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, error, value, firstname, lastname, email, kinde_id, phone, phone2, profile, user, e_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = userSchema.validate(req.body, { abortEarly: false }), error = _a.error, value = _a.value;
                    if (error) {
                        statusError = new Error(JSON.stringify({
                            error: error.details.map(function (detail) { return detail.message; }),
                        }));
                        statusError.statusCode = 400;
                        statusError.status = "fail";
                        return [2 /*return*/, next(statusError)];
                    }
                    firstname = value.firstname, lastname = value.lastname, email = value.email, kinde_id = value.kinde_id, phone = value.phone, phone2 = value.phone2, profile = value.profile;
                    return [4 /*yield*/, prismaclient_1.prisma.user.create({
                            data: {
                                firstname: firstname,
                                lastname: lastname,
                                email: email,
                                kinde_id: kinde_id,
                                phone: phone,
                                phone2: phone2,
                                profile: profile
                            }
                        })];
                case 1:
                    user = _b.sent();
                    return [2 /*return*/, res.status(201).json({
                            message: "success",
                            data: user
                        })];
                case 2:
                    e_4 = _b.sent();
                    statusError.message = e_4.message;
                    statusError.status = "fail";
                    statusError.statusCode = 400;
                    next(statusError);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.usercreate = usercreate;
function userupdate(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, error, value, id, firstname, lastname, email, kinde_id, phone, phone2, profile, user, e_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = userSchema.validate(req.body, { abortEarly: false }), error = _a.error, value = _a.value;
                    if (error) {
                        statusError = new Error(JSON.stringify({
                            error: error.details.map(function (detail) { return detail.message; }),
                        }));
                        statusError.statusCode = 400;
                        statusError.status = "fail";
                        return [2 /*return*/, next(statusError)];
                    }
                    id = value.id, firstname = value.firstname, lastname = value.lastname, email = value.email, kinde_id = value.kinde_id, phone = value.phone, phone2 = value.phone2, profile = value.profile;
                    return [4 /*yield*/, prismaclient_1.prisma.user.update({
                            where: {
                                id: id
                            },
                            data: {
                                firstname: firstname,
                                lastname: lastname,
                                email: email,
                                kinde_id: kinde_id,
                                phone: phone,
                                phone2: phone2,
                                profile: profile
                            }
                        })];
                case 1:
                    user = _b.sent();
                    return [2 /*return*/, res.status(200).json({
                            message: "success",
                            data: user
                        })];
                case 2:
                    e_5 = _b.sent();
                    statusError.message = e_5.message;
                    statusError.status = "fail";
                    statusError.statusCode = 400;
                    next(statusError);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.userupdate = userupdate;
function deleteuser(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, error, value, id, e_6;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = getKindeSchema.validate(req.params, { abortEarly: false }), error = _a.error, value = _a.value;
                    if (error) {
                        statusError = new Error(JSON.stringify({
                            error: error.details.map(function (detail) { return detail.message; }),
                        }));
                        statusError.statusCode = 400;
                        statusError.status = "fail";
                        return [2 /*return*/, next(statusError)];
                    }
                    id = value.id;
                    return [4 /*yield*/, prismaclient_1.prisma.user.delete({
                            where: {
                                id: id
                            }
                        })];
                case 1:
                    _b.sent();
                    return [2 /*return*/, res.status(204)];
                case 2:
                    e_6 = _b.sent();
                    statusError.message = e_6.message;
                    statusError.status = "fail";
                    statusError.statusCode = 400;
                    next(statusError);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.deleteuser = deleteuser;
//# sourceMappingURL=user.js.map