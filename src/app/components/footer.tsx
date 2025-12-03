
'use client';

import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';

export function Footer() {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const date = new Date();
    const formattedDate = `${date.getDate()} de ${date.toLocaleString('ca-ES', { month: 'long' })} de ${date.getFullYear()}`;
    setCurrentDate(formattedDate);
  }, []);

  return (
    <footer className="bg-muted text-card-foreground border-t">
      <div className="container mx-auto py-8 px-4 md:px-6 text-center">
        <p className="font-semibold text-lg">EB TRANS IBÉRICA</p>
        <p className="text-muted-foreground text-sm mb-4">Transporte profesional en cisternas</p>
        
        <div className="flex justify-center gap-4 md:gap-6 mb-4 text-sm">
          <Link href="/aviso-legal" className="text-muted-foreground hover:text-primary transition-colors">
            Aviso Legal
          </Link>
          <Link href="/politica-de-privacidad" className="text-muted-foreground hover:text-primary transition-colors">
            Política de Privacidad
          </Link>
          <Link href="/politica-de-cookies" className="text-muted-foreground hover:text-primary transition-colors">
            Política de Cookies
          </Link>
        </div>
        
        <Separator className="my-4 w-24 mx-auto" />
        
        <div className="text-sm text-muted-foreground mb-4">
            <a href="tel:+34647000000" className="hover:text-primary transition-colors">Tel.: +34 647 000 000</a>
            <span className="mx-2">|</span>
            <a href="mailto:info@ebtransiberica.com" className="hover:text-primary transition-colors">info@ebtransiberica.com</a>
        </div>
        
        <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} EB TRANS IBÉRICA</p>
        {currentDate && (
          <p className="text-xs text-muted-foreground mt-1">
            ver. 1.0 | {currentDate}
          </p>
        )}
      </div>
    </footer>
  );
}
