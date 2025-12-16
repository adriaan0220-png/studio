
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PageHeader } from '@/app/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, User, LogOut, PlusCircle, ClipboardList, Search, Settings, ChevronRight } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const quickLinks = [
    { title: 'Crear Pressupost', href: '/order/new', icon: PlusCircle, description: 'Sol·liciti un nou transport.' },
    { title: 'Els Meus Pedidos', href: '/orders', icon: ClipboardList, description: 'Consulti l\'historial i estat.' },
    { title: 'Localitzar Enviament', href: '/tracking', icon: Search, description: 'Segueixi la seva mercaderia.' },
    { title: 'Gestionar Perfil', href: '#', icon: Settings, description: 'Configuri les seves dades.' },
];

const recentOrders = [
    { id: '2024-07-125', product: 'Glicerina', destination: 'Marsella', status: 'En Trànsit' },
    { id: '2024-07-124', product: 'Oli de Gira-sol', destination: 'Lió', status: 'Entregat' },
    { id: '2024-07-123', product: 'Etanol', destination: 'Tarragona', status: 'Entregat' },
];


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
    <div className="p-4 md:p-8 flex-1 bg-muted/20">
        <div className="flex justify-between items-start mb-6">
            <PageHeader
            title={`Benvingut, ${userName}`}
            description="Aquí pot gestionar els seus enviaments i consultes."
            />
            <Button variant="outline" onClick={handleLogout} className="ml-4 flex-shrink-0">
            <LogOut className="mr-2 h-4 w-4" />
            Sortir
            </Button>
      </div>

      <div className="space-y-8">
        {/* Quick Actions */}
        <section>
             <h2 className="text-2xl font-bold font-headline mb-4">Accions Ràpides</h2>
             <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {quickLinks.map(link => (
                    <Link href={link.href} key={link.title}>
                        <Card className="hover:bg-muted/50 hover:shadow-md transition-all h-full flex flex-col">
                            <CardHeader className="flex-row items-center gap-4 space-y-0">
                                <div className="p-3 bg-primary/10 rounded-lg">
                                    <link.icon className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle className="text-lg">{link.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-sm text-muted-foreground">{link.description}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Activity */}
            <section className="lg:col-span-2">
                 <h2 className="text-2xl font-bold font-headline mb-4">Activitat Recent</h2>
                <Card>
                    <CardContent className="p-0">
                        <Table>
                             <TableHeader>
                                <TableRow>
                                    <TableHead>Nº Pedido</TableHead>
                                    <TableHead>Producte</TableHead>
                                    <TableHead>Destí</TableHead>
                                    <TableHead>Estat</TableHead>
                                    <TableHead className="text-right"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentOrders.map(order => (
                                    <TableRow key={order.id}>
                                        <TableCell className="font-medium">{order.id}</TableCell>
                                        <TableCell>{order.product}</TableCell>
                                        <TableCell>{order.destination}</TableCell>
                                        <TableCell>
                                            <Badge 
                                                variant={order.status === 'Entregat' ? 'secondary' : 'default'}
                                                className={order.status === 'En Trànsit' ? 'bg-amber-500 text-white' : ''}
                                            >
                                                {order.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                             <Button variant="ghost" size="icon" asChild>
                                                <Link href="/orders">
                                                    <ChevronRight className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </section>

            {/* User Info */}
            <section>
                 <h2 className="text-2xl font-bold font-headline mb-4">El Meu Compte</h2>
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
            </section>
        </div>
      </div>
    </div>
  );
}
