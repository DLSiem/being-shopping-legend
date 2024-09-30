import pool from "../../config/config";

class Item {
  // create item table
  static createTable = async () => {
    const query = `CREATE TABLE IF NOT EXISTS items (
            item_id uuid PRIMARY KEY gen_random_uuid() ,
            user_id uuid,
            name VARCHAR(255),
            description TEXT,
            price FLOAT,
            image_url VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT fk_user
            FOREIGN KEY (user_id) 
            REFERENCES users(user_id) 
            ON DELETE SET NULL
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
