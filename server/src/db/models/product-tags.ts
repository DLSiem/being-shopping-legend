import pool from "../../config/config";

class ProductTags {
  // create tags table
  static createTable = async () => {
    const query = `CREATE TABLE IF NOT EXISTS product_tags (
        item_id uuid,
        tag_id uuid REFERENCES tags(tag_id),
        PRIMARY KEY (item_id, tag_id)
            );`;
    try {
      console.log("creating product_tags table");
      await pool.query(query);
      console.log("product_tags table created");
    } catch (error) {
      console.error(error);
    }
  };

  // alter product_tags table
  // reference item_id to items table
  static alterTable = async () => {
    const query = `ALTER TABLE product_tags
    ADD FOREIGN KEY (item_id) REFERENCES items(item_id) ON DELETE CASCADE;`;
    try {
      console.log("altering product_tags table");
      await pool.query(query);
      console.log("product_tags table altered");
    } catch (error) {
      console.error(error);
    }
  };
}

export default ProductTags;
