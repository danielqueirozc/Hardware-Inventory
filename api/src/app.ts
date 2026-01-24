import { fastify } from 'fastify'
import { 
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
  type ZodTypeProvider
 } from 'fastify-type-provider-zod'

 import ScalarApiReference from '@scalar/fastify-api-reference'

 import { fastifySwagger } from '@fastify/swagger'
 import { fastifyCors } from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'
import fastifyCookie from '@fastify/cookie'
import { register } from './http/routes/register'
import { authenticate } from './http/routes/authenticate'
import { validateToken } from './http/routes/validade-token'
import { getItemsQuantity } from './http/routes/get-items-quantity'
import { getItemsByType } from './http/routes/get-items-by-type'
import multipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'
import path from 'node:path'
import { updateProfileImage } from './http/routes/update-profile-image'
import { deleteItem } from './http/routes/delete-item'
import { editItem } from './http/routes/edit-item'
import { createItem } from './http/routes/create-item'
import { changePassword } from './http/routes/change-password'
import { verifyCurrentPassword } from './http/routes/verify-current-password'
 
export const app = fastify().withTypeProvider<ZodTypeProvider>()

// 1️⃣ PRIMEIRO: Configurar os compiladores (a base)
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

// 2️⃣ SEGUNDO: CORS e outros plugins básicos
app.register(fastifyCors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
})

// 3️⃣ TERCEIRO: Swagger (gera a especificação OpenAPI)
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Inventory API',
      description: 'API for managing inventory items',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

// 4️⃣ QUARTO: JWT e outros middlewares
app.register(fastifyJwt, {
  secret: env.JWT,
  cookie: {
    cookieName: 'token',
    signed: false,
  }
})

app.register(fastifyCookie)

app.register(multipart, {
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  }
})

app.register(fastifyStatic, {
  root: path.join(process.cwd(), 'uploads'),
  prefix: '/uploads/'
})

// 5️⃣ QUINTO: Registrar todas as rotas
app.register(register)
app.register(authenticate)
app.register(validateToken)
app.register(getItemsQuantity)
app.register(getItemsByType)
app.register(updateProfileImage)
app.register(deleteItem)
app.register(editItem)
app.register(createItem)
app.register(changePassword)
app.register(verifyCurrentPassword)

// 6️⃣ POR ÚLTIMO: Scalar (consome a especificação gerada)
app.register(ScalarApiReference, {
  routePrefix: '/docs',
})