import { useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import domains from '../data/domains.json';

export function ReviewerDomain() {
  const { domainId } = useParams<{ domainId: string }>();
  const domain = domains.find((d) => d.id === domainId);

  if (!domain) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <p className="text-sm text-slate-muted">Domain not found.</p>
        <Link
          to="/reviewer"
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-isc2-green hover:underline"
        >
          <ChevronLeft size={14} />
          Back to repository
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      {/* Back link */}
      <Link
        to="/reviewer"
        className="inline-flex items-center gap-1 text-xs font-medium text-isc2-green hover:underline"
      >
        <ChevronLeft size={14} />
        Back to repository
      </Link>

      <div className="mt-6 flex gap-8">
        {/* Sidebar */}
        <aside className="hidden w-60 shrink-0 lg:block">
          <div className="sticky top-24 space-y-1">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-muted">
              Contents
            </p>
            {domain.topics.map((t) => (
              <a
                key={t.id}
                href={`#${t.id}`}
                className="block border-l-2 border-transparent py-1.5 pl-3 text-xs text-slate-secondary transition-colors hover:border-isc2-green hover:text-isc2-green"
              >
                {t.title}
              </a>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <div className="min-w-0 flex-1">
          <div className="mb-8 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-isc2-green text-sm font-bold text-white">
              {domain.number}
            </span>
            <h1 className="text-2xl font-bold text-slate-primary">
              {domain.title}
            </h1>
          </div>
          <p className="mb-10 text-sm leading-relaxed text-slate-muted">
            {domain.description}
          </p>

          {domain.topics.map((topic) => (
            <section key={topic.id} id={topic.id} className="mb-12 scroll-mt-24">
              <h2 className="border-b border-border pb-2 text-lg font-semibold text-slate-primary">
                {topic.title}
              </h2>
              <div className="mt-4 space-y-4">
                {topic.content.split('\n\n').map((para, i) => (
                  <p
                    key={i}
                    className="text-sm leading-relaxed text-slate-secondary"
                  >
                    {para}
                  </p>
                ))}
              </div>
              {topic.keyTerms.length > 0 && (
                <div className="mt-6 rounded-sm border border-border bg-canvas-warm p-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-muted">
                    Key Terms
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {topic.keyTerms.map((term) => (
                      <span
                        key={term}
                        className="rounded-sm bg-isc2-green/10 px-2 py-1 text-xs font-medium text-isc2-green"
                      >
                        {term}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
