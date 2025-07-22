import { Request, Response } from 'express'
import { clientesParaMensagem } from '../services/pedidoService'
import { enviarMensagemWhatsApp } from '../services/whatsappService'

export async function rotinaMensagens(req: Request, res: Response) {
  const clientes = await clientesParaMensagem()
  for (const item of clientes) {
    await enviarMensagemWhatsApp(item.cliente, item.diffDias)
  }
  res
    .status(200)
    .json({ message: 'Mensagens enviadas', total: clientes.length })
}
