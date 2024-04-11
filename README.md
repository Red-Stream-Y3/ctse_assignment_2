# ctse_assignment_2

A microservice for content management service for a bloggoing website

## endpoints

##### Content Creation:

1. POST /content: Create a new content item.
2. PUT /content/{id}: Update an existing content item.
3. DELETE /content/{id}: Delete a content item.

##### Content Retrieval:

1. GET /content: Retrieve a list of content items.
2. GET /content/{id}: Retrieve details of a specific content item by ID.

##### Content Categorization:

1. GET /categories: Retrieve a list of available categories.
2. POST /categories: Create a new category.
3. PUT /categories/{id}: Update an existing category.
4. DELETE /categories/{id}: Delete a category.

##### Content Search:

1. GET /content/search: Search for content items based on keywords or other criteria.
2. GET /content/tags/{tag}: Retrieve content items with a specific tag.

##### Content Comments and Interactions:

1. GET /content/{id}/comments: Retrieve comments for a specific content item.
2. POST /content/{id}/comments: Add a new comment to a content item.
3. PUT /content/{id}/comments/{commentId}: Update an existing comment.
4. DELETE /content/{id}/comments/{commentId}: Delete a comment.

##### Content Analytics:

1. GET /content/{id}/analytics: Retrieve analytics data for a specific content item.
2. GET /analytics: Retrieve overall analytics data for the entire content management system.
