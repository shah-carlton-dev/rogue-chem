const path = require('path');
const express = require('express');
const multer = require('multer');
const File = require('../model/file');
const Router = express.Router();
const fsp = require('fs').promises;
const fs = require('fs');
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './files');
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    }
  }),
  limits: {
    fileSize: 62914560 // max file size 60MB = 62914560 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
      return cb(
        new Error(
          'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
        )
      );
    }
    cb(undefined, true); // continue with upload
  }
});

Router.post(
  '/upload',
  upload.single('file'),
  async (req, res) => {
    try {
      const { title, description } = req.body;
      const { path, mimetype } = req.file;
      const file = new File({
        title,
        description,
        file_path: path,
        file_mimetype: mimetype
      });
      await file.save();
      res.send('file uploaded successfully.');
    } catch (error) {
      res.status(400).send('Error while uploading file. Try again later.');
      console.log("error uploading file");
      console.log(error);
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);

Router.get('/getAllFiles', async (req, res) => {
  try {
    const files = await File.find({});
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send('Error while getting list of files. Try again later.');
  }
});

Router.get('/download/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    res.set({
      'Content-Type': file.file_mimetype
    });
    res.sendFile(path.join(__dirname, '..', file.file_path));
  } catch (error) {
    res.status(400).send('Error while downloading file. Try again later.');
  }
});

Router.delete('/deleteOneFile/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    await fs.unlink(path.join(__dirname, '..', file.file_path), (err) => {
      console.error(err);
      return;
    });
    await File.findByIdAndDelete(req.params.id);
  } catch (error) {
    res.status(400).send('Error while dropping files collection. Try again later.');
  }
});

Router.delete('/deleteAllFiles', async (req, res) => {
  try {
    await File.collection.drop();
    const file_path = path.join(__dirname, '../files');
    fsp.rmdir(file_path, { recursive: true })
      .then(() => {
        fs.mkdir(file_path, function(err) {
          if (err) {
            console.log(err)
          } else {
            console.log("New directory successfully created.")
          }
        })
      });
  } catch (error) {
    res.status(400).send('Error while dropping files collection. Try again later.');
  }
});

module.exports = Router;