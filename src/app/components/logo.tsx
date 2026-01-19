import Link from 'next/link';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-semibold group">
      <Image
        src="/Dorado_Adrián_Logo.png"
        alt="Tetiko Trans Logo"
        width={180}
        height={40}
        className="h-10 w-auto"
      />
    </Link>
  );
}
