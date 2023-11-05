const {default: axios} = require("axios");
const Quagga = require("quagga").default;


class BarcodeScanner {
  constructor() {}
  async scanBarcode(imagePath) {

    try {
      const response = await axios.get(imagePath, {responseType: "arraybuffer"});
      const imageBase64 = Buffer.from(response.data).toString("base64");

      return new Promise((resolve, reject) => {
        Quagga.decodeSingle(
          {
            src: `data:image/jpeg;base64,${imageBase64}`,
            numOfWorkers: 0,
            decoder: {
              readers: ["ean_reader"], // Adjust the readers as needed
            },
          },
          result => {
            if (result && result.codeResult) {
              // console.log("Barcode detected and decoded: " + result.codeResult.code);
              resolve(result.codeResult.code); // Resolve with the barcode value
            } else {
              console.log("No barcode detected.");
              reject(new Error("No barcode detected")); // Reject with an error
            }
          },
        );
      });

    } catch (error) {

      console.error("Error downloading image:", error);
      throw error; // Rethrow the error

    }
  }
}

module.exports = BarcodeScanner;
