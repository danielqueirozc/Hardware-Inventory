// controller/update-profile-image.ts
import type { FastifyReply, FastifyRequest } from "fastify";
import { makeUpdateProfileImageService } from "../../service/factories/make-update-profile-image";

export async function UpdateProfileImage(request: FastifyRequest, reply: FastifyReply) {

  try {
    // Recebe o arquivo do upload
    const data = await request.file()

    if (!data) {
      return reply.status(400).send({ message: 'No file uploaded' })
    }

    // Converte o stream em buffer
    const buffer = await data.toBuffer()
    // buffer: Balde cheio (Buffer) = Você encheu o balde e agora tem toda a água de uma vez
    // buffer: Buffer é basicamente um "balde de bytes" - um espaço temporário na memória que guarda dados binários (imagens, vídeos, arquivos) de forma bruta
    // por que nao usar stream? Porque stream é como uma mangueira que libera os dados aos poucos, enquanto buffer guarda tudo de uma vez para processamento imediato
    // usar stream é mais eficiente para arquivos grandes, mas pode ser mais complexo de lidar. Buffer é mais simples para arquivos menores, mas consome mais memória

    
    // Pega o ID do usuário autenticado do token JWT
    const userId = (request.user as { sub: string }).sub
    

    const updateProfileImageService = makeUpdateProfileImageService()

    const { user } = await updateProfileImageService.execute({
      userId,
      filename: data.filename,
      buffer
    })

    return reply.status(200).send({ 
      message: 'Profile image updated successfully',
      imageUrl: user.imageUrl
    })

  } catch (error) {
    if (error instanceof Error) {
      return reply.status(400).send({ message: error.message })
    }

    return reply.status(500).send({ message: 'Internal server error' })
  }
}