import express from "express"
import { getUsers, getUserById, createUser, updateUser, deleteUser } from "../controllers/userController"
import { protect, admin } from "../middleware/authMiddleware"

const router = express.Router()

router.route("/").get(protect, admin, getUsers).post(protect, admin, createUser)

router.route("/:id").get(protect, admin, getUserById).put(protect, admin, updateUser).delete(protect, admin, deleteUser)

export default router
