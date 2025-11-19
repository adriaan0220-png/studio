import { Anchor } from 'lucide-react';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-semibold group">
      <Anchor className="h-6 w-6 text-primary transition-transform group-hover:rotate-12" />
      <span className="font-headline text-xl font-bold text-foreground whitespace-nowrap">
        Dorado.SL
      </span>
    </Link>
  );
}
