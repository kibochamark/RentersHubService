import { Request, Response, NextFunction } from 'express';
import { Property } from '@prisma/client';
import Joi, { object } from 'joi';
import { GlobalError } from '../../types/errorTypes';
import { prisma } from '../../utils/prismaclient';


// Define a global variable for status error

let statusError: GlobalError = new Error();

const schema = Joi.object({
    name: Joi.string().required(),
    vacancyCount: Joi.number().integer(),
    rentalprice: Joi.number().default(0),
    depostamount: Joi.number().default(0),
    watercharges: Joi.number().default(0),
    garbagefees: Joi.number().default(0),
    electricityfees: Joi.number().default(0),
    internetfees: Joi.number().default(0),
    propertyTypeId: Joi.string().required(),
    propertyCategoryId: Joi.string().required(),
    propertyFeatures: Joi.array().items(Joi.string()),
    userId: Joi.string().required(),
    contactperson: Joi.string().required(),
    contactphone: Joi.string().required(),
    companyId: Joi.string().required(),
    description: Joi.string().required(),
    propertyImages: Joi.array().items(Joi.object({
        imageUrl: Joi.string().required(),
        createdAt: Joi.date().default(new Date())
    })),
    location: Joi.object({
        latitude: Joi.string().required(),
        longitude: Joi.string().required(),
        name: Joi.string().required(),
        state: Joi.string().required(),
        country: Joi.string().required(),
        county: Joi.string().required()
    }).required(),
});


const getIdSchema = Joi.object({
    id: Joi.string().required(),
})


// update schema
const updateschema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string(),
    active: Joi.boolean(),
    featured: Joi.boolean(),
    vacant: Joi.boolean(),
    vacancyCount: Joi.number().integer(),
    rentalprice: Joi.number(),
    depostamount: Joi.number(),
    watercharges: Joi.number(),
    garbagefees: Joi.number(),
    electricityfees: Joi.number(),
    internetfees: Joi.number(),
    propertyTypeId: Joi.string(),
    propertyCategoryId: Joi.string(),
    propertyFeatures: Joi.array().items(Joi.string()),
    userId: Joi.string(),
    contactperson: Joi.string(),
    contactphone: Joi.string(),
    companyId: Joi.string(),
    description: Joi.string(),
    propertyImages: Joi.array().items(Joi.object({
        imageUrl: Joi.string(),
        createdAt: Joi.date().default(new Date())
    })),
    location: Joi.object({
        latitude: Joi.string(),
        longitude: Joi.string(),
        name: Joi.string(),
        state: Joi.string(),
        country: Joi.string(),
        county: Joi.string()
    })
}).min(1); //at least one field is required



//Create Property
export const createProperty = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {


        const { error, value } = schema.validate(req.body, { abortEarly: false });

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
            vacancyCount,
            rentalprice,
            depostamount,
            watercharges,
            garbagefees,
            electricityfees,
            internetfees,
            propertyTypeId,
            propertyCategoryId,
            propertyFeatures,
            propertyImages,
            userId,
            contactperson,
            contactphone,
            companyId,
            description,
            location,
        } = value

        // create a property transaction to insert its aproperty with its image/images



        const [newproperty] = await prisma.$transaction(async (tx) => {
            const newproperty = await tx.property.create({
                data: {
                    name,
                    vacancyCount,
                    rentalprice,
                    depostamount,
                    watercharges,
                    garbagefees,
                    electricityfees,
                    propertyImages,
                    internetfees,
                    propertyTypeId,
                    propertyCategoryId,
                    propertyFeatures,
                    userId,
                    contactperson,
                    contactphone,
                    companyId,
                    description,
                    location,
                }
            });



            return [newproperty]
        })


        res.status(201).json({
            status: 'success',
            data: newproperty,
        });
    } catch (error: any) {
        statusError.message = error.message
        statusError.status = "fail"
        statusError.statusCode = 400
        next(statusError)
    }
};

//Get All Properties
export const getAllProperties = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { limit, offset } = req.query
        const properties = await prisma.property.findMany({
            select: {
                id: true,
                name: true,
                propertyCategory: {
                    select: {
                        name: true
                    }
                },
                propertyType: {
                    select: {
                        name: true
                    }
                },
                rentalprice: true,
                vacant: true,
                featured: true,
                location: true
            },
            take: parseInt(limit as string) ?? 200,
            skip: parseInt(offset as string) ?? 0,
            orderBy: {
                updatedAt: 'desc'
            }
        });
        res.status(200).json({
            status: 'success',
            data: properties,
        });
    } catch (error: any) {
        statusError.message = error.message
        statusError.status = "fail"
        statusError.statusCode = 400
        next(statusError)
    }
};

//Get Single Property
export const getProperty = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
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

        const [formattedproperty] = await prisma.$transaction(async (tx) => {
            const fetchedproperty = await tx.property.findUnique({
                where: {
                    id,
                },
                include: {
                    propertyCategory: {
                        select: {
                            name: true
                        }
                    },
                    propertyType: {
                        select: {
                            name: true
                        }
                    }

                }
            })

            const features = await tx.propertyFeatures.findMany({
                where: {
                    id: {
                        in: fetchedproperty.propertyFeatures
                    }
                }
            })

            let formattedproperty = {
                ...fetchedproperty,
                propertyFeatures: features
            }

            return [formattedproperty]
        })
        res.status(200).json({
            status: 'success',
            data: formattedproperty,
        });
    } catch (error: any) {
        statusError.message = error.message
        statusError.status = "fail"
        statusError.statusCode = 400
        next(statusError)
    }
};
//Get Single Property by companyid
export const getPropertyByCompanyId = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
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

        const { limit, offset } = req.query
        const properties = await prisma.property.findMany({
            where: {
                companyId: id
            },
            select: {
                id: true,
                name: true,
                company: {
                    select: {
                        name: true
                    }
                },
                propertyCategory: {
                    select: {
                        name: true
                    }
                },
                propertyType: {
                    select: {
                        name: true
                    }
                },
                rentalprice: true,
                vacant: true,
                featured: true,
                location: true
            },
            take: parseInt(limit as string) ?? 200,
            skip: parseInt(offset as string) ?? 0,
            orderBy: {
                updatedAt: 'desc'
            }
        });
        res.status(200).json({
            status: 'success',
            data: properties,
        });
    } catch (error: any) {
        statusError.message = error.message
        statusError.status = "fail"
        statusError.statusCode = 400
        next(statusError)
    }
};

//Update Property
export const updateProperty = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {

        const { error, value } = updateschema.validate(req.body, { abortEarly: false });

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

        let convertedobj = Object.entries(req.body)


        let formattedbody = Object.fromEntries(convertedobj.filter(([key, value]) => key != "id"))


        const { id } = value

        const property = await prisma.property.update({
            where: { id },
            data: formattedbody,
        });
        res.status(200).json({
            status: 'success',
            data: property,
        });
    } catch (error: any) {
        statusError.message = error.message
        statusError.status = "fail"
        statusError.statusCode = 400
        next(statusError)
    }
};


//Delete Property
export const deleteProperty = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
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

        await prisma.property.delete({
            where: {
                id
            }
        })
        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (error: any) {
        statusError.message = error.message
        statusError.status = "fail"
        statusError.statusCode = 400
        next(statusError)
    }
};
//Delete Property by companyid
export const deletePropertyByCompanyId = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
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

        await prisma.property.deleteMany({
            where: {
                companyId: id
            }
        })
        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (error: any) {
        statusError.message = error.message
        statusError.status = "fail"
        statusError.statusCode = 400
        next(statusError)
    }
};
