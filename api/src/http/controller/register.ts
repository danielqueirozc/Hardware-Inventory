import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeRegisterService } from "../../service/factories/make-register-service";

export async function Register(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(4),
  })

  try {
    const { name, email, password } = bodySchema.parse(request.body)

    const registerService = makeRegisterService()

    await registerService.execute({
      name,
      email,
      password,
    })

    reply.status(201).send({ message: 'User created successfully' })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({ message: "Invalid request body", issues: error.issues })
    }

    if (error instanceof Error) {
      return reply.status(409).send({ message: error.message })
    }
  }
}