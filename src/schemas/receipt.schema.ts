import { z } from "zod";
import { UserSchema } from "./user.schema";
import { OrderSchema } from "./order.schema";
import { PaymentMethodSchema } from "./paymentMethod.schema";

export type ReceiptDTO = z.infer<typeof ReceiptSchema>

export const ReceiptSchema = z.object({
    id: z.string().uuid().optional(),
    user: UserSchema,
    order: OrderSchema,
    paymentMethod: PaymentMethodSchema,
    totalPrice: z.number().min(0.01, "Total da compra inválido (mín.: R$0,01)"),
    //createdAt: z.date().max(new Date())
});