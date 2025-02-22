# GlobalGate Server

## Overview
GlobalGate is a visa servicing platform that helps users manage visa applications, track statuses, and access essential visa information. This server-side application is built using Node.js, Express, and MongoDB to provide a robust and scalable backend.

## Features
- User information management
- Visa application submission and retrieval
- Individual and all visa information fetching
- Latest visa updates retrieval
- Secure database interactions with MongoDB

## Tech Stack
```txt
- Backend: Node.js, Express.js
- Database: MongoDB
- Environment Variables: dotenv
- Security & CORS Handling: cors
```

## Installation
### Prerequisites
Ensure you have the following installed on your system:
```txt
- Node.js
- MongoDB
```

### Steps
```sh
# Clone the repository
git clone https://github.com/yourusername/globalgate-server.git

# Navigate to the project directory
cd globalgate-server

# Install dependencies
npm install

# Create a .env file in the root directory and configure it
```

#### .env File Example
```env
PORT=5000
DB_USER=your_mongodb_user
DB_PASS=your_mongodb_password
```

## Running the Server
```sh
npm start
```
The server will run on `http://localhost:5000` by default.

## API Endpoints
### Base URL: `http://localhost:5000`
#### Visa Routes
```http
POST   /visa-info         # Save new visa information
GET    /all-visa-info     # Retrieve all visa information
GET    /visa-info/:id     # Retrieve visa details by ID
GET    /latest-visa       # Fetch the latest 6 visa entries
GET    /individual-visa/:email  # Retrieve individual visa information by email
DELETE /visa-info/:id     # Delete visa entry by ID
```

#### Application Routes
```http
POST   /application-info        # Save visa application details
GET    /application-info/:email # Retrieve application details by user email
DELETE /application-info/:id    # Delete application by ID
```

#### User Routes
```http
POST   /user  # Save new user information
```

## Deployment
You can deploy this project on cloud platforms like:
```txt
- Vercel
- Render
- Railway
- Heroku
```

## License
```txt
This project is licensed under the ISC License.
```

## Contributors
```txt
- Chan Badsha Bhuiyan (Developer)
```

## Contact
For any inquiries or issues, feel free to reach out.

