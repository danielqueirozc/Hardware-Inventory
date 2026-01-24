import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeChangePasswordService } from "../../service/factories/make-change-password-service";

export async function ChangePassword(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    newPassword: z.string(),
  })

  try {
    const userId = (request.user as { sub: string }).sub

    
    console.log(request.body)
    const { newPassword } = bodySchema.parse(request.body)

    const changePasswordService = makeChangePasswordService()


    console.log(newPassword)

    await changePasswordService.execute({
      id: userId,
      newPassword,
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