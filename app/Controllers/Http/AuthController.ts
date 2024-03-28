import Hash from '@ioc:Adonis/Core/Hash'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
    public async login({request, response, auth}: HttpContextContract)
    {
        const data = request.only(['email', 'password'])
        const user = await User.findBy('email', data.email)
        if (!user) {
            return response.status(404).json({error: 'Usuario no encontrado'})
        } else {
            if (await Hash.verify(user.password.toString(), data.password)) {
                const token = await auth.use('jwt').login(user);
                return response.json({message: 'Inicio de sesion exitoso',token: token.accessToken})
            } else {
                return response.status(400).json({error: 'Credenciales incorrectas'})
            }
        }
    }
}
