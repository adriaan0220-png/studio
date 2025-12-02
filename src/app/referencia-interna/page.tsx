import { PageHeader } from '@/app/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ReferenciaInternaPage() {
  return (
    <div className="bg-gray-100 -m-8 p-8 flex-1">
      <PageHeader
        title="Referencia Interna"
        description="Códigos y referencias para uso interno."
      />
      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Formato General de Referencia</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-mono text-center text-lg bg-muted p-4 rounded-md">
              EBT – AAAA – PRODUCTO – ZONA – Nº
            </p>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li><span className="font-semibold text-foreground">EBT:</span> EB Trans Ibérica (fijo)</li>
              <li><span className="font-semibold text-foreground">AAAA:</span> año del transporte</li>
              <li><span className="font-semibold text-foreground">PRODUCTO:</span> 3 letras del producto transportado</li>
              <li><span className="font-semibold text-foreground">ZONA:</span> 3 letras del destino o provincia</li>
              <li><span className="font-semibold text-foreground">Nº:</span> número secuencial</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>🟩 Ejemplos Reales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">🚛 ADR líquidos inflamables</h3>
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-md">
                  <p className="font-mono">EBT–2025–GSL–TGN–027</p>
                  <ul className="text-sm text-muted-foreground list-disc pl-5 mt-2">
                    <li><span className="font-semibold text-foreground">GSL:</span> Gasoil</li>
                    <li><span className="font-semibold text-foreground">TGN:</span> Tarragona</li>
                    <li><span className="font-semibold text-foreground">027:</span> pedido número 27</li>
                  </ul>
                </div>
                <div className="bg-muted p-4 rounded-md">
                  <p className="font-mono">EBT–2025–XIL–BCN–114</p>
                  <ul className="text-sm text-muted-foreground list-disc pl-5 mt-2">
                     <li><span className="font-semibold text-foreground">XIL:</span> Xileno</li>
                    <li><span className="font-semibold text-foreground">BCN:</span> Barcelona</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">🧪 Productos químicos NO ADR</h3>
              <div className="bg-muted p-4 rounded-md">
                <p className="font-mono">EBT–2025–ACE–VLC–044</p>
                 <ul className="text-sm text-muted-foreground list-disc pl-5 mt-2">
                    <li><span className="font-semibold text-foreground">ACE:</span> Aceite industrial</li>
                    <li><span className="font-semibold text-foreground">VLC:</span> Valencia</li>
                  </ul>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">🛢 Combustibles cisterna 30 m³</h3>
              <div className="bg-muted p-4 rounded-md">
                <p className="font-mono">EBT–2025–G95–BLL–016</p>
                  <ul className="text-sm text-muted-foreground list-disc pl-5 mt-2">
                    <li><span className="font-semibold text-foreground">G95:</span> Gasolina 95</li>
                    <li><span className="font-semibold text-foreground">BLL:</span> Bilbao</li>
                  </ul>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>🟨 Código técnico para flota (Opcional)</CardTitle>
          </CardHeader>
          <CardContent>
             <p className="mb-2 text-muted-foreground">También puedes incluir el tipo de cisterna para un mayor control:</p>
             <div className="bg-muted p-4 rounded-md">
                <p className="font-mono">EBT–2025–GSL–BCN–CIST30–052</p>
                  <ul className="text-sm text-muted-foreground list-disc pl-5 mt-2">
                    <li><span className="font-semibold text-foreground">CIST30:</span> Cisterna 30 m³</li>
                    <li><span className="font-semibold text-foreground">052:</span> registro interno</li>
                  </ul>
              </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
