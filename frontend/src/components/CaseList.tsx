import React from 'react'
import { formatTHB } from '../api'

type CaseRow = {
  case_id: string
  case_name: string
  case_type: string
  start_date: string | null
  platform: string
  damage: number
  status: string
}

export default function CaseList({ rows }: { rows: CaseRow[] }) {
  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <div>
          <div className="card-title">รายการคดี (ตามตัวกรอง)</div>
          <div className="small">ใช้ค้นเร็ว/ตรวจสอบก่อนลงรายละเอียด</div>
        </div>
        <span className="badge">{rows.length.toLocaleString('th-TH')} คดี</span>
      </div>

      <div className="case-list">
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: 140 }}>Case ID</th>
              <th>ชื่อเคส</th>
              <th style={{ width: 120 }}>วันที่รับคดี</th>
              <th style={{ width: 120 }}>แพลตฟอร์ม</th>
              <th style={{ width: 140, textAlign: 'right' }}>ความเสียหาย</th>
              <th style={{ width: 120 }}>สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.case_id}>
                <td><b>{r.case_id}</b></td>
                <td>{r.case_name}</td>
                <td>{r.start_date ?? '-'}</td>
                <td>{r.platform}</td>
                <td style={{ textAlign: 'right' }}>{formatTHB(r.damage)}</td>
                <td>{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
