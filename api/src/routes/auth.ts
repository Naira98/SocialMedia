import express from "express";
import { login, logout, refresh } from "../controllers/auth";
import { verifyToken } from "../middlewares/is-auth";

const router = express.Router();

router.post("/login", login);

router.post("/refresh", refresh);

router.post("/logout", verifyToken, logout);

export default router;
