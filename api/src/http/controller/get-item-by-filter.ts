import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { Filter } from "../../generated/prisma/enums";
import { makeGetItemByFilter } from "../../service/factories/make-get-item-by-filter-service";

export async function GetItemByFilter(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    type: z.enum(['Component', 'Computer', 'Notebook', 'Materials', 'Cables']),
  })

  const filterMap: Record<string, Filter> = {
  "Lab Línguas":     Filter.Lab_Línguas,
  "Lab Informática": Filter.Lab_Informática,
  "Lab Hardware":    Filter.Lab_Hardware,
}

// adicionando o _ nos filtros
const bodySchema = z.object({
  filter: z.array(
    z.string().transform((val, ctx) => {
      const mapped = filterMap[val]
      if (!mapped) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: `Filtro inválido: ${val}` })
        return z.NEVER
      }
      return mapped
    })
  )
})

console.log(request.body)

try {
  const { filter } = bodySchema.parse(request.body)
  const { type } = paramsSchema.parse(request.params)


  console.log(filter)

  const getItemByFilter = makeGetItemByFilter()

  const result = await getItemByFilter.execute({ filter, type })

  // console.log('esse e o resultado',result)

  return reply.status(200).send({ items: result.item })

} catch (error) {
  console.error('Erro em GetItemByFilter', error)

  return reply.status(500).send({ message: 'Internal server error' })
}
} 