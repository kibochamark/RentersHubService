import { NextFunction, Request, Response } from "express";
import { GlobalError } from "../../types/errorTypes";
import { prisma } from "../../utils/prismaclient";
import Joi from "joi";

// global error
let statusError:GlobalError = new Error("")

// get schema
const getKindeSchema = Joi.object({
    kinde_id:Joi.string().required(),
})
const getIdSchema = Joi.object({
    id:Joi.string().required(),
})

// create schema
const userSchema = Joi.object({
    firstname:Joi.string().required(),
    lastname:Joi.string().required(),
    email:Joi.string().required(),
    kinde_id:Joi.string().required(),
    phone:Joi.string().required(),
    phone2:Joi.string().optional(),
    profile:Joi.object({
        profileImage:Joi.string().required(),
        companyinfo:Joi.string().optional(),
        shortBio:Joi.string().optional(),
    }).required(),
})

// update schema
const updateUserSchema =Joi.object({
    id:Joi.string().required(),
    firstname:Joi.string().optional(),
    lastname:Joi.string().optional(),
    email:Joi.string().optional(),
    kinde_id:Joi.string().optional(),
    phone:Joi.string().optional(),
    phone2:Joi.string().optional(),
    profile:Joi.object({
        profileImage:Joi.string().optional(),
        companyinfo:Joi.string().optional(),
        shortBio:Joi.string().optional(),
    }).optional(),
})

// get all users available 
export async function users(req:Request, res:Response, next:NextFunction): Promise<any>{

    try{
        const getusers = await prisma.user.findMany()

        return res.status(200).json({
            message:"success",
            data:getusers
        })

    }catch(e:any){
        statusError.message=e.message
        statusError.status ="fail"
        statusError.statusCode =400
        next(statusError)
    }

}



// get a specific user by kindeid or id
export async function userbykinde(req:Request, res:Response, next:NextFunction): Promise<any>{

    try{
        const { error, value } = getKindeSchema.validate(req.params, { abortEarly: false });

        if (error) {
            statusError = new Error(JSON.stringify(
                {
                    error: error.details.map(detail => detail.message),
                }
            ))
            statusError.statusCode = 400
            statusError.status = "fail"
            return next(statusError)

        }


        const { kinde_id } = value;

        const getuser = await prisma.user.findUnique({
            where:{
                kinde_id
            }
        })

        return res.status(200).json({
            message:"success",
            data:getuser
        })

    }catch(e:any){
        statusError.message=e.message
        statusError.status ="fail"
        statusError.statusCode =400
        next(statusError)
    }

}
export async function userbyid (req:Request, res:Response, next:NextFunction): Promise<any>{

    try{
        const { error, value } = getIdSchema.validate(req.params, { abortEarly: false });

        if (error) {
            statusError = new Error(JSON.stringify(
                {
                    error: error.details.map(detail => detail.message),
                }
            ))
            statusError.statusCode = 400
            statusError.status = "fail"
            return next(statusError)

        }


        const { id } = value;

        const getuser = await prisma.user.findUnique({
            where:{
                id
            }
        })

        return res.status(200).json({
            message:"success",
            data:getuser
        })

    }catch(e:any){
        statusError.message=e.message
        statusError.status ="fail"
        statusError.statusCode =400
        next(statusError)
    }

}



// mutation apis,,,create , delete and update a user

export async function usercreate(req:Request, res:Response, next:NextFunction): Promise<any>{

    try{
        const { error, value } = userSchema.validate(req.body, { abortEarly: false });

        if (error) {
            statusError = new Error(JSON.stringify(
                {
                    error: error.details.map(detail => detail.message),
                }
            ))
            statusError.statusCode = 400
            statusError.status = "fail"
            return next(statusError)

        }


        const { firstname, lastname, email, kinde_id, phone, phone2, profile } = value;

        const user = await prisma.user.create({
            data:{
                firstname,
                lastname,
                email,
                kinde_id,
                phone,
                phone2,
                profile
            }
        })

        return res.status(201).json({
            message:"success",
            data:user
        })

    }catch(e:any){
        statusError.message=e.message
        statusError.status ="fail"
        statusError.statusCode =400
        next(statusError)
    }

}
export  async function userupdate(req:Request, res:Response, next:NextFunction): Promise<any>{

    try{
        const { error, value } = updateUserSchema.validate(req.body, { abortEarly: false });

        if (error) {
            statusError = new Error(JSON.stringify(
                {
                    error: error.details.map(detail => detail.message),
                }
            ))
            statusError.statusCode = 400
            statusError.status = "fail"
            return next(statusError)

        }


        const {id, firstname, lastname, email, kinde_id, phone, phone2, profile } = value;

        const user = await prisma.user.update({
            where:{
                id
            },
            data:{
                firstname,
                lastname,
                email,
                kinde_id,
                phone,
                phone2,
                profile
            }
        })

        return res.status(200).json({
            message:"success",
            data:user
        })

    }catch(e:any){
        statusError.message=e.message
        statusError.status ="fail"
        statusError.statusCode =400
        next(statusError)
    }

}


export async function deleteuser(req:Request, res:Response, next:NextFunction): Promise<any>{

    try{
        const { error, value } = getIdSchema.validate(req.params, { abortEarly: false });

        if (error) {
            statusError = new Error(JSON.stringify(
                {
                    error: error.details.map(detail => detail.message),
                }
            ))
            statusError.statusCode = 400
            statusError.status = "fail"
            return next(statusError)

        }


        const { id } = value;

        await prisma.user.delete({
            where:{
                id
            }
        })

        return res.status(204)

    }catch(e:any){
        statusError.message=e.message
        statusError.status ="fail"
        statusError.statusCode =400
        next(statusError)
    }

}

