import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeDeleteItemService } from "../../service/factories/make-delete-items-service";

export async function DeleteItem(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string(),
  })

  const { id } = paramsSchema.parse(request.params)

  try {
    const deleteItemServie = makeDeleteItemService()

    await deleteItemServie.execute({ id })

    return reply.status(204).send()
    
  } catch (error) {
      console.error('Erro ao deletar item:', error)
    return reply.status(404).send({ message: 'Item não encontrado' })
  }
}