# 1DD STUDIO V9.0 GEO — Before / After Paired Slider

อัปเกรดจากไฟล์ Master `1DDSTUDIO_V9_BEFORE_AFTER_PAIRS_UPLOAD_READY.zip` โดยรักษา V9.0 และการจับคู่ภาพทั้ง 9 เคสไว้ครบ เพิ่มเฉพาะโครงสร้าง GEO เนื้อหาบริการ วิธีดูแล ข้อมูลติดต่อ และ Structured Data

## เปิดใช้งาน AI Chatbot

เว็บมีโหมดตอบพื้นฐานโดยไม่ต้องตั้งค่า หากต้องการเปิด AI จริง ให้เพิ่ม Environment Variable ใน Cloudflare Pages:

- `OPENAI_API_KEY` = API key ของบัญชี OpenAI Platform
- `OPENAI_MODEL` = ชื่อโมเดลที่ต้องการใช้ (ไม่ใส่ก็ใช้ `gpt-5-mini`)

ห้ามเขียน API key ลงใน `script.js`, `content.json` หรือไฟล์ที่อัปโหลดขึ้น GitHub

## อัปเดตในเวอร์ชันนี้

- Before 9 รูปอยู่ด้านซ้าย
- After 9 รูปอยู่ด้านขวา
- แสดงทีละ 1 เคส
- รูปทุกไฟล์ถูกปรับเป็น 900 × 1100 px เพื่อให้กรอบและระดับเท่ากัน
- ภาพต้นฉบับแสดงครบ ไม่ตัดหัวหรือส่วนล่าง
- บนมือถือ Before อยู่ด้านบน และ After อยู่ด้านล่าง
- ปัดซ้าย–ขวาบนมือถือได้
- เลื่อนอัตโนมัติทุก 7 วินาที
- After เคสที่ 4 เบลอใบหน้าแล้ว
- วิดีโอ MP4 ไม่ได้ใช้ในสไลด์ เพราะรูปแบบภาพนิ่งคู่ Before/After ชัดเจนและสมดุลกว่า
- ส่วนอื่นของเว็บไซต์คงเดิม

## การจับคู่รูป

1. Before 01 ↔ After 01
2. Before 02 ↔ After 02
3. Before 03 ↔ After 03
4. Before 04 ↔ After 04 — เบลอใบหน้า
5. Before 05 ↔ After 05
6. Before 06 ↔ After 06
7. Before 07 ↔ After 07
8. Before 08 ↔ After 08
9. Before 09 ↔ After 09

## วิธีอัปโหลด GitHub

1. แตกไฟล์ ZIP
2. เข้า Repository `jronusapis-hash/1DDSTUDIO`
3. กด `Add file`
4. เลือก `Upload files`
5. ลากไฟล์ทั้งหมดที่อยู่ภายในโฟลเดอร์นี้ลง GitHub
6. Commit ด้วยข้อความ:

   `Update website to V9.0 paired Before After slider`

7. รอ Cloudflare Pages ประมาณ 1–3 นาที
8. เปิดเว็บไซต์แล้วกด `Command + Shift + R`

## ไฟล์ใหม่

- `before-v9-01.jpg` ถึง `before-v9-09.jpg`
- `after-v9-01.jpg` ถึง `after-v9-09.jpg`

## การเปลี่ยนรูปในอนาคต

เปลี่ยนไฟล์รูปโดยใช้ชื่อเดิม และรักษาขนาด 900 × 1100 px  
ไม่จำเป็นต้องแก้ HTML หรือ JavaScript
