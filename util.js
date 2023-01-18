import { User, Animal, TrainingLog } from "./Schemas.js";
import bcrypt from "bcrypt";

async function login(req, res) {
    try {
        const user = await User.find().where({ email: req.body.email });
        console.log(user);

        if (user.length != 0) {
            bcrypt.compare(req.body.password, user[0].password, function(err, result) {
                console.log(result);
                if(result) {
                    res.status(200).send("Logged In");
                } else {
                    res.status(403).send("Email/Pass Invalid");
                }
            });
        } else {
            res.status(403).send("Email/Pass Invalid");
        }
        

    } catch (error) {
        res.status(500).send("Error");
        console.error(error);
    }
}

async function createUser(req, res) {
    try {
        console.log(req.body);
        const password = req.body.password;

        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, async function(err, hash) {
            
            const user = await User.create({...req.body, password: hash});
            await user.save();
        });

        res.status(200).send("Success");
    } catch (error) {
        if (error.name === "ValidationError") {
            res.status(400).send("The passed in data contains incorrect information");
        } else {
            res.status(500).send("Error");
        }
        console.error(error);
    }

}

async function createAnimal(req, res) {
    try {
        console.log(req.body);
        const animal = await Animal.create(req.body);
        await animal.save();

        res.status(200).send("Success");
    } catch (error) {
        if (error.name === "ValidationError") {
            res.status(400).send("The passed in data contains incorrect information");
        } else {
            res.status(500).send("Error");
        }
        console.error(error);
    }

}

async function createTrainingLog(req, res) {
    try {
        const training = await TrainingLog.create(req.body);
        const animal = await Animal.find().where({ owner: req.body.user, _id: req.body.animal });
        if(animal === []) {
            res.status(400).send("Animal not owned by user");
        } else {
            res.status(400).send("Success");
        }
        await training.save();

    } catch (error) {
        if (error.name === "ValidationError") {
            res.status(400).send("The passed in data contains incorrect information");
        } else {
            res.status(500).send("Error");
        }
        console.error(error);
    }
}


async function getUsers(req, res) {
    try {
        let nextUsers;

        if (!req.body.hasOwnProperty("last_id")) {
            nextUsers = await User.find().limit(2); //PUT IN README
        } else {
            nextUsers = await User.find({ '_id': { '$gt': req.body.last_id } }).limit(2);
        }

        nextUsers = nextUsers.map(user => {
            delete user.password;
            return user;
        });

        res.status(200).send(JSON.stringify(nextUsers));
    } catch (error) {
        res.status(500).send("Error");
        console.error(error);
    }
}

async function getAnimals(req, res) {
    try {
        let nextAnimal;

        if (!req.body.hasOwnProperty("last_id")) {
            nextAnimal = await Animal.find().limit(2); //PUT IN README
        } else {
            nextAnimal = await Animal.find({ '_id': { '$gt': req.body.last_id } }).limit(2);
        }

        res.status(200).send(JSON.stringify(nextAnimal));
    } catch (error) {
        res.status(500).send("Error");
        console.error(error);
    }
}

async function getTraining(req, res) {
    try {
        let nextLog;

        if (!req.body.hasOwnProperty("last_id")) {
            nextLog = await TrainingLog.find().limit(2); //PUT IN README
        } else {
            nextLog = await TrainingLog.find({ '_id': { '$gt': req.body.last_id } }).limit(2);
        }

        res.status(200).send(JSON.stringify(nextLog));
    } catch (error) {
        res.status(500).send("Error");
        console.error(error);
    }
}

export {login, createUser, createAnimal, createTrainingLog, getUsers, getAnimals, getTraining};

