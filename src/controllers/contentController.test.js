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

jest.mock("../models/contentModel");

describe("Content Controllers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/v1/content", () => {
    test("should get all content", async () => {
      const contents = [{ title: "Test Content", author: "Test Author", content: "Test Content Body" }];
      Content.find.mockResolvedValue(contents);

      await request(app)
        .get("/api/v1/content")
        .expect(200)
        .expect("Content-Type", /json/)
        .then((response) => {
          expect(response.body).toEqual(contents);
        });
    });
  });

  describe("GET /api/v1/content/:id", () => {
    test("should get content by id", async () => {
      const content = { _id: "123", title: "Test Content", author: "Test Author", content: "Test Content Body" };
      Content.findById.mockResolvedValue(content);

      await request(app)
        .get("/api/v1/content/123")
        .expect(200)
        .expect("Content-Type", /json/)
        .then((response) => {
          expect(response.body).toEqual(content);
        });
    });

    test("should return 404 if content not found", async () => {
      Content.findById.mockResolvedValue(null);

      await request(app)
        .get("/api/v1/content/123")
        .expect(404)
        .expect("Content-Type", /json/)
        .then((response) => {
          expect(response.body).toEqual({ error: "Content not found" });
        });
    });
  });

  describe("POST /api/v1/content", () => {
    test("should create new content", async () => {
      const newContent = { title: "New Content", author: "Test Author", content: "New Content Body" };
      Content.prototype.save.mockResolvedValue(newContent);

      await request(app)
        .post("/api/v1/content")
        .send(newContent)
        .expect(201)
        .expect("Content-Type", /json/)
        .then((response) => {
          expect(response.body).toEqual(newContent);
        });
    });
});

describe("PUT /api/v1/content/:id", () => {
  test("should update content by id", async () => {
    const updatedContent = { _id: "123", title: "Updated Content", author: "Test Author", content: "Updated Content Body" };
    Content.findById.mockResolvedValue({ save: jest.fn().mockResolvedValue(updatedContent) });

    await request(app)
      .put("/api/v1/content/123")
      .send(updatedContent)
      .expect(200)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual(updatedContent);
      });
  });

  test("should return 404 if content not found", async () => {
    Content.findById.mockResolvedValue(null);

    await request(app)
      .put("/api/v1/content/123")
      .expect(404)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual({ error: "Content not found" });
      });
  });
});

describe("DELETE /api/v1/content/:id", () => {
  test("should delete content by id", async () => {
    Content.findById.mockResolvedValue({ remove: jest.fn().mockResolvedValue(true) });

    await request(app)
      .delete("/api/v1/content/123")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual({ message: "Content removed" });
      });
  });

  test("should return 404 if content not found", async () => {
    Content.findById.mockResolvedValue(null);

    await request(app)
      .delete("/api/v1/content/123")
      .expect(404)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual({ error: "Content not found" });
      });
  });
});

describe("GET /api/v1/content/:id/comments", () => {
  test("should get comments for content by id", async () => {
    const comments = [{ author: "Comment Author", comment: "Test Comment" }];
    Content.findById.mockResolvedValue({ comments });

    await request(app)
      .get("/api/v1/content/123/comments")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual(comments);
      });
  });

  test("should return 404 if content not found", async () => {
    Content.findById.mockResolvedValue(null);

    await request(app)
      .get("/api/v1/content/123/comments")
      .expect(404)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual({ error: "Content not found" });
      });
  });
});

// describe("POST /api/v1/content/:id/comments", () => {
//   test("should add a new comment to content by id", async () => {
//     const newComment = { author: "New Comment Author", comment: "New Test Comment" };
//     Content.findById.mockResolvedValue({ save: jest.fn().mockResolvedValue(true) });

//     await request(app)
//       .post("/api/v1/content/123/comments")
//       .send(newComment)
//       .expect(201)
//       .expect("Content-Type", /json/)
//       .then((response) => {
//         expect(response.body).toEqual(newComment);
//       });
//   });

//   test("should return 404 if content not found", async () => {
//     Content.findById.mockResolvedValue(null);

//     await request(app)
//       .post("/api/v1/content/123/comments")
//       .expect(404)
//       .expect("Content-Type", /json/)
//       .then((response) => {
//         expect(response.body).toEqual({ error: "Content not found" });
//       });
//   });
// });

// describe("GET /api/v1/content/tag/:tag", () => {
//   test("should get content by tag", async () => {
//     const tag = "test";
//     const contents = [{ title: "Test Content", author: "Test Author", content: "Test Content Body", tags: [tag] }];
//     Content.find.mockResolvedValue(contents);

//     await request(app)
//       .get(`/api/v1/content/tag/${tag}`)
//       .expect(200)
//       .expect("Content-Type", /json/)
//       .then((response) => {
//         expect(response.body).toEqual(contents);
//       });
//   });

//   test("should return 404 if no content found for tag", async () => {
//     const tag = "nonexistenttag";
//     Content.find.mockResolvedValue([]);

//     await request(app)
//       .get(`/api/v1/content/tag/${tag}`)
//       .expect(404)
//       .expect("Content-Type", /json/)
//       .then((response) => {
//         expect(response.body).toEqual({ error: "No content found for tag" });
//       });
//   });
// });

// describe("GET /api/v1/content/search", () => {
//   test("should search content by keyword", async () => {
//     const keyword = "test";
//     const contents = [{ title: "Test Content 1", author: "Test Author", content: "Test Content Body 1" }, { title: "Test Content 2", author: "Test Author", content: "Test Content Body 2" }];
//     Content.find.mockResolvedValue(contents);

//     await request(app)
//       .get(`/api/v1/content/search?keyword=${keyword}`)
//       .expect(200)
//       .expect("Content-Type", /json/)
//       .then((response) => {
//         expect(response.body).toEqual(contents);
//       });
//   });

//   test("should return empty array if no content found for keyword", async () => {
//     const keyword = "nonexistentkeyword";
//     Content.find.mockResolvedValue([]);

//     await request(app)
//       .get(`/api/v1/content/search?keyword=${keyword}`)
//       .expect(200)
//       .expect("Content-Type", /json/)
//       .then((response) => {
//         expect(response.body).toEqual([]);
//       });
//   });
// });

// describe("GET /api/v1/content/:id/analytics", () => {
//   test("should get analytics for content by id", async () => {
//     const contentId = "123";
//     const content = { _id: contentId, title: "Test Content", author: "Test Author", content: "Test Content Body", likes: 10, comments: [{ author: "Comment Author", comment: "Test Comment" }] };
//     Content.findById.mockResolvedValue(content);

//     await request(app)
//       .get(`/api/v1/content/${contentId}/analytics`)
//       .expect(200)
//       .expect("Content-Type", /json/)
//       .then((response) => {
//         expect(response.body).toEqual({ likes: 10, comments: 1 });
//       });
//   });

//   test("should return 404 if content not found", async () => {
//     const contentId = "nonexistentid";
//     Content.findById.mockResolvedValue(null);

//     await request(app)
//       .get(`/api/v1/content/${contentId}/analytics`)
//       .expect(404)
//       .expect("Content-Type", /json/)
//       .then((response) => {
//         expect(response.body).toEqual({ error: "Content not found" });
//       });
//   });
// });

// describe("GET /api/v1/content/analytics", () => {
//   test("should get overall analytics", async () => {
//     const contents = [{ likes: 10, comments: [{ author: "Comment Author", comment: "Test Comment" }] }, { likes: 5, comments: [] }];
//     Content.find.mockResolvedValue(contents);

//     await request(app)
//       .get("/api/v1/content/analytics")
//       .expect(200)
//       .expect("Content-Type", /json/)
//       .then((response) => {
//         expect(response.body).toEqual({ totalContents: 2, totalLikes: 15, totalComments: 1 });
//       });
//   });

//   test("should return empty analytics if no content found", async () => {
//     Content.find.mockResolvedValue([]);

//     await request(app)
//       .get("/api/v1/content/analytics")
//       .expect(200)
//       .expect("Content-Type", /json/)
//       .then((response) => {
//         expect(response.body).toEqual({ totalContents: 0, totalLikes: 0, totalComments: 0 });
//       });
//   });
// });
});
