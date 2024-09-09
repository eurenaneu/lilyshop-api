import addressRouter from "./address.route";
import cartRouter from "./cart.route";
import orderRouter from "./order.route";
import productRouter from "./product.route";
import userRouter from "./user.route";
import express from "express";

const router = express.Router();

router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/addresses", addressRouter);
router.use("/orders", orderRouter);
router.use("/carts", cartRouter);

export default router;