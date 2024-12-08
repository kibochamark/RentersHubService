import express from 'express';
import { useTreblle } from 'treblle';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import compression from 'compression';
import { GlobalError } from '../types/errorTypes';

dotenv.config();

const app = express();

// setting up treblle for api monitoring
useTreblle(app, {
  apiKey: process.env.TREBLLE_API_KEY!,
  projectId: process.env.TREBLLE_APP_ID!,
});

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());

// catch all routes that are not specified in the routes folder
app.use('*', (req, res, next) => {
  const error: GlobalError = new Error(`Cannot find ${req.originalUrl} on the server`) as GlobalError;
  error.status = 'fail';
  error.statusCode = 404;

  next(error); // Forward the error to the global error handler
});

// create our global error handler
app.use(
  (
    error: GlobalError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    // Define default values for error
    const statusCode = error.statusCode || 500;
    const status = error.status || 'error';

    res.status(statusCode).json({
      status,
      message: error.message,
    });
  }
);

app.get('/', (req, res) => {
  const name = process.env.NAME || 'World';
  res.send(`Hello ${name}! ${req.baseUrl}`);
});

const port = parseInt(process.env.PORT! || '3000', 10);
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
