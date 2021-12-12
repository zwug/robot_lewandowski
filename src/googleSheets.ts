import { google } from 'googleapis';
import path from 'path';

const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, '../../credentials.json'),
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});

export const clearData = async (spreadsheetId: string) => {
  const client = await auth.getClient();
  const googleSheets = google.sheets({ version: "v4", auth: client });

  // Clear the rows of the outdated data
  try {
    await googleSheets.spreadsheets.values.clear({
      auth,
      spreadsheetId,
      range: "Футбол с Островком!FA10:FA200",
    });
    console.log('The data is cleared');
  } catch (e) {
    console.log('Failed to clear the data', e);
  }
}
