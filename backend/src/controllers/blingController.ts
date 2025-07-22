import { Request, Response } from 'express'
import {
  fetchAllPedidosFromBling,
  savePedidoFromBling
} from '../services/blingService'
import logger from '../utils/logger'

export async function importarPedidosBling(req: Request, res: Response) {
  try {
    const pedidos = await fetchAllPedidosFromBling()
    for (const pedido of pedidos) {
      await savePedidoFromBling(pedido)
    }
    res
      .status(200)
      .json({
        message: 'Pedidos importados com sucesso',
        total: pedidos.length
      })
  } catch (error) {
    logger.error('Erro ao importar pedidos: ' + error)
    res.status(500).json({ error: 'Erro ao importar pedidos' })
  }
}

export async function webhookBling(req: Request, res: Response) {
  try {
    const pedido = req.body
    await savePedidoFromBling(pedido)
    res.status(200).json({ message: 'Pedido recebido e salvo' })
  } catch (error) {
    logger.error('Erro no webhook do Bling: ' + error)
    res.status(500).json({ error: 'Erro ao processar webhook' })
  }
}
