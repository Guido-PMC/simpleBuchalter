import React, { useState } from 'react';
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
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
            setResponseMessage('Operación guardada correctamente!');
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
        {/* Inputs and labels */}
        <Button className="w-20 h-20 rounded-full bg-green-500 text-white text-2xl shadow-lg" onClick={handleSubmit}>GO!</Button>
        {responseMessage && (
          <div className={`text-center py-2 rounded ${responseStatus === 'success' ? 'text-green-700' : 'text-red-700'}`}>
            {responseMessage}
          </div>
        )}
      </div>
    </div>
  );
}
