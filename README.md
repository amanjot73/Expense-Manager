# Expense Tracker - Full Stack Application

A modern, full-stack personal finance management system built with React, Node.js, Express, and MongoDB. Track income and expenses, analyze spending habits, and visualize financial data through interactive charts and dashboards.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)
![Node](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb)

## Features

### Authentication
- ✅ User signup and login
- ✅ JWT-based authentication
- ✅ Protected routes
- ✅ Secure password hashing with bcrypt

### Dashboard
- ✅ Total balance overview
- ✅ Income and expense summaries
- ✅ Savings tracking
- ✅ Recent transactions display
- ✅ Real-time financial statistics

### Transaction Management
- ✅ Add, edit, and delete transactions
- ✅ Income and expense categorization
- ✅ Date-based transaction entries
- ✅ Description and amount tracking
- ✅ Transaction history with filters

### Analytics & Insights
- ✅ Category-wise expense breakdown (Pie Chart)
- ✅ Monthly spending trends (Bar Chart)
- ✅ Income vs Expenses comparison (Line Chart)
- ✅ Interactive data visualizations with Recharts
- ✅ Percentage-based category analysis

### Advanced Features
- ✅ Advanced filtering (by type, category, date range)
- ✅ Search functionality
- ✅ Dark/Light mode toggle
- ✅ Fully responsive design
- ✅ Toast notifications
- ✅ Loading states and skeletons
- ✅ Form validation

## Tech Stack

### Frontend
- **React.js 18.3.1** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Utility-first CSS framework
- **ShadCN UI** - Component library built on Radix UI
- **Recharts** - Data visualization library
- **Axios** - HTTP client
- **React Hook Form** - Form management
- **next-themes** - Theme management
- **Sonner** - Toast notifications
- **Lucide React** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

## Project Structure

```
expense-tracker/
├── src/                          # Frontend source code
│   ├── app/
│   │   ├── components/
│   │   │   ├── ui/              # ShadCN UI components
│   │   │   └── features/        # Feature components
│   │   ├── contexts/            # React contexts
│   │   ├── pages/               # Page components
│   │   ├── services/            # API services
│   │   ├── types/               # TypeScript types
│   │   └── App.tsx              # Main app component
│   ├── lib/                      # Utility functions
│   └── styles/                   # CSS styles
├── backend/                      # Backend source code (see BACKEND_CODE.md)
│   ├── config/                  # Configuration files
│   ├── controllers/             # Route controllers
│   ├── middleware/              # Custom middleware
│   ├── models/                  # Mongoose models
│   ├── routes/                  # API routes
│   └── server.js                # Entry point
└── README.md
```

