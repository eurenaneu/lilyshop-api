import { z } from "zod"

export type CityDataDTO = z.infer<typeof CityDataSchema>;
export type StateDataDTO = z.infer<typeof StateDataSchema>;

export const CityDataSchema = z.object({
    "municipio-id": z.number(),
    "municipio-nome": z.string(),
    "UF-id": z.number()
});

export const StateDataSchema = z.object({
    id: z.number(),
    nome: z.string(),
    sigla: z.string()
});