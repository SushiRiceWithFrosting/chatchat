import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DrawCardPage.css';
import { intimateQuestions, emotionalQuestions, forFunQuestions } from '../questions';
import swapIcon from '../icons/swap.png'; // Assuming this is your PNG icon

const categories = {
  心情: emotionalQuestions,
  親密: intimateQuestions,
  好玩: forFunQuestions,
};

const DrawCardPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('好玩'); // '好玩' is forFunQuestions category
  const [flipped, setFlipped] = useState(false);
  const [history, setHistory] = useState([0]);
  const questions = categories[selectedCategory];
  const navigate = useNavigate();

  useEffect(() => {
    // Handle scenario when there are no questions for selected category
    if (!questions || questions.length === 0) {
      // You can set an error state or display a message to the user
      console.error('No questions available for selected category');
      return;
    }

    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestionIndex(randomIndex);
    setHistory([randomIndex]);
  }, [selectedCategory, questions]); // Added questions to dependency array

  const handleNext = () => {
    // Handle scenario when there are no questions for selected category
    if (!questions || questions.length === 0) {
      console.error('No questions available for selected category');
      return;
    }

    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestionIndex(randomIndex);
    setHistory((prevHistory) => [...prevHistory, randomIndex]);
    setFlipped(false); // Reset flipped state
  };

  const handlePrev = () => {
    setHistory((prevHistory) => {
      if (prevHistory.length > 1) {
        const newHistory = prevHistory.slice(0, -1);
        setCurrentQuestionIndex(newHistory[newHistory.length - 1]);
        return newHistory;
      }
      return prevHistory;
    });
    setFlipped(false); // Reset flipped state
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    const randomIndex = Math.floor(Math.random() * categories[category].length);
    setCurrentQuestionIndex(randomIndex);
    setHistory([randomIndex]);
    setFlipped(false); // Reset flipped state
  };

  const handleCardClick = () => {
    setFlipped(!flipped); // Toggle flipped state
  };

  return (
    <div className="draw-card-page">
      <div className="top-right-buttons">
        <button className="auth-button" onClick={() => navigate('/login')}>Login</button>
        <button className="auth-button" onClick={() => navigate('/register')}>Register</button>
      </div>
      <div className="category-buttons">
        <button
          key="好玩"
          className={`category-button ${selectedCategory === '好玩' ? 'selected' : ''}`}
          onClick={() => handleCategorySelect('好玩')}
        >
          好玩
        </button>
        {Object.keys(categories)
          .filter((category) => category !== '好玩')
          .map((category) => (
            <button
              key={category}
              className={`category-button ${selectedCategory === category ? 'selected' : ''}`}
              onClick={() => handleCategorySelect(category)}
            >
              {category}
            </button>
          ))}
      </div>
      <div className="question-card" onClick={handleCardClick}>
        {/* Display loading state or handle no questions scenario */}
        {questions && questions.length > 0 ? (
          <div className={`card-content ${flipped ? 'flipped' : ''}`}>
            <div className="card-front">
              <img src={swapIcon} alt="Swap Icon" className={`question-icon ${flipped ? 'flipped-icon' : ''}`} />
              <div className="question-text">{questions[currentQuestionIndex].question}</div>
              <div className="question-subtext">{questions[currentQuestionIndex].example}</div>
            </div>
            <div className="card-back">
              <img src={swapIcon} alt="Flipped Swap Icon" className={`question-icon ${flipped ? 'flipped-icon' : ''}`} />
              <div className="deeper-question">{questions[currentQuestionIndex].deeper}</div>
            </div>
          </div>
        ) : (
          <div className="error-message">No questions available for selected category</div>
        )}
      </div>
      <div className="buttons">
        <button className="question-nav-button" onClick={handlePrev}>&lt;</button>
        <button className="question-nav-button" onClick={handleNext}>&gt;</button>
      </div>
    </div>
  );
};

export default DrawCardPage;
