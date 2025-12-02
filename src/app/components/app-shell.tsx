'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calculator, ClipboardList, Droplets, Menu, Truck, Settings, Users, Mail, Newspaper, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/app/components/logo';
import { cn } from '@/lib/utils';
import { Footer } from './footer';

const navItems = [
  { href: '/', label: 'Inicio', icon: Home },
  { href: '/servicios', label: 'Servicios', icon: Settings },
  { href: '/quien-somos', label: 'Quiénes Somos', icon: Users },
  { href: '/contacto', label: 'Contacto', icon: Mail },
  { href: '/blog', label: 'Blog', icon: Newspaper },
  { href: '/formulario', label: 'Formulario', icon: FileText },
  { href: '/products', label: 'Productos', icon: Droplets },
  { href: '/nuestra-flota', label: 'Nuestra Flota', icon: Truck },
  { href: '/orders', label: 'Mis Pedidos', icon: ClipboardList },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  const navLinks = (className?: string, closeSheet?: () => void) => (
    <nav className={cn('flex items-center gap-4 text-sm font-medium', className)}>
      {navItems.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          onClick={closeSheet}
          className={cn(
            'transition-colors hover:text-primary',
            pathname === href ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  );

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6">
        <Logo />
        <div className="hidden md:flex flex-1 items-center justify-center">
            {navLinks('gap-6')}
        </div>
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden ml-auto">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Alternar menú de navegación</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col p-0 w-[280px] bg-card">
            <div className="flex h-16 items-center border-b px-6">
              <Logo />
            </div>
            <div className="flex-1 overflow-auto py-4">
              <nav className="grid gap-2 px-4 text-base font-medium">
              {navItems.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsSheetOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                    pathname === href
                      ? 'bg-muted text-primary'
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
        <div className="w-8 md:hidden" />
      </header>
      <main className="flex-1 flex-col">
        {children}
      </main>
      <Footer />
    </div>
  );
}
