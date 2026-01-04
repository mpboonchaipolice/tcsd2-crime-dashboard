import React, { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import KpiCard from './components/KpiCard'
import DonutChart from './components/DonutChart'
import NationalityTable from './components/NationalityTable'
import SeizureTables from './components/SeizureTables'
import CaseList from './components/CaseList'
import { fetchDashboard, DashboardResponse, formatTHB } from './api'

export default function App() {
  const [q, setQ] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [data, setData] = useState<DashboardResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  async function load(params?: { q?: string; date_from?: string; date_to?: string }) {
    setLoading(true)
    setErr(null)
    try {
      const res = await fetchDashboard({
        q: params?.q ?? q,
        date_from: params?.date_from ?? dateFrom,
        date_to: params?.date_to ?? dateTo,
      })
      setData(res)
    } catch (e: any) {
      setErr(e?.message ?? 'โหลดข้อมูลไม่สำเร็จ')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load({ q: '', date_from: '', date_to: '' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const kpis = useMemo(() => data?.kpis, [data])

  return (
    <>
      <Header
        q={q}
        setQ={setQ}
        dateFrom={dateFrom}
        setDateFrom={setDateFrom}
        dateTo={dateTo}
        setDateTo={setDateTo}
        onApply={() => load()}
        onReset={() => {
          setQ('')
          setDateFrom('')
          setDateTo('')
          load({ q: '', date_from: '', date_to: '' })
        }}
      />

      <div className="container">
        {err && <div className="card" style={{ borderColor: '#ffb4b4', background: '#fff5f5' }}>{err}</div>}
        {loading && <div className="card">กำลังโหลดข้อมูล...</div>}

        {data && (
          <>
            <div className="grid kpi-grid" style={{ marginTop: 12 }}>
              <KpiCard title="จำนวนคดีทั้งหมด (คดี)" value={kpis!.total_cases} />
              <KpiCard title="ความเสียหายรวม (บาท)" value={kpis!.total_damage} isMoney />
              <KpiCard title="ผู้ต้องหาทั้งหมด (คน)" value={kpis!.total_suspects} />
              <KpiCard title="จับกุมแล้ว (คน)" value={kpis!.arrested} />
              <KpiCard title="ยังไม่จับกุม (คน)" value={kpis!.not_arrested} />
            </div>

            <div className="grid section-grid" style={{ marginTop: 12 }}>
              <DonutChart data={data.arrest_donut} />
              <NationalityTable rows={data.nationalities} />
            </div>

            <div className="grid section-grid" style={{ marginTop: 12 }}>
              <SeizureTables tables={data.seizures} />
              <CaseList rows={data.cases} />
            </div>

            <div className="card" style={{ marginTop: 12 }}>
              <div className="card-title">หมายเหตุการใช้งาน</div>
              <div className="small">
                ข้อมูลถูกอ่านจากไฟล์ Excel (backend/data/cases.xlsx). ถ้าคุณแก้ไขไฟล์แล้ว ให้เรียก API <b>POST /reload</b> หรือรีสตาร์ท backend.
                <br />
                ตอนนี้เป็นเวอร์ชัน MVP: โครง UX/UI โทนเดียวกับตัวอย่าง + ฟิลเตอร์ + KPI + ตารางสรุปหลักครบตามที่กำหนด
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
