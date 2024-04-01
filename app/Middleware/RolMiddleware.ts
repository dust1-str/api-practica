import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class RolMiddleware {
  public async handle({auth, response}: HttpContextContract, next: () => Promise<void>, roles: string[]) {
    const payload = auth.use('jwt').payload!
    const role_id = payload.role
    const user = await User.findOrFail(payload.userId)
    if (user.role_id !== role_id) {
      response.unauthorized({error: 'El id del rol no coincide con el rol del usuario. Inicie sesión de nuevo'})
      return
    } else {
      if (!roles.includes(role_id.toString())) {
        response.unauthorized({error: 'No tienes permiso para acceder a esta ruta'})
        return
      }
    }
    await next()
  }
}
