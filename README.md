# Zomiggo 🍔 - Full-Stack Food Delivery App

Zomiggo is a modern, responsive, and high-performance food delivery application inspired by industry leaders like Swiggy and Zomato. Built with the MERN stack and styled for a premium experience.

## ✨ Key Features

- **🚀 Performance**: Built with React 19 + Vite for blazing fast load times.
- **🎨 Premium UI**: Modern glassmorphism design using Tailwind CSS v4 and Framer Motion.
- **🛒 Smart Cart**: Real-time cart management with coupon support (`FIRST50`).
- **💳 Realistic Checkout**: Multi-step checkout flow with simulated payment gateway (UPI, Card, Netbanking).
- **📱 Responsive**: Fully optimized for Mobile, Tablet, and Desktop.
- **🔐 Secure Auth**: JWT-based authentication with protected routes.
- **🏠 User Dashboard**: Order history, profile management, and saved addresses.
- **🏢 Admin Panel**: Manage restaurants, menu items, and view orders.

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS v4, Framer Motion, Lucide React, Axios.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose).
- **State Management**: React Context API.

## 🚀 Getting Started

### Prerequisites

- Node.js installed
- MongoDB installed and running

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   ```

2. **Backend Setup**
   ```bash
   cd server
   npm install
   # Create a .env file and add your MONGO_URI and JWT_SECRET
   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd client
   npm install
   npm run dev
   ```

## 📸 Preview

Visit `http://localhost:5176` after starting both servers.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
