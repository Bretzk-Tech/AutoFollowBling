import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f7fafc;
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  letter-spacing: 0.1px;
  padding: 20px;
  padding-left: 290px; 
`

export const Sidebar = styled.aside`
  width: 270px;
  background: #232946;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 28px 0 18px 0;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  border-top-right-radius: 18px;
  border-bottom-right-radius: 18px;
  box-shadow: none;
`

export const SidebarLogo = styled.div`
  font-weight: 700;
  font-size: 22px;
  margin-bottom: 24px;
  letter-spacing: -1px;
  display: flex;
  align-items: center;
  gap: 5px;
`

export const SidebarNav = styled.nav`
  width: 100%;
`

export const SidebarList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

interface SidebarItemProps {
  active?: boolean
}
export const SidebarItem = styled.li<SidebarItemProps>`
  padding: 10px 18px;
  font-size: 16px;
  color: ${({ active }) => (active ? '#f6e35e' : '#e0e0e0')};
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  border-left: 3px solid ${({ active }) => (active ? '#f6e35e' : 'transparent')};
  display: flex;
  align-items: center;
  font-weight: 500;
  margin-bottom: 6px;
  border-radius: 6px;
  user-select: none;
  letter-spacing: 0.1px;
  background: ${({ active }) => (active ? 'rgba(246, 227, 94, 0.08)' : 'none')};
`

export const SidebarVersion = styled.div`
  font-size: 13px;
  color: #cbd5e1;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
`

export const Main = styled.main`
  flex: 1;
  padding: 36px 4vw;
  width: calc(100% - 270px);
  max-width: 1100px;
  margin: 0 auto;
  margin-left: 270px;
  border: 1px solid #444444;
  border-radius: 10px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background: none;
  box-shadow: none;
`

export const Title = styled.h1`
  font-weight: 800;
  font-size: 40px;
  margin-bottom: 10px;
  color: #232946;
  letter-spacing: -1.5px;
  text-shadow: 0 2px 8px #f6d36522;
`

export const Subtitle = styled.p`
  color: #6b7280;
  margin-bottom: 36px;
  font-size: 18px;
  font-weight: 500;
`

export const SectionTitle = styled.h2`
  font-size: 26px;
  color: #232946;
  margin-bottom: 20px;
  font-weight: 700;
  letter-spacing: -0.5px;
`

// Removido CardsWrapper duplicado
export const CardsWrapper = styled.div`
  display: flex;
  gap: 14px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  justify-content: center;
`

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: #f7fafc;
  font-size: 16px;
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
}
export const Card = styled.div<CardProps>`
  flex: 1;
  min-width: 100px;
  width: auto;
  background: ${({ destaque }) =>
    destaque
      ? 'linear-gradient(90deg, #f6d365 0%, #fda085 100%)'
      : 'linear-gradient(90deg, #f7fafc 0%, #e2e8f0 100%)'};
  border-radius: 10px;
  padding: 12px 8px;
  box-shadow: none;
  color: #232946;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: ${({ destaque }) =>
    destaque ? '2px solid #f6d365' : '1px solid #e2e8f0'};
  font-weight: ${({ destaque }) => (destaque ? 700 : 500)};
  font-size: 13px;
  margin-bottom: 6px;
  transition: box-shadow 0.2s, transform 0.2s;
  position: relative;
  overflow: hidden;
`

export const CardTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 10px;
  font-weight: 700;
  letter-spacing: -0.5px;
`

interface CardValueProps {
  color?: string
}
export const CardValue = styled.div<CardValueProps>`
  font-size: 32px;
  color: ${({ color }) => color || '#232946'};
  font-weight: 800;
  margin-bottom: 6px;
  letter-spacing: 0.2px;
  text-shadow: ${({ color }) =>
    color === '#38a169'
      ? '0 2px 8px #38a16922'
      : color === '#e53e3e'
      ? '0 2px 8px #e53e3e22'
      : 'none'};
  display: flex;
  align-items: center;
`

export const CardLabel = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #23294699;
  margin-right: 6px;
`
