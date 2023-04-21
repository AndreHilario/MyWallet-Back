import Joi from "joi";

export const numberSchema = Joi.object({
    description: Joi.required(),
    price: Joi.number().positive().precision(2).required()
});