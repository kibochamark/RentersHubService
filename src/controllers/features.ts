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
const featureSchema = Joi.object({
    name:Joi.string().required(),
    description:Joi.string().required(),
})

// update schema
const updateFeatureSchema =Joi.object({
    id:Joi.string().required(),
    name:Joi.string().optional(),
    description:Joi.string().optional(),

    
})

// get all users available 
export async function propertyfeatures(req:Request, res:Response, next:NextFunction): Promise<any>{

    try{
        const getfeatures = await prisma.propertyFeatures.findMany()

        return res.status(200).json({
            message:"success",
            data:getfeatures
        })

    }catch(e:any){
        statusError.message=e.message
        statusError.status ="fail"
        statusError.statusCode =400
        next(statusError)
    }

}




export async function propertyfeaturebyid (req:Request, res:Response, next:NextFunction): Promise<any>{

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

        const getpropertyfeature = await prisma.propertyFeatures.findUnique({
            where:{
                id
            }
        })

        return res.status(200).json({
            message:"success",
            data:getpropertyfeature
        })

    }catch(e:any){
        statusError.message=e.message
        statusError.status ="fail"
        statusError.statusCode =400
        next(statusError)
    }

}



// mutation apis,,,create , delete and update a user

export async function propertyFeaturecreate(req:Request, res:Response, next:NextFunction): Promise<any>{

    try{
        const { error, value } = featureSchema.validate(req.body, { abortEarly: false });

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


        const { name, description } = value;

        const propertyFeature = await prisma.propertyFeatures.create({
            data:{
                name,
                description
            }
        })

        return res.status(201).json({
            message:"success",
            data:propertyFeature
        })

    }catch(e:any){
        statusError.message=e.message
        statusError.status ="fail"
        statusError.statusCode =400
        next(statusError)
    }

}
export  async function propertyFeatureupdate(req:Request, res:Response, next:NextFunction): Promise<any>{

    try{
        const { error, value } =updateFeatureSchema.validate(req.body, { abortEarly: false });

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


        const {id,name, description } = value;

        const propertyFeature = await prisma.propertyFeatures.update({
            where:{
                id
            },
            data:{
                name,
                description
            }
        })

        return res.status(200).json({
            message:"success",
            data:propertyFeature
        })

    }catch(e:any){
        statusError.message=e.message
        statusError.status ="fail"
        statusError.statusCode =400
        next(statusError)
    }

}


export async function deletepropertyfeature(req:Request, res:Response, next:NextFunction): Promise<any>{

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

        const feature =await prisma.propertyFeatures.delete({
            where:{
                id
            }
        })

        return res.status(204).json({
            feature
        }).end()

    }catch(e:any){
        statusError.message=e.message
        statusError.status ="fail"
        statusError.statusCode =400
        next(statusError)
    }

}

