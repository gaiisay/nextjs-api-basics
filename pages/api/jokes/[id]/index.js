import { deleteJokeById, getJokeById, updateJokeById } from "../../../../helpers/db";

async function handler(req, res) {
  const { id } = req.query;
  if (req.method === "GET") {
    const joke = await getJokeById(id);
    res.status(200).json(joke);
  } else if (req.method === "PATCH") {
    const joke = JSON.parse(req.body);
    const updatedJoke = await updateJokeById(id, joke);
    res.status(200).json(updatedJoke);
  } else if (req.method === "DELETE") {
    const joke = await deleteJokeById(id);
    res.status(200).json(joke);
  } else {
    res.status(405).setHeader("Allow", ["GET", "PATCH", "DELETE"]).send();
  }
}

export default handler;
