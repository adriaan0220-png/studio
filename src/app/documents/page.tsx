'use client';

import React from 'react';
import { PageHeader } from '@/app/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Printer, Download } from 'lucide-react';

const invoices = [
  {
    id: 'FACT-2024-001',
    date: '15/07/2024',
    amount: '1.250,00 €',
    status: 'Pagada',
  },
  {
    id: 'FACT-2024-002',
    date: '20/07/2024',
    amount: '850,50 €',
    status: 'Pendiente',
  },
  {
    id: 'FACT-2024-003',
    date: '25/07/2024',
    amount: '2.100,00 €',
    status: 'Vencida',
  },
];

const getStatusVariant = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pagada':
      return 'default';
    case 'pendiente':
      return 'secondary';
    case 'vencida':
      return 'destructive';
    default:
      return 'outline';
  }
};

export default function DocumentsPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-8 flex-1 print:p-0">
      <div className="print:hidden">
        <PageHeader
          title="Mis Documentos"
          description="Aquí puede ver, descargar e imprimir sus facturas."
        />
      </div>
      <Card className="print:shadow-none print:border-none">
        <CardHeader>
          <CardTitle>Facturas</CardTitle>
          <CardDescription className="print:hidden">Listado de sus facturas recientes.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nº Factura</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Importe</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right print:hidden">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(invoice.status) as any}>{invoice.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right print:hidden">
                    <Button variant="outline" size="sm" className="mr-2" onClick={handlePrint}>
                      <Printer className="mr-2 h-4 w-4" />
                      Imprimir
                    </Button>
                    <Button variant="outline" size="sm">
                       <Download className="mr-2 h-4 w-4" />
                       Descargar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
