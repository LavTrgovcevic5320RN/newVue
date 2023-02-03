const express = require('express');
const {sequelize} = require('./models');
const models = require('./models');
const { userValidation } = require("./joi-validation.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));


app.post('/register', (req, res) => {
    const obj = {
        email: req.body.email,
        role: req.body.role,
        password: bcrypt.hashSync(req.body.password, 10),
        
    };
    models.User.create(obj).then( rows => {
        const usr = {
            userID: rows.id,
            role: rows.role,
        };
        const token = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET);
        console.log(token);
        res.json({token});
    }).catch( err =>  { console.log(err); res.status(500).json({msg: "ERROR: Registration failed. "})});
    
});

app.post('/login', (req, res) => {
    const validEntry = userValidation.validate(req.body);
    if(validEntry.error){
        res.status(422).json({ msg: validEntry.error.message })
    }else{
        console.log(req.body);

        models.User.findOne({where: { email: req.body.email }})
            .then( usr => {
                if(bcrypt.compareSync(req.body.password, usr.password) || req.body.password == usr.password) {
                    const obj = {
                        userID: usr.id,
                        role: usr.role
                    };
                    const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
                    console.log(token);
                    res.json({token: token});
                }else{
                    res.status(400).json({msg: "Incorrect password"});
                }
            })
            .catch( err => res.status(500).json({msg: "Incorrect user identification"}));
    }
});

app.listen({ port: 9000 }, async () => {
    await sequelize.authenticate();
    console.log("Connection established - Authentication Service on port 9000");
})