'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/app/components/page-header';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export default function AreaPrivadaPage() {
  const [userName, setUserName] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // This check only runs on the client
    const name = localStorage.getItem('userName');
    
    if (name) {
      setUserName(name);
    } else {
      // If there's no user data, redirect to login
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('userCompany');
    router.push('/login');
  };

  // While checking auth state, show nothing to prevent incorrect content flash
  if (!userName) {
    return null;
  }

  return (
    <div className="p-4 md:p-8 flex-1 bg-muted/20">
        <div className="flex justify-between items-start mb-6">
            <PageHeader
                title={`Benvingut ${userName}`}
            />
            <Button variant="outline" onClick={handleLogout} className="ml-4 flex-shrink-0">
                <LogOut className="mr-2 h-4 w-4" />
                Sortir
            </Button>
      </div>
       <div className="p-4">
        <p>Aquesta és la teva àrea privada.</p>
      </div>
    </div>
  );
}
