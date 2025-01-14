import type { RequestHandler } from "express";

import TileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const tiles = await TileRepository.readAll();
    res.json(tiles);
  } catch (err) {
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  const { coord_x, coord_y } = req.body;
  const tiles = await TileRepository.readByCoordinates(coord_x, coord_y);
  if (tiles.length) {
    next();
  } else {
    res.sendStatus(422);
  }
};

export default {
  browse,
  validate,
};
