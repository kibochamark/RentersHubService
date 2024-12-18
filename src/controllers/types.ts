import { NextFunction, Request, Response } from "express";
import { GlobalError } from "../../types/errorTypes";
import { prisma } from "../../utils/prismaclient";
import Joi from "joi";

// global error
let statusError:GlobalError = new Error("")

// get schema

const getIdSchema = Joi.object({
    id:Joi.string().required(),
})

// create schema
const typeSchema = Joi.object({
    name:Joi.string().required(),
})

// update schema
const updateTypeSchema =Joi.object({
    id:Joi.string().required(),
    name:Joi.string().optional(),
    
})

// get all users available 
export async function propertytypes(req:Request, res:Response, next:NextFunction): Promise<any>{

    try{
        const gettypes = await prisma.propertyType.findMany()

        return res.status(200).json({
            message:"success",
            data:gettypes
        })

    }catch(e:any){
        statusError.message=e.message
        statusError.status ="fail"
        statusError.statusCode =400
        next(statusError)
    }

}




export async function propertyTypebyid (req:Request, res:Response, next:NextFunction): Promise<any>{

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

        const getpropertytype = await prisma.propertyType.findUnique({
            where:{
                id
            }
        })

        return res.status(200).json({
            message:"success",
            data:getpropertytype
        })

    }catch(e:any){
        statusError.message=e.message
        statusError.status ="fail"
        statusError.statusCode =400
        next(statusError)
    }

}



// mutation apis,,,create , delete and update a user

export async function propertyTypecreate(req:Request, res:Response, next:NextFunction): Promise<any>{

    try{
        const { error, value } = typeSchema.validate(req.body, { abortEarly: false });

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


        const { name } = value;

        const propertyType = await prisma.propertyType.create({
            data:{
                name
            }
        })

        return res.status(201).json({
            message:"success",
            data:propertyType
        })

    }catch(e:any){
        statusError.message=e.message
        statusError.status ="fail"
        statusError.statusCode =400
        next(statusError)
    }

}
export  async function propertyTypeupdate(req:Request, res:Response, next:NextFunction): Promise<any>{

    try{
        const { error, value } =updateTypeSchema.validate(req.body, { abortEarly: false });

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


        const {id,name } = value;

        const propertyType = await prisma.propertyType.update({
            where:{
                id
            },
            data:{
                name
            }
        })

        return res.status(200).json({
            message:"success",
            data:propertyType
        })

    }catch(e:any){
        statusError.message=e.message
        statusError.status ="fail"
        statusError.statusCode =400
        next(statusError)
    }

}


export async function deletepropertytype(req:Request, res:Response, next:NextFunction): Promise<any>{

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

        const propertytype =await prisma.propertyType.delete({
            where:{
                id
            }
        })

        return res.status(204).json({
            propertytype
        }).end()

    }catch(e:any){
        statusError.message=e.message
        statusError.status ="fail"
        statusError.statusCode =400
        next(statusError)
    }

}

