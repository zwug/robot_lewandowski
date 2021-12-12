import TelegramBot from 'node-telegram-bot-api';
import { clearData } from './src/googleSheets'
import { token, sheetLink, spreadsheetId, chatId } from './settings';

const bot = new TelegramBot(token, { polling: true });
const message = `*Записываемся на игру [тут](${sheetLink}) ⚽*`

const updateInfo = async () => {
  try {
    await clearData(spreadsheetId);
    await bot.sendMessage(chatId, message, {
      parse_mode: 'MarkdownV2',
      disable_web_page_preview: true
    });
    console.log('Success');
  } catch (e) {
    console.log('Error ', e);
  }
  process.exit(0);
}

updateInfo();
