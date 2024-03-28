import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class JwtAuth {
  public async handle({auth, response}: HttpContextContract, next: () => Promise<void>) {
    try {
      await auth.use('jwt').authenticate();
    } catch (error) {
      return response.status(401).json({message: 'No autorizado', error: error})
    }
    await next()
  }
}
