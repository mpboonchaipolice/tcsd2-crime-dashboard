import React from 'react'

type Row = { flag: string; country: string; count: number }

export default function NationalityTable({ rows }: { rows: Row[] }) {
  const total = rows.reduce((s, r) => s + r.count, 0)
  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <div>
          <div className="card-title">สรุปสัญชาติผู้ต้องหา</div>
          <div className="small">ลิงก์จากข้อมูลผู้ต้องหา (SUSPECTS)</div>
        </div>
        <span className="badge">Table</span>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th style={{ width: 60 }}>ธง</th>
            <th>ประเทศ</th>
            <th style={{ width: 120, textAlign: 'right' }}>จำนวน</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.country}>
              <td style={{ fontSize: 18 }}>{r.flag}</td>
              <td>{r.country}</td>
              <td style={{ textAlign: 'right' }}>{r.count.toLocaleString('th-TH')}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2}>รวมทั้งหมด</td>
            <td style={{ textAlign: 'right' }}>{total.toLocaleString('th-TH')}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
