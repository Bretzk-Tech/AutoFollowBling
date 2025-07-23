import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

// Gera dados fictícios de envios para os últimos 365 dias
function generateDailyData() {
  const now = new Date()
  const days = []
  for (let i = 0; i < 365; i++) {
    const d = new Date(now)
    d.setDate(now.getDate() - i)
    days.unshift({
      date: d,
      name: d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      envios: Math.floor(Math.random() * 20 + 10)
    })
  }
  return days
}

const dailyData = generateDailyData()

function getMonthName(date: Date): string {
  return date.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' })
}

function filterData(type: string): { name: string; envios: number }[] {
  const now = new Date()
  if (type === '30dias') {
    return dailyData.slice(-30).map(d => ({ name: d.name, envios: d.envios }))
  }
  if (type === 'mes') {
    return dailyData
      .filter(
        d =>
          d.date.getMonth() === now.getMonth() &&
          d.date.getFullYear() === now.getFullYear()
      )
      .map(d => ({ name: d.name, envios: d.envios }))
  }
  if (type === 'semana') {
    const weekStart = new Date(now)
    weekStart.setDate(now.getDate() - now.getDay())
    return dailyData
      .filter(d => d.date >= weekStart && d.date <= now)
      .map(d => ({ name: d.name, envios: d.envios }))
  }
  if (type === 'hoje') {
    return dailyData
      .filter(d => d.date.toDateString() === now.toDateString())
      .map(d => ({ name: d.name, envios: d.envios }))
  }
  // Default: últimos 12 meses
  const months = []
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const name = getMonthName(d)
    const envios = dailyData
      .filter(
        x =>
          x.date.getMonth() === d.getMonth() &&
          x.date.getFullYear() === d.getFullYear()
      )
      .reduce((acc, x) => acc + x.envios, 0)
    months.push({ name, envios })
  }
  return months
}

import React from 'react'

export default function Chart() {
  const [filtro, setFiltro] = React.useState('12meses')
  const data = filterData(filtro)
  return (
    <div>
      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <button
          onClick={() => setFiltro('12meses')}
          style={{
            padding: '6px 16px',
            borderRadius: 6,
            border: 'none',
            background: filtro === '12meses' ? '#38a169' : '#e2e8f0',
            color: filtro === '12meses' ? '#fff' : '#232946',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Últimos 12 meses
        </button>
        <button
          onClick={() => setFiltro('30dias')}
          style={{
            padding: '6px 16px',
            borderRadius: 6,
            border: 'none',
            background: filtro === '30dias' ? '#38a169' : '#e2e8f0',
            color: filtro === '30dias' ? '#fff' : '#232946',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Últimos 30 dias
        </button>
        <button
          onClick={() => setFiltro('mes')}
          style={{
            padding: '6px 16px',
            borderRadius: 6,
            border: 'none',
            background: filtro === 'mes' ? '#38a169' : '#e2e8f0',
            color: filtro === 'mes' ? '#fff' : '#232946',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Mês atual
        </button>
        <button
          onClick={() => setFiltro('semana')}
          style={{
            padding: '6px 16px',
            borderRadius: 6,
            border: 'none',
            background: filtro === 'semana' ? '#38a169' : '#e2e8f0',
            color: filtro === 'semana' ? '#fff' : '#232946',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Semana atual
        </button>
        <button
          onClick={() => setFiltro('hoje')}
          style={{
            padding: '6px 16px',
            borderRadius: 6,
            border: 'none',
            background: filtro === 'hoje' ? '#38a169' : '#e2e8f0',
            color: filtro === 'hoje' ? '#fff' : '#232946',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Hoje
        </button>
      </div>
      <ResponsiveContainer width='100%' height={300}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type='monotone'
            dataKey='envios'
            name='Envio de Mensagens'
            stroke='#38a169'
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
