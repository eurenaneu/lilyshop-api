import express, { Request, Response } from "express";
import { OrderController } from "../controllers/order.controller";
import { OrderService } from "../services/order.service";
import { orderRepository } from "../repositories/order.repository";

const orderRouter = express.Router();

const orderService = new OrderService(orderRepository);
const orderController = new OrderController(orderService);

orderRouter.get("/", async (req: Request, res: Response) => {
  const { statusCode, body } = await orderController.getAll();
  return res.status(statusCode).json(body);
});

orderRouter.get("/:id", async (req: Request, res: Response) => {
  const id: string = req.params.id;

  const { statusCode, body } = await orderController.getOrderById(id);
  return res.status(statusCode).json(body);
});

orderRouter.post("/", async (req: Request, res: Response) => {
  const { statusCode, body } = await orderController.createOrder(req);
  return res.status(statusCode).json(body);
});

orderRouter.delete("/:id", async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const { statusCode, body } = await orderController.deleteOrder(id);

  return res.status(statusCode).json(body);
});

export default orderRouter;
