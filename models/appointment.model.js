const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    username: { type: String, required: true, },
    description: { type: String, required: true, },
    duration: { type: Number, required: true, },
    date: { type: Date, required: true, },
}, {
    timestamps: true,
});


const Book = mongoose.model('bookings', bookSchema);
module.exports = Book;