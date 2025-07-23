import '../src/middlewares/validateEnv'
import express from 'express'
import dotenv from 'dotenv'
import cron from 'node-cron'
import blingRoutes from './routes/blingRoutes'
import mensagemRoutes from './routes/mensagemRoutes'
import { clientesParaMensagem } from './services/pedidoService'
import { enviarMensagemWhatsApp } from './services/whatsappService'
import { errorHandler } from './middlewares/errorHandler'
import logger from './utils/logger'

dotenv.config()

const app = express()
app.use(express.json())

app.use('/bling', blingRoutes)
app.use('/mensagem', mensagemRoutes)

app.use(errorHandler)

// Cron para buscar novos pedidos do Bling a cada hora
import {
  fetchAllPedidosFromBling,
  savePedidoFromBling
} from './services/blingService'
cron.schedule('0 * * * *', async () => {
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

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  logger.info(`Servidor rodando na porta ${PORT}`)
})
