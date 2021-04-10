const path = require('path');
const express = require('express');
const Router = express.Router();
const Course = require('../model/course.js');
const Section = require('../model/section.js');
const File = require('../model/file.js');
const Admin = require('../model/admin');
const Student = require('../model/student');
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
        await Course.find().then(r => res.send(r));
        //res.send('Course created successfully.');
    } catch (error) {
        res.status(400).send('Error while creating course. Try again later.');
    }
});

Router.delete('/delete/:id', async (req, res) => { // deletes a course
    try {
        const course_id = req.params.id;
        let courses;
        // remove course from db
        await Course.findByIdAndDelete(mongoose.Types.ObjectId(course_id)).then(async (r) => {
            await Course.find().then(r2 => courses = r2);
        });
        await Student.find({ courses: mongoose.Types.ObjectId(course_id) }).then(list => {
            list.forEach(async s => {
                await Student.findByIdAndUpdate(s._id, { "$pull": { "courses": mongoose.Types.ObjectId(course_id) } }, { useFindAndModify: false });
            })
        });
        return res.send(courses);
    } catch (error) {
        res.status(400).send('Error while creating course. Try again later.');
    }
});

Router.get('/', async (req, res) => {
    try {
        const courses = await Course.find();
        return res.send(courses);
    } catch (error) {
        return res.status(400).send('Error while getting list of courses. Try again later.');
    }
});

Router.get('/allSections', async (req, res) => {
    try {
        const sections = await Section.find();
        return res.send(sections);
    } catch (error) {
        return res.status(400).send('Error while getting list of all sections. Try again later.');
    }
});

Router.post('/createSection', async (req, res) => {
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
                return res.status(400).send("Error while updating course sections array.");
            }
            const sections = await Section.find();
            return res.send(sections);
        });
    } catch (err) {
        return res.status(400).send("Error adding a section. Try again later");
    }
});

Router.delete('/deleteSection/:id', async (req, res) => {
    try {
        let section_id = req.params.id;
        section_id = mongoose.Types.ObjectId(section_id);
        await Course.find().then(list => list.forEach(async (c) => {
            await Course.findByIdAndUpdate(c._id, { "$pull": { "sections": section_id } });
        }));
        await Section.findByIdAndDelete(section_id);
        await Course.find().then(r => res.send(r).status(200));
        res.status(304);
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
        res.status(400).send("Error removing file from folder. Try again later");
    }
});

Router.put('/removeSection', async (req, res) => {
    try {
        const { section_id, course_id } = req.body;
        let sections;
        await Course.findByIdAndUpdate(mongoose.Types.ObjectId(course_id), { "$pull": { "sections": mongoose.Types.ObjectId(section_id) } }).then(async () =>
            await Course.findById(mongoose.Types.ObjectId(course_id)).then(async c => {
                sections = c.sections;
                let sectionList = [];
                try {
                    if (sections.length === 0) res.send(sectionList).status(304);
                    await sections.forEach(async (s_id) => {
                        await Section.findById(mongoose.Types.ObjectId(s_id)).then((sec) => {
                            sectionList.push(sec);
                            if (sections.length === sectionList.length) {
                                return res.send(sectionList).status(304);
                            }
                        })
                    });
                } catch (err) {
                    res.status(400).send("Error collecting sections for course");
                }
            })
        );

    } catch (err) {
        res.status(400).send("Error removing folder from course. Try again later");
    }
});

Router.put('/addSection', async (req, res) => {
    try {
        const { section_id, course_id } = req.body;
        let sections;
        await Course.findByIdAndUpdate(mongoose.Types.ObjectId(course_id), { "$push": { "sections": mongoose.Types.ObjectId(section_id) } }).then(async () =>
            await Course.findById(mongoose.Types.ObjectId(course_id)).then(async c => {
                sections = c.sections;
                let sectionList = [];
                try {
                    if (sections.length === 0) res.send(sectionList).status(304);
                    await sections.forEach(async (s_id) => {
                        await Section.findById(mongoose.Types.ObjectId(s_id)).then((sec) => {
                            sectionList.push(sec);
                            if (sections.length === sectionList.length) {
                                return res.send(sectionList).status(304);
                            }
                        })
                    });
                } catch (err) {
                    res.status(400).send("Error collecting sections for course");
                }
            })
        );
        let sectionList = [];
        try {
            if (sections.length === 0) return res.send(sectionList).status(304);
            await sections.forEach(async (s_id) => {
                await Section.findById(mongoose.Types.ObjectId(s_id)).then((sec) => {
                    sectionList.push(sec);
                    if (sections.length === sectionList.length) {
                        return res.send(sectionList).status(304);
                    }
                })
            });
        } catch (err) {
            return res.status(400).send("Error collecting sections for course");
        }
    } catch (err) {
        return res.status(400).send("Error adding folder to course. Try again later");
    }
});

Router.post('/allData', async (req, res) => {
    try { // want to return a fat object with all courses, sections, and file info - files can be fetched in a separate call from the frontend
        let { ids } = req.body;
        if (ids.length === 0) return res.status(304).send(0);
        let courses = [];
        let sections = {};
        try {
            ids.forEach(async (i) => {
                await Course.findById(mongoose.Types.ObjectId(i)).then((course) => {
                    courses.push(course);
                }).then(async () => {
                    if (courses.length === ids.length) {
                        return res.send(courses).status(200);
                    }
                    // courses.forEach( course => {
                    //     let list = []; // this will have a list of the sections
                    //     course.sections.forEach(async section => {
                    //         await Section.findById(mongoose.Types.ObjectId(section)).then((sec => {
                    //             list.push(sec); // find each section and push to list
                    //             if (course.sections.length === list.length) {
                    //                 sections[course.name] = list;
                    //                 courses[0].sections = sections[course.name];
                    //                 return res.status(200).send(courses);
                    //             }
                    //         }))
                    //     })
                    // })
                })
            })
        } catch (err) {
            console.log("Something weird happened.");
            return res.status(304).send("Something weird happened. Refresh the page and try again");
        }
    } catch (err) {
        return res.status(400).send("Error collecting all course data for user");
    }
});

module.exports = Router;