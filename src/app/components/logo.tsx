import Link from 'next/link';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-semibold group">
      <Image 
        src="https://d2q79iu7y748jz.cloudfront.net/s/_squarelogo/6cddb7bda98e46d2d54e325f4ed3d2f6"
        alt="EB Trans Ibérica Logo"
        width={32}
        height={32}
        className="rounded-md"
      />
      <span className="font-headline text-xl font-bold text-foreground whitespace-nowrap">
        EB Trans Ibérica
      </span>
    </Link>
  );
}
