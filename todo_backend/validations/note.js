const Joi = require('@hapi/joi');
const { JsonWebTokenError} = require('jsonwebtoken');

const noteSchema = Joi.object({
    note: Joi.string().min(5).max(255)
})

module.exports = {noteSchema}