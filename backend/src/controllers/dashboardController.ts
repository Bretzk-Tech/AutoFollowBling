import { Request, Response } from 'express'
import prisma from '../prismaClient'

// Gera estatísticas para o dashboard
export async function getDashboardStats(req: Request, res: Response) {
  try {
    // Busca os últimos 30 envios de mensagens
    const ultimos = await prisma.pedido.findMany({
      orderBy: { dataPedido: 'desc' },
      take: 30,
      include: { cliente: true }
    })
    // Estatísticas de sucesso/erro por dia, semana, mês
    const hoje = new Date()
    const inicioSemana = new Date(hoje)
    inicioSemana.setDate(hoje.getDate() - hoje.getDay())
    const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1)

    const [pedidosDia, pedidosSemana, pedidosMes] = await Promise.all([
      prisma.pedido.findMany({
        where: {
          dataPedido: {
            gte: new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate())
          }
        }
      }),
      prisma.pedido.findMany({
        where: { dataPedido: { gte: inicioSemana } }
      }),
      prisma.pedido.findMany({
        where: { dataPedido: { gte: inicioMes } }
      })
    ])

    function contaStatus(arr: any[]) {
      return {
        sucesso: arr.filter(p => p.status === 'sucesso').length,
        erro: arr.filter(p => p.status !== 'sucesso').length
      }
    }

    res.json({
      dia: contaStatus(pedidosDia),
      semana: contaStatus(pedidosSemana),
      mes: contaStatus(pedidosMes),
      ultimos: ultimos.map(p => ({
        data: p.dataPedido.toISOString().slice(0, 16).replace('T', ' '),
        cliente: p.cliente?.nome || '',
        status: p.status,
        tipo: 'whatsapp'
      }))
    })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar estatísticas' })
  }
}
