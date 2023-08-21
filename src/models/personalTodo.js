const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personalTodoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed'], 
    default: 'pending', 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PersonalTodo = mongoose.model('PersonalTodo', personalTodoSchema);

module.exports = PersonalTodo;
