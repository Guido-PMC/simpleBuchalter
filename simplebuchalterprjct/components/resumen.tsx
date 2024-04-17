import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table";

interface Operacion {
  id: string;
  cliente: string;
  toperacion: string;
  ingreso: string;
  egreso: string;
  cotizacion: string;
  comentario: string;
}

export function Resumen() {
  const [operaciones, setOperaciones] = useState<Operacion[]>([]);

  useEffect(() => {
    async function fetchOperaciones() {
      const response = await fetch('/api/readPayments');
      const data = await response.json();
      setOperaciones(data);
    }

    fetchOperaciones();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center h-14 gap-4 px-4 border-b lg:gap-6 bg-gray-100/40 dark:bg-gray-800/40">
        {/* Header content */}
      </header>
      <main className="flex-1 flex flex-col p-4 gap-4 md:p-6">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold">Operaciones</h1>
          <Button size="icon" variant="outline">
            <span className="sr-only">Refresh</span>
          </Button>
        </div>
        <div className="border rounded-lg shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[150px]">Cliente</TableHead>
                <TableHead>Tipo de Operación</TableHead>
                <TableHead>Ingreso</TableHead>
                <TableHead>Egreso</TableHead>
                <TableHead>Cotización</TableHead>
                <TableHead>Comentario</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {operaciones.map((operacion) => (
                <TableRow key={operacion.id}>
                  <TableCell>{operacion.cliente}</TableCell>
                  <TableCell>{operacion.toperacion}</TableCell>
                  <TableCell>{operacion.ingreso}</TableCell>
                  <TableCell>{operacion.egreso}</TableCell>
                  <TableCell>{operacion.cotizacion}</TableCell>
                  <TableCell>{operacion.comentario}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}
