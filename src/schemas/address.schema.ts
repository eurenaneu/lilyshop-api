import { z } from "zod";
import { UserSchema } from "./user.schema";

export type AddressDTO = z.infer<typeof AddressSchema>

const StateSchema = z.object({
    id: z.number({
        required_error: "ID da Cidade é necessário"
    }).positive(),
    state: z.string().min(1, "Nome do estado com tamanho inválido"),
    acronym: z.string().length(2, "A sigla do estado deve ter 2 caracteres")
});

const CitySchema = z.object({
    id: z.number({
        required_error: "ID da Cidade é necessário"
    }).positive("ID da Cidade deve ser positivo"),
    city: z.string().min(1, "Nome da cidade com tamanho inválido"),
    state: StateSchema
});

export const AddressSchema = z.object({
    id: z.string().uuid().optional(),
    user: UserSchema,
    cep: z.string().length(8, "CEP com tamanho inválido (tamanho: 8)"),
    street: z.string().min(1, "Nome da rua com tamanho inválido"),
    number: z.number().positive("Número deve ser positivo").optional(),
    complement: z.string().max(200, "Tamanho máximo de texto atingido (máx.: 200 caracteres)").optional(),
    district: z.string().min(1, "Nome do bairro com tamanho inválido"),
    city: CitySchema,
    state: StateSchema
});