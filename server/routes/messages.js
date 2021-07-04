const path = require('path');
const express = require('express');
const Admin = require('../model/admin');
const Student = require('../model/student');
const Message = require('../model/message');
const Course = require('../model/course.js');
const Mongoose = require('mongoose');
const Router = express.Router();
const constants = require('../utils/constants.js');

// keep broadcast bc it will help when getting messages/announcements

// get meta to relate course id and name
Router.get('/metaDoc', async (req, res) => {
    try {
        await Course.findOne({ meta: true }, 'courses').then(r => {
            r.courses.forEach(c => { delete c.users })
            return res.send(r.courses).status(200)
        })
    } catch (err) {
        return res.send("Error getting meta doc").status(400);
    }
});

// create a new announcement
// curl -X POST -H "Content-Type: application/json" -d '{"to": "60aea37e17fb8527810c93ed", "from": "rfarrell", "title":"example announcement", "body":"announcement body"}' http://localhost:3030/msg/newAnnouncement
Router.post('/newAnnouncement', async (req, res) => {
    try {
        const { to, from, title, body } = req.body;
        let to_course;
        let from_admin;

        // check that the to is a course id
        try {
            await Course.findById(to).then(course => to_course = course);
        } catch (err) {
            return res.send("Must have a course id as the \'to\' field for announcements");
        }

        // check that the from is admin
        try {
            await Admin.findOne({ username: from }).then(admin => from_admin = admin);
        } catch (err) {
            return res.send("Must have an admin username as the \'from\' field for announcements");
        }

        const msg = new Message({
            to, from, title, body, broadcast: true
        });

        await msg.save();
        return res.send(msg).status(200);
    } catch (err) {
        return res.send('Error while creating new announcement').status(400);
    }
});

// create a new message
// curl -X POST -H "Content-Type: application/json" -d '{"to": "rshah", "from": "rfarrell", "title":"example message", "body":"message body"}' http://localhost:3030/msg/newMessage
Router.post('/newMessage', async (req, res) => {
    try {
        const { to, from, title, body } = req.body;

        // TODO: if from is admin, to should be student
        try {
            await Course.findById(to).then(course => to_course = course);
        } catch (err) {
            return res.send("Must have a course id as the \'to\' field for announcements");
        }

        // TODO: if from is student, to should be admin
        try {
            await Admin.findOne({ username: from }).then(admin => from_admin = admin);
        } catch (err) {
            return res.send("Must have an admin username as the \'from\' field for announcements");
        }

        const msg = new Message({
            to, from, title, body, broadcast: false
        });

        await msg.save();
        return res.send(msg).status(200);
    } catch (err) {
        return res.send('Error while creating new direct message').status(400);
    }
});

// get all announcements for a specific user (by id)
Router.get('/announcements/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        let announcementsList = [];
        await Student.findById(userId).then(async user => {
            if (!user) {
                return await Admin.findById(userId).then(admin => {
                    return admin.courses
                })
            } else {
                return user.courses;
            }
        }).then(async userCourses => {
            userCourses.forEach(async course => {
                await Message.find({ broadcast: true, to: course }).then(announcements => {
                    announcementsList.push(announcements);
                    if (userCourses.length === announcementsList.length) {
                        return res.send(announcementsList.flat()).status(200);
                    }
                })
            })
        })
    } catch (err) {
        return res.send('Error while getting messages for user').status(400);
    }
});

Router.delete('/announcement/:id', async (req, res) => {
    try {
        await Message.deleteOne({_id: req.params.id});
    } catch (err) {
        return res.send('Error while trying to delete announcement. Try again later.')
    }
})

module.exports = Router;