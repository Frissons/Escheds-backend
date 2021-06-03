const router = require('express').Router();
let Book = require('../models/appointment.model');

router.route('/').get((req, res) => {
    Book.find()
        .then(booked => res.json(booked))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newBooking = new Book({
        username,
        description,
        duration,
        date,
    });

    newBooking.save()
        .then(() => res.json('Appointment Added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Book.findById(req.params.id)
        .then(appointment => res.json(appointment))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Book.findByIdAndDelete(req.params.id)
        .then(() => res.json('Appointment cancelled or deleted or dissolved into thin air.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Book.findById(req.params.id)
        .then(Book => {
            Book.username = req.body.username;
            Book.description = req.body.description;
            Book.duration = Number(req.body.duration);
            Book.date = Date.parse(req.body.date);

            Book.save()
                .then(() => res.json('Appointment Updated'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;