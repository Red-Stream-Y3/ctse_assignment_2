import mongoose from "mongoose";
import request from "supertest";
import app from "../../index.js";
import Content from "../models/contentModel.js";
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
  likeContent,
  unlikeContent,
  getContentByTag,
  searchContent,
  getAnalytics,
  getOverallAnalytics,
} from "./contentController.js";

describe("Content Controllers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getContents", () => {
    it("should return all content", async () => {
      const mockContents = [{ title: "Content 1" }, { title: "Content 2" }];
      Content.find.mockResolvedValue(mockContents);

      const response = await request(app).get("/content");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockContents);
    });

    it("should handle errors", async () => {
      Content.find.mockRejectedValue(new Error("Database error"));

      const response = await request(app).get("/content");

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Database error");
    });
  });

  // Similarly, write test cases for other controllers
  // getContentById, createContent, updateContent, deleteContent, getComments, addComment, updateComment, deleteComment, likeContent, unlikeContent, getContentByTag, searchContent, getAnalytics, getOverallAnalytics

  describe("getAnalytics", () => {
    it("should return analytics for content by id", async () => {
      const mockContent = {
        _id: "1",
        likes: 10,
        comments: [{ _id: "1", comment: "Comment 1" }],
      };
      Content.findById.mockResolvedValue(mockContent);

      const response = await request(app).get("/content/1/analytics");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        likes: mockContent.likes,
        comments: mockContent.comments.length,
      });
    });

    it("should handle content not found", async () => {
      Content.findById.mockResolvedValue(null);

      const response = await request(app).get("/content/1/analytics");

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Content not found");
    });

    it("should handle errors", async () => {
      Content.findById.mockRejectedValue(new Error("Database error"));

      const response = await request(app).get("/content/1/analytics");

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Database error");
    });
  });

  describe("getOverallAnalytics", () => {
    it("should return overall analytics", async () => {
      const mockContents = [
        { likes: 10, comments: [{ comment: "Comment 1" }] },
        { likes: 20, comments: [{ comment: "Comment 2" }] },
      ];
      Content.find.mockResolvedValue(mockContents);

      const response = await request(app).get("/analytics");

      const totalLikes = mockContents.reduce(
        (acc, content) => acc + content.likes,
        0
      );
      const totalComments = mockContents.reduce(
        (acc, content) => acc + content.comments.length,
        0
      );
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        totalContents: mockContents.length,
        totalLikes,
        totalComments,
      });
    });

    it("should handle errors", async () => {
      Content.find.mockRejectedValue(new Error("Database error"));

      const response = await request(app).get("/analytics");

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Database error");
    });
  });

  describe("getContentByTag", () => {
    it("should return content by tag", async () => {
      const mockContents = [{ title: "Content 1" }, { title: "Content 2" }];
      Content.find.mockResolvedValue(mockContents);

      const response = await request(app).get("/content/tags/tag1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockContents);
    });

    it("should handle errors", async () => {
      Content.find.mockRejectedValue(new Error("Database error"));

      const response = await request(app).get("/content/tags/tag1");

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Database error");
    });
  });

  describe("searchContent", () => {
    it("should return content by keyword", async () => {
      const mockContents = [{ title: "Content 1" }, { title: "Content 2" }];
      Content.find.mockResolvedValue(mockContents);

      const response = await request(app).get(
        "/content/search?keyword=keyword"
      );

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockContents);
    });

    it("should handle errors", async () => {
      Content.find.mockRejectedValue(new Error("Database error"));

      const response = await request(app).get("/content/search");

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Database error");
    });
  });

  describe("likeContent", () => {
    it("should like content", async () => {
      const mockContent = { _id: "1", likes: 10 };
      Content.findById.mockResolvedValue(mockContent);

      const response = await request(app).post("/content/1/like");

      expect(response.status).toBe(200);
      expect(response.body.likes).toBe(mockContent.likes + 1);
    });

    it("should handle content not found", async () => {
      Content.findById.mockResolvedValue(null);

      const response = await request(app).post("/content/1/like");

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Content not found");
    });

    it("should handle errors", async () => {
      Content.findById.mockRejectedValue(new Error("Database error"));

      const response = await request(app).post("/content/1/like");

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Database error");
    });
  });

  describe("unlikeContent", () => {
    it("should unlike content", async () => {
      const mockContent = { _id: "1", likes: 10 };
      Content.findById.mockResolvedValue(mockContent);

      const response = await request(app).post("/content/1/unlike");

      expect(response.status).toBe(200);
      expect(response.body.likes).toBe(mockContent.likes - 1);
    });

    it("should handle content not found", async () => {
      Content.findById.mockResolvedValue(null);

      const response = await request(app).post("/content/1/unlike");

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Content not found");
    });

    it("should handle errors", async () => {
      Content.findById.mockRejectedValue(new Error("Database error"));

      const response = await request(app).post("/content/1/unlike");

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Database error");
    });
  });

  describe("getComments", () => {
    it("should return all comments for content by id", async () => {
      const mockContent = { _id: "1", comments: [{ comment: "Comment 1" }] };
      Content.findById.mockResolvedValue(mockContent);

      const response = await request(app).get("/content/1/comments");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockContent.comments);
    });

    it("should handle content not found", async () => {
      Content.findById.mockResolvedValue(null);

      const response = await request(app).get("/content/1/comments");

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Content not found");
    });

    it("should handle errors", async () => {
      Content.findById.mockRejectedValue(new Error("Database error"));

      const response = await request(app).get("/content/1/comments");

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Database error");
    });
  });
});
