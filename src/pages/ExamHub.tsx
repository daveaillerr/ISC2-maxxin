import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardCheck, Target, BookOpen } from 'lucide-react';
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
      <h1 className="text-3xl font-bold tracking-tight text-slate-primary">
        Exam Simulation
      </h1>
      <p className="mt-2 text-sm text-slate-muted">
        Select a mode to begin your practice session.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Full mock */}
        <div className="flex flex-col rounded-sm border border-border bg-white p-6">
          <ClipboardCheck size={20} className="text-isc2-green" />
          <h2 className="mt-4 text-base font-semibold text-slate-primary">
            Standard Mock Exam
          </h2>
          <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-muted">
            Full 100-question certification simulation with a 120-minute time
            limit, mirroring the actual ISC2 CC exam format.
          </p>
          <dl className="mt-4 space-y-1 text-xs text-slate-secondary">
            <div className="flex justify-between">
              <dt>Questions</dt>
              <dd className="font-medium">100</dd>
            </div>
            <div className="flex justify-between">
              <dt>Time Limit</dt>
              <dd className="font-medium">120 min</dd>
            </div>
          </dl>
          <button
            onClick={() =>
              start({ mode: 'full', questionCount: 100, timeLimitMinutes: 120 })
            }
            className="mt-6 rounded-sm bg-isc2-green px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-isc2-green-light"
          >
            Begin
          </button>
        </div>

        {/* Domain drill */}
        <div className="flex flex-col rounded-sm border border-border bg-white p-6">
          <Target size={20} className="text-isc2-green" />
          <h2 className="mt-4 text-base font-semibold text-slate-primary">
            Domain Diagnostic
          </h2>
          <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-muted">
            Focused practice targeting a specific domain. Identify and strengthen
            weak areas in your preparation.
          </p>
          <label className="mt-4 block text-xs font-medium text-slate-secondary">
            Select Domain
          </label>
          <select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            className="mt-1 w-full rounded-sm border border-border bg-white px-3 py-2 text-xs text-slate-primary focus:border-isc2-green focus:outline-none"
          >
            {domains.map((d) => (
              <option key={d.id} value={d.id}>
                Domain {d.number}: {d.title}
              </option>
            ))}
          </select>
          <dl className="mt-4 space-y-1 text-xs text-slate-secondary">
            <div className="flex justify-between">
              <dt>Questions</dt>
              <dd className="font-medium">20</dd>
            </div>
            <div className="flex justify-between">
              <dt>Time Limit</dt>
              <dd className="font-medium">30 min</dd>
            </div>
          </dl>
          <button
            onClick={() =>
              start({
                mode: 'domain',
                domainId: selectedDomain,
                questionCount: 20,
                timeLimitMinutes: 30,
              })
            }
            className="mt-6 rounded-sm bg-isc2-green px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-isc2-green-light"
          >
            Begin
          </button>
        </div>

        {/* Practice */}
        <div className="flex flex-col rounded-sm border border-border bg-white p-6">
          <BookOpen size={20} className="text-isc2-green" />
          <h2 className="mt-4 text-base font-semibold text-slate-primary">
            Practice Mode
          </h2>
          <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-muted">
            Untimed study session with immediate answer feedback and detailed
            explanations after each question.
          </p>
          <dl className="mt-4 space-y-1 text-xs text-slate-secondary">
            <div className="flex justify-between">
              <dt>Questions</dt>
              <dd className="font-medium">25</dd>
            </div>
            <div className="flex justify-between">
              <dt>Time Limit</dt>
              <dd className="font-medium">None</dd>
            </div>
          </dl>
          <button
            onClick={() =>
              start({
                mode: 'practice',
                questionCount: 25,
                timeLimitMinutes: null,
              })
            }
            className="mt-6 rounded-sm bg-isc2-green px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-isc2-green-light"
          >
            Begin
          </button>
        </div>
      </div>
    </div>
  );
}
