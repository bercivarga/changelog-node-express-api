import { Request, Response } from "express";

import prisma from "../modules/db";
import { comparePassword, generateToken, hashPassword } from "../modules/auth";

export const createUser = async (req: Request, res: Response) => {
  if (req.method !== "POST") {
    res.status(405);
    res.json({ error: "Method not allowed" });
    return;
  }

  if (!req.body.email || !req.body.password || !req.body.name) {
    res.status(400);
    res.json({ error: "Please provide an email, password, and name" });
    return;
  }

  const { email, password, name } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: await hashPassword(password),
        name
      },
    });

    const token = generateToken(user);

    res.status(201);
    res.json({ token });
  } catch (error) {
    res.status(500);
    res.json({ error });
  }
}

export const signIn = async (req: Request, res: Response) => {
  if (req.method !== "POST") {
    res.status(405);
    res.json({ error: "Method not allowed" });
    return;
  }

  if (!req.body.email || !req.body.password) {
    res.status(400);
    res.json({ error: "Please provide an email and password" });
    return;
  }

  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      res.status(400);
      res.json({ error: "User not found" });
      return;
    }

    const valid = await comparePassword(password, user.password);

    if (!valid) {
      res.status(400);
      res.json({ error: "Invalid password" });
      return;
    }

    const token = generateToken(user);

    res.status(200);
    res.json({ token });
  } catch (error) {
    res.status(500);
    res.json({ error });
  }
}