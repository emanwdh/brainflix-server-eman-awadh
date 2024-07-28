import express from 'express';
import videoData from '../data/videos.json' with {type: "json"};


const router = express.Router();

router.get("/", (req, res) => {
    const videoArray = videoData.map(video => ({id: video.id, title: video.title, channel: video.channel, image: video.image}));
    res.send(videoArray);
});

export default router;