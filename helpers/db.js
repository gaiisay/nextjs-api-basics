import mongoose, { Schema, model, models } from "mongoose";

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

export { getAllJokes };
