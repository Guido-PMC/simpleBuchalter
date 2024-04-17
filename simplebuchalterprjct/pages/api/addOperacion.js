// pages/api/addOperacion.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { cliente, toperacion, ingreso, egreso, cotizacion, comentario } = req.body;
    try {
      const operacion = await prisma.operacion.create({
        data: {
          cliente,
          toperacion,
          ingreso,
          egreso,
          cotizacion,
          comentario
        }
      });
      res.status(200).json(operacion);
    } catch (error) {
      res.status(500).json({ message: `Error al guardar la operación: ${error.message}` });
    }
  } else {
    // Handle any other HTTP methods
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
