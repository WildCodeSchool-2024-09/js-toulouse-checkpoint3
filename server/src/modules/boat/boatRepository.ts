import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Boat = {
  id: number;
  name: string;
  coord_x: number;
  coord_y: number;
  type: string;
  has_treasure: boolean;
};

class BoatRepository {
  async readAll(where?: { name: string } | null | undefined) {
    const [rows] =
      where != null
        ? await databaseClient.query<Rows>(
            `select boat.id, 
          boat.coord_x, boat.coord_y, boat.name,
          tile.type, tile.has_treasure
          from boat
          inner join tile on boat.coord_x = tile.coord_x and boat.coord_y = tile.coord_y
          where boat.name = ?`,
            [where.name],
          )
        : await databaseClient.query<Rows>(
            `select boat.id, 
          boat.coord_x, boat.coord_y, boat.name,
          tile.type, tile.has_treasure
          from boat
          inner join tile on boat.coord_x = tile.coord_x and boat.coord_y = tile.coord_y`,
          );

    // Return the array of tiles
    return rows as Boat[];
  }

  async update(boatToUpdate: Partial<Boat>) {
    // Execute the SQL UPDATE query to update an existing category in the "category" table
    const [result] = await databaseClient.query<Result>(
      "update boat set coord_x = ?, coord_y = ? where id = ?",
      [boatToUpdate.coord_x, boatToUpdate.coord_y, boatToUpdate.id],
    );

    // Return how many rows were affected
    return result.affectedRows;
  }
}

export default new BoatRepository();
