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

import './cronJobs'

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  logger.info(`Servidor rodando na porta ${PORT}`)
})
