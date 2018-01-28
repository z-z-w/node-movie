const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    password: String,
    // 0: nomal user
    // 1: verified user
    // 2: professonal user

    // >10: admin
    // >50: super admin
    role: {
        type: Number,
        default: 0
    },
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

module.exports = UserSchema;

