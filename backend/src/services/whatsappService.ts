// Importa dependências necessárias
import axios from 'axios'
import prisma from '../prismaClient'
import logger from '../utils/logger'

// URL e Token da API do WhatsApp, definidos via variáveis de ambiente
const WHATSAPP_API_URL = process.env.WHATSAPP_API_URL || ''
const WHATSAPP_API_TOKEN = process.env.WHATSAPP_API_TOKEN || ''

/**
 * Envia uma mensagem de WhatsApp para o cliente, caso ainda não tenha sido enviada hoje.
 * Registra o envio no banco de dados para evitar duplicidade.
 * @param cliente Objeto do cliente
 * @param diffDias Quantidade de dias desde o último pedido
 */
export async function enviarMensagemWhatsApp(cliente: any, diffDias: number) {
  // Monta a mensagem personalizada
  const mensagem = `Olá ${cliente.nome}, faz ${diffDias} dias desde sua última compra! Aproveite nossas ofertas!`

  // Evitar duplicidade: verifica se já enviou mensagem hoje para este cliente
  const hoje = new Date()
  const inicioDia = new Date(
    hoje.getFullYear(),
    hoje.getMonth(),
    hoje.getDate(),
    0,
    0,
    0
  )
  const fimDia = new Date(
    hoje.getFullYear(),
    hoje.getMonth(),
    hoje.getDate(),
    23,
    59,
    59
  )

  // Consulta se já existe registro de envio hoje
  const jaEnviou = await prisma.historicoMensagem.findFirst({
    where: {
      clienteId: cliente.id,
      tipo: 'whatsapp',
      dataEnvio: {
        gte: inicioDia,
        lte: fimDia
      }
    }
  })

  // Se já enviou, registra no log e retorna
  if (jaEnviou) {
    logger.info(
      `Mensagem já enviada hoje para ${cliente.nome} (${cliente.telefone})`
    )
    return
  }

  try {
    // Envia a mensagem via API do WhatsApp
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

    // Registra o envio no banco de dados
    await prisma.historicoMensagem.create({
      data: {
        clienteId: cliente.id,
        dataEnvio: new Date(),
        tipo: 'whatsapp'
      }
    })
    logger.info(`Mensagem enviada para ${cliente.nome} (${cliente.telefone})`)
  } catch (error) {
    // Loga erro caso o envio falhe
    logger.error('Erro ao enviar mensagem WhatsApp: ' + error)
  }
}
