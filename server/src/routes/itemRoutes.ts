import express from "express";
const router = express.Router();

import {
  getItems,
  createCategory,
  getCategories,
  getTags,
  createTags,
  deleteTags,
  getCategoryById,
  deleteCategory,
  getTagsById,
  createItem,
  getItemById,
} from "../controllers/itemController";

// items
router.get("/", getItems);
router.post("/create", createItem);
router.get("/:itemId", getItemById);

// categories
router.post("/categories/create", createCategory);
router.get("/categories", getCategories);
router.get("/categories/:categoryId", getCategoryById);
router.delete("/categories/delete/:categoryId", deleteCategory);

// tags
router.post("/tags/create", createTags);
router.get("/tags", getTags);
router.get("/tags/:tagId", getTagsById);
router.delete("/tags/delete/:tagId", deleteTags);

export default router;
