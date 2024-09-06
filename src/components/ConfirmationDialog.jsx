/* eslint-disable react/prop-types */

// import React from 'react';
import './ConfirmationDialog.css';

function ConfirmationDialog({ onConfirm, onCancel }) {
  return (
    <div className="confirmation-overlay">
      <div className="confirmation-dialog">
        <h2>Submit Survey</h2>
        <p>Are you sure you want to submit the survey?</p>
        <div className="confirmation-buttons">
          <button onClick={onConfirm} className="confirm-button">Yes, submit</button>
          <button onClick={onCancel} className="cancel-button">No, go back</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationDialog;