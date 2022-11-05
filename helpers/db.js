import mongoose, { Schema, model, models } from "mongoose";
import crypto from "crypto";

const URI = `mongodb+srv://gaiisay:${process.env.MONGODB_PASSWORD}@cluster0.iptgkab.mongodb.net/?retryWrites=true&w=majority`;

const jokeSchema = new Schema({
  id: String,
  text: String,
  author: String,
  categories: [String],
});

const Joke = models.Joke || model("Joke", jokeSchema);

async function connectToDatabase() {
  await mongoose.connect(URI);
}

async function getAllJokes() {
  await connectToDatabase();

  const jokes = await Joke.find({}, { _id: false });
  return jokes;
}

async function getJokeById(id) {
  await connectToDatabase();

  const joke = Joke.findOne({ id }, { _id: false, __v: false });
  return joke;
}

async function updateJokeById(id, joke) {
  await connectToDatabase();
  await Joke.updateOne({ id }, joke);
  const updatedJoke = await getJokeById(id);
  return updatedJoke;
}

async function deleteJokeById(id) {
  connectToDatabase();

  const joke = getJokeById(id);
  await Joke.deleteOne({ id });

  return joke;
}

async function createJoke(joke) {
  await connectToDatabase();

  const createdJoke = await Joke.create({
    ...joke,
    id: crypto.randomUUID(),
  });

  return {
    ...createdJoke.toObject(),
    _id: undefined,
    __v: undefined,
  };
}

export { getAllJokes, createJoke, getJokeById, updateJokeById, deleteJokeById };
