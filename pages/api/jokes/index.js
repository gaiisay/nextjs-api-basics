// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {getAllJokes} from "../../../helpers/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const jokes = await getAllJokes();
    res.status(200).json(jokes);
  } else {
    res.status(405).setHeader("Allow", ["GET"]).send();
  }
}
