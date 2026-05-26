const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getCategoryData,
  getMonthlyData,
} = require('../controllers/analyticsController');
const { protect } = require('../middleware/auth');

router.get('/dashboard-stats', protect, getDashboardStats);
router.get('/category-data', protect, getCategoryData);
router.get('/monthly-data', protect, getMonthlyData);

module.exports = router;
