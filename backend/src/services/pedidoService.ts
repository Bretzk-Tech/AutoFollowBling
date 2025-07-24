import prisma from '../prismaClient'

/**
 * Calcula o tempo médio (em milissegundos) entre os pedidos de um cliente.
 * Retorna null se houver menos de dois pedidos.
 */
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

/**
 * Retorna uma lista de clientes que devem receber mensagem de follow-up.
 * A seleção é feita com base no tempo médio entre pedidos do cliente e na diferença de dias desde o último pedido.
 * Se o tempo desde o último pedido for maior ou igual ao tempo médio (ou 90 dias), o cliente é incluído para receber mensagem.
 */
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
