import { Router } from 'express'
import { webhookBling, sincronizarBling } from '../controllers/blingController'
import { validatePedidoBling } from '../middlewares/validatePedido'

const router = Router()

// Rota opcional para sincronização manual (útil para testes)
router.post('/sincronizar', sincronizarBling)
router.post('/webhook', validatePedidoBling, webhookBling)

export default router
