import express from "express";
import {
  getContents,
  getContentById,
  createContent,
  updateContent,
  deleteContent,
  getComments,
  addComment,
  updateComment,
  deleteComment,
  getContentByTag,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  searchContent,
  getAnalytics,
  getOverallAnalytics,
} from "../controllers/contentController.js";

const router = express.Router();

router.route("/").get(getContents).post(createContent);
router
  .route("/:id")
  .get(getContentById)
  .put(updateContent)
  .delete(deleteContent);
router.route("/:id/comments").get(getComments).post(addComment);
router
  .route("/:id/comments/:commentId")
  .put(updateComment)
  .delete(deleteComment);
router.route("/tag/:tag").get(getContentByTag);
router.route("/categories").get(getCategories).post(createCategory);
router.route("/categories/:id").put(updateCategory).delete(deleteCategory);
router.route("/search").get(searchContent);
router.route("/:id/analytics").get(getAnalytics);
router.route("/analytics").get(getOverallAnalytics);

export default router;
