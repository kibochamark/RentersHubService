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
const categorySchema = Joi.object({
    name:Joi.string().required(),
})

// update schema
const updateCategorySchema =Joi.object({
    id:Joi.string().required(),
    name:Joi.string().optional()
    
})

// get all categories available 
export async function propertycategories(req:Request, res:Response, next:NextFunction): Promise<any>{

    try{
        const getcategories = await prisma.propertyCategory.findMany()

        return res.status(200).json({
            message:"success",
            data:getcategories
        })

    }catch(e:any){
        statusError.message=e.message
        statusError.status ="fail"
        statusError.statusCode =400
        next(statusError)
    }

}




export async function propertycategorybyid (req:Request, res:Response, next:NextFunction): Promise<any>{

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

        const getcategory = await prisma.propertyCategory.findUnique({
            where:{
                id
            }
        })

        return res.status(200).json({
            message:"success",
            data:getcategory
        })

    }catch(e:any){
        statusError.message=e.message
        statusError.status ="fail"
        statusError.statusCode =400
        next(statusError)
    }

}


// mutation apis,,,create , delete and update a user
export async function propertycategorycreate(req:Request, res:Response, next:NextFunction): Promise<any>{

    try{
        const { error, value } = categorySchema.validate(req.body, { abortEarly: false });

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


        const { name} = value;

        const propertycategory = await prisma.propertyCategory.create({
            data:{
                name
                
            }
        })

        return res.status(201).json({
            message:"success",
            data:propertycategory
        })

    }catch(e:any){
        statusError.message=e.message
        statusError.status ="fail"
        statusError.statusCode =400
        next(statusError)
    }

}

export  async function propertycategoryupdate(req:Request, res:Response, next:NextFunction): Promise<any>{

    try{
        const { error, value } =updateCategorySchema.validate(req.body, { abortEarly: false });

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

        const propertyCategory = await prisma.propertyCategory.update({
            where:{
                id
            },
            data:{
                name
            }
        })

        return res.status(200).json({
            message:"success",
            data:propertyCategory
        })

    }catch(e:any){
        statusError.message=e.message
        statusError.status ="fail"
        statusError.statusCode =400
        next(statusError)
    }

}


export async function deletepropertycategory(req:Request, res:Response, next:NextFunction): Promise<any>{

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

        const category =await prisma.propertyCategory.delete({
            where:{
                id
            }
        })
        return res.status(204).json({
            category
        }).end()


    }catch(e:any){
        statusError.message=e.message
        statusError.status ="fail"
        statusError.statusCode =400
        next(statusError)
    }

}




