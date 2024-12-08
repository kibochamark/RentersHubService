// // Suggested code may be subject to a license. Learn more: ~LicenseLog:2752666768.

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


import express from 'express';
import { deleteuser, userbykinde, usercreate, users, userupdate, userbyid } from '../controllers/user';

// Define the router
const routes = express.Router();

// Users
routes.get('/users', users); // Corrected path
routes.get('/user/:kinde_id', userbykinde); // Corrected path
routes.get('/user/:id', userbyid); // Ensure `userbyid` is imported from your controllers
routes.post('/user', usercreate); // Corrected path
routes.patch('/user/:id', userupdate); // Added ":id" to specify the user being updated
routes.delete('/user/:id', deleteuser); // Consistent naming and corrected path


export default routes;
