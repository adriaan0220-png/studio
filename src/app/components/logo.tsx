import Link from 'next/link';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-semibold group">
      <Image
        src="/logo sin fondo.png"
        alt="Ttiko Trans Logo"
        width={288}
        height={64}
        className="h-16 w-auto"
      />
    </Link>
  );
}
