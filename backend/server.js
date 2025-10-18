require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Ranna Backend Server running on port ${PORT}`);
  console.log(`📖 API available at: http://localhost:${PORT}/api/v1`);
  console.log(`🔍 Health Check: http://localhost:${PORT}/api/v1/health`);
});
