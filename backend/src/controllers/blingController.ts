import { Request, Response } from 'express'

import { buscarContatos, buscarPedidos } from '../services/blingService'
import {
  sincronizarPedidosEContatos,
  atualizarMonitoramentoClientes
} from '../services/pedidoService'
import logger from '../utils/logger'
// Endpoint opcional para forçar sincronização manual (útil para testes)
export async function sincronizarBling(req: Request, res: Response) {
  try {
    const accessToken = process.env.BLING_API_TOKEN || ''
    const pedidos = await buscarPedidos(accessToken)
    const contatos = await buscarContatos(accessToken)
    await sincronizarPedidosEContatos(pedidos, contatos)
    await atualizarMonitoramentoClientes()
    res.status(200).json({ message: 'Sincronização manual concluída' })
  } catch (error) {
    logger.error('Erro na sincronização manual: ' + error)
    res.status(500).json({ error: 'Erro ao sincronizar' })
  }
}

export async function webhookBling(req: Request, res: Response) {
  try {
    // Aqui pode-se implementar lógica futura para processar webhooks do Bling
    res.status(200).json({ message: 'Webhook recebido' })
  } catch (error) {
    logger.error('Erro no webhook do Bling: ' + error)
    res.status(500).json({ error: 'Erro ao processar webhook' })
  }
}
