import express, { Request, Response } from "express";
import { CartController } from "../controllers/cart.controller";
import { cartRepository } from "../repositories/cart.repository";
import { CartService } from "../services/cart.service";
import { invalidateCache, storeCache } from "../middlewares/cache.middleware";
import { Cart } from "../models/cart";

const cartRouter = express.Router()

const cartService = new CartService(cartRepository);
const cartController = new CartController(cartService);

cartRouter.get("/", storeCache<Cart[]>(), async (req: Request, res: Response) => {
    const { statusCode, body } = await cartController.getAll();
    return res.status(statusCode).json(body);
});

cartRouter.get("/:id", storeCache<Cart>(), async (req: Request, res: Response) => {
    const id = req.params.id;

    const { statusCode, body } = await cartController.getCartById(id);
    return res.status(statusCode).json(body);
});

cartRouter.post("/", invalidateCache<Cart>(), async (req: Request, res: Response) => {
    const { statusCode, body } = await cartController.createCart(req);
    return res.status(statusCode).json(body);
});

export default cartRouter;