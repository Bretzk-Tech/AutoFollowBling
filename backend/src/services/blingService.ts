import axios from 'axios'
import prisma from '../prismaClient'
import logger from '../utils/logger'

const BLING_API_URL = 'https://www.bling.com.br/Api/v2/pedidos/json/'
const BLING_API_KEY = process.env.BLING_API_KEY || ''

// Busca paginada de todos os pedidos do Bling
export async function fetchAllPedidosFromBling() {
  let pagina = 1
  let pedidos: any[] = []
  let totalPaginas = 1
  try {
    do {
      const response = await axios.get(
        `${BLING_API_URL}?apikey=${BLING_API_KEY}&pagina=${pagina}`
      )
      const retorno = response.data.retorno
      if (retorno.pedidos && Array.isArray(retorno.pedidos)) {
        pedidos = pedidos.concat(retorno.pedidos)
      }
      // O Bling retorna total de páginas em alguns casos, senão para quando não vier mais pedidos
      if (retorno.paginacao && retorno.paginacao.paginas) {
        totalPaginas = Number(retorno.paginacao.paginas)
      } else if (!retorno.pedidos || retorno.pedidos.length === 0) {
        break
      }
      pagina++
    } while (pagina <= totalPaginas)
    return pedidos
  } catch (error) {
    logger.error('Erro ao buscar pedidos do Bling: ' + error)
    throw error
  }
}

// Adapte o mapeamento conforme o retorno real da API do Bling
export async function savePedidoFromBling(pedidoBling: any) {
  const clienteData = pedidoBling.cliente
  const pedidoData = pedidoBling.pedido
  const cpfCnpj = clienteData.cnpj || clienteData.cpf
  const cliente = await prisma.cliente.upsert({
    where: { cpfCnpj } as any, // força o tipo para aceitar cpfCnpj como unique
    update: {
      nome: clienteData.nome,
      telefone: clienteData.celular || clienteData.fone || ''
    },
    create: {
      nome: clienteData.nome,
      cpfCnpj,
      telefone: clienteData.celular || clienteData.fone || ''
    }
  })
  await prisma.pedido.create({
    data: {
      clienteId: cliente.id,
      dataPedido: new Date(pedidoData.data),
      valor: Number(pedidoData.valor),
      status: pedidoData.situacao
    }
  })
}
