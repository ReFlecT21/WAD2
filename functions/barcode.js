const {default: axios} = require("axios");
const Quagga = require('quagga').default;
const fetch = require('node-fetch'); 

// const barcode ={
//   processBarcode: function(file){

//   },
// }


class BarcodeScanner {
  constructor() {}
  // Method to scan barcodes in a static image
  async scanBarcode(imagePath) {
    axios.get(imagePath, { responseType: 'arraybuffer' })
    .then((response) => {
        // Create a buffer from the response data
        const imageBase64 = Buffer.from(response.data).toString('base64');

        // Decode the barcode using QuaggaJS
        Quagga.decodeSingle(
        {
            src: `data:image/jpeg;base64,${imageBase64}`,
            numOfWorkers: 0,
            decoder: {
            readers: ['ean_reader'], // Adjust the readers as needed
            },
        },
        (result) => {
            if (result && result.codeResult) {
                console.log('Barcode detected and decoded: ' + result.codeResult.code);
                return result.codeResult.code
            } else {
                console.log('No barcode detected.');
            }
        }
        );
    })
    .catch((error) => {
      console.error('Error downloading image:', error);
    });
  }
}

module.exports = BarcodeScanner;
