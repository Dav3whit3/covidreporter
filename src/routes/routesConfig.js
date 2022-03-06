import express from "express";
// Import models here

const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index")
});

export { router };
