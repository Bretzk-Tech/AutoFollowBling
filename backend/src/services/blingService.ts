import axios from 'axios'
import prisma from '../prismaClient'
import logger from '../utils/logger'

const BLING_API_URL = 'https://www.bling.com.br/Api/v2/pedidos/json/'
const BLING_API_KEY = process.env.BLING_API_KEY || ''

export async function fetchAllPedidosFromBling() {
  try {
    const response = await axios.get(`${BLING_API_URL}?apikey=${BLING_API_KEY}`)
    return response.data.retorno.pedidos || []
  } catch (error) {
    logger.error('Erro ao buscar pedidos do Bling: ' + error)
    throw error
  }
}

export async function savePedidoFromBling(pedidoBling: any) {
  // Adapte o mapeamento conforme o retorno real da API do Bling
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
