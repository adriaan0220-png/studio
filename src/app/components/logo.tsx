import Link from 'next/link';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-semibold group">
      <Image
        src="https://storage.googleapis.com/debbie-419815.appspot.com/uploads/prod/image/34a0247659a8425d97f259c1186b36ab/tetiko.png"
        alt="Logitrans Logo"
        width={150}
        height={40}
        className="h-10 w-auto"
      />
    </Link>
  );
}
