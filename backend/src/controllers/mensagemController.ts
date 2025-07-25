import { Request, Response } from 'express'
import { clientesParaMensagem } from '../services/pedidoService'
import { enviarMensagemWhatsApp } from '../services/whatsappService'

export async function rotinaMensagens(req: Request, res: Response) {
  const clientes = await clientesParaMensagem()
  for (const item of clientes) {
    // O diffDias pode ser calculado como a diferença entre hoje e a última compra
    const diffDias = Math.floor(
      (Date.now() - new Date(item.ultimaCompra).getTime()) /
        (1000 * 60 * 60 * 24)
    )
    await enviarMensagemWhatsApp(
      {
        ...item.contato,
        mensagemEnviada: item.mensagemEnviada,
        id: item.contatoId
      },
      diffDias
    )
  }
  res
    .status(200)
    .json({ message: 'Mensagens enviadas', total: clientes.length })
}
