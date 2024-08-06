const Joi = require('joi');

const creatCategory = {
    body: Joi.object().keys({
        name: Joi.string().required().max(30),
        description: Joi.string().required().max(100),
        image: Joi.string()
    }),
    params: Joi.object().keys({
        id: Joi.string().required()
    })
}

module.exports = {
    creatCategory
}