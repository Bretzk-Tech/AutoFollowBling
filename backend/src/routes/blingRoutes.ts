import { Router } from 'express'
import {
  importarPedidosBling,
  webhookBling
} from '../controllers/blingController'

const router = Router()

router.post('/importar', importarPedidosBling)
router.post('/webhook', webhookBling)

export default router
