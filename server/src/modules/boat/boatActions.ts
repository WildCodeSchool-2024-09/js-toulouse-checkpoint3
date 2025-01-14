import type { RequestHandler } from "express";
import boatRepository from "./boatRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const boats = await boatRepository.readAll(
      req.query.name ? { name: req.query.name as string } : null,
    );

    res.json(boats);
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    await boatRepository.update({
      id: Number.parseInt(req.params.id, 10),
      coord_x: req.body.coord_x,
      coord_y: req.body.coord_y,
    });

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  edit,
};
