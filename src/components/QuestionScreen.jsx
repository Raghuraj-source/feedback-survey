/* eslint-disable react/prop-types */

// import React from 'react';
import './QuestionScreen.css';

function QuestionScreen({ question, totalQuestions, currentIndex, onAnswer, onNext, onPrev, answer }) {
  return (
    <div className="question-screen">
      <h2 className="survey-title">Customer Survey</h2>
      <div className="question-number">{currentIndex + 1}/{totalQuestions}</div>
      <p className="question-text">{currentIndex + 1}. {question.text}</p>
      {question.type === 'rating' && (
        <div className="rating">
          {[...Array(question.max - question.min + 1)].map((_, i) => (
            <button
              key={i}
              onClick={() => onAnswer(question.id, (i + question.min).toString())}
              className={`rating-button ${answer === (i + question.min).toString() ? 'selected' : ''}`}
            >
              {i + question.min}
            </button>
          ))}
        </div>
      )}
      {question.type === 'text' && (
        <textarea 
          value={answer || ''} 
          onChange={(e) => onAnswer(question.id, e.target.value)} 
          rows={4} 
          cols={50} 
          className="text-input"
        />
      )}
      <div className="navigation">
        <button onClick={onPrev} className="nav-button prev" disabled={currentIndex === 0}>Prev</button>
        <button onClick={onNext} className="nav-button next">
          {currentIndex === totalQuestions - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
}

export default QuestionScreen;