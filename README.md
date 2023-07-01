# StockBot
Checks my stocks for target prices.

A good use case would be to set this up on like a Homelab to run on a cron job every 1 hours between like 9am and 5pm eastern. 

## Requirements

-  axios: ^1.4.0
-  dotenv: ^16.3.0
-  node-telegram-bot-api: ^0.61.0
- [ALPHAVANTAGE API KEY](https://www.alphavantage.co) -- Free plan 
- [Telegram Bot and Channel](https://core.telegram.org/bots)

## Getting Started

To run simply clone and download code.

Then run the below line to install required packages.

```
yarn install
```

Place the keys, and your channel id in a .env file like so:
```
ALPHAVANTAGE_API_KEY=
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

Edit the stocks.json file to include which stocks you want to monitor, their price, and if you want alerted when they go above or below.

Usage
```
ts-node index.ts
```
Authors

Jordan Tryon

License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
