import Joi from "joi"

export const customerSchema = Joi.object({
    name: Joi.string().min(3).required(),
    phone: Joi.string().pattern(new RegExp('^[0-9]{10,11}$')),
    cpf: Joi.string().pattern(new RegExp('^[0-9]{11}$')),
    birthday: Joi.date().iso().required()
});