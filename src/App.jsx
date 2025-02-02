import React, { useState, useEffect } from 'react';
import "./App.css"

const sampleData = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Venus", "Jupiter"],
    correctAnswer: "Mars",
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "4",
  },
];

function App() {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  
  useEffect(() => {
    const fetchQuizData = async (req, res) => {
      try {
        const response = fetch('https://api.jsonserve.com/Uw5CrX');
        const data = await response.json();
        setQuizData(data);
      } catch (error) {
        console.error("Error fetching quiz data, using fallback data.");
        setQuizData(sampleData);
      }
    };
    fetchQuizData();
  }, []);

  const handleStartQuiz = () => {
    setIsQuizStarted(true);
    setIsQuizCompleted(false);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setScore(0);
  };

  const handleAnswer = (answer) => {
    setUserAnswers([...userAnswers, answer]);
    if (quizData[currentQuestionIndex].correctAnswer === answer) {
      setScore(score + 1);
    }
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const handleResetQuiz = () => {
    handleStartQuiz();
  };

  const getQuizResult = () => {
    return (
      <div>
        <h2>Quiz Completed!</h2>
        <p>Your score: {score} / {quizData.length}</p>
        <button onClick={handleResetQuiz}>Restart Quiz</button>
      </div>
    );
  };

  const renderQuiz = () => {
    const currentQuestion = quizData[currentQuestionIndex];
    return (
      <div>
        <h2>{currentQuestion.question}</h2>
        {currentQuestion.options.map((option, index) => (
          <button key={index} onClick={() => handleAnswer(option)}>
            {option}
          </button>
        ))}
      </div>
    );
  };

  return (
      
      <div className="APP">
        <h1>Quiz Application</h1>
        {!isQuizStarted && !isQuizCompleted && (
          <button onClick={handleStartQuiz}>Start Quiz</button>
        )}
        {isQuizStarted && !isQuizCompleted && renderQuiz()}
        {isQuizCompleted && getQuizResult()}
      </div>
    
  );
}

export default App;



