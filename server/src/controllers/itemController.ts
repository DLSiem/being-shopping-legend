import { Request, Response } from "express";
import User from "../db/models/user";
import Item from "../db/models/item";
import ItemCategory from "../db/models/category";
import Tags from "../db/models/tags";
import exp from "constants";

// create item
// export const createItem = async (req: Request, res: Response) => {
//   const { itemName, description, price, imageUrl, category } = req.body;
//   const userId = req.user.user_id;
//   try {
//     const response = await Item.createItem(
//       itemName,
//       description,
//       price,
//       imageUrl,
//       category,
//       userId
//     );
//     return res.status(201).json(response);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Server Error");
//   }
// };

// create category
export const createCategory = async (req: Request, res: Response) => {
  const { categoryName } = req.body;
  try {
    const response = await ItemCategory.create(categoryName);
    if (response.rowCount === 0) {
      return res.status(400).json(response);
    }
    return res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// get all categories
export const getCategories = async (req: Request, res: Response) => {
  try {
    const response = await ItemCategory.getAllCategories();
    if (response.rowCount === 0) {
      return res.status(404).json(response);
    }
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

// get category by id
export const getCategoryById = async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  try {
    const response = await ItemCategory.getCategoryById(categoryId);
    if (response.rowCount === 0) {
      return res.status(404).json(response);
    }
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

// delete category
export const deleteCategory = async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  try {
    const response = await ItemCategory.deleteCategory(categoryId);
    if (response.rowCount === 0) {
      return res.status(404).json(response);
    }
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

// get tags by id
export const getTagsById = async (req: Request, res: Response) => {
  const { tagId } = req.params;
  try {
    const response = await Tags.getTagById(tagId);
    if (response.rowCount === 0) {
      return res.status(404).json(response);
    }
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

// get all tags
export const getTags = async (req: Request, res: Response) => {
  try {
    const response = await Tags.getAllTags();
    if (response.rowCount === 0) {
      return res.status(404).json(response);
    }
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

// create tags
export const createTags = async (req: Request, res: Response) => {
  const { tagName } = req.body;

  let tagArray = tagName.split(",");
  // remove white spaces
  tagArray = tagArray.map((tag: string) => tag.trim());
  try {
    const response = await Tags.create(tagArray);
    if (response.rowCount === 0) {
      return res.status(400).json(response);
    }
    return res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// delete tags
export const deleteTags = async (req: Request, res: Response) => {
  const { tagId } = req.params;
  try {
    const response = await Tags.deleteTag(tagId);
    if (response.rowCount === 0) {
      return res.status(404).json(response);
    }
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

// get all items
export const getItems = async (req: Request, res: Response) => {
  try {
    const response = await Item.getAllItems();
    if (response.rowCount === 0) {
      return res.status(404).json(response);
    }
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};
