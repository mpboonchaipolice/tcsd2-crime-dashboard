export type DashboardResponse = {
  filters: { case_id?: string | null; q?: string | null; date_from?: string | null; date_to?: string | null }
  kpis: {
    total_cases: number
    total_damage: number
    total_suspects: number
    arrested: number
    not_arrested: number
  }
  arrest_donut: { label: string; value: number }[]
  nationalities: { flag: string; country: string; count: number }[]
  seizures: {
    main_category: string
    rows: { item_type: string; qty: number; value: number }[]
    total_qty: number
    total_value: number
  }[]
  cases: {
    case_id: string
    case_name: string
    case_type: string
    start_date: string | null
    platform: string
    damage: number
    status: string
  }[]
}

const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:8000'

export async function fetchDashboard(params: {
  q?: string
  case_id?: string
  date_from?: string
  date_to?: string
}): Promise<DashboardResponse> {
  const usp = new URLSearchParams()
  if (params.q) usp.set('q', params.q)
  if (params.case_id) usp.set('case_id', params.case_id)
  if (params.date_from) usp.set('date_from', params.date_from)
  if (params.date_to) usp.set('date_to', params.date_to)

  const res = await fetch(`${API_BASE}/dashboard?${usp.toString()}`)
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}

export function formatTHB(n: number): string {
  return n.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}