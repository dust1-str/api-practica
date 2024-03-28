import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'
import View from 'App/Models/View'
import RoleViewValidator from 'App/Validators/RoleViewValidator'

export default class RoleViewsController {
    public async getViewsByRole({ params, response }: HttpContextContract) 
    {
        const role = await Role.find(params.id)
        if (!role) {
            return response.status(404).json({ error: 'Rol no encontrado' })
        }
        const views = await role.related('views').query()
        return response.json(views)
    }

    public async update({ params, request, response }: HttpContextContract)
    {
        const role = await Role.find(params.id)

        if (!role) {
            return response.status(404).json({ error: 'Rol no encontrado' })
        }

        const validatedData = await request.validate(RoleViewValidator)
        const viewIds = validatedData.viewIds

        await role.related('views').detach()
        for (const viewId of viewIds) {
            const view = await View.find(viewId)

            if (!view) {
                return response.status(404).json({ error: 'La vista con el id ' + viewId + ' no se ha encontrado' })
            }

            await role.related('views').attach([viewId])
        }

        return response.status(200).json({ success: 'Vistas asignadas correctamente' })
    }
}
