export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface Transaction {
  _id: string;
  userId: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface DashboardStats {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  savings: number;
}

export interface CategoryData {
  category: string;
  amount: number;
  percentage: number;
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
}

export const CATEGORIES = {
  expense: ['Food', 'Shopping', 'Bills', 'Travel', 'Entertainment', 'Health', 'Others'],
  income: ['Salary', 'Freelancing', 'Business', 'Investment', 'Others']
};
