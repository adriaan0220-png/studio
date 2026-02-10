
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/app/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

export default function LoginPage() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://sheetdb.io/api/v1/64gi8fmqcbxx4/search?usuari=${usuario}&sheet=usuaris`);
      if (!response.ok) {
        throw new Error('No s\'ha pogut connectar amb el servidor.');
      }
      
      const data: any[] = await response.json();

      if (data.length > 0 && String(data[0].pasword) === password) {
        // Correct credentials
        localStorage.setItem('userName', data[0].usuari);
        localStorage.setItem('userCompany', data[0].empresa);
        router.push('/dashboard');
      } else {
        // Incorrect credentials
        setError('Dades incorrectes. Verifiqueu el vostre usuari i contrasenya.');
      }
    } catch (err) {
      setError('Hi ha hagut un problema amb la connexió. Si us plau, intenteu-ho de nou més tard.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 flex-1">
      <PageHeader
        title={<span className="text-secondary">Àrea de Clients</span>}
        description="Accedeixi al seu panell per gestionar els seus enviaments."
      />
      <div className="flex justify-center">
        <Card className="w-full max-w-md">
          <form onSubmit={handleLogin}>
            <CardHeader>
              <CardTitle>Iniciar Sessió</CardTitle>
              <CardDescription>
                Introdueixi les seves credencials per accedir.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <Terminal className="h-4 w-4" />
                  <AlertTitle>Error d'accés</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="usuario">Usuari</Label>
                <Input
                  id="usuario"
                  placeholder="El seu nom d'usuari"
                  required
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contrasenya</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Verificant...' : 'Entrar'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
