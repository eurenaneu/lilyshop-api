import { CreateCartSchema } from "../schemas/cart.schema";
import { Cart } from "../models/cart";
import { HttpResponse, HttpStatus } from "../utils/httpResponse";
import { CartService } from "../services/cart.service";
import { Request } from "express";
import { ZodError } from "zod";
import { CartNotFound } from "../error/cart.error";

export class CartController {
  constructor(private readonly cartService: CartService) {}

  async getAll(): Promise<HttpResponse<Cart[]>> {
    const carts = await this.cartService.getAll();

    return new HttpResponse(HttpStatus.OK, carts);
  }

  async getCartById(id: string): Promise<HttpResponse<Cart | unknown>> {
    try {
      const cart = await this.cartService.getCartById(id);

      return new HttpResponse(HttpStatus.OK, cart);
    } catch (error) {
      return new HttpResponse(HttpStatus.NOT_FOUND, error);
    }
  }

  // async createCart(
  //   cartDTO: CartDTO,
  //   cartItemDTO: CartItemDTO[]
  // ): Promise<HttpResponse<Cart>> {
  //   const cart = await this.cartService.createCart(cartDTO, cartItemDTO);

  //   return new HttpResponse(HttpStatus.CREATED, cart);
  // }

  async createCart(cartRequest: Request): Promise<HttpResponse<Cart | unknown>> {
    try {
      const createCartDTO = CreateCartSchema.parse(cartRequest.body);

      const cart = await this.cartService.createCart(createCartDTO);
      return new HttpResponse(HttpStatus.CREATED, cart);
    } catch (error) {
      if (error instanceof ZodError) {
        return new HttpResponse(HttpStatus.BAD_REQUEST, error);
      }
      return new HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  // async patchCart(
  //   id: string,
  //   cartDTO: CartDTO
  // ): Promise<HttpResponse<Cart | unknown>> {
  //   try {
  //     const cart = await this.cartService.patchCart(id, cartDTO);

  //     return new HttpResponse(HttpStatus.OK, cart);
  //   } catch (error) {
  //     return new HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
  //   }
  // }

  async deleteCart(id: string): Promise<HttpResponse<Cart | unknown>> {
    try {
      const cart = await this.cartService.deleteCart(id);

      return new HttpResponse(HttpStatus.OK, cart);
    } catch (error) {
      if (error instanceof CartNotFound) {
        return new HttpResponse(HttpStatus.NO_CONTENT, error.message);
      }
      return new HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }
}
