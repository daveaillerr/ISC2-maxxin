import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { to: '/reviewer', label: 'Reviewer' },
  { to: '/exam', label: 'Exam Simulator' },
  { to: '/glossary', label: 'Glossary' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <header className="relative z-50 bg-isc2-green">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link to="/" className="nav-v2-brand">
          <span className="nav-v2-brand-main">ISC2-MAXXIN</span>
          <span className="nav-v2-brand-sub">CC prep</span>
        </Link>
        <div className="nav-v2-links">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className={`nav-v2-link ${isActive(link.to) ? 'is-active' : ''}`}>
              {link.label}
            </Link>
          ))}
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="nav-v2-toggle md:hidden" aria-label="Toggle navigation">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-isc2-green px-6 pb-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`block py-3 text-sm font-semibold transition-colors ${
                isActive(link.to)
                  ? 'text-white border-l-2 border-white pl-2'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
