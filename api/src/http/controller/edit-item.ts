import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeEditItemService } from "../../service/factories/make-edit-item-service";

export async function EditItem(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    id: z.string(),
    name: z.string(),
    amount: z.number(),
    filters: z.array(z.enum(['Lab_Línguas', 'Lab_Informática', 'Lab_Hardware']),)
  })

  const { id, name, amount, filters } = bodySchema.parse(request.body)

  try {
    const editItemService = makeEditItemService()

    const result = await editItemService.execute({ id, name, amount, filters })

    return reply.status(201).send(result)
  } catch (error) {
    console.error(error)
    reply.status(404).send({ message: 'Erro ao encontrar item' })
  }
}