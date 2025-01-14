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
  try {
    const x = Number.parseInt(req.body.coord_x, 10);
    const y = Number.parseInt(req.body.coord_y, 10);

    const tiles = await tileRepository.readByCoordinates(x, y);

    if (!tiles || tiles.length === 0) {
      res.sendStatus(422);
      return;
    }

    next();
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  // your code here
};

const edit: RequestHandler = async (req, res, next) => {
  // your code here
};

const add: RequestHandler = async (req, res, next) => {
  // your code here
};

const destroy: RequestHandler = async (req, res, next) => {
  // your code here
};

export default {
  browse,
  read,
  edit,
  add,
  validate,
  destroy,
};
