// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from 'App/Models/Profile';
import { schema, rules } from '@ioc:Adonis/Core/Validator';
export default class ProfilesController {
    public async addProfile({ auth, request, response }) {
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
            user_id: auth.user.id,
        })
        const payload = await request.validate({
            schema: newUserSchema
        })
        await Profile.create(payload);
        response.send({ message: 'Profile created', status: 'success', statusCode: 200 })

    }
    public async getProfile({ auth, request, response }) {
        const user = await Profile
            .query()
            .where('user_id', auth.user.id)
            .first()
        const userData = user ? user : {};
        userData['mobile'] = auth.user.mobile;
        response.send({ message: 'Profile Data', status: 'success', statusCode: 200, data: userData })
    }
    public async updateProfile({ auth, request, response }) {
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
            user_id: auth.user.id,
        })
        const payload = await request.validate({
            schema: newUserSchema
        })
        const user = await Profile
            .query()
            .where('user_id', auth.user.id)
            .update(payload)
        response.send({ message: 'Profile data updated successfully', status: 'success', statusCode: 200, data: user });
    }
    public async deleteProfile({ auth, request, response }) {
        const user = await Profile.query().where('user_id', auth.user?.id).delete()
        response.send({ message: 'Profile data deleted successfully', status: 'success', statusCode: 200, data: user });
    }
}
