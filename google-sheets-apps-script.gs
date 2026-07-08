/**
 * 1DD STUDIO V4.5 Booking Notification Script
 * ใช้กับฟอร์มหน้าเว็บ + Google Sheets + แจ้งเตือนอีเมล + LINE Messaging API
 *
 * วิธีใช้แบบง่าย:
 * 1) เปิด Google Sheet > Extensions > Apps Script
 * 2) วางโค้ดนี้
 * 3) แก้ NOTIFY_EMAIL เป็นอีเมลร้าน
 * 4) Deploy > New deployment > Web app
 *    Execute as: Me
 *    Who has access: Anyone
 * 5) Copy Web App URL ไปใส่ content.json > googleSheets.webAppUrl
 *
 * LINE แจ้งเตือน:
 * - ต้องใช้ LINE Messaging API Channel access token และ User ID / Group ID
 * - ใส่ค่าใน LINE_CHANNEL_ACCESS_TOKEN และ LINE_TO
 */

const NOTIFY_EMAIL = 'PASTE_YOUR_EMAIL_HERE';
const SHEET_NAME = 'Bookings';

// ใส่เมื่อพร้อมเปิด LINE แจ้งเตือน
const LINE_ENABLE = false;
const LINE_CHANNEL_ACCESS_TOKEN = 'PASTE_LINE_MESSAGING_API_CHANNEL_ACCESS_TOKEN_HERE';
const LINE_TO = 'PASTE_LINE_USER_ID_OR_GROUP_ID_HERE';

function doPost(e) {
  try {
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
    sendLineMessage_(formatBookingMessage_(row));
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) })).setMimeType(ContentService.MimeType.JSON);
  }
}

function onFormSubmit(e) {
  const values = e && e.values ? e.values : [];
  const subject = 'มีลูกค้าจองคิวผ่าน Google Form - 1DD STUDIO';
  const body = 'มีข้อมูลใหม่เข้ามาใน Google Form / Google Sheet:\n\n' + values.join('\n');
  MailApp.sendEmail(NOTIFY_EMAIL, subject, body);
  sendLineMessage_('📌 มีลูกค้าจองคิวผ่าน Google Form - 1DD STUDIO\n\n' + values.join('\n'));
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

function formatBookingMessage_(row) {
  return [
    '📌 มีลูกค้าจองคิวจากเว็บไซต์ 1DD STUDIO',
    '',
    'เวลา: ' + row[0],
    'ชื่อ: ' + row[1],
    'ติดต่อ: ' + row[2],
    'บริการ: ' + row[3],
    'วันที่ต้องการ: ' + (row[4] || '-'),
    'รายละเอียด: ' + (row[5] || '-'),
    'หน้าเว็บ: ' + row[6]
  ].join('\n');
}

function sendBookingEmail_(row) {
  if (!NOTIFY_EMAIL || NOTIFY_EMAIL.indexOf('@') === -1) return;
  MailApp.sendEmail(NOTIFY_EMAIL, 'มีลูกค้าจองคิวจากเว็บไซต์ - 1DD STUDIO', formatBookingMessage_(row));
}

function sendLineMessage_(text) {
  if (!LINE_ENABLE) return;
  if (!LINE_CHANNEL_ACCESS_TOKEN || LINE_CHANNEL_ACCESS_TOKEN.indexOf('PASTE_') === 0) return;
  if (!LINE_TO || LINE_TO.indexOf('PASTE_') === 0) return;

  UrlFetchApp.fetch('https://api.line.me/v2/bot/message/push', {
    method: 'post',
    contentType: 'application/json',
    headers: { Authorization: 'Bearer ' + LINE_CHANNEL_ACCESS_TOKEN },
    payload: JSON.stringify({
      to: LINE_TO,
      messages: [{ type: 'text', text: text }]
    }),
    muteHttpExceptions: true
  });
}
