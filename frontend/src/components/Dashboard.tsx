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
  CardsWrapper,
  FilterButtonGroup,
  FilterButton,
  TableWrapper,
  PaginationButton,
  PaginationInfo
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
          <span style={{ color: '#f6d365', fontSize: 32, marginRight: 8 }}>
            ⚡
          </span>
          <span>
            <span style={{ color: '#f6d365' }}>Auto</span>
            <span style={{ color: '#fff' }}>Follow</span>
          </span>
        </SidebarLogo>
        <SidebarNav>
          <SidebarList>
            <SidebarItem active>
              <span role='img' aria-label='dashboard' style={{ fontSize: 22 }}>
                📊
              </span>
              Dashboard
            </SidebarItem>
            <SidebarItem>
              <span role='img' aria-label='settings' style={{ fontSize: 22 }}>
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
      <Main
        style={{
          flex: 1,
          padding: '32px 32px',
          display: 'flex'
        }}
      >
        <Title
          style={{
            color: '#fff',
            fontWeight: 800,
            fontSize: 32,
            marginBottom: 4,
            letterSpacing: 0.5
          }}
        >
          Dashboard de Mensagens
        </Title>
        <Subtitle style={{ color: '#bfc8e2', fontSize: 18, marginBottom: 32 }}>
          Resumo dos envios de WhatsApp
        </Subtitle>
        <CardsWrapper
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 24,
            alignItems: 'stretch',
            justifyContent: 'flex-start',
            marginBottom: 28,
            width: '100%',
            flexWrap: 'wrap'
          }}
        >
          <ResumoCard
            titulo='Hoje'
            sucesso={stats.dia.sucesso}
            erro={stats.dia.erro}
            destaque
            cor='#ffb86c'
            icone='🔥'
          />
          <ResumoCard
            titulo='Semana'
            sucesso={stats.semana.sucesso}
            erro={stats.semana.erro}
            cor='#4f8cff'
            icone='📅'
          />
          <ResumoCard
            titulo='Mês'
            sucesso={stats.mes.sucesso}
            erro={stats.mes.erro}
            cor='#2fd6a7'
            icone='📈'
          />
        </CardsWrapper>
        <div
          style={{
            width: '100%',
            background: '#232946',
            borderRadius: 16,
            boxShadow: '0 2px 16px #23294644',
            padding: 32,
            marginBottom: 32,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            maxWidth: 900
          }}
        >
          <SectionTitle
            style={{ color: '#fff', fontSize: 20, marginBottom: 18 }}
          >
            Gráfico de Envios
          </SectionTitle>
          {/* Filtros do gráfico */}
          <FilterButtonGroup>
            <FilterButton active>Últimos 12 meses</FilterButton>
            <FilterButton style={{ border: '1px solid #4f8cff44' }}>
              Últimos 30 dias
            </FilterButton>
            <FilterButton style={{ border: '1px solid #2fd6a744' }}>
              Semana atual
            </FilterButton>
          </FilterButtonGroup>
          <Chart />
        </div>

        <SectionTitle style={{ color: '#fff', fontSize: 20, marginBottom: 12 }}>
          Últimos envios
        </SectionTitle>
        <TableWrapper>
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
            <PaginationButton onClick={handlePrev} disabled={page === 1}>
              <span style={{ fontSize: 20, marginRight: 4 }}>←</span> Anterior
            </PaginationButton>
            <PaginationInfo>
              Página {page} de {totalPages}
            </PaginationInfo>
            <PaginationButton
              onClick={handleNext}
              disabled={page === totalPages}
            >
              Próxima <span style={{ fontSize: 20, marginLeft: 4 }}>→</span>
            </PaginationButton>
          </div>
        </TableWrapper>
      </Main>
    </Container>
  )
}

function ResumoCard({
  titulo,
  sucesso,
  erro,
  destaque,
  cor = '#ffb86c',
  icone = ''
}: {
  titulo: string
  sucesso: number
  erro: number
  destaque?: boolean
  cor?: string
  icone?: string
}) {
  return (
    <Card
      destaque={destaque}
      cor={
        cor === '#ffb86c'
          ? 'hoje'
          : cor === '#4f8cff'
          ? 'semana'
          : cor === '#2fd6a7'
          ? 'mes'
          : undefined
      }
    >
      <span style={{ position: 'absolute', top: 18, right: 18, fontSize: 26 }}>
        {icone}
      </span>
      <CardTitle>{titulo}</CardTitle>
      <CardValue color='#38a169'>
        Sucesso: <span style={{ fontWeight: 800 }}>{sucesso}</span>
      </CardValue>
      <CardValue color='#e53e3e'>
        Erro: <span style={{ fontWeight: 800 }}>{erro}</span>
      </CardValue>
    </Card>
  )
}
