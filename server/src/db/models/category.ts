import pool from "../../config/config";
import { ItemResponse } from "./item";

class ItemCategory {
  // create item table
  static createTable = async () => {
    const query = `CREATE TABLE IF NOT EXISTS item_categories (
                category_id uuid DEFAULT gen_random_uuid(),
                category_name VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (category_id)
            );`;
    try {
      console.log("creating item category table");
      await pool.query(query);
      console.log("item category table created");
    } catch (error) {
      console.error(error);
    }
  };
  // get all categories
  static getAllCategories = async (): Promise<ItemResponse> => {
    const query = `SELECT * FROM item_categories`;
    try {
      const result = await pool.query(query);
      return {
        rowCount: result.rowCount || 0,
        message: result.rowCount === 0 ? "No category found" : "Category found",
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

  // create category
  static create = async (category_name: string): Promise<ItemResponse> => {
    const query = `INSERT INTO item_categories (category_name) VALUES ($1) RETURNING *`;
    try {
      const result = await pool.query(query, [category_name]);

      return {
        rowCount: result.rowCount || 0,
        message:
          result.rowCount === 0
            ? "Category not created"
            : "Category created successfully",
        data: result.rows,
      };
    } catch (error) {
      return {
        rowCount: 0,
        message:
          (error as any).code === "23505"
            ? "Category already exists"
            : "An error occurred",
        data: [],
      };
    }
  };

  // get category by id
  static getCategoryById = async (
    category_id: string
  ): Promise<ItemResponse> => {
    const query = `SELECT * FROM item_categories WHERE category_id = $1`;
    try {
      const result = await pool.query(query, [category_id]);
      return {
        rowCount: result.rowCount || 0,
        message: result.rowCount === 0 ? "No category found" : "Category found",
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

  // delete category by id
  static deleteCategory = async (
    category_id: string
  ): Promise<ItemResponse> => {
    const query = `DELETE FROM item_categories WHERE category_id = $1 RETURNING *`;
    try {
      const result = await pool.query(query, [category_id]);
      return {
        rowCount: result.rowCount || 0,
        message:
          result.rowCount === 0
            ? "Category not found"
            : "Category deleted successfully",
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

export default ItemCategory;
