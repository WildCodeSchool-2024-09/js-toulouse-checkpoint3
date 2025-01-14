import type { RequestHandler } from "express";

import boatRepository from "./boatRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all boats from the database
    type BoatName = { name?: string };

    const boats = await boatRepository.readAll(req.query as { name: string });

    // Respond with the boats in JSON format
    res.json(boats);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const id = Number.parseInt(req.params.id);
    const { coord_x, coord_y } = req.body;
    const result = await boatRepository.update({ id, coord_x, coord_y });
    res.status(204).json({ updated: result });
  } catch (error) {
    next(error);
  }
};

export default {
  browse,
  edit,
};
