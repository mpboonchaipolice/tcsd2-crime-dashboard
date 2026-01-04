import React from 'react'
import { formatTHB } from '../api'

type SeizureTable = {
  main_category: string
  rows: { item_type: string; qty: number; value: number }[]
  total_qty: number
  total_value: number
}

function Table({ t }: { t: SeizureTable }) {
  return (
    <div className="card" style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <div>
          <div className="card-title">{t.main_category}</div>
          <div className="small">ประเภทสิ่งของ | จำนวน | มูลค่า</div>
        </div>
        <span className="badge">Seizures</span>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>ประเภทสิ่งของ</th>
            <th style={{ width: 120, textAlign: 'right' }}>จำนวน</th>
            <th style={{ width: 180, textAlign: 'right' }}>มูลค่า (บาท)</th>
          </tr>
        </thead>
        <tbody>
          {t.rows.map((r) => (
            <tr key={r.item_type}>
              <td>{r.item_type}</td>
              <td style={{ textAlign: 'right' }}>{r.qty.toLocaleString('th-TH')}</td>
              <td style={{ textAlign: 'right' }}>{formatTHB(r.value)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>รวม</td>
            <td style={{ textAlign: 'right' }}>{t.total_qty.toLocaleString('th-TH')}</td>
            <td style={{ textAlign: 'right' }}>{formatTHB(t.total_value)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default function SeizureTables({ tables }: { tables: SeizureTable[] }) {
  return (
    <div>
      {tables.map((t) => (
        <Table key={t.main_category} t={t} />
      ))}
    </div>
  )
}
