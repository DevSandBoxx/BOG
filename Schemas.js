import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true}, // user's first name
    lastName: {type: String, required: true}, // user's last name
    email: {type: String, required: true}, // user's email
    password: {type: String, required: true}, // user's password used only in level 3 and beyond
    profilePicture: {type: String, required: true}, // pointer to user's profile picture in cloud storage --> used in Expert level
})

const User = mongoose.model("User", userSchema);


const animalSchema = new mongoose.Schema({
    name: {type: String, required: true}, // animal's name
    hoursTrained: {type: Number, required: true}, // total number of hours the animal has been trained for
    owner: {type: mongoose.Types.ObjectId, required: true}, // id of the animal's owner
    dateOfBirth: {type: Date, required: true}, // animal's date of birth
    profilePicture: {type: String, required: true}, // pointer to animal's profile picture in cloud storage --> used in Expert level
})

const Animal = mongoose.model("Animal", animalSchema);

const trainingLogSchema = new mongoose.Schema({
    date: {type: Date, required: true}, // date of training log
    description: {type: String, required: true}, // description of training log
    hours: {type: Number, required: true}, // number of hours the training log records
    animal: {type: mongoose.Types.ObjectId, required: true}, // animal this training log corresponds to
    user: {type: mongoose.Types.ObjectId, required: true}, // user this training log corresponds to
    trainingLogVideo: {type: String, required: true}, // pointer to training log video in cloud storage --> used in Expert level
})

const TrainingLog = mongoose.model("TrainingLog", trainingLogSchema);


export {User, Animal, TrainingLog};