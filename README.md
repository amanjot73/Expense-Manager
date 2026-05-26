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

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or pnpm
- MongoDB Atlas account (or local MongoDB installation)

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd expense-tracker
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Configure environment variables**
   
   The frontend is currently set to use mock data for demonstration. To connect to your backend:
   
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Update API configuration**
   
   In `src/app/services/api.ts`, change:
   ```typescript
   const USE_MOCK_DATA = false;  // Set to false to use real backend
   ```

5. **Start the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

### Backend Setup

1. **Create backend folder and files**
   
   All backend code is provided in `BACKEND_CODE.md`. Follow these steps:
   
   ```bash
   # Create backend directory
   mkdir backend
   cd backend
   ```

2. **Copy all files from BACKEND_CODE.md**
   
   Open `BACKEND_CODE.md` and copy each code section into its respective file according to the folder structure shown in the file.

3. **Install backend dependencies**
   ```bash
   npm install
   ```

4. **Set up MongoDB Atlas**
   
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster
   - Create a database user
   - Get your connection string
   - Whitelist your IP address (or allow access from anywhere for development)

5. **Configure environment variables**
   
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

   Update `.env` with your values:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/expense_tracker
   JWT_SECRET=your_super_secret_jwt_key_change_this
   JWT_EXPIRE=7d
   CORS_ORIGIN=http://localhost:5173
   ```

6. **Start the backend server**
   ```bash
   npm run dev
   # or for production
   npm start
   ```

   The API will be available at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Transactions
- `GET /api/transactions` - Get all transactions (protected, supports filters)
- `POST /api/transactions` - Create transaction (protected)
- `GET /api/transactions/:id` - Get single transaction (protected)
- `PUT /api/transactions/:id` - Update transaction (protected)
- `DELETE /api/transactions/:id` - Delete transaction (protected)

### Analytics
- `GET /api/analytics/dashboard-stats` - Get dashboard statistics (protected)
- `GET /api/analytics/category-data` - Get category breakdown (protected)
- `GET /api/analytics/monthly-data?year=2026` - Get monthly data (protected)

## Default Categories

### Expense Categories
- Food
- Shopping
- Bills
- Travel
- Entertainment
- Health
- Others

### Income Categories
- Salary
- Freelancing
- Business
- Investment
- Others

## Screenshots

### Dashboard
![Dashboard](screenshots/dashboard.png)

### Transactions
![Transactions](screenshots/transactions.png)

### Analytics
![Analytics](screenshots/analytics.png)

## Development Features

### Mock Data Mode
The frontend includes a mock data mode for development and demonstration:
- Predefined transactions and user data
- All CRUD operations work with in-memory storage
- No backend required for initial testing
- Easy toggle in `src/app/services/api.ts`

### Dark Mode
- System-aware theme detection
- Manual toggle in sidebar
- Persistent theme preference
- Tailwind CSS dark mode classes

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Collapsible sidebar for mobile
- Touch-friendly interfaces

## Testing the Application

### Using Mock Data (No Backend Required)
1. Start the frontend: `pnpm dev`
2. Login with any email and password
3. Explore all features with pre-populated data

### Using Real Backend
1. Set up MongoDB Atlas
2. Start backend: `cd backend && npm run dev`
3. Update frontend API configuration
4. Start frontend: `pnpm dev`
5. Register a new account or login

## Production Deployment

### Frontend Deployment (Vercel/Netlify)
1. Build the frontend:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your hosting service

3. Set environment variable:
   ```
   VITE_API_URL=https://your-backend-url.com/api
   ```

### Backend Deployment (Railway/Render/Heroku)
1. Push your backend code to GitHub

2. Connect to your hosting service

3. Set environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `CORS_ORIGIN` (your frontend URL)
   - `NODE_ENV=production`

4. Deploy and get your API URL

## Environment Variables Reference

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
```

## Troubleshooting

### Frontend Issues
- **API calls failing**: Check if `USE_MOCK_DATA` is set correctly in `api.ts`
- **CORS errors**: Ensure backend `CORS_ORIGIN` matches frontend URL
- **Build errors**: Clear `node_modules` and reinstall: `rm -rf node_modules && pnpm install`

### Backend Issues
- **Database connection failed**: Check MongoDB URI and network access
- **JWT errors**: Ensure `JWT_SECRET` is set in `.env`
- **Port already in use**: Change `PORT` in `.env` or kill the process

## Future Enhancements

- [ ] CSV export functionality
- [ ] Recurring transactions
- [ ] Budget goals and tracking
- [ ] AI-powered spending insights
- [ ] Multi-currency support
- [ ] Receipt upload and OCR
- [ ] Email notifications
- [ ] Two-factor authentication
- [ ] Data backup and restore

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository.

## Acknowledgments

- [ShadCN UI](https://ui.shadcn.com/) for beautiful components
- [Recharts](https://recharts.org/) for data visualization
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [MongoDB](https://www.mongodb.com/) for database
- [Express.js](https://expressjs.com/) for backend framework

---

**Built with ❤️ using React, Node.js, Express, and MongoDB**
