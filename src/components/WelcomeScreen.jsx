/* eslint-disable react/prop-types */

// import React from 'react';
import './WelcomeScreen.css';

function WelcomeScreen({ onStart }) {
  return (
    <div className="welcome-screen">
      <h1>Welcome to our Customer Survey</h1>
      <p>We value your feedback!</p>
      <button onClick={onStart} className="start-button">Start Survey</button>
    </div>
  );
}

export default WelcomeScreen;