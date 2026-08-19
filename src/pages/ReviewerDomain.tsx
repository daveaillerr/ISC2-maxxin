import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, BookMarked, Tag } from 'lucide-react';
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
      {/* Header */}
      <div className="mb-12 flex items-center gap-4">
        <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-isc2-green text-base font-bold text-white shadow-md">
          {domain.number}
        </span>
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-primary mb-2">
            {domain.title}
          </h1>
          <p className="text-slate-muted max-w-2xl">
            {domain.description}
          </p>
        </div>
      </div>

      <div className="mt-8 flex gap-8">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24 rounded-2xl border border-border bg-white p-6 shadow-sm">
            <Link
              to="/reviewer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-isc2-green hover:text-isc2-green-light mb-6 pb-6 border-b border-border transition-all"
            >
              <ChevronLeft size={16} />
              Back to Repository
            </Link>

            <p className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-muted flex items-center gap-2">
              <BookMarked size={14} />
              Contents
            </p>
            <nav className="space-y-1">
              {domain.topics.map((t) => (
                <a
                  key={t.id}
                  href={`#${t.id}`}
                  className="block py-2 pl-4 text-sm text-slate-secondary transition-all hover:text-isc2-green hover:bg-isc2-green/5 border-l-2 border-transparent hover:border-isc2-green rounded-r-lg"
                >
                  {t.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <div className="min-w-0 flex-1">
          {domain.topics.map((topic, idx) => (
            <section key={topic.id} id={topic.id} className="mb-16 scroll-mt-24">
              <div className="mb-8 flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-isc2-green/10 text-isc2-green font-bold">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-slate-primary mb-2">
                    {topic.title}
                  </h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-isc2-green to-isc2-green-light rounded-full" />
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-white p-8 shadow-sm">
                <div className="space-y-6">
                  {topic.content.split('\n\n').map((para, i) => (
                    <p
                      key={i}
                      className="text-base leading-relaxed text-slate-secondary"
                    >
                      {para}
                    </p>
                  ))}
                </div>

                {topic.keyTerms.length > 0 && (
                  <div className="mt-8 pt-8 border-t border-slate-200">
                    <div className="flex items-center gap-2 mb-4">
                      <Tag size={18} className="text-isc2-green" />
                      <h3 className="text-base font-bold text-slate-primary">Key Terms</h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {topic.keyTerms.map((term) => (
                        <span
                          key={term}
                          className="rounded-full bg-isc2-green/10 border border-isc2-green/20 px-4 py-2 text-sm font-semibold text-isc2-green hover:bg-isc2-green/20 transition-all cursor-default"
                        >
                          {term}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
