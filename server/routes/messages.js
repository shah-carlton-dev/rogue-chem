const path = require('path');
const express = require('express');
const Admin = require('../model/admin');
const Student = require('../model/student');
const Message = require('../model/message');
const Mongoose = require('mongoose');
const Router = express.Router();
const constants = require('../utils/constants.js');

// create a new announcement
// curl -X POST -H "Content-Type: application/json" -d '{"to":"rfarrell", "from":"RogueChem1", "title":"example announcement", "body":"announcement body", "broadcast":true}' http://localhost:3030/msg/newAnnouncement
Router.post('/newAnnouncement',
    async (req, res) => {
        try {
            const { to, from, title, body, broadcast } = req.body;
            // check that the 'to' is a course id
            const msg = new Message({
                to, from, title, body, broadcast
            });
            await msg.save();
            return res.send(msg).status(200);
        } catch (err) {
            return res.send('Error while creating new announcement').status(400);
        }
    }
);

// create a new message
// curl -X POST -H "Content-Type: application/json" -d '{"to":"rfarrell", "from":"RogueChem1", "title":"example message", "body":"message body", "broadcast":false}' http://localhost:3030/msg/newMessage
Router.post('/newMessage',
    async (req, res) => {
        try {
            const { to, from, title, body, broadcast } = req.body;
            // check that the 'to' is a student id
            const msg = new Message({
                to, from, title, body, broadcast
            });
            await msg.save();
            return res.send(msg).status(200);
        } catch (err) {
            return res.send('Error while creating new direct message').status(400);
        }
    }
);

// get all messages/announcements for a specific user (by id)
Router.get('allMessages/:id',
    async (req, res) => {
        try {
            const userId = req.params;
            Message.findById(userId, (err1, user => {
                if (err) return res.send("User not found").status(400);
                console.log(user);
            }))
        } catch (err) {
            return res.send('Error while getting messages for user').status(400);
        }
    }
)

module.exports = Router;