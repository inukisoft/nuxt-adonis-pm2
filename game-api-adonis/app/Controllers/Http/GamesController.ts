// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Game from "App/Models/Game"

export default class GamesController {

    public async index () {
        const games = await Game.all()
        return games
    }

    public async show ({ params }) {
        const game = await Game.find(params.id)
        return game
    }    
}
