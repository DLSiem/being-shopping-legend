import pool from "../../config/config";

class OrderDetails {
  // create OrderDetails table
  static createTable = async () => {
    const query = `CREATE TABLE IF NOT EXISTS order_details (
            order_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id uuid REFERENCES users(user_id) ON DELETE CASCADE,
            payment_id uuid,
            payment_status VARCHAR(50),
            order_items JSONB,
            order_total FLOAT,
            order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            shipping_address VARCHAR(255),
            shipping_city VARCHAR(255),
            shipping_state VARCHAR(255),
            shipping_zip VARCHAR(255),
            shipping_country VARCHAR(255),
            order_status VARCHAR(50),
            CONSTRAINT fk_user
            FOREIGN KEY (user_id)
            REFERENCES users(user_id)
            ON DELETE CASCADE
          );`;
    try {
      console.log("creating order_details table");
      await pool.query(query);
      console.log("order_details table created");
    } catch (error) {
      console.error(error);
    }
  };
}

export default OrderDetails;
