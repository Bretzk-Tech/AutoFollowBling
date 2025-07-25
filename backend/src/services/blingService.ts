import axios from 'axios'
import prisma from '../config/prismaClient'
import logger from '../utils/logger'

const BLING_API_URL_CONTATOS = 'https://www.bling.com.br/Api/v3/contatos'
const BLING_API_URL_PEDIDOS = 'https://www.bling.com.br/Api/v3/pedidos/vendas'

// Busca todos os pedidos do Bling em uma única requisição
export async function buscarPedidos(accessToken: string) {
  const pedidos: any[] = []
  let page = 1
  const limit = 100
  let hasMore = true
  try {
    while (hasMore) {
      const response = await axios.get(BLING_API_URL_PEDIDOS, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        params: {
          limit,
          page
        }
      })
      const data = response.data.data || []
      pedidos.push(...data)
      console.log(`📦 Página ${page} - Pedidos recebidos:`, data.length)
      if (data.length < limit) {
        hasMore = false
      } else {
        page++
      }
    }
    return pedidos
  } catch (err: any) {
    console.error(
      '❌ Erro ao buscar pedidos:',
      err?.response?.data || err?.message
    )
    return []
  }
}

export async function buscarContatos(accessToken: string) {
  const contatos: any[] = []
  let page = 1
  const limit = 100
  let hasMore = true
  try {
    while (hasMore) {
      const response = await axios.get(BLING_API_URL_CONTATOS, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        params: {
          limit,
          page
        }
      })
      const data = response.data.data || []
      contatos.push(...data)
      console.log(`🙎 Página ${page} - Contatos encontrados:`, data.length)
      if (data.length < limit) {
        hasMore = false
      } else {
        page++
      }
    }
    return contatos
  } catch (err: any) {
    console.error(
      '❌ Erro ao buscar contatos:',
      err?.response?.data || err?.message
    )
    return []
  }
}
