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
 
export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Inventory API',
      description: 'API for managing inventory items',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform, // serve para transformar os schemas do Zod para JSON Schema
})

// const { default: ScalarApiReference } = await import('@scalar/fastify-api-reference')
app.register(ScalarApiReference, {
  routePrefix: '/docs',
})


///////////// JWT /////////////
app.register(fastifyJwt, {
  secret: env.JWT,
  cookie: {
    cookieName: 'token',
    signed: false,
  }
})

app.register(fastifyCookie)

///////////////// Routes/////////////
app.register(register)


app.setValidatorCompiler(validatorCompiler) // serve para validar as requisições usando os schemas do Zod
app.setSerializerCompiler(serializerCompiler) // serve para serializar as respostas usando os schemas do Zod