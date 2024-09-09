import { z } from "zod"

export const ViaCepSchema = z.object({
    cep: z.string().length(8).refine(value => value.replace("-", "")),
    logradouro: z.string(),
    bairro: z.string(),
    ibge: z.string().length(7)
});