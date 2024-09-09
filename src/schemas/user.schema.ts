import { z } from "zod";

export type UserDTO = z.infer<typeof UserSchema>

const passwordValidation = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

export const UserSchema = z.object({
    id: z.string().uuid().optional(),
    firstName: z.string().min(1).max(256, "Limite de caracteres atingido (máx.: 256)"),
    lastName: z.string().min(1).max(256, "Limite de caracteres atingido (máx.: 256)"),
    cpf: z.string().length(11, "CPF inválido"),
    email: z.string().email("Endereço de e-mail inválido").max(256),
    password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres").regex(passwordValidation)
});