const path = require('path');
const express = require('express');
const Admin = require('../model/admin');
const Student = require('../model/student');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Mongoose = require('mongoose');
const Router = express.Router();
const constants = require('../utils/constants.js');

// create a new admin account
// curl -X POST -H "Content-Type: application/json" -d '{"username":"rfarrell", "password":"RogueChem1", "email":"farrell.roguechem@gmail.com", "fname":"Ryan", "lname":"Farrell", "courses":["course_id"],"messages":["message_id"]}' http://localhost:3030/users/adminCreate
Router.post('/adminCreate',
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

Router.post('/studentCreate',
    async (req, res) => {
        try {
            let { username, password, email, fname, lname } = req.body;
            let salt = await bcrypt.genSalt();
            password = await bcrypt.hash(password, salt);
            const student = new Student({
                username,
                password,
                email,
                fname,
                lname,
                admin: false
            });
            await student.save();
            return res.send(student).status(200);
        } catch (err) {
            return res.send('Error while creating student user').status(400);
        }
    }
);

Router.post('/validateToken', async (req, res) => {
    try {
        const token = req.body["auth-token"];
        if (!token) { return res.send(false).status(301); return; }

        const verified = jwt.verify(token, constants.jwt_pass);
        if (!verified) { return res.send(false).status(302); return; }

        let existing;
        await Student.findById(verified.id, (err, user) => {
            if (err) {
                console.log(err);
                return res.send("Error finding user").status(400);
            }
            existing = user;
        });
        if (!existing || existing == null) {
            await Admin.findById(verified.id, (err, user) => {
                if (err) {
                    console.log(err);
                    return res.send("Error finding account").status(400);
                }
                existing = user;
            });
            if (existing == null) { return res.send(false).status(303); }
        }
        return res.send({
            valid: true,
            token: token,
            user: existing
        }).status(200);
    } catch (err) {
        return res.send("Could not validate token").status(304);
    }
})

Router.post('/login', async (req, res) => {
    try {
        let existing; // will be assigned to an existing user if one exists
        let { username, password } = req.body;
        await Student.findOne({ username }, (err, user) => {
            if (err) {
                console.log(err);
                return res.send("Error finding user").status(400);
            }
            existing = user;
        });
        if (!existing) {
            await Admin.findOne({ username }, (err, user) => {
                if (err) {
                    console.log(err);
                    return res.send("Error finding account").status(400);
                }
                existing = user;
            });
        }
        let pass;
        try {
            pass = await bcrypt.compare(password, existing.password).then(a => null, (a) => console.log("poo"));
        } catch (e) {
            return res.send('Invalid password. Nice try, bot.').status(400);
        }
        const token = jwt.sign({ id: existing._id }, constants.jwt_pass);
        return res.send({ existing, token }).status(200);
    }
    catch (err) {
        return res.send("Error logging in - try again").status(400);
    }
});

module.exports = Router;