import { Router } from 'express'
import { rotinaMensagens } from '../controllers/mensagemController'

const router = Router()

router.post('/rotina', rotinaMensagens)

export default router
