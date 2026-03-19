import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeChangeEmailService } from "../../service/factories/make-change-email-service";

export async function ChangeEmail(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    newEmail: z.string(),
  })

  try {
    const userId = (request.user as { sub: string }).sub

    // console.log(request.body)
    const { newEmail } = bodySchema.parse(request.body)

    const changeEmailService = makeChangeEmailService()

    // console.log(newEmail, "chegou aqui")

    await changeEmailService.execute({
      id: userId,
      newEmail,
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