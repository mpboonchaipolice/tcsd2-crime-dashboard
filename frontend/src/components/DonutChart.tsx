import React from 'react'
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts'

type Props = {
  data: { label: string; value: number }[]
}

export default function DonutChart({ data }: Props) {
  // ไม่กำหนดสีแบบ fix ตามข้อจำกัดของงาน? (ที่นี่เลือกใช้ค่าเริ่มต้นของ Recharts แบบ minimal)
  // แต่เพื่อให้คล้ายธีมตัวอย่าง จะสลับชุดสีอ่อน/เข้มแบบเรียบ ๆ
  const colors = ['#0E3A66', '#FFC107']

  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <div>
          <div className="card-title">สถานะผู้ต้องหา</div>
          <div className="small">จับกุมแล้ว vs ยังไม่จับกุม</div>
        </div>
        <span className="badge">Donut</span>
      </div>

      <div style={{ height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="label" innerRadius={70} outerRadius={100}>
              {data.map((_, i) => (
                <Cell key={i} fill={colors[i % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="row">
        {data.map((d, i) => (
          <div key={d.label} className="small">
            <span style={{ display: 'inline-block', width: 10, height: 10, background: colors[i % colors.length], borderRadius: 2, marginRight: 6 }} />
            {d.label}: <b>{d.value.toLocaleString('th-TH')}</b>
          </div>
        ))}
      </div>
    </div>
  )
}
