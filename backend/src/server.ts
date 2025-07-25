import './middlewares/validateEnv'
import cors from 'cors'
import dotenv from 'dotenv'
import logger from './utils/logger'
import express from 'express'
import blingRoutes from './routes/blingRoutes'
import mensagemRoutes from './routes/mensagemRoutes'
import dashboardRoutes from './routes/dashboardRoutes'
import { errorHandler } from './middlewares/errorHandler'

dotenv.config()

const app = express()

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}

export default cors(corsOptions)

app.use(express.json())

app.use('/bling', blingRoutes)
app.use('/mensagem', mensagemRoutes)
app.use('/dashboard', dashboardRoutes)

app.use(errorHandler)

import './cronJobs'

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  logger.info(`Servidor rodando na porta http://localhost:${PORT}`)
})
