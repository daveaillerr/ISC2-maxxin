import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Flag, ChevronLeft, ChevronRight, Clock, Send, Grid3X3 } from 'lucide-react';
import allQuestions from '../data/questions.json';
import type { ExamConfig, Question, ExamAttempt } from '../types';

export function ExamSession() {
  const location = useLocation();
  const navigate = useNavigate();
  const config = location.state?.config as ExamConfig | undefined;

  // Initialize exam state
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [showNav, setShowNav] = useState(false);

  // Setup exam on mount
  useEffect(() => {
    if (!config) return;

    let pool = [...allQuestions];
    if (config.mode === 'domain' && config.domainId) {
      pool = pool.filter((q) => q.domainId === config.domainId);
    }

    // Shuffle and slice
    pool.sort(() => Math.random() - 0.5);
    const selected = pool.slice(0, Math.min(config.questionCount, pool.length));
    setQuestions(selected);

    if (config.timeLimitMinutes) {
      setTimeRemaining(config.timeLimitMinutes * 60);
    }
  }, [config]);

  // Handle timer
  useEffect(() => {
    if (timeRemaining === null || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(timer);
          submitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  const submitExam = useCallback(() => {
    if (!config || questions.length === 0) return;

    let score = 0;
    const domainScores: Record<string, { correct: number; total: number }> = {};

    questions.forEach((q) => {
      if (!domainScores[q.domainId]) {
        domainScores[q.domainId] = { correct: 0, total: 0 };
      }
      domainScores[q.domainId].total += 1;

      if (answers[q.id] === q.correctIndex) {
        score += 1;
        domainScores[q.domainId].correct += 1;
      }
    });

    const scaledScore = (score / questions.length) * 1000;
    const passed = scaledScore >= 700;

    const attempt: ExamAttempt = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      config,
      answers,
      flagged: Array.from(flagged),
      score,
      totalQuestions: questions.length,
      domainScores,
      passed,
      timeSpentSeconds: config.timeLimitMinutes
        ? config.timeLimitMinutes * 60 - (timeRemaining || 0)
        : 0,
    };

    const existing = localStorage.getItem('examAttempts');
    const attempts = existing ? JSON.parse(existing) : [];
    localStorage.setItem('examAttempts', JSON.stringify([...attempts, attempt]));

    navigate(`/exam/results/${attempt.id}`, { replace: true });
  }, [config, questions, answers, flagged, timeRemaining, navigate]);

  if (!config) {
    return <Navigate to="/exam" replace />;
  }

  if (questions.length === 0) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-slate-muted">Loading exam session...</p>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const isPractice = config.mode === 'practice';
  const hasAnsweredCurrent = answers[currentQ.id] !== undefined;
  const isCorrect = answers[currentQ.id] === currentQ.correctIndex;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-col bg-canvas px-6 lg:px-8">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowNav(!showNav)}
            className="flex items-center gap-2 rounded-sm border border-border px-3 py-1.5 text-xs font-medium text-slate-secondary hover:bg-canvas-warm lg:hidden"
          >
            <Grid3X3 size={14} />
            {showNav ? 'Hide' : 'Questions'}
          </button>
          <span className="text-sm font-semibold text-slate-primary">
            Question {currentIndex + 1} of {questions.length}
          </span>
        </div>

        <div className="flex items-center gap-4">
          {timeRemaining !== null && (
            <div
              className={`flex items-center gap-1.5 text-sm font-bold ${
                timeRemaining < 300 ? 'text-red-600' : 'text-slate-primary'
              }`}
            >
              <Clock size={16} />
              {formatTime(timeRemaining)}
            </div>
          )}
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to submit your exam?')) {
                submitExam();
              }
            }}
            className="hidden items-center gap-1.5 rounded-sm bg-isc2-green px-4 py-1.5 text-xs font-semibold text-white hover:bg-isc2-green-light sm:flex"
          >
            <Send size={14} />
            Submit
          </button>
        </div>
      </header>

      <div className="flex flex-1 gap-8 py-8">
        {/* Navigation Sidebar */}
        <aside
          className={`${
            showNav ? 'block' : 'hidden'
          } shrink-0 lg:block lg:w-64`}
        >
          <div className="sticky top-24">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-muted">
              Question Navigator
            </h3>
            <div className="grid grid-cols-5 gap-2 sm:grid-cols-8 lg:grid-cols-5">
              {questions.map((q, i) => {
                const isAnswered = answers[q.id] !== undefined;
                const isFlagged = flagged.has(q.id);
                const isCurrent = i === currentIndex;

                let btnClass = 'flex h-10 w-10 items-center justify-center rounded-sm border text-xs font-medium transition-colors';
                
                if (isCurrent) {
                  btnClass += ' ring-2 ring-isc2-green ring-offset-2';
                }

                if (isFlagged) {
                  btnClass += ' border-amber-flag bg-amber-flag/10 text-amber-900';
                } else if (isAnswered) {
                  btnClass += ' border-isc2-green bg-isc2-green/10 text-isc2-green';
                } else {
                  btnClass += ' border-border bg-white text-slate-secondary hover:border-isc2-green';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentIndex(i);
                      setShowNav(false);
                    }}
                    className={btnClass}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Main Question Area */}
        <div className="flex-1">
          <div className="mb-8">
            <span className="mb-2 inline-block rounded-sm bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
              Domain {currentQ.domainNumber}
            </span>
            <h2 className="text-lg font-medium text-slate-primary">
              {currentQ.text}
            </h2>
          </div>

          <div className="space-y-3">
            {currentQ.options.map((opt, i) => {
              const isSelected = answers[currentQ.id] === i;
              
              let optClass = 'flex cursor-pointer items-start gap-3 rounded-sm border p-4 transition-colors';
              
              if (isPractice && hasAnsweredCurrent) {
                // Practice mode feedback
                if (i === currentQ.correctIndex) {
                  optClass += ' border-isc2-green bg-isc2-green/5';
                } else if (isSelected) {
                  optClass += ' border-red-300 bg-red-50';
                } else {
                  optClass += ' border-border bg-white opacity-50';
                }
              } else {
                // Normal mode
                if (isSelected) {
                  optClass += ' border-isc2-green bg-isc2-green/5';
                } else {
                  optClass += ' border-border bg-white hover:border-isc2-green/50';
                }
              }

              return (
                <label key={i} className={optClass}>
                  <input
                    type="radio"
                    name={`q-${currentQ.id}`}
                    className="mt-0.5 h-4 w-4 shrink-0 text-isc2-green focus:ring-isc2-green"
                    checked={isSelected}
                    onChange={() => {
                      if (isPractice && hasAnsweredCurrent) return;
                      setAnswers((prev) => ({ ...prev, [currentQ.id]: i }));
                    }}
                    disabled={isPractice && hasAnsweredCurrent}
                  />
                  <span className="text-sm text-slate-secondary">{opt}</span>
                </label>
              );
            })}
          </div>

          {/* Practice mode explanation */}
          {isPractice && hasAnsweredCurrent && (
            <div className={`mt-6 rounded-sm border p-4 ${isCorrect ? 'border-isc2-green/20 bg-isc2-green/5' : 'border-red-200 bg-red-50/50'}`}>
              <p className={`mb-2 text-sm font-bold ${isCorrect ? 'text-isc2-green' : 'text-red-600'}`}>
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </p>
              <p className="text-sm leading-relaxed text-slate-secondary">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Action Bar */}
          <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
            <button
              onClick={() => setCurrentIndex((p) => Math.max(0, p - 1))}
              disabled={currentIndex === 0}
              className="flex items-center gap-1 text-sm font-medium text-slate-secondary disabled:opacity-50 hover:text-isc2-green"
            >
              <ChevronLeft size={16} />
              Previous
            </button>

            <button
              onClick={() => {
                setFlagged((prev) => {
                  const next = new Set(prev);
                  if (next.has(currentQ.id)) next.delete(currentQ.id);
                  else next.add(currentQ.id);
                  return next;
                });
              }}
              className={`flex items-center gap-1.5 rounded-sm px-3 py-1.5 text-sm font-medium transition-colors ${
                flagged.has(currentQ.id)
                  ? 'bg-amber-flag/10 text-amber-700'
                  : 'text-slate-muted hover:bg-slate-100 hover:text-slate-primary'
              }`}
            >
              <Flag size={14} className={flagged.has(currentQ.id) ? 'fill-current' : ''} />
              {flagged.has(currentQ.id) ? 'Flagged' : 'Flag for review'}
            </button>

            <button
              onClick={() => {
                if (currentIndex === questions.length - 1) {
                   if (window.confirm('Are you sure you want to submit your exam?')) {
                     submitExam();
                   }
                } else {
                  setCurrentIndex((p) => Math.min(questions.length - 1, p + 1));
                }
              }}
              className="flex items-center gap-1 text-sm font-medium text-isc2-green hover:text-isc2-green-light"
            >
              {currentIndex === questions.length - 1 ? 'Submit' : 'Next'}
              {currentIndex !== questions.length - 1 && <ChevronRight size={16} />}
            </button>
          </div>
          
          {/* Mobile submit */}
          <div className="mt-8 sm:hidden">
             <button
              onClick={() => {
                if (window.confirm('Are you sure you want to submit your exam?')) {
                  submitExam();
                }
              }}
              className="flex w-full items-center justify-center gap-1.5 rounded-sm bg-isc2-green px-4 py-3 text-sm font-semibold text-white hover:bg-isc2-green-light"
            >
              <Send size={16} />
              Submit Exam
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
