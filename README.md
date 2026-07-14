# 1DD STUDIO V5 — Review Slider (V4.8 Style)

เวอร์ชันนี้ใช้โครงสร้างและหน้าตาของ V4.8 เดิมทั้งหมด และแก้เฉพาะส่วนรีวิว:

- คง Review Slider แบบ V4.8 (แสดงทีละ 1 รีวิว มีปุ่มซ้าย/ขวา และเลื่อนอัตโนมัติ)
- คงรูปรีวิวเดิม review-1.jpg ถึง review-5.jpg
- เพิ่มรูปรีวิวใหม่ review-6.jpg ถึง review-12.jpg
- ไม่เปลี่ยนสินค้า ราคา Hero, Before/After, Google Form, Google Sheets, LINE QR หรือ Google Maps

## วิธีอัปโหลด GitHub

1. แตกไฟล์ ZIP
2. เข้า Repository `jronusapis-hash/1DDSTUDIO`
3. กด `Add file` → `Upload files`
4. ลากไฟล์ทั้งหมด **ที่อยู่ด้านในโฟลเดอร์** ลง GitHub
5. ใส่ Commit message:
   `Update V5 review slider with new customer photos`
6. กด `Commit changes`
7. รอ Cloudflare Pages ประมาณ 1–3 นาที
8. เปิด `https://1ddstudio.pages.dev` แล้วกด `Command + Shift + R`

## การแก้รีวิวภายหลัง

เปิด `content.json` แล้วค้นหาคำว่า `"reviews"` จากนั้นแก้ชื่อไฟล์ ชื่อลูกค้า หรือข้อความได้โดยไม่ต้องแก้ HTML
