import { google } from 'googleapis';
import fs from 'fs';

 const appendToGoogleSheet = async (values)=> {
  try {
    // Load service account credentials
    const credentials = JSON.parse(fs.readFileSync('credentials.json'));

    const spreadsheetId = '1uUA6Sl5kL6PrtDYujFMem_z-k-u1G6R8EeC4VI3BT08';
    const sheetName = 'Sheet1';
    const auth = new google.auth.JWT(
      credentials.client_email,
      null,
      credentials.private_key,
      ['https://www.googleapis.com/auth/spreadsheets']
    );

    const sheets = google.sheets({ version: 'v4', auth });

    const resource = { values };

    const result = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A1`,
      valueInputOption: 'USER_ENTERED',
      resource,
    });

    console.log(`${result.data.updates.updatedCells} cells appended.`);
  } catch (error) {
    console.error('Failed to append to Google Sheet:', error.message);
  }
};

export default appendToGoogleSheet;

