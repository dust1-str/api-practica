import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role';
import RoleValidator from 'App/Validators/RoleValidator';

export default class RolesController {
    public async index({response}: HttpContextContract)
    {
        try {
            const roles = await Role.all();
            return response.json(roles);
        } catch (error) {
            return response.status(500).json({error: error})
        }
    }

    public async show({response, params}: HttpContextContract)
    {
        try {
            const role = await Role.findOrFail(params.id);
            return response.json(role);
        } catch (error) {
            if (error.code === 'E_ROW_NOT_FOUND') {
                return response.status(404).json({error: 'Rol no encontrado'})
            }
            return response.status(500).json({error: error})
        }
    }

    public async store({request, response}: HttpContextContract)
    {
        const data = await request.validate(RoleValidator);    
        try {
            await Role.create(data);
            return response.status(201).json({message: 'Rol creado exitosamente'});
        } catch (error) {
            return response.status(500).json({error: error.message})
        }
    }

    public async update({params, response, request}: HttpContextContract)
    {
        const roleData = await request.validate(RoleValidator);
        try {
            const role = await Role.findOrFail(params.id);
            await role.merge(roleData).save();
            return response.json({message: 'Rol actualizado exitosamente'});
        } catch (error) {
            if (error.code === 'E_ROW_NOT_FOUND') {
                return response.status(404).json({error: 'Rol no encontrado'})
            }
            return response.status(500).json({error: error})
        }
    }
}
