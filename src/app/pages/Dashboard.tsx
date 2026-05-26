import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { transactionService, analyticsService } from '../services/api';
import { Transaction, DashboardStats } from '../types';
import { formatCurrency, formatDate } from '@/lib/utils';
import { DollarSign, TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Skeleton } from '../components/ui/skeleton';

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [statsData, transactionsData] = await Promise.all([
        analyticsService.getDashboardStats(),
        transactionService.getAll(),
      ]);
      setStats(statsData);
      setRecentTransactions(transactionsData.slice(0, 5));
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Balance',
      value: stats?.totalBalance || 0,
      icon: Wallet,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
      iconColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      title: 'Total Income',
      value: stats?.totalIncome || 0,
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950/20',
      iconColor: 'text-green-600 dark:text-green-400',
    },
    {
      title: 'Total Expenses',
      value: stats?.totalExpenses || 0,
      icon: TrendingDown,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50 dark:bg-red-950/20',
      iconColor: 'text-red-600 dark:text-red-400',
    },
    {
      title: 'Savings',
      value: stats?.savings || 0,
      icon: DollarSign,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-950/20',
      iconColor: 'text-purple-600 dark:text-purple-400',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Welcome back! Here's your financial overview
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card key={index} className="border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                {loading ? (
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-8 w-32" />
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                        {card.title}
                      </p>
                      <p className="text-2xl font-bold">{formatCurrency(card.value)}</p>
                    </div>
                    <div className={`${card.bgColor} p-3 rounded-xl`}>
                      <Icon className={`w-6 h-6 ${card.iconColor}`} />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <Skeleton className="h-6 w-20" />
                </div>
              ))}
            </div>
          ) : recentTransactions.length === 0 ? (
            <div className="text-center py-12 text-slate-500 dark:text-slate-400">
              <p>No transactions yet</p>
              <p className="text-sm mt-2">Add your first transaction to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction._id}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div
                    className={`p-2 rounded-full ${
                      transaction.type === 'income'
                        ? 'bg-green-50 dark:bg-green-950/20'
                        : 'bg-red-50 dark:bg-red-950/20'
                    }`}
                  >
                    {transaction.type === 'income' ? (
                      <ArrowUpRight className="w-5 h-5 text-green-600 dark:text-green-400" />
                    ) : (
                      <ArrowDownRight className="w-5 h-5 text-red-600 dark:text-red-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{transaction.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        {transaction.category}
                      </span>
                      <span className="text-sm text-slate-400 dark:text-slate-500">•</span>
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        {formatDate(transaction.date)}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`font-semibold ${
                      transaction.type === 'income'
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {transaction.type === 'income' ? '+' : '-'}
                    {formatCurrency(transaction.amount)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
