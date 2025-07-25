import axios from 'axios'
import prisma from '../config/prismaClient'
import logger from '../utils/logger'

const BLING_API_URL_CONTATOS = 'https://www.bling.com.br/Api/v3/contatos'
const BLING_API_URL_PEDIDOS = 'https://www.bling.com.br/Api/v3/pedidos/vendas'

// Busca todos os pedidos do Bling em uma única requisição
export async function buscarPedidos(accessToken: string) {
  try {
    const response = await axios.get(BLING_API_URL_PEDIDOS, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })
    console.log('📦 Pedidos recebidos:', response.data.data.length)
    return response.data.data
  } catch ({ error }: any) {
    return console.error(
      '❌ Erro ao buscar pedidos:',
      error.response?.data || error.message
    )
  }
}

export async function buscarContatos(accessToken: string) {
  try {
    const response = await axios.get(BLING_API_URL_CONTATOS, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })
    console.log('🙎 Contatos encontrados:', response.data.data.length)
    return response.data.data
  } catch ({ error }: any) {
    return console.error(
      '❌ Erro ao buscar contatos:',
      error.response?.data || error.message
    )
  }
}
