/**
 * Veloce free trial signups -> Google Sheet + email.
 *
 * Setup (about 5 minutes, from your own Google account):
 * 1. Create a Google Sheet called "Veloce trial signups".
 * 2. Extensions > Apps Script. Replace the code with this file and save.
 * 3. Project settings > Script properties: add SECRET (any long random string) and NOTIFY (emails to alert, comma separated).
 * 4. Deploy > New deployment > Web app. Execute as: Me. Who has access: Anyone. Deploy and copy the /exec URL.
 * 5. In Vercel, set TRIAL_WEBHOOK_URL to that URL and TRIAL_WEBHOOK_SECRET to the same SECRET. Redeploy.
 */

const HEADERS = ['Received', 'Name', 'WhatsApp', 'Email', 'Units', 'Using today', 'Page'];

function doPost(e) {
  const props = PropertiesService.getScriptProperties();
  let d;
  try {
    d = JSON.parse(e.postData.contents);
  } catch (err) {
    return out({ ok: false, error: 'bad_json' });
  }
  if (props.getProperty('SECRET') && d.secret !== props.getProperty('SECRET')) {
    return out({ ok: false, error: 'forbidden' });
  }

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
  sheet.appendRow([new Date(d.at || Date.now()), d.name, d.whatsapp, d.email, d.units, d.tools, d.page]);

  const notify = props.getProperty('NOTIFY');
  if (notify) {
    MailApp.sendEmail({
      to: notify,
      subject: `Veloce trial: ${d.name} (${d.units} units)`,
      body: `New free trial signup\n\nName: ${d.name}\nWhatsApp: ${d.whatsapp}\nEmail: ${d.email}\nUnits: ${d.units}\nUsing today: ${d.tools}\nPage: ${d.page}`,
    });
  }
  return out({ ok: true });
}

function out(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
