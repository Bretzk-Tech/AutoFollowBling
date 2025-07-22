import { Router } from 'express'
import {
  importarPedidosBling,
  webhookBling
} from '../controllers/blingController'
import { validatePedidoBling } from '../middlewares/validatePedido'

const router = Router()

router.post('/importar', validatePedidoBling, importarPedidosBling)
router.post('/webhook', validatePedidoBling, webhookBling)

export default router
