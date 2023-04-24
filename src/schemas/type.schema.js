import Joi from "joi";

export const paramsTypeSchema = Joi.object({
    tipo: Joi.string().valid("entrada", "saida").required()
});