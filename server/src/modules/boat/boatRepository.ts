import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Boat = {
  id: number;
  name: string;
  coord_x: number;
  coord_y: number;
  tile_type?: string;
  has_treasure?: boolean;
};

class BoatRepository {
  async readAll(where = {}) {
    const [rows] = await databaseClient.query<Rows>(
      `select boat.*, tile.type as type, tile.has_treasure 
       from boat 
       left join tile 
       on boat.coord_x = tile.coord_x and boat.coord_y = tile.coord_y 
       order by boat.coord_y, boat.coord_x`,
    );

    // Return the array of tiles
    return rows as Boat[];
  }

  async update(boatToUpdate: Partial<Boat>) {
    const { id, ...boatData } = boatToUpdate;
    const [result] = await databaseClient.query<Result>(
      "update boat set ? where id = ?",
      [boatData, id],
    );

    // your code here
    return result.affectedRows;
  }
}

export default new BoatRepository();
