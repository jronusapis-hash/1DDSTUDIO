/**
 * 1DD STUDIO Booking Notification Script
 * ใช้ได้ 2 แบบ:
 * 1) รับข้อมูลจากฟอร์มหน้าเว็บผ่าน Web App แล้วบันทึกลง Google Sheet + ส่งอีเมล
 * 2) ใช้กับ Google Form ที่เชื่อมกับ Google Sheet แล้วตั้ง Trigger: onFormSubmit
 */

const NOTIFY_EMAIL = 'PASTE_YOUR_EMAIL_HERE';
const SHEET_NAME = 'Bookings';

function doPost(e) {
  const sheet = getBookingSheet_();
  const data = e && e.parameter ? e.parameter : {};
  const row = [
    new Date(),
    data.name || '',
    data.contact || '',
    data.service || '',
    data.date || '',
    data.message || '',
    data.page || '',
    data.source || '1DD STUDIO Website'
  ];
  sheet.appendRow(row);
  sendBookingEmail_(row);
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function onFormSubmit(e) {
  const values = e && e.values ? e.values : [];
  const subject = 'มีลูกค้าจองคิวผ่าน Google Form - 1DD STUDIO';
  const body = 'มีข้อมูลใหม่เข้ามาใน Google Form / Google Sheet:\n\n' + values.join('\n');
  MailApp.sendEmail(NOTIFY_EMAIL, subject, body);
}

function getBookingSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['Timestamp','Name','Contact','Service','Date','Message','Page','Source']);
  }
  return sheet;
}

function sendBookingEmail_(row) {
  const subject = 'มีลูกค้าจองคิวจากเว็บไซต์ - 1DD STUDIO';
  const body = [
    'มีลูกค้าส่งข้อมูลจองคิวจากเว็บไซต์',
    '',
    'เวลา: ' + row[0],
    'ชื่อ: ' + row[1],
    'ติดต่อ: ' + row[2],
    'บริการ: ' + row[3],
    'วันที่ต้องการ: ' + row[4],
    'รายละเอียด: ' + row[5],
    'หน้าเว็บ: ' + row[6],
    'แหล่งที่มา: ' + row[7]
  ].join('\n');
  MailApp.sendEmail(NOTIFY_EMAIL, subject, body);
}
