import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import fs from "fs";
import cors from 'cors';

const FILE_PATH = './data/videos.json';

const readData = () => {
    const videoData = fs.readFileSync(FILE_PATH);
    const parsedData = JSON.parse(videoData);
    return parsedData;
}

const app = express();
app.use(express.json());
app.use(cors());
app.use('/images', express.static('public/images'));

const router = express.Router();

router.get("/", (req, res) => {
    const videoData = readData();
    const videoArray = videoData.map(video => ({id: video.id, title: video.title, channel: video.channel, image: video.image}));
    res.status(200).json(videoArray);
});

router.get("/:id", (req, res) => {
    const videoData = readData();
    const requestedVideo = videoData.filter(video => video.id === req.params.id);
    res.status(200).json(requestedVideo[0]);
});

router.post("/post", (req, res) => {
    const { title, description, likes, views, channel, timestamp } = req.body;
    const newVideo = {
        id: uuidv4(), 
        title,
        description,
        image: 'http://localhost:5050/images/default.png',
        channel, 
        likes,
        views,
        timestamp
    };
    const videoData = readData();
    videoData.push(newVideo); 
    fs.writeFileSync(FILE_PATH, JSON.stringify(videoData));

    res.status(201);

});
export default router;