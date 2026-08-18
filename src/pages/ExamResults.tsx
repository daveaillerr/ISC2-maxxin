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
import { CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
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

  // Get questions for review
  const reviewQuestions = Object.keys(attempt.answers).map((qId) => {
    return allQuestions.find((q) => q.id === qId)!;
  }).filter(Boolean);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      {/* Header Banner */}
      <div
        className={`flex flex-col items-center justify-center rounded-sm border p-8 text-center ${
          attempt.passed
            ? 'border-isc2-green bg-isc2-green/5'
            : 'border-red-300 bg-red-50'
        }`}
      >
        {attempt.passed ? (
          <CheckCircle size={48} className="text-isc2-green" />
        ) : (
          <XCircle size={48} className="text-red-500" />
        )}
        <h1
          className={`mt-4 text-3xl font-bold tracking-tight ${
            attempt.passed ? 'text-isc2-green' : 'text-red-600'
          }`}
        >
          {attempt.passed ? 'PROVISIONALLY PASSED' : 'NOT PASSED'}
        </h1>
        <p className="mt-2 text-sm text-slate-secondary">
          Your score: <span className="font-bold">{scaledScore}</span> / 1000 (
          {percentage}%)
        </p>
        <p className="mt-1 text-xs text-slate-muted">
          Passing standard: 700/1000
        </p>
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        {/* Domain Breakdown */}
        <section>
          <h2 className="mb-6 text-xl font-semibold text-slate-primary">
            Domain Performance
          </h2>
          <div className="h-64 rounded-sm border border-border bg-white p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                <Tooltip
                  cursor={{ fill: '#F8FAFC' }}
                  contentStyle={{ borderRadius: '2px', border: '1px solid #E2E8F0', fontSize: '12px' }}
                  formatter={(val: number) => [`${val}%`, 'Score']}
                  labelFormatter={(label, payload) => payload[0]?.payload.fullName || label}
                />
                <Bar dataKey="percentage" radius={[2, 2, 0, 0]}>
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
            Domains scoring below 70% require additional study.
          </p>
        </section>

        {/* Stats */}
        <section>
          <h2 className="mb-6 text-xl font-semibold text-slate-primary">
            Exam Details
          </h2>
          <dl className="space-y-4 rounded-sm border border-border bg-white p-6 text-sm">
            <div className="flex justify-between border-b border-border pb-4">
              <dt className="text-slate-muted">Date Taken</dt>
              <dd className="font-medium text-slate-primary">
                {new Date(attempt.date).toLocaleString()}
              </dd>
            </div>
            <div className="flex justify-between border-b border-border pb-4">
              <dt className="text-slate-muted">Mode</dt>
              <dd className="font-medium capitalize text-slate-primary">
                {attempt.config.mode}
              </dd>
            </div>
            <div className="flex justify-between border-b border-border pb-4">
              <dt className="text-slate-muted">Time Spent</dt>
              <dd className="font-medium text-slate-primary">
                {Math.floor(attempt.timeSpentSeconds / 60)}m {attempt.timeSpentSeconds % 60}s
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-muted">Questions Answered</dt>
              <dd className="font-medium text-slate-primary">
                {Object.keys(attempt.answers).length} / {attempt.totalQuestions}
              </dd>
            </div>
          </dl>
          
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/exam"
              className="flex-1 rounded-sm bg-canvas-warm px-4 py-2.5 text-center text-sm font-semibold text-slate-primary transition-colors hover:bg-slate-200"
            >
              Return to Exam Hub
            </Link>
            <Link
              to="/reviewer"
              className="flex-1 rounded-sm bg-isc2-green px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-isc2-green-light"
            >
              Review Study Materials
            </Link>
          </div>
        </section>
      </div>

      {/* Question Review */}
      <section className="mt-16">
        <h2 className="mb-6 text-xl font-semibold text-slate-primary">
          Question Review
        </h2>
        <div className="space-y-4">
          {reviewQuestions.map((q, i) => {
            const userAnswer = attempt.answers[q.id];
            const isCorrect = userAnswer === q.correctIndex;
            const isFlagged = attempt.flagged.includes(q.id);

            return (
              <div
                key={q.id}
                className={`rounded-sm border border-border bg-white p-6 shadow-sm ${
                  isCorrect ? 'border-l-4 border-l-isc2-green' : 'border-l-4 border-l-red-500'
                }`}
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <span className="mb-2 inline-block text-xs font-bold text-slate-muted">
                      Question {i + 1}
                    </span>
                    <p className="text-base font-medium text-slate-primary">
                      {q.text}
                    </p>
                  </div>
                  {isFlagged && (
                    <span className="shrink-0 rounded-sm bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-800">
                      Flagged
                    </span>
                  )}
                </div>

                <div className="mt-4 space-y-2">
                  <div className="rounded-sm bg-slate-50 p-3">
                    <p className="text-xs font-semibold text-slate-500">Your Answer:</p>
                    <p className={`text-sm ${isCorrect ? 'text-isc2-green font-medium' : 'text-red-600'}`}>
                      {userAnswer !== undefined ? q.options[userAnswer] : 'No answer provided'}
                    </p>
                  </div>

                  {!isCorrect && (
                    <div className="rounded-sm bg-isc2-green/5 p-3">
                      <p className="text-xs font-semibold text-isc2-green">Correct Answer:</p>
                      <p className="text-sm font-medium text-slate-primary">
                        {q.options[q.correctIndex]}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-6 border-t border-border pt-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-muted">
                    Explanation
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-secondary">
                    {q.explanation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
