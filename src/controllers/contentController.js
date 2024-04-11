import asyncHandler from "express-async-handler";
import Content from "../models/contentModel";

// @desc    Get all content
// @route   GET /content
// @access  Public

const getContents = asyncHandler(async (req, res) => {
  const contents = await Content.find({});
  res.json(contents);
});

// @desc    Get content by id
// @route   GET /content/:id
// @access  Public

const getContentById = asyncHandler(async (req, res) => {
  const content = await Content.findById(req.params.id);
  if (content) {
    res.json(content);
  } else {
    res.status(404);
    throw new Error("Content not found");
  }
});

// @desc    Create a new content
// @route   POST /content
// @access  Public

const createContent = asyncHandler(async (req, res) => {
  const { title, author, content, tags } = req.body;
  const newContent = new Content({
    title,
    author,
    content,
    tags,
  });
  const createdContent = await newContent.save();
  res.status(201).json(createdContent);
});

// @desc    Update content by id
// @route   PUT /content/:id
// @access  Public

const updateContent = asyncHandler(async (req, res) => {
  const { title, author, content, tags } = req.body;
  const contentToUpdate = await Content.findById(req.params.id);
  if (contentToUpdate) {
    contentToUpdate.title = title;
    contentToUpdate.author = author;
    contentToUpdate.content = content;
    contentToUpdate.tags = tags;
    const updatedContent = await contentToUpdate.save();
    res.json(updatedContent);
  } else {
    res.status(404);
    throw new Error("Content not found");
  }
});

// @desc    Delete content by id
// @route   DELETE /content/:id
// @access  Public

const deleteContent = asyncHandler(async (req, res) => {
  const contentToDelete = await Content.findById(req.params.id);
  if (contentToDelete) {
    await contentToDelete.remove();
    res.json({ message: "Content removed" });
  } else {
    res.status(404);
    throw new Error("Content not found");
  }
});

// @desc    Get comments for content by id
// @route   GET /content/:id/comments
// @access  Public

const getComments = asyncHandler(async (req, res) => {
  const content = await Content.findById(req.params.id);
  if (content) {
    res.json(content.comments);
  } else {
    res.status(404);
    throw new Error("Content not found");
  }
});

// @desc    Add a new comment to content by id
// @route   POST /content/:id/comments
// @access  Public

const addComment = asyncHandler(async (req, res) => {
  const { author, comment } = req.body;
  const contentToUpdate = await Content.findById(req.params.id);
  if (contentToUpdate) {
    const newComment = {
      author,
      comment,
    };
    contentToUpdate.comments.push(newComment);
    const updatedContent = await contentToUpdate.save();
    res.status(201).json(updatedContent.comments);
  } else {
    res.status(404);
    throw new Error("Content not found");
  }
});

// @desc    Update comment for content by id and comment id
// @route   PUT /content/:id/comments/:commentId
// @access  Public

const updateComment = asyncHandler(async (req, res) => {
  const { author, comment } = req.body;
  const contentToUpdate = await Content.findById(req.params.id);
  if (contentToUpdate) {
    const commentToUpdate = contentToUpdate.comments.find(
      (comment) => comment._id == req.params.commentId
    );
    if (commentToUpdate) {
      commentToUpdate.author = author;
      commentToUpdate.comment = comment;
      const updatedContent = await contentToUpdate.save();
      res.json(updatedContent.comments);
    } else {
      res.status(404);
      throw new Error("Comment not found");
    }
  } else {
    res.status(404);
    throw new Error("Content not found");
  }
});

// @desc    Delete comment for content by id and comment id
// @route   DELETE /content/:id/comments/:commentId
// @access  Public

const deleteComment = asyncHandler(async (req, res) => {
  const contentToUpdate = await Content.findById(req.params.id);
  if (contentToUpdate) {
    contentToUpdate.comments = contentToUpdate.comments.filter(
      (comment) => comment._id != req.params.commentId
    );
    const updatedContent = await contentToUpdate.save();
    res.json(updatedContent.comments);
  } else {
    res.status(404);
    throw new Error("Content not found");
  }
});

// @desc    Get content by tag
// @route   GET /content/tags/:tag
// @access  Public

const getContentByTag = asyncHandler(async (req, res) => {
  const contents = await Content.find({ "tags.name": req.params.tag });
  res.json(contents);
});

// @desc    Get all categories
// @route   GET /categories
// @access  Public

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Content.distinct("tags.name");
  res.json(categories);
});

// @desc    Create a new category
// @route   POST /categories
// @access  Public

const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const content = new Content({
    tags: [{ name }],
  });
  const createdContent = await content.save();
  res.status(201).json(createdContent.tags[0]);
});

// @desc    Update category by id
// @route   PUT /categories/:id
// @access  Public

const updateCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const contentToUpdate = await Content.findOne({ "tags._id": req.params.id });
  if (contentToUpdate) {
    contentToUpdate.tags[0].name = name;
    const updatedContent = await contentToUpdate.save();
    res.json(updatedContent.tags[0]);
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

// @desc    Delete category by id
// @route   DELETE /categories/:id
// @access  Public

const deleteCategory = asyncHandler(async (req, res) => {
  const contentToUpdate = await Content.findOne({ "tags._id": req.params.id });
  if (contentToUpdate) {
    await contentToUpdate.remove();
    res.json({ message: "Category removed" });
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

// @desc    Search content by keyword
// @route   GET /content/search
// @access  Public

const searchContent = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const contents = await Content.find({ ...keyword });
  res.json(contents);
});

// @desc    Get analytics for content by id
// @route   GET /content/:id/analytics
// @access  Public

const getAnalytics = asyncHandler(async (req, res) => {
  const content = await Content.findById(req.params.id);
  if (content) {
    const analytics = {
      likes: content.likes,
      comments: content.comments.length,
    };
    res.json(analytics);
  } else {
    res.status(404);
    throw new Error("Content not found");
  }
});

// @desc    Get overall analytics
// @route   GET /analytics
// @access  Public

const getOverallAnalytics = asyncHandler(async (req, res) => {
  const contents = await Content.find({});
  const totalLikes = contents.reduce((acc, content) => acc + content.likes, 0);
  const totalComments = contents.reduce(
    (acc, content) => acc + content.comments.length,
    0
  );
  const analytics = {
    totalContents: contents.length,
    totalLikes,
    totalComments,
  };
  res.json(analytics);
});

export {
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
};
