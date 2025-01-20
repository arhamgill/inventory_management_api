import express from "express";
import { createUser } from "@/controllers/users";

const userRouter = express.Router();

userRouter.post("/", createUser);

export default userRouter;
