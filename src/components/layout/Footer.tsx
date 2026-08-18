export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-isc2-green">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm font-medium text-white/80">ISC2 CC Reviewer</p>
          <p className="text-xs text-white/50">
            &copy; {new Date().getFullYear()} &mdash; All rights reserved
          </p>
        </div>
        <hr className="my-4 border-white/10" />
        <p className="text-center text-xs leading-relaxed text-white/40">
          This is an independent study tool and is not affiliated with or
          endorsed by ISC2. All trademarks belong to their respective owners.
        </p>
      </div>
    </footer>
  );
}
