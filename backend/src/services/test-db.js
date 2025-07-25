const { Client } = require('pg')

// Substitua a senha abaixo pela sua senha do PostgreSQL
const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '28102003',
  database: 'AutoFllow'
})

client
  .connect()
  .then(() => {
    console.log('✅ Conexão com o banco de dados estabelecida com sucesso.')
    return client.query('SELECT NOW()')
  })
  .then(res => {
    console.log('🕒 Horário atual do banco:', res.rows[0].now)
  })
  .catch(err => {
    console.error('❌ Erro ao conectar no banco:', err.message)
  })
  .finally(() => {
    client.end()
  })
