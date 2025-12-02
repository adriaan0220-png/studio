import { Button } from '@/components/ui/button';
import Link from 'next/link';

type PageHeaderProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl font-headline">
          {title}
        </h1>
        {description && (
          <p className="mt-2 text-lg text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="flex gap-2 flex-shrink-0">
        <Button asChild>
          <Link href="/order/new">Demanar Pressupost</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/order/new">Cotizar</Link>
        </Button>
        {children}
      </div>
    </div>
  );
}
