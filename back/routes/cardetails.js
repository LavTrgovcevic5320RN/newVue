const { cardetailsValidation, } = require("../joi-validation.js");
const express = require('express');
const models = require('../models');
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
    const cardetails = await  models.CarDetails.findAll();
    res.status(StatusCodes.OK).json({data: cardetails});
});

router.post('/', authToken, async function (req, res) {
    models.CarDetails.create({
        doors: req.body.doors,
        fuel: req.body.fuel,
        transmission: req.body.transmission
    })
    .then(car => res.status(StatusCodes.CREATED).json(car))
    .catch(err => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err));
});

router.get('/:carDetailsId', authToken, async function (req, res) {
    const carDetails = await  models.CarDetails.findByPk(req.params.carDetailsId)
        .then(carDetails => {
            if (!carDetails) {
                res.status(StatusCodes.NOT_FOUND).send({ message: 'Car details not found.' });
            } else res.status(StatusCodes.OK).json(carDetails);
        }).catch(err => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err));
});

router.put('/:carDetailsId', authToken, async function (req, res) {
    await  models.CarDetails.findByPk(req.params.carDetailsId)
        .then(carDetails => {
            if (!carDetails) {
                res.status(StatusCodes.NOT_FOUND).send({ message: 'Car details not found.' }).end();
            } else {
                carDetails.doors = req.body.doors,
                carDetails.fuel = req.body.fuel,
                carDetails.transmission = req.body.transmission
                
                carDetails.save()
                .then( rows => res.json(rows) )
                .then(() => res.status(StatusCodes.NO_CONTENT).end())
                .catch(err => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err))
            }
        }).catch(err => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err));
});

router.delete('/:carDetailsId', authToken, async function (req, res) {
    await  models.CarDetails.destroy({
        where: {
            id: req.params.carDetailsId
        }
    }).then(carDetailsId => {
        if (!carDetailsId) {
            res.status(StatusCodes.NOT_FOUND).send({ message: 'Car details not found.' });
        } else res.status(StatusCodes.NO_CONTENT).end();
    }).catch(err => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err));
});

module.exports = router;