import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const tiles = await tileRepository.readAll();
    res.json(tiles);
  } catch (err) {
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  const tile = await tileRepository.readByCoordinates(
    req.body.coord_x,
    req.body.coord_y,
  );

  if (tile.length) {
    next();
  } else {
    res.sendStatus(422);
  }
};

export default {
  browse,
  validate,
};
