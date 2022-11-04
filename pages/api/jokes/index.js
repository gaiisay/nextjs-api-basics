// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { createJoke, getAllJokes } from "../../../helpers/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const jokes = await getAllJokes();
    res.status(200).json(jokes);
  } else if (req.method === "POST") {
    const joke = JSON.parse(req.body);

    const createdJoke = await createJoke(joke);
    res.status(201).json(createdJoke);
  } else {
    res.status(405).setHeader("Allow", ["GET", "POST"]).send();
  }
}
