import dotenv from 'dotenv'
dotenv.config()

const requiredVars = [
  'DATABASE_URL',
  'BLING_API_KEY',
  'WHATSAPP_API_URL',
  'WHATSAPP_API_TOKEN'
]

for (const v of requiredVars) {
  if (!process.env[v]) {
    // eslint-disable-next-line no-console
    console.error(`Variável de ambiente obrigatória não definida: ${v}`)
    process.exit(1)
  }
}
