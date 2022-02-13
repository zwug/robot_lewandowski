import { google } from 'googleapis';
import path from 'path';

const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, '../../credentials.json'),
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});

const TWO_DAYS = 86400000 * 2;

export const clearData = async (spreadsheetId: string) => {
  const client = await auth.getClient();
  const googleSheets = google.sheets({ version: "v4", auth: client });

  // Clear the rows of the outdated data
  try {
    await googleSheets.spreadsheets.values.clear({
      auth,
      spreadsheetId,
      range: "Футбол с Островком!FB10:FB200",
    });

    let today = Date.now();
    const matchDay = new Date(today + TWO_DAYS);

    await googleSheets.spreadsheets.values.update({
      spreadsheetId,
      valueInputOption: 'USER_ENTERED',
      range: "Футбол с Островком!FC7",
      requestBody: {
        values: [[`${matchDay.getDate()}.${matchDay.getMonth() + 1}.${matchDay.getFullYear()}`]]
      }
    });
    console.log('The data is cleared');
  } catch (e) {
    console.log('Failed to clear the data', e);
  }
}
