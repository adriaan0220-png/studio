
'use client';

import { useState } from 'react';
import { PageHeader } from '../components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Clock, Download, FileText, HelpCircle, List, Locate, Anchor, Phone, Mail, Truck, ChevronRight } from 'lucide-react';

const OrderStatus = ({ status }: { status: string }) => {
    const statuses = [
        { name: 'Càrrega confirmada', icon: CheckCircle },
        { name: 'En trànsit', icon: Truck },
        { name: 'ETA — arribada prevista', icon: Clock },
        { name: 'En descàrrega', icon: Anchor },
        { name: 'POD disponible', icon: FileText },
        { name: 'Incidència documentada', icon: HelpCircle },
    ];

    const currentIndex = statuses.findIndex(s => s.name === status);

    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-muted/50 rounded-lg">
            {statuses.map((s, index) => {
                const isActive = index <= currentIndex;
                const isCurrent = index === currentIndex;
                return (
                    <>
                        <div key={s.name} className="flex items-center gap-3 my-2 sm:my-0">
                            <s.icon className={`h-6 w-6 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                            <span className={`font-medium ${isCurrent ? 'text-foreground' : 'text-muted-foreground'}`}>{s.name}</span>
                        </div>
                        {index < statuses.length - 1 && <ChevronRight className="h-5 w-5 text-muted-foreground hidden sm:block" />}
                    </>
                )
            })}
        </div>
    );
};


export default function OrdersPage() {
    const [orderFound, setOrderFound] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setOrderFound(true);
    }
  
    return (
        <div className="p-8 flex-1 bg-secondary text-secondary-foreground">
            <PageHeader
                title={<span className="text-secondary-foreground">Les Meves Comandes</span>}
                description={
                  <span className="text-secondary-foreground/80">
                    Consulteu l'estat i la documentació dels vostres enviaments en temps real.
                  </span>
                }
            />

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Cercar Comanda</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSearch} className="grid sm:grid-cols-3 md:grid-cols-4 gap-4 items-end">
                        <div className="space-y-2">
                            <Label htmlFor="order-number">Número de comanda</Label>
                            <Input id="order-number" placeholder="Ex: 2024-07-123" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="internal-ref">Referència interna</Label>
                            <Input id="internal-ref" placeholder="La vostra referència" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="load-date">Data de càrrega</Label>
                            <Input id="load-date" type="date" />
                        </div>
                        <Button type="submit" className="w-full sm:w-auto md:self-end">Consultar estat</Button>
                    </form>
                </CardContent>
            </Card>

            {orderFound && (
                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Estat de l'Enviament: 2024-07-123</CardTitle>
                            <CardDescription>ETA — arribada prevista: 15/07/2024 14:00h</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <OrderStatus status="En trànsit" />
                        </CardContent>
                    </Card>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Informació del Transport</CardTitle>
                                </CardHeader>
                                <CardContent className="grid sm:grid-cols-2 gap-4">
                                    <p><strong className="text-muted-foreground">Matrícula:</strong> 1234-XYZ</p>
                                    <p><strong className="text-muted-foreground">Codi de cisterna:</strong> CIST-042</p>
                                    <p><strong className="text-muted-foreground">Producte:</strong> Glicerina</p>
                                    <p><strong className="text-muted-foreground">Classe ADR:</strong> No aplica</p>
                                    <p><strong className="text-muted-foreground">Capacitat:</strong> 32,000 L</p>
                                    <p><strong className="text-muted-foreground">Planta de càrrega:</strong> Tarragona</p>
                                    <p><strong className="text-muted-foreground">Destí:</strong> Marsella</p>
                                </CardContent>
                            </Card>

                             <Card>
                                <CardHeader>
                                    <CardTitle>Seguiment</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3">
                                        <li className="flex items-center gap-3"><Locate className="h-5 w-5 text-primary" /> GPS 24/7</li>
                                        <li className="flex items-center gap-3"><Clock className="h-5 w-5 text-primary" /> Actualització automàtica d'estat</li>
                                        <li className="flex items-center gap-3"><List className="h-5 w-5 text-primary" /> Historial de comandes</li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="space-y-8">
                             <Card>
                                <CardHeader>
                                    <CardTitle>Documentació</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <Button variant="outline" className="w-full justify-start gap-2"><Download className="h-4 w-4" /> CMR</Button>
                                    <Button variant="outline" className="w-full justify-start gap-2"><Download className="h-4 w-4" /> Carta ADR</Button>
                                    <Button variant="outline" className="w-full justify-start gap-2"><Download className="h-4 w-4" /> POD</Button>
                                    <Button variant="outline" className="w-full justify-start gap-2"><Download className="h-4 w-4" /> Packing List</Button>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Contacte</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                     <div className="flex items-center gap-3">
                                        <Phone className="h-5 w-5 text-muted-foreground" />
                                        <a href="tel:+34647000000" className="hover:text-primary">+34 647 000 000</a>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Mail className="h-5 w-5 text-muted-foreground" />
                                        <a href="mailto:pedidos@ttikotrans.net" className="hover:text-primary">pedidos@ttikotrans.net</a>
                                    </div>
                                    <Button className="w-full">Atenció al client</Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
