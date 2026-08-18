import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ExternalLink, Library, BookOpen } from 'lucide-react';
import domains from '../data/domains.json';
import references from '../data/references.json';

export function Reviewer() {
  const [query, setQuery] = useState('');

  const filteredDomains = domains
    .map((d) => {
      const q = query.toLowerCase();
      const topicMatch = d.topics.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.keyTerms.some((k) => k.toLowerCase().includes(q))
      );
      const domainMatch =
        d.title.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q);
      
      if (!query) return d;
      if (domainMatch) return d;
      if (topicMatch.length > 0) return { ...d, topics: topicMatch };
      return null;
    })
    .filter(Boolean) as typeof domains;

  const filteredReferences = references.filter((ref) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      ref.title.toLowerCase().includes(q) ||
      ref.description.toLowerCase().includes(q) ||
      ref.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-slate-primary">
        Domain Knowledge Repository
      </h1>
      <p className="mt-2 text-sm text-slate-muted">
        Study materials organized across the official domains, plus supplementary external references.
      </p>

      {/* Search */}
      <div className="relative mt-8 max-w-xl">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-muted"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search topics, terms, and resources..."
          className="w-full rounded-sm border border-border bg-white py-3 pl-10 pr-4 text-sm text-slate-primary placeholder:text-slate-muted focus:border-isc2-green focus:outline-none shadow-sm"
        />
      </div>

      <div className="mt-16 flex flex-col gap-16">
        
        {/* Core Modules Section */}
        <section>
          <div className="mb-6 flex items-center gap-2 border-b border-border pb-4">
            <BookOpen size={20} className="text-slate-primary" />
            <h2 className="text-xl font-semibold text-slate-primary">Core Modules</h2>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredDomains.map((d) => (
              <Link
                key={d.id}
                to={`/reviewer/${d.id}`}
                className="group flex flex-col rounded-sm border border-border bg-white p-6 transition-colors hover:border-isc2-green shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-isc2-green text-sm font-bold text-white">
                    {d.number}
                  </span>
                  <h3 className="text-base font-semibold text-slate-primary group-hover:text-isc2-green leading-tight">
                    {d.title}
                  </h3>
                </div>
                
                <p className="mt-4 flex-1 text-xs leading-relaxed text-slate-muted">
                  {d.description}
                </p>
                
                <div className="mt-6 border-t border-border pt-4">
                  <p className="text-xs font-medium text-slate-secondary">
                    {d.topics.length} topics
                  </p>
                  <ul className="mt-2 space-y-1">
                    {d.topics.slice(0, 3).map((t) => (
                      <li
                        key={t.id}
                        className="truncate text-xs text-slate-muted before:mr-2 before:text-border before:content-['—']"
                      >
                        {t.title}
                      </li>
                    ))}
                    {d.topics.length > 3 && (
                      <li className="text-xs text-slate-400 italic">
                        + {d.topics.length - 3} more
                      </li>
                    )}
                  </ul>
                </div>
              </Link>
            ))}
            
            {filteredDomains.length === 0 && (
              <div className="col-span-full py-12 text-center border border-dashed border-border rounded-sm bg-slate-50">
                <p className="text-sm font-medium text-slate-primary">No core modules found</p>
                <p className="mt-1 text-xs text-slate-muted">Try adjusting your search query.</p>
              </div>
            )}
          </div>
        </section>

        {/* References Section */}
        <section>
          <div className="mb-6 flex items-center gap-2 border-b border-border pb-4">
            <Library size={20} className="text-slate-primary" />
            <h2 className="text-xl font-semibold text-slate-primary">External Resources</h2>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredReferences.map((ref) => (
              <a
                key={ref.id}
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-sm border border-border bg-white p-5 transition-colors hover:border-isc2-green shadow-sm"
              >
                <div className="mb-3 flex items-start justify-between gap-4">
                  <span className="inline-block rounded-sm bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    {ref.category}
                  </span>
                  <ExternalLink size={14} className="text-slate-400 group-hover:text-isc2-green shrink-0" />
                </div>
                
                <h3 className="text-sm font-semibold text-slate-primary group-hover:text-isc2-green">
                  {ref.title}
                </h3>
                
                <p className="mt-2 text-xs leading-relaxed text-slate-muted flex-1">
                  {ref.description}
                </p>
              </a>
            ))}

            {filteredReferences.length === 0 && (
              <div className="col-span-full py-12 text-center border border-dashed border-border rounded-sm bg-slate-50">
                <p className="text-sm font-medium text-slate-primary">No resources found</p>
                <p className="mt-1 text-xs text-slate-muted">Try adjusting your search query.</p>
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
