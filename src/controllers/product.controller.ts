import { ProductDTO } from "../schemas/product.schema";
import { Product } from "../models/product";
import { ProductService } from "../services/product.service";
import { HttpResponse, HttpStatus } from "../utils/httpResponse";
import { ProductNotFound } from "../error/product.error";
import { BaseError } from "../error/base.error";

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  async getAll(): Promise<HttpResponse<Product[]>> {
    const products = await this.productService.getAll();

    if (products.length === 0) {
      return new HttpResponse(HttpStatus.NO_CONTENT, products);
    }
    return new HttpResponse(HttpStatus.OK, products);
  }

  async getProduct(id: string): Promise<HttpResponse<Product | unknown>> {
    try {
      const product = await this.productService.getProduct(id);

      return new HttpResponse(HttpStatus.OK, product);
    } catch (error) {
      if (error instanceof BaseError) {
        return new HttpResponse(error.statusCode, error.message);
      }
      return new HttpResponse(HttpStatus.NOT_FOUND, error);
    }
  }

  async createProduct(productDTO: ProductDTO): Promise<HttpResponse<Product | unknown>> {
    try {
      const product: Product =
        await this.productService.createProduct(productDTO);

      return new HttpResponse(HttpStatus.CREATED, product);
    } catch (error) {
      return new HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async patchProduct(
    id: string,
    productDTO: ProductDTO
  ): Promise<HttpResponse<Product | unknown>> {
    try {
      const product = await this.productService.patchProduct(id, productDTO);

      return new HttpResponse(HttpStatus.OK, product);
    } catch (error) {
      return new HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async deleteProduct(id: string): Promise<HttpResponse<Product | unknown>> {
    try {
      const product = await this.productService.deleteProduct(id);

      return new HttpResponse(HttpStatus.OK, product);
    } catch (error) {
      if (error instanceof ProductNotFound) {
        return new HttpResponse(HttpStatus.NO_CONTENT, error.message);
      }
      return new HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }
}
