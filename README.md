# Minimalist - Full-Stack E-Commerce Platform 🛒

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white)

A fully responsive, modern full-stack e-commerce platform built from scratch using the MERN stack. Features include secure payments, cloud image storage, and a powerful admin dashboard for complete store management.

**Live Demo:** [Visit Minimalist](https://minimalist-ecommerce-three.vercel.app)

---

## Key Features

* **User Authentication:** Secure login and registration using JSON Web Tokens (JWT).
* **Role-Based Access Control:** Separate permissions for Customers and Administrators.
* **Admin Dashboard:** Full control to manage products, view users, and track orders.
* **Secure Payments:** Integrated **Stripe API** for seamless transactions.
* **Cloud Storage:** Product images are securely hosted via **AWS S3**.
* **Responsive UI:** Clean design optimized for mobile, tablet, and desktop devices.

---

## Tech Stack

### Frontend
* React.js (Vite)
* Tailwind CSS
* Vercel (Deployment)

### Backend
* Node.js & Express.js
* MongoDB (Database)
* Amazon S3 (Image Hosting)
* Stripe (Payment Gateway)
* Render (Deployment)

---

## Getting Started (Run Locally)

### 1. Clone the repository
git clone https://github.com/isuruamarasooriya/minimalist-ecommerce.git
cd minimalist-ecommerce

### 2. Install Dependencies
You need to install packages for both the backend and frontend.

# Install backend dependencies (from root folder)
npm install

# Navigate to frontend folder and install dependencies
cd client
npm install

### 3. Environment Variables
Create a .env file in the root directory and add the following variables:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_BUCKET_NAME=your_aws_bucket_name

### 4. Run the Application

# To run backend (from root folder)
npm start

# To run frontend (go to client folder and run)
cd client
npm run dev

---

## Author

**Isuru Amarasooriya**
* LinkedIn: [isuruamarasooriya](https://linkedin.com/in/isuruamarasooriya)
* GitHub: [isuruamarasooriya](https://github.com/isuruamarasooriya)
