# URL Management API

The URL Management API provides functionalities for managing shortened URLs, enabling users to create, retrieve, update, and delete URLs efficiently. It also supports redirection and analytics tracking for each shortened URL.

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

3. URL shorten
URL POST /url/shorten
Request Body:
{
  "originalUrl": "https://example.com",
  "customAlias": "exampleAlias2",
  "expirationDate": "2024-12-31T23:59:59Z"
}

4. Retrieve
URL GET /url/retrieve?page=1&itemsPerPage=10&startDate=2024-01-01&endDate=2024-12-31&isExpired=false

5. Update
URL PUT /url/update/:id

6. Delete 
URL DELETE /url/delete/:id

7. Analytics
URL GET  /url/:urlId/analytics




