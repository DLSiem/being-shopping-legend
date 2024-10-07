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
} from "../controllers/itemController";

router.get("/", getItems);

// categories
router.post("/category/create", createCategory);
router.get("/categories", getCategories);
router.get("/category/:categoryId", getCategoryById);
router.delete("/category/delete/:categoryId", deleteCategory);

// tags
router.post("/tags/create", createTags);
router.get("/tags", getTags);
router.get("/tags/:tagId", getTagsById);
router.delete("/tags/delete/:tagId", deleteTags);

export default router;
