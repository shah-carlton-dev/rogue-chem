const path = require('path');
const express = require('express');
const Admin = require('../model/admin');
const Student = require('../model/student');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Mongoose = require('mongoose');
const Router = express.Router();
const constants = require('../utils/constants.js');

// create a new announcement
// curl -X POST -H "Content-Type: application/json" -d '{"username":"rfarrell", "password":"RogueChem1", "email":"farrell.roguechem@gmail.com", "fname":"Ryan", "lname":"Farrell", "courses":["course_id"],"messages":["message_id"]}' http://localhost:3030/users/adminCreate
Router.post('/newAnnouncement',
    async (req, res) => {
        try {
            let { username, password, email, fname, lname, courses, messages } = req.body;
            let salt = await bcrypt.genSalt();
            password = await bcrypt.hash(password, salt);
            const admin = new Admin({
                username, password, email, fname, lname, courses, messages, admin: true
            });
            await admin.save();
            return res.send(admin).status(200);
        } catch (err) {
            return res.send('Error while creating admin').status(400);
        }
    }
);

// create a new message
// curl -X POST -H "Content-Type: application/json" -d '{"username":"rfarrell", "password":"RogueChem1", "email":"farrell.roguechem@gmail.com", "fname":"Ryan", "lname":"Farrell", "courses":["course_id"],"messages":["message_id"]}' http://localhost:3030/users/adminCreate
Router.post('/newMessage',
    async (req, res) => {
        try {
            let { username, password, email, fname, lname, courses, messages } = req.body;
            let salt = await bcrypt.genSalt();
            password = await bcrypt.hash(password, salt);
            const admin = new Admin({
                username, password, email, fname, lname, courses, messages, admin: true
            });
            await admin.save();
            return res.send(admin).status(200);
        } catch (err) {
            return res.send('Error while creating admin').status(400);
        }
    }
);