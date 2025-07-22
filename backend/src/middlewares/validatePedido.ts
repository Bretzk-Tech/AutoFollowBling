import { Request, Response, NextFunction } from 'express'

export function validatePedidoBling(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const pedido = req.body.pedido || req.body
  const cliente = pedido.cliente || req.body.cliente
  if (!pedido || !cliente) {
    res.status(400).json({ error: 'Pedido ou cliente ausente no payload.' })
    return
  }
  if (!cliente.nome || !(cliente.cnpj || cliente.cpf)) {
    res
      .status(400)
      .json({ error: 'Nome e CPF/CNPJ do cliente são obrigatórios.' })
    return
  }
  if (!pedido.data || !pedido.valor || !pedido.situacao) {
    res
      .status(400)
      .json({ error: 'Data, valor e status do pedido são obrigatórios.' })
    return
  }
  next()
}
