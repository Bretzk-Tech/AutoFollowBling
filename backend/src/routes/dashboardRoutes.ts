import { Router } from 'express'
import {
  getDashboardStats,
  getContatosMonitorados
} from '../controllers/dashboardController'

const router = Router()

router.get('/stats', getDashboardStats)
router.get('/contatos', getContatosMonitorados)

export default router
