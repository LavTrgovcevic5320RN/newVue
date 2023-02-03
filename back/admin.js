const express = require("express");
const { sequelize } = require('./models');
const path = require("path");
const joi = require('joi');
const jwt = require('jsonwebtoken');
const app = express();
require('dotenv').config();

function getCookies(req) {
    if (req.headers.cookie == null) return {};

    const rawCookies = req.headers.cookie.split('; ');
    const parsedCookies = {};

    //rawCookies.array.forEach
    rawCookies.forEach( rawCookie => {
        const parsedCookie = rawCookie.split('; ');
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });

    return parsedCookies;
};

function authToken(req,res,next) {
    const cookies = getCookies(req);
    const token = cookies['token'];

    if (token == null) return res.redirect(301, '/login');

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.redirect(301,'/login');

        req.user = user;

        next();
    });
};

app.get('/register', (req, res) => {
    res.sendFile('register.html', { root: './static' });
});

app.get('/login', (req, res) => {
    res.sendFile('login.html', { root: './static' });
});

app.get('/', authToken, (req, res) => {
    res.sendFile('index.html', { root: './static'});
});

const adminRouter = require('./routes/admin');

app.use('/admin', adminRouter);

app.use(express.static(path.join(__dirname,'static')));

app.listen({ port: 8000 }, async () => {
    await sequelize.authenticate();
    console.log("Connection established on port 8000");
});
