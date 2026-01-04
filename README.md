# CIB Case Dashboard (MVP)

เว็บแดชบอร์ดสำหรับสรุปภาพรวมคดี โดยดึงข้อมูลจากไฟล์ Excel (ตามเท็มเพลทที่ออกแบบไว้)

## โครงสร้าง
- backend (FastAPI): อ่าน Excel แล้วคำนวณสรุปให้ frontend
- frontend (React + Vite): แสดง UI โทนเดียวกับตัวอย่าง + KPI/Donut/ตารางสรุป

---

## 1) Run Backend

### โฟลเดอร์: project root -> backend
```bash
cd backend
python -m venv .venv

# Windows (PowerShell)
.venv\Scripts\Activate.ps1

# macOS/Linux
source .venv/bin/activate

pip install -r requirements.txt
uvicorn app:app --reload --port 8000
```

Excel อยู่ที่: `backend/data/cases.xlsx` (คุณสามารถแทนที่ด้วยไฟล์จริงของคุณ)
- ถ้าเปลี่ยนไฟล์แล้ว: เรียก `POST http://localhost:8000/reload`

> ถ้าต้องการชี้ไฟล์ตำแหน่งอื่น ตั้งค่า env:
> `EXCEL_PATH=/path/to/your.xlsx`

---

## 2) Run Frontend

### โฟลเดอร์: project root -> frontend
```bash
cd frontend
npm install
npm run dev
```

เปิด: http://localhost:5173

ถ้าต้องการตั้งค่า API base:
- คัดลอก `.env.example` เป็น `.env`
- แก้ `VITE_API_BASE=http://localhost:8000`

---

## API ที่ใช้
- `GET /dashboard?q=&case_id=&date_from=YYYY-MM-DD&date_to=YYYY-MM-DD`
- `POST /reload`
- `GET /health`

---

## Next Step (ทำต่อได้ทันที)
1) เพิ่มกราฟรายวัน/รายเดือน (time series)
2) เพิ่มตัวกรอง: ประเภทคดี / แพลตฟอร์ม / สถานะคดี / ช่วงอายุ
3) เพิ่มหน้า Case Detail (คลิก case แล้ว drill down)
4) เพิ่มระบบ login + permission + audit log
