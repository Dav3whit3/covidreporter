// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
//import dotenv from 'dotenv'
//dotenv.config();
import 'dotenv/config';

// ℹ️ Connects to the database
//import { } from './db.config.js';

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
import express from 'express';
const app = express();

// ℹ️  Add config app. It runs most middlewares
import { config } from './app.config.js'
config(app)

// default value for title local
const projectName = 'covidreporter';
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();
app.locals.title = `${capitalized(projectName)}`;

// 👇 Start handling routes here
import { router } from '../routes/index.routes.js'
app.use('/', router);

import { authrouter } from "../routes/auth.routes.js";
app.use('/', authrouter)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
import { errorHandling } from '../utils/errorsConfig.js'
errorHandling(app)



export { app }