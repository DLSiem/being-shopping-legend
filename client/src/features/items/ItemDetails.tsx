import { useGetItemQuery } from "../api/apiSlice";
import { useParams } from "react-router-dom";

const ItemDetails = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const { data, isLoading, isError, isSuccess } = useGetItemQuery(itemId || "");

  let content = null;

  if (isLoading) {
    content = (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-semibold text-blue-600 animate-pulse">
          Loading...
        </div>
      </div>
    );
  } else if (isError) {
    content = (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-semibold text-red-600">
          Error: Something went wrong
        </div>
      </div>
    );
  } else if (isSuccess) {
    const product = data.data[0];
    content = (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-4 shadow-lg rounded-lg">
          <img
            src={product.image_url[0]}
            alt={product.product_name}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">{product.product_name}</h3>
          <p className="text-gray-700">${product.price}</p>
          <p className="text-gray-700">{product.description}</p>
        </div>
      </div>
    );
  }

  return <div>{content}</div>;
};

export default ItemDetails;
