// testBlingPedidos.js
// Este teste faz uma requisição ao Bling para buscar pedidos dos últimos 30 dias.

const axios = require('axios')
const dayjs = require('dayjs')

// Configurações fixas
const CLIENT_ID = 'e9a6e55a2b525b29bf90eb085648e8c008f34e0d'
const CLIENT_SECRET =
  '1fd9f91b18e2d7f7136f1c3dcffa1aa2551ad7352afb0e02cda1bb2dcb38'

let ACCESS_TOKEN = '70fc27b7013b34e06673ca800096435d28332668'
let REFRESH_TOKEN = '0ce814fa470b23b6bad48705de9d63db77fe79b0'

async function refreshToken() {
  try {
    const qs = require('querystring')
    const data = qs.stringify({
      grant_type: 'refresh_token',
      refresh_token: REFRESH_TOKEN,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET
    })

    const response = await axios.post(
      'https://www.bling.com.br/Api/v3/oauth/token',
      data,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )

    const accessToken = response.data.access_token
    if (response.data.refresh_token) {
      REFRESH_TOKEN = response.data.refresh_token
    }
    console.log('🔄 Novo Access Token via refresh_token:', accessToken)
    return accessToken
  } catch (error) {
    console.error(
      '❌ Erro ao usar refresh_token:',
      error.response?.data || error.message
    )
    return null
  }
}

// 1. Buscar pedidos dos últimos 30 dias
async function buscarPedidos(accessToken) {
  // Buscar os 500 pedidos mais recentes, sem filtro de data
  const url = 'https://www.bling.com.br/Api/v3/pedidos/vendas?pagina=1&limite=5'

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })
    console.log('📦 Pedidos recebidos:')
    console.log(response.data)
    return true
  } catch (error) {
    console.error(
      '❌ Erro ao buscar pedidos:',
      error.response?.data || error.message
    )
    return false
  }
}

// 2. Executar
async function main() {
  let ok = await buscarPedidos(ACCESS_TOKEN)
  if (!ok) {
    console.log('Tentando obter novo token via refresh_token...')
    const newToken = await refreshToken()
    if (newToken) {
      ACCESS_TOKEN = newToken
      await buscarPedidos(ACCESS_TOKEN)
    } else {
      console.error('❌ Não foi possível obter um access token válido.')
    }
  }
}

main()
