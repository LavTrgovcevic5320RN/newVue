const express = require('express');
const router = express.Router();
const {authToken, isModOrAdminOrLoggedIn} = require('../middleware/auth');

router.use(express.static('static'));
router.use(express.json());

// router.get('/', (req, res) => {
//     res.sendFile('index.html', {root: './static'});
// });

router.get('/cars', (req, res) => {
    res.sendFile('cars.html', {root: './static/cars'});
});
router.get('/cardetails', (req, res) => {
    res.sendFile('cardetails.html', {root: './static/cardetails'});
});

router.get('/bicycles', (req, res) => {
    res.sendFile('bicycles.html', {root: './static/bicycles'});
});
router.get('/bicycledetails', (req, res) => {
    res.sendFile('bicycledetails.html', {root: './static/bicycledetails'});
});

router.get('/motorcycles', (req, res) => {
    res.sendFile('motorcycles.html', {root: './static/motorcycles'});
});
router.get('/motorcycledetails', (req, res) => {
    res.sendFile('motorcycledetails.html', {root: './static/motorcycledetails'});
});

router.get('/scooters', (req, res) => {
    res.sendFile('scooters.html', {root: './static/scooters'});
});
router.get('/scooterdetails', (req, res) => {
    res.sendFile('scooterdetails.html', {root: './static/scooterdetails'});
});

router.get('/reservations', (req, res) => {
    res.sendFile('reservations.html', {root: './static/reservations'});
});
router.get('/users', (req, res) => {
    res.sendFile('users.html', {root: './static/users'});
});

module.exports = router;