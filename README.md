# Content Management API

This API provides endpoints to manage content, including CRUD operations for content and comments, as well as analytics and category management.

## Description

This is an assignment project made for the CTSE module.

## Endpoints

### Content

GET /content: Get all content.
GET /content/:id: Get content by ID.
POST /content: Create new content.
PUT /content/:id: Update content by ID.
DELETE /content/:id: Delete content by ID.
GET /content/:id/comments: Get comments for content by ID.
POST /content/:id/comments: Add a new comment to content by ID.
PUT /content/:id/comments/:commentId: Update comment for content by ID and comment ID.
DELETE /content/:id/comments/:commentId: Delete comment for content by ID and comment ID.
GET /content/tags/:tag: Get content by tag.
GET /content/search: Search content by keyword.
GET /content/:id/analytics: Get analytics for content by ID.

### Categories

GET /categories: Get all categories.
POST /categories: Create a new category.
PUT /categories/:id: Update category by ID.
DELETE /categories/:id: Delete category by ID.

### Analytics

GET /analytics: Get overall analytics.
