import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeVerifyCurrentPasswordService } from "../../service/factories/make-verify-current-password";

export async function VerifyCurrentPassword(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    currentPassword: z.string()
  })

  const { currentPassword } = bodySchema.parse(request.body)
  console.log('chegou aqui', { currentPassword })

  try {
    const userId = (request.user as {sub:string}).sub

    const service = makeVerifyCurrentPasswordService()
    
    const valid = await service.execute({id: userId, currentPassword})

    return reply.status(200).send({ message: 'Password updated successfully', valid })
  } catch (error) {
    console.error(error)
    return reply.status(401).send({ message: 'Error verifying password' })
  }
} 