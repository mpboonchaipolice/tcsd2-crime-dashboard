import React from 'react'
import { formatTHB } from '../api'

type Props = { title: string; value: number; isMoney?: boolean }

export default function KpiCard({ title, value, isMoney }: Props) {
  return (
    <div className="card">
      <div className="card-title">{title}</div>
      <div className="card-value">{isMoney ? formatTHB(value) : value.toLocaleString('th-TH')}</div>
    </div>
  )
}
