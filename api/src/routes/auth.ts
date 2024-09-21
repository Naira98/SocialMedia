import express from "express";
import { login, logout, refresh, register } from "../controllers/auth";
import {
  loginValidation,
  registerValidation,
} from "../validation/auth-validate";
import { upload } from "../config/multer";

const router = express.Router();

router.post(
  "/register",
  upload.single("picture"),
  registerValidation,
  register
);

router.post("/login", loginValidation, login);

router.post("/refresh", refresh);

router.post("/logout", logout);

export default router;
