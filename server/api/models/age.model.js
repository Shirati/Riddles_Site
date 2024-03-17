const { default: mongoose } = require("mongoose");

// Create a schema for Difficulty
const AgeSchema = new mongoose.Schema({
  age_range: String,
 
});
module.exports = mongoose.model('Age', AgeSchema);