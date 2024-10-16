import pool from "../../config/config";

export interface ItemResponse {
  rowCount: number;
  message: string;
  data: any;
}

export interface ItemRequest {
  product_name: string;
  user_id: string;
  description: string;
  price: number;
  category: string;
}

class Item {
  // create item table
  static createTable = async () => {
    const query = `CREATE TABLE IF NOT EXISTS items (
            item_id uuid DEFAULT gen_random_uuid(),
            product_name VARCHAR(255),
            user_id uuid,
            description TEXT,
            price FLOAT,
            image_url VARCHAR(500)[] DEFAULT ARRAY['https://static.wikia.nocookie.net/onepiece/images/6/6d/Monkey_D._Luffy_Anime_Post_Timeskip_Infobox.png/revision/latest?cb=20240306200817', 'https://static.wikia.nocookie.net/onepiece/images/e/e1/Monkey_D._Garp_Anime_Infobox.png/revision/latest?cb=20230207160645'],
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
  // alter item table
  // reference user_id to users table, default image_urls to https://static.wikia.nocookie.net/onepiece/images/6/6d/Monkey_D._Luffy_Anime_Post_Timeskip_Infobox.png/revision/latest?cb=20240306200817 and https://static.wikia.nocookie.net/onepiece/images/e/e1/Monkey_D._Garp_Anime_Infobox.png/revision/latest?cb=20230207160645

  static alterTable = async () => {
    const query = `
    ALTER TABLE items
    DROP COLUMN name;`;
    try {
      console.log("altering item table");
      await pool.query(query);
      console.log("item table altered");
    } catch (error) {
      console.error(error);
    }
  };

  // create item
  static create = async (req: ItemRequest): Promise<ItemResponse> => {
    console.log(req.category);
    const query = `INSERT INTO items (product_name, user_id, description, price,category) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    try {
      const result = await pool.query(query, [
        req.product_name,
        req.user_id,
        req.description,
        req.price,
        req.category,
      ]);
      return {
        rowCount: result.rowCount || 0,
        message:
          result.rowCount === 0
            ? "Item not created"
            : "Item created successfully",
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

  // get all items
  static getAllItems = async (): Promise<ItemResponse> => {
    const query = `SELECT item_id, product_name,price, image_url[1] FROM items`;
    try {
      const result = await pool.query(query);
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
