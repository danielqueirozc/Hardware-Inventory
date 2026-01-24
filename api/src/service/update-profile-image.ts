// service/update-profile-image.ts
import type { User } from "../generated/prisma/client"
import type { UsersRepository } from "../repositories/users-repository"
import { writeFile, mkdir } from 'node:fs/promises'
import { randomUUID } from 'node:crypto'
import path from 'node:path'

interface UpdateProfileImageRequest {
  userId: string
  filename: string
  buffer: Buffer
}

interface UpdateProfileImageResponse {
  user: User
}

export class UpdateProfileImageService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ userId, filename, buffer }: UpdateProfileImageRequest): Promise<UpdateProfileImageResponse> {
    try {
      // Verifica se o usuário existe
      const userExists = await this.usersRepository.findById(userId)

      if (!userExists) {
        throw new Error('User not found')
      }

      // Valida o tipo de arquivo
      const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp']
      const fileExtension = path.extname(filename).toLowerCase()
      
      if (!allowedExtensions.includes(fileExtension)) {
        throw new Error('Invalid file type. Only images are allowed.')
      }

      // Valida o tamanho (5MB)
      const maxSize = 5 * 1024 * 1024 // 5MB
      if (buffer.length > maxSize) {
        throw new Error('File too large. Maximum size is 5MB.')
      }

      // Gera um nome único para o arquivo
      const uniqueFilename = `${randomUUID()}${fileExtension}`
      
      // Define o caminho onde salvar (cria uma pasta 'uploads' na raiz do projeto)
      const uploadDir = path.join(process.cwd(), 'uploads', 'profile-images')
      
      // Cria o diretório se não existir
      await mkdir(uploadDir, { recursive: true })
      
      const filePath = path.join(uploadDir, uniqueFilename)
      
      // Salva o arquivo
      await writeFile(filePath, buffer)
      
      // URL que será salva no banco (caminho relativo)
      const imageUrl = `/uploads/profile-images/${uniqueFilename}`
      
      // Atualiza o usuário no banco
      const user = await this.usersRepository.updateProfileImage(userId, imageUrl)

      return {
        user
      }

    } catch (error) {
      console.log('ERROR IN UPDATE PROFILE IMAGE SERVICE:', error)
      throw error
    }
  }
}