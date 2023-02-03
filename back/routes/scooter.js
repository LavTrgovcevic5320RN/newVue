const { Scooter } = require('../models');
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
    const scooters = await Scooter.findAll();
    console.log(scooters.length);
    res.status(StatusCodes.OK).json({data: scooters});
});

router.post('/', authToken, async function (req, res) {
    Scooter.create({
        manufacturer: req.body.scooter.manufacturer,
        model: req.body.scooter.model,
        year: req.body.scooter.year,
        detailsId: req.body.scooter.detailsId,
        pricePerDay: req.body.scooter.pricePerDay,
    })
    .then(scooter => res.status(StatusCodes.CREATED).json(scooter))
    .catch(err => {
        if (err.name == 'SequelizeForeignKeyConstraintError') {
            res.status(StatusCodes.BAD_REQUEST).send({ message: 'Details with given ID do not exist.' });
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
    });
});

router.get('/:scooterId', authToken, async function (req, res) {
    const scooter = await Scooter.findByPk(req.params.scooterId)
        .then(scooter => {
            if (!scooter) {
                res.status(StatusCodes.NOT_FOUND).send({ message: 'Scooter not found.' });
            } else res.status(StatusCodes.OK).json(scooter);
        }).catch(err => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err));
});

router.put('/:scooterId', authToken, async function (req, res) {
    await Scooter.findByPk(req.params.scooterId)
        .then(scooter => {
            if (!scooter) {
                res.status(StatusCodes.NOT_FOUND).send({ message: 'Scooter not found.' }).end();
            } else {
                scooter.manufacturer = req.body.scooter.manufacturer,
                scooter.model = req.body.scooter.model,
                scooter.year=  req.body.scooter.year,
                scooter.detailsId = req.body.scooter.detailsId,
                scooter.image = req.body.scooter.image,
                scooter.pricePerDay = req.body.scooter.pricePerDay,
                scooter.rating = req.body.scooter.rating
                
                scooter.save()
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

router.delete('/:scooterId', authToken, async function (req, res) {
    await Scooter.destroy({
        where: {
            id: req.params.scooterId
        }
    }).then(scooter => {
        if (!scooter) {
            res.status(StatusCodes.NOT_FOUND).send({ message: 'Scooter not found.' });
        } else res.status(StatusCodes.NO_CONTENT).end();
    }).catch(err => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err));
});

module.exports = router;