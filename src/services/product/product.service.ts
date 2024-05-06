import { Repository } from "typeorm";
import { Product } from "../../models/product";
import { ProductDTO } from "../../dto/product.dto";

export class ProductService {
  constructor(private readonly ProductRepository: Repository<Product>) {}

  async getAll(): Promise<Product[]> {
    return await this.ProductRepository.find();
  }

  async getProduct(id: string): Promise<Product | null> {
    return await this.ProductRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async registerProduct(productDTO: ProductDTO): Promise<Product> {
    const product: Product = this.ProductRepository.create(productDTO);

    return await this.ProductRepository.save(product);
  }

  async patchProduct(id: string, productDTO: ProductDTO): Promise<Product> {
    const product = await this.ProductRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!product) {
      throw new Error("Produto não encontrado!");
    }

    Object.assign(product, productDTO);

    return await this.ProductRepository.save(product);
  }

  async deleteProduct(id: string): Promise<Product> {
    const product = await this.ProductRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!product) {
      throw new Error("Produto não encontrado!");
    }

    await this.ProductRepository.remove(product);

    return product;
  }
}
