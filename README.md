# Content Management API


This API provides endpoints to manage content, including CRUD operations for content and comments, as well as analytics and category management.

## Description

This is an assignment project made for the CTSE module.

## Endpoints

### Content

1. GET /content: Get all content.
2. GET /content/:id: Get content by ID.
3. POST /content: Create new content.
4. PUT /content/:id: Update content by ID.
5. DELETE /content/:id: Delete content by ID.
6. GET /content/:id/comments: Get comments for content by ID.
7. POST /content/:id/comments: Add a new comment to content by ID.
8. PUT /content/:id/comments/:commentId: Update comment for content by ID and comment ID.
9. DELETE /content/:id/comments/:commentId: Delete comment for content by ID and comment ID.
10. PUT /content/:id/like: Like content by ID.
11. PUT /content/:id/unlike: Unlike content by ID.
12. GET /content/tags/:tag: Get content by tag.
13. GET /content/search: Search content by keyword.
14. GET /content/:id/analytics: Get analytics for content by ID.

### Categories

1. GET /categories: Get all categories.
2. POST /categories: Create a new category.
3. PUT /categories/:id: Update category by ID.
4. DELETE /categories/:id: Delete category by ID.

### Analytics

1. GET /analytics: Get overall analytics.
