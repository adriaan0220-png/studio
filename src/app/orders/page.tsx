
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
        { name: 'Carga confirmada', icon: CheckCircle },
        { name: 'En tránsito', icon: Truck },
        { name: 'ETA — llegada prevista', icon: Clock },
        { name: 'En descarga', icon: Anchor },
        { name: 'POD disponible', icon: FileText },
        { name: 'Incidencia documentada', icon: HelpCircle },
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
        <div className="p-8 flex-1 bg-indigo-50">
            <PageHeader
                title="Mis Pedidos"
                description="Consulte el estado y la documentación de sus envíos en tiempo real."
            />

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Buscar Pedido</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSearch} className="grid sm:grid-cols-3 md:grid-cols-4 gap-4 items-end">
                        <div className="space-y-2">
                            <Label htmlFor="order-number">Número de pedido</Label>
                            <Input id="order-number" placeholder="Ej: 2024-07-123" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="internal-ref">Referencia interna</Label>
                            <Input id="internal-ref" placeholder="Su referencia" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="load-date">Fecha de carga</Label>
                            <Input id="load-date" type="date" />
                        </div>
                        <Button type="submit" className="w-full sm:w-auto md:self-end">Consultar estado</Button>
                    </form>
                </CardContent>
            </Card>

            {orderFound && (
                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Estado del Envío: 2024-07-123</CardTitle>
                            <CardDescription>ETA — llegada prevista: 15/07/2024 14:00h</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <OrderStatus status="En tránsito" />
                        </CardContent>
                    </Card>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Información del Transporte</CardTitle>
                                </CardHeader>
                                <CardContent className="grid sm:grid-cols-2 gap-4">
                                    <p><strong className="text-muted-foreground">Matrícula:</strong> 1234-XYZ</p>
                                    <p><strong className="text-muted-foreground">Código de cisterna:</strong> CIST-042</p>
                                    <p><strong className="text-muted-foreground">Producto:</strong> Glicerina</p>
                                    <p><strong className="text-muted-foreground">Clase ADR:</strong> No aplica</p>
                                    <p><strong className="text-muted-foreground">Capacidad:</strong> 32,000 L</p>
                                    <p><strong className="text-muted-foreground">Planta de carga:</strong> Tarragona</p>
                                    <p><strong className="text-muted-foreground">Destino:</strong> Marsella</p>
                                </CardContent>
                            </Card>

                             <Card>
                                <CardHeader>
                                    <CardTitle>Seguimiento</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3">
                                        <li className="flex items-center gap-3"><Locate className="h-5 w-5 text-primary" /> GPS 24/7</li>
                                        <li className="flex items-center gap-3"><Clock className="h-5 w-5 text-primary" /> Actualización automática de estado</li>
                                        <li className="flex items-center gap-3"><List className="h-5 w-5 text-primary" /> Historial de pedidos</li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="space-y-8">
                             <Card>
                                <CardHeader>
                                    <CardTitle>Documentación</CardTitle>
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
                                    <CardTitle>Contacto</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                     <div className="flex items-center gap-3">
                                        <Phone className="h-5 w-5 text-muted-foreground" />
                                        <a href="tel:+34647000000" className="hover:text-primary">+34 647 000 000</a>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Mail className="h-5 w-5 text-muted-foreground" />
                                        <a href="mailto:pedidos@ebtransiberica.com" className="hover:text-primary">pedidos@ebtransiberica.com</a>
                                    </div>
                                    <Button className="w-full">Atención al cliente</Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
