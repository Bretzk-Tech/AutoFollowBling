// Importa dependências necessárias
import axios from 'axios'
import prisma from '../config/prismaClient'
import logger from '../utils/logger'

// URL e Token da API do WhatsApp (não utilizados enquanto o envio está desativado)
// const WHATSAPP_API_URL = process.env.WHATSAPP_API_URL || ''
// const WHATSAPP_API_TOKEN = process.env.WHATSAPP_API_TOKEN || ''

/**
 * Envia uma mensagem de WhatsApp para o cliente, caso ainda não tenha sido enviada hoje.
 * Registra o envio no banco de dados para evitar duplicidade.
 * @param cliente Objeto do cliente
 * @param diffDias Quantidade de dias desde o último pedido
 */
export async function enviarMensagemWhatsApp(cliente: any, diffDias: number) {
  // Lógica de envio de mensagens comentada para futura implementação/correção
  /*
  // Monta a mensagem personalizada
  const mensagem = `Olá ${cliente.nome}, faz ${diffDias} dias desde sua última compra! Aproveite nossas ofertas!`

  // Evitar duplicidade: verifica se já enviou mensagem para este cliente (mensagemEnviada)
  if (cliente.mensagemEnviada) {
    logger.info(`Mensagem já enviada para ${cliente.nome} (${cliente.celular})`)
    return
  }

  try {
    // Envia a mensagem via API do WhatsApp
    await axios.post(
      WHATSAPP_API_URL,
      {
        phone: cliente.celular,
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
    // Marca mensagem como enviada no monitoramento
    await import('./pedidoService').then(s =>
      s.marcarMensagemEnviada(BigInt(cliente.id))
    )
    logger.info(`Mensagem enviada para ${cliente.nome} (${cliente.celular})`)
  } catch (error) {
    // Loga erro caso o envio falhe
    logger.error('Erro ao enviar mensagem WhatsApp: ' + error)
  }
  */
}
