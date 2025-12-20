import { app } from "./app"
import { env } from "./env"

async function startServer() {
  try {
    await app.listen({
      host: '0.0.0.0',
      port: env.PORT
    })

    console.log(`🔥 HTTP server running on http://localhost:${env.PORT}`)
  } catch (error) {
    console.error('Error starting server:', error)
}
}

startServer()