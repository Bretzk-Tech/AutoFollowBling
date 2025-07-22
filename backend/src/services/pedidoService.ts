import prisma from '../prismaClient'

export async function calcularTempoMedioEntrePedidos(clienteId: number) {
  const pedidos = await prisma.pedido.findMany({
    where: { clienteId },
    orderBy: { dataPedido: 'asc' }
  })
  if (pedidos.length < 2) return null
  let soma = 0
  for (let i = 1; i < pedidos.length; i++) {
    soma +=
      pedidos[i].dataPedido.getTime() - pedidos[i - 1].dataPedido.getTime()
  }
  return soma / (pedidos.length - 1)
}

export async function clientesParaMensagem() {
  const clientes = await prisma.cliente.findMany({
    include: { pedidos: true }
  })
  const hoje = new Date()
  const resultado: any[] = []
  for (const cliente of clientes) {
    if (cliente.pedidos.length === 0) continue
    const pedidosOrdenados = cliente.pedidos.sort(
      (a, b) => b.dataPedido.getTime() - a.dataPedido.getTime()
    )
    const ultimoPedido = pedidosOrdenados[0]
    const diffDias = Math.floor(
      (hoje.getTime() - ultimoPedido.dataPedido.getTime()) /
        (1000 * 60 * 60 * 24)
    )
    const tempoMedio = await calcularTempoMedioEntrePedidos(cliente.id)
    if (
      (tempoMedio && diffDias >= tempoMedio / (1000 * 60 * 60 * 24)) ||
      diffDias >= 90
    ) {
      resultado.push({ cliente, diffDias, tempoMedio })
    }
  }
  return resultado
}
