import Joi from "joi";

export const paramsSchema = Joi.object({
    tipo: Joi.string().valid("entrada", "saida").required(),
    id: Joi.string().required()
});