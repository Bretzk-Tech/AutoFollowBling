// getTokens.js
// Script para trocar o code do OAuth do Bling por access_token e refresh_token

const axios = require('axios')
const qs = require('querystring')

const CLIENT_ID = 'e9a6e55a2b525b29bf90eb085648e8c008f34e0d'
const CLIENT_SECRET =
  '1fd9f91b18e2d7f7136f1c3dcffa1aa2551ad7352afb0e02cda1bb2dcb38'
const CODE = 'bbe881ef803868f3a1f40619657521a7e643ecfb' // Substitua pelo seu code
const REDIRECT_URI = 'https://2maker.com.br/' // O mesmo usado no cadastro do app

async function getTokens() {
  const data = qs.stringify({
    grant_type: 'authorization_code',
    code: CODE,
    redirect_uri: REDIRECT_URI
  })

  const basicAuth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
    'base64'
  )

  try {
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
    console.log('Access Token:', response.data.access_token)
    console.log('Refresh Token:', response.data.refresh_token)
  } catch (error) {
    console.error(error.response?.data || error.message)
  }
}

getTokens()
