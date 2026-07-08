# 1DD STUDIO V4.6 - Google Form Direct Booking

เวอร์ชันนี้แก้ระบบจองคิวให้ใช้ Google Form เป็นตัวรับข้อมูลหลัก เพื่อให้ข้อมูลเข้า Google Sheets โดยตรง

## ลิงก์ที่ตั้งไว้แล้ว
- Google Form: https://docs.google.com/forms/d/e/1FAIpQLSce8kuEVS71DIXofTxoNVIUFrQdBnMeKs-BjU22LhHy4LBAEw/viewform?usp=publish-editor
- Google Sheet: https://docs.google.com/spreadsheets/d/1bsVqRAy9t0qmtRVSsjFxK9MB5JMWJxx6eWq6QdUgw-A/edit?resourcekey=&gid=1465032530#gid=1465032530
- LINE ID: mozzjro

## สิ่งที่แก้ใน V4.6
- ปุ่มจองคิวเปิด Google Form จริง
- ฝัง Google Form ในหน้าเว็บส่วนจองคิว
- ปิดฟอร์มหน้าเว็บแบบ Apps Script เพื่อไม่ให้ข้อมูลหลุดจาก Google Sheets
- สร้าง LINE QR Code ใหม่สำหรับ `mozzjro`
- เพิ่มไฟล์ `google-form-sheet-notify.gs` สำหรับแจ้งเตือนอีเมล/LINE เมื่อ Google Form มีคำตอบใหม่

## วิธีอัปโหลด GitHub
แตก ZIP แล้วอัปโหลดไฟล์ทั้งหมดทับของเดิมใน GitHub จากนั้น Commit changes

## วิธีให้ Google Sheets แจ้งเตือนอีเมล
1. เปิด Google Sheet ที่เชื่อมกับฟอร์ม
2. ไปที่ Extensions > Apps Script
3. วางโค้ดจากไฟล์ `google-form-sheet-notify.gs`
4. แก้ `PASTE_YOUR_EMAIL_HERE` เป็นอีเมลร้าน
5. กด Save
6. ไปที่ Triggers > Add Trigger
7. เลือก function: `onFormSubmit`
8. Event source: From spreadsheet
9. Event type: On form submit
10. กด Allow permissions

หมายเหตุ: ถ้าแค่ต้องการให้ข้อมูลเข้า Google Sheets ไม่ต้องใช้ Apps Script เพิ่ม เพราะ Google Form ที่เชื่อมกับ Sheet จะบันทึกให้อัตโนมัติอยู่แล้ว
