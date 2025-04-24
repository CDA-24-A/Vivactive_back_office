import { z } from "zod";

export const FormSchema = z.object({
    title: z.string({
        required_error: "Le titre est requise",
    }),
    description: z.string({
        required_error: "La description est requise",
    }),
    maxParticipant: z.coerce.number({
        required_error: "Le nombre de participant est requise",
    }),
    nbParticipant: z.coerce.number({
        required_error: "La description est requise",
    }),
    deadLine: z.string({
        required_error: "La description est requise",
    }),
    categoryId: z.string({
        required_error: "La catégorie est requise",
    }),
    isValidate: z.boolean().optional(),
    typeRessourceId: z.string({
        required_error: "Le type de ressource est requis",
    }),
    steps: z.array(
        z.object({
            title: z.string({
                required_error: "Le titre est requise",
            }).min(10, {
                message: "Le titre doit contenir au moins 1 caractère",}),
            description: z.string({
                required_error: "La description est requise",
            }),
            order: z.number({
                required_error: "L'ordre est requis",
            }).min(1, {
                message: "L'ordre doit être supérieur à 0",
            }),})),
})

export type FormSchemaType = z.infer<typeof FormSchema>;