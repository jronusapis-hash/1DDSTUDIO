# 1DD STUDIO V4.4 Google Form + Google Sheets + Google Maps

อัปเดตนี้แก้เฉพาะระบบจองคิวและแผนที่ โดยคงส่วนอื่นของเว็บไว้เหมือนเดิม

## สิ่งที่เพิ่ม
- ปุ่มจองคิวผ่าน Google Form
- ฟอร์มหน้าเว็บส่งเข้า Google Sheets ผ่าน Apps Script
- แจ้งเตือนอีเมลเมื่อมีลูกค้าจองคิว
- เพิ่ม Google Maps บนหน้าเว็บ

## วิธีอัปโหลด GitHub
1. แตกไฟล์ ZIP
2. เข้า GitHub Repository `1DDSTUDIO`
3. กด `Add file` > `Upload files`
4. ลากไฟล์ทั้งหมดจากโฟลเดอร์นี้ลงไป
5. กด `Commit changes`
6. รอ Cloudflare Pages Deploy

## วิธีใส่ Google Form
เปิด `content.json` แล้วแก้บรรทัดนี้:

```json
"googleForm": {
  "formUrl": "PASTE_YOUR_GOOGLE_FORM_URL_HERE",
  "embedUrl": "PASTE_YOUR_GOOGLE_FORM_EMBED_URL_HERE",
  "enableEmbed": false
}
```

ให้ใส่ลิงก์ Google Form จริงตรง `formUrl`

## วิธีให้ Google Sheet แจ้งเตือนอีเมล
1. เปิด Google Sheet ที่รับคำตอบจาก Google Form
2. ไปที่ `Extensions` > `Apps Script`
3. วางโค้ดจากไฟล์ `google-sheets-apps-script.gs`
4. แก้ `PASTE_YOUR_EMAIL_HERE` เป็นอีเมลของร้าน
5. กด Save
6. ไปที่ Triggers > Add Trigger
7. เลือกฟังก์ชัน `onFormSubmit`
8. Event type เลือก `On form submit`
9. กดยืนยันสิทธิ์

## วิธีให้ฟอร์มหน้าเว็บส่งเข้า Sheet โดยตรง
1. ใน Apps Script กด Deploy > New deployment
2. Type เลือก Web app
3. Execute as: Me
4. Who has access: Anyone
5. Copy Web App URL
6. เอาไปใส่ใน `content.json` ตรง:

```json
"googleSheets": {
  "webAppUrl": "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE",
  "enable": true,
  "notifyEmail": "PASTE_YOUR_EMAIL_HERE"
}
```

## วิธีแก้ Google Maps
เปิด `content.json` แล้วแก้:

```json
"map": "https://maps.google.com/?q=1DD%20STUDIO%20Surat%20Thani",
"mapEmbed": "https://www.google.com/maps?q=1DD%20STUDIO%20Surat%20Thani&output=embed"
```

ถ้ามีลิงก์ Google Maps ร้านจริง ให้แทนที่ตรงนี้ได้เลย
