import express, { Request, Response } from "express";
import { ProductController } from "../controllers/product.controller";
import { ProductService } from "../services/product.service";
import { ProductDTO } from "../schemas/product.schema";
import { productRepository } from "../repositories/product.repository";
import { colorRepository } from "../repositories/color.repository";

const productRouter = express.Router();

const productService = new ProductService(productRepository, colorRepository);
const productController = new ProductController(productService);

productRouter.get("/", async (req: Request, res: Response) => {
  const id: string = req.query.id as string;

  if (!id) {
    const { statusCode, body } = await productController.getAll();
    return res.status(statusCode).json(body);
  }

  const { statusCode, body } = await productController.getProduct(id);
  return res.status(statusCode).json(body);
});

productRouter.post("/", async (req: Request, res: Response) => {
  const productDTO: ProductDTO = req.body;
  const { statusCode, body } =
    await productController.createProduct(productDTO);

  return res.status(statusCode).json(body);
});

productRouter.patch("/:id", async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const productDTO: ProductDTO = req.body;

  const { statusCode, body } = await productController.patchProduct(
    id,
    productDTO
  );

  return res.status(statusCode).json(body);
});

productRouter.delete("/:id", async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const { statusCode, body } = await productController.deleteProduct(id);

  return res.status(statusCode).json(body);
});

export default productRouter;
