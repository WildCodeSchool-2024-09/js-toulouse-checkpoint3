import type { RequestHandler } from "express";
import database from "../../../database/client";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const [tiles] = await database.query("SELECT * FROM tile");
    res.json(tiles);
  } catch (err) {
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  // your code here
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
