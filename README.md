# FoodoFest - Modern Food Delivery Application

A full-stack food delivery application built with MERN stack (MongoDB, Express, React, Node.js) and Tailwind CSS.

## Features

- **User Side**:
  - Home page with search and category filters.
  - Restaurant details with menu categories.
  - Cart management (add, remove, update quantity).
  - Login & Signup with JWT (Mocked for demo).
  - Checkout with address input and mock payment.
- **Admin Side**:
  - Dashboard to manage restaurants and orders.
- **UI/UX**:
  - Modern, responsive design inspired by Swiggy/Zomato.
  - Smooth animations and skeleton loaders.
  - Toast notifications for user actions.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, Lucide React, React Router, Axios.
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT.

## Getting Started

### Prerequisites

- Node.js installed.
- MongoDB installed and running (optional for demo, but required for data persistence).

### Installation

1. **Clone the project** (if not already in the folder).
2. **Setup Backend**:
   ```bash
   cd server
   npm install
   ```
3. **Setup Frontend**:
   ```bash
   cd client
   npm install
   ```

### Running the App

1. **Start MongoDB** (Ensure it's running at `mongodb://localhost:27017/food-delivery`).
2. **Seed Data** (Optional, to populate restaurants):
   ```bash
   cd server
   node seed.js
   ```
3. **Start Backend**:
   ```bash
   cd server
   npm run dev (or npx nodemon server.js)
   ```
4. **Start Frontend**:
   ```bash
   cd client
   npm run dev
   ```

Open [http://localhost:5173](http://localhost:5173) to view the app.

## Environment Variables

**Server (.env)**:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/food-delivery
JWT_SECRET=your_super_secret_key_123
NODE_ENV=development
```

## Note on MongoDB
If you don't have MongoDB installed, the app will show loading states or errors when fetching restaurants. You can use **MongoDB Atlas** by replacing the `MONGO_URI` in `server/.env`.
