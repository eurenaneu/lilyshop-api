import { z } from "zod";
import { UserSchema } from "./user.schema";
import { AddressSchema } from "./address.schema";
import { PaymentMethodSchema } from "./paymentMethod.schema";
import { OrderItemSchema } from "./orderItem.schema";

export type OrderDTO = z.infer<typeof OrderSchema>

const OrderStatusSchema = z.object({
    id: z.number({
        required_error: "ID do Status é necessário"
    }).positive(),
    orderStatus: z.string().min(1)
});

export const OrderSchema = z.object({
    id: z.string().uuid().optional(),
    user: UserSchema.extend({ id: z.string().uuid() }),
    address: AddressSchema.extend({ id: z.string().uuid() }),
    orderStatus: OrderStatusSchema,
    paymentMethod: PaymentMethodSchema,
    totalPrice: z.number().min(0.01, "Total da compra inválido (mín.: R$0,01)"),
});

export const CreateOrderSchema = z.object({
    order: OrderSchema,
    orderItems: z.array(OrderItemSchema).min(1, "Pedido deve conter no mínimo 1 item")
});

export type CreateOrderDTO = z.infer<typeof CreateOrderSchema>