import { z } from "zod";
import { UserSchema } from "./user.schema";
import { CartItemSchema } from "./cartItem.schema";

export type CartDTO = z.infer<typeof CartSchema>

const CartStatusSchema = z.object({
    id: z.number({
        required_error: "ID do Status é necessário"
    }).positive(),
    cartStatus: z.string().min(1)
});

export const CartSchema = z.object({
    id: z.string().uuid().optional(),
    user: UserSchema,
    subtotal: z.number().min(0.01, "Valor mínimo do carrinho inválido (min.: R$0,01)"),
    cartStatus: CartStatusSchema,
    //createdAt: z.date().max(new Date())
});

export const CreateCartSchema = z.object({
    cart: CartSchema,
    cartItems: z.array(CartItemSchema).min(1, "Carrinho deve conter no mínimo 1 item")
});

export type CreateCartDTO = z.infer<typeof CreateCartSchema>