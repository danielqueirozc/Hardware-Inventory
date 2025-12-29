import type { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../lib/prisma";

export async function ValidateToken(request: FastifyRequest, reply: FastifyReply) {

  const userId = (request.user as { sub: string }).sub

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    })

    if (!user) {
      return reply.status(404).send({ message: 'User not found' })
    }

    reply.status(200).send({ user })

  } catch (error) {
    reply.status(500).send({ message: 'Error searching for user' })
  }
}