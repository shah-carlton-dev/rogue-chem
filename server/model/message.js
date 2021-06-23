const mongoose = require('mongoose');
const { users_db } = require('../db/db');

const messageSchema = mongoose.Schema(
    {
        to: {
            type: String,
            required: true
        },
        from: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        },
        broadcast: {
            type: Boolean,
            required: true
        }
    },
    { timestamps: true }
);

const Message = users_db.model('Message', messageSchema);

module.exports = Message;