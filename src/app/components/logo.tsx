import Link from 'next/link';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-semibold group">
      <Image
        src="https://storage.googleapis.com/debbie-419815.appspot.com/uploads/prod/image/33215be1-8b01-4475-a01b-c744c68066f1/tetiko-trans-logo.png"
        alt="Tetiko Trans Logo"
        width={180}
        height={40}
        className="h-10 w-auto"
      />
    </Link>
  );
}
