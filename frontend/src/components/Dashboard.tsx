import React from 'react'
import Chart from './Chart'
import mockStats from '../mockStats.json'
import {
  Container,
  Sidebar,
  SidebarLogo,
  SidebarNav,
  SidebarList,
  SidebarItem,
  SidebarVersion,
  Main,
  Title,
  Subtitle,
  SectionTitle,
  Table,
  TableHeadRow,
  Th,
  Td,
  TableRow,
  Card,
  CardTitle,
  CardValue,
  CardLabel,
  CardsWrapper
} from './Dashboard.styles'

interface Stats {
  dia: { sucesso: number; erro: number }
  semana: { sucesso: number; erro: number }
  mes: { sucesso: number; erro: number }
  ultimos: Array<{
    data: string
    cliente: string
    status: string
    tipo: string
  }>
}

export default function Dashboard() {
  const stats = mockStats as Stats
  const [page, setPage] = React.useState(1)
  const itemsPerPage = 8
  const totalItems = stats.ultimos.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const paginated = stats.ultimos.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )
  const handlePrev = () => setPage(p => Math.max(1, p - 1))
  const handleNext = () => setPage(p => Math.min(totalPages, p + 1))
  return (
    <Container>
      {/* Sidebar */}
      <Sidebar>
        <SidebarLogo>
          <span style={{ color: '#f6d365', fontSize: 36 }}>⚡</span>
          <span>
            <span style={{ color: '#f6d365' }}>Auto</span>
            <span style={{ color: '#fff' }}>Follow</span>
          </span>
        </SidebarLogo>
        <SidebarNav>
          <SidebarList>
            <SidebarItem active>
              <span
                role='img'
                aria-label='dashboard'
                style={{ marginRight: 12, fontSize: 22 }}
              >
                📊
              </span>
              Dashboard
            </SidebarItem>
            <SidebarItem>
              <span
                role='img'
                aria-label='settings'
                style={{ marginRight: 12, fontSize: 22 }}
              >
                ⚙️
              </span>
              Configurações
            </SidebarItem>
          </SidebarList>
        </SidebarNav>
        <div style={{ flex: 1 }} />
        <SidebarVersion>v1.0</SidebarVersion>
      </Sidebar>
      {/* Main content */}
      <Main>
        <Title>Dashboard de Mensagens</Title>
        <Subtitle>Resumo dos envios de WhatsApp</Subtitle>
        <CardsWrapper
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 24,
            alignItems: 'stretch',
            justifyContent: 'center',
            marginBottom: 24
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              minWidth: 220,
              flex: '1 1 220px',
              maxWidth: 320
            }}
          >
            <ResumoCard
              titulo='Hoje'
              sucesso={stats.dia.sucesso}
              erro={stats.dia.erro}
              destaque
            />
            <ResumoCard
              titulo='Semana'
              sucesso={stats.semana.sucesso}
              erro={stats.semana.erro}
            />
            <ResumoCard
              titulo='Mês'
              sucesso={stats.mes.sucesso}
              erro={stats.mes.erro}
            />
          </div>
          <div
            style={{
              flex: '2 1 400px',
              minWidth: 320,
              maxWidth: 600,
              width: '100%',
              background: '#fff',
              borderRadius: 12,
              boxShadow: '0 2px 8px #f6d36522',
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <SectionTitle style={{ textAlign: 'center', marginBottom: 8 }}>
              Gráfico de Envios
            </SectionTitle>
            <Chart />
          </div>
        </CardsWrapper>
        {/* Gráfico de vendas */}

        <SectionTitle>Últimos envios</SectionTitle>
        <CardsWrapper>
          <Table>
            <thead>
              <TableHeadRow>
                <Th>Data</Th>
                <Th>Cliente</Th>
                <Th>Status</Th>
                <Th>Tipo</Th>
              </TableHeadRow>
            </thead>
            <tbody>
              {paginated.map((msg, i) => (
                <TableRow
                  key={i + (page - 1) * itemsPerPage}
                  hoverable
                  even={(i + (page - 1) * itemsPerPage) % 2 === 0}
                >
                  <Td>{msg.data}</Td>
                  <Td>{msg.cliente}</Td>
                  <Td
                    style={{
                      color: msg.status === 'sucesso' ? '#38a169' : '#e53e3e',
                      fontWeight: 700,
                      letterSpacing: 0.2,
                      textShadow:
                        msg.status === 'sucesso'
                          ? '0 1px 4px #38a16922'
                          : '0 1px 4px #e53e3e22'
                    }}
                  >
                    {msg.status === 'sucesso' ? 'Sucesso' : 'Erro'}
                  </Td>
                  <Td>{msg.tipo}</Td>
                </TableRow>
              ))}
            </tbody>
          </Table>
          {/* Pagination Controls */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 18,
              gap: 16
            }}
          >
            <button
              onClick={handlePrev}
              disabled={page === 1}
              style={{
                padding: '8px 18px',
                borderRadius: 8,
                border: 'none',
                background:
                  page === 1
                    ? '#e2e8f0'
                    : 'linear-gradient(90deg, #f6d365 0%, #fda085 100%)',
                color: page === 1 ? '#a0aec0' : '#232946',
                fontWeight: 700,
                cursor: page === 1 ? 'not-allowed' : 'pointer',
                opacity: page === 1 ? 0.6 : 1,
                fontSize: 18,
                boxShadow: page === 1 ? 'none' : '0 2px 8px #f6d36522',
                transition: 'all 0.2s',
                outline: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}
              onMouseOver={e => {
                if (page !== 1)
                  e.currentTarget.style.background =
                    'linear-gradient(90deg, #fda085 0%, #f6d365 100%)'
              }}
              onMouseOut={e => {
                if (page !== 1)
                  e.currentTarget.style.background =
                    'linear-gradient(90deg, #f6d365 0%, #fda085 100%)'
              }}
            >
              <span style={{ fontSize: 20, marginRight: 4 }}>←</span> Anterior
            </button>
            <span
              style={{
                fontWeight: 700,
                fontSize: 17,
                color: '#232946',
                background: '#f6d36522',
                borderRadius: 6,
                padding: '6px 18px',
                boxShadow: '0 2px 8px #f6d36511'
              }}
            >
              Página {page} de {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={page === totalPages}
              style={{
                padding: '8px 18px',
                borderRadius: 8,
                border: 'none',
                background:
                  page === totalPages
                    ? '#e2e8f0'
                    : 'linear-gradient(90deg, #f6d365 0%, #fda085 100%)',
                color: page === totalPages ? '#a0aec0' : '#232946',
                fontWeight: 700,
                cursor: page === totalPages ? 'not-allowed' : 'pointer',
                opacity: page === totalPages ? 0.6 : 1,
                fontSize: 18,
                boxShadow: page === totalPages ? 'none' : '0 2px 8px #f6d36522',
                transition: 'all 0.2s',
                outline: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}
              onMouseOver={e => {
                if (page !== totalPages)
                  e.currentTarget.style.background =
                    'linear-gradient(90deg, #fda085 0%, #f6d365 100%)'
              }}
              onMouseOut={e => {
                if (page !== totalPages)
                  e.currentTarget.style.background =
                    'linear-gradient(90deg, #f6d365 0%, #fda085 100%)'
              }}
            >
              Próxima <span style={{ fontSize: 20, marginLeft: 4 }}>→</span>
            </button>
          </div>
        </CardsWrapper>
      </Main>
    </Container>
  )
}

function ResumoCard({
  titulo,
  sucesso,
  erro,
  destaque
}: {
  titulo: string
  sucesso: number
  erro: number
  destaque?: boolean
}) {
  return (
    <Card destaque={destaque}>
      {destaque && (
        <span
          style={{
            position: 'absolute',
            top: 18,
            right: 18,
            fontSize: 22,
            color: '#fda085',
            opacity: 0.7
          }}
        >
          🔥
        </span>
      )}
      <CardTitle>{titulo}</CardTitle>
      <CardValue color='#38a169'>
        <CardLabel>Sucesso</CardLabel> {sucesso}
      </CardValue>
      <CardValue color='#e53e3e'>
        <CardLabel>Erro</CardLabel> {erro}
      </CardValue>
    </Card>
  )
}
