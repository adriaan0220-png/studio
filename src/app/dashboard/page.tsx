
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/app/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, User, LogOut } from 'lucide-react';

export default function DashboardPage() {
  const [userName, setUserName] = useState<string | null>(null);
  const [userCompany, setUserCompany] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // This check only runs on the client
    const name = localStorage.getItem('userName');
    const company = localStorage.getItem('userCompany');

    if (name && company) {
      setUserName(name);
      setUserCompany(company);
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
    <div className="p-8 flex-1 bg-blue-50">
      <div className="flex justify-between items-start mb-4">
        <PageHeader
          title={`Benvingut a la teva zona privada, ${userName}`}
          description="Aquí pot veure un resum del seu compte."
        />
        <Button variant="outline" onClick={handleLogout} className="ml-4 flex-shrink-0">
          <LogOut className="mr-2 h-4 w-4" />
          Sortir
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Informació de l'Usuari</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <User className="h-6 w-6 text-muted-foreground" />
            <p className="text-lg">
              <span className="font-semibold">Nom:</span> {userName}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Building className="h-6 w-6 text-muted-foreground" />
            <p className="text-lg">
              <span className="font-semibold">Empresa:</span> {userCompany}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
