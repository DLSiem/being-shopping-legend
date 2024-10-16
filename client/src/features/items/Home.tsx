import { useGetAllItemsQuery, ItemForHompage } from "../api/apiSlice";
import { Link } from "react-router-dom";

const Home = () => {
  const { data, isLoading, isSuccess, isError } = useGetAllItemsQuery();

  let content = null;
  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (isError) {
    content = <div>Error: Error </div>;
  } else if (isSuccess) {
    content = data.data.map((item: ItemForHompage) => {
      return (
        <div
          key={item.item_id}
          className="bg-white p-4 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
        >
          <img
            src={item.image_url}
            alt={item.product_name}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <Link to={`/items/${item.item_id}`}>
            <h3 className="text-xl font-semibold mb-2">{item.product_name}</h3>
          </Link>
          <p className="text-gray-700">${item.price}</p>
        </div>
      );
    });
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-3">
      {content}
    </div>
  );
};

export default Home;

// sample item data

// interface item {
//   item_id: string;
//   product_name: string;
//   image_url: string[];
//   price: number;
// }

// const dummy_items: item[] = [
//   {
//     item_id: "1",
//     product_name: "Luffy",
//     image_url: [
//       "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQv4cipNj98Egc78J57f68Pq_WC9zHoPSKo-lXM6RWKyc51NkZl3O9eo2vPlAS6ALch1hGGEen176cNYYdETl4sDGeDTaNabh311w6hCag",
//     ],
//     price: 1000,
//   },
//   {
//     item_id: "2",
//     product_name: "Garp",
//     image_url: [
//       "https://beebom.com/wp-content/uploads/2023/07/Garp-entry.jpg?w=1250&quality=75",
//     ],
//     price: 2000,
//   },
//   {
//     item_id: "3",
//     product_name: "Ace",
//     image_url: [
//       "https://preview.redd.it/boyplag63nn71.jpg?auto=webp&s=79bb80d383c12dc79c461721934e79adb3eef492",
//     ],
//     price: 3000,
//   },
//   {
//     item_id: "4",
//     product_name: "Sabo",
//     image_url: [
//       "https://a.storyblok.com/f/178900/1920x1080/df2aaa51d0/one-piece-episode-1116-sabo.jpg/m/1200x0/filters:quality(95)format(webp)",
//     ],
//     price: 4000,
//   },
//   {
//     item_id: "5",
//     product_name: "Shanks",
//     image_url: [
//       "https://lh5.googleusercontent.com/zN_gwl5WqKbSjSVxJBMyxgkJjCQiORWEzA00emQcHQs5DFQSxM_GqYgH6DjUfWWSeiRTOCSlgNve4zqulzehAHvSm3HD9ydGXN4YQl5Q5oTf4AYfhvZtlME5Xtca52UaxcrdgNjHOlAl982r2-gOIFI",
//     ],
//     price: 5000,
//   },
// ];
