import {z} from 'zod'

export const deleteMessageSchema = z.object({
    acceptMessage: z.boolean()
})