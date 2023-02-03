const { reservationValidation } = require("../joi-validation.js");
const models = require('../models');
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
    const reservations = await models.Reservation.findAll();
    res.status(StatusCodes.OK).json({data: reservations});
});

router.post('/', authToken, async function (req, res) {
    models.Reservation.create({
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        bicycleId: req.body.bicycleId,
        carId: req.body.carId,
        motorcycleId: req.body.motorcycleId,
        scooterId: req.body.scooterId,
        userId: req.body.userId
    }).then(reservation => res.status(StatusCodes.CREATED).json(reservation))
    .catch(err => {
        if (err.name == 'SequelizeForeignKeyConstraintError') {
            res.status(StatusCodes.BAD_REQUEST).send({ message: 'Car with given ID does not exist.' });
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
    });
});

router.get('/:reservationId', authToken, async function (req, res) {
    await models.Reservation.findByPk(req.params.reservationId)
        .then(reservation => {
            if (!reservation) {
                res.status(StatusCodes.NOT_FOUND).send({ message: 'Reservation not found.' });
            } else res.status(StatusCodes.OK).json(reservation);
        }).catch(err => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err));
});

router.put('/:reservationId', authToken, async function (req, res) {
    await models.Reservation.findByPk(req.params.reservationId)
        .then(reservation => {
            if (!reservation) {
                res.status(StatusCodes.NOT_FOUND).send({ message: 'Reservation not found.' });
            } else {
                
                reservation.startDate = req.body.startDate,
                reservation.endDate = req.body.endDate,
                reservation.bicycleId = req.body.bicycleId,
                reservation.carId = req.body.carId,
                reservation.motorcycleID = req.body.motorcycleId,
                reservation.scooterId = req.body.scooterId,
                reservation.userId = req.body.userId
                
                reservation.save()
                .then( rows => res.json(rows) )
                .then(() => res.status(StatusCodes.NO_CONTENT).end())
                .catch(err => {
                    if (err.name == 'SequelizeForeignKeyConstraintError') {
                        res.status(StatusCodes.BAD_REQUEST).send({ message: 'Car with given ID does not exist.' });
                    } else {
                        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
                    }
                });
            }
        }).catch(err => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err));
});

router.delete('/:reservationId', authToken, async function (req, res) {
    await models.Reservation.destroy({
        where: {
            id: req.params.reservationId
        }
    }).then(reservation => {
        if (!reservation) {
            res.status(StatusCodes.NOT_FOUND).send({ message: 'Reservation not found.' });
        } else res.status(StatusCodes.NO_CONTENT).end();
    }).catch(err => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err));
});

module.exports = router;
