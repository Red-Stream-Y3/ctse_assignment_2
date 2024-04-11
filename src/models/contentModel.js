import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const tagsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const contentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: {
      type: [tagsSchema],
      required: true,
    },
    comments: {
      type: [commentSchema],
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Content = mongoose.model("Content", contentSchema);

export default Content;
