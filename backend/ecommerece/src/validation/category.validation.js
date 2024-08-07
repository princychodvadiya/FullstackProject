const Joi = require('joi');

const getCategory = {
    query: Joi.object().keys({
        get_cat_id: Joi.string().required()
    })
}

const creatCategory = {
    body: Joi.object().keys({
        name: Joi.string().required().max(30),
        description: Joi.string().required().max(300),
        image: Joi.string()
    })
}

const updateCategory = {
    body: Joi.object().keys({
        name: Joi.string().required().max(30),
        description: Joi.string().required().max(300),
        image: Joi.string()
    }),
    params: Joi.object().keys({
        category_id: Joi.string().required().max(2)
    })
}

const deleteCategory = {
    params: Joi.object().keys({
        category_id: Joi.string().required().max(2)
    })
}


module.exports = {
    creatCategory,
    updateCategory,
    deleteCategory,
    getCategory

}