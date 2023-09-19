import { Router } from "express";
import { createUser, signIn } from "../handlers/user";

const router = Router();

/**
 * Basic
 * */
router.get("/", (_req, res) => {
  res.status(200);
  res.json({ message: "Hello World!" });
});
router.post("/register", createUser);
router.post("/login", signIn);

export default router;