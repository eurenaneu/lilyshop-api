import { Repository } from "typeorm";
import { Cart } from "../models/cart";
import { CartSchema, CreateCartDTO } from "../schemas/cart.schema";
import { CartItemSchema } from "../schemas/cartItem.schema";
import dataSource from "../database/datasource";
import { User } from "../models/user";
import { UserNotFound } from "../error/user.error";
import { Product } from "../models/product";
import { ProductNotFound } from "../error/product.error";
import { CartItem } from "../models/cartItem";
import { CartNotFound } from "../error/cart.error";

export class CartService {
  constructor(private readonly cartRepository: Repository<Cart>) {}

  async getAll(): Promise<Cart[]> {
    return await this.cartRepository.find({ relations: ["cart_item"] });
  }

  async getCartById(cartId: string): Promise<Cart | null> {
    return await this.cartRepository.findOne({
      where: { id: cartId },
      relations: ["cart_item"],
    });
  }

  async createCart(createCartDTO: CreateCartDTO): Promise<Cart | null> {
    return await dataSource.manager.transaction(async (transactionalEntityManager) => {
      const cartDTO = CartSchema.parse(createCartDTO.cart);
      const cartItemsDTO = createCartDTO.cartItems;

      const user = await transactionalEntityManager.findOneBy(User, { id: cartDTO.user.id });

      if (!user) {
        throw new UserNotFound();
      }

      const cart = transactionalEntityManager.create(Cart, cartDTO);

      const savedCart = await transactionalEntityManager.save(Cart, cart);

      for (const item of cartItemsDTO) {
        const itemDTO = CartItemSchema.parse(item);
        
        const itemProduct = await transactionalEntityManager.findOneBy(
          Product,
          { id: item.product.id }
        );

        if (!itemProduct) {
          throw new ProductNotFound();
        }

        const cartItem = transactionalEntityManager.create(CartItem, {
          ...itemDTO,
          cart: savedCart,
          unitPrice: itemProduct.unitPrice,
          subtotal: item.quantity * itemProduct.unitPrice
        });

        await transactionalEntityManager.save(CartItem, cartItem);
        
        savedCart.subtotal += cartItem.subtotal;
      }
        
      return await transactionalEntityManager.save(Cart, savedCart);
    });
  }

  async deleteCart(cartId: string): Promise<Cart> {
    const cart = await this.cartRepository.findOneBy({ id: cartId });

    if (!cart) {
      throw new CartNotFound();
    }

    return await this.cartRepository.remove(cart);
  }
}
