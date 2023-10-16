import { Router } from "express";
import { IncomingMessage, ServerResponse } from "http";
import { body, validationResult } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import prisma from "./db";

const router = Router();

router.get("/product", (req, res) => {
  res.send(req.shhhh_secret);
});

router.get("/product/:id", (req, res) => {});

router.put(
  "/product/:id",
  body("name").isString(),

  handleInputErrors,
  (req, res) => {}
);

router.post(
  "/product",
  body("name", "this is a lot").isString().trim().notEmpty(),
  handleInputErrors,
  (req, res) => {
    const name: string = req.body.name;
    const product = prisma.product.create({
      data: {
        name,
        belongsToId: req.user.id,
      },
    });
    res.json({ product });
  }
);

router.delete("/product/:id", (req, res) => {});

router.get("/update", (req, res) => {});

router.get("/update/:id", (req, res) => {});

router.put(
  "/update/:id",
  body("title").isString().trim().notEmpty(),
  body("body").trim().notEmpty(),
  body("version").optional().isString().trim().notEmpty(),
  body("asset").optional().isString().trim().notEmpty(),
  body("status").isIn([" IN_PROGRESS", "SHIPPED", "DEPRECATED"]),
  (req, res) => {}
);

router.post(
  "/update",
  body("title").isString().trim().notEmpty(),
  body("body").trim().notEmpty(),
  body("version").optional().isString().trim().notEmpty(),
  body("asset").optional().isString().trim().notEmpty(),
  body("productId").isString().trim().notEmpty(),
  body("status").isIn([" IN_PROGRESS", "SHIPPED", "DEPRECATED"]),
  body("productId").custom(async (value, { req }) => {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });
    console.log(user);
  }),
  body("UpdatePoints").isArray(),
  handleInputErrors,
  (req, res) => {}
);

router.delete("/update/:id", (req, res) => {});

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
