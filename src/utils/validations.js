import Joi from 'joi'
export const registerSchema = Joi.object({
    name: Joi.string().min(3).max(50).alphanum().required(),
    surname: Joi.string().min(3).max(50).alphanum().required(),
    email:Joi.string().email().required(),
    status_id: Joi.number().required(),
    description:Joi.string().min(2).max(255),
    password: Joi.string().min(3).max(15).required().label('Password'),
    r_password: Joi.any().equal(Joi.ref('password')).required().label('Confirm password').messages({ 'any.only': '{{#label}} does not match' }),
})
