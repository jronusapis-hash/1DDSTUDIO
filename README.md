# 1DD STUDIO V4 - Notify + LINE mozzjro

เวอร์ชันนี้แก้เฉพาะจุดที่มอสสั่ง และคงโครงเว็บเดิมไว้:

- LINE ID เปลี่ยนเป็น `mozzjro`
- ฟอร์มจองคิวส่งเข้า Google Sheets
- Apps Script มีระบบแจ้งเตือนเข้าอีเมล
- ลบข้อความหน้าสินค้า: “ใช้รูปสินค้าตัวสะอาด ไม่มีบาร์โค้ด/QR ...”
- ลบข้อความ: “ไม่ติดตั้งที่ร้าน ลดราคา 3,000 บาทต่อตัว / สีพิเศษอาจมีค่าใช้จ่ายเพิ่ม”
- ลบข้อความใต้ Before/After: “จัดรูปให้บาลานซ์ในกรอบเดียว...”
- ลบ FAQ เรื่องลด 3,000 และสีพิเศษ
- ราคาเป็นราคาปกติ: HS1 18,000 / HS1E 15,000 / Standard 8,000
- รูปสินค้าใช้ไฟล์: `hs1-premium.jpg`, `hs1e-essential.jpg`, `standard-8000.jpg`

## วิธีอัปโหลดขึ้น GitHub

1. แตกไฟล์ ZIP นี้
2. เข้า GitHub repo `jronusapis-hash/1DDSTUDIO`
3. กด `Add file` > `Upload files`
4. ลากไฟล์ทั้งหมดจากโฟลเดอร์นี้ขึ้น GitHub
5. เลื่อนลงล่าง กด `Commit changes`
6. รอ Cloudflare Pages Deploy ประมาณ 1-3 นาที

## วิธีตั้งค่า Google Sheets + แจ้งเตือนอีเมล

1. สร้าง Google Sheet ใหม่
2. กด `Extensions` > `Apps Script`
3. เปิดไฟล์ `google-sheets-apps-script.gs` จากแพ็กนี้ แล้วคัดลอกโค้ดทั้งหมดไปวาง
4. ในโค้ด Apps Script ให้แก้บรรทัดนี้:

```js
notifyEmail: 'PASTE_YOUR_EMAIL_HERE'
```

เป็นอีเมลที่ต้องการรับแจ้งเตือน เช่น

```js
notifyEmail: 'yourname@gmail.com'
```

5. กด Save
6. กด `Deploy` > `New deployment`
7. เลือกชนิดเป็น `Web app`
8. ตั้งค่า:
   - Execute as: `Me`
   - Who has access: `Anyone`
9. กด Deploy แล้วคัดลอก Web app URL
10. เปิดไฟล์ `content.json`
11. แทนที่ `PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE` ด้วย URL ที่ได้
12. Commit ขึ้น GitHub อีกครั้ง

## จุดที่แก้ LINE

ใน `content.json`:

```json
"line": "mozzjro"
```

ถ้าต้องเปลี่ยน LINE ในอนาคต แก้ตรงนี้จุดเดียว
