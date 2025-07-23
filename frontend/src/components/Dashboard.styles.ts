export const TdMsg = styled.td<{ status?: string }>`
  color: ${({ status }) =>
    status === 'sucesso'
      ? '#2e7d32'
      : status === 'erro'
      ? '#c62828'
      : '#1a2236'};
  font-weight: ${({ status }) => (status ? 600 : 500)};
  letter-spacing: ${({ status }) => (status ? 0.1 : 0.0)}px;
  padding: 8px 8px;
  font-size: 14px;
  border-radius: ${({ status }) => (status ? 4 : 0)}px;
  background: ${({ status }) =>
    status === 'sucesso'
      ? '#e8f5e9'
      : status === 'erro'
      ? '#ffebee'
      : 'transparent'};
  box-shadow: none;
  border: 1px solid #e5e7eb;
`

export const TableRowMsg = styled.tr<{ even?: boolean; hoverable?: boolean }>`
  background: ${({ even }) => (even ? '#fff' : '#f4f6fa')};
  transition: background 0.2s;
  border-bottom: 1px solid #e5e7eb;
  cursor: ${({ hoverable }) => (hoverable ? 'pointer' : 'default')};
  &:hover {
    background: ${({ hoverable }) => (hoverable ? '#f6d36511' : undefined)};
  }
`
export const PaginationControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 18px;
  gap: 16px;
`
export const ChartWrapper = styled.div`
  width: 100%;
  border-radius: 16px;
  /* box-shadow: 0 2px 16px #23294644; */
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`
export const PaginationInfo = styled.span`
  font-weight: 700;
  font-size: 17px;
  color: #232946;
  background: #f6d36522;
  border-radius: 6px;
  padding: 6px 18px;
  box-shadow: 0 2px 8px #f6d36511;
`
interface PaginationButtonProps {
  disabled?: boolean
}
export const PaginationButton = styled.button<PaginationButtonProps>`
  padding: 8px 18px;
  border-radius: 8px;
  border: none;
  background: ${({ disabled }) =>
    disabled ? '#e2e8f0' : 'linear-gradient(90deg, #f6d365 0%, #fda085 100%)'};
  color: ${({ disabled }) => (disabled ? '#a0aec0' : '#232946')};
  font-weight: 700;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  font-size: 18px;
  box-shadow: ${({ disabled }) => (disabled ? 'none' : '0 2px 8px #f6d36522')};
  transition: all 0.2s;
  outline: none;
  display: flex;
  align-items: center;
  gap: 8px;
  &:hover {
    background: ${({ disabled }) =>
      disabled
        ? '#e2e8f0'
        : 'linear-gradient(90deg, #fda085 0%, #f6d365 100%)'};
  }
`
export const TableWrapper = styled.div`
  width: 100%;
  max-width: 1050px;
  margin: 0 auto;
  box-sizing: border-box;
  overflow-x: auto;
  border-radius: 16px;
`
export const FilterButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 18px;
`

export const FilterButton = styled.button<{ active?: boolean }>`
  padding: 4px 14px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 700;
  background: ${({ active }) => (active ? '#4f8cff' : '#232946')};
  color: ${({ active }) => (active ? '#fff' : '#bfc8e2')};
  border: none;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  outline: none;
  box-shadow: ${({ active }) => (active ? '0 2px 8px #4f8cff44' : 'none')};
`
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(120deg, #232946 0%, #232946 60%, #1a1a2e 100%);
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  letter-spacing: 0.1px;
  padding: 0;
`

export const Sidebar = styled.aside`
  width: 250px;
  max-width: 250px;
  background: linear-gradient(120deg, #181c2a 0%, #232946 100%);
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 0 18px 0;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  border-top-right-radius: 18px;
  border-bottom-right-radius: 18px;
  box-shadow: 0 4px 24px #00000022;
  gap: 16px;
  padding: 24px 12px;
`

export const SidebarLogo = styled.div`
  font-weight: 800;
  font-size: 24px;
  margin-bottom: 32px;
  letter-spacing: -1.5px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #f6e35e;
`

export const SidebarNav = styled.nav`
  width: 100%;
  padding: 0 24px;
`

export const SidebarList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  gap: 12px;
`

interface SidebarItemProps {
  active?: boolean
}
export const SidebarItem = styled.li<SidebarItemProps>`
  padding: 10px 20px;
  font-size: 16px;
  color: ${({ active }) => (active ? '#fff' : '#bfc8e2')};
  cursor: pointer;
  transition: background 0.18s, color 0.18s;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 210px;
  font-weight: 600;
  margin-bottom: 8px;
  border-radius: 8px;
  background: ${({ active }) => (active ? 'rgba(108,99,255,0.10)' : 'none')};
  border: none;
  gap: 8px;
  & svg,
  & span[role='img'] {
    color: ${({ active }) => (active ? '#6c63ff' : '#bfc8e2')};
    background: none;
    border-radius: 6px;
    margin-right: 6px;
    transition: color 0.18s;
  }
`

export const SidebarVersion = styled.div`
  font-size: 13px;
  color: #cbd5e1;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
  padding-left: 24px;
`

export const Main = styled.main`
  flex: 1;
  padding: 40px 4vw 0 4vw;
  margin: 0 auto;
  margin-left: 240px;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background: linear-gradient(120deg, #232946 80%, #1a1a2e 100%);
  box-shadow: 0 4px 24px #00000022;
  min-height: 100vh;
`

export const Title = styled.h1`
  font-weight: 900;
  font-size: 42px;
  margin-bottom: 0px;
  color: #fff;
  letter-spacing: -2px;
  text-shadow: 0 2px 12px #23294688;
`

export const Subtitle = styled.p`
  color: #cbd5e1;
  margin-bottom: 18px;
  font-size: 19px;
  font-weight: 500;
  letter-spacing: -0.5px;
`

export const SectionTitle = styled.h2`
  font-size: 24px;
  color: #fff;
  margin-bottom: 22px;
  font-weight: 800;
  letter-spacing: -1px;
  text-shadow: 0 2px 8px #23294644;
  letter-spacing: 0.2;
  text-shadow: none;
  border-bottom: 1px solid #e5e7eb;
  width: auto;
  max-width: 200px;
`

// Removido CardsWrapper duplicado
export const CardsWrapper = styled.div`
  display: flex;
  gap: 22px;
  margin: 0 auto;
  margin-bottom: 32px;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  max-width: 1100px;
`

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: #f7fafc;
  font-size: 16px;
  padding: 10px;
`

export const TableHeadRow = styled.tr`
  background: #f6d36522;
`

export const Th = styled.th`
  padding: 14px 18px;
  text-align: left;
  font-weight: 800;
  color: #232946;
  font-size: 17px;
  border-bottom: 2.5px solid #f6d365;
  letter-spacing: 0.2px;
  background: none;
`

export const ThMsg = styled.th`
  color: #1a2236;
  font-weight: 600;
  font-size: 15px;
  border-bottom: 1px solid #e5e7eb;
  padding: 10px 8px;
  letter-spacing: 0.2px;
  background: #f4f6fa;
`

export const Td = styled.td`
  padding: 12px 18px;
  font-size: 16px;
  color: #3b3f5c;
  border-bottom: 1.5px solid #e2e8f0;
  font-weight: 500;
  letter-spacing: 0.1px;
`

interface TableRowProps {
  hoverable?: boolean
  even?: boolean
}
export const TableRow = styled.tr<TableRowProps>`
  background: ${({ even }) => (even ? '#fff' : '#f7fafc')};
  transition: background 0.2s;
  cursor: ${({ hoverable }) => (hoverable ? 'pointer' : 'default')};
  &:hover {
    background: ${({ hoverable }) => (hoverable ? '#f6d36511' : undefined)};
  }
`

interface CardProps {
  destaque?: boolean
  cor?: 'hoje' | 'semana' | 'mes'
}
export const Card = styled.div<CardProps>`
  flex: 1;
  min-width: 180px;
  max-width: 320px;
  width: auto;
  background: ${({ cor }) =>
    cor === 'hoje'
      ? 'linear-gradient(90deg, #f7971e 0%, #ffd200 100%)'
      : cor === 'semana'
      ? 'linear-gradient(90deg, #56ccf2 0%, #2f80ed 100%)'
      : cor === 'mes'
      ? 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)'
      : 'linear-gradient(90deg, #f7fafc 0%, #e2e8f0 100%)'};
  border-radius: 16px;
  padding: 18px 24px 16px 24px;
  box-shadow: 0 2px 16px #23294622;
  color: #232946;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border: none;
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 6px;
  transition: box-shadow 0.2s, transform 0.2s;
  position: relative;
  overflow: hidden;
`

export const CardTitle = styled.h3`
  font-size: 26px;
  font-weight: 800;
  margin: 0;
  margin-bottom: 8px;
  letter-spacing: -1px;
  color: white;
  display: flex;
  align-items: center;
  gap: 8px;
`

interface CardValueProps {
  color?: string
}
export const CardValue = styled.div<CardValueProps>`
  font-size: 18px;
  color: white;
  font-weight: 600;
  letter-spacing: 0.2px;
  text-shadow: ${({ color }) =>
    color === '#38a169'
      ? '0 2px 8px #38a16922'
      : color === '#e53e3e'
      ? '0 2px 8px #e53e3e22'
      : 'none'};
  display: flex;
  align-items: center;
  gap: 6px;
`

export const CardLabel = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #23294699;
  margin-right: 8px;
`
