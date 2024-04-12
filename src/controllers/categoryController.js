import asyncHandler from "express-async-handler";
import Tag from "../models/categoryModel.js";

// @desc    Get all tags
// @route   GET /tags
// @access  Public

const getTags = asyncHandler(async (req, res) => {
  const tags = await Tag.find();
  res.json(tags);
});

// @desc    Create a new tag
// @route   POST /tags
// @access  Public

const createTag = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const tag = new Tag({ name });
  const createdTag = await tag.save();
  res.status(201).json(createdTag);
});

// @desc    Update tag by id
// @route   PUT /tags/:id
// @access  Public

const updateTag = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const updatedTag = await Tag.findByIdAndUpdate(
    req.params.id,
    { name },
    { new: true }
  );
  if (!updatedTag) {
    res.status(404).json({ error: "Tag not found" });
  } else {
    res.json(updatedTag);
  }
});

// @desc    Delete tag by id
// @route   DELETE /tags/:id
// @access  Public

const deleteTag = asyncHandler(async (req, res) => {
  const deletedTag = await Tag.findByIdAndDelete(req.params.id);
  if (!deletedTag) {
    res.status(404).json({ error: "Tag not found" });
  } else {
    res.json({ message: "Tag removed" });
  }
});

export { getTags, createTag, updateTag, deleteTag };
