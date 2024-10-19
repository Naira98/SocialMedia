import express from "express";
import { login, logout, refresh, register } from "../controllers/auth";
import {
  loginValidation,
  registerValidation,
} from "../validation/auth-validate";
import { upload } from "../config/multer";
import { verifyToken } from "../middlewares/is-auth";

const router = express.Router();

/* /api/auth */

router.post(
  "/register",
  upload.single("picture"),
  registerValidation,
  register
);

router.post("/login", loginValidation, login);

router.post("/refresh", refresh);

router.post("/logout", verifyToken, logout);

export default router;
