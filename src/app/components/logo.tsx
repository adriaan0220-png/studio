import Image from 'next/image';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-semibold group">
      <Image 
        src="/logo.png" 
        alt="Dorado.SL Logo" 
        width={24} 
        height={24} 
        className="transition-transform group-hover:rotate-12"
      />
      <span className="font-headline text-xl font-bold text-foreground whitespace-nowrap">
        Dorado.SL
      </span>
    </Link>
  );
}
