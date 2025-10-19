const menuService = require('../services/menuService');
const CONSTANTS = require('../utils/constants');

// Get full menu
const getMenu = async (req, res) => {
  try {
    const result = await menuService.getFullMenu();
    
    if (result.success) {
      res.status(CONSTANTS.STATUS.SUCCESS).json(result);
    } else {
      res.status(CONSTANTS.STATUS.NOT_FOUND).json(result);
    }
  } catch (error) {
    console.error('Controller error - getMenu:', error);
    res.status(CONSTANTS.STATUS.INTERNAL_ERROR).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to retrieve menu'
    });
  }
};

// Get filtered menu
const getFilteredMenu = async (req, res) => {
  try {
    const filters = req.query;
    const result = await menuService.getFilteredMenu(filters);
    
    if (result.success) {
      res.status(CONSTANTS.STATUS.SUCCESS).json(result);
    } else {
      res.status(CONSTANTS.STATUS.BAD_REQUEST).json(result);
    }
  } catch (error) {
    console.error('Controller error - getFilteredMenu:', error);
    res.status(CONSTANTS.STATUS.INTERNAL_ERROR).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to filter menu'
    });
  }
};

// Get available filter options
const getFilterOptions = async (req, res) => {
  try {
    const result = await menuService.getFilterOptions();
    
    if (result.success) {
      res.status(CONSTANTS.STATUS.SUCCESS).json(result);
    } else {
      res.status(CONSTANTS.STATUS.INTERNAL_ERROR).json(result);
    }
  } catch (error) {
    console.error('Controller error - getFilterOptions:', error);
    res.status(CONSTANTS.STATUS.INTERNAL_ERROR).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to get filter options'
    });
  }
};

// Health check
const healthCheck = async (req, res) => {
  const mongoose = require('mongoose');
  
  const dbStatus = mongoose.connection.readyState;
  const dbStates = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };

  const health = {
    success: true,
    message: 'Ranna Backend API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    database: {
      status: dbStates[dbStatus],
      connected: dbStatus === 1,
      host: mongoose.connection.host || 'unknown',
      name: mongoose.connection.name || 'unknown'
    }
  };

  res.status(CONSTANTS.STATUS.SUCCESS).json(health);
};

module.exports = {
  getMenu,
  getFilteredMenu,
  getFilterOptions,
  healthCheck
};
