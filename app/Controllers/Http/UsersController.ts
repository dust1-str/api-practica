import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserValidator from 'App/Validators/UserValidator'
import Hash from '@ioc:Adonis/Core/Hash'

export default class UsersController {
    public async index({response}: HttpContextContract) 
    {
        try {
            const users = await User.query().preload('role');
            // const usersWithRoleNames = users.map(user => {
            //     return {...user.serialize(), role: user.role.rol}
            // })
            // return response.json(usersWithRoleNames);
            return response.ok(users);
        } catch (error) {
            return response.status(500).json({error: error})
        }
    }

    public async show({response, params}: HttpContextContract)
    {
        try {
            const user = await User.findOrFail(params.id);
            await user.load('role');
            return response.json({...user.serialize(), role: user.role.rol});
        } catch (error) {
            if (error.code === 'E_ROW_NOT_FOUND') {
                return response.status(404).json({error: 'Usuario no encontrado'})
            }
            return response.status(500).json({error: error})
        }
    }

    public async store({request, response}: HttpContextContract)
    {
        const data = await request.validate(UserValidator)
        try {
            data.password = await Hash.make(data.password)
            await User.create(data)
            return response.status(201).json({message: 'Usuario creado exitosamente'})
        }
        catch (error) {
            return response.status(500).json({error: error.message})
        }
    }

    public async update({params, response, request}: HttpContextContract)
    {
        const userData = await request.validate(UserValidator);
        try {
            const user = await User.findOrFail(params.id);
            userData.password = await Hash.make(userData.password);
            await user.merge(userData).save();
            return response.json({message: 'Usuario actualizado exitosamente'});
        } catch (error) {
            if (error.code === 'E_ROW_NOT_FOUND'){
                return response.status(404).json({error: 'Usuario no encontrado'})
            }
            return response.status(500).json({error: error});
        }
    }

    public async destroy({response, params}: HttpContextContract)
    {
        try {
            const user = await User.findOrFail(params.id)
            await user.delete()
            return response.json({message: 'Usuario eliminado exitosamente'});
        } catch (error) {
            if (error.code === 'E_ROW_NOT_FOUND'){
                return response.status(404).json({error: 'Usuario no encontrado'})
            }
            return response.status(500).json({error: error});
        }
    }

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
}
