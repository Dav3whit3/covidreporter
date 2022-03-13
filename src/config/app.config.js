// We reuse this import in order to have access to the `body` property in requests
import express from "express";

//Mongo DB URI
import { MONGO_URI } from "./db.config.js";

// ℹ️ Responsible for the messages you see in the terminal as requests are coming in
// https://www.npmjs.com/package/morgan
import logger from "morgan";
// ℹ️ Needed when we deal with cookies (we will when dealing with authentication)
// https://www.npmjs.com/package/cookie-parser

import cookieParser from "cookie-parser";
// ℹ️ Serves a custom favicon on each request
// https://www.npmjs.com/package/serve-favicon
import favicon from "serve-favicon";

// Handles the handlebars https://www.npmjs.com/package/hbs
import hbs from "hbs";

import { expressSession } from "./session.config.js";
import { passportSession } from "./passport.config.js";

import passport from "passport";

// ℹ️ global package used to `normalize` paths amongst different operating systems
// https://www.npmjs.com/package/path
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware configuration
export const config = (app) => {
	// In development environment the app logs
	app.use(logger("dev"));

	// To have access to `body` property in the request
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(cookieParser());

	// Normalizes the path to the views folder
	app.set("views", path.join(__dirname, "..", "views"));
	// Sets the view engine to handlebars
	app.set("view engine", "hbs");
	hbs.registerPartials(path.join(__dirname, "..", "views/partials"));
	// Handles access to the public folder
	app.use(express.static(path.join(__dirname, "../..", "public")));
	// Handles access to the favicon
	app.use(
		favicon(path.join(__dirname, "../..", "public", "img", "favicon.ico"))
	);
	// Session config
	app.use(expressSession);
	passportSession()

	app.use(passport.initialize());
	app.use(passport.session());
};
