// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from 'App/Models/Profile';
import { schema, rules } from '@ioc:Adonis/Core/Validator';
export default class ProfilesController {
    public async addProfile({ auth, request, response }) {
        await auth.use('api').check()
        if (auth.use('api').isLoggedIn) {
            const newUserSchema = schema.create({
                name: schema.string([
                    rules.minLength(3),
                    rules.maxLength(30),
                ]),
                email: schema.string([
                    rules.email()
                ]),
                gender: schema.string([]),
                dob: schema.date.optional({
                    format: 'dd-MM-yyyy',
                }),
                user_id: schema.number([]),
            })
            const payload = await request.validate({
                schema: newUserSchema
            })
            await Profile.create(payload);
            response.send({ message: 'Profile created', status: 'success', statusCode: 200 })
        } else {
            response.send({ message: 'User not logged in', status: 'fail', statusCode: 401 })
        }

    }
    public async getProfile({ auth, request, response }) {
        await auth.use('api').check()
        if (auth.use('api').isLoggedIn) {
            const userId = auth.use('api').user.toJSON()
            const user = await Profile
                .query()
                .where('user_id', userId.id)
                .first()
            const userData = user ? user.toJSON() : {};
            userData['mobile'] = userId.mobile;
            response.send({ message: 'Profile Data', status: 'success', statusCode: 200, data: userData })
        } else {
            response.send({ message: 'User not logged in', status: 'fail', statusCode: 401 })
        }
    }
    public async updateProfile({ auth, request, response }) {
        await auth.use('api').check()
        if (auth.use('api').isLoggedIn) {
            const newUserSchema = schema.create({
                name: schema.string([
                    rules.minLength(3),
                    rules.maxLength(30),
                ]),
                email: schema.string([
                    rules.email()
                ]),
                gender: schema.string([]),
                dob: schema.date.optional({
                    format: 'dd-MM-yyyy',
                }),
                user_id: schema.number([]),
            })
            const userId = auth.use('api').user.toJSON()
            const payload = await request.validate({
                schema: newUserSchema
            })
            const user = await Profile
                .query()
                .where('user_id', userId.id)
                .update(payload)
            response.send({ message: 'Profile data updated successfully', status: 'success', statusCode: 200, data: user });
        } else {
            response.send({ message: 'User not logged in', status: 'fail', statusCode: 401 })
        }
    }
    public async deleteProfile({ auth, request, response }) {
        await auth.use('api').check()
        if (auth.use('api').isLoggedIn) {
            const userId = auth.use('api').user.toJSON()
            const user = await Profile.query().where('user_id', userId?.id).delete()
            response.send({ message: 'Profile data deleted successfully', status: 'success', statusCode: 200, data: user });
        } else {
            response.send({ message: 'User not logged in', status: 'fail', statusCode: 401 })
        }
    }
}
