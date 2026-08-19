import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-gradient-to-r from-slate-900 to-slate-800">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3 mb-8">
          <div>
            <h3 className="text-sm font-bold text-white mb-2">ISC2 CC Reviewer</h3>
            <p className="text-xs text-white/60">
              A comprehensive study platform for the ISC2 Certified in Cybersecurity certification.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white mb-2">Resources</h3>
            <ul className="text-xs text-white/60 space-y-1">
              <li><Link to="/exam">Exam Simulator</Link></li>
              <li><Link to="/reviewer">Study Materials</Link></li>
              <li><Link to="/glossary">Glossary</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white mb-2">Support</h3>
            <ul className="text-xs text-white/60 space-y-1">
              <li><a href="https://www.isc2.org" target="_blank" rel="noreferrer"  >ISC2</a></li>
              <li><a href="https://www.isc2.org/frequently-asked-questions" target="_blank" rel="noreferrer"  >FAQ</a></li>
              <li><a href="mailto:drivas.aillerr@gmail.com" target="_blank" rel="noreferrer"  >Contact Dev</a></li>
            </ul>
          </div>
        </div>
        
        <hr className="border-white/10 my-8" />
        
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/50">
            &copy; {new Date().getFullYear()} ISC2 CC Reviewer. All rights reserved.
          </p>
          <p className="text-xs text-white/40">
            Independent study tool. Not affiliated with or endorsed by ISC2.
          </p>
        </div>
      </div>
    </footer>
  );
}
