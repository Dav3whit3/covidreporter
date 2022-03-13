// Import models here
import { Router } from "express";
import passport from "passport";


const router = Router();

/* GET home page */
router.get("/", (req, res, next) => 
  res.render("index", { currentUser: req.session.currentUser })
);

export { router };
