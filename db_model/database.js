const mongoose = require('mongoose');

const user = new mongoose.Schema({
    name: { type: String, required: true, trim: true, minlength: 5 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 3, maxlength: 15 },
    createdAt: { type: Date, default: Date.now },
})


const User = mongoose.model(User, user);

module.exports = User;