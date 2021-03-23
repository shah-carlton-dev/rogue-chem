const path = require('path');
const express = require('express');
const Router = express.Router();
const Course = require('../model/course.js');
const Section = require('../model/section.js');
const File = require('../model/file.js');
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
        await section.save().then(async (sec) => {
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

Router.get('/sections/:id', async (req, res) => {
    try {
        const course_id = req.params.id;
        let course;
        await Course.findById(mongoose.Types.ObjectId(course_id)).then(c => course = c);
        let sectionList = [];
        try {
            if (course.sections.length === 0) res.send(sectionList).status(304);
            await course.sections.forEach(async (s_id) => {
                await Section.findById(mongoose.Types.ObjectId(s_id)).then((sec) => {
                    sectionList.push(sec);
                    if (course.sections.length === sectionList.length) {
                        res.send(sectionList).status(304);
                    }
                })
            });
        } catch (err) {
            res.status(400).send("Error collecting sections for course");
        }
    } catch (err) {
        res.status(400).send("Error finding course's sections. Try again later");
    }
});

Router.get('/files/:id', async (req, res) => {
    try {
        const section_id = req.params.id;
        let section;
        await Section.findById(mongoose.Types.ObjectId(section_id)).then(s => section = s);
        let fileList = [];
        try {
            if (section.files.length === 0) res.send(fileList).status(304);
            await section.files.forEach(async (file) => {
                await File.findById(mongoose.Types.ObjectId(file._id)).then((f) => {
                    fileList.push(f);
                    if (section.files.length === fileList.length) {
                        res.send(fileList);
                    }
                })
            });
        } catch (err) {
            res.status(400).send("Error collecting files for folder.");
        }
    } catch (err) {
        res.status(400).send("Error finding folder's files. Try again later");
    }
});

Router.put('/addFile', async (req, res) => {
    try {
        const { file_id, section_id } = req.body;
        await Section.findByIdAndUpdate(mongoose.Types.ObjectId(section_id), { "$push": { "files": mongoose.Types.ObjectId(file_id) } }).then(async () =>
            await Section.findById(mongoose.Types.ObjectId(section_id)).then(f => {
                res.send(f.files).status(304);
            })
        );
    } catch (err) {
        res.status(400).send("Error adding file to folder. Try again later");
    }
});

Router.put('/removeFile', async (req, res) => {
    try {
        const { file_id, section_id } = req.body;
        await Section.findByIdAndUpdate(mongoose.Types.ObjectId(section_id), { "$pull": { "files": mongoose.Types.ObjectId(file_id) } }).then(async () =>
            await Section.findById(mongoose.Types.ObjectId(section_id)).then(f => {
                res.send(f.files).status(304);
            })
        );
    } catch (err) {
        res.status(400).send("Error adding file to folder. Try again later");
    }
});

module.exports = Router;