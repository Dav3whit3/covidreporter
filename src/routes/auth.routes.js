import { Router } from "express";
import { Login } from "../controllers/auth/login.js";

const authrouter = new Router();


authrouter.get('/signup', (req, res) =>
  res.render('auth/signup', {layout: false})
);


authrouter.post('/signup', (req, res, next) => {
  console.log('The form data: ', req.body);
  Login(req.body)
});


export { authrouter }

