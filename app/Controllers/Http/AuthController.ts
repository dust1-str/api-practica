import Hash from '@ioc:Adonis/Core/Hash'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserValidator from 'App/Validators/UserValidator'
import { JWTLogoutOptions } from '@ioc:Adonis/Addons/Jwt'

export default class AuthController {
    public async register({request, response}: HttpContextContract) 
    {
        const data = await request.validate(UserValidator)
        try {
            data.password = await Hash.make(data.password)
            await User.create(data)
            return response.json({message: 'Usuario creado exitosamente'})
        }
        catch (error) {
            return response.status(500).json({error: error.message})
        }
    }

    public async getRole({auth, response}: HttpContextContract) 
    {
        try {
            const payload = auth.use('jwt').payload!;
            const userId = payload['userId'];
            const user = await User.find(userId);
            const roleId = user?.role_id;
            return response.json({message: roleId?.toString()});            
        } catch (error) {
            return response.status(500).json({error: error.message})
        }
    }

    public async login({request, response, auth}: HttpContextContract)
    {
        const data = request.only(['email', 'password'])
        const user = await User.findBy('email', data.email)
        if (!user) {
            return response.status(404).json({error: 'Usuario no encontrado'})
        } else {
            if (await Hash.verify(user.password.toString(), data.password)) {
                const token = await auth.use('jwt').login(user, {
                    payload: {
                        name: user.name,
                        email: user.email,
                        role: user.role_id
                    }
                });
                return response.json({message: 'Inicio de sesion exitoso',token: token.accessToken, refresh_token: token.refreshToken})
            } else {
                return response.status(400).json({error: 'Credenciales incorrectas'})
            }
        }
    }

    public async refresh ({auth, request, response}: HttpContextContract)
    {
        const refreshToken = request.input("refresh_token");
        const jwt = await auth.use("jwt").loginViaRefreshToken(refreshToken);
        return response.ok(jwt);
    }

    public async logout ({auth, request, response}: HttpContextContract)
    {
        let rF: JWTLogoutOptions = {
            refreshToken: request.input("refresh_token"),
        };
        await auth.use("jwt").revoke(rF);
        return response.json({message: 'Sesion cerrada exitosamente'});
    }
}
