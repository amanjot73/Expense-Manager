import axios from 'axios';
import { AuthResponse, Transaction, DashboardStats, CategoryData, MonthlyData } from '../types';

// Set this to your deployed backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Use mock data for demonstration (set to false when backend is deployed)
const USE_MOCK_DATA = true;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Mock data for demonstration
const mockUser = {
  _id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  createdAt: new Date().toISOString(),
};

const mockTransactions: Transaction[] = [
  { _id: '1', userId: '1', type: 'income', category: 'Salary', amount: 5000, description: 'Monthly salary', date: '2026-05-01', createdAt: '2026-05-01', updatedAt: '2026-05-01' },
  { _id: '2', userId: '1', type: 'expense', category: 'Food', amount: 450, description: 'Groceries', date: '2026-05-05', createdAt: '2026-05-05', updatedAt: '2026-05-05' },
  { _id: '3', userId: '1', type: 'expense', category: 'Shopping', amount: 200, description: 'Clothes', date: '2026-05-10', createdAt: '2026-05-10', updatedAt: '2026-05-10' },
  { _id: '4', userId: '1', type: 'expense', category: 'Bills', amount: 800, description: 'Rent', date: '2026-05-01', createdAt: '2026-05-01', updatedAt: '2026-05-01' },
  { _id: '5', userId: '1', type: 'income', category: 'Freelancing', amount: 1200, description: 'Web design project', date: '2026-05-15', createdAt: '2026-05-15', updatedAt: '2026-05-15' },
  { _id: '6', userId: '1', type: 'expense', category: 'Entertainment', amount: 150, description: 'Movie and dinner', date: '2026-05-12', createdAt: '2026-05-12', updatedAt: '2026-05-12' },
  { _id: '7', userId: '1', type: 'expense', category: 'Travel', amount: 600, description: 'Weekend trip', date: '2026-05-20', createdAt: '2026-05-20', updatedAt: '2026-05-20' },
  { _id: '8', userId: '1', type: 'expense', category: 'Health', amount: 100, description: 'Gym membership', date: '2026-05-03', createdAt: '2026-05-03', updatedAt: '2026-05-03' },
  { _id: '9', userId: '1', type: 'income', category: 'Business', amount: 800, description: 'Consulting fee', date: '2026-05-18', createdAt: '2026-05-18', updatedAt: '2026-05-18' },
  { _id: '10', userId: '1', type: 'expense', category: 'Food', amount: 250, description: 'Restaurants', date: '2026-05-22', createdAt: '2026-05-22', updatedAt: '2026-05-22' },
];

let mockDataStore = [...mockTransactions];
let nextId = 11;

// Mock API helper
const mockDelay = () => new Promise(resolve => setTimeout(resolve, 300));

// Auth Service
export const authService = {
  async login(credentials: { email: string; password: string }): Promise<AuthResponse> {
    if (USE_MOCK_DATA) {
      await mockDelay();
      return {
        token: 'mock-jwt-token-' + Date.now(),
        user: mockUser,
      };
    }
    const { data } = await api.post('/auth/login', credentials);
    return data;
  },

  async signup(userData: { name: string; email: string; password: string }): Promise<AuthResponse> {
    if (USE_MOCK_DATA) {
      await mockDelay();
      return {
        token: 'mock-jwt-token-' + Date.now(),
        user: { ...mockUser, name: userData.name, email: userData.email },
      };
    }
    const { data } = await api.post('/auth/signup', userData);
    return data;
  },
};

// Transaction Service
export const transactionService = {
  async getAll(filters?: { type?: string; category?: string; startDate?: string; endDate?: string; search?: string }): Promise<Transaction[]> {
    if (USE_MOCK_DATA) {
      await mockDelay();
      let filtered = [...mockDataStore];

      if (filters?.type) {
        filtered = filtered.filter(t => t.type === filters.type);
      }
      if (filters?.category) {
        filtered = filtered.filter(t => t.category === filters.category);
      }
      if (filters?.search) {
        filtered = filtered.filter(t =>
          t.description.toLowerCase().includes(filters.search!.toLowerCase()) ||
          t.category.toLowerCase().includes(filters.search!.toLowerCase())
        );
      }
      if (filters?.startDate) {
        filtered = filtered.filter(t => new Date(t.date) >= new Date(filters.startDate!));
      }
      if (filters?.endDate) {
        filtered = filtered.filter(t => new Date(t.date) <= new Date(filters.endDate!));
      }

      return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    const { data } = await api.get('/transactions', { params: filters });
    return data;
  },

  async getById(id: string): Promise<Transaction> {
    if (USE_MOCK_DATA) {
      await mockDelay();
      const transaction = mockDataStore.find(t => t._id === id);
      if (!transaction) throw new Error('Transaction not found');
      return transaction;
    }
    const { data } = await api.get(`/transactions/${id}`);
    return data;
  },

  async create(transaction: Omit<Transaction, '_id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<Transaction> {
    if (USE_MOCK_DATA) {
      await mockDelay();
      const newTransaction: Transaction = {
        ...transaction,
        _id: String(nextId++),
        userId: '1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      mockDataStore.unshift(newTransaction);
      return newTransaction;
    }
    const { data } = await api.post('/transactions', transaction);
    return data;
  },

  async update(id: string, transaction: Partial<Transaction>): Promise<Transaction> {
    if (USE_MOCK_DATA) {
      await mockDelay();
      const index = mockDataStore.findIndex(t => t._id === id);
      if (index === -1) throw new Error('Transaction not found');
      mockDataStore[index] = {
        ...mockDataStore[index],
        ...transaction,
        updatedAt: new Date().toISOString(),
      };
      return mockDataStore[index];
    }
    const { data } = await api.put(`/transactions/${id}`, transaction);
    return data;
  },

  async delete(id: string): Promise<void> {
    if (USE_MOCK_DATA) {
      await mockDelay();
      mockDataStore = mockDataStore.filter(t => t._id !== id);
      return;
    }
    await api.delete(`/transactions/${id}`);
  },
};

// Analytics Service
export const analyticsService = {
  async getDashboardStats(): Promise<DashboardStats> {
    if (USE_MOCK_DATA) {
      await mockDelay();
      const income = mockDataStore.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
      const expenses = mockDataStore.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
      return {
        totalIncome: income,
        totalExpenses: expenses,
        totalBalance: income - expenses,
        savings: income - expenses,
      };
    }
    const { data } = await api.get('/analytics/dashboard-stats');
    return data;
  },

  async getCategoryData(): Promise<CategoryData[]> {
    if (USE_MOCK_DATA) {
      await mockDelay();
      const expenses = mockDataStore.filter(t => t.type === 'expense');
      const categoryMap = new Map<string, number>();

      expenses.forEach(t => {
        categoryMap.set(t.category, (categoryMap.get(t.category) || 0) + t.amount);
      });

      const total = Array.from(categoryMap.values()).reduce((sum, val) => sum + val, 0);

      return Array.from(categoryMap.entries()).map(([category, amount]) => ({
        category,
        amount,
        percentage: (amount / total) * 100,
      }));
    }
    const { data } = await api.get('/analytics/category-data');
    return data;
  },

  async getMonthlyData(year: number): Promise<MonthlyData[]> {
    if (USE_MOCK_DATA) {
      await mockDelay();
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return months.map((month, index) => {
        const monthTransactions = mockDataStore.filter(t => {
          const date = new Date(t.date);
          return date.getMonth() === index;
        });

        return {
          month,
          income: monthTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0),
          expenses: monthTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0),
        };
      });
    }
    const { data } = await api.get('/analytics/monthly-data', { params: { year } });
    return data;
  },
};

export default api;
