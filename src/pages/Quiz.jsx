import React, { useState } from 'react';

function Quiz({ quizData, onComplete }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  if (!quizData) {
    return <p className="text-center text-red-400">Quiz data is not available.</p>;
  }

  const { question, options, correctAnswerIndex } = quizData;

 
  const handleSelectAnswer = (index) => {
    if (!submitted) {
      setSelectedAnswer(index);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) {
        alert("Please select an answer before submitting."); 
        return;
    }
    setSubmitted(true);
    const isCorrect = selectedAnswer === correctAnswerIndex;
    
    setTimeout(() => {
        onComplete(isCorrect);
    }, 1500); 
  };

  return (
    <div className="p-4 rounded-lg text-white w-full">
      <h3 className="text-xl font-semibold mb-4 text-purple-300">{question}</h3>
      <div className="space-y-3 mb-6">
        {options.map((option, index) => {
          let buttonClass = "w-full text-left p-3 rounded-lg transition-all duration-200 ease-in-out border-2 ";
          if (submitted) {
            if (index === correctAnswerIndex) {
              buttonClass += "bg-green-500 border-green-700 text-white";
            } else if (index === selectedAnswer) {
              buttonClass += "bg-red-500 border-red-700 text-white";
            } else {
              buttonClass += "bg-gray-700 border-gray-600 hover:bg-gray-600 opacity-70";
            }
          } else {
            buttonClass += (selectedAnswer === index ? "bg-purple-600 border-purple-800" : "bg-gray-700 border-gray-600 hover:bg-purple-500 hover:border-purple-700");
          }

          return (
            <button
              key={index}
              onClick={() => handleSelectAnswer(index)}
              disabled={submitted}
              className={buttonClass}
            >
              {option}
            </button>
          );
        })}
      </div>
      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={selectedAnswer === null}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
        >
          Submit Answer
        </button>
      ) : (
        <div className={`text-center font-semibold p-3 rounded-lg ${selectedAnswer === correctAnswerIndex ? 'bg-green-600' : 'bg-red-600'}`}>
          {selectedAnswer === correctAnswerIndex ? "Correct! Well done!" : `Incorrect. The correct answer was: ${options[correctAnswerIndex]}`}
        </div>
      )}
    </div>
  );
}
export default Quiz