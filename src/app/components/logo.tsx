import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-semibold group">
      <div className="w-8 h-8 rounded-md bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center text-white">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M10 17h4"/><path d="M6 17h-2.5"/><path d="M14 17h2.5"/><path d="M18 17H12v-5H4V8h14v4Z"/><path d="M4 12V8H2"/><path d="M10 4h4"/><path d="M10 8V4h-1"/></svg>
      </div>
      <span className="font-headline text-xl font-bold text-foreground whitespace-nowrap">
        Ttiko trans, S.L.
      </span>
    </Link>
  );
}
