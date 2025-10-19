require('dotenv').config();
const mongoose = require('mongoose');
const Menu = require('../models/Menu');
const fs = require('fs');
const path = require('path');

// Connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for seeding');
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
};

const seedMenu = async () => {
  try {
    // Read the JSON data from root data folder
    const dataPath = path.join(__dirname, '../../../data/indian_cuisine.json');
    
    // Check if file exists
    if (!fs.existsSync(dataPath)) {
      console.error('❌ Data file not found at:', dataPath);
      console.error('Current directory:', __dirname);
      return;
    }
    
    console.log('📁 Reading data from:', dataPath);
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    // Clear existing menu data
    console.log('🗑️ Clearing existing menu data...');
    const deleteResult = await Menu.deleteMany({});
    console.log('Deleted documents:', deleteResult.deletedCount);

    // Create new menu document
    console.log('📝 Creating new menu document...');
    // Don't use the _id from JSON data as it's not a valid ObjectId
    const menu = new Menu({
      categories: data.categories
    });

    const savedMenu = await menu.save();
    console.log('✅ Menu seeded successfully with ID:', savedMenu._id);
    
    // Verify the data was saved
    const verifyMenu = await Menu.findOne();
    if (verifyMenu) {
      console.log('✅ Verification: Menu found in database with', verifyMenu.categories.length, 'categories');
    } else {
      console.log('❌ Verification: No menu found in database after save');
    }
    
    // Display summary
    const totalDishes = data.categories.reduce((total, category) => 
      total + category.dishes.length, 0
    );
    const totalOptions = data.categories.reduce((total, category) => 
      total + category.dishes.reduce((dishTotal, dish) => 
        dishTotal + dish.options.length, 0
      ), 0
    );

    console.log(`📊 Seeded ${data.categories.length} categories, ${totalDishes} dishes, ${totalOptions} options`);
    
  } catch (error) {
    console.error('❌ Seeding error:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
};

const main = async () => {
  console.log('🌱 Starting database seeding...');
  await connectDB();
  await seedMenu();
  console.log('✅ Seeding completed');
};

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { seedMenu };
