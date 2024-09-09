import { Order } from "../models/order";
import { CreateOrderDTO, OrderSchema } from "../schemas/order.schema";
import { OrderItem } from "../models/orderItem";
import { OrderItemSchema } from "../schemas/orderItem.schema";
import { Product } from "../models/product";
import dataSource from "../database/datasource";
import { User } from "../models/user";
import { Address } from "../models/address";
//import { OrderStatus } from "../models/orderStatus";
import { Repository } from "typeorm";
import { OrderNotFound } from "../error/order.error";
import { AddressNotFound } from "../error/address.error";
import { UserNotFound } from "../error/user.error";
import { ProductNotFound } from "../error/product.error";
import { PaymentMethod } from "../models/paymentMethod";

export class OrderService {
  constructor(
    private readonly orderRepository: Repository<Order>
  ) {}

  async getAll(): Promise<Order[]> {
    return await this.orderRepository.find({ relations: ["order_item"] });
  }

  async getOrderById(orderId: string): Promise<Order | null> {
    return await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ["order_item"],
    });
  }

  async createOrder(createOrderDTO: CreateOrderDTO) {
    return await dataSource.manager.transaction(async (transactionalEntityManager) => {
        const orderDTO = OrderSchema.parse(createOrderDTO.order);
        const orderItemsDTO = createOrderDTO.orderItems;

        const [address, user, paymentMethod] = await Promise.all([
          transactionalEntityManager.findOneBy(Address, {
            id: orderDTO.address.id,
          }),
          transactionalEntityManager.findOneBy(User, { id: orderDTO.user.id }),
          transactionalEntityManager.findOneBy(PaymentMethod, {
            id: orderDTO.paymentMethod.id,
          })
        ]);

        if (!address) {
          throw new AddressNotFound();
        }

        if (!user) {
          throw new UserNotFound();
        }

        if (!paymentMethod) {
          throw new Error("Método de pagamento inválido: Não existe");
        }

        const order = transactionalEntityManager.create(Order, {
          user: user,
          address: address,
          paymentMethod: paymentMethod,
          totalPrice: 0,
        });

        const savedOrder = await transactionalEntityManager.save(Order, order);

        for (const item of orderItemsDTO) {
          const itemDTO = OrderItemSchema.parse(item);

          const itemProduct = await transactionalEntityManager.findOneBy(
            Product,
            { id: item.product.id }
          );

          if (!itemProduct) {
            throw new ProductNotFound();
          }

          const orderItem = transactionalEntityManager.create(OrderItem, {
            ...itemDTO,
            order: savedOrder,
            unitPrice: itemProduct.unitPrice,
            subtotal: item.quantity * itemProduct.unitPrice,
          });

          await transactionalEntityManager.save(OrderItem, orderItem);

          savedOrder.totalPrice += orderItem.subtotal;
        }

        return await transactionalEntityManager.save(Order, savedOrder);
      }
    );
  }

  async deleteOrder(orderId: string): Promise<Order> {
    const order = await this.orderRepository.findOneBy({ id: orderId });

    if (!order) {
      throw new OrderNotFound();
    }

    return await this.orderRepository.remove(order);
  }
}
