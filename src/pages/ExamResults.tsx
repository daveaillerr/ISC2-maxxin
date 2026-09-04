import { useParams, Link } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { CheckCircle, XCircle, ArrowLeft, Clock, Target, Flag } from 'lucide-react';
import allQuestions from '../data/questions.json';
import domains from '../data/domains.json';
import type { ExamAttempt } from '../types';

export function ExamResults() {
  const { id } = useParams<{ id: string }>();
  const stored = localStorage.getItem('examAttempts');
  const attempts: ExamAttempt[] = stored ? JSON.parse(stored) : [];
  const attempt = attempts.find((a) => a.id === id);

  if (!attempt) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <p className="text-sm text-slate-muted">Exam results not found.</p>
        <Link
          to="/exam"
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-isc2-green hover:underline"
        >
          <ArrowLeft size={14} />
          Back to Exam Hub
        </Link>
      </div>
    );
  }

  // Prepare chart data
  const chartData = Object.entries(attempt.domainScores).map(([domainId, score]) => {
    const domain = domains.find((d) => d.id === domainId);
    const percentage = Math.round((score.correct / score.total) * 100);
    return {
      name: `D${domain?.number || '?'}`,
      fullName: domain?.title || domainId,
      percentage,
      correct: score.correct,
      total: score.total,
    };
  });

  const percentage = Math.round((attempt.score / attempt.totalQuestions) * 100);
  const scaledScore = Math.round((attempt.score / attempt.totalQuestions) * 1000);
  const flaggedCount = attempt.flagged.length;
  const correctCount = attempt.score;
  const incorrectCount = attempt.totalQuestions - attempt.score;

  // Get questions for review
  const reviewQuestions = Object.keys(attempt.answers).map((qId) => {
    return allQuestions.find((q) => q.id === qId)!;
  }).filter(Boolean);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      {/* Result Header Banner - Bento Style */}
      <div
        className={`mb-12 rounded-2xl border p-12 text-center ${
          attempt.passed
            ? 'border-isc2-green/30 bg-white'
            : 'border-red-300/30 bg-white'
        }`}
      >
        <div className="flex justify-center mb-6">
          {attempt.passed ? (
            <CheckCircle size={64} className="text-isc2-green" />
          ) : (
            <XCircle size={64} className="text-red-500" />
          )}
        </div>
        <h1
          className={`text-4xl lg:text-5xl font-bold tracking-tight mb-4 ${
            attempt.passed ? 'text-isc2-green' : 'text-red-600'
          }`}
        >
          {attempt.passed ? '✓ PROVISIONALLY PASSED' : '✗ NOT PASSED'}
        </h1>
        <p className="text-2xl font-bold text-slate-primary mb-2">
          {scaledScore} <span className="text-base font-normal text-slate-muted">/ 1000</span>
        </p>
        <p className="text-lg text-slate-secondary mb-4">
          {percentage}% Correct ({correctCount} of {attempt.totalQuestions} questions)
        </p>
        <p className="text-sm text-slate-muted">
          Passing standard: 700/1000 (70%)
        </p>
      </div>

      {/* Stats Bento Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
        <div className="rounded-2xl border border-border bg-white p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs font-semibold text-slate-muted mb-1">SCORE</p>
              <p className="text-3xl font-bold text-slate-primary">{scaledScore}</p>
              <p className="text-xs text-slate-muted">/ 1000</p>
            </div>
            <Target className="text-isc2-green opacity-20" size={28} />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs font-semibold text-slate-muted mb-1">PERCENTAGE</p>
              <p className="text-3xl font-bold text-isc2-green">{percentage}%</p>
              <p className="text-xs text-slate-muted">Correct</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs font-semibold text-slate-muted mb-1">CORRECT</p>
              <p className="text-3xl font-bold text-isc2-green">{correctCount}</p>
              <p className="text-xs text-slate-muted">Answered correctly</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs font-semibold text-slate-muted mb-1">FLAGGED</p>
              <p className="text-3xl font-bold text-amber-500">{flaggedCount}</p>
              <p className="text-xs text-slate-muted">For review</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Details Grid */}
      <div className="grid gap-6 lg:grid-cols-2 mb-12">
        {/* Domain Breakdown */}
        <div className="rounded-2xl border border-border bg-white p-8">
          <h2 className="mb-6 text-xl font-bold text-slate-primary">
            Domain Performance
          </h2>
          <div className="h-80 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                <Tooltip
                  cursor={{ fill: '#F8FAFC' }}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                  formatter={(val: number) => [`${val}%`, 'Score']}
                  labelFormatter={(label, payload) => payload[0]?.payload.fullName || label}
                />
                <Bar dataKey="percentage" radius={[8, 8, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.percentage >= 70 ? '#00A859' : '#D97706'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-xs text-slate-muted">
            📌 Domains scoring below 70% require additional study.
          </p>
        </div>

        {/* Exam Details */}
        <div className="rounded-2xl border border-border bg-white p-8">
          <h2 className="mb-6 text-xl font-bold text-slate-primary">
            Exam Details
          </h2>
          <div className="space-y-4">
            <div className="flex items-start justify-between p-4 bg-slate-50 rounded-lg">
              <div>
                <p className="text-xs font-semibold text-slate-muted mb-1">DATE TAKEN</p>
                <p className="text-base font-medium text-slate-primary">
                  {new Date(attempt.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-start justify-between p-4 bg-slate-50 rounded-lg">
              <div>
                <p className="text-xs font-semibold text-slate-muted mb-1">TIME OF DAY</p>
                <p className="text-base font-medium text-slate-primary">
                  {new Date(attempt.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>

            <div className="flex items-start justify-between p-4 bg-slate-50 rounded-lg">
              <div>
                <p className="text-xs font-semibold text-slate-muted mb-1">EXAM MODE</p>
                <p className="text-base font-medium capitalize text-slate-primary">
                  {attempt.config.mode} Mode
                </p>
              </div>
            </div>

            <div className="flex items-start justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-isc2-green" />
                <div>
                  <p className="text-xs font-semibold text-slate-muted mb-1">TIME SPENT</p>
                  <p className="text-base font-medium text-slate-primary">
                    {Math.floor(attempt.timeSpentSeconds / 60)}m {attempt.timeSpentSeconds % 60}s
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start justify-between p-4 bg-slate-50 rounded-lg">
              <div>
                <p className="text-xs font-semibold text-slate-muted mb-1">QUESTIONS ANSWERED</p>
                <p className="text-base font-medium text-slate-primary">
                  {Object.keys(attempt.answers).length} / {attempt.totalQuestions}
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/exam"
              className="flex-1 rounded-lg bg-slate-100 hover:bg-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-primary transition-all"
            >
              ← Return to Exam Hub
            </Link>
            <Link
              to="/reviewer"
              className="flex-1 rounded-lg bg-isc2-green hover:bg-isc2-green-light px-4 py-3 text-center text-sm font-semibold text-white transition-all shadow-sm hover:shadow-md"
            >
              📚 Review Study Materials
            </Link>
          </div>
        </div>
      </div>

      {/* Question Review Section */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-primary">
          Question Review ({reviewQuestions.length})
        </h2>
        <div className="space-y-4">
          {reviewQuestions.map((q, i) => {
            const userAnswer = attempt.answers[q.id];
            const isCorrect = userAnswer === q.correctIndex;
            const isFlagged = attempt.flagged.includes(q.id);

            return (
              <div
                key={q.id}
                className={`rounded-2xl border p-6 transition-all ${
                  isCorrect 
                    ? 'border-isc2-green/20 bg-white' 
                    : 'border-red-200/30 bg-white'
                }`}
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                        isCorrect 
                          ? 'bg-isc2-green/20 text-isc2-green' 
                          : 'bg-red-100 text-red-600'
                      }`}>
                        {i + 1}
                      </span>
                      <span className={`text-xs font-bold uppercase ${
                        isCorrect ? 'text-isc2-green' : 'text-red-600'
                      }`}>
                        {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                      </span>
                    </div>
                    <p className="text-base font-semibold text-slate-primary">
                      {q.text}
                    </p>
                  </div>
                  {isFlagged && (
                    <span className="shrink-0 rounded-lg bg-amber-100 px-3 py-1.5 text-xs font-semibold text-amber-800 flex items-center gap-1">
                      <Flag size={12} />
                      Flagged
                    </span>
                  )}
                </div>

                <div className="mt-6 space-y-3">
                  <div className={`rounded-lg p-4 border ${
                    isCorrect 
                      ? 'bg-isc2-green/10 border-isc2-green/20' 
                      : 'bg-red-50/50 border-red-200'
                  }`}>
                    <p className="text-xs font-bold uppercase tracking-wider mb-2 text-slate-600">Your Answer:</p>
                    <p className={`text-sm font-medium ${isCorrect ? 'text-isc2-green' : 'text-red-600'}`}>
                      {userAnswer !== undefined ? q.options[userAnswer] : '⚠️ No answer provided'}
                    </p>
                  </div>

                  {!isCorrect && (
                    <div className="rounded-lg bg-isc2-green/10 p-4 border border-isc2-green/20">
                      <p className="text-xs font-bold uppercase tracking-wider mb-2 text-isc2-green">Correct Answer:</p>
                      <p className="text-sm font-medium text-slate-primary">
                        {q.options[q.correctIndex]}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-6 border-t border-slate-200 pt-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    💡 Explanation
                  </p>
                  <p className="text-sm leading-relaxed text-slate-secondary">
                    {q.explanation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Back to Home */}
      <div className="text-center py-8 border-t border-slate-200">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-isc2-green font-semibold hover:text-isc2-green-light transition-all"
        >
          <ArrowLeft size={16} />
          Return to Home
        </Link>
      </div>
    </div>
  );
}
