import { useState } from "react";
import Select, { SingleValue } from "react-select";
import {
  useGetAllCategeoriesQuery,
  useGetAllTagsQuery,
  Tag,
  Category,
} from "../api/apiSlice";
import { useAppSelector } from "../../app/hooks";

export interface ReactSelectOption {
  value: string;
  label: string;
}

interface FormData {
  product_name: string;
  price: number;
  user_id: string | null;
  description: string;
  category: string;
}

const CreateItem = () => {
  const authStatus = useAppSelector((state) => state.auth);
  const { data: categories } = useGetAllCategeoriesQuery();
  const { data: tags } = useGetAllTagsQuery();
  const [formData, setFormData] = useState<FormData>({
    product_name: "",
    price: 0,
    user_id: authStatus.currentUser?.user_id || null,
    description: "",
    category: "",
  });
  console.log(formData);

  const categoryOptions = categories?.data.map((category: Category) => {
    return {
      value: category.category_id,
      label: category.category_name,
    };
  });

  const tagsOptions = tags?.data.map((tag: Tag) => {
    return {
      value: tag.tag_id,
      label: tag.tag_name,
    };
  });

  return (
    <div className="max-w-lg mx-auto mt-4 p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Create Item</h1>
      <form className="space-y-6">
        <div>
          <label
            htmlFor="product_name"
            className="block text-lg font-medium mb-2"
          >
            Product Name
          </label>
          <input
            type="text"
            id="product_name"
            name="product_name"
            value={formData.product_name}
            // on focus it will select all the text
            onFocus={(e) => e.target.select()}
            onChange={(e) =>
              setFormData({ ...formData, product_name: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-lg font-medium mb-2">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: Number(e.target.value) })
            }
            min={0}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-lg font-medium mb-2"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={
              (e) => setFormData({ ...formData, description: e.target.value })
              // on focus it will select all the text
            }
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <div>
          <label htmlFor="category" className="block text-lg font-medium mb-2">
            Category
          </label>
          <Select
            options={categoryOptions}
            onChange={(newValue: SingleValue<ReactSelectOption>) => {
              setFormData({
                ...formData,
                category: newValue?.value || "",
              });
            }}
            isSearchable
            isClearable
            placeholder="Select Category"
          />
        </div>
        <div>
          <label htmlFor="tags" className="block text-lg font-medium mb-2">
            Tags
          </label>
          <Select
            options={tagsOptions}
            isMulti
            isSearchable
            isClearable
            placeholder="Select Tags"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateItem;
