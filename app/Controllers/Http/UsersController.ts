import User from 'App/Models/User';
import { schema, rules } from '@ioc:Adonis/Core/Validator';
export default class UserController {
    public async store({ request, response }) {
        const newUserSchema = schema.create({
            mobile: schema.string([
                rules.minLength(10),
                rules.maxLength(10),
                rules.unique({ table: 'users', column: 'mobile' })
            ])
        })
        const payload = await request.validate({
            schema: newUserSchema
        })
        await User.create(payload);
        response.send({ message: 'User created', status: 'success', statusCode: 200 })
    }
    public async login({ auth, request, response }) {
        const newUserSchema = schema.create({
            mobile: schema.string([
                rules.minLength(10),
                rules.maxLength(10),
            ])
        })
        await request.validate({
            schema: newUserSchema
        })
        const mobile = request.body().mobile
        const user = await User
            .query()
            .where('mobile', mobile)
            .first()
        if (user) {
            const token = await auth.use('api').generate(user, {
                expiresIn: '30mins'
            })
            const userData = user ? user.toJSON() : {};
            userData['token'] = token.toJSON().token;
            response.send({ message: 'Loggedin successful', status: 'success', statusCode: 200, data: userData })
        } else {
            response.notFound({ message: 'User not found', status: 'fail', statusCode: 404 })
        }
    }
    public async logout({ auth, request, response }) {
        await auth.use('api').revoke();
        response.send({ message: 'Logged out successful', status: 'success', statusCode: 200 })
    }
}