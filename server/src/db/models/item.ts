import pool from "../../config/config";

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
}

export default Item;
