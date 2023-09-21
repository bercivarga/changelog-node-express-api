import { Request, Response } from "express";
import prisma from "../modules/db";
import { getUserFromResponse } from "../modules/auth";

export const getProducts = async (req: Request, res: Response) => {
  const user = getUserFromResponse(res);

  const products = await prisma.product.findMany({
    where: {
      belongsTo: {
        id: user.id,
      },
    },
  });

  res.status(200);
  res.json({ products });
}

export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = getUserFromResponse(res);

  const product = await prisma.product.findUnique({
    where: {
      id: Number(id),
      belongsTo: {
        id: user.id,
      },
    },
  });

  if (product) {
    res.status(200);
    res.json({ product });
  } else {
    res.status(404);
    res.json({ message: "Not found" });
  }
}

export const createProduct = async (req: Request, res: Response) => {
  const { name } = req.body;

  const user = getUserFromResponse(res);

  try {
    const product = await prisma.product.create({
      data: {
        name,
        belongsTo: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  
    res.status(200);
    res.json({ product });
  } catch (error) {
    res.status(500);
    res.json({ message: "Couldn't complete request" });
  }
}

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = getUserFromResponse(res);

  try {
    const product = await prisma.product.update({
      where: {
        id: Number(id),
        belongsToId: user.id
      },
      data: { name },
    });
  
    res.status(200);
    res.json({ product });
  } catch (error) {
    res.status(404);
    res.json({ message: "Not found" });
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = getUserFromResponse(res);

  try {
    const product = await prisma.product.delete({
      where: {
        id: Number(id),
        belongsToId: user.id
      },
    });
  
    res.status(200);
    res.json({ product });
  } catch (error) {
    res.status(404);
    res.json({ message: "Not found" });
  }
}