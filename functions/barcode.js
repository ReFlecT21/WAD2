const {default: axios} = require("axios");
const { BrowserBarcodeReader } = require('@zxing/browser');

// Import the necessary modules

const barcode ={
  processBarcode: function(){
    // Create a new instance of the barcode reader
    const codeReader = new BrowserBarcodeReader();
    // Define the path to the image containing the barcode
    // const imagePath = 'path_to_your_barcode_image.png';

    // Read the barcode from the image
    codeReader.decodeFromImage(undefined, file).then((result) => {
      if (result) {
        console.log('Decoded barcode:', result.getText());
        return result.getText()
      } else {
        console.log('No barcode found in the image.');
      }
    }).catch((err) => {
      console.error('Error decoding barcode:', err);
    });
  },
}

// function processBarcode(file){
//     // Create a new instance of the barcode reader
//     const codeReader = new BrowserBarcodeReader();
//     // Define the path to the image containing the barcode
//     // const imagePath = 'path_to_your_barcode_image.png';
    
//     // Read the barcode from the image
//     codeReader.decodeFromImage(undefined, file).then((result) => {
//       if (result) {
//         console.log('Decoded barcode:', result.getText());
//         return result.getText()
//       } else {
//         console.log('No barcode found in the image.');
//       }
//     }).catch((err) => {
//       console.error('Error decoding barcode:', err);
//     });

// }

module.exports = barcode;