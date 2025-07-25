import React from 'react'
import Chart from './Chart'
import mockStats from '../mockStats.json'
import axios from 'axios'

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
  ThMsg,
  TdMsg,
  TableRowMsg,
  Card,
  CardTitle,
  CardValue,
  CardsWrapper,
  TableWrapper,
  PaginationButton,
  PaginationInfo,
  ChartWrapper,
  PaginationControls,
  TableRow,
  Td
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
  const [stats, setStats] = React.useState<Stats | null>(null)
  const [contatos, setContatos] = React.useState<any[]>([])
  const [page, setPage] = React.useState(1)
  const [contatosPage, setContatosPage] = React.useState(1)
  const itemsPerPage = 8
  const contatosItemsPerPage = 8

  async function fetchContatosMonitorados() {
    try {
      const res = await axios.get('http://localhost:3001/dashboard/contatos')
      console.log('Contatos monitorados:', res.data)
      return res.data
    } catch {
      console.log('Erro ao buscar contatos monitorados')
    }
  }
  async function fetchStats(): Promise<Stats | null> {
    try {
      const res = await fetch('/dashboard/stats')
      if (!res.ok) return null
      const data = await res.json()
      // Considera vazio se ultimos não existir ou for array vazio
      if (
        !data.ultimos ||
        !Array.isArray(data.ultimos) ||
        data.ultimos.length === 0
      )
        return null
      return data
    } catch {
      return null
    }
  }

  React.useEffect(() => {
    fetchStats().then(data => {
      setStats(data || (mockStats as Stats))
    })
    fetchContatosMonitorados().then(setContatos)
  }, [])

  if (!stats) return <div>Carregando...</div>

  const totalItems = stats.ultimos.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const paginated = stats.ultimos.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )
  const handlePrev = () => setPage(p => Math.max(1, p - 1))
  const handleNext = () => setPage(p => Math.min(totalPages, p + 1))
  // Paginação para períodos de compra
  const contatosTotalItems = contatos.length
  const contatosTotalPages = Math.ceil(
    contatosTotalItems / contatosItemsPerPage
  )
  const contatosPaginated = contatos.slice(
    (contatosPage - 1) * contatosItemsPerPage,
    contatosPage * contatosItemsPerPage
  )
  const handleContatosPrev = () => setContatosPage(p => Math.max(1, p - 1))
  const handleContatosNext = () =>
    setContatosPage(p => Math.min(contatosTotalPages, p + 1))
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

        <ChartWrapper style={{ paddingBottom: '40px' }}>
          <TableWrapper>
            <SectionTitle>Últimos envios</SectionTitle>
            <Table>
              <thead>
                <TableHeadRow>
                  <ThMsg>Data</ThMsg>
                  <ThMsg>Cliente</ThMsg>
                  <ThMsg>Status</ThMsg>
                  <ThMsg>Tipo</ThMsg>
                </TableHeadRow>
              </thead>
              <tbody>
                {paginated.map((msg, i) => (
                  <TableRowMsg
                    key={i + (page - 1) * itemsPerPage}
                    $hoverable
                    $even={(i + (page - 1) * itemsPerPage) % 2 === 0}
                  >
                    <TdMsg>{msg.data}</TdMsg>
                    <TdMsg>{msg.cliente}</TdMsg>
                    <TdMsg status={msg.status}>
                      {msg.status === 'sucesso' ? 'Sucesso' : 'Erro'}
                    </TdMsg>
                    <TdMsg>{msg.tipo}</TdMsg>
                  </TableRowMsg>
                ))}
              </tbody>
            </Table>
            {/* Pagination Controls */}
            <PaginationControls>
              <PaginationButton onClick={handlePrev} disabled={page === 1}>
                <span style={{ fontSize: 18, marginRight: 4 }}>←</span> Anterior
              </PaginationButton>
              <PaginationInfo>
                Página {page} de {totalPages}
              </PaginationInfo>
              <PaginationButton
                onClick={handleNext}
                disabled={page === totalPages}
              >
                Próxima <span style={{ fontSize: 18, marginLeft: 4 }}>→</span>
              </PaginationButton>
            </PaginationControls>
          </TableWrapper>
        </ChartWrapper>

        {/* Nova lista: Períodos de compra */}
        <ChartWrapper style={{ paddingBottom: '40px' }}>
          <TableWrapper>
            <SectionTitle>Períodos de compra</SectionTitle>
            <Table>
              <thead>
                <TableHeadRow>
                  <Th>Nome</Th>
                  <Th>Telefone</Th>
                  <Th>Qtd. Pedidos</Th>
                  <Th>Período médio (dias)</Th>
                  <Th>Dias p/ próxima compra</Th>
                </TableHeadRow>
              </thead>
              <tbody>
                {contatosPaginated.map((c, i) => (
                  <TableRow
                    key={i + (contatosPage - 1) * contatosItemsPerPage}
                    $even={
                      (i + (contatosPage - 1) * contatosItemsPerPage) % 2 === 0
                    }
                  >
                    <Td>{c.nome}</Td>
                    <Td>{c.telefone}</Td>
                    <Td>{c.quantidadePedidos}</Td>
                    <Td>
                      {c.quantidadePedidos < 2 ||
                      c.periodoCompraMediaDias == null
                        ? 'Ainda não existe'
                        : c.periodoCompraMediaDias}
                    </Td>
                    <Td>{c.diasParaProximaCompra}</Td>
                  </TableRow>
                ))}
              </tbody>
            </Table>
            {/* Pagination Controls */}
            <PaginationControls>
              <PaginationButton
                onClick={handleContatosPrev}
                disabled={contatosPage === 1}
              >
                <span style={{ fontSize: 18, marginRight: 4 }}>←</span> Anterior
              </PaginationButton>
              <PaginationInfo>
                Página {contatosPage} de {contatosTotalPages}
              </PaginationInfo>
              <PaginationButton
                onClick={handleContatosNext}
                disabled={contatosPage === contatosTotalPages}
              >
                Próxima <span style={{ fontSize: 18, marginLeft: 4 }}>→</span>
              </PaginationButton>
            </PaginationControls>
          </TableWrapper>
        </ChartWrapper>
      </Main>
    </Container>
  )
}
