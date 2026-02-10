import Link from 'next/link';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-semibold group">
      <Image
        src="/logo sin fondo.png"
        alt="Logotip de Ttiko Trans"
        width={432}
        height={96}
        className="h-28 w-auto"
      />
    </Link>
  );
}
