"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteuser = exports.userupdate = exports.usercreate = exports.userbyid = exports.userbykinde = exports.users = void 0;
const prismaclient_1 = require("../../utils/prismaclient");
const joi_1 = __importDefault(require("joi"));
// global error
let statusError = new Error("");
// get schema
const getKindeSchema = joi_1.default.object({
    kinde_id: joi_1.default.string().required(),
});
const getIdSchema = joi_1.default.object({
    id: joi_1.default.string().required(),
});
// create schema
const userSchema = joi_1.default.object({
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
const updateUserSchema = joi_1.default.object({
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
async function users(req, res, next) {
    try {
        const getusers = await prismaclient_1.prisma.user.findMany();
        return res.status(200).json({
            message: "success",
            data: getusers
        });
    }
    catch (e) {
        statusError.message = e.message;
        statusError.status = "fail";
        statusError.statusCode = 400;
        next(statusError);
    }
}
exports.users = users;
// get a specific user by kindeid or id
async function userbykinde(req, res, next) {
    try {
        const { error, value } = getKindeSchema.validate(req.params, { abortEarly: false });
        if (error) {
            statusError = new Error(JSON.stringify({
                error: error.details.map(detail => detail.message),
            }));
            statusError.statusCode = 400;
            statusError.status = "fail";
            return next(statusError);
        }
        const { kinde_id } = value;
        const getuser = await prismaclient_1.prisma.user.findUnique({
            where: {
                kinde_id
            }
        });
        return res.status(200).json({
            message: "success",
            data: getuser
        });
    }
    catch (e) {
        statusError.message = e.message;
        statusError.status = "fail";
        statusError.statusCode = 400;
        next(statusError);
    }
}
exports.userbykinde = userbykinde;
async function userbyid(req, res, next) {
    try {
        const { error, value } = getKindeSchema.validate(req.params, { abortEarly: false });
        if (error) {
            statusError = new Error(JSON.stringify({
                error: error.details.map(detail => detail.message),
            }));
            statusError.statusCode = 400;
            statusError.status = "fail";
            return next(statusError);
        }
        const { id } = value;
        const getuser = await prismaclient_1.prisma.user.findUnique({
            where: {
                id
            }
        });
        return res.status(200).json({
            message: "success",
            data: getuser
        });
    }
    catch (e) {
        statusError.message = e.message;
        statusError.status = "fail";
        statusError.statusCode = 400;
        next(statusError);
    }
}
exports.userbyid = userbyid;
// mutation apis,,,create , delete and update a user
async function usercreate(req, res, next) {
    try {
        const { error, value } = userSchema.validate(req.body, { abortEarly: false });
        if (error) {
            statusError = new Error(JSON.stringify({
                error: error.details.map(detail => detail.message),
            }));
            statusError.statusCode = 400;
            statusError.status = "fail";
            return next(statusError);
        }
        const { firstname, lastname, email, kinde_id, phone, phone2, profile } = value;
        const user = await prismaclient_1.prisma.user.create({
            data: {
                firstname,
                lastname,
                email,
                kinde_id,
                phone,
                phone2,
                profile
            }
        });
        return res.status(201).json({
            message: "success",
            data: user
        });
    }
    catch (e) {
        statusError.message = e.message;
        statusError.status = "fail";
        statusError.statusCode = 400;
        next(statusError);
    }
}
exports.usercreate = usercreate;
async function userupdate(req, res, next) {
    try {
        const { error, value } = userSchema.validate(req.body, { abortEarly: false });
        if (error) {
            statusError = new Error(JSON.stringify({
                error: error.details.map(detail => detail.message),
            }));
            statusError.statusCode = 400;
            statusError.status = "fail";
            return next(statusError);
        }
        const { id, firstname, lastname, email, kinde_id, phone, phone2, profile } = value;
        const user = await prismaclient_1.prisma.user.update({
            where: {
                id
            },
            data: {
                firstname,
                lastname,
                email,
                kinde_id,
                phone,
                phone2,
                profile
            }
        });
        return res.status(200).json({
            message: "success",
            data: user
        });
    }
    catch (e) {
        statusError.message = e.message;
        statusError.status = "fail";
        statusError.statusCode = 400;
        next(statusError);
    }
}
exports.userupdate = userupdate;
async function deleteuser(req, res, next) {
    try {
        const { error, value } = getKindeSchema.validate(req.params, { abortEarly: false });
        if (error) {
            statusError = new Error(JSON.stringify({
                error: error.details.map(detail => detail.message),
            }));
            statusError.statusCode = 400;
            statusError.status = "fail";
            return next(statusError);
        }
        const { id } = value;
        await prismaclient_1.prisma.user.delete({
            where: {
                id
            }
        });
        return res.status(204);
    }
    catch (e) {
        statusError.message = e.message;
        statusError.status = "fail";
        statusError.statusCode = 400;
        next(statusError);
    }
}
exports.deleteuser = deleteuser;
//# sourceMappingURL=user.js.map