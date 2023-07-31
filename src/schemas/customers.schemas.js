import Joi from "joi"

export const customerSchema = Joi.object({
    name: Joi.string().allow(''),
    phone: Joi.string(),
    cpf: Joi.string(),
    birthday: Joi.date().iso().required()
});