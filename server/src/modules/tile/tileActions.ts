import type { ErrorRequestHandler, RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all tiles from the database
    const boats = await tileRepository.readAll();

    // Respond with the tiles in JSON format
    res.json(boats);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  try {
    const coord_x = req.body.coord_x;
    const coord_y = req.body.coord_y;

    // Fetch all tiles from the database
    const boats = await tileRepository.readByCoordinates(
      Number.parseFloat(coord_x as string),
      Number.parseFloat(coord_y as string),
    );

    if (boats.length === 0) {
      // Respond with HTTP 422 (Unprocessable Entity) and the error message
      res.sendStatus(422);
      return;
    }

    next();
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default {
  browse,
  validate,
};
