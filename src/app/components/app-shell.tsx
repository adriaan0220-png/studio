'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calculator, ClipboardList, Droplets, Menu, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/app/components/logo';

const navItems = [
  { href: '/', label: 'Estimador', icon: Calculator },
  { href: '/products', label: 'Productos', icon: Droplets },
  { href: '/fleet', label: 'Nuestra Flota', icon: Truck },
  { href: '/orders', label: 'Mis Pedidos', icon: ClipboardList },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  const navLinks = (closeSheet?: () => void) => (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {navItems.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          onClick={closeSheet}
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
  );

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-card md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Logo />
          </div>
          <div className="flex-1 overflow-auto py-2">
            {navLinks()}
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6 md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Alternar menú de navegación</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-0 w-[280px] bg-card">
              <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                <Logo />
              </div>
              <div className="flex-1 overflow-auto py-2">
                {navLinks(() => setIsSheetOpen(false))}
              </div>
            </SheetContent>
          </Sheet>
          <div className="md:hidden flex-1 flex justify-center">
            <Logo />
          </div>
          <div className="w-8 md:hidden" />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-8 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
