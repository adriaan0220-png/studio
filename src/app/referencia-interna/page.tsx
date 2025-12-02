import { PageHeader } from '@/app/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ReferenciaInternaPage() {
  return (
    <div className="bg-cyan-100 -m-8 p-8 flex-1">
      <PageHeader
        title="Referencia Interna"
        description="Sistema de codificación para transportes."
      />
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Formato General</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-mono text-lg p-4 bg-muted rounded-md">
              EBT – AAAA – PRODUCTO – ZONA – Nº
            </p>
            <ul className="list-disc pl-5 mt-4 space-y-2 text-muted-foreground">
              <li><span className="font-semibold text-foreground">EBT:</span> EB Trans Ibérica (fijo)</li>
              <li><span className="font-semibold text-foreground">AAAA:</span> año del transporte</li>
              <li><span className="font-semibold text-foreground">PRODUCTO:</span> 3 letras del producto transportado</li>
              <li><span className="font-semibold text-foreground">ZONA:</span> 3 letras del destino o provincia</li>
              <li><span className="font-semibold text-foreground">Nº:</span> número secuencial</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
