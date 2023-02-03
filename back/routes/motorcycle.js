const { Motorcycle } = require('../models');
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
    const motorcycles = await Motorcycle.findAll();
    console.log(motorcycles.length);
    res.status(StatusCodes.OK).json({data: motorcycles});
});

router.post('/', authToken, async function (req, res) {
    Motorcycle.create({
        manufacturer: req.body.motorcycle.manufacturer,
        model: req.body.motorcycle.model,
        year: req.body.motorcycle.year,
        detailsId: req.body.motorcycle.detailsId,
        pricePerDay: req.body.motorcycle.pricePerDay,
    })
    .then(motorcycle => res.status(StatusCodes.CREATED).json(motorcycle))
    .catch(err => {
        if (err.name == 'SequelizeForeignKeyConstraintError') {
            res.status(StatusCodes.BAD_REQUEST).send({ message: 'Details with given ID do not exist.' });
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
    });
});

router.get('/:motorcycleId', authToken, async function (req, res) {
    const motorcycle = await Motorcycle.findByPk(req.params.motorcycleId)
        .then(motorcycle => {
            if (!motorcycle) {
                res.status(StatusCodes.NOT_FOUND).send({ message: 'Motorcycle not found.' });
            } else res.status(StatusCodes.OK).json(motorcycle);
        }).catch(err => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err));
});

router.put('/:motorcycleId', authToken, async function (req, res) {
    await Motorcycle.findByPk(req.params.motorcycleId)
        .then(motorcycle => {
            if (!motorcycle) {
                res.status(StatusCodes.NOT_FOUND).send({ message: 'Motorcycle not found.' }).end();
            } else {
                motorcycle.manufacturer = req.body.motorcycle.manufacturer,
                motorcycle.model = req.body.motorcycle.model,
                motorcycle.year = req.body.motorcycle.year,
                motorcycle.detailsId = req.body.motorcycle.detailsId,
                motorcycle.image = req.body.motorcycle.image,
                motorcycle.pricePerDay = req.body.motorcycle.pricePerDay,
                motorcycle.rating = req.body.motorcycle.rating
                
                motorcycle.save()
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

router.delete('/:motorcycleId', authToken, async function (req, res) {
    await Motorcycle.destroy({
        where: {
            id: req.params.motorcycleId
        }
    }).then(motorcycle => {
        if (!motorcycle) {
            res.status(StatusCodes.NOT_FOUND).send({ message: 'Motorcycle not found.' });
        } else res.status(StatusCodes.NO_CONTENT).end();
    }).catch(err => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err));
});

module.exports = router;