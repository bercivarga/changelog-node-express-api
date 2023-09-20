import { Router } from "express";
import {body, validationResult} from "express-validator";

const router = Router();

/**
 * Products
 *  */
router.get("/product", (req, res) => {
  res.status(200);
  res.json({ message: "Hello World!" });
});
router.get("/product/:id", (req, res) => {});
router.put("/product/:id", body("name").isString(), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    res.json({ errors: errors.array() });
  } else {
    res.status(200);
    res.json({ message: "Hello World!" });
  }
});
router.post("/product", () => {});
router.delete("/product/:id", () => {});

/**
 * Updates
 *  */
router.get("/update", () => {});
router.get("/update/:id", () => {});
router.put("/update/:id", () => {});
router.post("/update", () => {});
router.delete("/update/:id", () => {});

export default router;