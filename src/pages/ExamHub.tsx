import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ClipboardCheck,
  Target,
  BookOpen,
  Zap,
  Clock,
  Lightbulb,
  ArrowRight,
  Library,
} from 'lucide-react';
import domains from '../data/domains.json';
import type { ExamConfig } from '../types';

export function ExamHub() {
  const navigate = useNavigate();
  const [selectedDomain, setSelectedDomain] = useState(domains[0].id);

  const start = (config: ExamConfig) => {
    navigate('/exam/session', { state: { config } });
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <div className="mb-12">
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-primary mb-3">
          Exam Simulation Hub
        </h1>
        <p className="text-base text-slate-muted max-w-2xl">
          Choose from multiple exam modes to practice and assess your knowledge
          of the ISC2 Certified in Cybersecurity (CC) certification.
        </p>
      </div>

      {/* Exam Modes */}
      <div className="grid gap-6 lg:grid-cols-3 lg:grid-rows-2">
        {/* Standard Mock Exam */}
        <div className="relative lg:col-span-2 lg:row-span-1 rounded-2xl border border-border bg-gradient-to-br from-isc2-green/10 to-slate-50 p-8 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden group">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-isc2-green/0 to-isc2-green/0 group-hover:from-isc2-green/5 group-hover:to-isc2-green/10 transition-all" />

          <div className="relative">
            <div className="flex items-start justify-between mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-isc2-green text-white shadow-md">
                <ClipboardCheck size={24} />
              </div>

              <span className="text-xs font-bold uppercase tracking-widest text-isc2-green bg-isc2-green/10 px-3 py-1 rounded-full">
                Full Exam
              </span>
            </div>

            <h2 className="text-2xl font-bold text-slate-primary mb-3">
              Standard Mock Exam
            </h2>

            <p className="text-base leading-relaxed text-slate-secondary mb-6">
              Full 100-question certification simulation with a 120-minute
              time limit, mirroring the actual ISC2 CC exam format.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/50 backdrop-blur rounded-lg p-4 border border-white/20">
                <p className="text-xs font-semibold text-slate-muted mb-1">
                  Questions
                </p>
                <p className="text-2xl font-bold text-slate-primary">100</p>
              </div>

              <div className="bg-white/50 backdrop-blur rounded-lg p-4 border border-white/20">
                <div className="flex items-center gap-1.5">
                  <div>
                    <p className="text-xs font-semibold text-slate-muted mb-1">
                      Time Limit
                    </p>
                    <p className="text-2xl font-bold text-slate-primary">
                      120m
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() =>
                start({
                  mode: 'full',
                  questionCount: 100,
                  timeLimitMinutes: 120,
                })
              }
              className="w-full rounded-lg bg-isc2-green px-6 py-3 text-base font-semibold text-white transition-all hover:bg-isc2-green-light hover:shadow-md flex items-center justify-center gap-2"
            >
              Begin Standard Exam
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Quick Tip */}
        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-start gap-3 mb-4">
            <Zap className="text-isc2-green" size={20} />

            <div>
              <p className="text-xs font-semibold text-slate-muted uppercase">
                Quick Tip
              </p>
              <h3 className="text-base font-bold text-slate-primary">
                Manage Time
              </h3>
            </div>
          </div>
          
          <p className="text-sm text-slate-secondary leading-relaxed bg-isc2-green/10 rounded-lg p-4 border border-isc2-green/20 mb-2">
            Allocate about 1–1.2 minutes per question to stay within the time
            limit.
          </p>
          <p className="text-sm text-slate-secondary leading-relaxed bg-isc2-green/10 rounded-lg p-4 border border-isc2-green/20 mb-2">
            Do not skip questions because you will not be able to return to them later. 
          </p>
          <p className="text-sm text-slate-secondary leading-relaxed bg-isc2-green/10 rounded-lg p-4 border border-isc2-green/20 mb-2">
            Master all domains to ensure a well-rounded understanding of the ISC2 CC exam content.
          </p>
          <p className="text-sm text-slate-secondary leading-relaxed bg-isc2-green/10 rounded-lg p-4 border border-isc2-green/20 mb-2">
            Always test what you already know.
          </p>
        </div>

        {/* Domain Diagnostic */}
        <div className="relative lg:col-span-1 rounded-2xl border border-border bg-white p-8 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden group">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent to-blue-50/30 group-hover:to-blue-50/50 transition-all" />

          <div className="relative">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500 text-white shadow-md mb-4">
              <Target size={24} />
            </div>

            <h2 className="text-xl font-bold text-slate-primary mb-2">
              Domain Diagnostic
            </h2>

            <p className="text-sm leading-relaxed text-slate-secondary mb-6">
              Focused practice on a specific domain. Identify weak areas
              quickly.
            </p>

            <label className="block text-xs font-semibold text-slate-muted mb-2 uppercase">
              Select Domain
            </label>

            <div className="relative">
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="appearance-none w-full rounded-lg border border-border bg-white px-4 py-2.5 pr-10 text-sm text-slate-primary focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all"
              >
                {domains.map((d) => (
                  <option key={d.id} value={d.id}>
                    Domain {d.number}: {d.title}
                  </option>
                ))}
              </select>

              <svg
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-slate-secondary mb-6">
              <div>
                <p className="font-medium">20 Questions</p>
              </div>

              <div className="text-right">
                <p className="font-medium">30 min</p>
              </div>
            </div>

            <button
              onClick={() =>
                start({
                  mode: 'domain',
                  domainId: selectedDomain,
                  questionCount: 20,
                  timeLimitMinutes: 30,
                })
              }
              className="w-full rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-600 hover:shadow-md"
            >
              Begin Diagnostic
            </button>
          </div>
        </div>

        {/* Practice Mode */}
        <div className="relative lg:col-span-1 rounded-2xl border border-border bg-white p-8 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden group">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent to-amber-50/30 group-hover:to-amber-50/50 transition-all" />

          <div className="relative">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500 text-white shadow-md mb-4">
              <BookOpen size={24} />
            </div>

            <h2 className="text-xl font-bold text-slate-primary mb-2">
              Practice Mode
            </h2>

            <p className="text-sm leading-relaxed text-slate-secondary mb-6">
              Untimed study session with instant feedback and detailed
              explanations.
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-2 text-sm">
                <Lightbulb size={14} className="text-amber-500" />
                <span className="text-slate-secondary">25 questions</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Clock size={14} className="text-slate-500" />
                <span className="text-slate-secondary">No time limit</span>
              </div>
            </div>

            <button
              onClick={() =>
                start({
                  mode: 'practice',
                  questionCount: 25,
                  timeLimitMinutes: null,
                })
              }
              className="w-full rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-amber-600 hover:shadow-md"
            >
              Begin Practice
            </button>
          </div>
        </div>

        {/* External Exams */}
        <div className="relative lg:col-span-1 rounded-2xl border border-border bg-white p-8 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden group">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent to-amber-50/30 group-hover:to-amber-50/50 transition-all" />

          <div className="relative">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500 text-white shadow-md mb-4">
              <Library size={24} />
            </div>

            <h2 className="text-xl font-bold text-slate-primary mb-2">
              External Exams
            </h2>

            <p className="text-sm leading-relaxed text-slate-secondary mb-6">
              Additional practice exams from external sources to broaden your preparation.
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-2 text-sm">
                <Clock size={14} className="text-slate-500" />
                <span className="text-slate-secondary"><a href="https://certificationexams.pro/others/iscc/cc/exam1.html" rel="noreferrer" target="_blank">Certifications Exam (Paid with Free)</a></span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Clock size={14} className="text-slate-500" />
                <span className="text-slate-secondary"><a href="https://mintarasss.github.io/isc2-cc-practice-exam/" rel="noreferrer" target="_blank">ISC2 CC Exam Simulator (Free)</a></span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Clock size={14} className="text-slate-500" />
                <span className="text-slate-secondary"><a href="https://play.google.com/store/apps/details?id=com.aleosapps.QuizzAppISC2.CC" rel="noreferrer" target="_blank">ISC2 CC Reviewer App (Paid with Free)</a></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-border bg-white p-6">
          <h3 className="font-bold text-slate-primary mb-3">Full Exam</h3>
          <p className="text-sm text-slate-muted leading-relaxed">
            Simulation of the ISC2 CC certification exam with
            time constraints.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-white p-6">
          <h3 className="font-bold text-slate-primary mb-3">Domain Drill</h3>
          <p className="text-sm text-slate-muted leading-relaxed">
            Targeted practice on specific domains to strengthen weak areas
            efficiently.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-white p-6">
          <h3 className="font-bold text-slate-primary mb-3">Practice</h3>
          <p className="text-sm text-slate-muted leading-relaxed">
            Learn at your own pace with immediate feedback and comprehensive
            explanations.
          </p>
        </div>
      </div>
    </div>
  );
}
