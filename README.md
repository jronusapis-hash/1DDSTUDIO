# 1DD STUDIO V6 Ultimate

เวอร์ชันเต็มสำหรับอัปโหลดทับ Repository เดิมบน GitHub และ Deploy ผ่าน Cloudflare Pages

## สิ่งที่เพิ่มใน V6
- ไทย / English แบบสลับภาษาได้
- Hero และ Feature Bar ที่สมดุลทั้งคอมและมือถือ
- ตารางเปรียบเทียบสินค้า 3 รุ่น
- Before / After แบบลากเปรียบเทียบ
- รีวิวลูกค้าแบบสไลด์ พร้อมสายคาด PREMIUM
- บริการดูแลหลังติดตั้ง
- Google Form + Google Sheets เดิม
- LINE QR, LINE link, โทร, WhatsApp และ Google Maps เดิม
- ผู้ช่วยตอบคำถามเบื้องต้นบนหน้าเว็บ (ไม่ใช้ API และไม่มีค่าใช้จ่าย)
- FAQ เพิ่มเติม, SEO, Schema, Sitemap, Robots และ PWA cache
- ปุ่มติดต่อด่วนบนคอม และแถบติดต่อด้านล่างบนมือถือ

## วิธีอัปโหลด GitHub
1. แตกไฟล์ ZIP
2. เข้า Repository `jronusapis-hash/1DDSTUDIO`
3. กด `Add file` → `Upload files`
4. เปิดโฟลเดอร์ V6 แล้วลาก **ไฟล์ทั้งหมดด้านใน** ไปวาง (อย่าลากโฟลเดอร์ซ้อนทั้งก้อน)
5. ใส่ Commit message: `Upgrade website to V6 Ultimate`
6. กด `Commit changes`
7. รอ Cloudflare Pages 1–3 นาที
8. เปิด `https://1ddstudio.pages.dev` แล้วกด `Command + Shift + R`

## แก้ไขข้อมูลภายหลัง
- ข้อความ ราคา รีวิว FAQ และลิงก์ต่าง ๆ: แก้ใน `content.json`
- โครงหน้าเว็บ: `index.html`
- สี ระยะห่าง และ Responsive: `styles.css`
- Slider ภาษา Chat และระบบโต้ตอบ: `script.js`
- รูปรีวิว: เปลี่ยนไฟล์ `review-1.jpg` ถึง `review-12.jpg` โดยใช้ชื่อเดิม

## จุดที่ควรใส่ข้อมูลจริงเพิ่ม
ใน `content.json` ตรวจสอบ:
- `site.email`
- `site.map` และ `site.mapEmbed`
- ลิงก์ Facebook / TikTok

Google Form และ Google Sheets ใช้ลิงก์ที่ตั้งไว้ในเวอร์ชันก่อนหน้าแล้ว
