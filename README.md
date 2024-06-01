Welcome to the kGK-Group-Real-time-bidding-backend- wiki!
# Backend Intern Task: Real-Time Bidding Platform API

## Overview
This project is a comprehensive RESTful API for a real-time bidding platform. It's built using Node.js, Express, Socket.io, and a SQL database (PostgreSQL or MySQL). The API supports advanced CRUD operations, user authentication, role-based access control, real-time bidding, and notifications.

## Environment Setup
1. Install Node.js if you haven't already: [Node.js](https://nodejs.org/)
2. Clone this repository to your local machine:
3. Navigate into the project directory:
4. Install dependencies using npm:

## Configuration
1. Create a `.env` file in the root directory of the project.
2. Define environment variables required for the application:
Modify the values according to your database setup and preferences.

## Database Schema
### Users Table
- `id` (Primary Key)
- `username` (String, unique, not null)
- `password` (String, not null)
- `email` (String, unique, not null)
- `role` (String, default to 'user') // roles: 'user', 'admin'
- `created_at` (Timestamp, default to current time)

### Items Table
- `id` (Primary Key)
- `name` (String, not null)
- `description` (Text, not null)
- `starting_price` (Decimal, not null)
- `current_price` (Decimal, default to starting_price)
- `image_url` (String, nullable)
- `end_time` (Timestamp, not null)
- `created_at` (Timestamp, default to current time)

### Bids Table
- `id` (Primary Key)
- `item_id` (Foreign Key referencing items.id)
- `user_id` (Foreign Key referencing users.id)

## Usage
1. Start the server:
2. The API will be available at `http://localhost:3000`.

## API Documentation
Visit `http://localhost:3000/docs` to access the API documentation generated using Swagger or OpenAPI.

## Testing
To run tests, execute the following command:

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/fooBar`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add some fooBar'`).
5. Push to the branch (`git push origin feature/fooBar`).
6. Create a new Pull Request.

## Credits
List any contributors or resources used in the project.

## License
Specify the project's license. For example:
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
## Database Schema (Continued)
### Notifications Table
- `id` (Primary Key)
- `user_id` (Foreign Key referencing users.id)
- `message` (String, not null)
- `is_read` (Boolean, default to false)
- `created_at` (Timestamp, default to current time)

## API Endpoints

### Users:
- `POST /users/register` - Register a new user.
- `POST /users/login` - Authenticate a user and return a token.
- `GET /users/profile` - Get the profile of the logged-in user.

### Items:
- `GET /items` - Retrieve all auction items (with pagination).
- `GET /items/:id` - Retrieve a single auction item by ID.
- `POST /items` - Create a new auction item. (Authenticated users, image upload)
- `PUT /items/:id` - Update an auction item by ID. (Authenticated users, only item owners or admins)
- `DELETE /items/:id` - Delete an auction item by ID. (Authenticated users, only item owners or admins)

### Bids:
- `GET /items/:itemId/bids` - Retrieve all bids for a specific item.
- `POST /items/:itemId/bids` - Place a new bid on a specific item. (Authenticated users)

### Notifications:
- `GET /notifications` - Retrieve notifications for the logged-in user.
- `POST /notifications/mark-read` - Mark notifications as read.

## WebSocket Events

### Bidding:
- `connection` - Establish a new WebSocket connection.
- `bid` - 

## WebSocket Events

### Bidding:
- `connection` - Establish a new WebSocket connection.
- `bid` - Notify all connected clients about a new bid on an item.

### Notifications:
- `notify` - Send notifications to users in real-time.

## Authentication and Authorization
- Use JWT (JSON Web Tokens) for authentication.
- Implement role-based access control to restrict access to certain endpoints based on user roles.
- Protect the POST, PUT, and DELETE endpoints appropriately.

## Validation and Error Handling
- Validate incoming data for required fields.
- Handle and return appropriate HTTP status codes and messages for errors (e.g., 400 for bad requests, 401 for unauthorized, 403 for forbidden, 404 for not found).


