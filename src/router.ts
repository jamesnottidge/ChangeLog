import { Router } from "express";
import { IncomingMessage, ServerResponse } from "http";
import { body, validationResult } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import prisma from "./db";
import {
  createProduct,
  getOneProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "./handlers/product";

import {
  getUpdates,
  getOneUpdate,
  updateUpdate,
  createUpdate,
  deleteUpdate,
} from "./handlers/update";

const router = Router();

router.get("/product", getProducts);

router.get("/product/:id", getOneProduct);

router.put(
  "/product/:id",
  body("name").isString(),

  handleInputErrors,
  updateProduct
);

router.post(
  "/product",
  body("name", "this is a lot").isString().trim().notEmpty(),
  handleInputErrors,
  createProduct
);

router.delete("/product/:id", deleteProduct);

router.get("/update", getUpdates);

router.get("/update/:id", getOneUpdate);

router.put(
  "/update/:id",
  body("title").optional().isString().trim().notEmpty(),
  body("body").optional().trim().notEmpty(),
  body("version").optional().isString().trim().notEmpty(),
  body("asset").optional().isString().trim().notEmpty(),
  body("status").isIn([" IN_PROGRESS", "SHIPPED", "DEPRECATED"]),
  updateUpdate
);

router.post(
  "/update",
  body("title").isString().trim().notEmpty(),
  body("body").trim().notEmpty(),
  body("version").optional().isString().trim().notEmpty(),
  body("asset").optional().isString().trim().notEmpty(),
  body("productId").isString().trim().notEmpty(),
  body("status").isIn([" IN_PROGRESS", "SHIPPED", "DEPRECATED"]),
  //   body("productId").custom(async (value, { req }) => {
  //     const user = await prisma.user.findUnique({
  //       where: {
  //         id: req.user.id,
  //       },
  //     });
  //     console.log(user);
  //   }),
  //   body("UpdatePoints").isArray(),
  handleInputErrors,
  createUpdate
);

router.delete("/update/:id", deleteUpdate);

router.get("/updatepoint", (req, res) => {});

router.get("/updatepoint/:id", (req, res) => {});

router.put(
  "/updatepoint/:id",
  body("name").isString().trim().notEmpty(),
  body("description").isString().trim().notEmpty(),
  handleInputErrors,
  (req, res) => {}
);

router.post(
  "/updatepoint",
  body("name").isString().trim().notEmpty(),
  body("description").isString().trim().notEmpty(),
  handleInputErrors,
  (req, res) => {}
);

router.delete("/updatepoint/:id", (req, res) => {});

export default router;
