import Tag from "../models/categoryModel.js";
import {
  getTags,
  createTag,
  updateTag,
  deleteTag,
} from "../controllers/categoryController";

jest.mock("../models/categoryModel");

describe("Tag Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /tags", () => {
    it("should return all tags", async () => {
      const mockTags = [{ name: "Tag 1" }, { name: "Tag 2" }];
      Tag.find.mockResolvedValue(mockTags);

      const req = {};
      const res = { json: jest.fn() };

      await getTags(req, res);

      expect(res.json).toHaveBeenCalledWith(mockTags);
    });
  });

  describe("POST /tags", () => {
    it("should create a new tag", async () => {
      const newTag = { name: "New Tag" };
      const createdTag = { _id: "someId", ...newTag };
      const req = { body: newTag };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const saveMock = jest.fn().mockResolvedValue(createdTag);

      jest.spyOn(Tag.prototype, "save").mockImplementation(saveMock);

      await createTag(req, res);

      expect(saveMock).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(createdTag);
    });
  });

  describe("PUT /tags/:id", () => {
    it("should update a tag by id", async () => {
      const updatedTag = { _id: "someId", name: "Updated Tag" };
      const req = { params: { id: "someId" }, body: { name: "Updated Tag" } };
      const res = { json: jest.fn() };

      Tag.findByIdAndUpdate.mockResolvedValue(updatedTag);

      await updateTag(req, res);

      expect(res.json).toHaveBeenCalledWith(updatedTag);
    });

    it("should handle tag not found", async () => {
      const req = { params: { id: "someId" }, body: { name: "Updated Tag" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      Tag.findByIdAndUpdate.mockResolvedValue(null);

      await updateTag(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Tag not found" });
    });
  });

  describe("DELETE /tags/:id", () => {
    it("should delete a tag by id", async () => {
      const deletedTag = { _id: "someId", name: "Deleted Tag" };
      const req = { params: { id: "someId" } };
      const res = { json: jest.fn() };

      Tag.findByIdAndDelete.mockResolvedValue(deletedTag);

      await deleteTag(req, res);

      expect(res.json).toHaveBeenCalledWith({ message: "Tag removed" });
    });

    it("should handle tag not found", async () => {
      const req = { params: { id: "someId" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      Tag.findByIdAndDelete.mockResolvedValue(null);

      await deleteTag(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Tag not found" });
    });
  });
});
