# User Management API

This is a Node.js-based RESTful API for managing user authentication and metadata. It includes features like user creation, login, and token-based authentication using JWT.

# Technologies Used
- Node.js: Backend runtime environment.
- Node version: 20
- MySQL

# Setup Instructions

1. Clone the Repository
git clone <repository-url>
cd <repository-directory>

2. Install Dependencies
npm install

3. Configure Environment Variables
Create a .env file in the root directory and add the following:

DB_HOST=localhost
DB_USERNAME=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name
TOKEN_SECRET=your_jwt_secret
PORT=8000

4. Run MetaData files

5. Start the Server
npm run dev

# API Endpoints
1. Create User
URL: POST /auth/create
Request Body:
{
  "username": "newUser",
  "email": "newuser@example.com",
  "password": "securepassword123"
}

2. Login
URL: POST /auth/login
Request Body:
{
  "email": "newuser@example.com",
  "password": "securepassword123"
}




