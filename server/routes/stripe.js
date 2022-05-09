import express from "express";
import {
  createConnectAccount,
  getAccountStatus,
  getAcoountBalance,
} from "../controllers/stripe";
import { requireSignIn } from "../middlewares";
const router = express.Router();

//controllers

router.post("/create-connect-account", requireSignIn, createConnectAccount);
router.post("/get-account-status", requireSignIn, getAccountStatus);
router.post("/get-account-balance", requireSignIn, getAcoountBalance);

module.exports = router;
