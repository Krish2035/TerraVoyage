import React, { useState } from 'react';
import { HelpCircle, X, CheckCircle, XCircle, Award, RotateCcw, Sparkles, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS } from '../services/travelIntelligenceData';

export default function WanderlustQuizModal({ isOpen, onClose, country }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen) return null;

  // Filter or prioritize questions related to current country if available
  const questions = country 
    ? [...QUIZ_QUESTIONS.filter(q => q.country === country.name), ...QUIZ_QUESTIONS.filter(q => q.country !== country.name)].slice(0, 5)
    : QUIZ_QUESTIONS.slice(0, 5);

  const currentQ = questions[currentIdx] || questions[0];

  const handleSelectOption = (idx) => {
    if (isAnswered) return;
    setSelectedAnswer(idx);
    setIsAnswered(true);

    if (idx === currentQ.answer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
      if (score >= 3) {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
        // Save Quiz Stamp to Passport
        try {
          const stamps = JSON.parse(localStorage.getItem('terra_voyage_quiz_stamps') || '[]');
          stamps.push({
            date: new Date().toLocaleDateString(),
            score: `${score + (selectedAnswer === currentQ.answer ? 1 : 0)}/5`,
            title: 'Master Cartographer Stamp'
          });
          localStorage.setItem('terra_voyage_quiz_stamps', JSON.stringify(stamps));
        } catch (e) {}
      }
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="quiz-modal-card glass-panel animate-scale-in"
        onClick={(e) => e.stopPropagation()}
        id="wanderlust-quiz-modal"
      >
        <button 
          onClick={onClose} 
          className="modal-close-btn"
          id="btn-close-quiz-modal"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="quiz-header">
          <div className="quiz-badge">
            <HelpCircle size={15} />
            <span>WANDERLUST CHALLENGE</span>
          </div>
          <h2 className="quiz-title">Geography & Landmark Trivia</h2>
          <p className="quiz-subtitle">
            Test your knowledge of world wonders, national capitals, and heritage sites!
          </p>
        </div>

        {!isCompleted ? (
          <div className="quiz-body">
            {/* Progress Bar & Counter */}
            <div className="quiz-progress-row">
              <span className="quiz-q-counter">Question {currentIdx + 1} of {questions.length}</span>
              <span className="quiz-score-badge">Score: {score}</span>
            </div>

            <div className="quiz-progress-bar-track">
              <div 
                className="quiz-progress-bar-fill" 
                style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
              ></div>
            </div>

            {/* Question Text */}
            <div className="question-box">
              <h3 className="question-text">{currentQ.question}</h3>
            </div>

            {/* Options Grid */}
            <div className="options-grid">
              {currentQ.options.map((opt, optIdx) => {
                let btnClass = 'quiz-opt-btn';
                if (isAnswered) {
                  if (optIdx === currentQ.answer) btnClass += ' correct';
                  else if (optIdx === selectedAnswer) btnClass += ' wrong';
                  else btnClass += ' disabled';
                }
                return (
                  <button
                    key={optIdx}
                    type="button"
                    className={btnClass}
                    onClick={() => handleSelectOption(optIdx)}
                    disabled={isAnswered}
                    id={`quiz-opt-${optIdx}`}
                  >
                    <span className="opt-indicator">{['A', 'B', 'C', 'D'][optIdx]}</span>
                    <span className="opt-text">{opt}</span>
                    {isAnswered && optIdx === currentQ.answer && (
                      <CheckCircle size={16} className="opt-state-icon" />
                    )}
                    {isAnswered && optIdx === selectedAnswer && optIdx !== currentQ.answer && (
                      <XCircle size={16} className="opt-state-icon" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation Note & Next Button */}
            {isAnswered && (
              <div className="explanation-box animate-fade-in">
                <p className="explanation-text">
                  <strong>Fact:</strong> {currentQ.explanation}
                </p>
                <button
                  type="button"
                  onClick={handleNext}
                  className="btn-next-question"
                  id="btn-next-quiz-q"
                >
                  <span>{currentIdx + 1 < questions.length ? 'Next Question' : 'View Results'}</span>
                  <ChevronRight size={15} />
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Results Card */
          <div className="quiz-results-card animate-scale-in">
            <div className="results-trophy-circle">
              <Award size={48} className="text-gold" />
            </div>
            <h3 className="results-title">
              {score >= 4 ? 'Master Cartographer!' : score >= 3 ? 'Seasoned Explorer!' : 'Budding Wanderer!'}
            </h3>
            <p className="results-summary">
              You scored <span className="highlight-score">{score}</span> out of {questions.length} questions correctly!
            </p>

            {score >= 3 && (
              <div className="stamp-earned-pill">
                <Sparkles size={14} className="text-gold" />
                <span>Special Stamp Unlocked in your World Explorer Passport!</span>
              </div>
            )}

            <div className="results-actions-row">
              <button
                type="button"
                onClick={handleRestart}
                className="btn-secondary"
                id="btn-restart-quiz"
              >
                <RotateCcw size={15} />
                <span>Play Again</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="btn-primary"
                id="btn-close-quiz-done"
              >
                <span>Done</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .quiz-modal-card {
          width: 90%;
          max-width: 620px;
          background: #0f172a;
          border: 1px solid rgba(99, 102, 241, 0.35);
          border-radius: var(--radius-xl);
          padding: 2rem;
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7);
        }
        .quiz-header {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .quiz-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(99, 102, 241, 0.15);
          border: 1px solid rgba(99, 102, 241, 0.35);
          color: #818cf8;
          font-size: 0.72rem;
          font-weight: 800;
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-full);
          width: fit-content;
        }
        .quiz-title {
          font-size: 1.6rem;
          font-weight: 800;
          margin: 0;
          color: #ffffff;
        }
        .quiz-subtitle {
          font-size: 0.88rem;
          color: var(--text-secondary);
          margin: 0;
        }
        .quiz-body {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .quiz-progress-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--text-secondary);
        }
        .quiz-score-badge {
          color: #38bdf8;
        }
        .quiz-progress-bar-track {
          width: 100%;
          height: 6px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.08);
          overflow: hidden;
        }
        .quiz-progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #6366f1, #38bdf8);
          transition: width 0.3s ease;
        }
        .question-box {
          background: rgba(30, 41, 59, 0.5);
          border: 1px solid var(--border-subtle);
          padding: 1rem 1.25rem;
          border-radius: var(--radius-md);
        }
        .question-text {
          font-size: 1.05rem;
          font-weight: 700;
          margin: 0;
          color: #ffffff;
          line-height: 1.4;
        }
        .options-grid {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }
        .quiz-opt-btn {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-md);
          background: rgba(30, 41, 59, 0.4);
          border: 1px solid var(--border-subtle);
          color: var(--text-primary);
          cursor: pointer;
          font-size: 0.90rem;
          font-weight: 600;
          text-align: left;
          transition: var(--transition-fast);
        }
        .quiz-opt-btn:hover:not(:disabled) {
          background: rgba(99, 102, 241, 0.15);
          border-color: #6366f1;
          transform: translateX(4px);
        }
        .opt-indicator {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 800;
          flex-shrink: 0;
        }
        .opt-text {
          flex: 1;
        }
        .quiz-opt-btn.correct {
          background: rgba(16, 185, 129, 0.2);
          border-color: #10b981;
          color: #a7f3d0;
        }
        .quiz-opt-btn.wrong {
          background: rgba(239, 68, 68, 0.2);
          border-color: #ef4444;
          color: #fca5a5;
        }
        .quiz-opt-btn.disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .explanation-box {
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(56, 189, 248, 0.3);
          border-radius: var(--radius-md);
          padding: 0.85rem 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .explanation-text {
          font-size: 0.82rem;
          color: var(--text-secondary);
          margin: 0;
          flex: 1;
        }
        .btn-next-question {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.5rem 1rem;
          border-radius: var(--radius-sm);
          background: linear-gradient(135deg, #6366f1, #4f46e5);
          color: #ffffff;
          font-weight: 700;
          font-size: 0.82rem;
          border: none;
          cursor: pointer;
        }
        .quiz-results-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1rem;
          padding: 1.5rem 0;
        }
        .results-trophy-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(245, 158, 11, 0.15);
          border: 2px solid rgba(245, 158, 11, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .results-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
        }
        .results-summary {
          font-size: 0.95rem;
          color: var(--text-secondary);
          margin: 0;
        }
        .highlight-score {
          color: #f59e0b;
          font-weight: 900;
          font-size: 1.2rem;
        }
        .stamp-earned-pill {
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid rgba(16, 185, 129, 0.35);
          color: #34d399;
          font-size: 0.82rem;
          font-weight: 700;
          padding: 0.4rem 0.85rem;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .results-actions-row {
          display: flex;
          gap: 1rem;
          margin-top: 0.5rem;
        }
      `}</style>
    </div>
  );
}
