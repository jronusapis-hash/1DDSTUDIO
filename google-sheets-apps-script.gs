/**
 * 1DD STUDIO Booking → Google Sheets
 * วิธีใช้:
 * 1) เปิด Google Sheets ไฟล์ที่ต้องการรับแจ้งเตือน
 * 2) Extensions > Apps Script
 * 3) วางโค้ดนี้ทั้งหมด
 * 4) Deploy > New deployment > Web app
 * 5) Execute as: Me
 * 6) Who has access: Anyone
 * 7) แก้ CONFIG.notifyEmail เป็นอีเมลที่ต้องการรับแจ้งเตือน
 * 8) Copy Web app URL ไปใส่ใน content.json ช่อง googleSheets.webAppUrl
 */

const CONFIG = {
  sheetName: 'Bookings',
  notifyEmail: 'PASTE_YOUR_EMAIL_HERE' // ใส่อีเมลที่ต้องการรับแจ้งเตือน เช่น 'you@gmail.com'
};

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = getOrCreateSheet_(ss, CONFIG.sheetName);

    const data = e.parameter || {};
    const row = [
      new Date(),
      data.name || '',
      data.contact || '',
      data.service || '',
      data.date || '',
      data.message || '',
      data.page || '',
      data.source || ''
    ];

    sheet.appendRow(row);

    if (CONFIG.notifyEmail) {
      MailApp.sendEmail({
        to: CONFIG.notifyEmail,
        subject: 'มีลูกค้าจองคิวจากเว็บ 1DD STUDIO',
        body:
          'มีข้อมูลจองคิวใหม่\n\n' +
          'ชื่อ: ' + row[1] + '\n' +
          'ติดต่อ: ' + row[2] + '\n' +
          'บริการ: ' + row[3] + '\n' +
          'วันที่ต้องการ: ' + row[4] + '\n' +
          'รายละเอียด: ' + row[5] + '\n' +
          'หน้าเว็บ: ' + row[6]
      });
    }

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return ContentService
    .createTextOutput('1DD STUDIO Booking Web App is running')
    .setMimeType(ContentService.MimeType.TEXT);
}

function getOrCreateSheet_(ss, name) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Timestamp',
      'Name',
      'Contact',
      'Service',
      'Preferred Date',
      'Message',
      'Page',
      'Source'
    ]);
    sheet.getRange(1, 1, 1, 8).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  return sheet;
}
