import { z } from "zod";

export type ProductDTO = z.infer<typeof ProductSchema>

const ColorSchema = z.object({
    id: z.number(),
    color: z.string().min(1).max(20)
});

export const ProductSchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string().min(1, "Nome do produto com tamanho inválido (min.: 1 caractere)"),
    description: z.string().min(1, "Descrição não pode ser vazia"),
    unitPrice: z.number().min(0.01, "Preço unitário mínimo inválido (mín.: R$0,01)"),
    color: ColorSchema,
});