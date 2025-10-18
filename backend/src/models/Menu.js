const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  option_id: { type: String, required: true },
  option_name: { type: String, required: true },
  short_description: String,
  detailed_description: String,
  price: { type: Number, required: true },
  dish_type: [String],
  ingredients: [String],
  allergens: [String],
  calorie_range: String,
  nutrition: {
    energy_kj: Number,
    energy_kcal: Number,
    fat: Number,
    of_which_saturates: Number,
    carbohydrate: Number,
    of_which_sugars: Number,
    protein: Number,
    salt: Number,
    total_weight_grams: Number
  }
}, { _id: false });

const dishSchema = new mongoose.Schema({
  dish_id: { type: String, required: true },
  dish_title: { type: String, required: true },
  spice_level: { type: Number, min: 1, max: 4 },
  image_url: String,
  options: [optionSchema]
}, { _id: false });

const categorySchema = new mongoose.Schema({
  category_id: { type: String, required: true },
  category: { type: String, required: true },
  dishes: [dishSchema]
}, { _id: false });

const menuSchema = new mongoose.Schema({
  categories: [categorySchema]
}, {
  timestamps: true
});

// Index for better query performance
menuSchema.index({ 'categories.category': 1 });
menuSchema.index({ 'categories.dishes.spice_level': 1 });
menuSchema.index({ 'categories.dishes.options.dish_type': 1 });
menuSchema.index({ 'categories.dishes.options.calorie_range': 1 });

module.exports = mongoose.model('Menu', menuSchema);
