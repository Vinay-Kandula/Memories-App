import cors from "cors";
import mongoose from "mongoose"
import express from "express";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';


const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
const corsOptions ={
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use('/posts', postRoutes);

app.get('/', (req,res) => {
    res.send('Hello to Memories API');
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on port:${PORT}`)))
    .catch((error) => console.log(error.message));



