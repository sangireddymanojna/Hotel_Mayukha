# HOTEL MAYUKHA - Enterprise Hospitality Platform

![Hotel Mayukha Banner](https://www.hotelmayukha.com/wp-content/uploads/2022/03/cropped-whitesmall.png)

A modern, responsive, conversion-driven digital presence and operations management platform for **Hotel Mayukha** — premier dining, banquet, and hospitality destination in Hyderabad, Telangana, India.

---

## 📌 Project Information

- **Client**: Hotel Mayukha (Hyderabad, Telangana, India)
- **Developer**: Manojna Sangireddy (Full Stack Web Development - MERN Cohort)
- **Allocation Date**: 28 September 2026
- **Target Production Deadline**: 05 October 2026
- **Official Client Reference**: [https://www.hotelmayukha.com/](https://www.hotelmayukha.com/)

---

## 🛠️ Technology Stack

- **Frontend**: Next.js 14+ (App Router), React 18+, TypeScript, Tailwind CSS, Lucide React, Framer Motion, Radix UI
- **Backend**: Node.js, Express.js, JWT Authentication, Helmet, CORS, Express Rate Limit, Mongo-Sanitize, Zod
- **Database**: MongoDB Atlas (Mongoose ODM)
- **Deployment**: Vercel (Frontend), Render / Railway / Vercel (Backend API)

---

## 📁 Repository & Architecture Structure

```
hotel-mayukha/
├── frontend/             # Next.js App Router Frontend
│   ├── app/              # App router pages & layouts
│   │   ├── (public)/     # Public client pages (menu, reserve, banquets, gallery, contact)
│   │   └── admin/        # Admin portal pages (reservations, menu, banquets)
│   ├── components/       # UI, Menu, Reservation & Layout components
│   ├── lib/              # API Client & Utility functions
│   └── types/            # TypeScript Interface definitions
├── backend/              # Node.js & Express REST API Server
│   ├── src/
│   │   ├── config/       # MongoDB connection & env configurations
│   │   ├── controllers/  # Route controller logic
│   │   ├── middleware/   # Authentication, rate limiting & error handling
│   │   ├── models/       # Mongoose Schemas (User, Menu, Reservation, Banquet, Testimonial, AuditLog)
│   │   ├── routes/       # Express route handlers
│   │   ├── services/     # Business logic & email services
│   │   └── utils/        # Seeders & helper functions
│   └── server.js         # API server entry point
├── .env.example          # Environment variables template
└── README.md             # Project documentation
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js v18.0.0 or higher
- npm v9.0.0 or higher
- MongoDB Atlas cluster URI or local MongoDB instance

### 2. Installation & Running Locally

#### Setup Backend API:
```bash
cd backend
npm install
cp .env.example .env # Update MONGODB_URI and JWT_SECRET
npm run seed        # Seed initial menu categories and admin user
npm run dev         # Starts server on http://localhost:5000
```

#### Setup Frontend Web Application:
```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev         # Starts Next.js app on http://localhost:3000
```

---

## 🔐 Core Capabilities

1. **Interactive Digital Menu Explorer**: Filter by diet (Veg/Non-Veg), spice level, category, and real-time search.
2. **Table Reservation Engine**: Instant booking code generation (`MYK-RES-2026-XXXX`), seat count, timing slots, status tracking.
3. **Banquet & Event Booking Inquiry**: Corporate events, weddings, birthdays, and outdoor catering inquiries.
4. **Ambience & Culinary Showcase**: Dynamic visual gallery with high-grade responsive media lazy-loading.
5. **Verified Customer Testimonials**: Ratings, reviews, and interactive guest feedback collection.
6. **Secure Admin Operations Portal (`/admin`)**: JWT authentication, reservation manager, banquet lead processing, menu CRUD operations.

---

© 2026 Hotel Mayukha | Designed & Engineered by Manojna Sangireddy.
