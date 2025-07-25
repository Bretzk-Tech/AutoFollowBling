// testBlingPedidos.js
// Este teste faz uma requisição ao Bling para buscar pedidos dos últimos 30 dias.

const axios = require('axios')
const dayjs = require('dayjs')

// Configurações fixas
const CLIENT_ID = 'e9a6e55a2b525b29bf90eb085648e8c008f34e0d'
const CLIENT_SECRET =
  '1fd9f91b18e2d7f7136f1c3dcffa1aa2551ad7352afb0e02cda1bb2dcb38'

let ACCESS_TOKEN = '665ee2acc6b1e73cb3add0c295d91b06388e2bab'
let REFRESH_TOKEN = '2752d7ea83abf01a0df1c2897f8f0416187d44e6'

async function refreshToken() {
  try {
    const qs = require('querystring')
    const data = qs.stringify({
      grant_type: 'refresh_token',
      refresh_token: REFRESH_TOKEN
    })

    // Monta o header Authorization: Basic base64(client_id:client_secret)
    const basicAuth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
      'base64'
    )

    const response = await axios.post(
      'https://www.bling.com.br/Api/v3/oauth/token',
      data,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${basicAuth}`
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

// 1. Buscar pedidos
async function buscarPedidos(accessToken) {
  const url = 'https://www.bling.com.br/Api/v3/contatos'

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })
    console.log('📦 Pedidos recebidos:', response.data.data)
    console.log('Total de contatos:', response.data.data.length)
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
