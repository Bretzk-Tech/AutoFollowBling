import prisma from '../prismaClient'
import dayjs from 'dayjs'

/**
 * Salva pedidos e contatos do Bling no banco de dados.
 * Atualiza ou cria registros conforme necessário.
 */
export async function sincronizarPedidosEContatos(
  pedidos: any[],
  contatos: any[]
) {
  // Salva contatos
  for (const contato of contatos) {
    await prisma.contato.upsert({
      where: { id: BigInt(contato.id) },
      update: {
        nome: contato.nome,
        celular: contato.celular
      },
      create: {
        id: BigInt(contato.id),
        nome: contato.nome,
        celular: contato.celular
      }
    })
  }

  // Salva pedidos
  for (const pedido of pedidos) {
    await prisma.pedido.upsert({
      where: { id: BigInt(pedido.id) },
      update: {
        data: new Date(pedido.data),
        totalProdutos: pedido.totalProdutos,
        contatoId: BigInt(pedido.contatoId)
      },
      create: {
        id: BigInt(pedido.id),
        data: new Date(pedido.data),
        totalProdutos: pedido.totalProdutos,
        contatoId: BigInt(pedido.contatoId)
      }
    })
  }
}

/**
 * Atualiza o monitoramento dos clientes: calcula média, próxima compra e status de mensagem.
 */
export async function atualizarMonitoramentoClientes() {
  const contatos = await prisma.contato.findMany({
    include: { pedidos: true }
  })

  for (const contato of contatos) {
    if (contato.pedidos.length < 2) continue
    // Ordena pedidos por data
    const pedidosOrdenados = contato.pedidos.sort(
      (a, b) => a.data.getTime() - b.data.getTime()
    )
    // Calcula intervalos entre compras
    const intervalos: number[] = []
    for (let i = 1; i < pedidosOrdenados.length; i++) {
      const diff = dayjs(pedidosOrdenados[i].data).diff(
        dayjs(pedidosOrdenados[i - 1].data),
        'day'
      )
      intervalos.push(diff)
    }
    const mediaDias = Math.round(
      intervalos.reduce((a, b) => a + b, 0) / intervalos.length
    )
    const ultimaCompra = pedidosOrdenados[pedidosOrdenados.length - 1].data
    const proximaCompraPrevista = dayjs(ultimaCompra)
      .add(mediaDias, 'day')
      .toDate()

    await prisma.clientesMonitorados.upsert({
      where: { contatoId: contato.id },
      update: {
        quantidadePedidos: contato.pedidos.length,
        periodoCompraMediaDias: mediaDias,
        ultimaCompra,
        proximaCompraPrevista
        // Não reseta mensagemEnviada aqui
      },
      create: {
        contatoId: contato.id,
        quantidadePedidos: contato.pedidos.length,
        periodoCompraMediaDias: mediaDias,
        ultimaCompra,
        proximaCompraPrevista,
        mensagemEnviada: false
      }
    })
  }
}

/**
 * Retorna clientes que atingiram o período médio de recompra e ainda não receberam mensagem.
 */
export async function clientesParaMensagem() {
  const hoje = new Date()
  return prisma.clientesMonitorados.findMany({
    where: {
      proximaCompraPrevista: { lte: hoje },
      mensagemEnviada: false
    },
    include: { contato: true }
  })
}

/**
 * Marca mensagem como enviada para o cliente monitorado.
 */
export async function marcarMensagemEnviada(contatoId: bigint) {
  await prisma.clientesMonitorados.update({
    where: { contatoId },
    data: { mensagemEnviada: true }
  })
}
