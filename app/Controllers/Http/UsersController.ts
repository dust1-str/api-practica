import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Hash from '@ioc:Adonis/Core/Hash'

export default class UsersController {
    public async register({request, response}: HttpContextContract) {
        const validador = schema.create({
            name: schema.string({}, [
                rules.minLength(2),
                rules.maxLength(50)
            ]),
            email: schema.string({}, [
                rules.email(),
                rules.unique({ table: 'users', column: 'email' }),
            ]),
            password: schema.string({}, [
                rules.minLength(8),
                rules.maxLength(12),
            ]),
        })
        const data = await request.validate({schema: validador})
        try {
            data.password = await Hash.make(data.password)
            await User.create(data)
            return response.json({message: 'Usuario creado exitosamente'})
        }
        catch (error) {
            return response.status(400).json({error: error.message})
        }
    }

    public async getRole({response}: HttpContextContract) {
        return response.json({role: 'Hola'})
    }
}
