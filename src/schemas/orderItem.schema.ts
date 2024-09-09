import { z } from "zod";
import { ProductSchema } from "./product.schema";
import { OrderSchema } from "./order.schema";

export type OrderItemDTO = z.infer<typeof OrderItemSchema>

export const OrderItemSchema = z.object({
    id: z.string().uuid().optional(),
    product: ProductSchema,
    order: OrderSchema,
    unitPrice: z.number().min(0.01, "Preço unitário mínimo inválido (mín.: R$0,01)"),
    quantity: z.number().min(1, "Quantidade mínima inválida (mín.: 1)"),
    subtotal: z.number().positive()
}).refine(schema => schema.subtotal >= schema.unitPrice, {
    message: "Subtotal do item deve ser maior ou igual ao preço unitário"
});