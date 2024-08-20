import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  updateAccount,
  addTwitter,
  addLinkedin
} from "../controllers/users";
import { verifyToken } from "../middlewares/is-auth";
const router = express.Router();

router.get("/:id", verifyToken, getUser);

router.get("/friends/:id", verifyToken, getUserFriends);

router.patch("/user", verifyToken, updateAccount);

router.patch("/twitter", verifyToken, addTwitter);

router.patch("/linkedin", verifyToken, addLinkedin);

router.patch("/:friendId", verifyToken, addRemoveFriend);


export default router;
