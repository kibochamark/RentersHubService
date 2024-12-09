import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { GlobalError } from '../../types/errorTypes';
import { prisma } from '../../utils/prismaclient';


// global error
let statusError: GlobalError = new Error("")

// Define Joi schemas for validation
const companySchema = Joi.object({
    name: Joi.string().required(),
    sociallinks: Joi.array().items(Joi.object({
        // Define Sociallinks schema here
        name: Joi.string().required(),
        url: Joi.string().required(),
    })),
    address: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().email().required(),
    website: Joi.string().uri().optional(),
    logo: Joi.string().optional(),
    employees: Joi.number().integer().min(0).default(0)
});

// Define Joi schemas for validation
const updateCompanySchema = Joi.object({
    id:Joi.string().required(),
    name: Joi.string().optional(),
    sociallinks: Joi.array().items(Joi.object({
        // Define Sociallinks schema here
        name: Joi.string().optional(),
        url: Joi.string().optional(),
    })),
    address: Joi.string().optional(),
    phone: Joi.string().optional(),
    email: Joi.string().email().optional(),
    website: Joi.string().uri().optional(),
    logo: Joi.string().optional(),
    employees: Joi.number().integer().min(0).default(0)
});



const getIdSchema = Joi.object({
    id:Joi.string().required(),
})



// Create a new company
export const createCompany = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { error, value } = companySchema.validate(req.body, { abortEarly: false });
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


        const {
            name,
            sociallinks,
            address,
            phone,
            email,
            website,
            logo,
            employees

        } = value;




        const newCompany = await prisma.company.create({
            data: {
                name,
                sociallinks,
                address,
                phone,
                email,
                website,
                logo,
                employees
            }
        })

        return res.status(201).json({
            message:"success",
            data:newCompany
        })
    } catch (e:any) {
        statusError.message = e.message
        statusError.status = "fail"
        statusError.statusCode = 400
        next(statusError)
    }
};

// Get all companies
export const getAllCompanies = async (req: Request, res: Response, next:NextFunction): Promise<any> => {
    try {
        const getcompanies = await prisma.company.findMany()

        return res.status(200).json({
            message:"success",
            data:getcompanies
        })
    } catch (error) {
        statusError.message=error.message
        statusError.status ="fail"
        statusError.statusCode =400
        next(statusError)
    }
};

// Get a company by ID
export const getCompanyById = async (req: Request, res: Response, next:NextFunction): Promise<any> => {
    try {
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

        const getcompany = await prisma.company.findUnique({
            where:{
                id
            }
        })

        return res.status(200).json({
            message:"success",
            data:getcompany
        })

    }catch(e:any){
        statusError.message=e.message
        statusError.status ="fail"
        statusError.statusCode =400
        next(statusError)
    }
};


// Update a company
export const updateCompany = async (req: Request, res: Response, next:NextFunction): Promise<any> => {
    try {
        const companyId = req.params.id;
        const { error, value } = updateCompanySchema.validate(req.body, {abortEarly:false});
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }


        const {
            id,
            name,
            sociallinks,
            address,
            phone,
            email,
            website,
            logo,
            employees

        } = value;




        const updatedCompany = await prisma.company.update({
            where:{
id
            },
            data:{
                name,
                sociallinks,
                address,
                phone,
                email,
                website,
                logo,
                employees 
            }
        })

        return res.status(200).json({
            message:"success",
            data:updatedCompany
        })

    }catch(e:any){
        statusError.message=e.message
        statusError.status ="fail"
        statusError.statusCode =400
        next(statusError)
    }
};

// Delete a company
export const deleteCompany = async (req: Request, res: Response, next:NextFunction): Promise<any> => {
    try {
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

        await prisma.company.delete({
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
};
