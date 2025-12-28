
---

# 🧭 [Tour Management System](https://tour-management-frontend-seven.vercel.app)

## 📌 Project Overview

The **Tour Management System** is a scalable and secure full-stack web application that enables users to discover, filter, and book tours across Bangladesh. The platform supports OTP-based authentication, role-based access control, and online payment processing through **SSLCommerz**, along with an advanced admin dashboard for managing tours, users, guides, and bookings.

---

## 🎯 Project Purpose

The goal of this project is to build a modern tour booking platform that:

* Allows users to easily browse, filter, and book tours
* Ensures secure authentication and payment processing
* Provides admins and super-admins with complete system control
* Demonstrates real-world full-stack development practices

---

## 🚀 Key Features

### 🔐 Authentication & Authorization

* User registration via **Email & Google**
* **OTP verification** for account activation
* Login with email/password or Google (Passport.js)
* **JWT-based authentication** (Access & Refresh Tokens)
* **Role-Based Access Control (RBAC)**:

  * Visitor (Unauthenticated)
  * User
  * Admin
  * Super-Admin
* Protected routes and secure session handling

---

### 🌍 Tour Browsing & Filtering

* Browse all available tours
* Keyword-based search
* Advanced filtering by:

  * Division
  * Price range
  * Keywords
* Pagination for optimized performance
* Detailed tour pages with images and pricing

---

### 📅 Booking Management

* Authenticated users can:

  * Select tours
  * Choose booking dates
  * Place tour bookings
* Bookings are initially created with **status: `pending`**
* Users can view their complete booking history

---

### 💳 Payment Integration

* Seamless payment integration using **SSLCommerz**
* Automatic redirection to payment gateway
* Payment success & failure callback handling
* Automatic update of:

  * Booking status
  * Payment status after validation

---

### 🛠️ Admin & Super-Admin Dashboard

* User management (list, update, deactivate)
* Tour management:

  * Create
  * Update
  * Delete
* Booking management (confirm / cancel)
* Assign guides to tours
* Manage division listings
* **Super-Admin** can manage admins and overall system control

---

### 🖼️ Media & Invoicing

* Image upload and hosting via **Cloudinary**
* Automatic invoice generation after successful payment
* Shareable invoice URLs

---

### 📋 Data Validation & Utilities

* **Zod-based schema validation** for API & form data
* Centralized error handling with meaningful responses
* RESTful API design under `/api/v1`

---

### 🔒 System & Security Features

* Secure password hashing using **bcrypt**
* JWT validation and token rotation
* OTP handling via **Redis**
* HTTPS-secured payment and sensitive data transfer
* Backend follows **MVC architecture**
* Modular and maintainable codebase

---

## 🧰 Technology Stack

### 🖥️ Frontend

* React.js / Next.js (SPA)
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
* Redis (OTP & temporary data)
* Passport.js (Local + Google OAuth)
* JWT (Access & Refresh Tokens)
* Bcrypt.js
* Cloudinary
* SSLCommerz (Payment Gateway)
* dotenv

---

## 🗂️ System Architecture Overview

* **Frontend:** SPA (React / Next.js)
* **Backend:** RESTful API (Node.js + Express)
* **Database:** MongoDB
* **Cache:** Redis
* **Authentication:** JWT + OTP
* **Payment:** SSLCommerz
* **Deployment:** Vercel (Frontend & Backend)

---

## 🔄 Use Case: Booking a Tour

1. User registers and verifies account via OTP
2. User logs in
3. User browses and selects a tour
4. Booking is created with **status: pending**
5. User is redirected to SSLCommerz
6. On successful payment, booking is confirmed
7. Invoice URL is generated

---

## ✅ Acceptance Criteria

* Users can register, log in, and book tours
* Admins can manage tours, users, and bookings
* Payments correctly update booking and payment statuses
* All APIs are secured with RBAC
* System meets performance, scalability, and security standards

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/mdshamim125/university-project-tour-management-frontend
cd tour-management-system
```

### 2️⃣ Install Dependencies

```bash
bun install
```

### 3️⃣ Environment Variables

Create a `.env` file and configure required environment variables.

### 4️⃣ Run the Project

```bash
bun dev
```

---

## 🌍 Live URLs

* **Frontend:** [https://tour-management-frontend-seven.vercel.app](https://tour-management-frontend-seven.vercel.app)
* **Backend API:** [https://tour-management-backend-tau.vercel.app](https://tour-management-backend-tau.vercel.app)

---

## 🔑 Demo Credentials

### 👤 User

* **Email:** [cse138093brur@gmail.com](mailto:cse138093brur@gmail.com)
* **Password:** 123qaz!Q

### 🛡️ Admin

* **Email:** [super@gmail.com](mailto:super@gmail.com)
* **Password:** 12345678

---

## 👤 Author

**Md Shamim**
BSc in Computer Science & Engineering
Full-Stack Web Developer

---
