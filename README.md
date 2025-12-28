
---

# 🧭 Tour Management System

## 📌 Project Overview

The **Tour Management System** is a scalable, secure, and user-friendly web application designed to help users discover and book tours across Bangladesh. It provides a complete solution for tour booking, payment processing, and administrative management with role-based access control. The system integrates OTP-based authentication, online payments via **SSLCommerz**, and a powerful admin dashboard for managing tours, users, guides, and bookings.

---

## 🎯 Purpose

To develop a modern tour booking platform that:

* Enables users to browse, filter, and book tours easily
* Ensures secure authentication and payment handling
* Provides admins and super-admins with full control over tours, users, and transactions

---

## 🚀 Key Features

### 🔐 Authentication & Authorization

* User registration via **Email & Google**
* **OTP verification** for account activation
* Login using email/password or Google (Passport.js)
* **JWT-based authentication** (Access & Refresh Tokens)
* **Role-Based Access Control (RBAC)**:

  * Visitor (Unauthenticated)
  * User
  * Admin
  * Super-Admin
* Protected routes & secure session handling

---

### 🌍 Tour Browsing & Filtering

* Browse all available tours
* Search tours by keyword
* Filter tours by:

  * Division
  * Price range
  * Keywords
* Pagination for better performance
* View detailed tour information (price, description, images)

---

### 📅 Booking Management

* Authenticated users can:

  * Select a tour
  * Choose a booking date
  * Book tours
* Booking is initially created with **status: `pending`**
* Users can view their **booking history**

---

### 💳 Payment Integration

* Online payment integration with **SSLCommerz**
* Redirect users to payment gateway after booking
* Handle payment **success & failure callbacks**
* Automatically update:

  * Booking status
  * Payment status after validation

---

### 🛠️ Admin & Super-Admin Dashboard

* Manage users (list, update, deactivate)
* Manage tours:

  * Create
  * Update
  * Delete
* Manage bookings (confirm / cancel)
* Assign guides to tours
* Manage division listings
* **Super-Admin** can manage admins and system overview

---

### 🖼️ Media & Invoicing

* **Cloudinary integration** for image upload & hosting
* Automatic **invoice generation**
* Shareable invoice URLs after successful bookings

---

### 📋 Data Validation & Utilities

* **Zod schema validation** for API & form data
* Centralized error handling with meaningful messages
* RESTful API structure under `/api/v1`

---

### 🔒 System & Security Features

* Password hashing using **bcrypt**
* Secure JWT validation & rotation
* OTP management using **Redis**
* HTTPS-secured payment and sensitive data transfer
* Backend follows **MVC architecture**
* Modular, scalable, and maintainable codebase

---

## 🧰 Technology Stack

### 🖥️ Frontend

* React.js / Next.js (SPA – separate frontend)
* TypeScript
* Redux Toolkit & RTK Query
* React Router
* Tailwind CSS
* Axios
* React Hook Form + Zod
* Vercel (Deployment)

---

### ⚙️ Backend

* Node.js
* Express.js
* TypeScript
* MongoDB + Mongoose
* Redis (OTP & transient data)
* Passport.js (Local + Google OAuth)
* JWT (Access & Refresh Tokens)
* Bcrypt.js
* Cloudinary
* SSLCommerz (Payment Gateway)
* dotenv (Environment Configuration)

---

## 🗂️ System Architecture Overview

* **Frontend**: SPA (React / Next.js)
* **Backend**: RESTful API (Node.js + Express)
* **Database**: MongoDB
* **Cache**: Redis
* **Authentication**: JWT + OTP
* **Payment**: SSLCommerz
* **Deployment**: Vercel / Cloud Hosting

---

## 🧾 Data Model (Core Entities)

### User

* name
* phone
* email
* password
* role
* verified

### Tour

* title
* description
* price
* images
* division
* slug

### Booking

* userId
* tourId
* date
* status
* paymentStatus

### Payment

* bookingId
* transactionId
* status
* amount

---

## 🔄 Use Case: Booking a Tour

1. User registers and verifies account via OTP
2. User logs in
3. User browses and selects a tour
4. Booking is created with status **pending**
5. User is redirected to SSLCommerz
6. On successful payment, booking is confirmed
7. Invoice URL is generated

---

## ✅ Acceptance Criteria

* Users can register, log in, and book tours
* Admins can manage tours, users, and bookings
* Payments correctly update booking status
* All APIs are secured with RBAC
* System meets performance, scalability, and security requirements

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/tour-management-system
cd tour-management-system
```

### 2️⃣ Install Dependencies

```bash
bun install
```

### 3️⃣ Environment Variables

Create a `.env` file and configure:

```env
PORT=5000
DATABASE_URL=mongodb+srv://...
JWT_SECRET=your_jwt_secret
REDIS_URL=your_redis_url
CLOUDINARY_API_KEY=your_key
CLOUDINARY_SECRET=your_secret
SSLCOMMERZ_STORE_ID=your_store_id
SSLCOMMERZ_STORE_PASSWORD=your_password
```

### 4️⃣ Run the Project

```bash
bun dev
```

---

## 🌍 Live URL

🔗 **Frontend**: Coming Soon
🔗 **Backend API**: Coming Soon

---

## 👤 Author

**Md Shamim**
BSc in Computer Science & Engineering
Full-Stack Web Developer

---


