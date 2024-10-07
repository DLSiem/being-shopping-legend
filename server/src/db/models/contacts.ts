import pool from "../../config/config";

class Contacts {
  // create contact table is not exist
  static createTable = async () => {
    const query = `CREATE TABLE IF NOT EXISTS contacts (
            contact_id uuid DEFAULT gen_random_uuid() ,
            user_id uuid,
            phone VARCHAR(15),
            address VARCHAR(255),
            city VARCHAR(255) ,
            state VARCHAR(255) ,
            zip VARCHAR(255),
            country_code VARCHAR(2),
            PRIMARY KEY (contact_id),
            CONSTRAINT fk_user
            FOREIGN KEY (user_id) 
            REFERENCES users(user_id) 
            ON DELETE CASCADE
          );`;
    try {
      console.log("creating contact table");
      await pool.query(query);
      console.log("contact table created");
    } catch (error) {
      console.error(error);
    }
  };
}

export default Contacts;
