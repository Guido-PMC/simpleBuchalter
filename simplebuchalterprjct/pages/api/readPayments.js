import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const operacion = await prisma.operacion.findMany();
      res.status(200).json(operacion);
    } catch (error) {
      res.status(500).send({ error: `Error retrieving operacion: ${error.message}` });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}