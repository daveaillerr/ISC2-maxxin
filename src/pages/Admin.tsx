import { useState } from 'react';
import { Lock, BarChart3, Users, TrendingUp, Activity, Target } from 'lucide-react';
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
        <div className="w-full max-w-sm rounded-2xl border border-border bg-white p-8 shadow-lg">
          <div className="mb-6 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-isc2-green/10 to-isc2-green/5 text-isc2-green">
              <Lock size={28} />
            </div>
          </div>
          <h1 className="mb-2 text-center text-2xl font-bold text-slate-primary">
            Admin Access
          </h1>
          <p className="mb-8 text-center text-sm text-slate-muted">
            Enter your credentials to access the administration dashboard.
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Passcode"
                className={`w-full rounded-lg border bg-white px-4 py-3 text-sm transition-all focus:outline-none ${
                  error
                    ? 'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500/20'
                    : 'border-border focus:border-isc2-green focus:ring-1 focus:ring-isc2-green/20'
                }`}
              />
              {error && (
                <p className="mt-2 text-xs text-red-600">Invalid passcode. Please try again.</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-isc2-green px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-isc2-green-light hover:shadow-md"
            >
              Access Dashboard
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

  const recentAttempts = [...attempts].reverse().slice(0, 8);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <div className="mb-12 flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-primary mb-2">
            Administration Dashboard
          </h1>
          <p className="text-sm text-slate-muted">
            Monitor candidate performance metrics and system telemetry.
          </p>
        </div>
        <button
          onClick={() => setIsAuthenticated(false)}
          className="px-4 py-2 text-sm font-medium text-slate-secondary hover:text-slate-primary hover:bg-slate-50 rounded-lg transition-all"
        >
          Lock Session
        </button>
      </div>

      {totalAttempts === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-16 text-center">
          <BarChart3 size={48} className="mx-auto mb-4 text-slate-300" />
          <p className="text-lg font-semibold text-slate-primary mb-2">
            No telemetry data available
          </p>
          <p className="text-sm text-slate-muted">
            Analytics will populate once candidates complete exam sessions.
          </p>
        </div>
      ) : (
        <>
          {/* Stats Bento Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
            {/* Total Attempts */}
            <div className="rounded-2xl border border-border bg-white p-8 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-xs font-semibold text-slate-muted mb-2 uppercase">Total Attempts</p>
                  <p className="text-4xl font-bold text-slate-primary">{totalAttempts}</p>
                </div>
                <Users className="text-isc2-green opacity-20" size={32} />
              </div>
              <p className="text-xs text-slate-muted">Completed exam sessions</p>
            </div>

            {/* Pass Rate */}
            <div className="rounded-2xl border border-border bg-white p-8 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-xs font-semibold text-slate-muted mb-2 uppercase">Global Pass Rate</p>
                  <p className="text-4xl font-bold text-isc2-green">{passRate}%</p>
                </div>
                <TrendingUp className="text-isc2-green opacity-20" size={32} />
              </div>
              <p className="text-xs text-slate-muted">{passedAttempts} of {totalAttempts} passed</p>
            </div>

            {/* Average Score */}
            <div className="rounded-2xl border border-border bg-white p-8 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-xs font-semibold text-slate-muted mb-2 uppercase">Average Score</p>
                  <p className="text-4xl font-bold text-slate-primary">{averageScoreScaled}</p>
                  <p className="text-xs text-slate-muted">/ 1000</p>
                </div>
                <BarChart3 className="text-isc2-green opacity-20" size={32} />
              </div>
              <p className="text-xs text-slate-muted">Across all attempts</p>
            </div>
          </div>

          {/* Recent Activity Log - Full Width Bento */}
          <div className="rounded-2xl border border-border bg-white p-8 shadow-sm">
            <div className="mb-8 flex items-center gap-3">
              <Activity size={24} className="text-isc2-green" />
              <div>
                <h2 className="text-xl font-bold text-slate-primary">Recent Activity Log</h2>
                <p className="text-sm text-slate-muted">Latest exam attempts</p>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="pb-4 pr-4 text-left text-xs font-bold uppercase tracking-wider text-slate-muted">Date</th>
                    <th className="pb-4 px-4 text-left text-xs font-bold uppercase tracking-wider text-slate-muted">Mode</th>
                    <th className="pb-4 px-4 text-left text-xs font-bold uppercase tracking-wider text-slate-muted">Score</th>
                    <th className="pb-4 px-4 text-left text-xs font-bold uppercase tracking-wider text-slate-muted">Percentage</th>
                    <th className="pb-4 pl-4 text-left text-xs font-bold uppercase tracking-wider text-slate-muted">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {recentAttempts.map((a) => (
                    <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 pr-4 text-slate-primary">
                        <span className="font-medium">{new Date(a.date).toLocaleDateString()}</span>
                        <p className="text-xs text-slate-muted mt-1">{new Date(a.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                      </td>
                      <td className="py-4 px-4 capitalize text-slate-secondary font-medium">{a.config.mode}</td>
                      <td className="py-4 px-4 font-bold text-slate-primary">
                        {Math.round((a.score / a.totalQuestions) * 1000)}
                      </td>
                      <td className="py-4 px-4 text-slate-primary">
                        {Math.round((a.score / a.totalQuestions) * 100)}%
                      </td>
                      <td className="py-4 pl-4">
                        <span
                          className={`inline-flex rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
                            a.passed
                              ? 'bg-isc2-green/15 text-isc2-green border border-isc2-green/30'
                              : 'bg-red-50 text-red-600 border border-red-200'
                          }`}
                        >
                          {a.passed ? '✓ Passed' : '✗ Failed'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {recentAttempts.length < attempts.length && (
              <div className="mt-6 text-center">
                <p className="text-xs text-slate-muted">
                  Showing {recentAttempts.length} of {totalAttempts} total attempts
                </p>
              </div>
            )}
          </div>

          {/* Additional Insights */}
          <div className="grid gap-6 sm:grid-cols-2 mt-12">
            {/* Attempt Distribution */}
            <div className="rounded-2xl border border-border bg-white p-8 shadow-sm">
              <h3 className="mb-6 text-lg font-bold text-slate-primary">Mode Distribution</h3>
              <div className="space-y-4">
                {['full', 'domain', 'practice'].map((mode) => {
                  const modeAttempts = attempts.filter(a => a.config.mode === mode).length;
                  const percentage = (modeAttempts / totalAttempts) * 100;
                  return (
                    <div key={mode}>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-slate-primary capitalize">{mode} Mode</p>
                        <p className="text-sm font-bold text-isc2-green">{modeAttempts}</p>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-isc2-green to-isc2-green-light h-full transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Success Metrics */}
            <div className="rounded-2xl border border-border bg-white p-8 shadow-sm">
              <h3 className="mb-6 text-lg font-bold text-slate-primary">Success Metrics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-isc2-green/10 to-isc2-green/5 rounded-lg">
                  <span className="text-sm font-medium text-slate-primary">Passed Attempts</span>
                  <span className="text-2xl font-bold text-isc2-green">{passedAttempts}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-red-50/50 rounded-lg">
                  <span className="text-sm font-medium text-slate-primary">Failed Attempts</span>
                  <span className="text-2xl font-bold text-red-600">{totalAttempts - passedAttempts}</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
