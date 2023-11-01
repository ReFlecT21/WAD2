import React, { useEffect, useState } from 'react';
import Tesseract from 'tesseract.js';
import { OCRextract } from '../middleware/OCRextract';

export function Scan() {

    // const [scanData, setScanData] = useState({});
    var scanData = {};

    const extractNutritionalInfo = (line) => {
        // let updatedScanData = { ...scanData };
        let updatedScanData = scanData;

        if (scanData?.calories === undefined) {
            let res = OCRextract.extractCalories(line);
            if (res !== null) {
                console.log(res);
                updatedScanData.calories = res;
                // setScanData({ ...scanData, calories: res });
                // setScanData((prev)=>({...prev, calories: res}));
                return updatedScanData;
            }
        } else if (scanData?.carbs === undefined) {
            let res = OCRextract.extractCarbs(line);
            if (res !== null) {
                console.log(res);
                updatedScanData.carbs = res;
                // setScanData({ ...scanData, carbs: res });
                // setScanData((prev)=>({...prev, carbs: res}));
                return updatedScanData;
            }
        } else if (scanData?.fat === undefined) {
            let res = OCRextract.extractFat(line);
            if (res !== null) {
                console.log(res);
                updatedScanData.fat = res;
                // setScanData({ ...scanData, fat: res });
                // setScanData((prev)=>({...prev, fat: res}));
                return updatedScanData;
            }
        } else if (scanData?.protein === undefined) {
            let res = OCRextract.extractProtein(line);
            if (res !== null) {
                console.log(res);
                updatedScanData.protein = res;
                // setScanData({ ...scanData, protein: res });
                // setScanData((prev)=>({...prev, protein: res}));
                return updatedScanData;
            }
        }
        // console.log(updatedScanData);

        // setScanData(updatedScanData);
        // console.log(scanData);
        return updatedScanData
    };


    useEffect(() => {
        const inputElement = document.getElementById("input-file");
        const inputFile = inputElement; // Create a reference to the file input element

        const handleChange = async (event) => {
            const imageFile = event.target.files[0];
            if (!imageFile) return;

            // Recognize text from the uploaded image
            const { data: { text } } = await Tesseract.recognize(imageFile, 'eng');

            // Output the recognized text to the console
            // console.log(text);
            // console.log(typeof text);

            // Split the text into lines
            const lines = text.split('\n');

            // Iterate through each line
            console.log("==========new scan==========");
            for (const line of lines) {
                console.log(line);
                let scanData = extractNutritionalInfo(line);
                // console.log(res);
                console.log(scanData);
                // setScanData(res);

            }
            // console.log(scanData)
        };

        inputElement.addEventListener("change", handleChange);

        // Clean up the event listener when the component unmounts
        return () => {
            inputElement.removeEventListener("change", handleChange);
        };

    }, []);

    const handleImageUpload = () => {
        // Trigger the click event on the file input element
        const inputElement = document.getElementById("input-file");
        inputElement.click();
    };

    return (
        <>
            <input id="input-file" className="d-none" type="file" />
            <button onClick={handleImageUpload} className="homePageBtn">
                Upload
            </button>
        </>
    );
}
