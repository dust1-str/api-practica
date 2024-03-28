import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ViewValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [
      rules.minLength(1),
      rules.maxLength(20),
      rules.regex(/^[a-zA-Z]*$/),
      rules.unique({ table: 'views', column: 'name', whereNot: this.ctx.params.id ? { id: this.ctx.params.id } : undefined }),
    ]),
  })

  public messages: CustomMessages = {
    'name.required': 'El nombre de la vista es requerido',
    'name.minLength': 'El nombre de la vista debe tener al menos 1 caracter',
    'name.maxLength': 'El nombre de la vista no puede tener más de 20 caracteres',
    'name.unique': 'Esta vista ya existe',
    'name.regex': 'El nombre de la vista solo puede contener letras',
  }
}
