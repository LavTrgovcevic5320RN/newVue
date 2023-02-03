const { userValidation } = require("../joi-validation.js");
const express = require('express');
const { User } = require('../models');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    console.log(authHeader);
    if (token == null) return res.status(401).json({ msg: "error" });
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.status(403).json({ msg: err });
        
        // if(req.path.includes('users') && user.role === 'Moderator'){
        //     return res.status(401).json({ msg: "CAO" });
        // }
        req.user = user;
    
        next();
    });
}
// router.use(authToken);

router.get('/', async function (req, res) {
    const users = await User.findAll();
    res.status(StatusCodes.OK).json({data: users});
});

router.post('/', authToken, async function (req, res) {
    const token = req.headers['authorization'].split(' ')[1].split('\.')[1];
    payload = JSON.parse(atob(token));
    if(payload.role !== "Admin")
        res.status(403).json({ msg: "Do not have admin priveledges!"});
    else{
        User.create({
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        }).then(user => res.status(StatusCodes.CREATED).json(user))
        .catch(err => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err));
    }
});

router.put('/:userId', authToken,  async function (req, res) {
    const token = req.headers['authorization'].split(' ')[1].split('\.')[1];
    payload = JSON.parse(atob(token));
    if(payload.role !== "Admin")
        res.status(403).json({ msg: "Do not have admin priveledges!"});
    else{
        await User.findByPk(req.params.userId)
        .then(user => {
            if (!user) {
                res.status(StatusCodes.NOT_FOUND).send({ message: 'User not found.' });
            } else {
                user.email = req.body.email;
                user.password = req.body.password;
                user.role = req.body.role;
                user.save()
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
            }
        }).catch(err => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err));
    }
});

router.get('/:userId', authToken, async function (req, res) {
    const token = req.headers['authorization'].split(' ')[1].split('\.')[1];
    payload = JSON.parse(atob(token));
    if(payload.role !== "Admin")
        res.status(403).json({ msg: "Do not have admin priveledges!"});
    else{
        await User.findByPk(req.params.userId)
        .then(user => {
            if(!user){
                res.status(StatusCodes.NOT_FOUND).send({message:"User not found"});
            }else
                res.status(StatusCodes.OK).json(user);
        }).catch(err => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err));
    }
});

router.delete('/:userId', authToken, async function (req, res) {
    const token = req.headers['authorization'].split(' ')[1].split('\.')[1];
    payload = JSON.parse(atob(token));
    if(payload.role !== "Admin")
        res.status(403).json({ msg: "Do not have admin priveledges!"});
    else{
        await User.destroy({
            where: {
                id: req.params.userId
            }
        }).then(user => {
            if (!user) {
                res.status(StatusCodes.NOT_FOUND).send({ message: 'User not found.' });
            } else res.status(StatusCodes.NO_CONTENT).end();
        }).catch(err => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err));
    }
});

module.exports = router;