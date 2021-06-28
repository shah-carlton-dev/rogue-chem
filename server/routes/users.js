const path = require('path');
const express = require('express');
const Admin = require('../model/admin');
const Student = require('../model/student');
const Course = require('../model/course');
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
            let existing;
            let { username, password, email, fname, lname } = req.body;
            // check username, email are unique
            await Student.exists({ "username": username }).then(async exists => {
                existing = exists;
                if (exists) return res.status(400).send("Username already exists. Enter another one.");
                else await Student.exists({ "email": email }).then(exists => {
                    existing = exists;
                    if (exists) return res.status(400).send("Email already in use. Enter another one.");
                });
            });
            if (!existing) {
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
            }
        } catch (err) {
            return res.send('Error while creating new user').status(400);
        }
    }
);

Router.post('/validateToken', async (req, res) => {
    try {
        const token = req.body["auth-token"];
        if (!token) { return res.send(false).status(400); }
        const verified = jwt.verify(token, constants.jwt_pass);
        if (!verified) { return res.send(false).status(400); }

        let existing; // will be assigned to an existing user if one exists
        await Student.findById(verified.id, (err, user) => {
            if (err) {
                return res.send(false).status(400);
            }
            existing = user;
            if (user != null) {
                return res.status(200).send({
                    valid: true,
                    token: token,
                    user: existing
                });
            }
        }).then(async () => {
            if (!existing) {
                await Admin.findById(verified.id, (err, user) => {
                    existing = user;
                }).then(existing => {
                    if (existing === null) return res.status(400).send(false);
                    else return res.status(200).send({
                        valid: true,
                        token: token,
                        user: existing
                    });
                })
            }
        });
    } catch (err) {
        return res.send("Could not validate token").status(304);
    }
})

Router.post('/login', async (req, res) => {
    try {
        let existing; // will be assigned to an existing user if one exists
        let { username, password } = req.body;
        await Student.findOne({ username }).then(async (user, err) => {
            if (err) return res.send("Error finding user").status(400);
            if (user != null) {
                await bcrypt.compare(password, user.password).then(resp => {
                    if (!resp) return res.status(400).send('Invalid password. Nice try, bot.');
                    else {
                        const token = jwt.sign({ id: user._id }, constants.jwt_pass);
                        delete user.password;
                        return res.status(200).send({
                            existing: user,
                            token
                        });
                    }
                });
            }
            existing = user;
        }).then(async () => {
            if (!existing) {
                await Admin.findOne({ username }, (err, user) => {
                    if (err) return res.send("Error finding user").status(400);
                    else existing = user;
                }).then(async existing => {
                    if (existing === null) return res.status(400).send("User not found. Check that the username is correct.");
                    await bcrypt.compare(password, existing.password).then(resp => {
                        if (!resp) return res.status(400).send('Invalid password. Nice try, bot.');
                        else {
                            const token = jwt.sign({ id: existing._id }, constants.jwt_pass);
                            delete existing.password;
                            return res.status(200).send({
                                existing,
                                token
                            });
                        }
                    });
                });
            }
        })
    } catch (err) {
        return res.status(400).send("Error logging in. Please try again.");
    }
});

Router.post('/addToQueue', async (req, res) => {
    try {
        if (req.body.fileId) {
            const { fileId, userId } = req.body;
            await Student.findById(userId).then(async s => {
                if (!s.starredFiles.includes(fileId)) {
                    s.starredFiles = [...s.starredFiles, Mongoose.Types.ObjectId(fileId)];
                    s.save();
                    return res.status(200).send("File added to queue successfully!");
                } else {
                    return res.status(208).send("File is already in the queue!");
                }
            })
        } else {
            const { folderId, userId } = req.body;
            await Student.findById(userId).then(async s => {
                if (!s.starredSections.includes(folderId)) {
                    s.starredSections = [...s.starredSections, Mongoose.Types.ObjectId(folderId)];
                    s.save();
                    return res.status(200).send("Folder added to queue successfully!");
                } else {
                    return res.status(208).send("Folder is already in the queue!");
                }
            })
        }
    } catch (e) {
        console.log(e);
    }
})

Router.post('/updateRecents', async (req, res) => {
    try {
        const { fileId, userId } = req.body;
        await Student.findById(userId).then(async s => {
            console.log(s);
            if (!s.recentFiles.includes(fileId)) {
                s.recentFiles = [Mongoose.Types.ObjectId(fileId), ...s.recentFiles];
            } else if (s.recentFiles.length !== 1) {
                s.recentFiles.splice(s.recentFiles.findIndex(e => e == fileId), 1);
                s.recentFiles = [Mongoose.Types.ObjectId(fileId), ...s.recentFiles];
            }
            s.save();
            return res.status(200).send("Recents list updated successfully!");
        })
    } catch (e) {
        console.log(e);
    }
})

Router.post('/addCourse/:courseId/:userId', async (req, res) => {
    try {
        // add user to list of users on course
        await Course.findOne({ meta: true }).then(
            metaDoc => {
                return metaDoc.courses.findIndex(e => e.id.equals(req.params.courseId));
            }
        ).then(
            async ix => {
                await Course.findOneAndUpdate(
                    { meta: true }, 
                    { $push: { ['courses.' + ix + '.users']: Mongoose.Types.ObjectId(req.params.userId) } })
            }
        )

        // add course to list of user's courses
        await Student.findByIdAndUpdate(req.params.userId, {$push: {courses: Mongoose.Types.ObjectId(req.params.courseId)}});

        return res.send("Successfully added user to course").status(200);
    } catch (err) {
        console.log(err);
        return res.send("Error adding course to user account. Try again later.").status(400);
    }
})

module.exports = Router;