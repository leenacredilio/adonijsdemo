import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
export default class UserController {
    public async index(ctx: HttpContextContract) {
        const postId = await Database
            .table('users')
            .insert({
                email: 'Adonis 101',
                password: 'Let\'s learn AdonisJS',
                created_at:'12/05/2022',
                updated_at:'12/05/2022'
            })
            .returning('id')
            console.log(postId)
    }
}