import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './db/index.js';
import dotenv from 'dotenv';

const app = express();
app.use(cors());
app.use(bodyParser.json());

dotenv.config({
  path: './env',
});

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
