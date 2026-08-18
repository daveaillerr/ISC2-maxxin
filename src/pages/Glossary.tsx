import { useState } from 'react';
import { Search } from 'lucide-react';
import glossaryTerms from '../data/glossary.json';
import domains from '../data/domains.json';

export function Glossary() {
  const [query, setQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('All');

  const domainNames = ['All', ...domains.map((d) => d.title)];

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
      <h1 className="text-3xl font-bold tracking-tight text-slate-primary">
        Terminology & Acronym Index
      </h1>
      <p className="mt-2 text-sm text-slate-muted">
        Comprehensive glossary of standard ISC2 CC terminology and security
        frameworks.
      </p>

      {/* Filters */}
      <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full max-w-md shrink-0">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-muted"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search terms, abbreviations, definitions..."
            className="w-full rounded-sm border border-border bg-white py-2.5 pl-9 pr-4 text-sm text-slate-primary placeholder:text-slate-muted focus:border-isc2-green focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {domainNames.map((name) => (
            <button
              key={name}
              onClick={() => setSelectedDomain(name)}
              className={`rounded-sm border px-3 py-1.5 text-xs font-medium transition-colors ${
                selectedDomain === name
                  ? 'border-isc2-green bg-isc2-green text-white'
                  : 'border-border bg-white text-slate-secondary hover:border-slate-300'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* Terms List */}
      <div className="mt-8 overflow-hidden rounded-sm border border-border bg-white">
        {filtered.length > 0 ? (
          <ul className="divide-y divide-border">
            {filtered.map((item, index) => (
              <li
                key={index}
                className="p-6 transition-colors hover:bg-slate-50"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                  <h2 className="text-base font-bold text-slate-primary">
                    {item.term}
                    {item.abbreviation && (
                      <span className="ml-2 text-sm font-medium text-slate-500">
                        ({item.abbreviation})
                      </span>
                    )}
                  </h2>
                  <span className="shrink-0 rounded-sm bg-canvas-warm px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    {item.domain}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-secondary">
                  {item.definition}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-12 text-center">
            <p className="text-sm text-slate-muted">
              No terms match your current filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
