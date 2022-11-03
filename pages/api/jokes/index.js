// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import jokes from "../../../db.json";

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(jokes);
  } else {
    res.status(405).setHeader("Allow", ["GET"]).send();
  }
}
