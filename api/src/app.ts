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
import { changeName } from './http/routes/change-name'
import { changeEmail } from './http/routes/change-email'
import { getItemByFilter } from './http/routes/get-item-by-filter'
 
export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
})

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

app.register(register)
app.register(authenticate)
app.register(validateToken)
app.register(getItemsQuantity)
app.register(getItemsByType)
app.register(getItemByFilter)
app.register(updateProfileImage)
app.register(deleteItem)
app.register(editItem)
app.register(createItem)
app.register(changeName)
app.register(changeEmail)
app.register(changePassword)
app.register(verifyCurrentPassword)

app.register(ScalarApiReference, {
  routePrefix: '/docs',
})