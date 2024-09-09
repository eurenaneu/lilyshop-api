import { z } from "zod";
import { ProductSchema } from "./product.schema";

export type CartItemDTO = z.infer<typeof CartItemSchema>

export const CartItemSchema = z.object({
    id: z.string().uuid().optional(),
    product: ProductSchema,
    unitPrice: z.number().min(0.01, "Preço unitário mínimo inválido (mín.: R$0,01)"),
    quantity: z.number().min(1, "Quantidade mínima inválida (mín.: 1)"),
    subtotal: z.number()
}).refine(schema => schema.subtotal >= schema.unitPrice, {
    message: "Subtotal do item deve ser maior ou igual ao preço unitário"
});