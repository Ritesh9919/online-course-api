import mongoose from "mongoose";



const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ 
    text: String, 
    isCorrect: Boolean 
  }]
});

const quizSchema = new mongoose.Schema({
  lesson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
    required: true,
    unique: true
  },
  questions: [questionSchema]
});

export const Quiz = mongoose.model('Quiz', quizSchema);