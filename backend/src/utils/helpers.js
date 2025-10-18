// Utility helper functions

const formatResponse = (success, data = null, message = '', error = null) => {
  const response = {
    success,
    timestamp: new Date().toISOString()
  };

  if (data !== null) response.data = data;
  if (message) response.message = message;
  if (error) response.error = error;

  return response;
};

const generateCacheKey = (prefix, params = {}) => {
  const sortedParams = Object.keys(params)
    .sort()
    .reduce((result, key) => {
      result[key] = params[key];
      return result;
    }, {});
  
  return `${prefix}:${JSON.stringify(sortedParams)}`;
};

const sanitizeMongoResponse = (data) => {
  if (!data) return data;
  
  // Remove __v and convert _id to string if present
  const sanitizeObject = (obj) => {
    if (obj && typeof obj === 'object') {
      if (obj._id && typeof obj._id.toString === 'function') {
        obj._id = obj._id.toString();
      }
      if (obj.__v !== undefined) {
        delete obj.__v;
      }
      
      // Recursively sanitize nested objects and arrays
      Object.keys(obj).forEach(key => {
        if (Array.isArray(obj[key])) {
          obj[key] = obj[key].map(item => sanitizeObject(item));
        } else if (obj[key] && typeof obj[key] === 'object') {
          obj[key] = sanitizeObject(obj[key]);
        }
      });
    }
    return obj;
  };

  if (Array.isArray(data)) {
    return data.map(item => sanitizeObject(item));
  }
  
  return sanitizeObject(data);
};

module.exports = {
  formatResponse,
  generateCacheKey,
  sanitizeMongoResponse
};
