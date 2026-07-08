/**
 * 1DD STUDIO V4.6 - Google Form / Google Sheets Notification
 * ใช้เมื่อต้องการให้อีเมลหรือ LINE แจ้งเตือนทุกครั้งที่ Google Form มีคำตอบใหม่
 * วิธีใช้:
 * 1) เปิด Google Sheets ที่เชื่อมกับ Google Form
 * 2) Extensions > Apps Script
 * 3) วางโค้ดนี้
 * 4) แก้ NOTIFY_EMAIL เป็นอีเมลร้าน
 * 5) กด Save
 * 6) ที่ Apps Script กด Triggers (รูปนาฬิกา) > Add Trigger
 *    Choose function: onFormSubmit
 *    Event source: From spreadsheet
 *    Event type: On form submit
 * 7) กด Allow permissions
 */

const NOTIFY_EMAIL = 'PASTE_YOUR_EMAIL_HERE';

// ถ้าต้องการ LINE แจ้งเตือน ให้เปิดใช้หลังตั้งค่า LINE Messaging API แล้วเท่านั้น
const LINE_ENABLE = false;
const LINE_CHANNEL_ACCESS_TOKEN = 'PASTE_LINE_MESSAGING_API_CHANNEL_ACCESS_TOKEN_HERE';
const LINE_TO = 'PASTE_LINE_USER_ID_OR_GROUP_ID_HERE';

function onFormSubmit(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const row = e && e.values ? e.values : sheet.getRange(sheet.getLastRow(), 1, 1, sheet.getLastColumn()).getValues()[0];
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

  const lines = ['📌 มีลูกค้าจองคิวใหม่จาก Google Form - 1DD STUDIO', ''];
  headers.forEach((h, i) => {
    if (h) lines.push(`${h}: ${row[i] || '-'}`);
  });

  const message = lines.join('\n');

  if (NOTIFY_EMAIL && NOTIFY_EMAIL.includes('@')) {
    MailApp.sendEmail(NOTIFY_EMAIL, 'มีลูกค้าจองคิวใหม่ - 1DD STUDIO', message);
  }

  sendLineMessage_(message);
}

function sendLineMessage_(text) {
  if (!LINE_ENABLE) return;
  if (!LINE_CHANNEL_ACCESS_TOKEN || LINE_CHANNEL_ACCESS_TOKEN.startsWith('PASTE_')) return;
  if (!LINE_TO || LINE_TO.startsWith('PASTE_')) return;

  UrlFetchApp.fetch('https://api.line.me/v2/bot/message/push', {
    method: 'post',
    contentType: 'application/json',
    headers: { Authorization: 'Bearer ' + LINE_CHANNEL_ACCESS_TOKEN },
    payload: JSON.stringify({
      to: LINE_TO,
      messages: [{ type: 'text', text }]
    }),
    muteHttpExceptions: true
  });
}
