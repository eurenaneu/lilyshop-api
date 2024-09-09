import { z } from "zod";
import { ProductSchema } from "./product.schema";
import { ReceiptSchema } from "./receipt.schema";

export type ReceiptItemDTO = z.infer<typeof ReceiptItemSchema>

export const ReceiptItemSchema = z.object({
    id: z.string().uuid().optional(),
    product: ProductSchema,
    receipt: ReceiptSchema,
    unitPrice: z.number().min(0.01, "Preço unitário mínimo inválido (mín.: R$0,01)"),
    quantity: z.number().min(1, "Quantidade mínima inválida (mín.: 1)"),
    subtotal: z.number().positive()
}).refine(schema => schema.subtotal >= schema.unitPrice, {
    message: "Subtotal do pedido deve ser maior ou igual ao preço unitário"
});