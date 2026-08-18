import { Link } from 'react-router-dom';
import { BookOpen, ClipboardCheck, ArrowRight, ShieldCheck } from 'lucide-react';
import domains from '../data/domains.json';
import type { ExamAttempt } from '../types';

export function Home() {
  const stored = localStorage.getItem('examAttempts');
  const attempts: ExamAttempt[] = stored ? JSON.parse(stored) : [];
  const lastAttempt = attempts.length > 0 ? attempts[attempts.length - 1] : null;

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      {/* Hero / Landing Section */}
      <section className="mb-20">
        <div className="flex items-center gap-3 mb-6 animate-fade-in-up stagger-1">
          <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-isc2-green text-white shadow-sm">
            <ShieldCheck size={24} />
          </div>
          <span className="text-sm font-bold uppercase tracking-widest text-isc2-green">
            Preparation Engine
          </span>
        </div>
        
        <h1 className="text-4xl font-bold tracking-tight text-slate-primary lg:text-6xl animate-fade-in-up stagger-2">
          ISC2 Certified in <br className="hidden sm:block" />
          Cybersecurity (CC)
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-muted leading-relaxed animate-fade-in-up stagger-3">
          A rigorous, structured review platform designed to benchmark your readiness. 
          Access comprehensive domain knowledge, authentic simulation exams, and 
          diagnostic analytics.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row animate-fade-in-up stagger-3">
          <Link
            to="/exam"
            className="inline-flex items-center justify-center gap-2 rounded-sm bg-isc2-green px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-isc2-green-light"
          >
            <ClipboardCheck size={18} />
            Start Exam Simulation
          </Link>
          <Link
            to="/reviewer"
            className="inline-flex items-center justify-center gap-2 rounded-sm bg-slate-800 px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
          >
            <BookOpen size={18} />
            Browse Study Materials
          </Link>
        </div>
      </section>

      {/* Domain overview */}
      <section className="mb-20 animate-fade-in-up stagger-3">
        <div className="mb-8 border-b border-border pb-4">
          <h2 className="text-xl font-semibold text-slate-primary">
            Examination Domains
          </h2>
          <p className="mt-2 text-sm text-slate-muted">
            Structured according to the official ISC2 syllabus.
          </p>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {domains.map((d) => (
            <Link
              key={d.id}
              to={`/reviewer/${d.id}`}
              className="group rounded-sm border border-border bg-white p-6 transition-colors hover:border-isc2-green shadow-sm"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-sm bg-isc2-green text-xs font-bold text-white">
                {d.number}
              </span>
              <h3 className="mt-4 text-base font-semibold text-slate-primary group-hover:text-isc2-green">
                {d.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-muted">
                {d.description}
              </p>
              <span className="mt-6 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-isc2-green">
                {d.topics.length} topics
                <ArrowRight size={14} className="ml-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent activity */}
      <section className="animate-fade-in-up stagger-3">
        <h2 className="mb-4 text-xl font-semibold text-slate-primary">
          Recent Activity
        </h2>
        <div className="rounded-sm border border-border bg-white p-8 shadow-sm">
          {lastAttempt ? (
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-base font-semibold text-slate-primary">
                  Last exam attempt &mdash;{' '}
                  <span className="font-normal text-slate-secondary">
                    {new Date(lastAttempt.date).toLocaleDateString()}
                  </span>
                </p>
                <div className="mt-2 flex items-center gap-4">
                  <p className="text-sm text-slate-muted">
                    Score: <span className="font-medium text-slate-primary">{lastAttempt.score}/{lastAttempt.totalQuestions}</span> (
                    {Math.round(
                      (lastAttempt.score / lastAttempt.totalQuestions) * 100
                    )}
                    %)
                  </p>
                  <span
                    className={`inline-flex rounded-sm px-2.5 py-1 text-xs font-bold uppercase tracking-wider ${
                      lastAttempt.passed 
                        ? 'bg-isc2-green/10 text-isc2-green' 
                        : 'bg-red-50 text-red-600'
                    }`}
                  >
                    {lastAttempt.passed ? 'Passed' : 'Not Passed'}
                  </span>
                </div>
              </div>
              <Link
                to={`/exam/results/${lastAttempt.id}`}
                className="inline-flex shrink-0 items-center gap-2 rounded-sm border border-border px-4 py-2 text-sm font-medium text-slate-secondary transition-colors hover:border-isc2-green hover:text-isc2-green"
              >
                View full results
                <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-base text-slate-secondary">
                No exam attempts recorded yet.
              </p>
              <p className="mt-1 text-sm text-slate-muted">
                Complete a diagnostic or mock exam to establish your baseline.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
