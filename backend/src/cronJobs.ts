import cron from 'node-cron'
import logger from './utils/logger'
import {
  fetchAllPedidosFromBling,
  savePedidoFromBling
} from './services/blingService'
import { clientesParaMensagem } from './services/pedidoService'
import { enviarMensagemWhatsApp } from './services/whatsappService'

// Cron para buscar novos pedidos do Bling a cada 12 horas
cron.schedule('0 */12 * * *', async () => {
  logger.info('Buscando novos pedidos do Bling (cron horária)...')
  try {
    const pedidos = await fetchAllPedidosFromBling()
    for (const pedido of pedidos) {
      await savePedidoFromBling(pedido)
    }
    logger.info(`Pedidos do Bling sincronizados: ${pedidos.length}`)
  } catch (error) {
    logger.error('Erro ao buscar pedidos do Bling na cron horária: ' + error)
  }
})

// Rotina diária automática de mensagens
cron.schedule('0 8 * * *', async () => {
  logger.info('Executando rotina automática de mensagens...')
  const clientes = await clientesParaMensagem()
  for (const item of clientes) {
    await enviarMensagemWhatsApp(item.cliente, item.diffDias)
  }
})
