import User from 'App/Models/User';
import { schema, rules } from '@ioc:Adonis/Core/Validator';
// import Database from '@ioc:Adonis/Lucid/Database'
export default class UserController {
    public async store({ request, response }) {
        const newUserSchema = schema.create({
            mobile: schema.string([
                rules.minLength(10),
                rules.maxLength(10),
                rules.unique({ table: 'users', column: 'mobile' })
            ])
        })
        try {
            const payload = await request.validate({
                schema: newUserSchema
            })
            await User.create(payload);
            response.send({ message: 'User created', status: 'success', statusCode: 200 })

        } catch (error) {
            response.badRequest(error.messages)
        }
    }
    public async login({ auth, request, response }) {
        // const data1 = await Database.from('api_tokens').where({'expires_at' < raw(`Date.now()`)});
        // console.log(data1)
        try {
            const mobile = request.body().mobile
            const user = await User
                .query()
                .where('mobile', mobile)
            const token = await auth.use('api').generate(user[0], {
                expiresIn: '1mins'
            })
            const userData = user[0].toJSON();
            userData['token'] = token.toJSON().token;
            response.send({ message: 'Loggedin successful', status: 'success', statusCode: 200, data: userData })
        } catch (error) {
            if (error.messages) {
                response.badRequest(error.messages)
            } else {
                response.notFound({ message: 'User not found', status: 'fail', statusCode: 404 })
            }
        }
    }
    public async logout({ auth, request, response }) {
        try {
            await auth.use('api').revoke();
            response.send({ message: 'Logged out successful', status: 'success', statusCode: 200 })
        } catch (error) {
            response.badRequest(error.messages)
        }
    }
}