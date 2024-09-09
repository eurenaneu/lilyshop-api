import { z } from "zod";

export const PaymentMethodSchema = z.object({
    id: z.number({
        required_error: "ID do método de pagamento é necessário"
    }).positive(),
    paymentMethod: z.string().min(1)
});