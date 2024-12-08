import express from 'express';
import { useTreblle } from 'treblle';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import compression from 'compression';
import { GlobalError } from '../types/errorTypes';
import routes from './routes';

dotenv.config();

const app = express();

// // Setting up Treblle for API monitoring
// useTreblle(app, {
//   apiKey: process.env.TREBLLE_API_KEY!,
//   projectId: process.env.TREBLLE_APP_ID!,
// });

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());

// Root route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "hello",
  });
});


// Mount the router to the app with a base path
app.use('/api/v1', routes); // Now routes will be available under /api

// Catch all routes that are not specified
app.use('*', (req, res, next) => {
  const error: GlobalError = new Error(`Cannot find ${req.originalUrl} on the server`) as GlobalError;
  error.status = 'fail';
  error.statusCode = 404;

  next(error); // Forward the error to the global error handler
});

// Create global error handler
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

const port = parseInt(process.env.PORT! || '3000', 10);
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
