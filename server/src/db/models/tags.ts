import pool from "../../config/config";

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
}

export default Tags;
