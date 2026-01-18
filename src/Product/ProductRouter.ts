import express, { Request, Response } from "express";
import { prisma } from "../lib/prisma";

const router = express.Router();

// GET /products
router.get("/", async (req: Request, res: Response) => {
  const { category } = req.query;

  try {
    const products = await prisma.product.findMany({
      where: category ? { category: String(category) } : undefined,
    });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /products/:id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /products
router.post("/", async (req: Request, res: Response) => {
  const { name, price, category, inStock, image } = req.body;

  if (!name || price === undefined) {
    return res.status(400).json({ message: "Invalid data" });
  }

  try {
    const product = await prisma.product.create({
      data: { name, price, category, inStock, image },
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
