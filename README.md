# 1DD STUDIO V3 Premium Full

เว็บไซต์ V3 สำหรับ 1DD STUDIO พร้อมใช้งานกับ GitHub + Cloudflare Pages

## โครงสร้างไฟล์
- `index.html` หน้าเว็บหลัก
- `styles.css` ธีมพรีเมียมดำ/ทอง Responsive
- `script.js` ระบบ Slider, Product, Before/After, Reviews, Booking
- `content.json` ไฟล์แก้ไขข้อความ ราคา รูป และข้อมูลต่าง ๆ
- `assets/images/` โฟลเดอร์รูปทั้งหมด

## จุดที่แก้ตามที่ตกลง
- HS1 ใช้ `assets/images/premium-clean.jpg` ไม่มีบาร์โค้ด
- HS1E ใช้ `assets/images/standard-clean.jpg` ไม่มีบาร์โค้ด
- Before/After เป็นกล่องเดียว มีลูกศรเลื่อนซ้ายขวา และรูปบาลานซ์
- ใช้ path รูปแบบเดียวกันทั้งหมดผ่าน `assets/images/`
- รองรับ Cloudflare Pages โดยไม่ต้องมี Build command

## การ Deploy
1. แตกไฟล์ ZIP
2. อัปโหลดไฟล์ทั้งหมดขึ้น GitHub repo `1DDSTUDIO`
3. Commit changes
4. Cloudflare Pages จะ Deploy อัตโนมัติ

## การแก้ไขง่าย
แก้ข้อมูลสินค้า ราคา ข้อความ และรูปใน `content.json`
หากเปลี่ยนรูป ให้ใช้ชื่อไฟล์เดิมใน `assets/images/` เพื่อไม่ต้องแก้โค้ด
