import React from 'react'

type Props = {
  q: string
  setQ: (v: string) => void
  dateFrom: string
  setDateFrom: (v: string) => void
  dateTo: string
  setDateTo: (v: string) => void
  onApply: () => void
  onReset: () => void
}

export default function Header(props: Props) {
  return (
    <div className="header">
      <div className="container">
        <div className="header-row">
          <div className="brand">
            <div className="logo-box" aria-label="TCSD2 Logo">
	      <img
		src="https://cib.go.th/backend/uploads/medium_logo_cib_9_2x_bfa0ec7134_cf37362f41.png"
    		alt="TCSD2"
    		loading="eager"
	      />
	    </div>
            <div className="title">
              <h1>TCSD2 ระบบรวบรวมข้อมูลคดี</h1>
              <p>ค้นหาจากเลขเคส/ชื่อเคส และเลือกห้วงวันที่เพื่อสรุปผล</p>
            </div>
          </div>

          <div className="filters">
            <input
              className="input"
              placeholder="ค้นหา: เลขเคส หรือชื่อเคส"
              value={props.q}
              onChange={(e) => props.setQ(e.target.value)}
            />
            <input className="input" type="date" value={props.dateFrom} onChange={(e) => props.setDateFrom(e.target.value)} />
            <input className="input" type="date" value={props.dateTo} onChange={(e) => props.setDateTo(e.target.value)} />
            <button className="btn" onClick={props.onApply}>ค้นหา</button>
            <button className="btn" onClick={props.onReset} style={{ background: '#ffffff', border: '1px solid rgba(255,255,255,0.4)', fontWeight: 800 }}>
              รีเซ็ต
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
