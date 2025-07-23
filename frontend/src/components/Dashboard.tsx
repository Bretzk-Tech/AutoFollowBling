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
  PaginationInfo,
  ChartWrapper,
  PaginationControls
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
  // Define o gradient conforme a cor
  let gradient = ''
  if (cor === '#ffb86c') {
    gradient = 'linear-gradient(135deg, #ff9800 0%, #ffb86c 60%, #ff5722 100%)' // laranja intenso para laranja claro
  } else if (cor === '#4f8cff') {
    gradient = 'linear-gradient(135deg, #2979ff 0%, #4f8cff 60%, #1e40af 100%)' // azul intenso para azul claro
  } else if (cor === '#2fd6a7') {
    gradient = 'linear-gradient(135deg, #00c896 0%, #2fd6a7 60%, #00897b 100%)' // verde intenso para verde claro
  }
  return (
    <Card destaque={destaque} style={{ background: gradient }}>
      <CardTitle>
        <span
        // style={{ position: 'absolute', top: 18, right: 18, fontSize: 26 }}
        >
          {icone}
        </span>
        {titulo}
      </CardTitle>
      <CardValue>
        Sucesso: <span style={{ fontWeight: 800 }}>{sucesso}</span>
      </CardValue>
      <CardValue>
        Erro: <span style={{ fontWeight: 800 }}>{erro}</span>
      </CardValue>
    </Card>
  )
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
      <Sidebar>
        <SidebarLogo>
          <span
            role='img'
            aria-label='logo'
            style={{ color: '#f6e35e', fontSize: 32, marginRight: 8 }}
          >
            ⚡
          </span>
          <span>
            <span style={{ color: '#f6e35e' }}>Auto</span>
            <span style={{ color: '#fff' }}>Follow</span>
          </span>
        </SidebarLogo>
        <SidebarNav>
          <SidebarList>
            <SidebarItem active>
              <span role='img' aria-label='dashboard'>
                <svg
                  width='22'
                  height='22'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <circle cx='12' cy='12' r='10' fill='#6c63ff' />
                  <path
                    d='M8 12h8M12 8v8'
                    stroke='#fff'
                    strokeWidth='2'
                    strokeLinecap='round'
                  />
                </svg>
              </span>
              Dashboard
            </SidebarItem>
            <SidebarItem>
              <span role='img' aria-label='settings'>
                <svg
                  width='22'
                  height='22'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <circle cx='12' cy='12' r='10' fill='#232946' />
                  <path
                    d='M12 15a3 3 0 100-6 3 3 0 000 6z'
                    stroke='#bfc8e2'
                    strokeWidth='2'
                  />
                  <path
                    d='M19.4 15a1.65 1.65 0 01-2.3 2.3l-1.1-1.1a1.65 1.65 0 01-2.3 0l-1.1 1.1a1.65 1.65 0 01-2.3-2.3l1.1-1.1a1.65 1.65 0 010-2.3l-1.1-1.1a1.65 1.65 0 012.3-2.3l1.1 1.1a1.65 1.65 0 012.3 0l1.1-1.1a1.65 1.65 0 012.3 2.3l-1.1 1.1a1.65 1.65 0 010 2.3l1.1 1.1z'
                    stroke='#bfc8e2'
                    strokeWidth='1.5'
                  />
                </svg>
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
        <Subtitle style={{ color: '#bfc8e2', fontSize: 18, marginBottom: 32 }}>
          Resumo dos envios de WhatsApp
        </Subtitle>
        <CardsWrapper>
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
        <ChartWrapper>
          <Chart />
        </ChartWrapper>

        <ChartWrapper>
          <SectionTitle
            style={{ color: '#fff', fontSize: 20, marginBottom: 12 }}
          >
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
            <PaginationControls>
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
            </PaginationControls>
          </TableWrapper>
        </ChartWrapper>
      </Main>
    </Container>
  )
}
