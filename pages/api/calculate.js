import calculate from "../../lib/calculate";

const handler = (req, res) => {
  const tournament = JSON.parse(req.body);
  if (!tournament || !tournament.levels) {
    res.status(400).send("Missing levels");
    return;
  }

  const result = calculate(tournament);
  res.status(200).json(result);
};

export default handler;
