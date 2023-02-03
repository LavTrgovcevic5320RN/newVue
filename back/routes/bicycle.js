const { Bicycle } = require('../models');
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

router.use(authToken);

router.get('/', async function (req, res) {
    const bicycles = await Bicycle.findAll();
    console.log(bicycles.length);
    res.status(StatusCodes.OK).json({data: bicycles});
});

router.post('/', authToken, async function (req, res) {
    Bicycle.create({
        manufacturer: req.body.bicycle.manufacturer,
        model: req.body.bicycle.model,
        year: req.body.bicycle.year,
        detailsId: req.body.bicycle.detailsId,
        pricePerDay: req.body.bicycle.pricePerDay,
    })
    .then(bicycle => res.status(StatusCodes.CREATED).json(bicycle))
    .catch(err => {
        if (err.name == 'SequelizeForeignKeyConstraintError') {
            res.status(StatusCodes.BAD_REQUEST).send({ message: 'Details with given ID do not exist.' });
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
    });
});

router.get('/:bicycleId', authToken, async function (req, res) {
    const bicycle = await Bicycle.findByPk(req.params.bicycleId)
        .then(bicycle => {
            if (!bicycle) {
                res.status(StatusCodes.NOT_FOUND).send({ message: 'Bicycle not found.' });
            } else res.status(StatusCodes.OK).json(bicycle);
        }).catch(err => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err));
});

router.put('/:bicycleId', authToken, async function (req, res) {
    await Bicycle.findByPk(req.params.bicycleId)
        .then(bicycle => {
            if (!bicycle) {
                res.status(StatusCodes.NOT_FOUND).send({ message: 'Bicycle not found.' }).end();
            } else {
                bicycle.manufacturer = req.body.bicycle.manufacturer,
                bicycle.model = req.body.bicycle.model,
                bicycle.year = req.body.bicycle.year,
                bicycle.detailsId = req.body.bicycle.detailsId,
                bicycle.image = req.body.bicycle.image,
                bicycle.pricePerDay = req.body.bicycle.pricePerDay,
                bicycle.rating = req.body.bicycle.rating

                bicycle.save()
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

router.delete('/:bicycleId', authToken, async function (req, res) {
    await Bicycle.destroy({
        where: {
            id: req.params.bicycleId
        }
    }).then(bicycle => {
        if (!bicycle) {
            res.status(StatusCodes.NOT_FOUND).send({ message: 'Bicycle not found.' });
        } else res.status(StatusCodes.NO_CONTENT).end();
    }).catch(err => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err));
});

module.exports = router;