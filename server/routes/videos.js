const path = require('path');
const express = require('express');
const Video = require('../model/video');
const Router = express.Router();

Router.post(
    '/uploadVideo',
    async (req, res) => {
        try {
            let { url, title, description, keywords } = req.body;
            const video = new Video({
                url,
                title,
                description,
                keywords
            })
            await video.save();
            res.send('video saved successfully.');
        } catch (error) {
            res.status(400).send('Error while saving video. Try again later.');
            console.log("error saving video");
            console.log(error);
        }
    },
    (error, req, res, next) => {
        if (error) {
            res.status(500).send(error.message);
        }
    }
)

Router.get('/getAllVideos', async (req, res) => {
    try {
        const videos = await Video.find({});
        // res.send(videos);
        const sortedByCreationDate = videos.sort(
            (a, b) => b.createdAt - a.createdAt
        );
        res.send(sortedByCreationDate);
    } catch (error) {
        res.status(400).send('Error while getting list of videos. Try again later.')
    }
})

Router.delete('/deleteOneVideo/:id', async (req, res) => {
    console.log('deleting video...')
    try {
      await Video.findByIdAndDelete(req.params.id);
      res.status(200).send('Video deleted')
    } catch (error) {
      res.status(400).send('Error while deleting video. Try again later.');
    }
  });
  
  Router.delete('/deleteAllVideos', async (req, res) => {
    try {
      await Video.collection.drop();
      res.status(200).send('Videos deleted')
    } catch (error) {
      res.status(400).send('Error while dropping videos collection. Try again later.');
    }
  });

module.exports = Router;