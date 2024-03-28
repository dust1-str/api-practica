import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RoleValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    rol: schema.string({}, [
      rules.minLength(1),
      rules.maxLength(20),
      rules.regex(/^[a-zA-Z]*$/),
      rules.unique({ table: 'roles', column: 'rol', whereNot: this.ctx.params.id ? { id: this.ctx.params.id } : undefined }),
    ]),
  })

  public messages: CustomMessages = {
    'rol.required': 'El nombre del rol es requerido',
    'rol.minLength': 'El nombre del rol debe tener al menos 1 caracter',
    'rol.maxLength': 'El nombre del rol no puede tener más de 20 caracteres',
    'rol.unique': 'Este rol ya existe',
    'rol.regex': 'El nombre del rol solo puede contener letras',
  }
}
