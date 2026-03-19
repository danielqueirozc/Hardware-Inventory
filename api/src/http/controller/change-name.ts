import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeChangeNameService } from "../../service/factories/make-change-name-service";

export async function ChangeName(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    newName: z.string(),
  })

  try {
    const userId = (request.user as { sub: string }).sub

    console.log(request.body)
    const { newName } = bodySchema.parse(request.body)

    const changeNameService = makeChangeNameService()


    // console.log(newName, "chegou aqui")

    await changeNameService.execute({
      id: userId,
      newName,
    })

    return reply.status(201).send({ message: 'Password updated successfully' })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({
        message: "Validation error",
        issues: error.format(),
      })
    }

    if (error instanceof Error) {
      return reply.status(409).send({ message: error.message })
    }
  }
}