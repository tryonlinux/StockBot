import { config } from 'dotenv';
import axios, { AxiosResponse } from 'axios';
import TelegramBot from 'node-telegram-bot-api';
import fs from 'fs';
import path from 'path';

config();
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN || '', {
  polling: false,
});
const alphaVantageApiKey: string = process.env.ALPHAVANTAGE_API_KEY || '';
const telegramChatId: string = process.env.TELEGRAM_CHAT_ID || '';

interface StockData {
  'Global Quote': {
    '05. price': string;
  };
}

interface StockAlert {
  symbol: string;
  targetPrice: number;
  direction: 'above' | 'below';
}

const stockAlerts: StockAlert[] = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, './stocks.json'), 'utf-8')
);

async function checkPrice(stockAlert: StockAlert): Promise<void> {
  const url: string = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockAlert.symbol}&apikey=${alphaVantageApiKey}`;
  try {
    const response: AxiosResponse<StockData> = await axios.get(url);
    const currentPrice: number = parseFloat(
      response.data['Global Quote']['05. price']
    );
    console.log(`Current ${stockAlert.symbol} price is ${currentPrice}`);
    if (
      (stockAlert.direction === 'above' &&
        currentPrice > stockAlert.targetPrice) ||
      (stockAlert.direction === 'below' &&
        currentPrice < stockAlert.targetPrice)
    ) {
      bot.sendMessage(
        telegramChatId,
        `ALERT! ${stockAlert.symbol} price is ${stockAlert.direction} ${stockAlert.targetPrice}. Current price: ${currentPrice}`
      );
    }
  } catch (error) {
    console.error(error);
  }
}

for (const stockAlert of stockAlerts) {
  checkPrice(stockAlert);
}
