const express = require('express');
const { sequelize } = require('./models');
const cors = require('cors');
const http = require('http');

const carRouter = require('./routes/car');
const carDetailsRouter = require('./routes/cardetails');
const scooterRouter = require('./routes/scooter');
const scooterDetailsRouter = require('./routes/scooterdetails');
const motorcycleRouter = require('./routes/motorcycle');
const motorcycleDetailsRouter = require('./routes/motorcycledetails');
const bicycleRouter = require('./routes/bicycle');
const bicycleDetailsRouter = require('./routes/bicycledetails');
const reservationRouter = require('./routes/reservation');
const usersRouter = require('./routes/user');

const app = express();

var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));
app.use('/api/cars', carRouter);
app.use('/api/cardetails', carDetailsRouter);
app.use('/api/scooters', scooterRouter);
app.use('/api/scooterdetails', scooterDetailsRouter);
app.use('/api/motorcycles', motorcycleRouter);
app.use('/api/motorcycledetails', motorcycleDetailsRouter);
app.use('/api/bicycles', bicycleRouter);
app.use('/api/bicycledetails', bicycleDetailsRouter);
app.use('/api/reservations', reservationRouter);
app.use('/api/users', usersRouter);

app.listen({ port: 8080 }, async () => {
    await sequelize.authenticate();
    console.log("Connection established - Rest API on port 8080");
});