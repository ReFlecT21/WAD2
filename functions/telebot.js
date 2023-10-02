const TelegramBot = require("node-telegram-bot-api");
const BarcodeScanner = require("./barcode.js");
// const axios = require("axios");
// https://github.com/hosein2398/node-telegram-bot-api-tutorial
// MenuMateBot MAIN
// const token = "6579495868:AAGgKnnPilbLVSGR4xKv9V4a8cG-O1FI-lM";
// MenuMateBot TEST
const token = "6313612860:AAGENA_lQxKjLFkCrQyJz3F86DGs_H1ZFsI";
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

bot.on("message", msg => {
  console.log(msg);
  const chatId = msg.chat.id;
  const messageText = msg.text;
  // You can add your bot's logic here and send responses back to users.
  bot.sendMessage(chatId, `You said: ${messageText}`);

  // send photo back to user
  // bot.sendPhoto(chatId, msg.photo[msg.photo.length - 3].file_id);
});

// bot.on("photo", msg => {
//   console.log(msg);
//   const chatId = msg.chat.id;
//   bot.sendPhoto(chatId, msg.photo[msg.photo.length - 3].file_id);
// });


bot.on('photo', async (msg) => {
  const chatId = msg.chat.id;
  const photo = msg.photo[msg.photo.length - 2]; 

  // Get the photo file using Telegram's getFile method
  const file = await bot.getFile(photo.file_id);
  const photoUrl = `https://api.telegram.org/file/bot${token}/${file.file_path}`;

  const barcodeScanner = new BarcodeScanner();

  try {
    // Send the photo to the API using Axios
    // const response = await axios.post(apiUrl, { photo_url: photoUrl });
    // const response = barcode.processBarcode(photoUrl)

    // If the API successfully processes the photo, you can send a message to the user
    await barcodeScanner.scanBarcode(photoUrl)
      .then((barcode) => {
        console.log('Scanned barcode:', barcode);
        bot.sendMessage(chatId, `Your photo has been processed successfully! ${barcode}`);
      })
      .catch((error) => {
        console.error('Error:', error.message);
      });

  } catch (error) {
    // Handle Axios errors
    console.error(error);
    bot.sendMessage(chatId, 'There was an error processing your photo. Please try again later.');
  }
});

// Start the bot
bot.onText(/\/start/, msg => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Send me a photo, and I will process it for you!");
});
