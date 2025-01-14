import type { RequestHandler } from "express";

import boatRepository from "./boatRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all boats from the database
    const boats = await boatRepository.readAll();

    // Respond with the boats in JSON format
    res.json(boats);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { coord_x, coord_y } = req.body;
    const boatToUpdate = await boatRepository.update({
      coord_x,
      coord_y,
      id: Number.parseInt(id),
    });
    res.status(204).json(boatToUpdate);
  } catch (error) {
    res.status(400);
  }
};

export default {
  browse,
  edit,
};
