import type { RequestHandler } from "express";
import database from "../../../database/client";

import boatRepository from "./boatRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const boats = await boatRepository.readAll();
    res.json(boats);
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, coord_x, coord_y } = req.body;
    const affectedRows = await boatRepository.update({
      id: Number.parseInt(id, 10),
      name,
      coord_x,
      coord_y,
    });

    if (affectedRows === 0) {
      res.status(204).json({ affectedRows });
    }

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  edit,
};
