import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from "mongoose";
import { MongoClient } from "mongodb";
import {login, createUser, createAnimal, createTrainingLog, getUsers, getAnimals, getTraining} from "./util.js";

dotenv.config();
const app = express();
const APP_PORT = 3000;
app.use(cors({ origin: true }));
app.use(express.json());

// Connect to DB

async function connect() {
    try {
      await mongoose.connect(process.env.DATABASE_URI);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error(error);
    }
}

connect();

app.get('/', (req, res) => {
    res.json({"Hello": "World",
            "Version": 2})
})

app.get('/api/health', (req, res) => {
    res.json({"healthy": true});
})

app.post('/api/user', createUser);
app.post('/api/animal', createAnimal);
app.post('/api/training', createTrainingLog);

app.get('/api/admin/users', getUsers);
app.get('/api/admin/animals', getAnimals);
app.get('/api/admin/training', getTraining);

app.post('/api/user/login', login);

app.listen(APP_PORT, () => {
    console.log(`api listening at http://localhost:${APP_PORT}`)
})