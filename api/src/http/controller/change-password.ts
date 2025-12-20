import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeChangePasswordService } from "../../service/factories/make-change-password-service";

export async function ChangePassword(request: FastifyRequest, response: FastifyReply) {
  const bodySchema = z.object({
    newPassword: z.string().min(4),
  })

  try {
    const userId = (request.user as { sub: string }).sub

    const { newPassword } = bodySchema.parse(request.body)

    const changePasswordService = makeChangePasswordService()

    await changePasswordService.execute({
      id: userId,
      newPassword,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return response.status(400).send({
        message: "Validation error",
        issues: error.format(),
      })
    }

    if (error instanceof Error) {
      return response.status(409).send({ message: error.message })
    }
  }
}