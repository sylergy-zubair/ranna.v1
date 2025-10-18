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
    // Read the JSON data from frontend
    const dataPath = path.join(__dirname, '../../frontend/public/data/indian_cuisine.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    // Clear existing menu data
    await Menu.deleteMany({});

    // Create new menu document
    const menu = new Menu({
      _id: data._id || new mongoose.Types.ObjectId(),
      categories: data.categories
    });

    await menu.save();
    console.log('✅ Menu seeded successfully');
    
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
    console.error('Seeding error:', error);
  } finally {
    mongoose.connection.close();
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
