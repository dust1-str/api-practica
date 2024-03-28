import { schema, CustomMessages, rules, validator } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'

validator.rule('roleId', async (value, _, options) => {
  const allowedRoles = await Role.query().select('id').exec()
  const allowedRoleIds = allowedRoles.map(role => role.id)
  if (value !== undefined && !allowedRoleIds.includes(value)) {
    options.errorReporter.report(
      options.pointer,
      'roleId',
      'El roleId no es válido: ' + value,
      options.arrayExpressionPointer
    )
  }
})

export default class UserValidator {
  constructor (protected ctx: HttpContextContract) {
  }
  public schema = schema.create({
    name: schema.string({}, [
        rules.minLength(2),
        rules.maxLength(50)
    ]),
    email: schema.string({}, [
        rules.email(),
        rules.unique({ table: 'users', column: 'email', whereNot: this.ctx.params.id ? { id: this.ctx.params.id } : undefined }),
    ]),
    password: schema.string({}, [
        rules.minLength(8),
        rules.maxLength(12),
    ]),
    role_id: schema.number.optional([
      rules.roleId(Number('role_id'))
    ]),
})

  public messages: CustomMessages = {
    'name.required': 'El nombre es requerido',
    'name.minLength': 'El nombre debe tener al menos 2 caracteres',
    'name.maxLength': 'El nombre no puede tener más de 50 caracteres',
    'email.required': 'El correo electrónico es requerido',
    'email.email': 'Debe proporcionar un correo electrónico válido',
    'email.unique': 'Este correo electrónico ya está en uso',
    'password.required': 'La contraseña es requerida',
    'password.minLength': 'La contraseña debe tener al menos 8 caracteres',
    'password.maxLength': 'La contraseña no puede tener más de 12 caracteres',
}

}
