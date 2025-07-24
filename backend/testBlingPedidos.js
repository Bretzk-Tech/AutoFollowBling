// testBlingPedidos.js
// Este teste faz uma requisição ao Bling para buscar pedidos dos últimos 30 dias.

const axios = require('axios')
const dayjs = require('dayjs')

// Configure sua API Key do Bling aqui
// Substitua pelo seu código de autorização obtido no redirect
const AUTH_CODE = '4b7adc9dd048af4d44d02f9e8057b4c7c9e472f2'
const CLIENT_ID = 'e9a6e55a2b525b29bf90eb085648e8c008f34e0d'
const CLIENT_SECRET =
  '1fd9f91b18e2d7f7136f1c3dcffa1aa2551ad7352afb0e02cda1bb2dcb38'
const REDIRECT_URI = 'https://2maker.com.br/'

async function obterToken() {
  try {
    const qs = require('querystring')
    const data = qs.stringify({
      grant_type: 'authorization_code',
      code: AUTH_CODE,
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET
    })
    const response = await axios.post(
      'https://api.bling.com.br/Api/v3/contatos',
      data,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )
    const accessToken = response.data.access_token
    console.log('Access Token:', accessToken)
    return accessToken
  } catch (error) {
    console.error(
      'Erro ao obter token:',
      error.response ? error.response.data : error.message
    )
    return null
  }
}

async function buscarPedidos(accessToken) {
  const url = 'https://api.bling.com.br/Api/v3/pedidos'
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })
    console.log('Pedidos:', response.data)
  } catch (error) {
    console.error(
      'Erro ao buscar pedidos:',
      error.response ? error.response.data : error.message
    )
  }
}

async function main() {
  const token = await obterToken()
  if (token) {
    await buscarPedidos(token)
  }
}

main()
