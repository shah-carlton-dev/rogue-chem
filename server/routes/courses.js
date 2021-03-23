const path = require('path');
const express = require('express');
const Router = express.Router();
const Course = require('../model/course.js');
const Section = require('../model/section.js');
const mongoose = require('mongoose');

Router.post('/create', async (req, res) => {
    try {
        let { name, description } = req.body;
        const course = new Course({
            name,
            description,
            sections: [],
            files: [],
            published: false
        });
        await course.save();
        res.send('Course created successfully.');
    } catch (error) {
        res.status(400).send('Error while creating course. Try again later.');
    }
});

Router.get('/', async (req, res) => {
    try {
        const courses = await Course.find();
        res.send(courses);
    } catch (error) {
        res.status(400).send('Error while getting list of courses. Try again later.');
    }
});

Router.put('/addSection', async (req, res) => {
    try {
        let { course_id, name, description } = req.body;
        course_id = mongoose.Types.ObjectId(course_id);
        let section = new Section({
            course_id,
            name,
            description,
            files: []
        });
        await section.save().then( async (sec) => {
            console.log(sec);
            try {
                await Course.findByIdAndUpdate(course_id, { "$push": { "sections": sec._id } });
            } catch (err) {
                res.status(400).send("Error while updating course sections array.");
            }
            const sections = await Section.find();
            res.send(sections);
        });
    } catch (err) {
        res.status(400).send("Error adding a section. Try again later");
    }
});

module.exports = Router;