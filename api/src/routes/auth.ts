import express from "express";
import { login, logout, refresh } from "../controllers/auth";
import { verifyToken } from "../middlewares/is-auth";
import { loginValidation } from "../validation/auth-validate";

const router = express.Router();

router.post("/login",loginValidation ,login);

router.post("/refresh", refresh);

router.post("/logout", verifyToken, logout);

export default router;
