
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PageHeader } from '@/app/components/page-header';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, User } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface ShipmentData {
  tracking_code: string;
  origin: string;
  destination: string;
  eta: string;
  location: string;
  status: 'EN CIRCULACIÓ' | 'MAGATZEM' | 'LLIURAT' | 'EN CIRCULACIO';
  client: string;
}

const StatusBar = ({ status }: { status: ShipmentData['status'] }) => {
  const statusConfig = {
    'MAGATZEM': {
      progress: 10,
      label: 'En Almacén',
    },
    'EN CIRCULACIÓ': {
      progress: 50,
      label: 'En Tránsito',
    },
    'EN CIRCULACIO': { 
      progress: 50,
      label: 'En Tránsito',
    },
    'LLIURAT': {
      progress: 100,
      label: 'Entregado',
    },
  };

  const currentStatus = statusConfig[status] || statusConfig['MAGATZEM'];

  return (
    <div className="w-full space-y-2">
       <div className="flex justify-between text-sm font-medium">
        <span>En Almacén</span>
        <span>En Tránsito</span>
        <span>Entregado</span>
      </div>
      <Progress value={currentStatus.progress} className="w-full [&>div]:bg-primary" />
       <p className="text-center font-semibold mt-2">Estado: {currentStatus.label}</p>
    </div>
  );
};


export default function TrackingPage() {
  const [trackingCode, setTrackingCode] = useState('');
  const [shipmentData, setShipmentData] = useState<ShipmentData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!trackingCode) {
      setError('Por favor, introduzca un código de seguimiento.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setShipmentData(null);

    try {
      const apiUrl = `https://sheetdb.io/api/v1/cj07wia9xgfo2/search?tracking_code=${trackingCode}`;
      
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('No se ha podido conectar con el servidor.');
      }
      const data: ShipmentData[] = await response.json();

      if (data.length > 0) {
        setShipmentData(data[0]);
      } else {
        setError('Código no encontrado. Por favor, verifique el código y vuelva a intentarlo.');
      }
    } catch (err) {
      setError('Ha habido un problema con su solicitud.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 flex-1 bg-gray-50">
      <PageHeader
        title="Localiza tu envío"
        description="Introduce tu código de seguimiento para ver el estado actual de tu envío."
      />

      <div className="flex justify-center">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="text"
                placeholder="Ej: EBT-123"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                className="flex-grow text-base"
              />
              <Button onClick={handleSearch} disabled={isLoading} className="w-full sm:w-auto">
                {isLoading ? 'Buscando...' : 'Buscar'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {shipmentData && (
              <Card className="mt-6 shadow-md">
                <CardHeader>
                  <CardTitle>Resultados del Envío</CardTitle>
                  <CardDescription>Código: {shipmentData.tracking_code}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h3 className="font-semibold mb-4">Estado del envío</h3>
                        <StatusBar status={shipmentData.status} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">Cliente</p>
                            <p className="text-lg font-semibold flex items-center gap-2"><User className="h-5 w-5 text-muted-foreground" />{shipmentData.client}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">Origen</p>
                            <p className="text-lg font-semibold">{shipmentData.origin}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">Destino</p>
                            <p className="text-lg font-semibold">{shipmentData.destination}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">Fecha prevista (ETA)</p>
                            <p className="text-lg font-semibold">{shipmentData.eta}</p>
                        </div>
                         <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">Ubicación Actual</p>
                            <p className="text-lg font-semibold">{shipmentData.location}</p>
                        </div>
                    </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
