import { useState } from 'react';
import { Lock, BarChart3, Users, TrendingUp } from 'lucide-react';
import type { ExamAttempt } from '../types';

export function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'isc2admin') {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setPassword('');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-6">
        <div className="w-full max-w-sm rounded-sm border border-border bg-white p-8 shadow-sm">
          <div className="mb-6 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-600">
              <Lock size={24} />
            </div>
          </div>
          <h1 className="mb-2 text-center text-xl font-bold text-slate-primary">
            Admin Authentication
          </h1>
          <p className="mb-6 text-center text-xs text-slate-muted">
            Enter administrative credential to access analytics.
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Passcode"
                className={`w-full rounded-sm border bg-white px-4 py-2 text-sm focus:outline-none ${
                  error
                    ? 'border-red-300 focus:border-red-500'
                    : 'border-border focus:border-isc2-green'
                }`}
              />
              {error && (
                <p className="mt-1 text-xs text-red-600">Invalid passcode.</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full rounded-sm bg-isc2-green px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-isc2-green-light"
            >
              Access Engine
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Load analytics data
  const stored = localStorage.getItem('examAttempts');
  const attempts: ExamAttempt[] = stored ? JSON.parse(stored) : [];

  const totalAttempts = attempts.length;
  const passedAttempts = attempts.filter((a) => a.passed).length;
  const passRate =
    totalAttempts > 0 ? Math.round((passedAttempts / totalAttempts) * 100) : 0;

  const averageScoreRaw =
    totalAttempts > 0
      ? attempts.reduce((acc, a) => acc + a.score / a.totalQuestions, 0) /
        totalAttempts
      : 0;
  const averageScoreScaled = Math.round(averageScoreRaw * 1000);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <div className="mb-8 flex items-end justify-between border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-primary">
            Administration & Analytics
          </h1>
          <p className="mt-2 text-sm text-slate-muted">
            Candidate performance metrics and system telemetry.
          </p>
        </div>
        <button
          onClick={() => setIsAuthenticated(false)}
          className="text-sm font-medium text-slate-secondary hover:text-slate-primary hover:underline"
        >
          Lock Session
        </button>
      </div>

      {totalAttempts === 0 ? (
        <div className="rounded-sm border border-border bg-white p-12 text-center">
          <BarChart3 size={32} className="mx-auto mb-4 text-slate-300" />
          <p className="text-sm font-medium text-slate-primary">
            No telemetry data available
          </p>
          <p className="mt-1 text-xs text-slate-muted">
            Analytics will populate once candidates complete exam sessions.
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-3">
            {/* Stat Cards */}
            <div className="rounded-sm border border-border bg-white p-6">
              <div className="flex items-center gap-3">
                <Users size={20} className="text-isc2-green" />
                <h3 className="text-sm font-semibold text-slate-secondary">
                  Total Attempts
                </h3>
              </div>
              <p className="mt-4 text-3xl font-bold text-slate-primary">
                {totalAttempts}
              </p>
            </div>

            <div className="rounded-sm border border-border bg-white p-6">
              <div className="flex items-center gap-3">
                <TrendingUp size={20} className="text-isc2-green" />
                <h3 className="text-sm font-semibold text-slate-secondary">
                  Global Pass Rate
                </h3>
              </div>
              <p className="mt-4 text-3xl font-bold text-slate-primary">
                {passRate}%
              </p>
            </div>

            <div className="rounded-sm border border-border bg-white p-6">
              <div className="flex items-center gap-3">
                <BarChart3 size={20} className="text-isc2-green" />
                <h3 className="text-sm font-semibold text-slate-secondary">
                  Average Score
                </h3>
              </div>
              <p className="mt-4 text-3xl font-bold text-slate-primary">
                {averageScoreScaled}
                <span className="text-sm font-normal text-slate-muted">
                  /1000
                </span>
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-sm border border-border bg-white p-6">
            <h2 className="mb-4 text-base font-semibold text-slate-primary">
              Recent Activity Log
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-secondary">
                <thead className="border-b border-border text-xs uppercase text-slate-500">
                  <tr>
                    <th className="pb-3 pr-4 font-semibold">Date</th>
                    <th className="pb-3 px-4 font-semibold">Mode</th>
                    <th className="pb-3 px-4 font-semibold">Score</th>
                    <th className="pb-3 pl-4 font-semibold">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[...attempts].reverse().map((a) => (
                    <tr key={a.id} className="hover:bg-slate-50">
                      <td className="py-3 pr-4">
                        {new Date(a.date).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 capitalize">{a.config.mode}</td>
                      <td className="py-3 px-4 font-medium">
                        {Math.round((a.score / a.totalQuestions) * 1000)}
                      </td>
                      <td className="py-3 pl-4">
                        <span
                          className={`inline-flex rounded-sm px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${
                            a.passed
                              ? 'bg-isc2-green/10 text-isc2-green'
                              : 'bg-red-50 text-red-600'
                          }`}
                        >
                          {a.passed ? 'Passed' : 'Failed'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
