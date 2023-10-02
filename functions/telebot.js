const TelegramBot = require("node-telegram-bot-api");
const barcode = require("./barcode");
// const axios = require("axios");
// https://github.com/hosein2398/node-telegram-bot-api-tutorial
// MenuMateBot MAIN
const token = "6579495868:AAGgKnnPilbLVSGR4xKv9V4a8cG-O1FI-lM";
// MenuMateBot TEST
// const token = "6313612860:AAGENA_lQxKjLFkCrQyJz3F86DGs_H1ZFsI";
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


// bot.on('photo', async (msg) => {
//   const chatId = msg.chat.id;
//   const photo = msg.photo[msg.photo.length - 2]; // Get the highest resolution version

//   // Get the file_id of the photo
//   const file_id = photo.file_id;

//   // Use the Telegram API's getFile method to get the file path
//   const fileInfo = await bot.getFile(file_id);

//   // Build the URL for the photo file
//   const fileURL = `https://api.telegram.org/file/bot${token}/${fileInfo.file_path}`;

//   // Use Axios or any other library to download the photo
//   axios({
//     method: 'get',
//     url: fileURL,
//     responseType: 'stream',
//   })
//     .then(function (response) {
//       // Process the downloaded photo here
//       // const filePath = 'downloaded_photo.jpg';
//       // const stream = fs.createWriteStream(filePath);
//       // response.data.pipe(stream);
//       // stream.on('finish', () => {
//         // Now, you can work with the downloaded photo in 'downloaded_photo.jpg'
//         // For example, you can use an image processing library to manipulate the image
//         console.log(response.data);
//         // Respond to the user or perform any other action you need.
//         // bot.sendMessage(chatId, 'Photo received and processed successfully!');
//         bot.sendPhoto(chatId, response);
//       // });
//     })
//     .catch(function (error) {
//       console.error('Error downloading photo:', error);
//     });
// });

bot.on('photo', async (msg) => {
  const chatId = msg.chat.id;
  const photo = msg.photo[msg.photo.length - 2]; // Get the highest resolution version

  // Get the photo file using Telegram's getFile method
  const file = await bot.getFile(photo.file_id);
  const photoUrl = `https://api.telegram.org/file/bot${token}/${file.file_path}`;

  // Define the API endpoint where you want to send the photo
  const apiUrl = 'https://example.com/upload-photo'; // Replace with your API URL

  try {
    // Send the photo to the API using Axios
    // const response = await axios.post(apiUrl, { photo_url: photoUrl });
    const response = barcode.processBarcode(photoUrl)

    // If the API successfully processes the photo, you can send a message to the user
    bot.sendMessage(chatId, `Your photo has been processed successfully! ${response}`);

  } catch (error) {
    // Handle Axios errors
    console.error('Axios error:', error);
    bot.sendMessage(chatId, 'There was an error processing your photo. Please try again later.');
  }
});

// Start the bot
bot.onText(/\/start/, msg => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Send me a photo, and I will process it for you!");
});

