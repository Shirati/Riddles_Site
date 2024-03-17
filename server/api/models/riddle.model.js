const { default: mongoose } = require("mongoose");

// Create a schema for Riddle
const RiddleSchema = new mongoose.Schema({
  riddlename: String,
  question:String,
  solution:String,
  subjectId:{type:mongoose.Schema.Types.ObjectId,require:true,ref:'Subject'},
  difficultyId:{type:mongoose.Schema.Types.ObjectId,require:true,ref:'Difficulty'},
  ageId:{type:mongoose.Schema.Types.ObjectId,require:true,ref:'Age'},
  image:{type:String}

 
});
module.exports = mongoose.model('Riddle',  RiddleSchema);