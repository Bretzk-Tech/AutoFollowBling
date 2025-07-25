import { Request, Response } from 'express'
import prisma from '../config/prismaClient'
import dayjs from 'dayjs'
// Lista contatos monitorados com dados de recompra
export async function getContatosMonitorados(req: Request, res: Response) {
  try {
    const contatos = await prisma.clientesMonitorados.findMany({
      include: { contato: true }
    })
    const hoje = dayjs()
    const lista = contatos.map((c: any) => ({
      nome: c.contato?.nome || '',
      telefone: c.contato?.celular || '',
      quantidadePedidos: c.quantidadePedidos,
      periodoCompraMediaDias: c.periodoCompraMediaDias,
      diasParaProximaCompra: dayjs(c.proximaCompraPrevista).diff(hoje, 'day')
    }))
    res.json(lista)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar contatos monitorados' })
  }
}
// ...existing code...

// Gera estatísticas para o dashboard

// Função auxiliar para buscar pedidos por período
async function buscarPedidosPorPeriodo(inicio: Date) {
  return prisma.pedido.findMany({
    where: { data: { gte: inicio } }
  })
}

// Função auxiliar para contar status
function contaStatus(arr: any[]) {
  return {
    sucesso: arr.filter(p => p.status === 'sucesso').length,
    erro: arr.filter(p => p.status !== 'sucesso').length
  }
}

// Função auxiliar para formatar pedidos recentes
function formatarUltimosPedidos(ultimos: any[]) {
  return ultimos.map(p => ({
    data: p.data.toISOString().slice(0, 16).replace('T', ' '),
    cliente: p.contato?.nome || '',
    // status: p.status, // Remover ou ajustar se não existir campo status
    tipo: 'whatsapp'
  }))
}

export async function getDashboardStats(req: Request, res: Response) {
  try {
    // Busca os últimos 30 envios de mensagens
    const ultimos = await prisma.pedido.findMany({
      orderBy: { data: 'desc' },
      take: 30,
      include: { contato: true }
    })

    // Datas de referência
    const hoje = new Date()
    const inicioDia = new Date(
      hoje.getFullYear(),
      hoje.getMonth(),
      hoje.getDate()
    )
    const inicioSemana = new Date(hoje)
    inicioSemana.setDate(hoje.getDate() - hoje.getDay())
    const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1)

    // Busca pedidos por período em paralelo
    const [pedidosDia, pedidosSemana, pedidosMes] = await Promise.all([
      buscarPedidosPorPeriodo(inicioDia),
      buscarPedidosPorPeriodo(inicioSemana),
      buscarPedidosPorPeriodo(inicioMes)
    ])

    // Como não existe campo status em Pedido, retorna apenas contagem total
    res.json({
      dia: { total: pedidosDia.length },
      semana: { total: pedidosSemana.length },
      mes: { total: pedidosMes.length },
      ultimos: formatarUltimosPedidos(ultimos)
    })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar estatísticas' })
  }
}
