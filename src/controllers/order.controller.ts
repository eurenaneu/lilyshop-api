import { CreateOrderSchema } from "../schemas/order.schema";
import { Order } from "../models/order";
import { OrderService } from "../services/order.service";
import { HttpResponse, HttpStatus } from "../utils/httpResponse";
import { Request } from "express";
import { BaseError } from "../error/base.error";
import { OrderNotFound } from "../error/order.error";

export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  async getAll(): Promise<HttpResponse<Order[]>> {
    const orders = await this.orderService.getAll();

    return new HttpResponse(HttpStatus.OK, orders);
  }

  async getOrderById(id: string): Promise<HttpResponse<Order | unknown>> {
    try {
      const order = await this.orderService.getOrderById(id);

      return new HttpResponse(HttpStatus.OK, order);
    } catch (error) {
      return new HttpResponse(HttpStatus.NOT_FOUND, error);
    }
  }

  async createOrder(orderRequest: Request): Promise<HttpResponse<Order | unknown>> {
    try {
      const createOrderDTO = CreateOrderSchema.parse(orderRequest.body);

      const order = await this.orderService.createOrder(createOrderDTO);
      return new HttpResponse(HttpStatus.CREATED, order);
    } catch (error) {
      if (error instanceof BaseError) {
        return new HttpResponse(error.statusCode, error.message);
      }
      return new HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  //   async patchOrder(
  //     id: string,
  //     orderDTO: OrderDTO
  //   ): Promise<HttpResponse<Order | unknown>> {
  //     try {
  //       const order = await this.orderService.patchOrder(id, orderDTO);

  //       return new HttpResponse(HttpStatus.OK, order);
  //     } catch (error) {
  //       return new HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
  //     }
  //   }

    async deleteOrder(id: string): Promise<HttpResponse<Order | unknown>> {
      try {
        const order = await this.orderService.deleteOrder(id);

        return new HttpResponse(HttpStatus.OK, order);
      } catch (error) {
        if (error instanceof OrderNotFound) {
          return new HttpResponse(HttpStatus.NO_CONTENT, error.message);
        }
        return new HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
      }
    }
}
