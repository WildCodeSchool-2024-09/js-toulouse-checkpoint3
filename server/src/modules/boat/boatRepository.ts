import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Boat = {
  id: number;
  name: string;
  coord_x: number;
  coord_y: number;
};

class BoatRepository {
  async readAll(where?: { name: string } | null | undefined) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT 
          boat.id,
          boat.coord_x,
          boat.coord_y,
          boat.name,
          tile.type,
          tile.has_treasure
        FROM boat
        JOIN tile ON boat.coord_x = tile.coord_x AND boat.coord_y = tile.coord_y
        ${where?.name ? "WHERE boat.name = ?" : ""}`,
      where?.name ? [where.name] : [],
    );

    return rows as (Boat & {
      type: string;
      has_treasure: boolean;
    })[];
  }

  async update(boatToUpdate: Partial<Boat>) {
    const [result] = await databaseClient.query<Result>(
      "update boat set coord_x = ?, coord_y = ? where id = ?",
      [boatToUpdate.coord_x, boatToUpdate.coord_y, boatToUpdate.id],
    );
    return result.affectedRows;
  }
}

export default new BoatRepository();
