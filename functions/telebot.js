const TelegramBot = require("node-telegram-bot-api");
const BarcodeScanner = require("./barcode.js");
const {default: axios} = require("axios");

// MenuMateBot MAIN
const token = "6579495868:AAGgKnnPilbLVSGR4xKv9V4a8cG-O1FI-lM";
// MenuMateBot TEST
// const token = "6313612860:AAGENA_lQxKjLFkCrQyJz3F86DGs_H1ZFsI";

const bot = new TelegramBot(token, {polling: true});

bot.on("message", msg => {
  // console.log(msg);
  if (!msg.photo) {
    const chatId = msg.chat.id;
    const messageText = msg.text;
    bot.sendMessage(chatId, `You said: ${messageText}`);
  }
});

bot.on("message", async msg => {
  if (msg.photo) {
    const chatId = msg.chat.id;
    const photo = msg.photo[msg.photo.length - 2];

    // Get the photo file using Telegram's getFile method
    const file = await bot.getFile(photo.file_id);
    const photoUrl = `https://api.telegram.org/file/bot${token}/${file.file_path}`;

    const barcodeScanner = new BarcodeScanner();

    try {

      const barcode = await barcodeScanner.scanBarcode(photoUrl);
      console.log("Scanned barcode:", barcode);
      bot.sendMessage(chatId, `Your photo has been processed successfully! ${barcode}`);

      axios.get(
        "http://127.0.0.1:5001/wad2-395904/us-central1/app/instantItem?",
        {
          params: {
            upc: barcode,
          },
        },
      )
        .then(res => {
          // console.log(res.data.foods[0])
          bot.sendMessage(
            chatId,
            `${res.data.foods[0].food_name} has ${res.data.foods[0].nf_calories} calories`,
            );
        })
        .catch(()=>{
          bot.sendMessage(
            chatId,
            `You're consuming something so special that we don't have it in our database 🤨`,
            );
        });


    } catch (error) {
      console.error(error);
      bot.sendMessage(chatId, "There was an error processing your photo. Please try again later.");
    }
  }
});

// Start the bot   '
bot.onText(/\/start/, msg => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    "Send me a barcode, and I will process it for you! Send me a message and I will be a parrot",
    );
});
