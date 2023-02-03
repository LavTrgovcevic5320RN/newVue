const { cardetailsValidation, } = require("../joi-validation.js");
const express = require('express');
const { MotorcycleDetails } = require('../models');
const { StatusCodes } = require('http-status-codes');

const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

function authToken(req, res, next) {
    const authHeader = req.headers.authorization;
    console.log(req.headers);
    const token = authHeader && authHeader.split(" ")[1];
  
    if (token == null) {return res.status(401).json({ msg: "error" });}
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.status(403).json({ msg: err });
    
        req.user = user;
    
        next();
    });
}

// router.use(authToken);

router.get('/', async function (req, res) {
    const motorcycledetails = await  MotorcycleDetails.findAll();
    res.status(StatusCodes.OK).json({data: motorcycledetails});
});

router.post('/', authToken, async function (req, res) {
    MotorcycleDetails.create({
        wheels: req.body.wheels,
        seats: req.body.seats,
        maxSpeed: req.body.maxSpeed,
        maxWeight: req.body.maxWeight,
        type: req.body.type
    })
    .then(motorcycledetails => res.status(StatusCodes.CREATED).json(motorcycledetails))
    .catch(err => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err));
});

router.get('/:motorcycleDetailsId', authToken, async function (req, res) {
    const motorcycledetails = await  MotorcycleDetails.findByPk(req.params.motorcycleDetailsId)
        .then(motorcycleDetails => {
            if (!motorcycleDetails) {
                res.status(StatusCodes.NOT_FOUND).send({ message: 'Motorcycle details not found.' });
            } else res.status(StatusCodes.OK).json(motorcycleDetails);
        }).catch(err => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err));
});

router.put('/:motorcycleDetailsId', authToken, async function (req, res) {
    await  MotorcycleDetails.findByPk(req.params.motorcycleDetailsId)
        .then(motorcycleDetails => {
            if (!motorcycleDetails) {
                res.status(StatusCodes.NOT_FOUND).send({ message: 'Motorcycle details not found.' }).end();
            } else {
                motorcycleDetails.wheels =  req.body.wheels,
                motorcycleDetails.seats = req.body.seats,
                motorcycleDetails.maxSpeed = req.body.maxSpeed,
                motorcycleDetails.maxWeight = req.body.maxWeight,
                motorcycleDetails.type = req.body.type

                motorcycleDetails.save()
                .then( rows => res.json(rows) )
                .then(() => res.status(StatusCodes.NO_CONTENT).end())
                .catch(err => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err))
            }
        }).catch(err => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err));
});

router.delete('/:motorcycleDetailsId', authToken, async function (req, res) {
    console.log("CAO");
    console.log(req.params.motorcycleDetailsId);
    console.log("CAO");
    await MotorcycleDetails.destroy({
        where: {
            id: req.params.motorcycleDetailsId
        }
    }).then(motorcycleDetailsId => {
        if (!motorcycleDetailsId) {
            res.status(StatusCodes.NOT_FOUND).send({ message: 'Motorcycle details not found.' });
        } else res.status(StatusCodes.NO_CONTENT).end();
    }).catch(err => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err));
});

module.exports = router;