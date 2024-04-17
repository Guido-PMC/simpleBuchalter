import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import { PrismaClient } from '@prisma/client';

export function Interfaz() {
  const [cliente, setCliente] = useState('');
  const [tOperacion, setTOperacion] = useState('');
  const [ingreso, setIngreso] = useState('');
  const [egreso, setEgreso] = useState('');
  const [cotizacion, setCotizacion] = useState('');
  const [comentario, setComentario] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [responseStatus, setResponseStatus] = useState('');

  const prisma = new PrismaClient();

  async function handleSubmit() {
    try {
        const response = await fetch('/api/addOperacion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cliente, toperacion: tOperacion, ingreso, egreso, cotizacion, comentario }),
        });
        const data = await response.json();
        if (response.ok) {
            setResponseMessage(`Operación guardada correctamente! ID: ${data.id}`);
            setResponseStatus('success');
        } else {
            throw new Error(data.message || 'Error al guardar la operación');
        }
    } catch (error) {
        if (error instanceof Error) {  // Verifica si el error es una instancia de Error
            setResponseMessage(error.message); // Accede a la propiedad message de forma segura
        } else {
            setResponseMessage('Ha ocurrido un error desconocido'); // Mensaje genérico para otros tipos de errores
        }
        setResponseStatus('error');
    }
}
  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col space-y-4">
      <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="cliente">Cliente</label>
          <Input id="cliente" placeholder="Nombre del cliente" onChange={e => setCliente(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="operacion">T Operacion</label>
          <Input id="operacion" placeholder="Tipo de operación" onChange={e => setTOperacion(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="ingreso">Ingreso</label>
          <Input id="ingreso" placeholder="500,00" onChange={e => setIngreso(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="egreso">Egreso</label>
          <Input id="egreso" placeholder="0,00" onChange={e => setEgreso(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="cotizacion">Cotizacion</label>
          <Input id="cotizacion" placeholder="Enter value" onChange={e => setCotizacion(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="comment">Comentario</label>
          <Textarea id="comment" placeholder="Add a comment" onChange={e => setComentario(e.target.value)} />
        </div>
        <Button className="w-20 h-20 rounded-full bg-green-500 text-white text-2xl shadow-lg" onClick={handleSubmit}>GO!</Button>
      </div>
      <div className={`text-center py-2 rounded ${responseStatus === 'success' ? 'text-green-700' : 'text-red-700'}`}>
            {responseMessage}
          </div>
    </div>
  )
}

