import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  const tiles = await tileRepository.readAll();
  res.json(tiles);
};

const validate: RequestHandler = async (req, res, next) => {
  const { coord_x, coord_y } = req.body;
  if (!coord_x || !coord_y) {
    res.sendStatus(422);
  }
  const tile = await tileRepository.readByCoordinates(coord_x, coord_y);
  if (tile) {
    next();
  }
};

export default {
  browse,
  validate,
};
