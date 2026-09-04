import { Link } from 'react-router-dom';
import { BookOpen, ClipboardCheck, ArrowRight, ShieldCheck, TrendingUp, Target, Calendar } from 'lucide-react';
import domains from '../data/domains.json';
import type { ExamAttempt } from '../types';

export function Home() {
  const stored = localStorage.getItem('examAttempts');
  const attempts: ExamAttempt[] = stored ? JSON.parse(stored) : [];
  const lastAttempt = attempts.length > 0 ? attempts[attempts.length - 1] : null;

  const stats = attempts.length > 0 ? {
    totalAttempts: attempts.length,
    passRate: Math.round((attempts.filter(a => a.passed).length / attempts.length) * 100),
    avgScore: Math.round((attempts.reduce((acc, a) => acc + (a.score / a.totalQuestions) * 1000, 0) / attempts.length)),
  } : null;

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      {/* Hero Bento - Main Section */}
      <section className="mb-16">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:grid-rows-2">
          {/* Main Hero Card - Spans 2 columns and 2 rows */}
          <div className="lg:col-span-2 lg:row-span-2 rounded-2xl border border-border bg-white p-10 hover:shadow-md transition-all">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-isc2-green text-white">
                <ShieldCheck size={28} />
              </div>
              <span className="text-sm font-bold uppercase tracking-widest text-isc2-green pt-1 mt-3.5">
                Preparation Engine
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-primary mb-4">
              ISC2 Certified in Cybersecurity
            </h1>
            <p className="text-base lg:text-lg text-slate-secondary leading-relaxed mb-10 max-w-2xl">
              A platform that compiles resources and practice exams to help you prepare for the ISC2 Certified in Cybersecurity exam. Track your progress, review topics, and improve your knowledge with our comprehensive study materials.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/exam"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-isc2-green px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-isc2-green-light hover:shadow-md transform hover:scale-105"
              >
                <ClipboardCheck size={18} />
                Start Exam
              </Link>
              <Link
                to="/reviewer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-800 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-700 hover:shadow-md"
              >
                <BookOpen size={18} />
                Study Materials
              </Link>
            </div>
          </div>

          {/* Stats Cards - Right column */}
          {stats && (
            <>
              <div className="rounded-2xl border border-border bg-white p-6 hover:shadow-md transition-all flex flex-col justify-between">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-muted mb-2">TOTAL ATTEMPTS</p>
                    <p className="text-3xl font-bold text-slate-primary">{stats.totalAttempts}</p>
                  </div>
                  <Target className="text-isc2-green opacity-20" size={24} />
                </div>
                <p className="text-xs text-slate-muted">Completed exams</p>
              </div>

              <div className="rounded-2xl border border-border bg-white p-6 hover:shadow-md transition-all flex flex-col justify-between">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-muted mb-2">PASS RATE</p>
                    <p className="text-3xl font-bold text-isc2-green">{stats.passRate}%</p>
                  </div>
                  <TrendingUp className="text-isc2-green opacity-20" size={24} />
                </div>
                <p className="text-xs text-slate-muted">Success ratio</p>
              </div>
            </>
          )}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-2 text-2xl font-bold text-slate-primary">Examination Details</h2>
        <p className="mb-8 text-slate-muted">Coverage overview and key exam information</p>
        <div className="variant-1-score-grid">
          <div className="variant-1-card" data-accent="true">
            <span className="variant-1-label">Total Questions</span>
            <div className="variant-1-value">100</div>
            <div className="variant-1-note">Comprehensive assessment</div>
          </div>
          <div className="variant-1-card">
            <span className="variant-1-label">Time Limit</span>
            <div className="variant-1-value">120m</div>
            <div className="variant-1-note">Full exam duration</div>
          </div>
          <div className="variant-1-card" data-accent="true">
            <span className="variant-1-label">Passing Score</span>
            <div className="variant-1-value">700</div>
            <div className="variant-1-note">out of 1000</div>
          </div>
          <div className="variant-1-card">
            <span className="variant-1-label">Domains</span>
            <div className="variant-1-value">5</div>
            <div className="variant-1-note">Total coverage areas</div>
          </div>
        </div>

        <div className="variant-1-domain-wrap">
          <div className="variant-1-domain-header">
            <h3>Domain Coverage & Topics</h3>
            <span>{domains.length} Domains</span>
          </div>
          <div className="variant-1-domain-grid">
            {domains.map((domain) => {
              const pct = Math.min(Math.max(domain.coveragePercentage ?? 0, 0), 100);
              return (
                <div key={domain.id} className="variant-1-domain-item">
                  <p className="variant-1-pct">{pct}%</p>
                  <p className="variant-1-name">{domain.title}</p>
                  <div className="variant-1-bar"><span style={{ width: `${pct}%` }} /></div>
                  <div className="variant-1-meta"><span className="variant-1-dot" /><span>{domain.topics.length} topics</span></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent Activity - Featured Card */}
      {lastAttempt && (
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-slate-primary">Recent Activity</h2>
          <Link
            to={`/exam/results/${lastAttempt.id}`}
            className="block rounded-2xl border border-border bg-white p-8 hover:shadow-lg hover:border-isc2-green transition-all group"
          >
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Calendar size={16} className="text-isc2-green" />
                  <p className="text-xs font-semibold text-slate-muted uppercase">Last Attempt</p>
                </div>
                <p className="text-2xl font-bold text-slate-primary mb-6">
                  {new Date(lastAttempt.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
                <p className="text-sm text-slate-secondary">
                  Exam Mode: <span className="font-semibold text-slate-primary capitalize">{lastAttempt.config.mode}</span>
                </p>
                <p className="text-sm text-slate-secondary mt-2">
                  Time Spent: <span className="font-semibold text-slate-primary">{Math.floor(lastAttempt.timeSpentSeconds / 60)}m {lastAttempt.timeSpentSeconds % 60}s</span>
                </p>
              </div>
              <div className="flex flex-col justify-between">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <p className="text-xs font-semibold text-slate-muted mb-2">Score</p>
                    <p className="text-3xl font-bold text-slate-primary">{Math.round((lastAttempt.score / lastAttempt.totalQuestions) * 1000)}</p>
                    <p className="text-xs text-slate-muted mt-1">/ 1000</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <p className="text-xs font-semibold text-slate-muted mb-2">Percentage</p>
                    <p className="text-3xl font-bold text-slate-primary">{Math.round((lastAttempt.score / lastAttempt.totalQuestions) * 100)}%</p>
                  </div>
                </div>
                <span
                  className={`inline-flex self-start rounded-lg px-4 py-2.5 text-sm font-bold uppercase tracking-wider transition-all ${
                    lastAttempt.passed 
                      ? 'bg-isc2-green/15 text-isc2-green border border-isc2-green/30' 
                      : 'bg-red-50 text-red-600 border border-red-200'
                  }`}
                >
                  {lastAttempt.passed ? '✓ Passed' : '✗ Not Passed'}
                </span>
              </div>
            </div>
            <div className="mt-8 flex items-center gap-2 text-isc2-green font-semibold group-hover:gap-3 transition-all">
              View detailed results <ArrowRight size={18} />
            </div>
          </Link>
        </section>
      )}

      {/* Domains - Bento Grid */}
      <section>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-primary mb-2">Examination Domains</h2>
          <p className="text-slate-muted">Structured according to the official ISC2 syllabus.</p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6 auto-rows-max">
          {domains.map((d, idx) => {
            // Asymmetrical bento layout (like the mockup):
            // Row 1: Domain 1 (3 cols) + Domain 2 (3 cols)
            // Row 2: Domain 3 (2 cols) + Domain 4 (2 cols) + Domain 5 (2 cols)
            // Row 3: Domain 6 (6 cols - full width)
            let cols = 'lg:col-span-2';
            
            if (idx === 0 || idx === 1) {
              cols = 'lg:col-span-3';
            } else if (idx === 5) {
              cols = 'lg:col-span-6';
            }
            
            return (
              <Link
                key={d.id}
                to={`/reviewer/${d.id}`}
                className={`${cols} group rounded-2xl border border-border bg-white p-8 hover:shadow-lg hover:border-isc2-green transition-all flex flex-col justify-between overflow-hidden`}
              >
                
                <div className="relative">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-isc2-green text-base font-bold text-white mb-6">
                    {d.number}
                  </span>
                  <h3 className="text-xl font-bold text-slate-primary group-hover:text-isc2-green transition-colors mb-3">
                    {d.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-secondary">
                    {d.description}
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-isc2-green group-hover:gap-3 transition-all">
                  {d.topics.length} topics
                  <ArrowRight size={16} />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Empty state */}
      {!lastAttempt && (
        <section className="mt-16 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
          <p className="text-lg font-semibold text-slate-primary mb-2">
            Ready to get started?
          </p>
          <p className="text-slate-secondary mb-8">
            Complete an exam to see your progress and analytics here.
          </p>
          <Link
            to="/exam"
            className="inline-flex items-center gap-2 rounded-lg bg-isc2-green px-6 py-3 text-sm font-semibold text-white hover:bg-isc2-green-light transition-all"
          >
            <ClipboardCheck size={18} />
            Start Your First Exam
          </Link>
        </section>
      )}
    </div>
  );
}
