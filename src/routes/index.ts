import express from 'express';
import { deleteuser, userbykinde, usercreate, users, userupdate, userbyid } from '../controllers/user';
import { deletepropertytype, propertyTypebyid, propertyTypecreate, propertyTypeupdate, propertytypes } from '../controllers/types';
import { deletepropertyfeature, propertyFeaturecreate, propertyFeatureupdate, propertyfeaturebyid, propertyfeatures } from '../controllers/features';
import { createCompany, deleteCompany, getAllCompanies, getCompanyById, updateCompany } from '../controllers/company';
import { deletepropertycategory, propertycategories, propertycategorybyid, propertycategorycreate, propertycategoryupdate } from '../controllers/categories';
import { createProperty, deleteProperty, deletePropertyByCompanyId, getAllProperties, getProperty, getPropertyByCompanyId, updateProperty } from '../controllers/property';

// Define the router
const routes = express.Router();

// Users
routes.get('/users', users); // Corrected path
routes.get('/user/:kinde_id', userbykinde); // Corrected path
routes.get('/userbyid/:id', userbyid); // Ensure `userbyid` is imported from your controllers
routes.post('/user', usercreate); // Corrected path
routes.patch('/user', userupdate); // Added ":id" to specify the user being updated
routes.delete('/user/:id', deleteuser); // Consistent naming and corrected path





// property types
routes.get('/propertytypes', propertytypes); // Corrected path
routes.get('/propertytype/:id', propertyTypebyid); // Ensure `userbyid` is imported from your controllers
routes.post('/propertytype', propertyTypecreate); // Corrected path
routes.patch('/propertytype', propertyTypeupdate); // Added ":id" to specify the user being updated
routes.delete('/propertytype/:id', deletepropertytype); // Consistent naming and corrected path


// property features
routes.get('/propertyfeatures', propertyfeatures); // Corrected path
routes.get('/propertyfeature/:id', propertyfeaturebyid); // Ensure `userbyid` is imported from your controllers
routes.post('/propertyfeature', propertyFeaturecreate); // Corrected path
routes.patch('/propertyfeature', propertyFeatureupdate); // Added ":id" to specify the user being updated
routes.delete('/propertyfeature/:id', deletepropertyfeature); // Consistent naming and corrected path

// company
routes.get('/companies', getAllCompanies); // Corrected path
routes.get('/company/:id',getCompanyById); // Ensure `userbyid` is imported from your controllers
routes.post('/company',createCompany); // Corrected path
routes.put('/company', updateCompany); // Added ":id" to specify the user being updated
routes.delete('/company/:id', deleteCompany); // Consistent naming and corrected path


// categories
routes.get('/propertycategories', propertycategories); // Corrected path
routes.get('/propertycategory/:id', propertycategorybyid); // Ensure `userbyid` is imported from your controllers
routes.post('/propertycategory', propertycategorycreate); // Corrected path
routes.patch('/propertycategory', propertycategoryupdate); // Added ":id" to specify the user being updated
routes.delete('/propertycategory/:id', deletepropertycategory); // Consistent naming and corrected path


// properties
routes.get('/properties', getAllProperties); // Corrected path
routes.get('/companyproperties/:id', getPropertyByCompanyId); // Ensure `userbyid` is imported from your controllers
routes.get('/property/:id', getProperty); // Ensure `userbyid` is imported from your controllers
routes.post('/property', createProperty); // Corrected path
routes.patch('/property', updateProperty); // Added ":id" to specify the user being updated
routes.delete('/property/:id', deleteProperty); // Consistent naming and corrected path
routes.delete('/propertiesbycompanyid/:id', deletePropertyByCompanyId); // Consistent naming and corrected path



export default routes;
