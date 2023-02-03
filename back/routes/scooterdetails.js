const { cardetailsValidation, } = require("../joi-validation.js");
const express = require('express');
const { ScooterDetails } = require('../models');
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
    const scooterdetails = await  ScooterDetails.findAll();
    res.status(StatusCodes.OK).json({data: scooterdetails});
});

router.post('/', authToken, async function (req, res) {
    ScooterDetails.create({
        maxWeight: req.body.maxWeight,
        electric: req.body.electric,
        length: req.body.length
    })
    .then(scooterdetails => res.status(StatusCodes.CREATED).json(scooterdetails))
    .catch(err => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err));
});

router.get('/:scooterDetailsId', authToken, async function (req, res) {
    const scooterdetails = await  ScooterDetails.findByPk(req.params.scooterDetailsId)
        .then(scooterDetails => {
            if (!scooterDetails) {
                res.status(StatusCodes.NOT_FOUND).send({ message: 'Scooter details not found.' });
            } else res.status(StatusCodes.OK).json(scooterDetails);
        }).catch(err => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err));
});

router.put('/:scooterDetailsId', authToken, async function (req, res) {
    await  ScooterDetails.findByPk(req.params.scooterDetailsId)
        .then(scooterDetails => {
            if (!scooterDetails) {
                res.status(StatusCodes.NOT_FOUND).send({ message: 'Scooter details not found.' }).end();
            } else {
                scooterDetails.maxWeight = req.body.maxWeight,
                scooterDetails.electric = req.body.electric,
                scooterDetails.length = req.body.length

                scooterDetails.save()
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
            }
        }).catch(err => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err));
});

router.delete('/:scooterDetailsId', authToken, async function (req, res) {
    await ScooterDetails.destroy({
        where: {
            id: req.params.scooterDetailsId
        }
    }).then(scooterDetailsId => {
        if (!scooterDetailsId) {
            res.status(StatusCodes.NOT_FOUND).send({ message: 'Scooter details not found.' });
        } else res.status(StatusCodes.NO_CONTENT).end();
    }).catch(err => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err));
});

module.exports = router;