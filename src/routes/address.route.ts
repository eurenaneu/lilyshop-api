import express, { Request, Response } from "express";
import { AddressController } from "../controllers/address.controller";
import { AddressService } from "../services/address.service";
import { addressRepository } from "../repositories/address.repository";

const addressRouter = express.Router();

const addressService = new AddressService(addressRepository);
const addressController = new AddressController(addressService);

addressRouter.get("/", async (req: Request, res: Response) => {
  const { statusCode, body } = await addressController.getAll();
  return res.status(statusCode).json(body);
});

addressRouter.get("/:id", async (req: Request, res: Response) => {
  const id: string = req.params.id;

  const { statusCode, body } = await addressController.getAddress(id);
  return res.status(statusCode).json(body);
})

addressRouter.post("/", async (req: Request, res: Response) => {
  const { statusCode, body } = await addressController.createAddress(req);

  return res.status(statusCode).json(body);
});

addressRouter.patch("/:id", async (req: Request, res: Response) => {
  const id: string = req.params.id;

  const { statusCode, body } = await addressController.patchAddress(id, req);

  return res.status(statusCode).json(body);
});

addressRouter.delete("/:id", async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const { statusCode, body } = await addressController.deleteAddress(id);

  return res.status(statusCode).json(body);
});

export default addressRouter;