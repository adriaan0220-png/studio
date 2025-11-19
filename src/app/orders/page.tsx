import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { orders } from "@/app/lib/data";
import { PageHeader } from "../components/page-header";

export default function OrdersPage() {

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <Badge variant="secondary">{status}</Badge>;
      case 'In Transit':
        return <Badge variant="default" className="bg-status-transit hover:bg-status-transit/80 text-white">{status}</Badge>;
      case 'Pending':
        return <Badge variant="outline">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <>
      <PageHeader
        title="My Orders"
        description="Track the status of your recent orders for liquid product deliveries."
      />
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden sm:table-cell">Order ID</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right hidden md:table-cell">Date</TableHead>
                <TableHead className="text-right">Cost</TableHead>
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
    </>
  );
}
