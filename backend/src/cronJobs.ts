import cron from 'node-cron'
import logger from './utils/logger'
import { buscarPedidos, buscarContatos } from './services/blingService'
import {
  sincronizarPedidosEContatos,
  atualizarMonitoramentoClientes,
  clientesParaMensagem
} from './services/pedidoService'
import { enviarMensagemWhatsApp } from './services/whatsappService'

// Função utilitária para delay
function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Função para calcular dias desde a última compra
function calcularDiffDias(ultimaCompra: Date): number {
  return Math.round(
    (new Date().getTime() - ultimaCompra.getTime()) / (1000 * 60 * 60 * 24)
  )
}

// Função para enviar mensagens para um lote de clientes com delay aleatório
async function enviarLoteMensagens(lote: any[], horaEnvio: number) {
  logger.info(
    `Enviando lote de mensagens para ${lote.length} clientes às ${horaEnvio}:00`
  )
  for (const cliente of lote) {
    const diffDias = calcularDiffDias(cliente.ultimaCompra)
    await enviarMensagemWhatsApp(cliente.contato, diffDias)
    // Delay aleatório entre 30s (30000ms) e 3min (180000ms)
    const delayMs = Math.floor(Math.random() * (180000 - 30000 + 1)) + 30000
    await delay(delayMs)
  }
}

// Função para dividir clientes em lotes
function dividirEmLotes(clientes: any[], tamanhoLote: number) {
  const lotes = []
  for (let i = 0; i < clientes.length; i += tamanhoLote) {
    lotes.push(clientes.slice(i, i + tamanhoLote))
  }
  return lotes
}

// Sincronização diária de pedidos e contatos
async function rotinaSincronizacao() {
  logger.info('Sincronizando pedidos e contatos do Bling...')
  try {
    const accessToken = process.env.BLING_API_TOKEN || ''
    const pedidos = await buscarPedidos(accessToken)
    const contatos = await buscarContatos(accessToken)
    await sincronizarPedidosEContatos(pedidos, contatos)
    await atualizarMonitoramentoClientes()
    logger.info('Sincronização e atualização de monitoramento concluída.')
  } catch (error) {
    logger.error('Erro na sincronização diária: ' + error)
  }
}

cron.schedule('0 2 * * *', rotinaSincronizacao)

// Rotina para agendar envios de mensagens em lotes a partir das 8h
async function rotinaMensagensDistribuidas() {
  logger.info('Executando rotina automática de mensagens (distribuída)...')
  const clientes = await clientesParaMensagem()
  const loteTamanho = 10
  const lotes = dividirEmLotes(clientes, loteTamanho)

  lotes.forEach((lote, idx) => {
    const horaEnvio = 8 + idx
    if (horaEnvio > 22) return // não envia após 23h
    cron.schedule(`0 ${horaEnvio} * * *`, async () => {
      await enviarLoteMensagens(lote, horaEnvio)
    })
  })
}

cron.schedule('0 8 * * *', rotinaMensagensDistribuidas)
