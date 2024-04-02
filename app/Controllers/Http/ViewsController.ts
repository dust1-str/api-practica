import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import View from 'App/Models/View';
import ViewValidator from 'App/Validators/ViewValidator';

export default class ViewsController {
    public async index({response}: HttpContextContract)
    {
        try {
            const views = await View.all();
            return response.json(views);
        } catch (error) {
            return response.status(500).json({error: error})
        }
    }

    public async show({response, params}: HttpContextContract)
    {
        try {
            const view = await View.findOrFail(params.id);
            return response.json(view);
        } catch (error) {
            if (error.code === 'E_ROW_NOT_FOUND') {
                return response.status(404).json({error: 'Vista no encontrada'})
            }
            return response.status(500).json({error: error})
        }
    }

    public async store({request, response}: HttpContextContract)
    {
        const data = await request.validate(ViewValidator);
        try {
            await View.create(data);
            return response.status(201).json({message: 'Vista creada exitosamente'});
        } catch (error) {
            return response.status(500).json({error: error.message})
        }
    }

    public async update({params, response, request}: HttpContextContract)
    {
        try {
            const view = await View.findOrFail(params.id);
            const viewData = await request.validate(ViewValidator);
            await view.merge(viewData).save();
            return response.json({message: 'Vista actualizada exitosamente'});
        } catch (error) {
            if (error.code === 'E_ROW_NOT_FOUND') {
                return response.status(404).json({error: 'Vista no encontrada'})
            }
            return response.status(500).json({error: error})
        }
    }
}
