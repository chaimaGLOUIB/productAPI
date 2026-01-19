"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = require("../lib/prisma");
const router = express_1.default.Router();
// GET /products
router.get("/", async (req, res) => {
    const { category } = req.query;
    try {
        const products = await prisma_1.prisma.product.findMany({
            where: category ? { category: String(category) } : undefined,
        });
        res.json(products);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
// GET /products/:id
router.get("/:id", async (req, res) => {
    try {
        const product = await prisma_1.prisma.product.findUnique({
            where: { id: Number(req.params.id) },
        });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
// POST /products
router.post("/", async (req, res) => {
    const { name, price, category, inStock, image } = req.body;
    if (!name || price === undefined) {
        return res.status(400).json({ message: "Invalid data" });
    }
    try {
        const product = await prisma_1.prisma.product.create({
            data: { name, price, category, inStock, image },
        });
        res.status(201).json(product);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.default = router;
