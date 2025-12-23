import { app } from "../app";

interface TokenProvider {
    sign(payload: object): string
}

export class FastifyJwtProvider implements TokenProvider {
    sign(payload: object): string {
        return app.jwt.sign(payload, {
            expiresIn: '7d' // Token expira em 7 dias
        })
    }
}