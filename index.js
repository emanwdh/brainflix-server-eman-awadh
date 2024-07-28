import express from 'express';
import cors from "cors"; 
import 'dotenv/config';
const {PORT, BACKEND_URL} = process.env;
import videos from "./routes/videos.js";
import videoData from './data/videos.json' with {type: "json"};



const app = express();
app.use(cors());
app.use(express.json());
app.use('/images', express.static('public/images'));



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

app.use("/videos", videos);



