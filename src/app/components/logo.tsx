import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-semibold group">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform group-hover:rotate-12 text-primary"
      >
        <path d="M3 3v18h18" />
        <path d="M18.7 8a6 6 0 0 0-8.4-8.4" />
        <path d="M14 14a6 6 0 0 0-8.4 8.4" />
      </svg>
      <span className="font-headline text-xl font-bold text-foreground whitespace-nowrap">
        Dorado.SL
      </span>
    </Link>
  );
}
