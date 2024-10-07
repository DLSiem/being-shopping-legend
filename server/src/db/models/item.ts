import pool from "../../config/config";

export interface ItemResponse {
  rowCount: number;
  message: string;
  data: any;
}

class Item {
  // create item table
  static createTable = async () => {
    const query = `CREATE TABLE IF NOT EXISTS items (
            item_id uuid DEFAULT gen_random_uuid(),
            product_name VARCHAR(255),
            user_id uuid,
            name VARCHAR(255),
            description TEXT,
            price FLOAT,
            image_url VARCHAR(500)[],
            category uuid,
            PRIMARY KEY (item_id),
            FOREIGN KEY (user_id)
            REFERENCES users(user_id)
            ON DELETE SET NULL,
            FOREIGN KEY (category) REFERENCES item_categories(category_id) ON DELETE SET NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );`;
    try {
      console.log("creating item table");
      await pool.query(query);
      console.log("item table created");
    } catch (error) {
      console.error(error);
    }
  };

  // create item
  static create = async (
    product_name: string,
    user_id: string,
    name: string,
    description: string,
    price: number,
    image_url: string[],
    category: string
  ) => {
    const query = `INSERT INTO items (product_name, user_id, name, description, price, image_url, category) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
    try {
      const result = await pool.query(query, [
        product_name,
        user_id,
        name,
        description,
        price,
        image_url,
        category,
      ]);
      return result.rows[0];
    } catch (error) {
      console.error(error);
    }
  };

  // get all items
  static getAllItems = async (): Promise<ItemResponse> => {
    const query = `SELECT * FROM items`;
    try {
      const result = await pool.query(query);
      console.log(result);
      return {
        rowCount: result.rowCount || 0,
        message: result.rowCount === 0 ? "No items found" : "Items found",
        data: result.rows,
      };
    } catch (error) {
      console.error(error);
      return {
        rowCount: 0,
        message: "Server Error",
        data: null,
      };
    }
  };
}

export default Item;
