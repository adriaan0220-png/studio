import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { orders } from "@/app/lib/data";
import { PageHeader } from "../components/page-header";

export default function OrdersPage() {

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Entregado':
        return <Badge variant="secondary">{status}</Badge>;
      case 'En Tránsito':
        return <Badge variant="default" className="bg-status-transit hover:bg-status-transit/80 text-white">{status}</Badge>;
      case 'Pendiente':
        return <Badge variant="outline">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="bg-orange-100 -m-8 p-8 flex-1">
      <PageHeader
        title="Mis Pedidos"
        description="Rastree el estado de sus pedidos recientes de entregas de productos líquidos."
      />
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden sm:table-cell">ID de Pedido</TableHead>
                <TableHead>Producto</TableHead>
                <TableHead>Destino</TableHead>
                <TableHead className="text-center">Estado</TableHead>
                <TableHead className="text-right hidden md:table-cell">Fecha</TableHead>
                <TableHead className="text-right">Costo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium hidden sm:table-cell">{order.id}</TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell>{order.destination}</TableCell>
                  <TableCell className="text-center">{getStatusBadge(order.status)}</TableCell>
                  <TableCell className="text-right hidden md:table-cell">{order.date}</TableCell>
                  <TableCell className="text-right">€{order.cost.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
