// Purpose: To define the interfaces for the data models.

// userRole for roles of the user.
enum UserRole {
  admin,
  customer,
}

// CartItem for the items in the cart.
interface CartItem {
  productId: number;
  quantity: number;
}

// Order for the orders.
interface Order {
  orderId: number;
  userId: number;
  orderItems: CartItem[];
  orderTotal: number;
  orderDate: Date;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingZip: string;
  shippingCountry: string;
  orderStatus: string;
}

// user contacts and address
interface UserContact {
  userId: number;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

// User activity
interface UserActivity {
  user_activity_id: number;
  userId: number;
  activity: string;
  activityTime: Date;
}

// User for the user details.
interface User {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  image_url: string;
  password: string;
  role: UserRole;
  timeStamps: Date;
  itemsInCart: CartItem[];
  itemsInWishlist: number[];
  orders: Order[];
  purchaseHistory: Order[];
}

// productCategory for categories of clothing.
enum ProductCategory {
  men,
  women,
  kids,
  mix,
}

interface Product {
  productId: number;
  productName: string;
  price: number;
  description: string;
  imageUrls: string[];
  colors: string[];
  sizes: string[];
  productCategory: ProductCategory;
  stock: number;
  tags: string[];
  discount: number | 0;
  timeStamps: Date;
}

interface ProductDetail {
  productDetailsId: number;
  productId: number;
  nameAndAddressOfManufacturer: string;
  manufacturingDate: Date | null;
  expiryDate: Date | null;
  ocassion: string;
}
