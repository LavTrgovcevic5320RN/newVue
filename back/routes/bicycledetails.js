const { cardetailsValidation, } = require("../joi-validation.js");
const express = require('express');
const { BicycleDetails } = require('../models');
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
    const bicycledetails = await  BicycleDetails.findAll();
    res.status(StatusCodes.OK).json({data: bicycledetails});
});

router.post('/', authToken, async function (req, res) {
    BicycleDetails.create({
        wheels: req.body.wheels,
        electric: req.body.electric,
        seats: req.body.seats
    })
    .then(bicycledetails => res.status(StatusCodes.CREATED).json(bicycledetails))
    .catch(err => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err));
});

router.get('/:bicycleDetailsId', authToken, async function (req, res) {
    const bicycleDetails = await  BicycleDetails.findByPk(req.params.bicycleDetailsId)
        .then(bicycleDetails => {
            if (!bicycleDetails) {
                res.status(StatusCodes.NOT_FOUND).send({ message: 'Bicycle details not found.' });
            } else res.status(StatusCodes.OK).json(bicycleDetails);
        }).catch(err => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err));
});

router.put('/:bicycleDetailsId', authToken, async function (req, res) {
    await  BicycleDetails.findByPk(req.params.bicycleDetailsId)
        .then(bicycleDetails => {
            if (!bicycleDetails) {
                res.status(StatusCodes.NOT_FOUND).send({ message: 'Bicycle details not found.' }).end();
            } else {
                bicycleDetails.wheels = req.body.wheels,
                bicycleDetails.electric = req.body.electric,
                bicycleDetails.seats = req.body.seats

                bicycleDetails.save()
                .then( rows => res.json(rows) )
                .then(() => res.status(StatusCodes.NO_CONTENT).end())
                .catch(err => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err))
            }
        }).catch(err => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err));
});

router.delete('/:bicycleDetailsId', authToken, async function (req, res) {
    await  BicycleDetails.destroy({
        where: {
            id: req.params.bicycleDetailsId
        }
    }).then(bicycleDetailsId => {
        if (!bicycleDetailsId) {
            res.status(StatusCodes.NOT_FOUND).send({ message: 'Bicycle details not found.' });
        } else res.status(StatusCodes.NO_CONTENT).end();
    }).catch(err => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err));
});

module.exports = router;