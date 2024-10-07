import pool from "../../config/config";

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
}

export default ItemCategory;
