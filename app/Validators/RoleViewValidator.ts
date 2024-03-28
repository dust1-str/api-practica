import { schema, CustomMessages,  rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RoleViewValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    viewIds: schema.array().members(
      schema.number([
        rules.exists({ table: 'views', column: 'id' }),
      ])
    ),
  })

  public messages: CustomMessages = {
    'viewIds.*.number': 'El id de la vista debe ser un número',
    'viewIds.*.exists': 'No se pudo asignar una vista ya que no se encontró en la base de datos. Ninguna vista fue asignada.',
  }
}
