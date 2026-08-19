import { useState } from 'react';
import { Search, BookOpen, Filter } from 'lucide-react';
import glossaryTerms from '../data/glossary.json';

export function Glossary() {
  const [query, setQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('All');

  const domainNames = ['All', 'Security Principles', 'Business Continuity, DR & IR', 'Access Controls', 'Network Security', 'Security Operations'];

  const filtered = glossaryTerms.filter((term) => {
    const matchesDomain =
      selectedDomain === 'All' || term.domain.includes(selectedDomain);
    const q = query.toLowerCase();
    const matchesQuery =
      term.term.toLowerCase().includes(q) ||
      (term.abbreviation && term.abbreviation.toLowerCase().includes(q)) ||
      term.definition.toLowerCase().includes(q);

    return matchesDomain && matchesQuery;
  });

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-isc2-green/10">
            <BookOpen size={20} className="text-isc2-green" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-primary">
            Terminology & Acronym Index
          </h1>
        </div>
        <p className="text-base text-slate-muted">
          Comprehensive glossary of standard ISC2 CC terminology and security frameworks.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:gap-6">
        <div className="flex-1 max-w-md">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-muted mb-2">
            Search
          </label>
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-muted"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search terms, abbreviations, definitions..."
              className="w-full rounded-lg border border-border bg-white py-3 pl-12 pr-4 text-sm text-slate-primary placeholder:text-slate-muted focus:border-isc2-green focus:ring-1 focus:ring-isc2-green/20 outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-muted mb-2">
            <Filter size={14} />
            Domain
          </label>
          <div className="flex flex-wrap gap-2">
            {domainNames.map((name) => (
              <button
                key={name}
                onClick={() => setSelectedDomain(name)}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                  selectedDomain === name
                    ? 'border-isc2-green bg-isc2-green text-white shadow-md'
                    : 'border-border bg-white text-slate-secondary hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Terms List */}
      <div className="rounded-2xl border border-border bg-white shadow-sm">
        {filtered.length > 0 ? (
          <div className="divide-y divide-slate-200">
            {filtered.map((item, index) => (
              <div
                key={index}
                className="p-8 transition-all hover:bg-gradient-to-r hover:from-isc2-green/5 hover:to-transparent"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <h2 className="text-lg font-bold text-slate-primary">
                      {item.term}
                      {item.abbreviation && (
                        <span className="ml-3 text-sm font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full inline-block">
                          {item.abbreviation}
                        </span>
                      )}
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-slate-secondary">
                      {item.definition}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-lg bg-isc2-green/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-isc2-green mt-4 sm:mt-0">
                    {item.domain}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-16 text-center">
            <BookOpen size={48} className="mx-auto mb-4 text-slate-300" />
            <p className="text-base font-semibold text-slate-primary mb-1">
              No terms match your search
            </p>
            <p className="text-sm text-slate-muted">
              Try adjusting your filters or search query.
            </p>~
          </div>
        )}
      </div>

      {filtered.length > 0 && (
        <div className="mt-8 text-center text-sm text-slate-muted">
          Showing {filtered.length} of {glossaryTerms.length} terms
        </div>
      )}
    </div>
  );
}
