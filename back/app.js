const express = require('express');
const { sequelize } = require('./models');
const cors = require('cors');
const http = require('http');
const path = require('path');

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
const models = require('./models');
const history = require('connect-history-api-fallback');

const app = express();

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "http://localhost:8081/",
        methods: ["GET", "POST"]
        // credentials: true
    },
    allowEIO3: true
});

var corsOptions = {
    origin: '*',
    // origin: "http://localhost:8080/",
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));


io.on('connection', socket => {
    socket.use(authSocket);
    socket.on('reservation', msg => {
        const startDate = new Date(01-01-2000);
        const endDate = new Date(01-01-2000);
        const userId = msg.user.id;
        const carId = msg.carId;
        const motorcycleId = msg.motorcycleId;
        const scooterId = msg.scooterId;
        const bicycleId = msg.bicycleId;


        models.Reservation.create({
            startDate,
            endDate,
            bicycleId,
            carId,
            motorcycleId,
            scooterId,
            userId
        }).then(reservation => io.emit('reservation', JSON.stringify(reservation)))
            .catch(err => {
                socket.emit('error', err.message);
            });
    });

    socket.on('error', err => socket.emit('error', err.message) );
});



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

// const staticMdl = express.static(path.join(__dirname, 'dist'));
// app.use(staticMdl);
// app.use(history({ index: '/index.html' }));
// app.use(staticMdl);

app.listen({ port: 8080 }, async () => {
    await sequelize.authenticate();
    console.log("Connection established - Rest API on port 8080");
});