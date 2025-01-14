import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  // your code here
  try {
    const tiles = await tileRepository.readAll();
    res.status(200).json(tiles);
  } catch (error) {
    next(error);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  // your code here
  const { coord_x, coord_y } = req.body;

  const tiles = await tileRepository.readByCoordinates(coord_x, coord_y);

  if (!tiles.length) {
    res.sendStatus(422);
  } else {
    next();
  }
};

export default {
  browse,
  validate,
};
