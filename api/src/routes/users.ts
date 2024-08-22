import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  updateAccount,
  addTwitter,
  addLinkedin,
} from "../controllers/users";
import { verifyToken } from "../middlewares/is-auth";
import {
  linkValidation,
  updateAccountValidation,
} from "../validation/user-validation";

const router = express.Router();

router.get("/:id", verifyToken, getUser);

router.get("/friends/:id", verifyToken, getUserFriends);

router.patch("/user", verifyToken, updateAccountValidation, updateAccount);

router.patch("/twitter", verifyToken, linkValidation, addTwitter);

router.patch("/linkedin", verifyToken, linkValidation, addLinkedin);

router.patch("/:friendId", verifyToken, addRemoveFriend);

export default router;
