import { buscarPedidos, buscarContatos } from '../services/blingService'
import {
  sincronizarPedidosEContatos,
  atualizarMonitoramentoClientes
} from '../services/pedidoService'
import dotenv from 'dotenv'

dotenv.config()

async function sincronizarTudo() {
  try {
    const accessToken = process.env.BLING_API_TOKEN || ''
    if (!accessToken) {
      throw new Error('BLING_API_TOKEN não definido no .env')
    }
    const pedidos = await buscarPedidos(accessToken)
    const contatos = await buscarContatos(accessToken)
    await sincronizarPedidosEContatos(pedidos, contatos)
    await atualizarMonitoramentoClientes()
    console.log('✅ Sincronização concluída com sucesso!')
  } catch (error) {
    console.error('❌ Erro ao sincronizar:', error)
  }
}

sincronizarTudo()
