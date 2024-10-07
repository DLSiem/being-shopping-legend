import pool from "../../config/config";
import { ItemResponse } from "./item";

class Tags {
  // create tags table
  static createTable = async () => {
    const query = `CREATE TABLE IF NOT EXISTS tags(
            tag_id uuid PRIMARY KEY DEFAULT gen_random_uuid() ,
            tag_name VARCHAR(255) UNIQUE
        );`;
    try {
      console.log("creating tags table");
      await pool.query(query);
      console.log("tags table created");
    } catch (error) {
      console.error(error);
    }
  };

  // get tag by id
  static getTagById = async (tag_id: string): Promise<ItemResponse> => {
    const query = `SELECT * FROM tags WHERE tag_id = $1`;
    try {
      const result = await pool.query(query, [tag_id]);
      return {
        rowCount: result.rowCount || 0,
        message: result.rowCount === 0 ? "Tag not found" : "Tag found",
        data: result.rows,
      };
    } catch (error) {
      return {
        rowCount: 0,
        message: "An error occurred",
        data: [],
      };
    }
  };

  // create tag
  static create = async (tag_name: string[]): Promise<ItemResponse> => {
    let values = "";
    for (let i = 1; i <= tag_name.length; i++) {
      values += `($${i}),`;
    }
    values = values.slice(0, -1);
    console.log("Tagsss---", tag_name);
    console.log(values);
    const query = `INSERT INTO tags (tag_name) VALUES ${values} RETURNING *`;
    console.log(query);
    try {
      const result = await pool.query(query, tag_name);
      console.log(result);

      return {
        rowCount: result.rowCount || 0,
        message:
          result.rowCount === 0
            ? "Tag not created"
            : "Tag created successfully",
        data: result.rows,
      };
    } catch (error) {
      console.log(error);
      return {
        rowCount: 0,
        message:
          (error as any).code === "23505"
            ? "Tag already exists"
            : "An error occurred",
        data: [],
      };
    }
  };

  // get all tags
  static getAllTags = async (): Promise<ItemResponse> => {
    const query = `SELECT * FROM tags`;
    try {
      const result = await pool.query(query);
      return {
        rowCount: result.rowCount || 0,
        message: result.rowCount === 0 ? "No tag found" : "Tag found",
        data: result.rows,
      };
    } catch (error) {
      return {
        rowCount: 0,
        message: "An error occurred",
        data: [],
      };
    }
  };

  // delete tag by id
  static deleteTag = async (tag_id: string): Promise<ItemResponse> => {
    const query = `DELETE FROM tags WHERE tag_id = $1 RETURNING *`;
    try {
      const result = await pool.query(query, [tag_id]);
      return {
        rowCount: result.rowCount || 0,
        message:
          result.rowCount === 0 ? "Tag not found" : "Tag deleted successfully",
        data: result.rows,
      };
    } catch (error) {
      return {
        rowCount: 0,
        message: "An error occurred",
        data: [],
      };
    }
  };
}

export default Tags;
