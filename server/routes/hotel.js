import express from "express";
import formidable from "express-formidable";
import { createHotel, getHotels } from "../controllers/hotel";
import { requireSignIn } from "../middlewares";

const router = express.Router();

//if we are sending formdata that includes files by appending, we use formidable to parse them as the middleware

router.post("/create-hotel", requireSignIn, formidable(), createHotel);
router.get("/get-hotels", getHotels);

module.exports = router;
