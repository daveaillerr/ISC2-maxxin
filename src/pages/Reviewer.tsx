import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ExternalLink, Library, BookOpen, ArrowRight } from 'lucide-react';
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
      <div className="mb-12">
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-primary mb-3">
          Domain Knowledge Repository
        </h1>
        <p className="text-base text-slate-muted max-w-2xl">
          Study materials organized across the official ISC2 domains, plus supplementary external resources and references.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-12 max-w-2xl">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-muted"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search topics, terms, and resources..."
          className="w-full rounded-lg border border-border bg-white py-3.5 pl-12 pr-4 text-sm text-slate-primary placeholder:text-slate-muted focus:border-isc2-green focus:ring-1 focus:ring-isc2-green/20 outline-none transition-all "
        />
      </div>

      <div className="space-y-16">
        
        {/* Core Modules Section */}
        <section>
          <div className="mb-8 flex items-center gap-3 pb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-isc2-green/10">
              <BookOpen size={20} className="text-isc2-green" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-primary">Core Modules</h2>
              <p className="text-sm text-slate-muted mt-1">Complete study materials for all certification domains</p>
            </div>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredDomains.map((d, idx) => (
              <Link
                key={d.id}
                to={`/reviewer/${d.id}`}
                className="group flex flex-col rounded-2xl border border-border bg-white p-7   hover:border-isc2-green transition-all transform hover:-translate-y-1 overflow-hidden"
              >
                
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-isc2-green text-base font-bold text-white ">
                      {d.number}
                    </span>
                    <span className="text-xs font-bold text-slate-muted uppercase bg-slate-50 px-2.5 py-1 rounded-full">
                      {d.topics.length} topics
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-primary group-hover:text-isc2-green leading-tight transition-colors mb-3">
                    {d.title}
                  </h3>
                  
                  <p className="text-sm leading-relaxed text-slate-secondary mb-6">
                    {d.description}
                  </p>
                  
                  <div className="border-t border-slate-200 pt-4">
                    <p className="text-xs font-semibold text-slate-muted mb-3 uppercase">Quick topics:</p>
                    <ul className="space-y-2 mb-4">
                      {d.topics.slice(0, 3).map((t) => (
                        <li
                          key={t.id}
                          className="text-xs text-slate-muted before:mr-2 before:text-isc2-green/50 before:content-['✓']"
                        >
                          {t.title}
                        </li>
                      ))}
                      {d.topics.length > 3 && (
                        <li className="text-xs text-slate-400 font-medium">
                          + {d.topics.length - 3} more topics
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-isc2-green font-semibold group-hover:gap-3 transition-all text-sm">
                    Explore Domain <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
            
            {filteredDomains.length === 0 && (
              <div className="col-span-full py-16 text-center border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50">
                <BookOpen size={32} className="mx-auto mb-3 text-slate-300" />
                <p className="text-base font-semibold text-slate-primary mb-1">No core modules found</p>
                <p className="text-sm text-slate-muted">Try adjusting your search query to find relevant materials.</p>
              </div>
            )}
          </div>
        </section>

        {/* References Section */}
        <section>
          <div className="mb-8 flex items-center gap-3 pb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
              <Library size={20} className="text-blue-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-primary">External Resources</h2>
              <p className="text-sm text-slate-muted mt-1">Curated references and supplementary materials</p>
            </div>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredReferences.map((ref) => (
              <a
                key={ref.id}
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-2xl border border-border bg-white p-6   hover:border-blue-500 transition-all transform hover:-translate-y-1"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <span className="inline-flex rounded-lg bg-blue-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-600">
                    {ref.category}
                  </span>
                  <ExternalLink size={16} className="text-slate-300 group-hover:text-blue-500 shrink-0 transition-colors" />
                </div>
                
                <h3 className="text-base font-bold text-slate-primary group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                  {ref.title}
                </h3>
                
                <p className="text-sm leading-relaxed text-slate-muted flex-1">
                  {ref.description}
                </p>

                <div className="mt-4 text-xs font-semibold text-blue-600 group-hover:text-blue-700 flex items-center gap-1">
                  Visit Resource <ArrowRight size={12} />
                </div>
              </a>
            ))}

            {filteredReferences.length === 0 && (
              <div className="col-span-full py-16 text-center border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50">
                <Library size={32} className="mx-auto mb-3 text-slate-300" />
                <p className="text-base font-semibold text-slate-primary mb-1">No resources found</p>
                <p className="text-sm text-slate-muted">Try adjusting your search query to find relevant materials.</p>
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
