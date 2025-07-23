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
import { SectionTitle } from './Dashboard.styles'

export default function Chart() {
  const [filtro, setFiltro] = React.useState('12meses')
  const data = filterData(filtro)
  return (
    <div
      style={{
        background: 'rgba(30,32,44,0.95)',
        borderRadius: 16,
        boxShadow: '0 2px 16px #23294633',
        padding: '10px 24px',
        margin: '0 auto',
        marginTop: 8,
        marginBottom: 24,
        border: '1px solid #232946',
        maxWidth: 1000,
        width: '100%'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          gap: 12,
          marginBottom: 16
        }}
      >
        <SectionTitle>Gráfico de Envios</SectionTitle>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => setFiltro('12meses')}
            style={{
              padding: '6px 16px',
              maxHeight: '30px',
              borderRadius: 8,
              border: 'none',
              background: filtro === '12meses' ? '#6c63ff' : '#232946',
              color: filtro === '12meses' ? '#fff' : '#bfc8e2',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow:
                filtro === '12meses' ? '0 2px 8px #6c63ff33' : undefined,
              transition: 'all 0.2s'
            }}
          >
            Últimos 12 meses
          </button>
          <button
            onClick={() => setFiltro('30dias')}
            style={{
              padding: '6px 16px',
              borderRadius: 8,
              maxHeight: '30px',
              border: 'none',
              background: filtro === '30dias' ? '#4f8cff' : '#232946',
              color: filtro === '30dias' ? '#fff' : '#bfc8e2',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow:
                filtro === '30dias' ? '0 2px 8px #4f8cff33' : undefined,
              transition: 'all 0.2s'
            }}
          >
            Últimos 30 dias
          </button>
          <button
            onClick={() => setFiltro('mes')}
            style={{
              padding: '6px 16px',
              borderRadius: 8,
              border: 'none',
              maxHeight: '30px',
              background: filtro === 'mes' ? '#2fd6a7' : '#232946',
              color: filtro === 'mes' ? '#fff' : '#bfc8e2',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: filtro === 'mes' ? '0 2px 8px #2fd6a733' : undefined,
              transition: 'all 0.2s'
            }}
          >
            Mês atual
          </button>
          <button
            onClick={() => setFiltro('semana')}
            style={{
              padding: '6px 16px',
              borderRadius: 8,
              border: 'none',
              maxHeight: '30px',
              background: filtro === 'semana' ? '#ffb86c' : '#232946',
              color: filtro === 'semana' ? '#232946' : '#bfc8e2',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow:
                filtro === 'semana' ? '0 2px 8px #ffb86c33' : undefined,
              transition: 'all 0.2s'
            }}
          >
            Semana atual
          </button>
          <button
            onClick={() => setFiltro('hoje')}
            style={{
              padding: '6px 16px',
              borderRadius: 8,
              maxHeight: '30px',
              border: 'none',
              background: filtro === 'hoje' ? '#ff2e63' : '#232946',
              color: filtro === 'hoje' ? '#fff' : '#bfc8e2',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: filtro === 'hoje' ? '0 2px 8px #ff2e6333' : undefined,
              transition: 'all 0.2s'
            }}
          >
            Hoje
          </button>
        </div>
      </div>
      <ResponsiveContainer width='100%' height={300}>
        <LineChart
          data={data}
          margin={{ top: 32, right: 32, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray='6 6' stroke='#23294655' />
          <XAxis
            dataKey='name'
            tick={{ fill: '#bfc8e2', fontSize: 14 }}
            axisLine={{ stroke: '#232946' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#bfc8e2', fontSize: 14 }}
            axisLine={{ stroke: '#232946' }}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              background: '#232946',
              borderRadius: 12,
              color: '#fff',
              border: 'none',
              boxShadow: '0 2px 8px #23294633',
              fontSize: 16
            }}
            labelStyle={{ color: '#fff', fontWeight: 700, fontSize: 15 }}
            itemStyle={{ color: '#38a169', fontWeight: 700, fontSize: 15 }}
            cursor={{ stroke: '#6c63ff', strokeWidth: 2 }}
          />
          <Legend wrapperStyle={{ color: '#bfc8e2', fontSize: 15 }} />
          <Line
            type='monotone'
            dataKey='envios'
            name='Envios'
            stroke='#4f8cff'
            strokeWidth={3}
            dot={{ r: 5, stroke: '#fff', strokeWidth: 2, fill: '#4f8cff' }}
            activeDot={{
              r: 8,
              fill: '#ff2e63',
              stroke: '#fff',
              strokeWidth: 2
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
