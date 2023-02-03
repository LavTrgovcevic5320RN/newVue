const { Car } = require('../models');
const { carValidation } = require("../joi-validation.js");
const express = require('express');
const { StatusCodes } = require('http-status-codes');

const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.status(401).json({ msg: "error" });
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.status(403).json({ msg: err });
    
        req.user = user;
    
        next();
    });
}

// router.use(authToken);

router.get('/', async function (req, res) {
    const cars = await Car.findAll();
    console.log(cars.length);
    res.status(StatusCodes.OK).json({data: cars});
});

router.post('/', authToken, async function (req, res) {
    Car.create({
        manufacturer: req.body.car.manufacturer,
        model: req.body.car.model,
        year: req.body.car.year,
        detailsId: req.body.car.detailsId,
        pricePerDay: req.body.car.pricePerDay,
    })
    .then(car => res.status(StatusCodes.CREATED).json(car))
    .catch(err => {
        if (err.name == 'SequelizeForeignKeyConstraintError') {
            res.status(StatusCodes.BAD_REQUEST).send({ message: 'Details with given ID do not exist.' });
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
    });
});

router.get('/:carId', authToken, async function (req, res) {
    const car = await Car.findByPk(req.params.carId)
        .then(car => {
            if (!car) {
                res.status(StatusCodes.NOT_FOUND).send({ message: 'Car not found.' });
            } else res.status(StatusCodes.OK).json(car);
        }).catch(err => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err));
});

router.put('/:carId', authToken, async function (req, res) {
    await Car.findByPk(req.params.carId)
        .then(car => {
            if (!car) {
                res.status(StatusCodes.NOT_FOUND).send({ message: 'Car not found.' }).end();
            } else {
                car.manufacturer = req.body.car.manufacturer,
                car.model = req.body.car.model,
                car.year = req.body.car.year,
                car.detailsId = req.body.car.detailsId,
                car.image = req.body.car.image,
                car.pricePerDay = req.body.car.pricePerDay,
                car.rating = req.body.car.rating

                car.save()
                .then( rows => res.json(rows) )
                .then(() => res.status(StatusCodes.NO_CONTENT).end())
                .catch(err => {
                    if (err.name == 'SequelizeForeignKeyConstraintError') {
                        res.status(StatusCodes.BAD_REQUEST).send({ message: 'Details with given ID do not exist.' });
                    } else {
                        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
                    }
                });
            }
        }).catch(err => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err));
});

router.delete('/:carId', authToken, async function (req, res) {
    await Car.destroy({
        where: {
            id: req.params.carId
        }
    }).then(car => {
        if (!car) {
            res.status(StatusCodes.NOT_FOUND).send({ message: 'Car not found.' });
        } else res.status(StatusCodes.NO_CONTENT).end();
    }).catch(err => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err));
});

module.exports = router;