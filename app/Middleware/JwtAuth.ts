import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class JwtAuth {
  public async handle({auth, response, request}: HttpContextContract, next: () => Promise<void>) {
    try {
      await auth.use('jwt').authenticate();
    } catch (error) {
      if (request.header('Authorization') === "Bearer"){
        return response.status(401).json({message: 'Token no proporcionado'})
      }
      return response.status(401).json({message: 'No autorizado', error: error})
    }
    await next()
  }
}
