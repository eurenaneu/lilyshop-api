import { Repository } from "typeorm";
import { Product } from "../models/product";
import { ProductDTO } from "../schemas/product.schema";
import { Color } from "../models/color";
import { ColorNotFound, ProductNotFound } from "../error/product.error";

export class ProductService {
  constructor(
    private readonly productRepository: Repository<Product>,
    private readonly colorRepository: Repository<Color>
  ) {}

  async getAll(): Promise<Product[]> {
    return await this.productRepository.find({ relations: ["color"] });
  }

  async getProduct(productId: string): Promise<Product | null> {
    const product = await this.productRepository.findOne({
      where: { id: productId },
      relations: ["color"]
    });

    if (!product) {
      throw new ProductNotFound();
    }

    return product;
  }

  async createProduct(productData: ProductDTO): Promise<Product> {
    const color = await this.colorRepository.findOneBy({ id: productData.color.id });

    if (!color) {
      throw new ColorNotFound();
    }

    const product = this.productRepository.create({ ...productData, color: color });

    return await this.productRepository.save(product);
  }

  async patchProduct(productId: string, productData: ProductDTO): Promise<Product> {
    const [ product, color ] = await Promise.all([
      await this.productRepository.findOneBy({ id: productId }),
      await this.colorRepository.findOneBy({ id: productData.color.id })
    ])

    if (!product) {
      throw new ProductNotFound();
    }

    if (!color) {
      throw new Error("Cor inválida: Não existe");
    }

    return await this.productRepository.save({ ...productData, color: color, id: productId });
  }

  async deleteProduct(productId: string): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id: productId });

    if (!product) {
      throw new ProductNotFound();
    }

    return await this.productRepository.remove(product);
  }
}
