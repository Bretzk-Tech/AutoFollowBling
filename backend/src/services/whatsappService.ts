import axios from 'axios'
import prisma from '../prismaClient'
import logger from '../utils/logger'

const WHATSAPP_API_URL = process.env.WHATSAPP_API_URL || ''
const WHATSAPP_API_TOKEN = process.env.WHATSAPP_API_TOKEN || ''

export async function enviarMensagemWhatsApp(cliente: any, diffDias: number) {
  const mensagem = `Olá ${cliente.nome}, faz ${diffDias} dias desde sua última compra! Aproveite nossas ofertas!`
  try {
    await axios.post(
      WHATSAPP_API_URL,
      {
        phone: cliente.telefone,
        message: mensagem
      },
      {
        headers: { Authorization: `Bearer ${WHATSAPP_API_TOKEN}` }
      }
    )
    await prisma.historicoMensagem.create({
      data: {
        clienteId: cliente.id,
        dataEnvio: new Date(),
        tipo: 'whatsapp'
      }
    })
    logger.info(`Mensagem enviada para ${cliente.nome} (${cliente.telefone})`)
  } catch (error) {
    logger.error('Erro ao enviar mensagem WhatsApp: ' + error)
  }
}
