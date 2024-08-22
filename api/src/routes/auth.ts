import express from "express";
import { login, refresh } from "../controllers/auth";
import { loginValidation } from "../validation/auth-validate";

const router = express.Router();

router.post("/login",loginValidation ,login);

router.post("/refresh", refresh);

export default router;
