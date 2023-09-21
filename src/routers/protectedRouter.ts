import { Router } from "express";
import { body } from "express-validator";

import validationMiddleware from "../middleware/validationMiddleware";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../handlers/product";

const router = Router();

/**
 * Products
 *  */
router.get("/product", getProducts);
router.get("/product/:id", getProduct);
router.put("/product/:id", [body("name").isString(), validationMiddleware], updateProduct);
router.post("/product", [body("name").isString(), validationMiddleware], createProduct);
router.delete("/product/:id", deleteProduct);

/**
 * Updates
 *  */
router.get("/update", () => {});
router.get("/update/:id", () => {});
router.put("/update/:id", () => {});
router.post("/update", () => {});
router.delete("/update/:id", () => {});

export default router;