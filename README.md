# 1DD STUDIO V7.0 — Before / After Slider

เวอร์ชันนี้แก้เฉพาะส่วน Before / After ตามคำสั่งล่าสุด

## สิ่งที่เปลี่ยน
- ลบรูป Before / After เดิมทั้งหมดออกจากชุดไฟล์
- ใช้รูปใหม่ 8 รูป: `ba-v7-01.jpg` ถึง `ba-v7-08.jpg`
- แสดงทีละ 1 รูป แบบสไลด์
- ความกว้างสูงสุด 900px เท่ากับสไลด์รีวิวลูกค้า
- ใช้ `object-fit: contain` เพื่อแสดงภาพเต็ม ไม่ตัดด้านบนหรือล่าง
- ปุ่มก่อนหน้า/ถัดไป จุดบอกลำดับ เลื่อนอัตโนมัติทุก 5 วินาที และปัดซ้ายขวาบนมือถือ
- ส่วนอื่นของเว็บคงเดิม

## วิธีอัปโหลด GitHub
1. แตกไฟล์ ZIP
2. เข้า Repository `jronusapis-hash/1DDSTUDIO`
3. กด **Add file → Upload files**
4. ลากไฟล์ทั้งหมดภายในโฟลเดอร์นี้ขึ้น GitHub
5. Commit message: `Update website to V7.0 with new Before After slider`
6. รอ Cloudflare Pages deploy 1–3 นาที
7. เปิดเว็บแล้วกด `Command + Shift + R`

## ตรวจสอบหลังอัปโหลด
ใน GitHub ต้องเห็นไฟล์ `ba-v7-01.jpg` ถึง `ba-v7-08.jpg` และใน `content.json` ต้องมี `version: 7.0`
