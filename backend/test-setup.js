// Quick setup verification script
require('dotenv').config();

console.log('🔍 Verifying Ranna Backend V1.0 Setup...\n');

// Check environment variables
const requiredEnvVars = ['NODE_ENV', 'PORT', 'MONGODB_URI'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.log('❌ Missing environment variables:', missingEnvVars.join(', '));
  console.log('📝 Please check your .env file');
} else {
  console.log('✅ Environment variables configured');
}

// Test imports
try {
  require('./src/app');
  console.log('✅ App module loads successfully');
} catch (error) {
  console.log('❌ App module error:', error.message);
}

try {
  require('./src/models/Menu');
  console.log('✅ Menu model loads successfully');
} catch (error) {
  console.log('❌ Menu model error:', error.message);
}

try {
  require('./src/controllers/menuController');
  console.log('✅ Menu controller loads successfully');
} catch (error) {
  console.log('❌ Menu controller error:', error.message);
}

console.log('\n🚀 Backend setup complete!');
console.log('📋 Next steps:');
console.log('   1. Start MongoDB and Redis services');
console.log('   2. Run: npm run dev');
console.log('   3. Run: npm run seed (to populate database)');
console.log('   4. Test: curl http://localhost:5000/api/v1/health');
