# 🚀 Threads Clone - Backend

Radhe Radhe ,I am Pranita Aeer

This is the backend for a Threads Clone application built using Node.js, Express, MongoDB, and JWT authentication. It provides REST APIs for user authentication, posts, and media uploads.

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB
* JWT Authentication
* Cloudinary (for image uploads)

---

## 📂 Project Structure

```
backend/
│── controllers/
│── models/
│── middleware/
│── config/
│── index.js
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root of the backend folder and add the following:

```
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret

CLIENT_URL=your_frontend_url
```

---

## 📦 Installation

Clone the repository and install dependencies:

```
git clone <your-repo-url>
cd backend
npm install
```

---

## ▶️ Running the Server

### Development

```
npm run dev
```

### Production

```
npm start
```

Server will run on:

```
http://localhost:5000
```

---

## 🔐 Features

* User Authentication (Signup / Login)
* JWT-based Authorization
* Create, Read, Delete Posts
* Image Upload with Cloudinary
* Secure API Routes
* MongoDB Database Integration



---

## 🧪 Future Improvements

* Like & Comment system
* Notifications
* Real-time updates (WebSockets)

---

## 👨‍💻 Author

Pranita


