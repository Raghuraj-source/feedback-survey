/* eslint-disable no-undef */

import  { useState, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import QuestionScreen from './components/QuestionScreen';
import ThankYouScreen from './components/ThankYouScreen';
import ConfirmationDialog from './components/ConfirmationDialog';

const questions = [
  { id: 1, text: "How satisfied are you with our products?", type: "rating", min: 1, max: 5 },
  { id: 2, text: "How fair are the prices compared to similar retailers?", type: "rating", min: 1, max: 5 },
  { id: 3, text: "How satisfied are you with the value for money of your purchase?", type: "rating", min: 1, max: 5 },
  { id: 4, text: "On a scale of 1-10 how would you recommend us to your friends and family?", type: "rating", min: 1, max: 10 },
  { id: 5, text: "What could we do to improve our service?", type: "text" }
];

function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    if (currentScreen === 'question') {
      setSessionId(Date.now().toString());
    }
  }, [currentScreen]);

  const startSurvey = () => {
    setCurrentScreen('question');
  };

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowConfirmation(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const submitSurvey = () => {
    const surveyData = {
      sessionId,
      answers,
      completed: true,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem(`survey_${sessionId}`, JSON.stringify(surveyData));
    setCurrentScreen('thankYou');
    setTimeout(() => {
      setCurrentScreen('welcome');
      setCurrentQuestionIndex(0);
      setAnswers({});
      setSessionId(null);
    }, 5000);
  };

  return (
    <div className="App">
      {currentScreen === 'welcome' && <WelcomeScreen onStart={startSurvey} />}
      {currentScreen === 'question' && (
        <QuestionScreen
          question={questions[currentQuestionIndex]}
          totalQuestions={questions.length}
          currentIndex={currentQuestionIndex}
          onAnswer={handleAnswer}
          onNext={nextQuestion}
          onPrev={prevQuestion}
          answer={answers[questions[currentQuestionIndex].id]}
        />
      )}
      {currentScreen === 'thankYou' && <ThankYouScreen />}
      {showConfirmation && (
        <ConfirmationDialog
          onConfirm={() => {
            setShowConfirmation(false);
            submitSurvey();
          }}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
    </div>
  );
}

export default App;