import cron from 'node-cron'
import logger from './utils/logger'
import { buscarPedidos, buscarContatos } from './services/blingService'
import {
  sincronizarPedidosEContatos,
  atualizarMonitoramentoClientes,
  clientesParaMensagem
} from './services/pedidoService'
import { enviarMensagemWhatsApp } from './services/whatsappService'

// Cron para sincronizar pedidos e contatos do Bling e atualizar monitoramento a cada dia às 2h
cron.schedule('0 2 * * *', async () => {
  logger.info('Sincronizando pedidos e contatos do Bling...')
  try {
    // TODO: obter accessToken de forma segura/configurada
    const accessToken = process.env.BLING_API_TOKEN || ''
    const pedidos = await buscarPedidos(accessToken)
    const contatos = await buscarContatos(accessToken)
    await sincronizarPedidosEContatos(pedidos, contatos)
    await atualizarMonitoramentoClientes()
    logger.info('Sincronização e atualização de monitoramento concluída.')
  } catch (error) {
    logger.error('Erro na sincronização diária: ' + error)
  }
})

// Rotina diária automática de mensagens às 8h
cron.schedule('0 8 * * *', async () => {
  logger.info('Executando rotina automática de mensagens...')
  const clientes = await clientesParaMensagem()
  for (const cliente of clientes) {
    // diffDias = dias desde a última compra
    const diffDias = Math.round(
      (new Date().getTime() - cliente.ultimaCompra.getTime()) /
        (1000 * 60 * 60 * 24)
    )
    await enviarMensagemWhatsApp(cliente.contato, diffDias)
  }
})
