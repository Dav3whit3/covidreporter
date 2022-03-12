import { Router } from "express";
import { Login } from "../controllers/auth/login.js";
import { Register } from "../controllers/auth/signup.js";

const authrouter = new Router();


authrouter.get('/signup', (req, res) =>
  res.render('auth/signup', {layout: false})
);


authrouter.post('/signup', (req, res, next) => {

  Register(req, res, next)

});


export { authrouter }

