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
            res.status(200).send(admin);
        } catch (err) {
            res.status(400).send('Error while creating admin');
            console.log(err);
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
            res.status(200).send(student);
        } catch (err) {
            res.status(400).send('Error while creating student user');
            console.log(err);
        }
    }
);

Router.post('/validateToken', async (req, res) => {
    try {
        const token = req.header("auth-token");
        if (!token) res.send(false);

        const verified = jwt.verify(token, constants.jwt_pass);
        if (!verified) res.send(false);

        let existing;
        await Student.findById(verified.id, (err, user) => {
            if(err) {
                console.log(err);
                res.status(400).send("Error finding user");
            }
            existing = user;
        });
        if (!existing) {
            await Admin.findById(verified.id, (err, user) => {
                if (err) {
                    console.log(err);
                    res.status(401).send("Error finding admin");
                }
                existing = user;
            });
            if (!existing) {
                res.status(400).send("Account not found");
            }
        }
        // ----------------
        await Student.findById(verified.id, (err, user) => {
            existing = user;
        });
        if (existing == null) res.send(false);

        res.send({
            valid: true,
            token: token,
            user: existing
        });
    } catch (err) {
        res.status(500).send('Error validating token');
        console.log(err);
    }
})

Router.post('/login', async (req, res) => {
    try {
        let existing; // will be assigned to an existing user if one exists
        let { username, password } = req.body;
        await Student.findOne({ username }, (err, user) => {
            if (err) {
                console.log(err);
                res.status(400).send("Error finding user");
            }
            existing = user;
        });
        if (!existing) {
            await Admin.findOne({ username }, (err, user) => {
                if (err) {
                    console.log(err);
                    res.status(401).send("Error finding admin");
                }
                existing = user;
            });
            if (!existing) {
                res.status(400).send("Account not found");
            }
        }
        const pass = await bcrypt.compare(password, existing.password);
        if (!pass) {
            res.status(400).send("Invalid password");
        }
        const token = jwt.sign({ id: existing._id }, constants.jwt_pass);
        res.status(200).send({ existing, token });
    }
    catch (err) {
        res.status(400).send('Error logging in');
        console.log(err);
    }
}
)

module.exports = Router;