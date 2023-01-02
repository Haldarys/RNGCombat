import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Character from "App/Models/Character";

export default class CharactersController {

    public async index({ request}: HttpContextContract)
    {
        const characters = await Character.query();
        return characters
    }
    
    public async show({ request, params}: HttpContextContract)
    {
        try {
            const character = await Character.find(params.id);
            if(character){
                return character
            }
        } catch (error) {
        	console.log(error)
        }
    }
    
    public async update({ auth, request, params}: HttpContextContract)
    {
        const character = await Character.find(params.id);
        if (character) {
            character.name = request.input('name');
            character.level = request.input('level');
            character.exp = request.input('exp');
            character.health = request.input('health');
            character.strength = request.input('strength');
            character.dodge = request.input('dodge');
            character.speed = request.input('speed');
            
            if (await character.save()) {
            	return character
        	}
        	return; // 422
        }
        return; // 401
    }
    
    public async store({ auth, request, response}: HttpContextContract)
    {
        const user = await auth.authenticate();
        const character = new Character();
        character.name = request.input('name');
        character.level = request.input('level');
        character.exp = request.input('exp');
        character.health = request.input('health');
        character.strength = request.input('strength');
        character.dodge = request.input('dodge');
        character.speed = request.input('speed');
        await character.save()
        return character
    }
    
    public async destroy({response, auth, request, params}: HttpContextContract)
    {
        const user = await auth.authenticate();
        const character = await Character.query().where('id', params.id).delete();
        return response.json({message:"Deleted successfully"})
    }
}