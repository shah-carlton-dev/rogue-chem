const path = require('path');
const express = require('express');
const Router = express.Router();
const Course = require('../model/course.js');
const Section = require('../model/section.js');
const File = require('../model/file.js');
const Video = require('../model/video.js');
const Admin = require('../model/admin');
const Student = require('../model/student');
const Message = require('../model/message.js');
const mongoose = require('mongoose');

Router.post('/create', async (req, res) => {
    try {
        let { name, description } = req.body;
        const course = new Course({
            name,
            description,
            sections: [],
            files: [],
            published: false,
            meta: false
        });
        await course.save();
        await Course.findOne({ name: name })
            .then(async course => {
                await Course.findOne({ meta: true }).then(async metaDoc => {
                    metaDoc.courses.push(
                        {
                            name: course.name,
                            id: mongoose.Types.ObjectId(course._id),
                            users: []
                        }
                    );
                    await metaDoc.save();
                })
            })

        await Course.find().then(r => res.send(r));
        //res.send('Course created successfully.');
    } catch (error) {
        console.log(error);
        res.status(400).send('Error while creating course. Try again later.');
    }
});

Router.delete('/delete/:id', async (req, res) => { // deletes a course
    try {
        const course_id = req.params.id;
        let courses;

        // remove course from db
        await Course.findByIdAndDelete(mongoose.Types.ObjectId(course_id)).then(async r => {
            await Course.find().then(r2 => courses = r2);
        });

        // remove course from any student enrolled
        await Student.find({ courses: mongoose.Types.ObjectId(course_id) }).then(list => {
            list.forEach(async s => {
                await Student.findByIdAndUpdate(s._id, { "$pull": { "courses": mongoose.Types.ObjectId(course_id) } }, { useFindAndModify: false });
            })
        });

        // remove course from metaDoc
        await Course.findOneAndUpdate({ meta: true }, { $pull: { 'courses': { id: mongoose.Types.ObjectId(course_id) } } });

        return res.send(courses);
    } catch (error) {
        res.status(400).send('Error while creating course. Try again later.');
    }
});

Router.get('/', async (req, res) => {
    try {
        await Course.find({ meta: false }).then(courses => { return res.send(courses) });
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

Router.get('/section/:id', async (req, res) => {
    try {
        const section = await Section.findById(req.params.id);
        return res.send(section);
    } catch (errror) {
        return res.status(400).send('Error while getting section. Try again later');
    }
})

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

Router.get('/videos/:id', async (req, res) => {
    try {
        const section_id = req.params.id;
        let section;
        await Section.findById(mongoose.Types.ObjectId(section_id)).then(s => section = s);
        let videoList = [];
        try {
            if (section.videos.length === 0) res.send(videoList).status(304);
            await section.videos.forEach(async (video) => {
                await Video.findById(mongoose.Types.ObjectId(video._id)).then((v) => {
                    videoList.push(v);
                    if (section.videos.length === videoList.length) {
                        res.send(videoList);
                    }
                })
            })
        } catch (err) {
            res.status(400).send("Error collecting videos for folder.");
        }
    } catch (err) {
        res.status(400).send("Error finding folder's videos. Try again later")
    }
})

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

Router.put('/addVideo', async (req, res) => {
    try {
        const { video_id, section_id } = req.body;
        await Section.findByIdAndUpdate(mongoose.Types.ObjectId(section_id), { "$push": { "videos": mongoose.Types.ObjectId(video_id) } }).then(async () =>
            await Section.findById(mongoose.Types.ObjectId(section_id)).then(v => {
                res.send(v.videos).status(304);
            })
        )
    } catch (err) {
        res.status(400).send("Error adding video to folder. Try again later");
    }
})

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

Router.put('/removeVideo', async (req, res) => {
    try {
        const { video_id, section_id } = req.body;
        await Section.findByIdAndUpdate(mongoose.Types.ObjectId(section_id), { "$pull": { "videos": mongoose.Types.ObjectId(video_id) } }).then(async () =>
            await Section.findById(mongoose.Types.ObjectId(section_id)).then(v => {
                res.send(v.videos).status(304);
            })
        );
    } catch (err) {
        res.status(400).send("Error removing video from folder. Try again later")
    }
})

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
            else {
                await sections.forEach(async (s_id) => {
                    await Section.findById(mongoose.Types.ObjectId(s_id)).then((sec) => {
                        sectionList.push(sec);
                        if (sections.length === sectionList.length) {
                            return res.send(sectionList).status(304);
                        }
                    })
                });
            }
        } catch (err) {
            return res.status(400).send("Error collecting sections for course");
        }
    } catch (err) {
        return res.status(400).send("Error adding folder to course. Try again later");
    }
});

Router.post('/publish/:id', async (req, res) => {
    try {
        Course.findById(req.params.id).then(async c => {
            c.published = !c.published;
            await c.save();
        })
    } catch (err) {
        return res.send("Error publishing or unpublishing course").status(400);
    }
})

// want to return a fat object with all courses, sections, files, and video data
Router.post('/allData', async (req, res) => {
    try {
        const course_ids = req.body.ids.map(c => mongoose.Types.ObjectId(c));
        if (course_ids.length === 0) return res.status(304).send(0);
        let courses, sections, files, videos;
        await Course.find(
            { _id: { $in: course_ids }, meta: false }
        ).then(async c => {
            courses = c;
            const section_ids = courses.map(c => c.sections).flat().reduce((list, item) => {
                if (list.indexOf(item.toString()) < 0) list.push(item.toString());
                return list;
            }, []).map(s => mongoose.Types.ObjectId(s));
            return await Section.find(
                { _id: { $in: section_ids } }
            );
        }).then(async s => {
            sections = s;
            const file_ids = sections.map(s => s.files).flat().reduce((list, item) => {
                if (list.indexOf(item.toString()) < 0) list.push(item.toString());
                return list;
            }, []).map(s => mongoose.Types.ObjectId(s));
            const video_ids = sections.map(s => s.videos).flat().reduce((list, item) => {
                if (list.indexOf(item.toString()) < 0) list.push(item.toString());
                return list;
            }, []).map(s => mongoose.Types.ObjectId(s));
            await File.find(
                { _id: { $in: file_ids } }
            ).then(async f => {
                return await Video.find(
                    { _id: { $in: video_ids } }
                ).then(v => {
                    return { files: f, videos: v };
                })
            }).then(items => {
                files = items.files;
                videos = items.videos;
                sections.forEach(s => {
                    s.files.forEach((f_id, f_ix) => {
                        s.files[f_ix] = files.filter(file => file._id.toString() === f_id.toString())[0];
                    })
                    s.videos.forEach((v_id, v_ix) => {
                        s.videos[v_ix] = videos.filter(video => video._id.toString() === v_id.toString())[0];
                    })
                });
                courses.forEach(c => {
                    c.sections.forEach((s_id, s_ix) => {
                        c.sections[s_ix] = sections.filter(sec => sec._id.toString() === s_id.toString())[0];
                    })
                });
                return res.status(200).send(courses);
            });
        });
    } catch (err0) {
        console.log(err0)
        return res.status(400).send("Error collecting all course data for user");
    }
});

module.exports = Router;