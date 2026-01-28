
'use client';

import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/app/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Printer, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Logo } from '@/app/components/logo';

// --- TYPE DEFINITIONS ---
interface DocumentLine {
  id: string;
  num_factura: string;
  data: string;
  usuari: string;
  fpagament: string;
  concepte: string;
  preu_unitari: string;
  unitats: string;
  iva: string;
  dte: string;
  albara: string;
}

interface User {
  usuari: string;
  rol: string;
  empresa: string;
  fiscalid: string;
  adreca: string;
  telefon: string;
  treballador?: string;
}

interface GroupedInvoice {
  invoiceNumber: string;
  date: string;
  clientName: string;
  paymentMethod: string;
  clientData: User | null;
  lines: {
    concept: string;
    unitPrice: number;
    units: number;
    discount: number;
    vatRate: number;
    netTotal: number;
  }[];
  subtotal: number;
  totalDiscount: number;
  taxableBase: number;
  vatBreakdown: { rate: number; base: number; amount: number }[];
  totalVat: number;
  totalAmount: number;
}

// --- MAIN COMPONENT ---
export default function DocumentsPage() {
  const [invoices, setInvoices] = useState<GroupedInvoice[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<GroupedInvoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const userName = localStorage.getItem('userName');
        if (!userName) {
          setError("No s'ha pogut identificar l'usuari. Si us plau, iniciï sessió de nou.");
          setLoading(false);
          return;
        }

        const [usersRes, docsRes] = await Promise.all([
          fetch('https://sheetdb.io/api/v1/64gi8fmqcbxx4?sheet=usuaris'),
          fetch('https://sheetdb.io/api/v1/64gi8fmqcbxx4?sheet=documents')
        ]);

        if (!usersRes.ok || !docsRes.ok) {
          throw new Error('No s\'ha pogut connectar amb la base de dades.');
        }

        const users: User[] = await usersRes.json();
        const documents: DocumentLine[] = await docsRes.json();

        const currentUser = users.find(u => u.usuari === userName);
        const userRole = currentUser?.rol.toLowerCase() || 'client';

        const isAdmin = ['admin', 'administrador', 'treballador'].includes(userRole);
        const filteredDocs = isAdmin ? documents : documents.filter(d => d.usuari === userName);

        const grouped = filteredDocs.reduce((acc, doc) => {
          if (!doc.num_factura) return acc;
          const key = doc.num_factura;
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(doc);
          return acc;
        }, {} as Record<string, DocumentLine[]>);

        const processedInvoices: GroupedInvoice[] = Object.values(grouped).map(group => {
          const firstLine = group[0];
          const clientData = users.find(u => u.usuari === firstLine.usuari) || null;

          let subtotal = 0;
          let totalDiscount = 0;
          const vatBreakdownAgg: Record<number, { base: number; amount: number }> = {};

          const lines = group.map(line => {
            const unitPrice = parseFloat(line.preu_unitari?.replace(',', '.')) || 0;
            const units = parseFloat(line.unitats?.replace(',', '.')) || 0;
            const discountPercentage = parseFloat(line.dte?.replace('%', '').replace(',', '.')) || 0;
            const vatRate = parseFloat(line.iva?.replace('%', '').replace(',', '.')) || 0;
            
            const lineSubtotal = unitPrice * units;
            const lineDiscountAmount = lineSubtotal * (discountPercentage / 100);
            const lineNetTotal = lineSubtotal - lineDiscountAmount;

            subtotal += lineSubtotal;
            totalDiscount += lineDiscountAmount;

            if (!vatBreakdownAgg[vatRate]) {
              vatBreakdownAgg[vatRate] = { base: 0, amount: 0 };
            }
            vatBreakdownAgg[vatRate].base += lineNetTotal;
            vatBreakdownAgg[vatRate].amount += lineNetTotal * (vatRate / 100);

            return {
              concept: line.concepte,
              unitPrice,
              units,
              discount: discountPercentage,
              vatRate,
              netTotal: lineNetTotal,
            };
          });

          const taxableBase = subtotal - totalDiscount;
          const totalVat = Object.values(vatBreakdownAgg).reduce((sum, { amount }) => sum + amount, 0);
          const totalAmount = taxableBase + totalVat;
          
          const vatBreakdown = Object.entries(vatBreakdownAgg).map(([rate, data]) => ({
            rate: parseFloat(rate),
            base: data.base,
            amount: data.amount,
          }));

          return {
            invoiceNumber: firstLine.num_factura,
            date: firstLine.data,
            clientName: clientData?.empresa || firstLine.usuari,
            paymentMethod: firstLine.fpagament,
            clientData,
            lines,
            subtotal,
            totalDiscount,
            taxableBase,
            vatBreakdown,
            totalVat,
            totalAmount,
          };
        });

        setInvoices(processedInvoices.sort((a,b) => b.invoiceNumber.localeCompare(a.invoiceNumber)));

      } catch (e: any) {
        setError(e.message || 'Hi ha hagut un error en carregar les dades.');
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="p-8 flex-1 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 flex-1">
        <PageHeader title="Error" />
        <Card className="border-destructive">
          <CardHeader className="flex-row gap-4 items-center">
            <AlertCircle className="h-8 w-8 text-destructive" />
            <div>
                <CardTitle className="text-destructive">No s'han pogut carregar les factures</CardTitle>
                <CardDescription>{error}</CardDescription>
            </div>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (selectedInvoice) {
    return (
      <div className="p-8 flex-1 bg-background">
        <div className="flex justify-between items-center mb-8 print:hidden">
          <Button variant="outline" onClick={() => setSelectedInvoice(null)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Tornar al llistat
          </Button>
          <Button onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Imprimir PDF
          </Button>
        </div>
        <Card id="zona-factura" className="p-4 sm:p-8 bg-white text-black shadow-2xl">
          {/* Invoice Header */}
          <header className="grid grid-cols-2 items-start mb-8">
            <div>
              <Logo />
              <div className="mt-4 text-xs text-gray-600">
                <p className="font-bold">Ttiko Trans</p>
                <p>Polígono Industrial Logístic Sud</p>
                <p>C/ de la Indústria, Nave 14</p>
                <p>43006 Tarragona</p>
              </div>
            </div>
            <div className="text-right">
              <h1 className="text-3xl font-bold text-gray-800">FACTURA</h1>
              <p className="text-gray-600 mt-2">
                <span className="font-semibold">Nº:</span> {selectedInvoice.invoiceNumber}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Data:</span> {selectedInvoice.date}
              </p>
            </div>
          </header>

          {/* Client Info */}
          <section className="mb-8">
            <Card className="bg-gray-50 border-gray-200 p-4">
              <h2 className="font-semibold text-gray-700 mb-2">Client</h2>
              <address className="text-sm text-gray-600 not-italic">
                <p className="font-bold">{selectedInvoice.clientData?.empresa || selectedInvoice.clientName}</p>
                <p>NIF: {selectedInvoice.clientData?.fiscalid}</p>
                <p>{selectedInvoice.clientData?.adreca}</p>
                <p>Tel: {selectedInvoice.clientData?.telefon}</p>
              </address>
            </Card>
          </section>

          {/* Invoice Lines */}
          <section className="mb-8">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="text-gray-700">Concepte</TableHead>
                  <TableHead className="text-right text-gray-700">P. Unitari</TableHead>
                  <TableHead className="text-right text-gray-700">Unitats</TableHead>
                  <TableHead className="text-right text-gray-700">Descompte</TableHead>
                  <TableHead className="text-right text-gray-700">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedInvoice.lines.map((line, index) => (
                  <TableRow key={index} className="border-gray-200">
                    <TableCell>{line.concept}</TableCell>
                    <TableCell className="text-right">{line.unitPrice.toFixed(2)} €</TableCell>
                    <TableCell className="text-right">{line.units}</TableCell>
                    <TableCell className="text-right">{line.discount > 0 ? `${line.discount}%` : '-'}</TableCell>
                    <TableCell className="text-right font-medium">{line.netTotal.toFixed(2)} €</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>

          {/* Totals */}
          <section className="grid grid-cols-2 gap-8 mb-8">
            <div className="space-y-2">
                <p><span className="font-semibold text-gray-700">Forma de pagament:</span> {selectedInvoice.paymentMethod}</p>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between"><span>Base Imposable:</span> <span>{selectedInvoice.taxableBase.toFixed(2)} €</span></div>
                <Separator className="bg-gray-300"/>
                {selectedInvoice.vatBreakdown.map(vat => (
                   <div key={vat.rate} className="flex justify-between"><span>Quota {vat.rate}% sobre {vat.base.toFixed(2)}€:</span> <span>{vat.amount.toFixed(2)} €</span></div>
                ))}
                <Separator className="bg-gray-300"/>
                <div className="flex justify-between text-lg font-bold text-gray-800"><span>TOTAL FACTURA:</span> <span>{selectedInvoice.totalAmount.toFixed(2)} €</span></div>
            </div>
          </section>
          
          {/* Footer */}
          <footer className="text-xs text-gray-500 border-t border-gray-200 pt-4 mt-8">
            <p>Ttiko Trans, inscrita al Registre Mercantil de Tarragona, Tom XXX, Foli XXX, Full X-XXXXX, Inscripció Xª.</p>
            <p>De conformitat amb el que estableix la normativa vigent en Protecció de Dades de Caràcter Personal, l'informem que les seves dades seran incorporades a sistema de tractament titularitat de Ttiko Trans per a la gestió administrativa i comercial de la relació contractual.</p>
          </footer>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-8 flex-1">
      <PageHeader
        title="Factures"
        description="Aquí pot veure i imprimir les seves factures."
      />
      {invoices.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {invoices.map((invoice) => (
            <Card key={invoice.invoiceNumber} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle>Factura Nº {invoice.invoiceNumber}</CardTitle>
                        <CardDescription>{invoice.date}</CardDescription>
                    </div>
                    <Badge variant="default">{invoice.totalAmount.toFixed(2)} €</Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">Client: <span className="font-medium text-card-foreground">{invoice.clientName}</span></p>
              </CardContent>
              <div className="p-6 pt-0">
                <Button className="w-full" onClick={() => setSelectedInvoice(invoice)}>
                  <Printer className="mr-2 h-4 w-4" />
                  Veure / Imprimir
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-center">No s'han trobat factures.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

    