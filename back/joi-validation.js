const Joi = require('joi');

const carValidation = Joi.object().keys({
    car: {
        manufacturer: Joi.string().max(30).required(),
        model: Joi.string().max(50).required(),
        year: Joi.number().integer().min(1900).required(),
        detailsId: Joi.number().integer().min(1).required(),
        image: Joi.string(),
        pricePerDay: Joi.number().precision(2).required(),
        rating: Joi.number().precision(2).min(1).max(5)
    }
});

const cardetailsValidation = Joi.object().keys({
    doors: Joi.number().integer().min(1).max(10).required(),
    fuel: Joi.string().max(20).required(),
    transmission: Joi.string().max(20).required()
});

const reservationValidation = Joi.object().keys({
    startDate: Joi.date().required(),
    endDate: Joi.date().greater(Joi.ref('startDate')).required(),
    userId: Joi.number().integer().min(1).required(),
    carId: Joi.number().integer().min(1).required()
});

const userValidation = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

module.exports = { carValidation, cardetailsValidation, reservationValidation, userValidation };