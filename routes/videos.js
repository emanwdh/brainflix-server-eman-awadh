import express from 'express';
import videoData from '../data/videos.json' with {type: "json"};
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(express.json());
app.use('/images', express.static('public/images'));

const router = express.Router();

router.get("/", (req, res) => {
    const videoArray = videoData.map(video => ({id: video.id, title: video.title, channel: video.channel, image: video.image}));
    res.send(videoArray);
});

router.get("/:id", (req, res) => {
    const requestedVideo = videoData.filter(video => video.id === req.params.id);
    res.send(requestedVideo);
});

router.post("/post", (req, res) => {
    const { title, description, author, likes, views, channel, timestamp } = req.body;
    const newVideo = {
        id: uuidv4(), 
        title,
        description,
        image: "http://localhost:5050/images/default.png",
        channel, 
        likes,
        views,
        timestamp
    };
    videoData.push(newVideo); 
    res.send(videoData);
});
export default router;