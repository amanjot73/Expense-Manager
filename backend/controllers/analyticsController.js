const Transaction = require('../models/Transaction');

// @desc    Get dashboard stats
// @route   GET /api/analytics/dashboard-stats
// @access  Private
const getDashboardStats = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const transactions = await Transaction.find({ userId });

    const totalIncome = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalBalance = totalIncome - totalExpenses;
    const savings = totalBalance;

    res.json({
      totalIncome,
      totalExpenses,
      totalBalance,
      savings,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get category-wise data
// @route   GET /api/analytics/category-data
// @access  Private
const getCategoryData = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const expenses = await Transaction.find({ userId, type: 'expense' });

    const categoryMap = {};

    expenses.forEach((t) => {
      if (categoryMap[t.category]) {
        categoryMap[t.category] += t.amount;
      } else {
        categoryMap[t.category] = t.amount;
      }
    });

    const total = Object.values(categoryMap).reduce((sum, val) => sum + val, 0);

    const categoryData = Object.entries(categoryMap).map(([category, amount]) => ({
      category,
      amount,
      percentage: (amount / total) * 100,
    }));

    res.json(categoryData);
  } catch (error) {
    next(error);
  }
};

// @desc    Get monthly data
// @route   GET /api/analytics/monthly-data
// @access  Private
const getMonthlyData = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const year = req.query.year || new Date().getFullYear();

    const transactions = await Transaction.find({
      userId,
      date: {
        $gte: new Date(`${year}-01-01`),
        $lte: new Date(`${year}-12-31`),
      },
    });

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const monthlyData = months.map((month, index) => {
      const monthTransactions = transactions.filter((t) => {
        const date = new Date(t.date);
        return date.getMonth() === index;
      });

      const income = monthTransactions
        .filter((t) => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

      const expenses = monthTransactions
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      return {
        month,
        income,
        expenses,
      };
    });

    res.json(monthlyData);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats,
  getCategoryData,
  getMonthlyData,
};
