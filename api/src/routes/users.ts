import express from "express";
import { getUser, getUserFriends, addRemoveFriend } from "../controllers/users";
import { verifyToken } from "../middlewares/is-auth";
const router = express.Router();

router.get("/:id", verifyToken, getUser);

router.get("/friends/:id", verifyToken, getUserFriends);

router.patch("/:friendId", verifyToken, addRemoveFriend);

export default router;
